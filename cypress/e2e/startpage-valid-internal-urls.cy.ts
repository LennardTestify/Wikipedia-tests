describe("Validate internal links", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("startUrl"));
    cy.wait(Cypress.env("waitForStartpage"));
  });

  it("Every page has status code 200 and no redirect <200>", () => {
    const hostname = window.location.hostname.split(".").slice(-2).join(".");

    let data: string[] = [];

    cy.get("a").each((item) => {
      const url = item.attr("href");


      if (url !== undefined && Cypress._.indexOf(data, url) === -1) {
        data.push(url);

        if (url.indexOf('mailto') == -1 && url && (url.startsWith("/") || url.includes(hostname)) && !(url.startsWith('http://www.facebook') || url.startsWith('https://www.facebook'))) {
          cy.request({
            url: url,
            followRedirect: false,
          }).then((resp) => {
            expect(resp.status).to.eq(200);
          });
        } else {
          cy.log("Skip item: " + url);
        }
      }
    });
  });

  it("visit & validate urls <visit>", () => {
    const hostname = window.location.hostname.split(".").slice(-2).join(".");

    let data: string[] = [];

    cy.get("a").each((item) => {
      const url = item.attr("href");


      if (url !== undefined && Cypress._.indexOf(data, url) === -1) {
        data.push(url);

        if (url.indexOf('mailto') == -1 && url && (url.startsWith("/") || url.includes(hostname)) && !(url.startsWith('http://www.facebook') || url.startsWith('https://www.facebook'))) {
          if (url.startsWith("/")){
            cy.visit(Cypress.env("startUrl")+url)
            cy.url().should('include', Cypress.env("startUrl")+url)
          } else if (url.startsWith('http://www.facebook') || url.startsWith('https://www.facebook')){
            cy.log("skip item: "+ url)
          } else {
            cy.visit(url)
            cy.url().should('include', url)
          }
        } else {
          cy.log("Skip item: " + url);
        }
      }
    });
  });

  it('Validate that imprint is visible <imprint>', () => {
    cy.get('a').contains('Impressum').should('be.visible');
  })
});
