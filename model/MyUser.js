
import { supabase } from "../services/supabase";
import {AsyncStorage} from "expo-sqlite/kv-store";
import { getUser } from "../services/userService";
import { initDB } from "../services/database";




export class MyUser {
    constructor({
    id = null,
    mail,
    fullName = null,
    phone = null,
    createdAt = null,
    user_token = null,
    

    }){
        this.id = id;
        this.mail = mail;
        this.fullName = fullName;
        this.phone = phone;
        this.createdAt = createdAt;
        this.user_token = user_token;
      

    }
    async register(password){
        const {data,error} = await supabase.auth.signUp({
            email : this.mail,
            password : password
        });
     
          if(error) throw error;
          
         
          //recuperation uuid
          const id = data.user.id;
          this.id = id;
          const token = data.session.access_token;
        

          const {error: insertEror} = await supabase.from("USERS").insert(
            [
                {
                    id: id,
                    mail: this.mail,
                    phone : this.phone,
                    full_name:this.fullName,
                    created_at: new Date(),
                    user_token : token


                }
            ]
          );
          
          
          const dataSupaBase = await getUser(id);
         
          if(dataSupaBase && dataSupaBase.data && dataSupaBase.data.length > 0){
            this.mail = dataSupaBase.data[0].mail;
            this.createdAt = dataSupaBase.data[0].created_at
            this.phone = dataSupaBase.data[0].phone;
            this.fullName = dataSupaBase.data[0].full_name;
            this.user_token = dataSupaBase.data[0].user_token;

          }
          
 
          if(insertEror) throw insertEror
          await AsyncStorage.setItem('user',JSON.stringify(this));
           await initDB();
          

    }

    async connect(emailTapped,passwordTapped){
        try {
        const {data, error} = await supabase.auth.signInWithPassword({email:emailTapped,password:passwordTapped});
        if(error) throw error;
        
         this.id = data.user.id;
         const id = this.id
         
         const dataBDD = await getUser(id);
          
         if(dataBDD && dataBDD.data && dataBDD.data.length >0){
           
            this.mail = dataBDD.data[0].mail;
            this.createdAt = dataBDD.data[0].created_at
            this.phone = dataBDD.data[0].phone;
            this.fullName = dataBDD.data[0].full_name;
            this.user_token = dataBDD.data[0].user_token;
         }

         
         
          await AsyncStorage.setItem('user',JSON.stringify(this));
            await initDB();
         
        } catch (e){
            console.log("erreur" + e);
            return false;
        }
        return true;

        
    }

   

}