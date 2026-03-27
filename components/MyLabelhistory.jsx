import { View,Text } from "react-native";
import { styleLabelHistory } from "./MyLabelhistory.style";
 export function MyLabelhistory({items}){
    const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
    return (
        <View style={styleLabelHistory.container}>
            <View >
                <Text style={styleLabelHistory.nameText}>{items.clientName}</Text>
                <Text style={styleLabelHistory.statusText}>{(items.status === "pending")?"Argent en cours":"Argent reçu"}</Text>
            </View>
            <View>
                <Text style={styleLabelHistory.amoutText}>{items.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ar</Text>
                <Text style={styleLabelHistory.nameText}>{formatDate(items.createdAt)}</Text>
            </View>
        </View>

    );
 }