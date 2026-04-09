using {Transporation.db as db} from '../db/Schema1';

service transportapi {
    entity vehicle as projection on db.Vehicles;
    entity order   as projection on db.Orders;
    entity dealer as projection on db.Dealers;
    entity states  as projection on db.States;
    action approveVehicle(vehicle_id:String) ;
    function getTotalOrderValue (order_id:String,vehicle_id:String) returns Decimal(11,2);
    }
