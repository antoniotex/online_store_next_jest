import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CartDetail from "../pages/cart";
import { mockCart } from "../__mocks__/mockData";

const renderCartDetail = () =>
  render(
    <CartDetail
      cart={mockCart}
      updateQuantity={jest.fn()}
      emptyCart={jest.fn()}
    />
  );

describe("Cart Detail Page", () => {
  it("render total cart price", () => {
    renderCartDetail();
    screen.getByText(/Cart Total Price : R\$3950/i);
    const line_items = screen.getByRole("list", { name: /cart items/i });
    const { getAllByRole } = within(line_items);
    const listItems = getAllByRole("listitem");
    expect(listItems.length).toBe(2);
  });
});
