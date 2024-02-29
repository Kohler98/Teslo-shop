'use client'

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

 
interface Props{
    quantity:number;
}
export const QuantitySelector = ({quantity}:Props) => {
    const [count,setCount] = useState(quantity)

    const onQuatityChanged = (value:number)=>{
        if(count+value<1 || count+value >=6) return;
        setCount(count+value)
    }
  return (
<div className="flex">
    <button onClick={()=>onQuatityChanged(-1)}>
        <IoRemoveCircleOutline size={30}/>
    </button>
    <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {count}
    </span>
    <button onClick={()=>onQuatityChanged(1)}>
        <IoAddCircleOutline  size={30}/>
    </button>
</div>
  )
}