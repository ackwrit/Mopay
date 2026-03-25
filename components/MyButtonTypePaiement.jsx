import { View } from "react-native";
import { styleTypePaiement } from "./MyButtonTypePaiement.style";
import { Ionicons } from "@expo/vector-icons";

export function MyButtonTypePaiement({icone}){
    return (
        <View style={styleTypePaiement.container}>
            <Ionicons name={icone} size={40} color="black" />

        </View>
    );
}