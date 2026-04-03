import { View,Text, FlatList, TouchableOpacity } from "react-native";
import { styleAllInvoices } from "./AllInvoices.style";
import { useUser } from "../view/UserContext";
import { useEffect, useState } from "react";
import { getLastInvoices } from "../services/database";

export function AllInvoices(){
    const {myUser,setMyUser} = useUser();
    const [listFacture,setlistfacture] = useState([]);
    const [select,setSelect] = useState("all");


    useEffect(()=>{

        getListFacture();
    },[]);




    function getListFacture(){
        const factureLocal = getLastInvoices();
        console.log("liste des factures local",factureLocal);
        const value = setlistfacture(factureLocal);


    }

    function selected(choix){
        if(choix === "all"){
            getLastInvoices();
            
            setSelect("all");
        }
        else {
            const value = listFacture;
            const result = value.filter((item)=>{
                return (item.isFinished === 1)
            });
            console.log("resultat du tableue",result);
            setSelect("pending");
        }
    }



    return (
        <View style={styleAllInvoices.container}>
            
            <View style={styleAllInvoices.selection}>
                <TouchableOpacity onPress={()=>{selected("all")}}>
                    <Text style={{color:(select==="all")?"blue":"black"}}>Tous</Text>

                </TouchableOpacity>
                
                <View style={{borderColor:"gray",borderWidth:1,height:"100%"}}></View>
                <TouchableOpacity onPress={()=>selected("pending")}>
                    <Text style={{color:(select==="pending")?"blue":"black"}}>En cours</Text>

                </TouchableOpacity>
                
              
            </View>
            <FlatList
            data={listFacture}
            keyExtractor={(item,index)=>{item.id?.toString() || index.toString()}}
            renderItem={({item})=>(
                <Text>{item.id}</Text>
            )}
            
            
            >

            </FlatList>
            
           
        </View>

    );
}