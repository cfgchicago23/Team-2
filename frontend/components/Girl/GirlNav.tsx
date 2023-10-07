import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { User } from "firebase/auth";

export type tabParamsList = {
  Home: undefined;
  Profile: {user: User};
}

export type GirlNavProps = {
  user: User
}

const Tab = createBottomTabNavigator<tabParamsList>();

export const GirlNav = (props: GirlNavProps) => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          tabBarHideOnKeyboard: true,
         }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarHideOnKeyboard: true,
        }}
        initialParams={{user: props.user}}
      />
    </Tab.Navigator>
  </NavigationContainer>
);