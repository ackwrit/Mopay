import { View ,Text, ImageBackground, TouchableOpacity ,Image, TextInput} from "react-native";
import background from "../assets/background.png";
import avatar from "../assets/avatar2.png";
import malagasy from "../assets/malagasy.png"
import { styles } from "../styles/App.style";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {MyTextInput} from "../components/MyTextInput";
import{MyBouton} from "../components/MyBouton"
import { useActionState, useState } from "react";
import { addClient } from "../services/database";
import { useUser } from "./UserContext";
import { showToast } from "../services/utilitaire";

export function AddClient(){
    const nav = useNavigation();
    const {myUser,setMyUser} = useUser();
    const [phone,setPhone] = useState();
    const [name,setName] = useState();
    function backDashboard(){
        nav.goBack();
    }

    async function addBase(){
      //gestion local
      const value = addClient(myUser.id,name,phone);
      console.log(value);
      
      showToast(`Le client ${name} a été ajouté`);
       setTimeout(() => {
      nav.navigate("dashboard");
    }, 400); 



      //gestion supabse
      

    }


    return(
        <ImageBackground source={background} imageStyle={{opacity:0.4}} style={styles.ImageBackground}>
              <TouchableOpacity onPress={backDashboard}>
                <View style={styles.header_Addclient}>
                <FontAwesome name="chevron-left" size={24} />
                <Text style={{fontSize:24,fontWeight:"condensedBold",marginLeft:10}}>Clients</Text>
              </View>

              </TouchableOpacity>
              
              <View style={styles.containerAvatarClientAdd}>
                <Image style={styles.avatarClientAdd}source={avatar} />
                
              </View>
              <View style={styles.textformAddclient}>
                <Text style={{fontSize:16,color:"black",fontWeight:"semibold"}}>Nom du client</Text>
                <MyTextInput text={"Entrer le nom"} icon={"user"} onChanged={setName}/>
                <View style={styles.containerAddclientTextform}>
                  <Image source={malagasy} style={{height:24,width:24,marginRight:5}}/>
                  <Text style={{marginRight:10}}>+261</Text>
                  <View style={{ width: 1, backgroundColor: 'black',height:"100%",marginRight:10}} />
                  <TextInput onChangeText={setPhone}placeholder={"Entrer le numéro"} keyboardType="phone-pad"></TextInput>
                </View>
                <View style={{alignItems:"center"}}>
                  <MyBouton text={"Ajouter"} onPress={addBase}/>

                </View>
                
                
                
                
              </View>

        </ImageBackground>
        
    );
}