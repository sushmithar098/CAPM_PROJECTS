namespace Ordermanagement;

type Address {
    @mandatory
    area_name    : String;
    @mandatory
    city_name    : String;
    @mandatory
    district_name: String;
    @mandatory 
    pincode      : Integer;
}

@cds.persistence.skip
@aspect.transactional
entity Customer {
    key customerid : Integer;

    @mandatory
    @cds.search
    name           : String;

    @mandatory
    email          : String;

    phone          : String;

    @mandatory
    address        : Address;

    orders         : Composition of many Order on orders.customer = $self;
}

@managed
entity Order {
    key orderid   : Integer;

    @mandatory
    orderDate      : Date;

    @mandatory
    @assert.range.min: 1                  // totalAmount must be >= 1
    totalAmount    : Integer;

    @mandatory
    @assert.in: ['NEW', 'SHIPPED', 'DELIVERED']   // status must be one of these
    status         : String;

    @mandatory
    customer       : Association to Customer;
}  
