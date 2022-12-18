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
    cy.get('#username').type('cypress').should('have.value', 'cypress');
    cy.get('#password').type('password').should('have.value', 'password');
    // cy.get('#username').type('testFosug').should('have.value', 'testFosug');
    // cy.get('#password').type('testFosug').should('have.value', 'testFosug');
    cy.get('button').contains('Sign In').click();
    cy.get('button').contains('ACTIVITY');
    // cy.get('button').contains('LOGOUT').click();
    cy.get('[data-testid="test_profile"]').click();
    cy.get('button').contains('UPLOAD').click();
    cy.get('input[type=file]').selectFile('C:\\Users\\kexin\\OneDrive\\桌面\\ysy-557-final\\project---design-hw1-pokemon-go\\pokegram\\src\\images\\jieni.jpg');
    cy.get('[id="post_content"]').type('This is cypress. Hello!');
    cy.get('button').contains('Create').click();
    cy.get('[data-testid="test_profile"]').click();
    cy.get('[data-testid="test_post"]');
  })
})