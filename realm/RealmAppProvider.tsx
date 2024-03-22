import { RealmProvider } from '@realm/react';
import { realmConfig } from './models';
import { ActivityIndicator } from 'react-native-paper';

export const RealmAppProvider = ({ children }: any) => {
    return <RealmProvider fallback={<ActivityIndicator/>} {...realmConfig}>{children}</RealmProvider>;
};


