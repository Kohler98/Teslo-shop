"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}
export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesion de usuario",
    };
  }
  // obtener la informacion de los productos

  // Nota : recuerden que podemos llevar 2+ productos con el mismo Id

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calcular los montos // Encabezados

  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
  // los totales de tax, subtotal, y total

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuatity = item.quantity;
      const product = products.find((product) => product.id === item.productId);
      if (!product) throw new Error(`${item.productId} no existe - 500`);
      const subTotal = product.price * productQuatity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );
  // crear la transaccion de la base de datos
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // Accumular los valores
      //1. actualizar el stock de los productos
      const updatedProductsPromises = products.map(async (product) => {
        const productQuatity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);
        if (productQuatity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // no hacer
            // inStock:product.inStock - productQuatity
            inStock: {
              decrement: productQuatity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);
      // verificar valores negativos en la existencia = no hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock == 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      //2. Crear la order- Encabezado - detalles

      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });
      //validar, si el price es cero, entonces, lanzar un error

      //3. Crear la direccion de la orden
      // Address
      const { country, ...restAddress } = address;

      const orderAdress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });
      return {
        order: order,
        updatedProducts: updatedProducts,
        orderAddress: orderAdress,
      };
    });
    return {
      ok: true,
      message: "todo correcto",
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
