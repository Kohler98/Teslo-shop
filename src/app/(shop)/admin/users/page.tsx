// https://tailwindcomponents.com/component/hoverable-table
import {  getPaginatedUsers } from "@/app/actions";
import { auth } from "@/auth.config";
import { Pagination, Title } from "@/components";
 
import { redirect } from "next/navigation";
 
import { UserTable } from "./ui/UserTable";

export default async function UsersAdminPage() {
  const session = await auth();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=perfil')
    redirect("/");
  }
  const resp = await getPaginatedUsers();
  if(!resp.ok){
    redirect("/");
  }
  const users = resp.users ?? [];
  return (
    <>
      <Title title="Mantenimiento de Usuarios" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Email
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
                Role
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Actualizar role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserTable key={user.id} user={user} />
            ))}
          </tbody>
        </table>
        <Pagination totalPage={3}/>
      </div>
    </>
  );
}
