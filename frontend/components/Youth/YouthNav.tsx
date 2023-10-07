import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { User } from "firebase/auth";
import React from "react";
import Dashboard from "./Dashboard";
import Lessons from "./Lessons";
import Help from "./Help";
import Profile from "./Profile";
import Loading from "./Loading";
import { fetchUserData } from "../../firebase/firestore";

export type tabParamsList = {
  Dashboard: { user: User };
  Help: { user: User };
  Lessons: { user: User };
  Profile: { user: User };
};

export type YouthNavProps = {
  user: User;
  userData: any;
  fetchUserData: any;
  setUserData: any;
};

const Tab = createBottomTabNavigator<tabParamsList>();

export const YouthNav = (props: YouthNavProps) => {
  const { user, userData, fetchUserData, setUserData } = props;
  console.log(userData.club);
  if (userData.club === null) {
    return (
      <Loading
        user={user}
        userData={userData}
        fetchUserData={fetchUserData}
        setUserData={setUserData}
      ></Loading>
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
              tabBarHideOnKeyboard: true,
            }}
            initialParams={{ user: props.user }}
          />
          <Tab.Screen
            name="Lessons"
            component={Lessons}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="book" color={color} size={size} />
              ),
              tabBarHideOnKeyboard: true,
            }}
            initialParams={{ user: props.user }}
          />
          <Tab.Screen
            name="Status"
            component={Help}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="sticker-emoji"
                  color={color}
                  size={size}
                />
              ),
              tabBarHideOnKeyboard: true,
            }}
            initialParams={{ user: props.user }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              ),
              tabBarHideOnKeyboard: true,
            }}
            initialParams={{ user: props.user }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
};
