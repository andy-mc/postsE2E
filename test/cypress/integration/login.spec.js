"use strict"

describe("Login foooo", () => {
  before(() => {
    cy.exec("npm run db:reset")
  })

  beforeEach(() => {
    cy.fixture("user.json").as("userFixture")
    cy.visit("/login")
  })

  it("should register a user", () => {
    cy.get("@userFixture").then((user) => {
      cy.createUser(user);
    })
  })

  it("should login a user", () => {
    cy.get("@userFixture").then((user) => {
      cy.login(user.email, user.password)
      cy.contains("a", "Dashboard").should('be.visible')
    })
  })

  it("should fail login for incorrect user", () => {
    cy.get("@userFixture").then((user) => {
      cy.login(user.email, user.wrong_password)
      cy.get(".error-msg").should('exist')
      cy.get(".error-msg").should('be.visible')
    })
  })
})