
import { Image, ImageBackground, Text, View } from 'react-native';
import { styles } from '../styles/App.style';
import backgroundElement from '../assets/image.png'
import logo from '../assets/logo.png';
import { MyTextInput } from '../components/MyTextInput';
import { FontAwesome } from '@expo/vector-icons';
import { MyBouton } from '../components/MyBouton';
import { MyTextButton } from '../components/MyTextButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { MyUser } from '../model/MyUser';
import { useUser } from './UserContext';




export function Connexion() {
  const nav = useNavigation();
  const [mailTapped,setMailTapped] = useState();
  const [passTapped,setPassTapped] = useState();
  const { myUser, setMyUser } = useUser();


  async function connexionBdd(){
    const newUser = new MyUser({...myUser});
    const value = await newUser.connect(mailTapped,passTapped);
    setMyUser(myUser);
    if(value){
      nav.navigate('dashboard');

    }
    



  }




  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>
      <ImageBackground source={backgroundElement} style={styles.elementImage} imageStyle={{opacity:0.3}}>
        <View style={styles.bloc_message}>
          <Text style={styles.title}>Connexion à votre compte</Text>
        

        </View>
        
        <View>
          <MyTextInput onChanged={setMailTapped}text={"Entrer votre mail"} icon={"envelope"} ></MyTextInput>
          <MyTextInput onChanged={setPassTapped} text={"Entrer votre mot de passe"} icon={"lock"} ></MyTextInput>
          
        </View>
        
        </ImageBackground>
      <View style={styles.bloc_interactif}>

        
        
        
        
        <MyBouton onPress={connexionBdd}text={"Se connecter"}></MyBouton>



        <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
          <MyTextButton color={"#64748B"} texte={"Mot de passe oublié ?"}></MyTextButton>
         
          <MyTextButton onPress={()=>{nav.navigate("register")}}color={"#3CB54A"} texte={"S'inscrire \u2192"}></MyTextButton>
          

        </View>
        
        
        
        
        
        </View>

    </View>
  );
}