import { Text,View } from "react-native";
import { styleSettings } from "./MySettings.style";
import { MyParametreBouton } from "./MyParametreBouton";
import { useUser } from "../view/UserContext";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export function MySettings(){
    const {myUser,setMyUser} = useUser();
    const [tel,setTel] = useState("");
    const nav = useNavigation();
    useEffect(()=>{
       checkPhone();
        


    });

    function checkPhone(){
        const value = myUser.phone;
        if(value === null){
            setTel("Numéro non enregsitré");
        } else {
            setTel(`+261 ${value}`);
        }

    }

    function navigation(choix){
        const value = choix;
        if(value === 'user'){
            nav.navigate("myprofil");

        }
         if(value === 'suitcase'){
            nav.navigate("myprofil");

        }
         if(value === 'mobile'){
            nav.navigate("myprofil");

        }
         if(value === 'shield'){
            nav.navigate("myprofil");

        }
         if(value === 'info'){
            nav.navigate("myprofil");

        }

    }

    
    return (

        <View style={styleSettings.container}>
        
            <Text style={styleSettings.title}>Paramètres</Text>
        
        <View style={styleSettings.box}>
            <MyParametreBouton onPress={()=>{navigation('user')}}icone={"user"} title={"Profil"} message={`${myUser.fullName} ${tel}`}/>
            <MyParametreBouton icone={"suitcase"} title={"Information de l'entreprise"} message={"Nom entreprise"}/>
            <MyParametreBouton icone={"mobile"} title={"compte mobile lié"} message={`${tel}`}/>
            <MyParametreBouton icone={"shield"} title={"Sécurité"} message={"Mot de passe"}/>
            <MyParametreBouton icone={"info"} title={"CGU"}/>

        </View>

        </View>

    );
}