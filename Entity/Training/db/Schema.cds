namespace Training_Management.db;

entity TRAINER {
    key trainer_id   : String;
        name         : String;
        email        : String;
        phone        : String;
        experience   : Integer;
        availability : Association to many TRAINER_AVAILABILITY
                           on availability.trainer = $self;
        batch        : Association to many BATCH
                           on batch.trainer = $self;
        skill        : Association to many SKILL
                           on skill.trainer = $self;
        // payment: Association to  many PAYMENT on payment.trainer=$self ;

}

entity TRAINER_AVAILABILITY {
    key availability_id : String;
        available_date  : Date;
        start_time      : Time;
        end_time        : Time;
        status          : String;
        trainer         : Association to TRAINER;
}

entity COURSE {
    key course_id   : String;
        course_name : String;
        description : String;
        duration    : Integer;
        level       : String;
        batch       : Association to many BATCH
                          on batch.course = $self;
        skill       : Association to many SKILL
                          on skill.course = $self;
        certificate : Association to many CERTIFICATE
                          on certificate.course = $self;
}


entity TRAINEE {
    key trainee_id    : String;
        name          : String;
        email         : String;
        phone         : String;
        qualification : String;
        certificate   : Association to many CERTIFICATE
                            on certificate.trainee = $self;
        enrollment    : Association to many ENROLLMENT
                            on enrollment.trainee = $self;
        assessment    : Association to many ASSESSMENT
                            on assessment.trainee = $self;
        result:Association to  many RESULT on result.trainee=$self;       

        feedback:Association to many FEEDBACK on feedback.trainee=$self;



}

entity SKILL {
    key skill_id    : String;
        skill_name  : String;
        description : String;
        category    : String;
        trainer     : Association to TRAINER;
        course      : Association to COURSE;
}



entity BATCH {
    key batch_id   : String;
        assessment : Association to many ASSESSMENT
                         on assessment.batch = $self;
        enrollment:Composition of   many ENROLLMENT on enrollment.batch=$self;
        batch_name : String;
        start_date : Date;
        end_date   : Date;
        mode       : String;
        trainer    : Association to TRAINER;
        course     : Association to COURSE;
        schedule:Composition of  many  SCHEDULE on schedule.batch=$self;
}

entity CERTIFICATE {
    key certificate_id : String;
        issue_date     : Date;
        duration       : Integer;
        course         : Association to COURSE;
        trainee        : Association to TRAINEE;
}

entity ENROLLMENT {
    key enrollment_id   : String;
        trainee         : Association to TRAINEE;
        batch:Composition of   BATCH;
        enrollment_date : Date;
        status          : String
}

entity RESULT {
    key result_id     : String;
        score         : Integer;
        result_status : String;
        trainee:Association to  TRAINEE;
}

entity ASSESSMENT {
    key assessment_id   : String;
        batch           : Association to BATCH;
        assessment_type : String;
        total_marks     : Integer;
        assessment_date : Date;
        trainee         : Association to TRAINEE
}
entity  FEEDBACK{
key feedback_id : String ;
trainee:Association to  TRAINEE;
rating :Integer;
comments:String;

}

entity PAYMENT{
 key   payment_id:String ;
// trainer:Association to TRAINEE;
amount :Integer;
payment_date :Date;
status:String;
}

entity SCHEDULE {
   key schedule_id : String;
   batch           : Association to   BATCH;
   session_date    : Date;
   start_time      : Time;
   end_time        : Time;
   topic           : String;
}

