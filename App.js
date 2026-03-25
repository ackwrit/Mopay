import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Register, register } from './view/register';
import { Connexion } from './view/connexion';
import { Mysplashscreen} from './view/Mysplashscreen'
import { UserProvider } from './view/UserContext';
import { Verificationmail } from './view/Verificationmail';
import React,{ useEffect } from 'react';
import * as Linking  from 'expo-linking';
import { Dashboard, dashboard } from './view/dashboard';

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
 
const navTheme = {
 colors : {
  background : "transparent"
 }
};
 
  return (
    <UserProvider>
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName='splash' screenOptions={{headerShown:false,animation:"fade"}}>
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


