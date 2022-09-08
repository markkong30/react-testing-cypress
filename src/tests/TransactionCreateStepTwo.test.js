import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "../components/TransactionCreateStepTwo";

test("if pay button disabled on initial render", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "6" }} />);

  const btn = await screen.findByRole("button", { name: /pay/i });
  expect(btn).toBeDisabled();
});

test("if pay button enabled after fields are filled", () => {
  render(<TransactionCreateStepTwo sender={{ id: "5" }} receiver={{ id: "6" }} />);

  userEvent.type(screen.getByPlaceholderText(/amount/i), "100");
  userEvent.type(screen.getAllByPlaceholderText(/add a note/i), "dinner of two");
  const btn = screen.getByRole("button", { name: /pay/i });

  expect(btn).toBeEnabled();
});
