import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styleNav } from "./MyNavBar.style";

export function MyNavBar({ state, descriptors, navigation }) {
  return (
    <View style={styleNav.container}>
      {state.routes.map((route, index) => {
         
        const { options } = descriptors[route.key];
        
        
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : route.name;
          

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styleNav.navLabel}
          >
            {/* Tu peux changer l'icône selon route.name */}
            <Ionicons
              name={
                route.name === "Accueil"
                  ? "home"
                  : route.name === "Historique"
                  ? "time"
                  : route.name === "Clients"
                  ? "person"
                  :route.name === "Factures"
                  ? "receipt-outline"
                  : "settings"
              }
              size={isFocused ? 30: 20}
              color={isFocused ? "blue" : "gray"}
            />
            <Text style={{ color: isFocused ? "blue" : "gray" }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}