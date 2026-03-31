import { View,Text, ScrollView, TouchableOpacity } from "react-native";
import { styleAllHistory } from "./AllHistory.style";
import {Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { getClients, getLastInvoices } from "../services/database";
import { useFocusEffect } from "@react-navigation/native";
import { BoxHistory } from "./BoxHistory";

export function AllHistory(){
    const [listeTotal,setListeTotal] = useState([]);
    const [mergeList,setmergeList] = useState([]);
    const [selectionchoice,setselectionchoice] = useState("all");
    useFocusEffect(
        useCallback(()=>{
        const value = getClients();
       
        
        const fact = getLastInvoices();
         const clientsMap = Object.fromEntries(value.map(c => [c.id, c]));
            
        const mergedData = fact.map(inv =>({
                ...inv,
                clientName : (clientsMap[inv.clientId])?.name ?? "client inconnu",
                phone : (clientsMap[inv.clientId])?.phone ?? "numéro inconnu"
                
    
        }));
        console.log("fusion tel :",mergedData);
        
        setmergeList(mergedData);
        setListeTotal(mergedData);
        

    },[])

    );

    function listing(type){
        setselectionchoice(type)
        const liste = listeTotal;
        if(type === "all"){
            setmergeList(liste);
            
           
        }
        if(type === "pay"){
            const value =liste.filter(item=>item.status ==="pay");
            setmergeList(value);
            
        }
        if(type === "pending"){
            
            const v = liste.filter(item=>item.status === "pending");
           
            setmergeList(v);
           
        }
       

    }
    



    return (
        <View style={styleAllHistory.container}>
            
            <View style={styleAllHistory.header}>
                <Text style={{fontSize:24,fontWeight:"medium"}}>Historique</Text>
                <View style={styleAllHistory.circle}>
                    <Ionicons name="trending-up" size={35} color={"white"}/>
                 
                </View>
                
            </View>
            <View style={styleAllHistory.choice}>
                <TouchableOpacity onPress={()=>listing("all")}>
                    <Text style={{color:(selectionchoice === "all")?"blue":"black"}}>Tous</Text>

                </TouchableOpacity>
                
                <View style={styleAllHistory.separator}></View>
                <TouchableOpacity onPress={()=>listing("pay")}>
                    <Text style={{color:(selectionchoice === "pay")?"blue":"black"}}>Payé</Text>

                </TouchableOpacity>
                
                 <View style={styleAllHistory.separator}></View>
                 <TouchableOpacity onPress={()=>listing("pending")}>
                    <Text style={{color:(selectionchoice === "pending")?"blue":"black"}}>En attente</Text>
                    
                </TouchableOpacity>
                
            </View>
            <View style={styleAllHistory.scroll}>
                <ScrollView>
                    {
                       mergeList.map((item,index)=>{
                        return <BoxHistory item={item} key={item.id || index}/>
                        
                       }) 
                    }
                
            </ScrollView>

            </View>
            

        </View>
        

    );
}