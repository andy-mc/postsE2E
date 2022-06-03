"use strict"

describe("Post", () => {
  beforeEach(() => {
    cy.exec("npm run db:reset")
    cy.fixture("user.json").as("userFixture")
    cy.visit("/login")

    cy.get("@userFixture").then((user) => {
      cy.createUser(user);
      cy.visit('dashboard')
      cy.wait(3000)
    })
  })

  beforeEach(() => {
    cy.contains('.button', "Crear").as("createButton")
  })

  it("should create a post", () => {
    cy.get("@userFixture").then((user) => {
      cy.get("@createButton").should("not.be.enabled");
      cy.get('.create-post').type(Cypress.env("postContent"))
      cy.get("@createButton").click()
      cy.get("@createButton").should("be.enabled");
      cy.contains(".post", user.name).should("be.visible");
      cy.contains(".post", Cypress.env("postContent")).should("be.visible");
    })
  })
})