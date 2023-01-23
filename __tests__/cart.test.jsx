import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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
  it("render cart details correctly", () => {
    renderCartDetail();
    screen.getByText(/Cart Total Price : R\$3950/i);
    const line_items = screen.getByRole("list", { name: /cart items/i });
    const { getAllByRole } = within(line_items);
    const listItems = getAllByRole("listitem");
    expect(listItems.length).toBe(2);

    screen.getByRole("button", { name: /Empty Cart/i });
    screen.getByRole("link", { name: /Checkout/i });
  });

  it("renders a message if cart is empty", () => {
    render(
      <CartDetail
        cart={{
          subtotal: { formatted_with_symbol: "R$0", raw: 0 },
          line_items: [],
        }}
        updateQuantity={jest.fn()}
        emptyCart={jest.fn()}
      />
    );

    screen.getByText(/Please Buy something/i);
  });

  it("renders a loading if cart is undefined", () => {
    render(
      <CartDetail
        cart={undefined}
        updateQuantity={jest.fn()}
        emptyCart={jest.fn()}
      />
    );

    screen.getByText(/Loading .../i);
  });

  it("render line items correctly", () => {
    renderCartDetail();

    screen.getByText(/R\$850 X 2 = R\$1700/i);
    screen.getByText(/R\$750 X 3 = R\$2250/i);
  });

  it("increments line item`s quantity correctly", async () => {
    const updateQuantity = jest.fn();
    render(
      <CartDetail
        cart={mockCart}
        updateQuantity={updateQuantity}
        emptyCart={jest.fn()}
      />
    );

    const firstItem = screen.getAllByRole("listitem")[0];
    const { getByRole } = within(firstItem);
    const incrementBtn = getByRole("button", { name: "+" });

    await userEvent.click(incrementBtn);

    expect(updateQuantity).toBeCalled();
    expect(updateQuantity).toBeCalledWith(3, "item_7RyWOwmK5nEa2V");
    // await waitForElementToBeRemoved(() => screen.getByText(/updating/i));
  });

  it("decrements line item's quantity correctly", async () => {
    const updateQuantity = jest.fn();
    render(
      <CartDetail
        cart={mockCart}
        updateQuantity={updateQuantity}
        emptyCart={jest.fn()}
      />
    );

    const firstItem = screen.getAllByRole("listitem")[0];
    const { getByRole } = within(firstItem);
    const decrementBtn = getByRole("button", { name: "-" });

    await userEvent.click(decrementBtn);

    expect(updateQuantity).toBeCalled();
    expect(updateQuantity).toBeCalledWith(1, "item_7RyWOwmK5nEa2V");
    // await waitForElementToBeRemoved(() => screen.getByText(/updating/i));
  });
});
