using {studentcourse.db as db} from '/home/user/studentcourses/db/scschema.cds';
service scapi
{
entity   student as projection on db.Student ;
entity   course as projection on db.Course ;
entity   enrollment as projection on db.Enrollment;
entity   assignment as projection on db.Assignment;
entity   course_assessment as projection on db.Course_assessment ;
entity   submission as projection on db.Submission ;

}