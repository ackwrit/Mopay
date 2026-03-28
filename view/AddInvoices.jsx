import { View ,Text, ImageBackground, TouchableOpacity, ScrollView} from "react-native";
import { styles } from "../styles/App.style";
import background from '../assets/background.png'
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getClients } from "../services/database";
import { useCallback, useEffect, useState } from "react";
import { MyCardClient } from "../components/MyCardClient";

export function AddInvoices(){
    const nav = useNavigation();
    const [selectClient,setselectedClient]= useState();
    const [listclient,setlistclient] = useState([]);
    const [open,setOpen] = useState(false);

    useFocusEffect(
        useCallback(()=>{
            AllClients();

        },[])

    );

    function back(){
        nav.goBack();

    }

    function AllClients(){
        const clientsDB = getClients();
        setlistclient(clientsDB);
        if(clientsDB !==null){
           setselectedClient(clientsDB[0]);

        }

        
       
    }

    function selectionClient(client){
        setOpen(false);
        setselectedClient(client)


    }

    

    return (
        <ImageBackground source={background} imageStyle={{opacity:0.4}} style={{flex:1,padding:10}}>
            <TouchableOpacity onPress={back}>
                 <View style={styles.header_Addinvoice}>
                <FontAwesome name="angle-left" size={30} style={{marginRight:5}}/>
                <Text style={styles.title}>Factures</Text>
            </View>

            </TouchableOpacity>
             <TouchableOpacity onPress={()=>{setOpen(!open)}}>
           
            <View style={styles.containerAddInvoice}>
               
                    <View>
                    <Text style={{fontWeight:"bold"}}>CLIENTS</Text>
                    <Text style={{marginTop:5}}>{selectClient?.name ?? "Aucun client"}</Text>
                    <Text style={{color:"grey"}}>+261 {selectClient?.phone ?? ""}</Text>
                    

                </View>
                <FontAwesome name= {open ?"angle-down" : "angle-right"} size={30}/>   
            </View>
            </TouchableOpacity>
            {open && (
                <View style={{
                    margin:5,
                    backgroundColor:"#f0f0f0",
                    borderRadius:20,
                    borderWidth: 1,
                    height : 500,
                    borderColor :"black",
                    padding : 10,
                    shadowColor: "#000000",
                    shadowOffset: {
                    width: 0,
                    height: 3,
                    },
                    shadowOpacity:  0.18,
                    shadowRadius: 4.59,
                    elevation: 5,

                    }}>
                    <ScrollView>
                    {
                        listclient.map((item,index)=>{
                            return <TouchableOpacity key={item.id || index} onPress={()=>{selectionClient(item)}}>
                                 <MyCardClient client={item}/>

                            </TouchableOpacity>
                           
                        })
                    }
                    </ScrollView>
                </View>
            )}

            {
                !open && (
                    <View>
                <Text>Bloc article/service</Text>
                    </View>

                )
            }

             

            


            
        </ImageBackground>
    );
}