
import { initDB } from "../services/database";
import { supabase } from "../services/supabase";




export class MyUser {
    constructor({
    id = null,
    mail,
    fullName = "Client MoPay",
    phone = null,
    createdAt = null,
    

    }){
        this.id = id;
        this.mail = mail;
        this.fullName = fullName;
        this.phone = phone;
        this.createdAt = createdAt;
      

    }
    async register(password){
        const {data,error} = await supabase.auth.signUp({
            email : this.mail,
            password : password
        });
     
          if(error) throw error;
          
         
          //recuperation uuid
          const id = data.user.id;
          const token = data.session.access_token;

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
          
          
          const dataSupaBase = await getUser(id);
         
          if(dataSupaBase && dataSupaBase.data && dataSupaBase.data.length > 0){
            this.mail = dataSupaBase.data[0].mail;
            this.createdAt = dataSupaBase.data[0].created_at
            this.phone = dataSupaBase.data[0].phone;
            this.fullName = dataSupaBase.data[0].full_name;
            this.user_token = dataSupaBase.data[0].user_token;

          }
          
 
          if(insertEror) throw insertEror

    }


    async connect(emailTapped,passwordTapped){
        try {
        const {data, error} = await supabase.auth.signInWithPassword({email:emailTapped,password:passwordTapped});
        if(error) throw error;
         console.log(JSON.stringify(data, null, 2));
         
        } catch (e){
            console.log("erreur" + e);
            return false;
        }
        return true;

        
    }

   

}