import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import auth from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FlashMessage from "react-native-flash-message";

import Login from "./pages/auth/Login";
import Sign from "./pages/auth/Sign";
import Homepage from "./pages/Homepage";

import colors from "./styles/colors";

const Stack = createNativeStackNavigator();

function Router() {
  const [userSession, setUserSession] = React.useState()

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      setUserSession(!!user)
    })
  }, [])
  
  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginPage" component={Login}/>
        <Stack.Screen name="SignPage" component={Sign}/>
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      {!userSession ?  (
        <AuthStack/>
      ) : (
        <Stack.Navigator>
          <Stack.Screen 
            name="Homepage" 
            component={Homepage}
            options={{
              title: "TraTre",
              headerTintColor: colors.darkgreen,
              headerStyle: {
                backgroundColor: "#E5F3F2",
              },
              headerRight: () => (
                <Icon
                  name="logout"
                  size={30}
                  color={colors.darkgreen}
                  onPress={() => auth().signOut()}
                />
              )
            }}
          />
        </Stack.Navigator>
      )
      }
      <FlashMessage position="top"/>
    </NavigationContainer>
  )
}

export default Router;