namespace  Bookstore.db ;
using { cuid } from '@sap/cds/common';

entity Books :cuid {
   key ID:UUID;
   title  : String;
   descr  : String;
}
