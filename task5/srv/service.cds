using{my.app as db} from '../db/schema' ;
service UserService {
    entity User as projection on db.User;
    @readonly
    entity Profile as projection on db.Profile;
};
service AdminService {
     @odata.draft.enabled
    entity User as projection on db.User;
    entity Profile as projection on db.Profile;
}
annotate  AdminService with @(requires:'admin') ;