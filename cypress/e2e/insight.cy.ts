describe('Insight Page Test', () => {
  it('Product Hierarchy Check All Department', function () {
    cy.visit('http://localhost:8002/app/overview');

    cy.get('.css-1hwamvd > .chakra-stack > .chakra-icon > path').click({ force: true });
    cy.get('.css-om5qtp > .chakra-text').click({ force: true });

    // Select product hierarchy
    cy.get('.css-u2wiss > .chakra-text').contains('Product Hierarchy').click({ force: true });

    // Select departments
    cy.get(':nth-child(1) > .css-gzq4jx').click({ force: true });

    // Select all items
    cy.get('.css-1i2uwx3 > .chakra-stack > .chakra-checkbox > .chakra-checkbox__control').click({
      force: true
    });
    cy.get('.css-dipt5f').contains('All');

    // Save drawer
    cy.get('.css-y0me34').click({ force: true });

    // Check weather redux store has been updated
    cy.window()
      .its('store')
      .invoke('getState')
      .its('insight')
      .its('dashboardFilter')
      .its('filterLocalScope')
      .its('rightPanelRetainDataList')
      .its('productHierarchy')
      .its('departments')
      .its('isSelectAll')
      .should('equal', true);
  });
});
