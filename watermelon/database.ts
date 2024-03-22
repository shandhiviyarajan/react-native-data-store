import { Database, appSchema, tableSchema } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Products } from "./models";


//app schema
export const dfnAppSchema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'products',
            columns: [
                {
                    name: 'data',
                    type: 'string',
                },
            ],
        }),

        tableSchema({
            name: 'reviews',
            columns: [
                {
                    name: 'product_id',
                    type: 'string',
                    isIndexed: true,
                },
                {
                    name: 'createdAt',
                    type: 'string',
                },
                {
                    name: 'body',
                    type: 'string',
                },
                {
                    name: 'rating',
                    type: 'number',
                },
            ],
        }),
    ],
});

export const adapter = new SQLiteAdapter({
    dbName: 'dfnAppDatabase',
    schema: dfnAppSchema,
    jsi: false,
});
//database
export const database = new Database({
    adapter,
    modelClasses: [Products],
});
