import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import commerce from "../lib/commerce";

export async function getStaticProps(context) {
  const { data: products } = await commerce.products.list();
  const { data: categories } = await commerce.categories.list();

  return { props: { products, categories }, revalidate: 30 };
}

export default function Home({ products, categories }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <input type="text" role="searchbox" title="Search" />
        <ul aria-label="Categories">
          {categories.map((category) => {
            return (
              <li aria-label="category" key={category.id}>
                <h2 id={`category-${category.name}`}>{category.name}</h2>
                <ul aria-labelledby={`category-${category.name}`}>
                  {products
                    .filter((product) =>
                      product.categories.find((c) => c.id === category.id)
                    )
                    .map((product) => {
                      return <li key={product.id}>{product.name}</li>;
                    })}
                </ul>
              </li>
            );
          })}
        </ul>

        <h2 id="all-products-heading">All Products</h2>
        <ul aria-labelledby="all-products-heading">
          {products.map((product) => {
            return <li key={product.id}>{product.name}</li>;
          })}
        </ul>
      </main>
    </>
  );
}