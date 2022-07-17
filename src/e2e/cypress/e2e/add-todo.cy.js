describe("simulate list test - adding, deleting, editing checking, sorting and filtering", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("verify all items in app except list and items", () => {
    cy.get('.Title_title__zQhcS').should('be.visible')
    cy.get('.Filter_switch__Yh5Wl').should('be.visible')
    cy.get('.SortTodos_sort__9zont').should('be.visible')
    cy.get('.TodoInput_todoInput__Fi6zP').should('be.visible')
    cy.get('.addButton').should('be.visible')
    cy.get('.Footer_todosCount__HZrEC').should('be.visible')
    cy.get('.clearAllButton').should('be.visible')
  });

  it('start in clean list and verify that list is empty', () => {
    cy.get('.clearAllButton').click()
    cy.get('.Footer_todosCount__HZrEC').contains('You have 0 pending tasks')
    cy.get('.EmptyTodosShow_enterTodotitle__Ibzbd').should('be.visible')
  })

  it('add single todo - regular todo', () => {
    cy.get('.TodoInput_todoInput__Fi6zP').type('buy milk')
    cy.get('.addButton').click()
    cy.get('.TodoList_todoListContainer__6tM1I').should('be.visible') //just for the first time
    cy.get('.TodoItem_todoTitle__iloo0').eq(0).should('contain.text', 'buy milk')
    cy.get('.Footer_todosCount__HZrEC').contains('You have 1 pending tasks')
  })

  it('add single todo (with enter)- pokemon todo', () => {
    cy.get('.TodoInput_todoInput__Fi6zP').type('22').type('{enter}')
    cy.wait(500) //need for show in ui (it works without it because anything rendered from server) and for pass test
    cy.get('.TodoItem_todoTitle__iloo0').eq(1).contains('catch fearow with type normal/flying/')
    cy.get('.Footer_todosCount__HZrEC').contains('You have 2 pending tasks') 
  })

  it('add multiple todo (with enter)- pokemon todo', () => {
    cy.get('.TodoInput_todoInput__Fi6zP').type('1, 2').type('{enter}')
    cy.wait(500)
    cy.get('.TodoItem_todoTitle__iloo0').eq(2).contains('catch bulbasaur with type grass/poison/')
    cy.get('.TodoItem_todoTitle__iloo0').eq(3).contains('catch ivysaur with type grass/poison/')
    cy.get('.Footer_todosCount__HZrEC').contains('You have 4 pending tasks') 
  })

  it('delete last item - pokemon todo', () => {
    cy.get('.TodoItem_delete__oEDz7').eq(3).click()
    cy.get('.TodoItem_todoTitle__iloo0').eq(0).contains('buy milk')
    cy.get('.TodoItem_todoTitle__iloo0').eq(1).contains('catch fearow with type normal/flying/')
    cy.get('.TodoItem_todoTitle__iloo0').eq(2).contains('catch bulbasaur with type grass/poison/')
    cy.get('.Footer_todosCount__HZrEC').contains('You have 3 pending tasks') 
  })

  it('edit first item value', () => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad(win) {
        cy.stub(win, 'prompt').returns('buy fruits')
      }
    })
    cy.get('.TodoItem_edit__eD8dL').eq(0).click()
    cy.window().its('prompt').should('be.called')
    cy.get('.TodoItem_todoTitle__iloo0').eq(0).contains('buy fruits')
    cy.get('.TodoItem_todoTitle__iloo0').eq(1).contains('catch fearow with type normal/flying/')
    cy.get('.TodoItem_todoTitle__iloo0').eq(2).contains('catch bulbasaur with type grass/poison/')
  })
  
  it('check items', () => {
    cy.get('.TodoItem_todoItem__W2FYf > input').eq(0).click()
    cy.get('.TodoItem_todoItem__W2FYf > input').eq(1).click()
  })

  it('uncheck items', () => {
    cy.get('.TodoItem_todoItem__W2FYf > input').eq(0).click()
  })

  it('sort a-z', () => {
    cy.get('select').select('A-Z').should('have.value', 'atoz')
    cy.wait(500)
    cy.get('.TodoItem_todoTitle__iloo0').eq(0).contains('buy fruits')
    cy.get('.TodoItem_todoTitle__iloo0').eq(1).contains('catch bulbasaur with type grass/poison/')
    cy.get('.TodoItem_todoTitle__iloo0').eq(2).contains('catch fearow with type normal/flying/')
  })

  it('sort z-a', () => {
    cy.get('select').select('Z-A').should('have.value', 'ztoa')
    cy.wait(500)
    cy.get('.TodoItem_todoTitle__iloo0').eq(0).contains('catch fearow with type normal/flying/')
    cy.get('.TodoItem_todoTitle__iloo0').eq(1).contains('catch bulbasaur with type grass/poison/')
    cy.get('.TodoItem_todoTitle__iloo0').eq(2).contains('buy fruits')
  })

  it('sort done-undone', () => {
    cy.get('select').select('DONE-UNDONE').should('have.value', 'dtou')
    cy.wait(500)
    cy.get('.TodoItem_todoTitle__iloo0').eq(0).contains('catch fearow with type normal/flying/')
    cy.get('.TodoItem_todoTitle__iloo0').eq(1).contains('buy fruits')
    cy.get('.TodoItem_todoTitle__iloo0').eq(2).contains('catch bulbasaur with type grass/poison/')
  })

  it('sort undone-done', () => {
    cy.get('select').select('UNDONE-DONE').should('have.value', 'utod')
    cy.wait(500)
    cy.get('.TodoItem_todoTitle__iloo0').eq(0).contains('buy fruits')
    cy.get('.TodoItem_todoTitle__iloo0').eq(1).contains('catch bulbasaur with type grass/poison/')
    cy.get('.TodoItem_todoTitle__iloo0').eq(2).contains('catch fearow with type normal/flying/')
  })

  it('back to original list', () => {
    cy.get('select').select('ALL LIST')
    cy.wait(500)
    cy.get('.TodoItem_todoTitle__iloo0').eq(0).contains('buy fruits')
    cy.get('.TodoItem_todoTitle__iloo0').eq(1).contains('catch fearow with type normal/flying/')
    cy.get('.TodoItem_todoTitle__iloo0').eq(2).contains('catch bulbasaur with type grass/poison/')
  })

  it('filter done', () => {
    cy.get('.Filter_slider__Ye2bw').click()
    cy.get('.TodoItem_todoTitle__iloo0').eq(0).contains('catch fearow with type normal/flying/')
    cy.get('.Footer_todosCount__HZrEC').contains('You have 1 pending tasks') 
  })

  it('filter undone', () => {
    cy.get('.Filter_slider__Ye2bw').click()
    cy.get('.TodoItem_todoTitle__iloo0').eq(0).contains('buy fruits')
    cy.get('.TodoItem_todoTitle__iloo0').eq(1).contains('catch bulbasaur with type grass/poison/')
    cy.get('.Footer_todosCount__HZrEC').contains('You have 2 pending tasks') 
  })

  it('return orginal list', () => {
    cy.get('select').select('A-Z').should('have.value', 'atoz')
    cy.get('select').select('ALL LIST')
  })
});
