namespace srv;
 
using {API_BUSINESS_PARTNER as s4 } from './external/API_BUSINESS_PARTNER';
using{externaldb as db} from  '../db/schema' ;
service MyService {
     entity details as projection on db.details;
     entity A_AddressPhoneNumber as projection on s4.A_AddressPhoneNumber;
     entity A_AddressEmailAddress as projection on  s4.A_AddressEmailAddress ;
     entity Customer as projection on db.Customer;
    
       @cds.persistence.table
     entity A_BusinessPartner as projection on s4.A_BusinessPartner{
     key BusinessPartner,
     BusinessPartnerFullName,
     BusinessPartnerName,

    };
    };
   


 

