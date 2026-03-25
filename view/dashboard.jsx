import { Image, ImageBackground, Text, View } from "react-native";
import backgroundImage from "../assets/background.png"
import logo from "../assets/logo.png"
import { styles } from "../styles/App.style";
import { useEffect, useState } from "react";
import AsyncStorage from "expo-sqlite/kv-store";
import { useUser } from "./UserContext";
import { MyUser } from "../model/MyUser";
import { getLastInvoices } from "../services/database";


export function Dashboard(){
    const{myUser,setMyUser} = useUser();
    const[sommeFacture,setFacture] = useState();
    useEffect( ()=>{
        loadingUser();
       

    },[]);

    async function loadingFacture(){
        
    }

    async function loadingUser(){
        const stringUser = await AsyncStorage.getItem('user');
        const user = JSON.parse(stringUser);
        console.log(user);
        const newUser = new MyUser({
            id:user.id,
            mail:user.mail,
            fullName:user.fullName,
            phone:user.phone,
            createdAt : user.createdAt,
            user_token : user.user_token
        });
        setMyUser(newUser);
        

    }
    return (
        <ImageBackground style={styles.dashboardImageBackground} imageStyle={{opacity:0.4}}source={backgroundImage}>
            
                <Image style={styles.logo}source={logo}/>
            
            <View style={styles.bloc_dashboard}>
                <Text>Bonjour {myUser.fullName??"INCONNU"}</Text>
                <Text>Valeur</Text>
                <Text>Logo design</Text>
            
            </View>
            <View  style={styles.history_dashboard}>
            <Text>Mini Historique</Text>
            </View>
            <View style={styles.bottom_dashboard}>
            <Text >Naviagtion bar bottom</Text>
            </View>

            
            
            

        </ImageBackground>
        
    );
}

