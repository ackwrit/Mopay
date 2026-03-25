import { View ,Text, TouchableOpacity, Alert} from "react-native";
import { stylesSummaryButton } from "./MySummaryButton.style";
import { Ionicons } from "@expo/vector-icons";


export function MySummaryButton({onPressed}){
    return (
        <View style={stylesSummaryButton.container}>
            <View style={stylesSummaryButton.element_start}>
                
                    <TouchableOpacity onPress={onPressed}>
                       <View style={stylesSummaryButton.element_cercle}>
                    <Ionicons name="trending-up" size={50} color={"white"}/>

                </View>
                    
                </TouchableOpacity>

               
                
             
                
              
            <Text style={stylesSummaryButton.element_text}>300 000 Ar</Text>

            </View>
            
                  <TouchableOpacity onPress={onPressed}>
                <View style={stylesSummaryButton.element_cercle_right}>
                    <Ionicons name="add" size={50} color={"white"}/>

                </View>

            </TouchableOpacity>

          
          
          
             

        </View>

    );

}