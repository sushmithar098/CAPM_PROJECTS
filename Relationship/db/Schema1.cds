namespace Transdb;

// using { Currency sap.common.CodeList } from '@sap/cds/common';
using { Currency } from '@sap/cds/common';
entity Products  {
    key id   :Integer;
    title    : localized String(100);
    descr    : localized String(100);
    stock    : Integer;
    price    : Decimal(9,2);
   
    currency : Currency;
    //  category    : Association to Categories ;
   
}

// entity Categories : CodeList {
//     key ID   : Integer;
//      name    :   String ; 
 
// }



// type Currencies : CodeList {
//     key code : String(3);   // e.g., USD, INR, EUR
//     name     : String(50);
// }

