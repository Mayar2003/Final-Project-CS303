import { router } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { login } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyButton from "../Components/MyButton";
import ForgetPassword from "./ForgetPassword";


/*#132043
#1F4172
#F1B4BB
#FDF0F0 */


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // console.log("auth().currentUser", auth.currentUser);
    const unsub = onAuthStateChanged(auth, 
      (user) => {
    if(user){
         if(email==='dohasaeed5550@gmail.com') {
       router.replace(`/home/AddProductt`);
          } else{
        router.replace(`/home`);
               }
               AsyncStorage.setItem("user", JSON.stringify(user));
              }
      else{
          AsyncStorage.removeItem("user");
          router.replace("/account/login");
          AsyncStorage.setItem("user", JSON.stringify(user));

        }
        // setUser(user)
      });

    return () => {
      unsub();
    };
  }, []);

  const handleLogin = async () => {
    try {
      
        const credentials = await login(email, password);
        console.log('credentials', credentials);
        
        
    } catch (error) {
        console.log('error', JSON.stringify(error));
        setError(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Let's Login !</Text>

      <TextInput 
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      /> 

        <MyButton style={styles.mybuttonL} onPress={handleLogin} >
          <Text style={styles.buttonTextL}>Login</Text>
        </MyButton>

      <View style={{flexDirection:"row" , justifyContent: 'space-Between'}}>

   

      <Pressable style={styles.mybuttonR} onPress={()=>router.replace("/account/register")}>
        <Text style={styles.textLink}>Register</Text>
      </Pressable>

      <Pressable style={styles.mybuttonF} onPress={() => router.replace("/account/ForgetPassword")}>
        <Text style={styles.textLink}>Forgot Password</Text>
      </Pressable>

</View>

      <Text style={styles.errorText}>{error.code}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FDF0F0",
    flexDirection:"column",
    justifyContent: "center", 
    alignItems: "center",
    marginHorizontal:0,
  },

  input: {

    borderWidth: 3,
    borderRadius: 20,
    borderColor:"#F1B4BB",
    padding: 10,
    marginBottom: 10,
    width: "75%",
    color:"#1F4172",
    fontFamily:'cursive',
    backgroundColor: "#fff"

  },


  buttonTextL: {
    color: "#F1B4BB",
    fontWeight: "bold",
    fontFamily:'cursive',
    fontSize: 20,
    padding:0
  },

  buttonText: {
    color: "#F1B4BB",
    fontWeight: "bold",
    fontFamily:'cursive',
    fontSize: 13,
    padding:0
  },

  mybuttonL: {
    // width: "10%",
    backgroundColor: "#132043",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    width:"30%",
    marginBottom:15,
    marginTop:30


  },

  mybuttonR: {
  
    backgroundColor: "#F1B4BB",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    width:"30%",
    justifyContent: "center",
    marginRight :75

  },

  mybuttonF: {

    backgroundColor: "#F1B4BB",
    padding: 5,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    width:"30%",
    justifyContent: "center",
    marginLeft :75,

  },

  textLink: {
    textAlign: "center",
    color: "#1F4172",
    // fontWeight: "bold",
    fontFamily:'cursive',
   
  },

  errorText: {
    textAlign: "center",
    color: "#132043",
    marginTop: 10,
    fontFamily:'cursive',
fontSize:20
  },

  header: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily:'cursive',
    color:"#132043",
    marginBottom:70,
    
  },
});

export default Login;
