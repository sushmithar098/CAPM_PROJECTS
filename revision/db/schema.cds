namespace Empdept;

entity Department {
    key id   : Integer;
    name     : String;
}

entity Employee {
    key id   : Integer;

    department_id : Integer not null;

    @cds.persistence.index: [{ unique: true, fields: ['department_id'] }]
    department : Association to one Department
                 on department.id = department_id;

    name : String;
}