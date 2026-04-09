const cds = require('@sap/cds');

module.exports = cds.service.impl(function async() {
    const { vehicle, order, dealer, states } = this.entities;

    this.before('CREATE', vehicle, async (req) => {
        const { price, model_name, state_ID } = req.data
        if (model_name == null || model_name == '') {
            req.error(400, ' required data is missing ');
        }
        if (price <= 0) {
            req.error(400, 'price cannot be zero or less than zero ')
        }
      this.on('CREATE', vehicle, async (req) => {
        const { state_ID } = req.data
        const state = await SELECT.one.from(states).where({ ID: state_ID });
        const randomid = Math.floor(1000 + Math.random() * 8000);
        req.data.vehicle_regno = state.state_code + randomid;
        await INSERT.into(vehicle).entries(req.data);
        return req.data;
    })
    })
    this.after('CREATE', vehicle, (data) => {
        console.log('Vehicle created:', data);
    })

    this.before('CREATE', dealer, async (req) => {
        const { dealer_id, dealer_name, location, vehicle_vehicle_id } = req.data
        if (!dealer_id || !dealer_name || !location || !vehicle_vehicle_id) {
            req.error(400, "All fields are required");

        }

        this.after('CREATE', dealer, (data) => {
            console.log('Dealer data created', data);

        })
    })
    this.before('CREATE', order, async (req) => {
        const { order_id, quantity, status, vehicle_vehicle_id } = req.data;
        if (!order_id || !quantity || !status || !vehicle_vehicle_id) {
            req.error(400, 'All fields are required')
        }

        this.after('CREATE', order, (data) => {
            console.log('Order data created', data);

        })
    })
    this.on('updatestatus', async (req) => {
        const { vehicle_id, new_status } = req.data
        await UPDATE(vehicle)
            .set({ vehicle_status: new_status })
            .where({ vehicle_id });


    })



    this.on('approveVehicle', async (req) => {
        const { vehicle_id } = req.data
        const code = vehicle_id.substring(0, 2);
        const new_status = 'Approved'
        const flag = await SELECT.one.from(states).where({ state_code: code });
        if (flag) {
            console.log(`Emit event starts`);

            await this.emit('updatestatus', { vehicle_id, new_status })
        }
        else {
            console.log(`Invalid vehicleid ${vehicle_id}`);

        }
    })

    this.on('getTotalOrderValue', async (req) => {
        const { order_id, vehicle_id } = req.data
        if (!order_id || !vehicle_id) {
            req.error(400, "Enter the validate data")
        }

        const state_data = await SELECT.one.from(vehicle).columns('state_ID').where({ vehicle_id });
        console.log(state_data);
        const state_id = state_data.state_ID; 
        const taxRecord = await SELECT.one.from(states).where({ ID: state_id });
        const tax = taxRecord.tax
        console.log(`the tax for ${vehicle_id} :`, tax);
        const pricerecord = await SELECT.one.from(vehicle).where({ vehicle_id })
        const price = pricerecord.price
        console.log(`the price for  ${vehicle_id} :`,price)
        const qtyrecord = await SELECT.one.from(order).where({ order_id })
        const qty = qtyrecord.quantity
        console.log(`the quantity for  ${order_id} :`,qty)
        const totalvalue = qty * price + (qty * price * tax / 100);
        console.log(`${totalvalue}`)
        await this.emit('updateorderstatus', { order_id, vehicle_id, totalvalue })
           return totalvalue;

    })

    this.on('updateorderstatus', async (req) => {

        const { order_id, totalvalue } = req.data;

        if (!order_id || !totalvalue) {
            req.error(400, "Enter valid data");
        }

        const paymentRecord = await SELECT.one.from(order).where({ order_id });
        const payment = paymentRecord.payment;

        console.log(`payment for ${order_id} : ${payment}`);
        console.log(`Total order Value : ${totalvalue}`);

        if (payment == totalvalue) {

            await UPDATE(order)
                .set({ status: 'Approved' })
                .where({ order_id });

        }
        else if (payment >= totalvalue / 2) {

            await UPDATE(order)
                .set({ status: 'Pending' })
                .where({ order_id });

        }
        else {

            await UPDATE(order)
                .set({ status: 'Rejected' })
                .where({ order_id });

        }

    })
})