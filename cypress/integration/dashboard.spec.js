const acceptedWebsites = require('../../server/controllers/websiteRules/resources/acceptedWebsites');

console.log(acceptedWebsites)

describe('Dashboard', () => {
  beforeEach(() => {
    cy.request('/api/cleardb');

    cy.request('/api/account/createtestaccount');

    cy.request('POST', '/api/account/register', {
      username: 'testUsername',
      password: 'testPassword',
      email: 'test@email.com',
    });

    cy.request('POST', '/api/account/login', {
      username: 'testUsername',
      password: 'testPassword',
      email: 'test@email.com',
    });
  });

  it('should load successfully', function() {
    cy.visit('/dashboard');
  });

  it('should load default state (Display copy on how to add recipes)', function() {

    cy.visit('/dashboard');

    cy.get('.jumbotron').contains('Looks like you have no recipes currently saved. You should add some!')
  });

  describe('Accepted Websites', function() {
    it('should be able to open "Accepted Websites" modal', function() {
      cy.visit('/dashboard');
  
      cy.get(':nth-child(3) > a').click();
  
      cy.get('.accepted-websites-modal').should('exist');
    });
  
    it('should be able to close "Accepted Websites" modal', function() {
      cy.visit('/dashboard');
  
      cy.get(':nth-child(3) > a').click();
  
      cy.get('.close > [aria-hidden="true"]').click()
  
      cy.get('.accepted-websites-modal').should('not.exist');
    });

    it(`should display ${acceptedWebsites().length} accepted websites`, function () {
      cy.visit('/dashboard');

      cy.get(':nth-child(3) > a').click();

      cy.get('.website-text').should('have.length', acceptedWebsites().length);
    })
  })
  it('should be able to navigate to /account', function () {
    cy.visit('/dashboard');    

    cy.get(':nth-child(4) > a').click();

    cy.url().should('include', '/account');
  });
})
