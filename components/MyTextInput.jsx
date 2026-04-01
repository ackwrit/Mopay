import { TextInput, Text, View,Image } from "react-native";
import { styles } from "./MyTextInput.style";
import { FontAwesome } from '@expo/vector-icons';


export function MyTextInput({text,icon,onChanged,value,security,keyboard="default"}){
    return (
        <View style={styles.all}>
            <FontAwesome name ={icon} size={22} style={styles.icone}></FontAwesome>
            <TextInput  keyboardType={keyboard} secureTextEntry={security} placeholder={text} style={styles.container} value={value} onChangeText={onChanged}></TextInput>
            
        </View>
    );
}