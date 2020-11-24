import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import { MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';

import constants from "./src/utils/constants";

const Stack = createStackNavigator();

export default HomeStackScreen = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator
         initialRouteName={constants.SCREEN.HOME} 
         screenOptions={{
            headerStyle: {
              backgroundColor: constants.COLORS.LIGHT_GRAY,
            },
            headerLeft: (props) =>
              props.canGoBack && (
                <MaterialIcons
                  name="arrow-back"
                  size={24}
                  color={constants.COLORS.LIGHT}
                  {...props}
                  style={{ marginLeft: 20 }}
                />
              ),
         }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
               headerTransparent: true,
               headerShown: false
            }}
          />
          <Stack.Screen 
            name="Details" 
            component={DetailsScreen}
            options={{ 
              title: "", 
              headerBackTitleVisible: false,
              headerTransparent: true,
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
