describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    /*
    cy.get('button').contains('Sign Up');
    cy.get('button').contains('Sign Up').click();
    cy.get('#fullname').type('cypress test').should('have.value', 'cypress test');
    cy.get('#username').type('cypress').should('have.value', 'cypress');
    cy.get('#password').type('password').should('have.value', 'password');
    cy.get('#emailaddress').type('cypress@upenn.edu').should('have.value', 'cypress@upenn.edu');
    cy.get('button').contains('Sign Up').click();
    cy.get('button').contains('Sign In').click();
    */
    // cy.get('#username').type('cypress').should('have.value', 'cypress');
    // cy.get('#password').type('password').should('have.value', 'password');
    cy.get('#username').type('testFosug').should('have.value', 'testFosug');
    cy.get('#password').type('testFosug').should('have.value', 'testFosug');
    cy.get('button').contains('Sign In').click();
    cy.get('button').contains('ACTIVITY');
    // cy.get('button').contains('LOGOUT').click();
    cy.contains('.MuiCard-root');
  })
})