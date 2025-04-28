describe('Open site', () => {
  it('Should open the homepage successfully', () => {
    cy.visit('https://practicesoftwaretesting.com')
    cy.get('body').should('be.visible')
  })
})

describe('Header', () => {
  it('Should display logo and header links', () => {
    cy.visit('https://practicesoftwaretesting.com')
    cy.get('a[title="Practice Software Testing - Toolshop"]').should('be.visible')
    cy.contains('Home').should('be.visible')
    cy.contains('Categories').should('be.visible')
    cy.contains('Contact').should('be.visible')
    cy.contains('Sign in').should('be.visible')
  })

  it('Should display dropdown with links when clicking on сategories', () => {
    cy.visit('https://practicesoftwaretesting.com')
    cy.get('[data-test="nav-categories"]').click()
    cy.get('.navbar-nav > .dropdown > .dropdown-menu').should('be.visible')
    cy.get('[data-test="nav-hand-tools"]').should('contain.text', 'Hand Tools')
  })
})

describe('Language Switcher', () => {

  it('Should switch language to DE (German)', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="language-select"]').click()
    cy.get('[data-test="lang-de"]').click()
    cy.get('button').should('contain', 'DE')
    cy.contains('Sortieren')
  })

  it('Should switch language to EN (English)', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="language-select"]').click()
    cy.get('[data-test="lang-en"]').click()
    cy.get('button').should('contain', 'EN')
    cy.contains('Sort')
  })

  it('Should switch language to ES (Spanish)', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="language-select"]').click()
    cy.get('[data-test="lang-es"]').click()
    cy.get('button').should('contain', 'ES')
    cy.contains('Ordenar')
  })

  it('Should switch language to FR (French)', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="language-select"]').click()
    cy.get('[data-test="lang-fr"]').click()
    cy.get('button').should('contain', 'FR')
    cy.contains('Trier')
  })

  it('Should switch language to NL (Dutch)', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="language-select"]').click()
    cy.get('[data-test="lang-nl"]').click()
    cy.get('button').should('contain', 'NL')
    cy.contains('Sorteren')
  })

  it('Should switch language to TR (Turkish)', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="language-select"]').click()
    cy.get('[data-test="lang-tr"]').click()
    cy.get('button').should('contain', 'TR')
    cy.contains('Sırala')
  })

})

describe('Search functionality', () => {
  it('Should search for pliers', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="search-query"]').type('pliers')
    cy.get('[data-test="search-submit"]').click()

    cy.contains('Combination Pliers')
    cy.contains('Pliers')
    cy.contains('Long Nose Pliers').should('exist')
    cy.contains('Claw Hammer with Shock Reduction Grip').should('not.exist')
  })

  it('Should show no results for nonexistent product', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="search-query"]').type('test')
    cy.get('[data-test="search-submit"]').click()

    cy.contains('There are no products found')
  })

  it('Should reset results after clearing search', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="search-query"]').type('pliers')
    cy.get('[data-test="search-submit"]').click()
    cy.contains('Combination Pliers')
    cy.get('[data-test="search-reset"]').click()

    cy.get('.card').should('have.length.greaterThan', 1)
  })
})



describe('Filters', () => {

})



describe('Product Card', () => {
  it('Should navigate to Slip Joint Pliers product page', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="product-01JSZ36S4VWB69JYRWAYESACGZ"]').click()

    cy.url().should('include', '/product/')
    cy.get('[data-test="product-name"]').should('contain', 'Slip Joint Pliers')
  })

  it('Should display correct price for Combination Pliers', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="product-01JSZ36S4J6QR9SRRPEWCX2XKD"]').find('[data-test="product-price"]').should('contain', '$14.15')
  })
})

describe('Sort by Name Alphabetical', () => {
  it('Should sort products by name alphabetically', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="sort"]').select('Name (A - Z)')

    let names = []
    cy.get('.card').each(($el) => {
      names.push($el.text().trim())
    }).then(() => {
      const sorted = [...names].sort((a, b) => a.localeCompare(b))
      expect(names).to.deep.equal(sorted)
    })
  })

  it('Should sort products by name reverse alphabetically (Z-A)', () => {
    cy.visit('https://practicesoftwaretesting.com')
  
    cy.get('[data-test="sort"]').select('Name (Z - A)')
  
    let names = []
    cy.get('.card').each(($el) => {
      names.push($el.text().trim())
    }).then(() => {
      const sorted = [...names].sort((a, b) => b.localeCompare(a))
      expect(names).to.deep.equal(sorted)
    })
  })

  it('Should sort products by price ascending (Low - High)', () => {
    cy.visit('https://practicesoftwaretesting.com')
  
    cy.get('[data-test="sort"]').select('Price (Low - High)')
  
    let prices = []
    cy.get('[data-test="product-price"]').each(($el) => {
      const price = parseFloat($el.text().replace('$', '').trim())
      prices.push(price)
    }).then(() => {
      const sorted = [...prices].sort((a, b) => a - b)
      expect(prices).to.deep.equal(sorted)
    })
  })

  it('Should sort products by price descending (High to Low)', () => {
    cy.visit('https://practicesoftwaretesting.com')
  
    cy.get('[data-test="sort"]').select('Price (High - Low)')
  
    let prices = []
    cy.get('[data-test="product-price"]').each(($el) => {
      const price = parseFloat($el.text().replace('$', '').trim())
      prices.push(price)
    }).then(() => {
      const sorted = [...prices].sort((a, b) => b - a)
      expect(prices).to.deep.equal(sorted)
    })
  })
})