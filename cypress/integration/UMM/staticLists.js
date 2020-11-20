//import { baseURL } from '../../../cypress';
/// <reference types="Cypress" />

describe('Testing the API', function () {

  it('Submit File', () => {
    //const filePath ='valid_static_group_Snewww (3).csv';

    cy.fileRequest("static_list.csv", {
      method: 'POST',
      url: 'https://stag-core.uplandcxm.com/api/static_groups',
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY3RpdmVfY29tcGFueV9pZCI6IjllYjM1ZGYyLTM5YjMtNDM1Yi1iZmU2LWE4NDliYjM1MGUyNCIsImFjdGl2ZV9jb21wYW55X25hbWUiOiJHdWNjaSBDby4iLCJhdWQiOiJVTU0iLCJleHAiOjE2MDU2MjQ1MzEsImlhdCI6MTYwMzIwNTMzMSwiaXNzIjoiVU1NIiwianRpIjoiMDBhZTQ3OTUtMTcyNS00ZmYyLWIxNjItNjM1NGRlOGU1ZmM4IiwibmJmIjoxNjAzMjA1MzMwLCJzdWIiOiJjNDI4MzJmOS00N2ZkLTQ1OGEtYmI5MS0yZGVmNDQ5MTEyZTMiLCJ0eXAiOiJhY2Nlc3MiLCJ1c2VyX2NvbXBhbnlfaWQiOm51bGwsInVzZXJfcm9sZSI6InN1cGVyX3VzZXIifQ.xxUEvgDEiXKhpllIKlsw5vz8ut1nqa2suhvSVuTxEEKgyitbeLVIhTB6_Fsm6Crb2lOtIxMgef14Md_Tq_yglQ',
      },
    });
  })

  it.only('submit file again', () => {
    // Perform the request
    cy.form_request(
      'https://stag-core.uplandcxm.com/api/static_groups'
    );
  })

it('Receives valid FormData and proccesses the information correctly', () => {
  const fileName = 'static_list.csv';
  const method = 'POST';
  const url = 'https://stag-core.uplandcxm.com/api/static_groups';
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const list_name = '7amada';
  const Authorization = 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY3RpdmVfY29tcGFueV9pZCI6IjUzOTVjYjlmLWRhMDEtNDhjZi05YThmLTU1NmQwMTE3NDUwNyIsImFjdGl2ZV9jb21wYW55X25hbWUiOiJSQ1MgQ29tcGFueSAyIiwiYXVkIjoiVU1NIiwiZXhwIjoxNjA1ODM3OTc2LCJpYXQiOjE2MDM0MTg3NzYsImlzcyI6IlVNTSIsImp0aSI6ImY5ZTg1YzAzLWE4MzQtNDljNy1hYjIzLWEyM2JkNmU0YjNmNSIsIm5iZiI6MTYwMzQxODc3NSwic3ViIjoiYzQyODMyZjktNDdmZC00NThhLWJiOTEtMmRlZjQ0OTExMmUzIiwidHlwIjoiYWNjZXNzIiwidXNlcl9jb21wYW55X2lkIjpudWxsLCJ1c2VyX3JvbGUiOiJzdXBlcl91c2VyIn0.07a4HB4wp2fAR1Wy7j77Z4JVnWCerYoBZBr9tLdVJ6aDZ4ZS3dy5o3qhtN6gdRFFWwyrcwTBJyVFCY6K_vtXDQ'

  // Get file from fixtures as binary
  cy.fixture(fileName, 'binary').then((excelBin) => {
    // File in binary format gets converted to blob so it can be sent as Form data
    let blob = Cypress.Blob.binaryStringToBlob(excelBin, fileType)

    // Build up the form
    const formData = new FormData();
    formData.set('file1', blob, fileName); //adding a file to the form
    formData.set('name', list_name); //adding a plain input to the form

    // Perform the request
    cy.form(method, url, formData, (response) => {
    });
  })
})
})