namespace Transporation.db;

entity Vehicles {
  key Vehicle_ID : String;
      Price      : Integer;
      Model_Name : String;
      vehicle_status : String;
      deal       : Association to many Dealers
                     on deal.vehicle = $self;
      order      : Composition of many Orders
                     on order.vehicle = $self;


}

entity Dealers {
  key Dealer_ID   : String;
      Dealer_Name : String;
      Location    : String;
      vehicle     : Association to Vehicles;
}

entity Orders {
  key Order_ID : String;
      Quantity : Integer;
      vehicle  : Association to Vehicles;
}

entity states{
  key state_id:String;
   state_code:String;
   state_name:String;
   tax:Double;
}