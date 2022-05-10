/// <reference types="cypress" />

describe('API tests', () => {
  it('asserts GetBooking', () => {
    cy.request('GET',`https://restful-booker.herokuapp.com/booking/1500`)
      .then(
        (response) => {
          expect(response.body).to.have.property('firstname','Edwin');
          expect(response.body).to.have.property('lastname','Hubble');
        }
      ).its('status')
       .should('equal', 200);

    cy.log('### Asserting a non-existing booking will return 404');
    cy.request({
      failOnStatusCode:false,
      url:'https://restful-booker.herokuapp.com/booking/1',
      method:'GET'
    }).its('status')
      .should('equal',404);
  });

  it('asserts CreateBooking', () => {
    cy.request('POST', 'https://restful-booker.herokuapp.com/booking',
    {
      "firstname" : "Giancarlo",
      "lastname" : "Zambi",
      "totalprice" : 111,
      "depositpaid" : true,
      "bookingdates" : {
          "checkin" : "2022-05-15",
          "checkout" : "2019-05-20"
      },
      "additionalneeds" : "I need beer!"
  }).then(
      (response) => {
        expect(response.body).to.have.property('bookingid');
        expect(response.body).to.have.property('booking');
      }
    ).its('status').should('equal',200)
  });

  it('asserts UpdateBooking', () => {
    cy.request({
      failOnStatusCode:false,
      url:'https://restful-booker.herokuapp.com/booking/1600',
      method:'PUT',
      headers: { Authorisation: 'YWRtaW46cGFzc3dvcmQxMjM=]' }, //I couldn't manage to Authorize this PUT :(
      body:{
        "firstname": "Samantha_updated",
        "lastname": "Jones_updated",
        "totalprice": 200,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2023-09-20",
          "checkout": "2024-10-03"
        },
        "additionalneeds": "I need another beer"
      }
    }).its('status')
      .should('equal',200);

  cy.log('### Asserting that the booking was correctly updated with the above information')
  cy.request('GET',`https://restful-booker.herokuapp.com/booking/1600`)
    .then(
      (response) => {
       expect(response.body).to.have.property('firstname','Samantha_updated');
       expect(response.body).to.have.property('lastname','Jones_updated');
       expect(response.body).to.have.property('totalprice',200);
       expect(response.body).to.have.property('depositpaid',true);
       expect(response.body).to.have.property('checkin','2023-09-20');
       expect(response.body).to.have.property('checkout','2024-10-03');
       expect(response.body).to.have.property('additionalneeds','I need another beer');
      }
    ).its('status')
     .should('equal', 200);
  })
})
