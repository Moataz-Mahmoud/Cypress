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
      payload.append('name', 'liistt');
      payload.append('file1', file);
    }).then((body) => {
      cy.request({
        method: "POST",
        url: "https://stag-core.uplandcxm.com/api/static_groups",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY3RpdmVfY29tcGFueV9pZCI6IjUzOTVjYjlmLWRhMDEtNDhjZi05YThmLTU1NmQwMTE3NDUwNyIsImFjdGl2ZV9jb21wYW55X25hbWUiOiJSQ1MgQ29tcGFueSAyIiwiYXVkIjoiVU1NIiwiZXhwIjoxNjA1ODM3OTc2LCJpYXQiOjE2MDM0MTg3NzYsImlzcyI6IlVNTSIsImp0aSI6ImY5ZTg1YzAzLWE4MzQtNDljNy1hYjIzLWEyM2JkNmU0YjNmNSIsIm5iZiI6MTYwMzQxODc3NSwic3ViIjoiYzQyODMyZjktNDdmZC00NThhLWJiOTEtMmRlZjQ0OTExMmUzIiwidHlwIjoiYWNjZXNzIiwidXNlcl9jb21wYW55X2lkIjpudWxsLCJ1c2VyX3JvbGUiOiJzdXBlcl91c2VyIn0.07a4HB4wp2fAR1Wy7j77Z4JVnWCerYoBZBr9tLdVJ6aDZ4ZS3dy5o3qhtN6gdRFFWwyrcwTBJyVFCY6K_vtXDQ",
          "Content-Type": "multipart/form-data"
        },
        body: {
          body
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