import React, { useState } from "react";
import { TouchableOpacity, View, TextInput, Text, StyleSheet, Alert } from "react-native";
import { sendPasswordResetEmail } from "../firebase/auth";
import { router } from "expo-router";
import Login from "../app/account/login";
import { forget } from "../firebase/auth"; 

/*#132043
#1F4172
#F1B4BB
#FDF0F0 */


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);


  const handleForgotPassword = async () => {
    try {
      await forget(email);
      alert("Password Reset Email Sent", "Check your inbox for password reset instructions.");
      setResetEmailSent(true);
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      alert('Error', 'Failed to send password reset email. Please try again later.');
    }
  };


  return (
    
     <View style={styles.container}> 
      <Text style={styles.headerText}>Forget Password?</Text>
      <Text style={styles.header2Text}>No Problem!</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleForgotPassword} style={styles.buttonS}>
        <Text style={styles.buttonTextS}>Send Email</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/login')} style={styles.link}>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/account/login')} style={styles.link}>

        <Text style={styles.linkText}>Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
backgroundColor:"#FDF0F0",
  flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal:0,
  

  },


  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily:'cursive',
    color:"#132043",
    marginBottom: 5,

  },

  header2Text: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily:'cursive',
    color:"#F1B4BB",
    marginBottom: 80,
  },

  input: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor:"#F1B4BB",
    padding: 10,
    marginBottom: 10,
    width: "80%",
    color:"#1F4172",
    fontFamily:'cursive',
    backgroundColor: "#fff"


  },

  buttonS: {
    width: "100%",
    backgroundColor: "#132043",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
    marginTop:20,
    marginBottom:5,

    width:"30%"
  },

  buttonTextS: {
    color: "#F1B4BB",
    fontWeight: "bold",
    fontFamily:'cursive',
    fontSize: 15,
    
  },
  


  link: {
    marginTop: 0,

  },


  linkText: { 
    backgroundColor: "#F1B4BB",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    // marginTop: 10,
    width:"100%",
    fontSize: 13,
    // fontWeight: "bold",/
    fontFamily:'cursive',
    color: "#1F4172",
  },
});

export default ForgetPassword;
