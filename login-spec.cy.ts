describe('OrangeHRM - Successful Login', () => {
  it('Login and verify PIM is visible', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard/index');
    cy.contains('PIM').should('be.visible');
  });
});

describe('OrangeHRM - Wrong Password', () => {
  it('Shows error when password is wrong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('WrongPass');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('be.visible').and('contain.text', 'Invalid credentials');
  });
});

describe('OrangeHRM - Wrong Username', () => {
  it('Shows error when username is wrong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content').should('be.visible').and('contain.text', 'Invalid credentials');
  });
});

describe('OrangeHRM - Add Employee with Login Details', () => {
  it('Admin can add a new employee and create login details', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard/index');

    cy.contains('PIM').click();
    cy.contains('Add').click();

    cy.get('input[name="firstName"]').type('raya');
    cy.get('input.oxd-input.oxd-input--active').eq(1).type('A');
    cy.get('input.oxd-input.oxd-input--active').eq(2).type('salem');
    cy.get('input.oxd-input.oxd-input--active').eq(3).type('12245');

    cy.get('.oxd-switch-wrapper').click();

    cy.get('input.oxd-input.oxd-input--active').eq(5).type('rayass');
    cy.get('input.oxd-input.oxd-input--active').eq(5).type('StrongPass123!');
    cy.get('input.oxd-input.oxd-input--active').eq(6).type('StrongPass123!');

    cy.get('button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space')
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true });

    cy.contains('h6', 'raya A salem ', { timeout: 10000 }).should('be.visible');
  });
});
