describe('Login', () => {
  beforeEach(() => {
    cy.request('/api/cleardb');
  });

  it('should be able to navigate to "/account/register" when clicking "Create an account" on Login page', function() {
    cy.visit('/account/login');

    cy.get('.register-text > a').click();

    cy.url().should('include', '/account/register');
  });

  it('should be able to register an account and see verify prompt', function() {
    cy.visit('/account/register');

    cy.get('.username-input').type('testUsername');

    cy.get('.password-input').type('testPassword')

    cy.get('.email-input').type('test@email.com')

    cy.get('.register-button').click();

    cy.url().should('include', '/account/verify');

    cy.get('.align-center').contains('email');
  });

  it('should be able to log into a newly registered account taking them to "/dashboard"', function() {
    cy.request('POST', '/api/account/register', {
      username: 'testUsername',
      email: 'test@email.com',
      password: 'testPassword',
    });

    cy.visit('/account/login');

    cy.get('#username').type('testUsername');
    cy.get('#password').type('testPassword');

    cy.get('.login-button').click();

    cy.url().should('include', '/dashboard');
  });

  it('should prompt user if username is not filled out', function() {
    cy.visit('/account/register');

    cy.get('.password-input').type('testPassword')
    cy.get('.email-input').type('test@email.com')

    cy.get('.register-button').click();

    cy.get('p').contains('No username was given');
  })

  it('should prompt user if password is not filled out', function() {
    cy.visit('/account/register');

    cy.get('.username-input').type('testUsername');
    cy.get('.email-input').type('test@email.com')

    cy.get('.register-button').click();

    cy.get('p').contains('No password was given');
  })

  it('should prompt user if email is not filled out', function() {
    cy.visit('/account/register');

    cy.get('.username-input').type('testUsername');
    cy.get('.password-input').type('testPassword');

    cy.get('.register-button').click();
    
    cy.get('p').contains('No email given');
  })

  it('should be prompted with an error is an account already exists with that username', () => {
    cy.request('POST', '/api/account/register', {
      username: 'testUsername',
      email: 'test@email.com',
      password: 'testPassword',
    });

    cy.visit('/account/register');

    cy.get('.username-input').type('testUsername');
    cy.get('.password-input').type('testPassword')
    cy.get('.email-input').type('test@email.com')

    cy.get('.register-button').click();

    cy.get('p').contains('A user with the given username is already registered');
  })

  it('should be able to stub out the login endpoint', function() {
    /**
     * This test is to demo how we can stub out server request
     */
    cy.server();
    cy.route('POST', '/api/account/login', true);
    cy.route('/api/account/user', {
      _id: '1',
      username: 'test',
      email: 'test@email.com',
      verification: { status: true },
      savedRecipes: [],
    });

    cy.route('/api/recipe', [])

    cy.visit('/account/login');

    cy.get('.username-input').type('testUsername');
    cy.get('.password-input').type('testPassword')

    cy.get('.login-button').click();

    cy.contains('no recipes');
  });
});
