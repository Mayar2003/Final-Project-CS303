import React, { useState } from "react";
import { View, SafeAreaView, Pressable, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native-web";
import { uploadToFirebase } from "../../firebase/auth";
export default function AddProduct() {
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [dis, setDis] = useState("");
   const [image, setImage] = useState("");
   const [error, setError] = useState("");
   const [permission, requestPermission] = ImagePicker.useCameraPermissions();
   // used to pick image from Galary
   const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [1, 1],
         quality: 1,  
      });
      console.log(result);
      if (!result.cancelled) {
         setImage(result.uri);
      }
   };
   //  const handleAddProduct = async () => {
   //    const imageURL = await uploadToFirebase;
   //    pickImage(imageURL);
   //    if (imageURL) {
   //      // Image uploaded successfully, add product to database
   //      console.log("Image uploaded to Firebase storage:", imageURL);
   //      // Add your database logic here (e.g., Firestore or Realtime Database)
   //    } else {
   //      setError("Failed to upload image");
   //    }
   //  };

   //  const addProductToFirebase = async () => {
   //    try {
   //      // Add product to Firestore collection
   //      await db.collection("products").add({
   //        name,
   //        price: parseFloat(price), // Convert price to a number
   //        imageUrl: image, // Store image URL in Firestore
   //       //  createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Add a timestamp
   //      });
   //      console.log("Product added successfully!");
   //      // Clear input fields after adding product
   //      setName("");
   //      setPrice("");
   //      setImage("");
   //      setError("");
   //    } catch (error) {
   //      console.error("Error adding product: ", error);
   //      setError("Failed to add product. Please try again later.");
   //    }
   //  };
   const takephoto = async () => {
      try{
      const cameraRes = await ImagePicker.launchImageLibraryAsync({
         allowsEditing: true,
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         quality: 1
      })
      if (!cameraRes.canceled) {
         console.log(cameraRes.assets[0].uri);
           const {uri , filename} = cameraRes.assets[0];
         const uploadResp =await uploadToFirebase(uri,filename);
         console.log(uploadResp);
      }
   }catch(e){
      console.log("error"+e.message);
   }
   };
 //    permission check

   if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
      return (
         <View>
            <Text>
               permission,Not Granted-{permission?.status}
            </Text>
            <StatusBar style="auto" />
            <Button title="Request permission" onPress={requestPermission} />
         </View>
      )
   };
   return (
      <SafeAreaView style={styles.container}>
         <Button title="Take picture " onPress={takephoto}/>
         <TouchableOpacity onPress={() => pickImage()}>
            {image ? <Image source={{ uri: image }} style={styles.image} /> :
               <Image source={require('../../assets/placeholder.jpg')} style={styles.image} />
            }
         </TouchableOpacity>
         <TextInput
            placeholder="Product Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
         />
         <TextInput
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType='number-pad'
            style={styles.input}
         />
         <TextInput
            placeholder="Discreption"
            value={dis}
            onChangeText={setDis}
            style={styles.input}
         />
         {/* onPress={addProductToFirebase()} */}
         <Pressable style={styles.addButton}   >
            <Text style={styles.buttonText}>Add Product</Text>
         </Pressable>
         {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f0f0", // Light gray background color
   },
   image: {
      width: 150,
      height: 150,
      margin: 20,
      borderRadius: 75, // Circular shape for the image
      backgroundColor: "#fff", // White background color for the image
   },
   input: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 12,
      marginBottom: 10,
      borderColor: "#ccc",
      backgroundColor: "#fff",
      width: "80%",
   },
   addButton: {
      backgroundColor: "#007BFF", // Blue color for the button
      borderRadius: 5,
      padding: 15,
      width: "80%",
      alignItems: "center",
   },
   buttonText: {
      color: "#fff",
      fontSize: 16,
   },
   errorText: {
      color: "red",
      marginTop: 10,
   },
});