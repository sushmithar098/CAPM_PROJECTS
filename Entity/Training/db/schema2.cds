// namespace sampleOrder.db;
 
// entity Order{
//     key ID:String;
//     item: Composition of many OrderItem on item.order=$self;
// }
// entity OrderItem{
//     key ID: String;
//     product:String;
//     order:Association to Order;
 
// }



namespace TM.db;

entity TRAINER {
    key trainer_id   : String;
        name         : String;
        email        : String;
        phone        :String;
        experience   : Integer;
        availability : Association to many TRAINER_AVAILABILITY
                           on availability.trainer = $self;
     
}

entity TRAINER_AVAILABILITY {
    key availability_id : String;
        available_date  : Date;
        start_time      : Time;
        end_time        : Time;
        status          : String;
        trainer         : Association to TRAINER;
}
