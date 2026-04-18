using {Vehiclemanagement.db as db} from '../db/Vehicleschema';


service transportsapi {

    entity vehicle   as projection on db.Vehicles;

    // entity vehicle1  as
    //     select from vehicle {
    //         count(vehicle_regno ) as vr
    //     }  ;
  
    entity order     as projection on db.Orders;
    entity dealer    as projection on db.Dealers;
    entity states    as projection on db.States;

    // entity state1    as
    //     select from states {
    //          state_code
    //     };

    entity customer  as projection on db.Customer;
    entity payment   as projection on db.Payment;
  
  action getdetails() returns String ; 

 

}
