import { View,Text, ImageBackground, TouchableOpacity } from "react-native";
import background from '../assets/background.png'
import { styles } from "../styles/App.style";
import { FontAwesome } from "@expo/vector-icons";
import { MyBouton } from "../components/MyBouton";
import { useUser } from "./UserContext";
import { useEffect, useState } from "react";
import { MyTextInput } from "../components/MyTextInput";
import { useNavigation } from "@react-navigation/native";
import { MyUser } from "../model/MyUser";

export function MyProfil(){
     const {myUser,setMyUser} = useUser();
     const [press,setPress]= useState(false);
     const [monUtilisateur,setmonUtilisateur]=useState(new MyUser({}));
     const [messageTapped,setmessageTapped] = useState();
     const nav = useNavigation();
     useEffect(()=>{
        

     },[])

     function update(){
        setPress(true);

     }

     function modification(){
        const value = myUser;
        if(messageTapped !== ""){
            setMyUser({
                ...value,fullName:messageTapped
            }

            );
            
            const updateUser = new MyUser({
                ...value,fullName:messageTapped

            });
            setmonUtilisateur(updateUser);
            
            updateUser.save();

            retour();
            
        }

     }

     function retour(){
        nav.goBack();
     }
   
    return (
        <ImageBackground source={background} imageStyle={{opacity:0.4}} style={styles.ImageBackground}>
            <TouchableOpacity onPress={retour}>
                  <View style={styles.header_myprofil}>
            <FontAwesome name="angle-left" size={24}/>
            <Text style={{fontSize:24,marginLeft:5, marginBottom:20}}>Paramètres</Text>
            </View>

            </TouchableOpacity>
          
        <View style={{flex: 1,padding : 10}}>
            <Text style={{fontSize:16,fontWeight:"semibold",marginBottom:5}}>Nom du compte</Text>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text>{(press)?messageTapped:myUser.fullName}</Text>
                <TouchableOpacity onPress={update}>
                    <FontAwesome name="pencil" size={18}/>

                </TouchableOpacity>
                
                


            </View>
            {
                    press && 
                    <View style={{marginTop:10}}>
                        <MyTextInput text={"entrer votre nom"} onChanged={setmessageTapped}/>

                    </View>
                        
                    
                }
            
        </View>
        <View style={{marginBottom : 20,alignItems:"center"}}>
            <MyBouton onPress={modification} text={"Enregister"}/>

        </View>
        


        </ImageBackground>
        
    );
}