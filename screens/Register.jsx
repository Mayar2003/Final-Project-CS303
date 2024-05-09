import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,Platform,ImageBackground,TouchableOpacity, ImageResizeMode 
} from "react-native";
import { register } from "../firebase/auth";
import MyButton from "../Components/MyButton";
import { addUser } from "../firebase/todos";
import ForgetPassword from "./ForgetPassword";
import * as ImagePicker from 'expo-image-picker';
const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserPhoto(result.uri);
    }
  };

  const handlePress = async () => {
    try {
      const credentials = await register(email, password);
      await addUser(credentials.user, userName, userPhoto);
      console.log("credentials", credentials);
      console.log("user", credentials.user);
      console.log("uid", credentials.user.uid);
      router.navigate(`/home`);
    } catch (error) {
      console.log("error", JSON.stringify(error));
      setError(error);
    }
  };

  return (
    // resizeMode="cover"
    
    <SafeAreaView style={styles.container}>
      <ImageBackground
       source={require('../assets/7053621.jpg')} 
        // resizeMode="contain" 
        resizeMode={Image.resizeMode.center}
        // style={{ flex: 1, height: undefined, width: undefined }}

         /*style={{width:1300 , height:1000 , backgroundColor:'rgba(0, 0, 0, 0.5)'}}*/ >
      
      </ImageBackground>

        {/* <TouchableOpacity onPress={()=>pickImage()}>
      {userPhoto ? <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
      :   <Image source={require('../assets/7053621.jpg')} style={{width:1500 , height:800,paddingRight:50}}  />
      } 
        </TouchableOpacity> */}


       <TouchableOpacity onPress={()=>pickImage()}>
      {userPhoto ? <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
      :   <Image source={require('../assets/no-profile-image.png')} style={styles.image} />
      } 
        </TouchableOpacity>


      {/* <ImageBackground source={userPhoto} style={{width:200,height:200,paddingRight:50}}></ImageBackground> */}
      <TextInput
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />
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
      <MyButton onPress={handlePress}>
        <Text style={styles.buttonText}>Register</Text>
      </MyButton>
      <Pressable onPress={() => router.replace("account/login")}>
        <Text style={styles.textLink}>Login</Text>
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
  userPhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },image: {
    width: 150,
    height: 150,
    margin: 20,
    borderRadius: 75, // Circular shape for the image
    backgroundColor: "#fff", // White background color for the image
  },
});

export default Register;
