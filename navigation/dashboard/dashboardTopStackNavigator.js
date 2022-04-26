import { SafeAreaView } from 'react-native';
import React, { useState, useEffect } from "react";
import CONST from '../../CONST';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabsHeader from '../../components/tabsHeader';
import { db, auth } from '../../firebase';
import Analytics from '../../screens/dashboard/analytics';
import Schedule from '../../screens/dashboard/schedule';

export default function DashboardTopStackNavigator ({navigation, dashboardRootStackNavigation}) {
    const Tab = createMaterialTopTabNavigator();
    const [currentTab, setCurrentTab] = React.useState(CONST.DISCOVER_TABS.SHORTS);
    const [userDetail, setUserDetail] = useState(null);
    const [uid, setUID] = useState(null);

    auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
            db.collection("users").doc(user.uid)
            .get().then((doc) => {
                if (doc.exists){
                    setUserDetail(doc.data());
                } else {
                    console.log("No such document!");
                    }}).catch((error) => {
                    console.log("Error getting document:", error);
            });
          // ...
        } else {
          // User is signed out
          // ...
        }
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
                                        children={props => (
                                            <Schedule {...props} dashboardRootStackNavigation={dashboardRootStackNavigation} />
                                        )}
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
                                        component={Analytics}
                                    />
                                    <Tab.Screen
                                        name={CONST.DASHBOARD_TABS.SCHEDULE}
                                        component={Schedule}
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
