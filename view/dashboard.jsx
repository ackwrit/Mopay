import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import backgroundImage from "../assets/background.png"

import { styles } from "../styles/App.style";

import { MyNavBar } from "../components/MyNavBar";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Connexion } from "./connexion";

import { MyHome } from "../components/home";
import { AllClient } from "../components/AllClient";
import { AllHistory } from "../components/AllHistory";





export function Dashboard(){

    const Tab = createBottomTabNavigator();
     

    
    



    return (
        <ImageBackground style={styles.dashboardImageBackground} imageStyle={{opacity:0.4}}source={backgroundImage}>
            <Tab.Navigator
        
        initialRouteName="Connexion"
        screenOptions={{
          headerShown: false,
          tabBarStyle: { height: 60 },
          tabBarLabelStyle: { fontSize: 12, fontWeight: '400' }, // pas de fontFamily custom
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        }}
        tabBar={(props) => <MyNavBar {...props} />}
        
      >
          <Tab.Screen name="Accueil" component={MyHome} />
        <Tab.Screen name="Historique" component={AllHistory} />
        <Tab.Screen name="Clients" component={AllClient} />
        <Tab.Screen name="Paramètre" component={Connexion}/>
      </Tab.Navigator>
      </ImageBackground>


        
        
    );
}


