import type { CartProduct, Checkout } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  getSummaryInformation: () => Checkout;
  updateProductToCart: (product:CartProduct,quantity: number) => void
  removeProductToCart:(product:CartProduct) => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const {cart} = get()

        return cart.reduce((total, item)=> total+ item.quantity,0)
      },
      getSummaryInformation : () =>{
        const {cart} = get()
        const totalItems = cart.reduce((total, item)=> total+ item.quantity,0)
        const subTotal = (cart.reduce((subtotal, item)=> subtotal+ (item.price*item.quantity),0))*0.15
        const total =  (cart.reduce((subtotal, item)=> subtotal+ (item.price*item.quantity),0) ) + subTotal
        return {totalItems,subTotal,total}
      },
      // method
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );
        if (!productInCart) {
          set({ cart: [...cart, product] });

          return;
        }

        //2. Se que el producto existe por talla, hay que incrementar la cantidad

        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updateCartProducts });
      },
      updateProductToCart: (product:CartProduct,quantity:number)=>{
 
        const { cart } = get();
        const updateCartProducts = cart.map((item) => {
            if (item.id === product.id && item.size === product.size) {
              return { ...item, quantity: quantity};
            }
  
            return item;
          });

          set({ cart: updateCartProducts });
 
      },
      removeProductToCart: (product:CartProduct)=>{
        const { cart } = get();

        const removeCartProduct = cart.filter((item) => item.id !== product.id || item.size !== product.size)
        set({ cart: removeCartProduct });

      }
    }),
    {
      name: "shopping-cart",
      
    }
  )
);
