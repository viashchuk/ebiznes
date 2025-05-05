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
    cy.get('a[title="Practice Software Testing - Toolshop"]').should('have.attr', 'href', '/')

    cy.contains('Home').should('be.visible')
    cy.contains('Home').should('have.class', 'nav-link')

    cy.contains('Categories').should('be.visible')
    cy.contains('Categories').should('have.class', 'nav-link')

    cy.contains('Contact').should('be.visible')
    cy.contains('Contact').should('have.class', 'nav-link')

    cy.contains('Sign in').should('be.visible')
    cy.contains('Sign in').should('have.class', 'nav-link')

    cy.contains('Sign in').should('have.attr', 'href').and('include', '/login')
  })

  it('Should display dropdown with links when clicking on сategories', () => {
    cy.visit('https://practicesoftwaretesting.com')
    cy.get('[data-test="nav-categories"]').click()
    cy.get('.navbar-nav > .dropdown > .dropdown-menu').should('be.visible')
    cy.get('[data-test="nav-hand-tools"]').contains('Hand Tools')
  })
})

describe('Language Switcher', () => {

  it('Should switch language to DE (German)', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="language-select"]').click()
    cy.get('[data-test="lang-de"]').click()
    cy.get('button').contains('DE')
    cy.contains('Sortieren')
  })

  it('Should switch language to EN (English)', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="language-select"]').click()
    cy.get('[data-test="lang-en"]').click()
    cy.get('button').contains('EN').should('exist')
    cy.contains('Sort').should('exist')
  })

  it('Should switch language to ES (Spanish)', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="language-select"]').click()
    cy.get('[data-test="lang-es"]').click()
    cy.get('button').contains('ES').should('exist')
    cy.contains('Ordenar').should('exist')
  })

  it('Should switch language to FR (French)', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="language-select"]').click()
    cy.get('[data-test="lang-fr"]').click()
    cy.get('button').contains('FR').should('exist')
    cy.contains('Trier').should('exist')
  })

  it('Should switch language to NL (Dutch)', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="language-select"]').click()
    cy.get('[data-test="lang-nl"]').click()
    cy.get('button').contains('NL').should('exist')
    cy.contains('Sorteren').should('exist')
  })

  it('Should switch language to TR (Turkish)', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="language-select"]').click()
    cy.get('[data-test="lang-tr"]').click()
    cy.get('button').contains('TR').should('exist')
    cy.contains('Sırala').should('exist')
  })

})

describe('Search functionality', () => {
  it('Should search for pliers', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="search-query"]').type('pliers')
    cy.get('[data-test="search-query"]').should('have.value', 'pliers')

    cy.get('[data-test="search-submit"]').should('be.enabled')
    cy.get('[data-test="search-submit"]').click()

    cy.contains('Combination Pliers').should('exist')
    cy.contains('Pliers').should('exist')
    cy.contains('Long Nose Pliers').should('exist')
    cy.contains('Claw Hammer with Shock Reduction Grip').should('not.exist')
    cy.get('.card-title').first().contains('Pliers') 
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
    cy.get('[data-test="search-reset"]').should('be.visible')
    cy.get('[data-test="search-reset"]').click()

    cy.get('.card').should('have.length.greaterThan', 1)
  })
})


describe('Filters', () => {
  it('Should filter by Hand Saw category', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="category-01JTG52YMJ0ZH5CYPMRW11WFD9"]').check()
    cy.get('[data-test="category-01JTG52YMJ0ZH5CYPMRW11WFD9"]').should('be.checked')
    cy.wait(500)

    cy.get('.card').should('exist')   
    cy.get('.card-title').contains('Wood Saw').should('exist') 
  })

  it('Should filter by MightyCraft Hardware brand', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="brand-01JTG52YK49D9B1B7WZ5ZQVB24"]').check()
    cy.get('[data-test="brand-01JTG52YK49D9B1B7WZ5ZQVB24"]').should('be.checked')
    cy.wait(500)

    cy.get('.card').should('exist')   
    cy.get('.card-title').contains('Claw Hammer').should('exist') 
  })
})


describe('Product Card', () => {
  it('Should navigate to Combination Pliers product page', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="product-01JTG52YNVXSE95JS37D3QQ2Q6"]').click()

    cy.url().should('include', '/product/')
    cy.get('[data-test="product-name"]').contains('Combination Pliers')
    cy.get('[data-test="product-name"]').should('be.visible')
    cy.get('[data-test="product-description"]').should('exist')
    cy.get('[alt="Combination Pliers"]')
          .should('be.visible')
          .and(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0)
          })
  })

  it('Should display correct price for Combination Pliers', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="product-name"]').contains('Combination Pliers')
    cy.get('[data-test="product-name"]').should('be.visible')
    cy.get('[data-test="product-price"]').should('be.visible')
    cy.get('[data-test="product-01JTG52YNVXSE95JS37D3QQ2Q6"]').find('[data-test="product-price"]').contains('$14.15')
  })
})


describe('Sort by', () => {
  it('Should sort products by name alphabetically', () => {
    cy.visit('https://practicesoftwaretesting.com')

    cy.get('[data-test="sort"]').select('Name (A - Z)')

    let names = []
    cy.wait(500)
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
    cy.wait(500)
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
    cy.wait(500)
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
    cy.wait(500)
    cy.get('[data-test="product-price"]').each(($el) => {
      const price = parseFloat($el.text().replace('$', '').trim())
      prices.push(price)
    }).then(() => {
      const sorted = [...prices].sort((a, b) => b - a)
      expect(prices).to.deep.equal(sorted)
    })
  })
})