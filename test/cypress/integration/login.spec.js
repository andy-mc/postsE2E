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
      cy.contains("Crear una cuenta").click()
      cy.get("#name").type(user.name)
      cy.get("#title").type(user.company)
      cy.get("#email2").type(user.email)
      cy.get("#password2").type(user.password)
      cy.contains(".button", "Registrarse").click()
      cy.wait(3000)
      cy.get(".error-msg").should('not.exist')
    })
  })

  it("should login a user", () => {
    cy.get("@userFixture").then((user) => {
      cy.login(user.email, user.password)
      cy.contains(".button", "Ingresar").click()
      cy.wait(3000)
      cy.contains("a", "Dashboard").should('be.visible')
    })
  })

  it("should fail login for incorrect user", () => {
    cy.get("@userFixture").then((user) => {
      cy.login(user.email, user.wrong_password)
      cy.contains(".button", "Ingresar").click()
      cy.wait(3000)
      cy.get(".error-msg").should('exist')
      cy.get(".error-msg").should('be.visible')
    })
  })
})