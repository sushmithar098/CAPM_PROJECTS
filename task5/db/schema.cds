namespace my.app;

using {managed} from '@sap/cds/common';

entity User : managed {
  key  ID        : Integer;
    username  : String;
    email     : String;
    password  : String;
    role      : String;
    isActive  : Boolean default true;
    lastLogin : DateTime;
    profile   : Association to one Profile;
    status    : String = case
                             when isActive = true
                                  then 'Active'
                             else 'Inactive'
                              end; //calculated field


}

entity Profile : managed {
   key ID       : Integer;
    bio         : String;
    age         : Integer;  
    gender      : Gender   @assert.range: ['Male','Female'] ;
    dateOfBirth : Date;
    address     : String;
    phone       : String;
    user        : Association to one User;
}


type Gender : String enum {
    Male;
    Female;
};
