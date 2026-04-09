namespace Training_Management.db;
entity TRAINEE {
    key trainee_id    : String;
        name          : String;
        email         : String;
        phone         : String;
        qualification : String;
        enroll        : Association to many ENROLLMENT
                            on enroll.trainee = $self;
        result        : Association to many RESULT
                            on result.trainee = $self;


}

entity ASSESSMENT {
    key assessment_id   : String;
        batch           : Association to BATCH;
        assessment_type : String;
        score           : Integer;
        assessment_date : Date;
        result          : Composition of many RESULT
                              on result.assessment = $self;
}

entity BATCH {
    key batch_id   : String;
        batch_name : String;
        start_date : Date;
        end_date   : Date;
        mode       : String;
        enroll     : Association to many ENROLLMENT
                         on enroll.batch = $self

}
entity ENROLLMENT {

    key trainee         : Association to TRAINEE;
    key batch           : Association to BATCH;
        enrollment_date : Date;
        status          : String

}
entity RESULT {
    key trainee       : Association to TRAINEE;
    key assessment    : Association to ASSESSMENT;
        score         : Integer;
        result_status : String;
}

