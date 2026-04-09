using {Training_Management.db as db} from '../db/Schema';

service trainerapi {

      entity batch      as projection on db.BATCH;
      entity enrollment as projection on db.ENROLLMENT;
      entity trainee    as projection on db.TRAINEE;
      entity result     as projection on db.RESULT;
      entity assessment as projection on db.ASSESSMENT;
      function getTraineeCount(trainee_id: String) returns Integer;
      function getTraineeCountsum()                returns Integer;
      action   changeTraineeStatus(batch_id: String, new_status: String);
      action   completeAssessment(trainee_id: String, assessment_id: String, score: Integer);
      action   enrolltrainee(trainee_id: String, batch_id: String, enrollment_date: Date, status: String);
}
