import { Model } from '@nozbe/watermelondb';
import {
    field,
    writer,
} from '@nozbe/watermelondb/decorators';
import { database } from './database';

//models

export class Products extends Model {
    static table = 'products';

    @field('data') data: any;

    products = database.collections.get('products');
  
    @writer async createProducts(data:any) {
        
        await this.products.create((products) => {
            console.log("data", data);
            products.data = JSON.stringify(data);
        });
    }

    @writer async getProucts(){
        console.log("query", this.products.query())
        return this.products.query();
    }

    @writer async deleteProducts(){
     this.products.query().destroyAllPermanently();
    }
}


