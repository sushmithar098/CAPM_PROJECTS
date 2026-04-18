using {mysales as db} from '../db/schema';

service orderapi @(requires: 'authenticated-user') {
    entity customer            
    @(restrict: [
        {
            grant: ['READ'],
            to   : 'UserRole'
        },
        {
            grant: ['*'],
            to   : 'AdminRole'
        }
    ]) as projection on db.Customers;   
    entity products            

    @(restrict: [
        {
            grant: ['READ'],
            to   : 'UserRole'
        },
        {
            grant: ['*'],
            to   : 'AdminRole'
        }
    ])  as projection on db.Products;
    entity orders               

    @(restrict: [{
        grant: ['READ'],
        to   : 'AdminRole'
    }])as projection on db.Orders;
    // entity CustomerOrderCount   as
    //     select from orders {
    //         customer.id as CustomerId,
    //         count( * )  as totalOrders
    //     }
    //     group by
    //         customer.id

    entity orderItems           as projection on db.OrderItems;

    // entity Orderitemsvalues     as
    //     select from orderItems {
    //         order.id                      as OrderId,
    //         sum(quantity * product.price) as totalamount
    //     }
    //     group by
    //         order.id;

    // entity productpricedeatails as
    //     select from products {
    //         min(price) as MinPrice,
    //         max(price) as MaxPrice
    //     }

    // entity Avg                  as
    //     select from products {
    //         avg(price) as AveragePrice
    //     };

}
