"use client";

import { login, registerUser } from "@/app/actions";
import clsx from "clsx";
import Link from "next/link";
 
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type FormInputs = {
    name:string;
    email:string;
    password:string;
}


export const RegisterForm = () => {
    const [error, setError] = useState('')
    const {register,handleSubmit, formState:{errors}} = useForm<FormInputs>()
 
    const onSubmit:SubmitHandler<FormInputs> = async(data) =>{
        const {name,email,password} = data;

        //server action
        const resp = await registerUser(name,email,password)
        if(!resp.ok){
            setError(resp.message)
            return
        }
        await login(email.toLowerCase(),password)
        window.location.replace('/')
        
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
  
    <span className="text-red-500">{error}</span>
 
      
      <label htmlFor="name">Nombre Completo</label>
      <input
        className={
            clsx(
                "px-5 py-2 border bg-gray-200 rounded mb-5",
                {
                    "border-red-500": errors.name
                }
            )
        }
        type="text"
        {...register('name',{required:true})}
      />
      <label htmlFor="email">Email</label>
      <input
        className={
            clsx(
                "px-5 py-2 border bg-gray-200 rounded mb-5",
                {
                    "border-red-500": errors.email
                }
            )
        }
        type="email"
        {...register('email',{required:true, pattern:/^\S+@\S+$/i})}
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className={
            clsx(
                "px-5 py-2 border bg-gray-200 rounded mb-5",
                {
                    "border-red-500": errors.password
                }
            )
        }
        type="password"
        {...register('password',{required:true,minLength:6})}
      />
      <label htmlFor="repeat_password">Repetir contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
      />

      <button className="btn-primary">Registrarse</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ya tienes una cuenta?, Ingresa
      </Link>
    </form>
  );
};
