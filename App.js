import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Register, register } from './view/register';
import { Connexion } from './view/connexion';
import { Mysplashscreen} from './view/Mysplashscreen'
import { UserProvider } from './view/UserContext';
import { Verificationmail } from './view/Verificationmail';
import React,{ useEffect, useState } from 'react';
import * as Linking  from 'expo-linking';
import { Dashboard, dashboard } from './view/dashboard';
import AsyncStorage from "expo-sqlite/kv-store";


const Stack = createNativeStackNavigator();
export default function App() {
  const [firstPage,setFirsPage] = useState(false);
  const [isLoading,setIsLoading] = useState(false);


  const handleDeepLink = (event) => {
    const url = event.url;
    // Exemple url : "MoPay://confirm-email?token=1234"
    const { path, queryParams } = Linking.parse(url);
   

    // Ici tu peux naviguer vers le composant correspondant
    if (path === 'confirm-email') {
      navigation.navigate('confirm', { token: queryParams.token });
    }
  };

  async function loadPage(){
    const dataInscrit  = await AsyncStorage.getItem('user') ?? null;
    console.log(dataInscrit);
    if(dataInscrit !== null){
      setFirsPage(true);
    }
    setIsLoading(true);
  }

  useEffect(()=>{
    loadPage();

  },[]);

  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleDeepLink);
    

    // Si l'app est ouverte via un lien déjà existant au lancement
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => subscription.remove();
  }, []);
 
const navTheme = {
 colors : {
  background : "transparent"
 }
};
 if (isLoading){
  return (
    <UserProvider>
    <NavigationContainer theme={navTheme}>

      <Stack.Navigator initialRouteName='dashboard' screenOptions={{headerShown:false,animation:"fade"}}>

        <Stack.Screen name='splash' component={Mysplashscreen}></Stack.Screen>
        <Stack.Screen name='register' component={Register}></Stack.Screen>
         <Stack.Screen name='connect' component={Connexion}></Stack.Screen>
         <Stack.Screen name='confirm' component={Verificationmail}></Stack.Screen>
         <Stack.Screen name='dashboard' component={Dashboard}></Stack.Screen>


      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
 
  );
}
}


