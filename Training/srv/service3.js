const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
 
  const { vehicle } = this.entities;


 this.before('CREATE',vehicle,(req)=>{

   let data = req.data;

   const statePrefix = {
     "Tamil Nadu": "TN",
     "Karnataka": "KA",
     "Kerala": "KL",
     "Andhra Pradesh": "AP",
     "Telangana": "TS",
     "Maharashtra": "MH"
   };

   let prefix = statePrefix[data.state];

   if(prefix){
      data.vehicle_id = prefix + Math.floor(Math.random()*1000);
   }

 });




  this.on('approveVehicle', async (req) => {

    const { Vehicle_ID,new_status } = req.data;

    const vehicle1 = await SELECT.one.from(vehicle)
      .where({ Vehicle_ID });

    if (!vehicle1) {
      return `Vehicle with ID ${Vehicle_ID} not found`;
    }

    
    await UPDATE(vehicle)
      .set({ Status: new_status })
      .where({ Vehicle_ID });
console.log(`Vehicle ${Vehicle_ID} approved successfully`);

    return `Vehicle ${Vehicle_ID} approved successfully`;
  });

});