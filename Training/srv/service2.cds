
 using { Ordermanagement as db } from '../db/schema2';
service orderapi {
    entity customer as projection on db.Customer; // no field listing
    entity order as projection on db.Order;
}
