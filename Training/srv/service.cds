using {Training_Management.db as db} from '../db/schema';

service trainerapi {
      entity trainer         as projection on db.TRAINER;
      entity traineravailabe as projection on db.TRAINER_AVAILABILITY;
      entity batch           as projection on db.BATCH;
      entity skill           as projection on db.SKILL;
      entity course          as projection on db.COURSE;
      entity certificate     as projection on db.CERTIFICATE;
      entity enrollment      as projection on db.ENROLLMENT;
      entity trainer_skill   as projection on db.TRAINER_SKILL;
      entity course_skill    as projection on db.COURSE_SKILL;
      entity trainee         as projection on db.TRAINEE;
      entity result          as projection on db.RESULT;
      function getTraineeCount(trainee_id: String) returns Integer;
      function getTraineeCountsum()                returns Integer;
      action   changeTraineeStatus(batch_id: String, new_status: String);
      action   completeAssessment( trainee_id: String, assessment_id: String , score:Integer);
      action   enrolltrainee(trainee_id: String, batch_id: String, enrollment_date: Date, status: String);
}
