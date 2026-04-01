import { View,Text, ImageBackground, TouchableOpacity } from "react-native";
import backrgound from '../assets/background.png'
import { styles } from "../styles/App.style";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "./UserContext";
import { useEffect, useState } from "react";
import { MyTextInput } from "../components/MyTextInput";
import { MyBouton } from "../components/MyBouton";
import { MyUser } from "../model/MyUser";


export function MyNumberMobile(){
    const {myUser,setMyUser} = useUser();
    const [monuser,setmonUser] = useState(new MyUser({}));
    const [messageTapped,setmessageTapped] = useState();
    const nav = useNavigation();
    const [press,setPress] = useState(false);
    
    useEffect(()=>{
        setmessageTapped(myUser.phone);
        console.log("user use effect",myUser);
       

    },[]);
    function comeback(){
        nav.goBack();

    }

    function validation(){
        const value = myUser;
        if(messageTapped !== ""){
            const updateUser = new MyUser({
                ...value,
                "phone":messageTapped
        });
        console.log("user dans enregistrer",updateUser);
        setmonUser(updateUser);
        updateUser.save();

        comeback();

        }
       
        


    }
    
    return(
        <ImageBackground style={styles.ImageBackground} source={backrgound} imageStyle={{opacity:0.4}}>
            <View style={styles.header_Addclient}>
                <TouchableOpacity onPress={comeback}>
                     <View style={{
                    flexDirection :"row",
                    alignItems :"center"
                }}>
                   
                         <FontAwesome name="angle-left" size={24}/>

                    
                   
                    <Text style={{fontSize:24,fontWeight:"semibold",marginLeft:5}}>Numéro</Text>

                </View>

                </TouchableOpacity>

                
               
                
            </View>
            <View style={{flex : 1,marginTop:10}}>
                <Text>Numéro du compte lié</Text>
                <View style={{
                    flexDirection : "row",
                    justifyContent :"space-between"
                }}>
                      <Text>{(messageTapped === null)?"Pas de de numéro disponible":`+261 ${messageTapped}`}</Text>
                       <TouchableOpacity onPress={()=>setPress(true)}>
                      <FontAwesome name="pencil" size={18}/>
                      </TouchableOpacity>
                     

                </View>
                    {
                        (press) && <MyTextInput onChanged={setmessageTapped}icon="mobile" keyboard="numeric" text="Entrer votre numéro"/>
                      }
              
            </View>
            <View style={{alignItems:"center",marginBottom:20}}>
                <MyBouton onPress={validation} text="Enregistrer"/>

            </View>
            
        

        </ImageBackground>
        

    );
}