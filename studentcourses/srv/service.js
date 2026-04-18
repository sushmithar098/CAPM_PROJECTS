const cds=require('@sap/cds');
module.exports=cds.service.impl(function (){
const{student}=this.entities ;
/************CRUD STUDENT********************** */
//CREATE
this.before('CREATE',student,async(req)=>{

})
})