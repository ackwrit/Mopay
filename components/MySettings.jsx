import { Text,View } from "react-native";
import { styleSettings } from "./MySettings.style";
import { MyParametreBouton } from "./MyParametreBouton";
import { useUser } from "../view/UserContext";
import { useEffect, useState } from "react";

export function MySettings(){
    const {myUser,setMyUser} = useUser();
    const [tel,setTel] = useState("");

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

    
    return (

        <View style={styleSettings.container}>
        
            <Text style={styleSettings.title}>Paramètres</Text>
        
        <View style={styleSettings.box}>
            <MyParametreBouton icone={"user"} title={"Profil"} message={`${myUser.fullName} ${tel}`}/>
            <MyParametreBouton icone={"suitcase"} title={"Information de l'entreprise"} message={"Nom entreprise"}/>
            <MyParametreBouton icone={"mobile"} title={"compte mobile lié"} message={"Nom entreprise"}/>
            <MyParametreBouton icone={"shield"} title={"Sécurité"} message={"Mot de passe"}/>
            <MyParametreBouton icone={"info"} title={"CGU"}/>

        </View>

        </View>

    );
}