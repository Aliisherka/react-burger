describe('service is available', function() {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[type="email"]').type('alish@mail.ru');
        cy.get('input[type="password"]').type('123456');
        cy.contains('Войти').click();

        cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
        cy.intercept("POST", "api/orders", { fixture: "order.json" });
        cy.intercept("GET", "api/auth/user", { fixture: "user.json" });

        cy.contains('Конструктор').click();

        window.localStorage.setItem(
            "refreshToken",
            JSON.stringify("test-refreshToken")
          );
          cy.setCookie('accessToken', 'test-accessToken')
    });

    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    })

    it('should drag and drop constructor', () => {
        cy.get('[data-cy="dragIngredients"]#643d69a5c3f7b9001cfa093c').drag('[data-cy="dropIngredients"]');
        cy.get('[data-cy="droppedIngredients"]').should('contain', 'Краторная булка N-200i');

        cy.get('[data-cy="dragIngredients"]#643d69a5c3f7b9001cfa093f').drag('[data-cy="dropIngredients"]');
        cy.get('[data-cy="droppedIngredients"]').contains('Мясо бессмертных моллюсков Protostomia').should('contain', 'Мясо бессмертных моллюсков Protostomia');

        cy.contains('Оформить заказ').click();

        cy.contains('123').should('exist');

        cy.get('[data-cy="closeBtn"]').click();

        cy.url().should('eq', 'http://localhost:3000/');
    })

    it('should open popup with detail ingredient', () => {
        cy.contains('Флюоресцентная булка R2-D3').click();

        cy.url().should('contain', 'ingredients/643d69a5c3f7b9001cfa093d');

        cy.contains('Детали ингредиента').should('contain', 'Детали ингредиента');
        cy.get('[data-cy="ingredientName"]').should('contain', 'Флюоресцентная булка R2-D3');

        cy.get('[data-cy="closeBtn"]').click();

        cy.url().should('eq', 'http://localhost:3000/');
    })
}); 