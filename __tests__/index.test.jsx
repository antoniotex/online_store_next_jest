import React from "react";
import Home from "../pages/index";
import { getAllByRole, render, screen, within } from "@testing-library/react";
import { mockProducts } from "../__mocks__/mockProducts";
import { mockCategories } from "../__mocks__/mockData";

describe("Home page", () => {
  it("render a all products heading", () => {
    render(<Home products={mockProducts} categories={[]} />);
    screen.getByRole("heading", { name: /All products/i });
  });

  it("render a acessible search box", () => {
    render(<Home products={mockProducts} categories={[]} />);
    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toHaveAccessibleName("Search");
  });

  it("renders all products", () => {
    render(<Home products={mockProducts} categories={[]} />);
    const allProducts = screen.getByRole("list", { name: /products/i });
    const { getAllByRole } = within(allProducts);
    const listItems = getAllByRole("listitem");
    expect(listItems.length).toBe(mockProducts.length);
  });

  it("renders all categories", () => {
    render(<Home products={mockProducts} categories={mockCategories} />);
    const allCategories = screen.getByRole("list", { name: /categories/i });
    const { getAllByRole } = within(allCategories);
    const listItems = getAllByRole("listitem", { name: /category/i });
    expect(listItems.length).toBe(mockCategories.length);
  });

  // it("renders 1 product per category", () => {
  //   render(<Home products={mockProducts} categories={mockCategories} />);
  //   const categoryList = screen.getByRole("list", { name: /Mouse/i });
  //   const { getAllByRole } = within(categoryList);
  //   const listItems = getAllByRole("listitem");
  //   expect(listItems.length).toBe(1);
  // });

  // it("show search results when search item is not empty", () => {});
});
