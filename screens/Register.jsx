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
  Image,Platform,ImageBackground,TouchableOpacity
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
    <SafeAreaView style={styles.container}>
       <TouchableOpacity onPress={()=>pickImage()}>
      {userPhoto ? <Image source={{ uri: userPhoto }} style={styles.userPhoto} />
      : <Image source={require('../assets/no-profile-image.png')} style={styles.image} />
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


      <MyButton style={{  

          backgroundColor: "#132043",
          padding: 10,
          borderRadius: 30,
          alignItems: "center",
          marginTop: 10,
          width:"30%",
          marginBottom:15,
          marginTop:30

                }
              }

      
      onPress={handlePress}>
        <Text style={styles.buttonText}>Register</Text>
</MyButton>

<View style={{flexDirection:"row" , justifyContent: 'space-Between'}}>
      
      <Pressable style={styles.mybuttonL} onPress={() => router.replace("account/login")}>
        <Text style={styles.textLink}>Login</Text>
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
    backgroundColor:"#FDF0F0",
    justifyContent: "center",
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


  
  buttonText: {
    color: "#F1B4BB",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:'cursive',
    fontSize: 20
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
  
  userPhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  
  image: {
    width: 150,
    height: 150,
    margin: 20,
    borderRadius: 75, 
    borderWidth:3,
    borderColor:"#1F4172",
  },


  mybuttonL: {
  
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
});

export default Register;
