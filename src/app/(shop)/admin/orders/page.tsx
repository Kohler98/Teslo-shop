// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedOrders } from "@/app/actions";
import { auth } from "@/auth.config";
import { Title } from "@/components";

 
import { redirect } from "next/navigation";
 
import { OrderTable } from "./ui/OrderTable";

export default async function OrderAdminPage () {
  const session = await auth();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=perfil')
    redirect("/");
  }
  const resp = await getPaginatedOrders(session.user.id);
  const orders = resp.order ?? [];
  return (
    <>
      <Title title="Mantenimiento de Ordenes" />

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
