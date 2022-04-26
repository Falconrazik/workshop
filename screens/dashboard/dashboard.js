import { SafeAreaView } from 'react-native';
import React, { useState, useEffect } from "react";
import CONST from '../../CONST';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Analytics from './analytics';
import TabsHeader from '../../components/tabsHeader';
import { db, auth } from '../../firebase';
import Schedule from './schedule';

export default function Dashboard({navigation}) {
    const Tab = createMaterialTopTabNavigator();
    const [currentTab, setCurrentTab] = React.useState(CONST.DISCOVER_TABS.SHORTS);
    const [userDetail, setUserDetail] = useState(null);

    let uid = auth.currentUser.uid;
    db.collection("users").doc(uid)
    .get().then((doc) => {
        if (doc.exists){
            setUserDetail(doc.data());
        } else {
            console.log("No such document!");
            }}).catch((error) => {
            console.log("Error getting document:", error);
        });

        const showDashboard = () => {
            if (userDetail) {
                if (userDetail.userType === "learn") {
                    return <SafeAreaView style={{ flex: 1 }}>
                                <Tab.Navigator
                                    tabBar={props => (
                                        <TabsHeader
                                            onTabPress={tabTitle => {
                                                props.navigation.navigate(tabTitle);
                                                setCurrentTab(tabTitle);
                                            }}
                                            defaultTab={CONST.DASHBOARD_TABS.SCHEDULE}
                                            onActionButtonPress={currentTab => navigation.navigate("SearchModal", {type: currentTab})}
                                        />
                                    )}
                                    initialRouteName={CONST.DASHBOARD_TABS.SCHEDULE}
                                    screenOptions={{
                                        headerShown: false,
                                        swipeEnabled: false,
                                    }}
                                >
                                    <Tab.Screen
                                        name={CONST.DASHBOARD_TABS.ANALYTICS}
                                        component={Schedule}
                                    />
                                </Tab.Navigator>
                        </SafeAreaView>
                }
                else {
                    return <SafeAreaView style={{ flex: 1 }}>
                                <Tab.Navigator
                                    tabBar={props => (
                                        <TabsHeader
                                            onTabPress={tabTitle => {
                                                props.navigation.navigate(tabTitle);
                                                setCurrentTab(tabTitle);
                                            }}
                                            tabLeftTitle={CONST.DASHBOARD_TABS.ANALYTICS}
                                            tabRightTitle={CONST.DASHBOARD_TABS.SCHEDULE}
                                            defaultTab={CONST.DASHBOARD_TABS.SCHEDULE}
                                            onActionButtonPress={currentTab => navigation.navigate("SearchModal", {type: currentTab})}
                                        />
                                    )}
                                    initialRouteName={CONST.DASHBOARD_TABS.SCHEDULE}
                                    screenOptions={{
                                        headerShown: false,
                                        swipeEnabled: false,
                                    }}
                                >
                                    <Tab.Screen
                                        name={CONST.DASHBOARD_TABS.ANALYTICS}
                                        component={Schedule}
                                    />
                                    <Tab.Screen
                                        name={CONST.DASHBOARD_TABS.SCHEDULE}
                                        component={Analytics}
                                    />
                                </Tab.Navigator>
                        </SafeAreaView>
                }
            }
        }

    return (
        <>
            {showDashboard()}
        </>
    )
};
