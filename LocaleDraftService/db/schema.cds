namespace mydb;
@odata.draft.enabled
entity Students {
    key id      : Integer;
        name    : localized String(100);
        email   : String(100);
        age     : Integer;

        courses : Composition of many Courses
                      on courses.student = $self;
}    

entity Courses {
    key id          : Integer;
        title       : localized String(100);
        description : localized String(255);
        duration    : Integer;

        student     : Association to Students;
}
