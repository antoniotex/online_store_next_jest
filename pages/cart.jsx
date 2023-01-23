import Head from "next/head";

export default function CartDetail({ cart, updateQuantity, emptyCart }) {
  if (!cart) return <span>Loading ...</span>;
  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2>Cart Detaiiils</h2>
        {cart.subtotal.raw > 0 ? (
          <>
            <h3>Cart total price : {cart.subtotal.formatted_with_symbol}</h3>
            <h4 id="cart-items-heading">Cart items :</h4>
            <ul aria-labelledby="cart-items-heading">
              {cart.line_items.map((item) => {
                return (
                  <li key={item.id}>
                    {item.name} - {item.quantity}
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p>Please Buy something from our store</p>
        )}
      </main>
    </div>
  );
}
