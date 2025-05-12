/** @format */

// https://blog.dai.codes/cypress-loading-state-tests/

export function interceptIndefinitely(requestMatcher, response) {
	let sendResponse = () => {};
	// Create a Promise and capture a reference to its resolve function so that we can resolve it when we want to:
	const trigger = new Promise((resolve) => {
		sendResponse = resolve;
	});

	// Intercept requests to the URL we are loading data from and do not let the response occur until our above Promise is resolved
	cy.intercept(requestMatcher, (request) => {
		return trigger.then(() => {
			request.reply(response);
		});
	});

	return { sendResponse };
}

export const clickListPlayer = (playerIndex) => {
	cy.get('#players-list li').eq(playerIndex).find('a').click();
};

export const checkCheckbox = () => {
	cy.get('#checkbox-label').click();
};

export const checkRequestStatus = (status) => {
	// let getInterception = interceptIndefinitely(url, { ...players[playerIndex] });

	return cy.get('#request-status').contains(status, { matchCase: false });
};

export const checkboxStatusShouldBe = (keyword) => {
	if (keyword === 'checked') {
		cy.get('#checkbox').should('be.checked');
	}
	if (keyword === 'unchecked') {
		cy.get('#checkbox').should('not.be.checked');
	}
};

export const updateButtonShouldBe = (keyword) => {
	if (keyword === 'enabled') {
		cy.get('.btn-update').should('be.enabled');
	}
	if (keyword === 'disabled') {
		cy.get('.btn-update').should('not.be.enabled');
	}
};

export const clickUpdateButton = () => {
	cy.get('.btn-update').click();
};

export const findAndClickButton = (buttonType) => {
	// Find button
	cy.get('.btn-' + buttonType).should('exist');
	// Click button
	cy.get('.btn-' + buttonType).click();
};

export const selectedShouldBe = (name) => {
	cy.get('#selected-player').contains(name);
};
