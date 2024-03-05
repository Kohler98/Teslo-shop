"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React from "react";
import { CreateOrderData, CreateOrderActions,OnApproveData,OnApproveActions } from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionById } from "@/app/actions";

interface Props{
  orderId:string;
  amount: number;
}
export const PaypalButton = ({orderId,amount}:Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = (Math.round(amount*100))/100
  if (isPending) {
    return (
      <div className="animate-pulse">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-2" />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    try {
      

    const transactionId = await actions.order.create({
  
      purchase_units: [
        {
          invoice_id:orderId,
          amount: {
            value: `${roundedAmount}`,
        
          },
        },
      ],
    });
    // Todo : guardar el id en la orden en la base de datos
 
    const order  = await setTransactionById(orderId,transactionId)

    if(!order.ok){
      throw new Error('No se pudo actualizar la orden')
    }
 
    return transactionId;
  } catch (error) {
 
    return ''   
  }
  };
  const onApprove = async(data: OnApproveData, actions: OnApproveActions) =>{
    const details = await actions.order?.capture()

    if(!details) return

    await paypalCheckPayment(details.id)
  }
  return (
  <PayPalButtons 
    createOrder={createOrder} 
    onApprove={onApprove}
  />
  );
};
