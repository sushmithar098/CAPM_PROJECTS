
namespace mysales;

using {managed} from '@sap/cds/common';

entity Customers : managed {
    key id     : Integer;
        name   : String(100);
        email  : String(100);
        orders : Composition of many Orders
                     on orders.customer = $self;
}

entity Products : managed {
    key Id         : String;
        name       : String(100);
        price      : Decimal(10, 2);
        orderItems : Association to many OrderItems
                         on orderItems.product = $self;
}

entity Orders : managed {
    key id        : String;
        orderDate : Date;
        customer  : Association to Customers;
        items     : Composition of many OrderItems
                        on items.order = $self;
}


entity OrderItems {
    key order    : Association to Orders;
    key product  : Association to Products;
        quantity : Integer;
}
