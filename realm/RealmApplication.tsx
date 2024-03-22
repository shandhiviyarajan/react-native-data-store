import React from 'react';
import { RealmAppProvider, RealmStore } from '.';
export const RealmApplication = () => {
   return (
    <RealmAppProvider>
        <RealmStore/>
    </RealmAppProvider>
   )
};
