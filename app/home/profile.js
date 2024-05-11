import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  TextInput,
  Text,
  StyleSheet,AsyncStorage,
} from "react-native";
import {auth, db} from "../../firebase/Config";
import "firebase/auth";
import { doc, getDoc,updateDoc } from "firebase/firestore";
// import { signOut } from "firebase/auth";
//import login from "./login";
import { router } from "expo-router";
const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [viewMode, setViewMode] = useState(true);

  const handleSave = () => {
    setViewMode(true);
    
    updateUserData();
  };

  const getUser = async() => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
       const data =docSnap.data();
       setName(data.name);
       setEmail(data.email);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  const handleEdit = () => {
    setViewMode(false);
    
  };
  const updateUserData = async()=>{
    const washingtonRef = doc(db, "users", auth.currentUser.uid);
   try{
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      name:name,
      email:email,
    });
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }}

  getUser();
// {viewMode?  getUser():null};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      {viewMode ? (
        <View>
          <Text style={styles.label}>Name: </Text>
          <Text style={styles.info}>{name}</Text>
          <Text style={styles.label}>Email: </Text>
          <Text style={styles.info}>{email}</Text>
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Name: </Text>
          <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* onPress={router.navigate("/account/login")} */}
        <TouchableOpacity >
            <Text style={{padding:10,fontSize:20,fontWeight:20,color:"red"}}>Signout</Text>
          </TouchableOpacity >    
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default ProfilePage;