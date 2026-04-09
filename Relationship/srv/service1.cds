using {Transdb as db } from '../db/Schema1';
service productdetails{
    entity product as projection on db.Products;
    // entity categories as projection on db.Categories;
}
