'use client'
import { changeUserRole } from "@/app/actions";
import { User } from "@/interfaces";
 
import React from "react";
 

interface Props{
  user: User
}
export const UserTable = ({ user }: Props) => {
 
  return (
    <>
      <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {user.email}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
         {user.name}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
         {user.role}
        </td>
 
        <td className="text-sm text-gray-900 font-light px-6 ">
          <select 
          value={user.role}
          onChange={(e) => changeUserRole(user.id,e.target.value)}
          className="text-sm text-gray-900">
              <option value="admin">admin</option>
              <option value="user">user</option>
          </select>
        </td>
      </tr>

  
    </>
  );
};
