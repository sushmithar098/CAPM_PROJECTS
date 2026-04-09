using  {TM.db as db} from '../db/schema1' ;
 
service trainersapi {
      entity trainer  as projection on db.TRAINER ;
        entity  traineravailabe as  projection on db.TRAINER_AVAILABILITY;
}


annotate  trainersapi with @(requires:'admin') ;
