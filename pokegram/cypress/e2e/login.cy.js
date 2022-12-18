describe('Test that we can login', () => {
  it('passes if we login with correct username & password', () => {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('testFosug').should('have.value', 'testFosug')
    cy.get('#password').type('testFosug').should('have.value', 'testFosug')
    cy.get('button').contains('Sign In').click()
    // cy.get('button[data-testid="login_submit"]').click()
  })
})