import { useEffect, useState } from "react";
import commerce from "../lib/commerce";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState();

  useEffect(() => {
    console.log("object");
    const fetch = async () => {
      const response = await commerce.cart.retrieve();
      setCart(response);
    };
    fetch();
  }, []);

  //

  const addToCart = async (productID) => {
    const response = await commerce.cart.add(productID, 1);
    setCart(response);
    console.log(response);
    return;
  };

  //  update  item's quantity in cart
  const updateQuantity = async (quantity, productID) => {
    let response = await commerce.cart.update(productID, {
      quantity: quantity,
    });
    setCart(response.cart);
    return;
  };

  //  remove  item  from cart
  const removeItem = async (productID) => {
    let response = await commerce.cart.remove(productID);
    setCart(response.cart);
    return;
  };

  //    empty the cart
  const emptyCart = async () => {
    let response = await commerce.cart.empty();
    setCart(response.cart);
  };

  //    refresh the  cart
  const refreshCart = async () => {
    let response = await commerce.cart.refresh();
    setCart(response);
  };

  return (
    <Component
      {...pageProps}
      cart={cart}
      addToCart={addToCart}
      emptyCart={emptyCart}
      refreshCart={refreshCart}
      removeItem={removeItem}
      updateQuantity={updateQuantity}
    />
  );
}
