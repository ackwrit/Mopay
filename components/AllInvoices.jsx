import { View,Text, FlatList, TouchableOpacity } from "react-native";
import { styleAllInvoices } from "./AllInvoices.style";
import { useUser } from "../view/UserContext";
import { useEffect, useState } from "react";
import { getLastInvoices } from "../services/database";
import { MyFactureGlobal } from "./MyFactureGlobal";

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
            const value  = getLastInvoices();
            setlistfacture(value);
            
            setSelect("all");
        }
        if(choix === "pending") {
            const value = getLastInvoices();
            const result = value.filter((item)=>{
                return (item.isFinished === 0)
            });
           
            
            setSelect("pending");
            setlistfacture(result);
        }
           if(choix === "termine") {
            const value = getLastInvoices();
            const result = value.filter((item)=>{
                return (item.isFinished === 1)
            });
            
            
            setSelect("termine");
            setlistfacture(result);
        }
        
    }



    return (
        <View style={styleAllInvoices.container}>

            <View style={{alignItems:"center"}}>
                  <View style={styleAllInvoices.selection}>
                <TouchableOpacity onPress={()=>{selected("all")}}>
                    <Text style={{color:(select==="all")?"blue":"black"}}>Tous</Text>

                </TouchableOpacity>
                
                <View style={{borderColor:"gray",borderWidth:1,height:"100%"}}></View>
                <TouchableOpacity onPress={()=>selected("pending")}>
                    <Text style={{color:(select==="pending")?"blue":"black"}}>En cours</Text>

                </TouchableOpacity>

                  <View style={{borderColor:"gray",borderWidth:1,height:"100%"}}></View>
                <TouchableOpacity onPress={()=>selected("termine")}>
                    <Text style={{color:(select==="termine")?"blue":"black"}}>Terminé</Text>

                </TouchableOpacity>
                
              
            </View>

            </View>
            
          
            <FlatList
            data={listFacture}
            keyExtractor={(item,index)=>{ return item.id?.toString() || index.toString()}}
            renderItem={({item})=>(
                <MyFactureGlobal item={item}/>
            )}
            
            
            >

            </FlatList>
            
           
        </View>

    );
}