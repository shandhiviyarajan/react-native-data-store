import axios from 'axios';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { Products } from './models';
import { FlashList } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import { database } from './database';
import { nullValue } from '@nozbe/watermelondb/RawRecord';

export const WatermelonApplication = () => {
    let products = new Products(database.collections.get('products'), nullValue);

    const [productsData, setProductsData] = React.useState<any>(null);
    const fetchProducts = async () => {
        await axios.get('https://fakestoreapi.com/products').then(async (response) => {
            //   console.log(response);
            products.createProducts(response.data);
        });
    };

    const getProducts = () => {
        setProductsData(products.getProucts());
    };

   

    React.useEffect(() => {
        fetchProducts().then(()=>{
            getProducts();
        })
      
    }, []);

    const clearStore = () => {
        products.deleteProducts();
    };
    const renderItem = ({ item }: any) => {
        return (
            <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#d8d8d8' }}>
                <View style={{ flex: 1, padding: 8 }}>
                    <FastImage
                        source={{ uri: item.image }}
                        style={{ width: 23, height: 24, borderRadius: 100 }}
                    />
                </View>
                <View style={{ flex: 1, padding: 8 }}>
                    <Text>{item.price}</Text>
                </View>

                <View style={{ flex: 1, padding: 8 }}>
                    <Text>{item.price * 256}</Text>
                </View>
            </View>
        );
    };

    return (
        <>
            <Text
                style={{
                    fontWeight: '600',
                    fontSize: 18,
                    textAlign: 'center',
                    width: '100%',
                    padding: 12,
                }}>
                Market Data {JSON.stringify(productsData)}
            </Text>

            <FlashList
                data={productsData}
                estimatedItemSize={15}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
            <Button title="Clear" onPress={clearStore} />
        </>
    );
};
