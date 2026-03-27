import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import backgroundImage from "../assets/background.png"

import { styles } from "../styles/App.style";

import { MyNavBar } from "../components/MyNavBar";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Connexion } from "./connexion";

import { MyHome } from "../components/home";





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
        <Tab.Screen name="Historique" component={Connexion} />
        <Tab.Screen name="Clients" component={Connexion} />
        <Tab.Screen name="Paramètre" component={Connexion}/>
      </Tab.Navigator>
      </ImageBackground>

        /*
        
            
                <Image style={styles.logo}source={logo}/>
            
            <View style={styles.bloc_dashboard}>
                <Text style={{marginBottom:10 ,fontSize:15}}>Bonjour {myUser.fullName}</Text>
                <MySummaryButton/>
                <View style={styles.typepaimeentContainer}>
                    <MyButtonTypePaiement icone={"qr-code"}/>
                    <MyButtonTypePaiement icone={"wifi-outline"}/>
                </View>
            
            </View>
            <View  style={styles.history_dashboard}>
                <View style={styles.header_bloc_history}>
                    <Text style= {styles.title}>Activité récente</Text>
                    <Text style={styles.subtitle}>Voir tout</Text>
                   
                    

                </View>
                <ScrollView>
                       {
                        limitedList.map((item,index)=>{
                            return (
                            <View key={item.id || index}>
                               <MyLabelhistory items={item}/>
                               <View style={{ height: 1, backgroundColor: "black"}} />
                            </View>
                            )
                        })
                    }

                </ScrollView>
              
            
            </View>
            <MyNavBar/>*/}


            
            
            

        </ImageBackground>
        */
        
    );
}


