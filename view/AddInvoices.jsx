import { View ,Text, ImageBackground, TouchableOpacity, ScrollView,Modal} from "react-native";
import { styles } from "../styles/App.style";
import background from '../assets/background.png'
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getClients } from "../services/database";
import { useCallback, useEffect, useState } from "react";
import { MyCardClient } from "../components/MyCardClient";
import { MyTextButton } from "../components/MyTextButton";
import {MyBouton} from "../components/MyBouton";

export function AddInvoices(){
    const nav = useNavigation();
    const [selectClient,setselectedClient]= useState();
    const [listclient,setlistclient] = useState([]);
    const [open,setOpen] = useState(false);
    const [modalVisible,setModalVissible] = useState(false);

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

    function validation(){
        setModalVissible(false);
    }

    

    return (
        <ImageBackground source={background} imageStyle={{opacity:0.4}} style={{flex:1,padding:10}}>
            <Modal visible={modalVisible} animationType="slide" >
                  <ImageBackground source={background} style={{flex:1}} imageStyle={{opacity:0.4}}>
                       <Text>Ajouter un service</Text>
                <MyBouton text={"Valider"} onPress={validation}/>

                  </ImageBackground>
             

            </Modal>
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
                    <View style={{
                        flex:1,
                        backgroundColor:"#F7F9FB", 
                        margin:10,
                        borderRadius : 20,
                        borderWidth : 1,
                        borderColor :"black",
                        padding : 10
                        }}>
                <View style={{alignItems:"center",marginVertical:5}}>

                    <Text style={styles.title}>Article/Service</Text>

                </View>
                <View style={{height:"40%",padding:10,marginBottom:5}}>
                    <ScrollView>
                        <Text>List des services</Text>

                    </ScrollView>
                    
                </View>
                <MyTextButton color={"blue"} texte={"+ ajouter article/service"} onPress={()=>setModalVissible(true)}/>
                <View style={{
                    marginTop:5,
                    backgroundColor:"white",
                    height:"20%",
                    justifyContent:"space-around",
                    padding:10,
                    borderRadius : 20,
                    borderWidth : 1,
                    borderColor :"black"

                    }}>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{color:"grey"}}>Sous total</Text>
                        <Text>montant Ar</Text>

                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{color:"grey"}}>Frais de service</Text>
                        <Text>montant Ar</Text>

                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text>Total à payer</Text>
                        <Text>montant Ar</Text>

                    </View>
                    
                    
                    
                </View>
                <View style={{width :"100%",alignItems:"center",marginTop:10}}>
                    <MyBouton text={"Créer la facture"}/>

                </View>
                <View style={{
                    width :"100%",
                    alignItems:"center",
                    marginTop:5,
                    backgroundColor:"#3CB54A",
                    height:35,
                    justifyContent :"center",
                    flexDirection :"row",
                    borderRadius : 20,
                    borderColor :"black",
                    borderWidth : 1
                    }}>
                        <FontAwesome name="check-circle" size={20} color={"white"}/>
                        

                    
                    <Text style={{marginLeft:5,color:"white"}}>Recevez montant Ar sur votre compte mobile</Text>
                    
                </View>

                

                
                
                
                    </View>

                )
            }

             

            


            
        </ImageBackground>
    );
}