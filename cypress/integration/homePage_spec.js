describe('The Home Page', function() {
  it('successfully loads', function() {
    cy.visit('/');
  });
  
  it('should navigate to "/account/login" when clicking "Login" button', function() {
    cy.visit('/');

    cy.get('.btn').click();

    cy.url().should('include', '/account/login');
  });
})
