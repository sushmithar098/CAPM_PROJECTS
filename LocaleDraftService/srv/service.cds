using {mydb as db} from '../db/schema';
service studentapi {
    entity student @(restrict:[{
        grant:['READ'],
        to:['User']
    },{
        grant:['*'],
        to:['Admin']
    }])as projection on db.Students ;
    entity course @(restrict:[{
        grant:['*'],
        to:['Admin']
    }])as projection on db.Courses; 
 function getdata() returns array of student;

}

annotate studentapi.student with {

 name @title :'{i18n>name}' 
}

