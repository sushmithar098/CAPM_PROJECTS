const cds = require('@sap/cds');
module.exports = cds.service.impl(function () {

    const { trainee, enrollment, result } = this.entities;

    this.before('CREATE', trainee, async (req) => {

        const { trainee_id, name, email, phone, qualification } = req.data;

        if (!trainee_id || !name || !qualification) {
            req.error(400, "Trainee data missing");
        }

        if (!email) {
            req.error(400, "Email is required");
        }

        const atcount = email.split('@').length - 1;
        const atpos = email.indexOf('@');
        const dotpos = email.lastIndexOf('.');

        if (atcount !== 1 || atpos <= 0 || atpos === email.length - 1 || dotpos <= atpos + 1 || dotpos === email.length - 1 || email.includes(' ')) {
            req.error(400, "Invalid email format");
        }
        if (!phone || !phone.startsWith('+') || phone.length < 9 || phone.length > 16) {
            req.error(400, "Invalid phone number");
        }
        const existingid = await SELECT.one.from(trainee).where({ trainee_id });
        if (existingid) {
            req.error(400, "Trainee ID already exists");
        }

    });
    this.on('UPDATE', trainee, async (req) => {

        const { trainee_id, email, phone } = req.data;

        const existingid = await SELECT.one
            .from(trainee)
            .where({ trainee_id });

        if (!existingid) {
            return req.error(400, "Trainee Id not found");
        }

        let data = {};

        if (email !== undefined) {
            data.email = email;
        }

        if (phone !== undefined) {
            data.phone = phone;
        }

        await UPDATE(trainee)
            .set(data)
            .where({ trainee_id });

        return await SELECT.one.from(trainee).where({ trainee_id });

    });
    this.after('UPDATE', trainee, (data) => {
        console.log("email updated successfully", data);

    })
    this.on('getTraineeCount', async (req) => {
        const { trainee_id } = req.data;

        const result = await SELECT.one
            .from(enrollment)
            .where({ trainee_trainee_id: trainee_id });

        return { total: result.length };
    });
    this.on('getTraineeCountsum', async () => {

        const result = await SELECT
            .from(trainee)
            .columns('count(*) as total');
        console.log(`Trainee count is ${result[0].total}`)
        return result[0].total;
    });

    this.on('changeTraineeStatus', async (req) => {
        const { trainee_id, batch_id, new_status } = req.data;

        const existingTrainee = await SELECT.one.from(trainee).where({ trainee_id });
        if (!existingTrainee) {
            req.error(400, "Trainee not found");
        }
        await UPDATE(enrollment)
            .set({ status: new_status })
            .where({ trainee_trainee_id: trainee_id, batch_batch_id: batch_id });

        const updatedRow = await SELECT.one.from(enrollment)
            .where({ trainee_trainee_id: trainee_id, batch_batch_id: batch_id });
        console.log(updatedRow);
        return updatedRow

    })
    const traineebatchcount = async (batch_id) => {
        const result = await SELECT.one.from(enrollment)
            .columns('count(*) as total')
            .where({ batch_batch_id: batch_id })
        return result?.total || 0
    }
    this.on('enrolltrainee', async (req) => {
        const { trainee_id, batch_id, enrollment_date, status } = req.data
        const currentStrength = await traineebatchcount(batch_id)
        console.log(`Batch ${batch_id} current strength: ${currentStrength}`)
        const capacity = 4
        if (currentStrength >= capacity) {
            throw req.error(400, `Batch ${batch_id} is full`)
        }

        await INSERT.into(enrollment).entries({
            trainee_trainee_id: trainee_id,
            batch_batch_id: batch_id,
            enrollment_date,
            status
        })
        console.log(`Trainee ${trainee_id} enrolled successfully`);

        return `Trainee ${trainee_id} enrolled successfully`
    })



    this.on('updateresult', async (req) => {

        const { trainee_id, assessment_id, score } = req.data

        if (!trainee_id) return req.error(400, 'Trainee id needed')
        if (!assessment_id) return req.error(400, 'Assessment id needed')
        if (score == null) return req.error(400, 'Score is required')

        let result_status
        if (score < 35)
            result_status = 'fail'
        else if (score < 50)
            result_status = 'average'
        else if (score < 79)
            result_status = 'good'
        else
            result_status = 'excellent'

        await INSERT.into(result).entries({
            trainee_trainee_id: trainee_id,
            assessment_assessment_id: assessment_id,
            score,
            result_status
        })
        console.log(`Result recorded as ${result_status}`);


        return `Result recorded as ${result_status}`
    })

    this.on('completeAssessment', async (req) => {
        const { trainee_id, assessment_id, score } = req.data
        console.log("Action triggered");
        await this.emit('updateresult', { trainee_id, assessment_id, score })
        return 'Assessment completed'
    })

})





