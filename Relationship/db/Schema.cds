namespace Database;

entity Person {

  key ID       : Integer;
      name     : String;
    
}
@assert.unique: { a: [person] }
entity Passport {
  key ID     : Integer;
     number : String;
      person : Association to one Person; //one to one managed association
         
 
}


entity Customer {
  key ID   : UUID;
      name : String;

}

entity Orders {
  key ID       : UUID;
      item     : String;
      @assert.type: 'mandatory' // Order must have a customer
      customer : Association to one Customer; // Many-to-One managed association
}

entity Teacher {
  key TeacherID : Integer;
      name      : String;
      subject   : String;
      student   : Association to many Student
                    on student.teacher = $self;
}


entity Student {
  key StudentID : Integer;
      name      : String;
      Class     : Integer;
      teacher   : Association to Teacher; //one to many unmanaged association
      enroll    : Association to many Enrollments
                    on enroll.students = $self;

}

entity Course {
  key CourseID : Integer;
      title    : String;
      enroll   : Association to many Enrollments
                   on enroll.courses = $self;

}

entity Enrollments {
  key courses  : Association to Course;
  key students : Association to Student; //many to many unmanaged
}

//Composition

entity Car {
  key ID     : Integer;
      engine : Composition of one Engine
                 on engine.car = $self;
}

entity Engine {
  key ID   : Integer;
      type : String;
      car  : Association to Car; //one to one
}

entity House {
  key ID    : Integer;
      rooms : Composition of many Room
                on rooms.house = $self;
}

entity Room {
  key ID    : Integer;
      name  : String;
      house : Association to House; //one to many composition
}


entity Author {
  key ID    : Integer;
      name  : String;
      // Composition (owning side)
      books : Composition of many AuthorBooks
                on books.author = $self;
}

entity Book {
  key ID      : Integer;
      title   : String;
      // Association (non-owning side)
      authors : Association to many AuthorBooks
                  on authors.book = $self;
}

entity AuthorBooks {
  key author : Association to Author;
  key book   : Association to Book;
}
