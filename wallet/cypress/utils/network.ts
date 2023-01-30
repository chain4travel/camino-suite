
export function changeNetwork (cy: any) 
{
    cy.get('.css-1nt3z7i > .MuiInputBase-root > .MuiSelect-select').click(); //Network Switcher
    cy.get('[data-value="Columbus"] > .MuiTypography-root').click(); //Select Columbus Network
}