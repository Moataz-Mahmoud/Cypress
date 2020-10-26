//import { baseURL } from '../../../cypress';
/// <reference types="Cypress" />

describe('Create a new meta attribute and delete it', () => {

  before(() => {
    Cypress.env('attribute_meta_name', (Math.random()).toString(36).substring());
  });

  it('create profile attribute meta', () => {
    cy.request(
      {
        method: 'POST',
        url: 'https://stag-core.uplandcxm.com/api/profile_attribute_metas',

        headers:
        {
          'Authorization': Cypress.env('token'),
        },

        body:
        {
          profile_attribute_meta:
          {
            "name": Cypress.env('attribute_meta_name'),
            "type": Cypress.env('attribute_meta_type'),
            "description": ""
          }

        },
      }).then((response) => {
        Cypress.env('attribute_meta_id', response.body.id);
        expect(response.status).to.eq(201)
      })
  })

  it.only('delete profile attribute meta from profile', () => {
    // check that company has custom attributes
    cy.request(
      {
        method: 'GET',
        url: 'https://stag-core.uplandcxm.com/api/profile_attribute_metas?page_size=1000',

        headers:
        {
          'Authorization': Cypress.env('token'),
        },

        body:
        {

        },
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        Cypress.env('number_of_attributes', response.body.total_records_count)
      })

    // delete custom attribute
    cy.request(
      {
        method: 'DELETE',
        url: 'https://stag-core.uplandcxm.com/api/profile_attribute_metas/'
            + Cypress.env('attribute_meta_id'),

        headers:
        {
          'Authorization': Cypress.env('token'),
        },

        body:
        {

        },
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('message', 'deleted successfully')
      })

    //Check attribute is deleted
    cy.request(
      {
        method: 'GET',
        url: 'https://stag-core.uplandcxm.com/api/profile_attribute_metas?page=2',

        headers:
        {
          'Authorization': Cypress.env('token'),
        },

        body:
        {

        },
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.pagination_meta).to.have.property('total_records_count',
               (Cypress.env('number_of_attributes') - 1))
        //expect(response.body.records[0].name).to.not.equal('nationality')
      })
  })

})