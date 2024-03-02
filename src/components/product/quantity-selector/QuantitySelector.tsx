 
 
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

 
 
interface Props{
    quantity:number;
    onQuatityChanged: (quantity:number) => void
}
export const QuantitySelector = ({quantity,onQuatityChanged}:Props) => {
 
    const onValueChange = (value:number)=>{
        if(quantity+value<1 || quantity+value >=6) return;
 
        onQuatityChanged(quantity+value)
    }
  return (
<div className="flex">
    <button onClick={()=>onValueChange(-1)}>
        <IoRemoveCircleOutline size={30}/>
    </button>
    <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {quantity}
    </span>
    <button onClick={()=>onValueChange(1)}>
        <IoAddCircleOutline  size={30}/>
    </button>
</div>
  )
}
