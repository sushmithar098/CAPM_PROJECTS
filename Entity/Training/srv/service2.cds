namespace TM.db;
using { TM.db as db } from '../db/schema2';
 
service trainer_management {
 
    entity  TRAINER as projection on db. TRAINER;
    entity TRAINER_AVAILABILITY as projection on db.TRAINER_AVAILABILITY;
 
}