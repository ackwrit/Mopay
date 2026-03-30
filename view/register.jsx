import { Alert, Image, ImageBackground,Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/App.style.js';
import backgroundElement from '../assets/image.png'
import logo from '../assets/logo.png'
import { MyTextInput } from '../components/MyTextInput.jsx';
import { FontAwesome } from '@expo/vector-icons';
import { MyBouton } from '../components/MyBouton';
import { MyTextButton } from '../components/MyTextButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useUser } from './UserContext.js';
import { MyUser } from '../model/MyUser.js';

export function Register() {
  const nav = useNavigation();
  const [validateContrat, setValidateContrat]= useState(false);
  const { myUser, setMyUser } = useUser();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [repassword,setrePassword] = useState('');
  const longPassword = password.length > 0 && password.length < 6
      ? "le mot de passe doit avoir au minimum 6 caracteres"
      : "";
  const errorPassword = password !== repassword && password.length >0 ? "Les mots de passe ne correspondent pas":"";
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const isFormValid =
    isValidEmail(email) &&
    password.length >= 6 &&
    password === repassword && validateContrat;


  function conditions(){
    Alert.alert("Condition générale d'utilisation",`En créant un compte sur MoPay, vous acceptez les conditions suivantes :
  - Vous utilisez l’application de manière légale et responsable
  - Vous êtes responsable de la sécurité de votre compte (code PIN, téléphone)
  - Vous acceptez les frais éventuels liés aux transactions
  - Vous êtes responsable des informations que vous fournissez
  MoPay peut suspendre un compte en cas d’activité suspecte ou frauduleuse
  Certaines interruptions de service peuvent survenir (réseau, maintenance)
  Vos données sont utilisées uniquement pour le fonctionnement du service

En continuant, vous acceptez les Conditions d’Utilisation de MoPay.`,[
    {
    text :"J'accepte",
    onPress : ()=> {
      setValidateContrat(true);

    }
  },
  
  
  {
    text :"Je refuse",
    
    onPress :()=> {
      setValidateContrat(false);
    }
  },

  
])
  }
  

  async function supabaseConnexion(){
    if(isFormValid){
     try {
       const newUser = new MyUser({...myUser,mail:email});
       const value  = await newUser.register(password);
       if(value){
        setMyUser(newUser);
       nav.navigate('dashboard');

       }
       


     } catch(erreur){
      Alert.alert("erreur",erreur.message);
     }
      
      
    }else {
      Alert.alert("Erreur","Vous n'avez pas confirmé les CGU");
    }
  }
  
    return (
         <View style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>
      <ImageBackground source={backgroundElement} style={styles.elementImage} imageStyle={{opacity:0.3}}>
        <View style={styles.bloc_message}>
          <Text style={styles.title}>Inscrivez-vous sur MoPay</Text>
        <Text style={styles.subtitle}>Creer votre compte pour commencer</Text>

        </View>
        
        <View>
          <MyTextInput text={"Entrer votre mail"} icon={"envelope"} onChanged={setEmail} value={email}></MyTextInput>
          <MyTextInput security={true} text={"Entrer votre mot de passe"} icon={"lock"} onChanged={setPassword} value={password}></MyTextInput>
          <MyTextInput security={true} text={"Confirmer votre mot de passe"} icon={"lock"} onChanged={setrePassword} value={repassword}></MyTextInput>
          {!isValidEmail(email)?<Text style={{color:"red",margin:2}}>Email inavlide</Text>:""}
          <Text style={{color:"red",margin:2}}>{longPassword}</Text>
          <Text style={{color:"red",margin:2}}>{errorPassword}</Text>

        </View>
        
        </ImageBackground>
      <View style={styles.bloc_interactif}>
        <View style={{flexDirection:"row"}}>
          <FontAwesome name={(validateContrat)?"check-square":"square-o"} size={16} color={(validateContrat)?"#8ED34A":"black"} />

        

        
          <Text style={{color:"#64748B"} }>  j’accepte les</Text>



          <MyTextButton onPress={conditions}color={"#8ED34A"} texte={"termes et conditions"} ></MyTextButton>
          
          
          
          

          </View>
        
        
        
        
        <MyBouton text={"S'inscrire"} onPress={supabaseConnexion}></MyBouton>



        <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
          <Text style={{color:"#64748B"}}>
            Vous avez déjà un compte ?
          </Text>
          <MyTextButton color={"#3CB54A"} texte={"Se connecter \u2192"} onPress={()=>{nav.navigate('connect')}}/>
          

        </View>
        
        
        
        
        
        </View>

    </View>
    );
}