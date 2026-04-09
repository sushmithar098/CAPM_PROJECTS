namespace TM.db;
 
entity TRAINER {
    key trainer_id   : String;
        name         : String;
        email        : String;
        phone        : String;
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