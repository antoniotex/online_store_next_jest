import React from "react";
import Home from "../pages/index";
import { render, screen } from "@testing-library/react";

describe("Home page", () => {
  it("render a all products heading", () => {
    render(<Home />);
    screen.getByRole("heading", { name: /All products/i });
  });
});
