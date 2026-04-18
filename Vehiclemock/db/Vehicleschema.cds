namespace Vehiclemanagement.db;

using {managed} from '@sap/cds/common' ;


entity Vehicles :managed {
    key vehicle_id : String;
        vehicle_regno:String;
        oldprice   : Integer;
        newprice   : Integer;
        model_name : String;
        dealer : Association to Dealers;
       
        order      : Composition of many Orders
                         on order.vehicle = $self;
        state      : Association to States;   

}
entity Dealers {
    key dealer_id   : String;
        dealer_name : String;
        location    : String;
        latitude    : String;
        longitude   : String;
        vehicles : Association to many Vehicles
               on vehicles.dealer.dealer_id =dealer_id;
                       
}

entity Customer {
    key customerid : String;
        name       : String;
        phone      : String;
        address    : String;
        order      : Composition of many Orders
                         on order.customer = $self;
}



entity Orders {
    key order_id : String;
        quantity : Integer;
        payment  : Integer;
        status   : String;
        payments : Composition of many Payment
                       on payments.order = $self;
        vehicle  : Association to Vehicles;
        customer : Association to Customer;
}

entity States {

    key ID         : Integer;
        state_code : String;
        state_name : String;
        tax        : Decimal(3, 2);


}


entity Payment {
    key paymentid   : String;
        amount      : Decimal(10, 2);
        paymentdate : Timestamp;
        paymentmode : String;
        order       : Association to Orders;


}


