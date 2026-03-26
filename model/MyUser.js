
import { supabase } from "../services/supabase";
import AsyncStorage from "expo-sqlite/kv-store";




export class MyUser {
    constructor({
    id = null,
    mail,
    fullName = "Client MoPay",
    phone = null,
    createdAt = null,
    token = null,
    

    }){
        this.id = id;
        this.mail = mail;
        this.fullName = fullName;
        this.phone = phone;
        this.createdAt = createdAt;
        this.token = token
      

    }
    async register(password){
        const {data,error} = await supabase.auth.signUp({
            email : this.mail,
            password : password
        });
     
          if(error) throw error;
         
          //recuperation uuid
          const id = data.user.id;
          const tokenSupabase = data.session.access_token;
          const date = new Date();
          this.id = id;

          const {error: insertEror} = await supabase.from("USERS").insert(
            [
                {
                    id: id,
                    mail: this.mail,
                    phone : this.phone,
                    full_name:this.fullName,
                    created_at: date,
                    user_token : tokenSupabase


                }
            ]
          );
          if(insertEror) throw insertEror
          await AsyncStorage.setItem('user',JSON.stringify(this));

    }


    async connect(emailTapped,passwordTapped){
        try {
        const {data, error} = await supabase.auth.signInWithPassword({email:emailTapped,password:passwordTapped});
        if(error) throw error;
         console.log(JSON.stringify(data, null, 2));

         this.mail = data.user.email;
         this.id = data.user.id;
         this.token = data.session.access_token;

           await AsyncStorage.setItem('user',JSON.stringify(this));
         
        } catch (e){
            console.log("erreur" + e);
        }
    }

}