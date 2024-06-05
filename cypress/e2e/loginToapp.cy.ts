describe('My First Test', () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit(
      'https://orderright-auth-dev.algonomy.com/auth/realms/EPS/protocol/openid-connect/auth?client_id=eps-admin-client&redirect_uri=http%3A%2F%2Flocalhost%3A8002%2Fmodules&state=9a3b5179-1bbd-4ce3-917e-b606ce2e6310&response_mode=fragment&response_type=code&scope=openid&nonce=e00e37cd-41c5-4404-8eef-f3e0478a7c42'
    );
    cy.get('input[name="username"]').type('gskwastuser@linearsquared.com');
    cy.get('input[name="password"]').type('D@[YrA2.r{SF~<=%');
    cy.contains('Log In').click();
    // cy.url().should('eq', 'http://localhost:8002/modules');
  });
});
