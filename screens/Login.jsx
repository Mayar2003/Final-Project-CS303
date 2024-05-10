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
      <MyButton onPress={handleLogin} >
        <Text style={styles.buttonText}>Login</Text>
      </MyButton>
      <Pressable onPress={()=>router.replace("/account/register")}>
        <Text style={styles.textLink}>Register</Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/account/ForgetPassword")}>
        <Text style={styles.textLink}>Forgot Password</Text>
      </Pressable>
      <Text style={styles.errorText}>{error.code}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  textLink: {
    textAlign: "center",
    marginTop: 10,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
  },
});

export default Login;
