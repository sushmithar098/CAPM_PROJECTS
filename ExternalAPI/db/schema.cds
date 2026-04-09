namespace  externaldb;
using{API_BUSINESS_PARTNER as s4} from'../srv/external/API_BUSINESS_PARTNER' ;
 entity   details  {
     key   AddressID:String;
     key OrdinalNumber:String;
     key Person:String;
      IsDefaultEmailAddress:Boolean;
      EmailAddress:String;
      SearchEmailAddress:String;
      AddressCommunicationRemarkText:String; 
 }

entity Customer{
    key ID:String;
    name:String; 
    BPId: Association to s4.A_BusinessPartner
        on BPId.BusinessPartner = ID;
}



