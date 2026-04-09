using {Transporation.db as db} from '../db/schema3';

service ordersapi {
    entity vehicle as projection on db.Vehicles;
    entity dealers as projection on db.Dealers;
    entity orders  as projection on db.Orders;
    action approveVehicle(Vehicle_ID : String,new_status:String) ;
    // function  getTotalOrderValue(Vehicle_ID:String) ;

}
