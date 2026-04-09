const cds = require('@sap/cds');


module.exports = cds.service.impl(function () {

    const { student } = this.entities;

    // CREATE
    this.before('CREATE', student, (req) => {
        const { student_id, name, email, gender } = req.data;

        if (!student_id) req.error(400, 'Enter valid student ID');
        if (!name || name.length < 3) req.error(400, 'Enter valid name');
        if (!email) req.error(400, 'Enter valid email');
        if (!gender) req.error(400, 'Enter gender');
    });

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