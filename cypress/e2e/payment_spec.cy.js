const { v4: uuidv4 } = require("uuid");

describe("payment", () => {
  it("user can make payment", () => {
    //login
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", {
      name: /remember me/i,
    }).check();
    cy.findByRole("button", {
      name: /sign in/i,
    }).click();

    //check initial balance
    let initialBalance;
    cy.get('[data-test="sidenav-user-balance"]').then(
      ($balance) => (initialBalance = $balance.text())
    );

    //click new
    cy.findByRole("button", {
      name: /new/i,
    }).click();

    //search for user
    cy.findByRole("textbox").type("Devon Becker");
    cy.findByText(/devon becker/i).click();

    //insert payment detail
    const payment = "50.00";
    const note = uuidv4();
    cy.findByPlaceholderText(/amount/i).type(payment);

    cy.findByPlaceholderText(/add a note/i).type(note);

    //pay and return to transactions
    cy.findByRole("button", {
      name: /pay/i,
    }).click();
    cy.findByText(/return to transactions/i).click();

    //click mine
    cy.findByText(/mine/i).click();

    //click on payment
    cy.findByText(note).click({ force: true });

    //verfiy if payments was made
    cy.findByText(`-$${payment}`).should("be.visible");
    cy.findByText(note).should("be.visible");

    let newBalance;
    cy.get('[data-test="sidenav-user-balance"]').then(($balance) => {
      const newBalance = parseFloat($balance.text().replace(/\$|,/g, ""));
      const calculatedBalance =
        parseFloat(initialBalance.replace(/\$|,/g, "")) - parseFloat(payment);
      expect(newBalance).to.equal(calculatedBalance);
    });
  });
});
