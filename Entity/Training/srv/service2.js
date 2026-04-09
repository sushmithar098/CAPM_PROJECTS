// // const cds = require('@sap/cds');
 
// // module.exports = cds.service.impl(async function () {
 
// //     // const {  TRAINER } = this.entities;
 
// //     this.before('CREATE','' TRAINER', async (req) => {
 
// //         console.log("Before CREATE triggered");
 
// //         // Check if ID is provided
// //         if (!req.data.ID) {
// //             req.error(400, "TRAINER  ID is required");
// //         }
 
// //         // Check if ID already exists
// //         const existingOrder = await SELECT.one
// //             .from(TRAINER )
// //             .where({ ID: req.data.ID });
 
// //         if (existingOrder) {
// //             req.error(400, "TRAINER ID already exists");
// //         }
 
// //     });
 
// // });

// const cds = require('@sap/cds');

// module.exports = cds.service.impl(function () {

//     //async
//     this.before('CREATE', 'TRAINER',  (req) => {

//         const { ID, phone } = req.data;

      
//         // if (!ID || ID.trim() === "") {
//         //     return req.error(400, "TRAINER ID is required");
//         // }

       
//         if ( phone.trim().length!=1=0) {
//             return req.error(400, "Phone number must be exactly 10 digits");
//         }

        

//         // const existingTrainer = await SELECT.one
//         //     .from('TRAINER')
//         //     .where({ ID: ID });

//         // if (existingTrainer) {
//         //     return req.error(400, "TRAINER ID already exists");
//         // }

//     });

// });


const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {

    this.before('CREATE', 'TRAINER', async (req) => {
        const { trainer_id, phone } = req.data;

        // 1️⃣ Check if ID is provided
        if (! trainer_id|| trainer_id.trim() === "") {
            return req.error(400, "TRAINER ID is required");
        }

        // 2️⃣ Check if ID already exists in DB
        const existingTrainer = await SELECT.one.from('TRAINER').where({ trainer_id: trainer_id });
        if (existingTrainer) {
            return req.error(400, "TRAINER ID already exists");
        }

        // 3️⃣ Check if phone is provided
        if ( phone.length!=10) {
            return req.error(400, "Phone number is required");
        }

        // 4️⃣ Check if phone is exactly 10 digits
        // if (!/^\d{10}$/.test(phone.trim())) {
        //     return req.error(400, "Phone number must contain exactly 10 digits");
        // }

        console.log("All validations passed ✅");
    });

});
