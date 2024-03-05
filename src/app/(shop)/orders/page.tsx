// https://tailwindcomponents.com/component/hoverable-table
import { getOrdersByUser } from "@/app/actions";
import { auth } from "@/auth.config";
import { Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { OrderTable } from "./ui/OrderTable";

export default async function () {
  const session = await auth();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=perfil')
    redirect("/");
  }
  const resp = await getOrdersByUser(session.user.id);
  const orders = resp.order ?? [];
  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderTable key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
