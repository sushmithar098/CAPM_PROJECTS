namespace Training_Management.db;

entity TRAINER {
    key trainer_id   : String;
        name         : String;
        email        : String;
        phone        : String;
        experience   : Integer;
        salary       : Double;
        availability : Association to many TRAINER_AVAILABILITY
                           on availability.trainer = $self;
        batch        : Association to many BATCH
                           on batch.trainer = $self;
        skills       : Association to many TRAINER_SKILL
                           on skills.trainer = $self;


}

entity TRAINER_SKILL {
    key trainer           : Association to TRAINER;
    key skill             : Association to SKILL;
        proficiency       : String;
        skill_experiences : Integer;
}


entity SKILL {
    key skill_id    : String;
        skill_name  : String;
        description : String;
        category    : String;
        trainers    : Association to many TRAINER_SKILL
                          on trainers.skill = $self;
        course      : Association to many COURSE_SKILL
                          on course.skill = $self;
}

entity COURSE {
    key course_id   : String;
        course_name : String;
        description : String;
        duration    : Integer;
        level       : String;
        batch       : Association to many BATCH
                          on batch.course = $self;
        skill       : Association to many COURSE_SKILL
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
        enroll        : Association to many ENROLLMENT
                            on enroll.trainee = $self;
        result        : Association to many RESULT
                            on result.trainee = $self;


}


entity COURSE_SKILL {
    key course       : Association to COURSE;
    key skill        : Association to SKILL;
        weightage    : Integer;
        prerequisite : String;
}


entity TRAINER_AVAILABILITY {
    key availability_id : String;
        available_date  : Date;
        start_time      : Time;
        end_time        : Time;
        status          : String;
        trainer         : Association to TRAINER;
}

entity BATCH {
    key batch_id   : String;
        assessment : Association to many ASSESSMENT
                         on assessment.batch = $self;
        batch_name : String;
        start_date : Date;
        end_date   : Date;
        mode       : String;
        trainer    : Association to TRAINER;
        course     : Association to COURSE;
        enroll     : Association to many ENROLLMENT
                         on enroll.batch = $self

}

entity CERTIFICATE {
    key certificate_id : String;
        issue_date     : Date;
        duration       : Integer;
        course         : Association to COURSE;
        trainee        : Association to TRAINEE;
}

entity ENROLLMENT {

    key trainee         : Association to TRAINEE;
    key batch           : Association to BATCH;
        enrollment_date : Date;
        status          : String

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


entity RESULT {
    key trainee       : Association to TRAINEE;
    key assessment    : Association to ASSESSMENT;
        score         : Integer;
        result_status : String;
}

entity PAYMENT {
    key payment_id   : String;

        amount       : Decimal;
        payment_date : Date;
        status       : String;
}

entity FEEDBACK {
    key feedback_id : Integer;

        rating      : Integer;
        comments    : String;
}

entity ATTENDANCE {

    attendance_id : Integer;
    // enrollment_id
    session_date  : Date;
    status        : String;
    remarks       : String;
}

entity SCHEDULE {

    schedule_id  : Integer;
    session_date : Date;
    start_time   : Time;
    end_time     : Time;
    topic        : String;

}
