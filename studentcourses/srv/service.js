const cds = require('@sap/cds');
module.exports = cds.service.impl(function () {

    const { student ,course} = this.entities;

    // CREATE
    this.before('CREATE', student, (req) => {
        const { student_id, name, email, gender } = req.data;

        if (!student_id) req.error(400, 'Enter valid student ID');
        if (!name || name.length < 3) req.error(400, 'Enter valid name');
        if (!email) req.error(400, 'Enter valid email');
        if (!gender) req.error(400, 'Enter gender');
    });
    this.on('CREATE',student,async (req) => {
     const res= await INSERT.into(student).entries(req.data)
     console.log(res);
     
        return req.data
        
    })

    this.after('CREATE', student, (data) => {
        console.log("Student ID:", data.student_id);
        console.log(`Hello ${data.name}`);
    });

    // READ
    this.on('READ', student, async (req) => {
        const { student_id } = req.params[0] || {};

        if (student_id) {
            return await SELECT.one.from(student).where({ student_id });
        }

        return await SELECT.from(student);
    });

    // UPDATE
    this.before('UPDATE', student, (req) => {
        const { student_id } = req.params[0] || {};
        const { email } = req.data;

        if (!student_id) req.error(400, 'Enter valid ID');
        if (!email) req.error(400, 'Enter valid email');
    });

    this.on('UPDATE', student, async (req) => {
        const { student_id } = req.params[0] || {};
        const { email } = req.data;

        const existing = await SELECT.one.from(student).where({ student_id });

        if (!existing) {
            req.error(404, 'Student not found');
        }

        await UPDATE(student).set({ email }).where({ student_id });

        return await SELECT.one.from(student).where({ student_id });
    });

    this.after('UPDATE', student, (data) => {
        console.log(`Email of student ID ${data.student_id} has been updated to: ${data.email}`);
    });

//DELETE
    this.before('DELETE',student,async (req)=>{
        const{student_id}=req.params[0]
      if(!student_id){
        req.error(400,'student id is invalid')
      }

    })


 this.on('DELETE',student,async (req) => {
     const{student_id}=req.params[0]
      const deleteddata= await SELECT.from(student).where({student_id});
      await DELETE.from(student).where({student_id}) ;
        // return deleteddata ;
     

  const response = {
    message: 'Deleted successfully',
    data: deleteddata
  };
req._.res.status(200).json(response);
return response;
      
 })

 this.after('DELETE',student,async (data) => {
console.log('the deleted records is',data);
 
 })

 
//CURD COURSE
this.before('CREATE',course,async (req) => {
    const{ course_id,status,title, credits}=req.data
    if(!course_id)
    {
        return req.error(400,"course_id is not valid");
    }
    if(!status)
        return req.error(400,"status is not valid")
    if(!title)
        return req.error(400,"title should be valid")
    if(!credits)
        return req.error(400,"credits should be valid")
})

this.on('CREATE',course,async (req) => {
    await INSERT.into(course).entries(req.data)
    return req.data;
    
})
this.after('CREATE',course,async(data)=>{
    console.log(`The details of courses are ${data.course_id}`);
})
//READ
this.on('READ', course, async (req, next) => {
    const { course_id } = req.params[0] || {};

    // Let CAP handle everything (filter, expand, etc.)
    let result = await next();

    if (course_id) {
        return result;
    }


    return result;
});

//Update
this.on('UPDATE', course, async (req) => {
    const { course_id } = req.params[0];
    const olddata = await SELECT.one.from(course).where({ course_id });
    if (!olddata) {
        req.error(404, 'Course not found');
    }
   const oldcredit = olddata.credits;
    const newcredit = oldcredit * 100;
    await UPDATE(course)
        .set({ credits: newcredit })
        .where({ course_id });
    return await SELECT.one.from(course).where({ course_id });
});













    /*****What is req.params in CAP?

In SAP Cloud Application Programming Model,
req.params contains the key values passed in the URL.

👉 It is used when you access a specific record.

🔹 Simple Understanding
Example URL:
GET /student(101)

👉 Here:

101 is the key (student_id)
Inside CAP:
req.params

👉 Output:

[ { student_id: 101 } ]

✔ It is always an array of objects** */

});