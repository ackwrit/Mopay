import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Register, register } from './view/register';
import { Connexion } from './view/connexion';
import { Mysplashscreen} from './view/Mysplashscreen'
import { UserProvider, useUser } from './view/UserContext';
import { Verificationmail } from './view/Verificationmail';
import React,{ useEffect, useState } from 'react';
import * as Linking  from 'expo-linking';
import { Dashboard, dashboard } from './view/dashboard';
import AsyncStorage from 'expo-sqlite/kv-store';
import { MyUser } from './model/MyUser';
import { addClient, addInvoice, getLastInvoices, initDB } from './services/database';
import { AddClient } from './view/AddClient';
import Toast, { SuccessToast } from 'react-native-toast-message';
import { View ,Image,Text} from 'react-native';
import logo from './assets/logo.png'
import { AddInvoices } from './view/AddInvoices';
import { AllHistory } from './view/AllHistory';
import { MyProfil } from './view/MyProfil';
import { MyNumberMobile } from './view/MyNumberMobile';
import { supabase } from './services/supabase';
import  NetInfo  from '@react-native-community/netinfo';
import { getUser } from './services/userService';
import { AllInvoices } from './components/AllInvoices';



const Stack = createNativeStackNavigator();
export default function App() {
  
  
  
  
  
  

  const handleDeepLink = (event) => {
    const url = event.url;
    // Exemple url : "MoPay://confirm-email?token=1234"
    const { path, queryParams } = Linking.parse(url);
   

    // Ici tu peux naviguer vers le composant correspondant
    if (path === 'confirm-email') {
      navigation.navigate('confirm', { token: queryParams.token });
    }
  };

  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleDeepLink);
    

    // Si l'app est ouverte via un lien déjà existant au lancement
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove();
  }, []);
  useEffect(()=>{
   
      buildDBLocal();
    
     checkLocal();

   
    

  },[]);

 


  const [isLoading,setIsLoadiang] = useState(false);
  const [isExistLocal,setIsExistLocal] = useState(false);
 
  
 
const navTheme = {
 colors : {
  background : "transparent"
 }
};

async function checkLocal(){
  const isLocal = await AsyncStorage.getItem('user') ?? null;
 
  if(isLocal !== null){
    setIsExistLocal(true);
    const parseUser = JSON.parse(isLocal)
    const netState = await NetInfo.fetch();
    if(netState.isConnected && netState.isInternetReachable){
      const newUser = await getUser(parseUser.id);
      const objUser = newUser[0];
    
      const upadeUserfield = {
        ...objUser,
        "fullName":objUser.full_name,
        "token":objUser.user_token
      };
      await AsyncStorage.setItem('user',JSON.stringify(upadeUserfield));

    }



   
  }
  setIsLoadiang(true);

  
  
}
  function buildDBLocal(){
   initDB();
   
   

 }


 if(isLoading){
  return (

    <UserProvider>
    <NavigationContainer theme={navTheme}>
      <Toast config={{
          success:({text1,...rest})=>(
            <View style={{
              backgroundColor:"#F5BB0E",
              flexDirection:'row',
              borderRadius:20,
              borderWidth:1,
              borderColor :"black",
              opacity : 1,
              height : 60,
              width :"80%",
              alignItems :"center",
              paddingHorizontal: 10,      // espace intérieur
              shadowColor: "#000",        // ajoute une ombre pour mieux voir
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              }}>
                <View style={{
                  width:40,
                  height:40,
                  justifyContent:"center",
                  alignItems:"center",
                  borderRadius:60,
                  backgroundColor:"white",
                  marginRight : 10
                  }}>
                    <Image resizeMode="contain" source={logo} style={{height:40,width:40}}/>
                </View>
                <Text>{text1}</Text>
                

            </View>
          )
        }
      }/>
      <Stack.Navigator initialRouteName={(isExistLocal)?'dashboard':'splash'} screenOptions={{headerShown:false,animation:"fade"}}>
        <Stack.Screen name='splash' component={Mysplashscreen}></Stack.Screen>
        <Stack.Screen name='register' component={Register}></Stack.Screen>
         <Stack.Screen name='connect' component={Connexion}></Stack.Screen>
         <Stack.Screen name='confirm' component={Verificationmail}></Stack.Screen>
         <Stack.Screen name='dashboard' component={Dashboard}></Stack.Screen>
         <Stack.Screen name='addclient' component={AddClient}></Stack.Screen>
         <Stack.Screen name='addinvoice' component={AddInvoices}></Stack.Screen>
         <Stack.Screen name='allhistory' component={AllHistory}></Stack.Screen>
         <Stack.Screen name='settings' component={AllHistory}></Stack.Screen>
         <Stack.Screen name='myprofil' component={MyProfil}></Stack.Screen>
           <Stack.Screen name='mynumbermobile' component={MyNumberMobile}></Stack.Screen>
           <Stack.Screen name='allinvoices' component={AllInvoices}></Stack.Screen>


      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
 
  );
}
}

