using  {Bookstore.db as db} from '../db/Schema1' ;
service CatalogService {
   entity Books as projection on  db.Books;
}
