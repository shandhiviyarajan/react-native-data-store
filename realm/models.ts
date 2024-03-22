
import { Realm, createRealmContext } from '@realm/react';
class StorageData extends Realm.Object {
    product_data!: string; 
    static saveData(data: string) {
        let product_data = JSON.stringify(data);
      return {
        product_data,
      };
    }
  
    static schema = {
      name: 'StorageData',
      properties: {
        product_data: 'string',
      },
    };
}

const securityKey = new Int8Array(64); //base64

export {StorageData}

export const realmConfig ={
    closeOnUnmount:false,
    schema:[StorageData],
    schemaVersion:1,
   // encryptionKey: securityKey,
    inMemory:false, // dont use memory
}



