describe(
  "Search on startpage",
  {
    env: {
      startUrl: "https://www.wikipedia.de/",
    },
  },
  () => {
    beforeEach(() => {
      cy.visit(Cypress.env("startUrl"));
      cy.wait(Cypress.env("waitForStartpage"));
    });

    it("Autocomplete items have the search word", () => {
      let searchWord = "cypress";

      cy.get("#txtSearch").type(searchWord);

      cy.get(".suggest_link a span").each((item) => {
        item.text().startsWith(searchWord);
      });
    });
  }
);
