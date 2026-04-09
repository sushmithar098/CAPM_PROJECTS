const cds = require('@sap/cds');
module.exports = cds.service.impl(async function () {
    const { dealer, states, vehicle, order, customer, payment } = this.entities;


    // this.on('getdetails', async (req) => {
    //     const geoService = await cds.connect.to('geo')
    //     try {
    //         const result = await geoService.send({
    //             method: 'GET',
    //             path: `/odata/v4/geolocation/getdistrictdetails(state='TamilNadu')`
    //         })
    //         console.log("result", result);
    //         return result.value[0].name
    //     } catch (error) {
    //         return req.error(500, error.message)
    //     }



    // })



    //CRUD FOR DEALER
    this.before('CREATE', dealer, async (req) => {
        const { dealer_id, dealer_name, location,latitude,longitude } = req.data
    
        if (dealer_id === null || dealer_id === '' || dealer_id === undefined) {
            req.error(400, 'required data id is missing')
        }
        if (dealer_name === null || dealer_name === '' || dealer_name === undefined) {
            req.error(400, 'required data dealername is missing')
        }
        if (location === null || location === '' || location === undefined) {
            req.error(400, 'required data location is missing')
        }
 
       
   })
  this.on('CREATE', dealer, async (req) => {
    const geoService = await cds.connect.to('geo')
    try {
        const result = await geoService.send({
            method: 'GET',
            path: `/odata/v4/geolocation/getLocationdetails(userinput='${(req.data.location)}')`
        })
        console.log("result", result)
        if (result.value && result.value.length > 0) {
            req.data.latitude = result.value[0].latitude
            req.data.longitude = result.value[0].longitude
        }

    } catch (error) {
        return req.error(500, error.message)
    }
    await INSERT.into(dealer).entries(req.data)
    return req.data
})
     this.after('CREATE', dealer, (data) => {
        const { dealer_id, dealer_name, location,latitude,longitude } = data
        console.log("Dealer created successfully");
        console.log("Dealerid:", dealer_id);
        console.log("Dealername:", dealer_name);
        console.log("Location:", location);
        console.log("latitude",latitude);
        console.log("longitude",longitude);
             
     })


    this.on('READ', dealer, async (req) => {
        if (req.params.length > 0) {
            const { dealer_id } = req.params[0]
            if (dealer_id) {
                return await SELECT.one.from(dealer).where({ dealer_id });

            }
        }

        return await SELECT.from(dealer);

    })



    this.before('UPDATE', dealer, async (req) => {
        const { dealer_id } = req.params[0]
        const { location } = req.data;

        if (dealer_id === null || dealer_id === '' || dealer_id === undefined) {
            req.error(400, 'required data id is missing')
        }
        if (location === null || location === '' || location === undefined) {
            req.error(400, 'required data location is missing')
        }
    })
    this.on('UPDATE', dealer, async (req) => {
        const { dealer_id } = req.params[0]
        const { location } = req.data;

        return await UPDATE(dealer).set({ location }).where({ dealer_id });


    })




    this.before('DELETE', dealer, async (req) => {
        const { dealer_id } = req.params[0];
        if (dealer_id === null || dealer_id === '' || dealer_id === undefined) {
            req.error(400, 'required data id is missing')
        }
    })
    this.on('DELETE', dealer, async (req) => {
        const { dealer_id } = req.params[0];


        return await DELETE.from(dealer).where({ dealer_id });


    })


    //CRUD FOR STATES


    this.before('CREATE', states, async (req) => {
        const { ID, state_code, state_name, tax } = req.data
        if (ID === '' || ID === null || ID <= 0) {
            req.error(400, 'Id cannot be zero or less than zero ')
        }
        if (state_code === '' || state_name === '') {
            req.error(400, 'fill the required data')
        }
        if (tax <= 0) {
            req.error(400, "tax cannot 0 or less than that")
        }

    })

    this.on('CREATE', states, async (req) => {
        await INSERT.into(states).entries(req.data);
        return req.data
    })
    this.after('CREATE', states, (data) => {
        const { ID, state_code, state_name } = data
        console.log("States created successfully");
        console.log("stateid:", ID);
        console.log("statecode:", state_code);
        console.log("state_name:", state_name);


    })
    this.on('READ', states, async (req) => {
        if (req.params.length > 0) {
            const { ID } = req.params[0]
            if (ID) {
                return await SELECT.one.from(states).where({ ID });

            }
        }
        return await SELECT.from(states)


    })
    this.before('DELETE', states, async (req) => {
        const { ID } = req.params[0]
        if (ID === null || ID === '') {
            req.error(400, 'Enter valid id ')
        }

    })
    this.on('DELETE', states, async (req) => {
        const { ID } = req.params[0]
        return await DELETE.from(states).where({ ID });


    })
    //CRUD FOR VEHICLE
    this.before('CREATE', vehicle, async (req) => {
        const { model_name, state_ID, newprice, dealer_dealer_id, vehicle_id } = req.data
        if (model_name === null || model_name === '' || model_name === undefined) {
            req.error(400, ' required data is missing ');
        }
        if (vehicle_id === null || vehicle_id === '' || vehicle_id === undefined) {
            req.error(400, ' required data is missing ');
        }
        if (newprice <= 0) {
            req.error(400, 'price cannot be zero or less than zero ')
        }
        const dealeardata = await SELECT.one.from(dealer).where({ dealer_id: dealer_dealer_id })
        if (!dealeardata) {
            req.error(404, 'dealer data not found');
        }

        const state = await SELECT.one.from(states).where({ ID: state_ID });
        if (!state) {
            req.error(404, 'State not found');
        }
    })


    this.on('CREATE', vehicle, async (req) => {
        const { state_ID } = req.data
        const state = await SELECT.one.from(states).where({ ID: state_ID });
        const randomid = Math.floor(1000 + Math.random() * 8000);
        req.data.vehicle_regno = state.state_code + randomid;
        await INSERT.into(vehicle).entries(req.data);
        return req.data;
    })
    this.after('CREATE', vehicle, (data) => {
        const { vehicle_id, model_name, newprice, state_ID, vehicle_regno } = data
        console.log("Vehicle created successfully");
        console.log("Vehicle ID:", vehicle_id);
        console.log("vehicleRegistrationNumber:", vehicle_regno)
        console.log("Model Name:", model_name);
        console.log("Price:", newprice);
        console.log("State:", state_ID);

    })

    this.on('READ', vehicle, async (req) => {
        if (req.params.length > 0) {
            const { vehicle_id } = req.params[0]


            if (vehicle_id) {
                return await SELECT.one.from(vehicle).where({ vehicle_id })

            }
        }
        return await SELECT.from(vehicle)

    })
    this.before('UPDATE', vehicle, async (req) => {
        const { vehicle_id } = req.params[0];
        const { newprice } = req.data;

        if (vehicle_id === '' || vehicle_id === null || vehicle_id === undefined) {
            req.error(400, 'Vehicle ID is required');
        }
        if (newprice <= 0) {
            req.error(400, 'New price must be greater than 0');
        }
    })
    this.on('UPDATE', vehicle, async (req) => {

        const { vehicle_id } = req.params[0]
        const { newprice } = req.data;


        const current = await SELECT.one.from(vehicle).where({ vehicle_id });
        if (!current) {
            req.error(404, 'vehicle not found')
        }
        const updateData = {
            oldprice: current.newprice,
            newprice: newprice
        };


        return await UPDATE(vehicle).set(updateData).where({ vehicle_id });

    });
    this.before('DELETE', vehicle, async (req) => {
        const { vehicle_id } = req.params[0]

        if (vehicle_id === '' || vehicle_id === null || vehicle_id === undefined) {
            req.error(400, 'Vehicle ID is required');
        }
    })

    this.on('DELETE', vehicle, async (req) => {
        const { vehicle_id } = req.params[0]
        return await DELETE.from(vehicle).where({ vehicle_id })

    })
    //CRUD Customer
    this.before('CREATE', customer, async (req) => {
        const { customerid, name, phone, address } = req.data
        if (customerid === '' || customerid === null || customerid === undefined) {
            req.error(400, 'customer id is required')
        }
        if (name === null || name.length < 3) {
            req.error(400, 'give a validate name')
        }
        if (!phone || !phone.startsWith('+') || phone.length < 9 || phone.length > 16) {
            req.error(400, "Invalid phone number");
        }
        if (address === '' || address === null) {
            req.error(400, 'address  is required')
        }
    })



    this.on('CREATE', customer, async (req) => {

        await INSERT.into(customer).entries(req.data)
        return req.data


    })
    this.after('CREATE', customer, (data) => {
        const { customerid, name, phone, address } = data
        console.log("Customer created successfully");
        console.log("customerid:", customerid);
        console.log("customername :", name);
        console.log("customerphonenumber :", phone);
        console.log("customeraddress:", address);


    })
    this.on('READ', customer, async (req) => {
        if (req.params.length > 0) {
            const { customerid } = req.params[0]
            if (customerid) {
                return await SELECT.one.from(customer).where({ customerid })

            }
        }
        return await SELECT.from(customer)


    })
    this.before('UPDATE', customer, async (req) => {
        const { customerid } = req.params[0];
        const { phone } = req.data;
        if (customerid === '' || customerid === null) {
            req.error(400, 'id is required')
        }
        if (!phone || !phone.startsWith('+') || phone.length < 9 || phone.length > 16) {
            req.error(400, "Invalid phone number");
        }
    })
    this.on('UPDATE', customer, async (req) => {
        const { customerid } = req.params[0];
        const { phone } = req.data;
        return await UPDATE(customer).set({ phone }).where({ customerid })

    })
    this.before('DELETE', customer, async (req) => {
        const { customerid } = req.params[0];
        if (customerid === '' || customerid === null) {
            req.error(400, 'customer id is required')
        }
    })
    this.on('DELETE', customer, async (req) => {
        const { customerid } = req.params[0];
        return await DELETE.from(customer).where({ customerid })

    })

    //CRUD FOR ORDERS
    this.before('CREATE', order, async (req) => {
        const { order_id, vehicle_vehicle_id, customer_customerid, quantity } = req.data
        if (order_id === null || order_id === '') {
            req.error(400, 'order id is required')
        }
        if (quantity <= 0 || quantity === undefined) {
            req.error(400, 'quantity cannot less than or equal to 0')
        }

        const customerdata = await SELECT.one.from(customer)
            .where({ customerid: customer_customerid });

        if (!customerdata) {
            req.error(400, ' customer data does not exist');
        }
        const vehicledata = await SELECT.one.from(vehicle).where({ vehicle_id: vehicle_vehicle_id });

        if (!vehicledata) {
            req.error(400, 'vehicleid does not exist');
        }

    })


    this.on('CREATE', order, async (req) => {
        const { vehicle_vehicle_id, quantity } = req.data
        const vehicledata = await SELECT.one.from(vehicle).where({ vehicle_id: vehicle_vehicle_id })
        if (!vehicledata) {
            return req.error(400, `Vehicle id not found`)
        }
        const price = vehicledata.newprice
        const state_ID = vehicledata.state_ID
        const taxdetail = await SELECT.one.from(states).where({ ID: state_ID })
        if (!taxdetail) {
            return req.error(400, `State id not found`)
        }
        const tax = taxdetail.tax
        const totalpayment = price * quantity + (price * quantity * tax / 100)
        req.data.payment = totalpayment
        req.data.status = "processing"
        await INSERT.into(order).entries(req.data)
        return req.data
    })
    this.after('CREATE', order, (data) => {
        const { order_id, quantity, status } = data
        console.log("Order created successfully");
        console.log("orderId:", order_id);
        console.log("quantity :", quantity);
        console.log("status  :", status);



    })

    this.on('READ', order, async (req) => {
        if (req.params.length > 0) {
            const { order_id } = req.params[0]
            if (order_id) {
                return await SELECT.one.from(order).where({ order_id })

            }
        }
        return await SELECT.from(order)


    })
    this.before('UPDATE', order, async (req) => {
        const { order_id } = req.params[0]
        const { quantity } = req.data
        if (order_id === null || order_id === '') {
            req.error(400, 'order id is required')
        }

        if (quantity <= 0 || quantity === undefined) {
            req.error(400, 'quantity cannot less than or equal to 0')
        }

    })
    this.on('UPDATE', order, async (req) => {

        const { order_id } = req.params[0]
        const { quantity } = req.data
        return await UPDATE(order).set({ quantity }).where({ order_id })
    })
    this.before('DELETE', order, async (req) => {
        const { order_id } = req.params[0]
        if (order_id === null || order_id === '')
            req.error(400, 'order id is required')

    })
    this.on('DELETE', order, async (req) => {
        const { order_id } = req.params[0];
        return await DELETE.from(order).where({ order_id });


    });
    //CRUD Payment 
    this.before('CREATE', payment, async (req) => {
        const { paymentid, amount, order_order_id } = req.data
        if (paymentid === null || paymentid === '') {
            req.error(400, 'id is required')
        }
        if (amount <= 0) {
            req.error(400, 'amount should not be less than 0 or equal to 0')
        }
        const orderss = await SELECT.one.from(order).where({ order_id: order_order_id })
        if (!orderss) {
            req.error(400, 'give validate orderid')
        }

    })
    this.on('CREATE', payment, async (req) => {
        const { order_order_id, amount } = req.data

        let orderdata = await SELECT.one.from(order).where({ order_id: order_order_id })
        let payableamount = orderdata.payment
        if (payableamount === amount) {
            await UPDATE(order).set({ status: "Successful" }).where({ order_id: order_order_id })
        }
        else if (amount >= payableamount / 2) {
            await UPDATE(order).set({ status: "pending" }).where({ order_id: order_order_id })
        }
        else {
            await UPDATE(order).set({ status: "reject" }).where({ order_id: order_order_id })
        }
        await INSERT.into(payment).entries(req.data)
        return req.data
    })
    this.after('CREATE', payment, (data) => {
        const { paymentid, amount, paymentdate, paymentmode } = data
        console.log("Payment created successfully");
        console.log("paymentId:", paymentid);
        console.log("amount :", amount);
        console.log("paymentDate :", paymentdate);
        console.log("paymentmode :", paymentmode);


    })

    this.on('READ', payment, async (req) => {
        if (req.params.length > 0) {
            const { paymentid } = req.params[0]
            if (paymentid) {
                return await SELECT.one.from(payment).where({ paymentid })

            }
        }
        return await SELECT.from(payment)



    })
    this.before('UPDATE', payment, async (req) => {
        const { paymentid } = req.params[0];
        const { amount } = req.data;
        if (paymentid === null || paymentid === '') {
            req.error(400, "id is mandatory")
        }

        if (amount === null || amount === '' || amount <= 0) {
            req.error(400, "amount is required or no negative value ")
        }
        const paymentDetails = await SELECT.one.from(payment).where({ paymentid });

        if (!paymentDetails) {
            req.error(404, `Payment ${paymentid} not found`);
        }
        if (amount <= paymentDetails.amount) {
            req.error(400, `Updated amount must be greater than existing amount (${paymentDetails.amount})`);
        }
    })
    this.on('UPDATE', payment, async (req) => {
        const { paymentid } = req.params[0];
        const { amount } = req.data;
        return await UPDATE(payment).set({ amount }).where({ paymentid })


    })





})