namespace Transporation.db;

entity Vehicles {
    key vehicle_id     : String;
        vehicleregno   : String ;
        price          : Integer;
        model_name     : String;
        vehicle_status : String;
        vehicle_state  : String;
        deal           : Association to many Dealers
                             on deal.vehicle = $self;
        order          : Composition of many Orders
                             on order.vehicle = $self;
        state          : Association to States;


}

entity Dealers {
    key dealer_id   : String;
        dealer_name : String;
        location    : String;
        vehicle     : Association to Vehicles;
}

entity Orders {
    key order_id : String;
        quantity : Integer;
        payment  : Integer;
        status   : String;
        vehicle  : Association to Vehicles;
}


entity States {

    key ID         : Integer;
        state_code : String;
        state_name : String;
        tax        : Decimal(3,2);
}
