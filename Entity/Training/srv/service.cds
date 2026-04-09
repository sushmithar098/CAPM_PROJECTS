using  {Training_Management.db as db} from '../db/Schema' ;

service trainerapi {
      entity trainer  as projection on db.TRAINER ;
      entity  traineravailabe as  projection on db.TRAINER_AVAILABILITY;
      entity batch as projection on db.BATCH ;
      entity skill as projection on db.SKILL;
      entity course as projection on db.COURSE ;
      entity certificate as projection on db.CERTIFICATE;
      entity enrollment as projection on db.ENROLLMENT;
        entity schedule as projection on db.SCHEDULE;
}
