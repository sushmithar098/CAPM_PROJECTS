const cds = require('@sap/cds'); 
module.exports = cds.service.impl(async function () {
    const {student,student_draft} = this.entities;
this.before('CREATE',student,async(req)=>{
const bundle = cds.i18n.bundle4(req)
console.log(bundle);
const {name,id} =req.data;
if(!id) return req.reject(400,bundle.at('idRequired'))
if(!name) return req.reject(400,bundle.at('nameRequired'))
})
 
this.on('getdata',async () => {
  const originalstudent =await SELECT.from(student) ;
  const draftstudent =await SELECT.from(student_draft);
  console.log(originalstudent);
  console.log(draftstudent);
    
    
})


 
})