import React from 'react';
import { Button, Text, View } from 'react-native';
import { useRealm, RealmProvider } from '@realm/react';
import axios from 'axios';
import { FlashList } from '@shopify/flash-list';
import { realmConfig, StorageData } from './models';
import FastImage from 'react-native-fast-image';
import { MutableSubscriptionSet } from 'realm/dist/public-types/internal';

export const RealmStore = () => {
    const [productsData, setProductsData] = React.useState<any>(null);

    const realmConnection = useRealm();

    const clearStore = () => {
        realmConnection.write(() => {
            realmConnection.deleteAll();
        });
    };
    const fetchStore = async () => {
        await axios.get('https://fakestoreapi.com/products').then((response) => {
            try {
                realmConnection.write(() => {
                    realmConnection.create('StorageData', StorageData.saveData(response.data));
                });
            } catch (e) {
                console.log(e);
            }
        });
    };
    const readStore = () => {
        //can use useQuery to fetch data
        let data = realmConnection.objects(StorageData);
        if (data.length) {
            setProductsData(JSON.parse(data[0]?.product_data));
        } else {
            setProductsData(data);
        }
    };
    fetchStore();

    React.useEffect(() => {
      
        readStore();
        //Realm global listener // can configure to collections, object
        realmConnection.addListener('change', () => {
            console.log('changed....');
            readStore();
        });

        return () => {
            realmConnection.removeAllListeners();
        };
    }, []);

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
        <RealmProvider {...realmConfig}>
            <Text
                style={{
                    fontWeight: '600',
                    fontSize: 18,
                    textAlign: 'center',
                    width: '100%',
                    padding: 12,
                }}>
                Market Data
            </Text>
            <FlashList
                data={productsData}
                estimatedItemSize={60}
                renderItem={renderItem}
                viewabilityConfig={{
                    minimumViewTime: 1000,
                    itemVisiblePercentThreshold: 10,
                    waitForInteraction: true,
                }}
                showsVerticalScrollIndicator={false}
            />

            <Button title="Clear" onPress={clearStore} />
        </RealmProvider>
    );
};
