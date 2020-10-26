// Build and send a form containing an excel file and other plain inputs directly to the backend

describe('Form Data', function () {
  
  const filePath = 'valid_static_group_Snewww (3).csv'
  const url = 'https://stag-core.uplandcxm.com/api/static_groups'
  const fileName = 'file2'

  before(() => { //run before the tests

    
  })

  it('Add value to the new attribute in profile an check data is added', () => {
    
    /*
    const formData = new FormData();
    formData.set("profile_attribute[profile_id]", "f09272c0-6445-45fc-9515-9e453cc0141e");
    formData.set("profile_attribute[profile_attribute_meta_id]", "5b5aaa37-3d01-4bd4-89d5-5bc81a157363");
    formData.set("profile_attribute[value]", "John Wick Movie :D");
    
    cy.request({
      url: "https://stag-core.uplandcxm.com/api/profile_attribute",
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY3RpdmVfY29tcGFueV9pZCI6IjllYjM1ZGYyLTM5YjMtNDM1Yi1iZmU2LWE4NDliYjM1MGUyNCIsImFjdGl2ZV9jb21wYW55X25hbWUiOiJHdWNjaSBDby4iLCJhdWQiOiJVTU0iLCJleHAiOjE2MDU2MjQ1MzEsImlhdCI6MTYwMzIwNTMzMSwiaXNzIjoiVU1NIiwianRpIjoiMDBhZTQ3OTUtMTcyNS00ZmYyLWIxNjItNjM1NGRlOGU1ZmM4IiwibmJmIjoxNjAzMjA1MzMwLCJzdWIiOiJjNDI4MzJmOS00N2ZkLTQ1OGEtYmI5MS0yZGVmNDQ5MTEyZTMiLCJ0eXAiOiJhY2Nlc3MiLCJ1c2VyX2NvbXBhbnlfaWQiOm51bGwsInVzZXJfcm9sZSI6InN1cGVyX3VzZXIifQ.xxUEvgDEiXKhpllIKlsw5vz8ut1nqa2suhvSVuTxEEKgyitbeLVIhTB6_Fsm6Crb2lOtIxMgef14Md_Tq_yglQ',
      },
      form: true,
      body: formData
    }).then(response => {
      console.log("response", response);

    });
    */
    const formData = new FormData();
    formData.set("profile_attribute[profile_id]", "f09272c0-6445-45fc-9515-9e453cc0141e");
    formData.set("profile_attribute[profile_attribute_meta_id]", "5b5aaa37-3d01-4bd4-89d5-5bc81a157363");
    formData.set("profile_attribute[value]", "John Wick Movie :D");
   cy
   .form_request(url, formData)
   .then(response => {
     // do stuff with your response
   });
    




    })
})