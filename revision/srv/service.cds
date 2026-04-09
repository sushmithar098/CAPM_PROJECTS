using {Empdept as db} from  '../db/schema' ;

service Edapi {
    entity Emp as projection on db.Employee;
    entity Dept  as projection on db.Department;

}