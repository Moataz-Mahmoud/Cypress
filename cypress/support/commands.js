// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//Did not work
Cypress.Commands.add("form_request", (url, formData) => {
  return cy
    .server()
    .route("POST", url)
    .as("formRequest")
    .window()
    .then(win => {

      var xhr = new win.XMLHttpRequest();
      xhr.open("POST", url);
      xhr.setRequestHeader("authorization", "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY3RpdmVfY29tcGFueV9pZCI6IjllYjM1ZGYyLTM5YjMtNDM1Yi1iZmU2LWE4NDliYjM1MGUyNCIsImFjdGl2ZV9jb21wYW55X25hbWUiOiJHdWNjaSBDby4iLCJhdWQiOiJVTU0iLCJleHAiOjE2MDU2MjQ1MzEsImlhdCI6MTYwMzIwNTMzMSwiaXNzIjoiVU1NIiwianRpIjoiMDBhZTQ3OTUtMTcyNS00ZmYyLWIxNjItNjM1NGRlOGU1ZmM4IiwibmJmIjoxNjAzMjA1MzMwLCJzdWIiOiJjNDI4MzJmOS00N2ZkLTQ1OGEtYmI5MS0yZGVmNDQ5MTEyZTMiLCJ0eXAiOiJhY2Nlc3MiLCJ1c2VyX2NvbXBhbnlfaWQiOm51bGwsInVzZXJfcm9sZSI6InN1cGVyX3VzZXIifQ.xxUEvgDEiXKhpllIKlsw5vz8ut1nqa2suhvSVuTxEEKgyitbeLVIhTB6_Fsm6Crb2lOtIxMgef14Md_Tq_yglQ");
      //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xhr.setRequestHeader("Content-Type", "application/json")
      xhr.send(formData);

    })
    .wait("@formRequest");
});

//Error in the body
Cypress.Commands.add('fileRequest', (filePath, requestOptions) => {
  return cy
    .fixture(filePath, 'base64')
    .then(binary => Cypress.Blob.base64StringToBlob)
    .then(blob => {
      const payload = new FormData();
      payload.append('name', 'liistt');
      payload.append('file1', blob);

      // cy.request({ ...requestOptions, form: true, body: formData  });
      cy.request({
        ...requestOptions,
        form: true,
        body:
        {
          payload
        }
      });
    });
});

Cypress.Commands.add("Client", () => {
  const payload = new FormData();
  cy.fixture('../fixtures/static_list.csv', 'base64')
    .then(binary => Cypress.Blob.base64StringToBlob)
    .then((file) => {
      payload.set('name', 'liistt');
      payload.set('file1', file);
      console.log(payload.get('file1'))
    }).then(() => {
      cy.request({
        method: "POST",
        url: "https://stag-core.uplandcxm.com/api/static_groups",
        headers: {
          "Authorization": Cypress.env('token'),
          "Content-Type": "multipart/form-data"
        },
        body: {
          payload
        }
      }).its("body");
    })
})

Cypress.Commands.add('form', (method, url, formData, done) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = () => {
    done(xhr);
  };
  xhr.onerror = () => {
    done(xhr);
  };
  xhr.send(formData);
})

Cypress.Commands.add('form_me', (url) => {
  const fileName = '../fixtures/static_list.csv'
  const fileType = 'multipart/form-data'

  // Get file from fixtures as binary
  cy.fixture(fileName, 'binary').then((excelBin) => {
    Cypress.Blob.binaryStringToBlob(excelBin, fileType).then((blob) => {
      // Build up the form
      const payload = new FormData();
      payload.set('file1', blob, fileName); //adding a file to the form
      payload.set('name', 'Ahmed'); //adding a plain input to the form

      const xhr = new XMLHttpRequest();
      xhr.open(url);
      xhr.send(payload);
    })
  })
})