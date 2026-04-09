using {Vehiclemanagement.db as db} from '../db/schema';
service vehicleapi {
    entity  dealers as projection on db.Dealers;

  
}