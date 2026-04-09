using {Database as db} from '../db/Schema' ;
service details {
    entity person  as projection on db.Person;
    entity passport as projection on db.Passport;
    entity customer as projection on db.Customer;
    entity  order   as projection on  db.Orders;
    entity student as projection on db.Student;
    entity teacher as projection on db.Teacher;
    entity  enrollment as projection on db.Enrollments;
    entity course as projection on db.Course;
    entity car as projection on db.Car;
    entity engine as projection on db.Engine;
    entity house as projection on db.House;
    entity room as projection on db.Room;
    entity  author as projection on db.Author;
    entity book as projection on db.Book ;
    entity authorbook as projection  on db.AuthorBooks;



}