import React, { useState } from "react";
import { TouchableOpacity, View, TextInput, Text, StyleSheet, Alert } from "react-native";
import { sendPasswordResetEmail } from "../firebase/auth";
import Login from "../app/account/login";
import { forget } from "../firebase/auth"; 
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const handleForgotPassword = async () => {
    try {
      await forget(email);
      Alert.alert("Password Reset Email Sent", "Check your inbox for password reset instructions.");
      setResetEmailSent(true);
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      Alert.alert('Error', 'Failed to send password reset email. Please try again later.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Forget Password?</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleForgotPassword} style={styles.button}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('/login')} style={styles.link}>
        <Text style={styles.linkText}>Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    width: "100%",
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
});

export default ForgetPassword;
