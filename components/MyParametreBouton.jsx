import { View,Text, TouchableOpacity } from "react-native";
import { styleSettingsButton } from "./MyParametreBouton.style";
import { FontAwesome } from "@expo/vector-icons";

export function MyParametreBouton({icone,title,message,onPress}){
    return (
        <TouchableOpacity onPress={onPress}>
               <View style={styleSettingsButton.container}>
            <View style={styleSettingsButton.leading}>
                <FontAwesome name={icone} size={28}/>
                <View style={styleSettingsButton.blocProfil}>
                <Text style={styleSettingsButton.title}>{title}</Text>
                <Text style={styleSettingsButton.subtitle}>{message} </Text>

                </View>
               
            </View>
            <FontAwesome size={30} name="angle-right"/>
           

        </View>

        </TouchableOpacity>
     

    );
}

