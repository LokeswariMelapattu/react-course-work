describe('Search Bar Functionality', () => {
  // Mock response from /api/players
  const mockPlayers = [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Test Player' },
  ];

  beforeEach(() => {
    // Intercept the API request and respond with mock players
    cy.intercept('GET', '/api/players', {
      statusCode: 200,
      body: mockPlayers,
    }).as('getPlayers');

    // Visit the application
    cy.visit('/');
  });

  it('should fetch and display players from the API', () => {
    // Wait for the API call
    cy.wait('@getPlayers');

    // Verify all players are displayed
    mockPlayers.forEach((player) => {
      cy.get('div').contains(player.name).should('be.visible');
    });
  });

  it('should display the search bar', () => {
    cy.get('input[placeholder="Search players..."]').should('exist');
  });

  it('should filter players based on search input', () => {
    // Type into the search bar
    cy.get('input[placeholder="Search players..."]').type('Player 1');

    // Verify only the matching player is displayed
    cy.get('div').contains('Player 1').should('be.visible');
    cy.get('div').contains('Player 2').should('not.exist');
    cy.get('div').contains('Test Player').should('not.exist');
  });

  it('should show all players when the search bar is cleared', () => {
    // Type into the search bar and clear it
    cy.get('input[placeholder="Search players..."]').type('Player 1').clear();

    // Verify all players are displayed again
    mockPlayers.forEach((player) => {
      cy.get('div').contains(player.name).should('be.visible');
    });
  });
});
