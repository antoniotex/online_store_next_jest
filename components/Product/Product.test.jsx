import { mockProduct } from "../../__mocks__/mockProducts";
import { render, screen } from "@testing-library/react";
import Product from "./Product";
import userEvent from "@testing-library/user-event";

describe("Product Component", () => {
  //

  it("renders product correctly", async () => {
    const addToCart = jest.fn();
    render(<Product product={mockProduct} addToCart={addToCart} />);
    screen.getByText(/Monitor/i);
    screen.getByText(/₹850/i);
    const addtocartBtn = screen.getByRole("button", { name: /Add to cart/i });
    await userEvent.click(addtocartBtn);

    expect(addToCart).toBeCalled();
  });
});
