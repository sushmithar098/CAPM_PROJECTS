namespace studentcourse.db;

entity Student {
    key student_id : Integer;
        name       : String;
        email      : String;
        gender     : String enum {
            Male;
            Female;
            Others;
        };
        enroll     : Association to many Enrollment
                         on enroll.studid = $self;
}

type CourseStatus : String enum {
    Open    = 'O';
    Closed  = 'C';
    Ongoing = 'G';
};

entity Course {
    key course_id    : Integer;
        status       : CourseStatus;
        title        : String;
        credits      : Integer;
        enroll       : Association to many Enrollment
                           on enroll.courseid = $self;
        c_assessment : Association to many Course_assessment
                           on c_assessment.course = $self;
}

entity Enrollment {
    key studid   : Association to one Student;
    key courseid : Association to one Course;
}

entity Assignment {
    key assignment_id : Integer;
        title         : String;
        maxMarks      : Integer;
        a_course      : Association to many Course_assessment
                            on a_course.assignment = $self;
        submissions   : Composition of many Submission
                            on submissions.ass = $self;

}

entity Course_assessment {
    key course     : Association to one Course;
    key assignment : Association to one Assignment;
}

entity Submission {
    key submission_id : Integer;
        marks         : Integer;
        status        : String enum {
            Pass =  'P';
            Failed = 'F'; //data shpuld send like p or f and in database  p or f
        };
        student       : Association to one Student;
        ass           : Association to one Assignment

}
