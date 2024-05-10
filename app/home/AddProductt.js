import React, { useState } from "react";
import {
   View, SafeAreaView, Pressable, Text, StyleSheet, Platform,
   TextInput, TouchableOpacity, Image, Button,
   Alert
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { db,Storage } from "../../firebase/Config";
import { StatusBar } from "expo-status-bar";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadToFirebase } from "../../firebase/auth";
import { Picker } from "@react-native-picker/picker";
import * as FileSystem from "expo-file-system";
export default function AddProduct() {
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [description, setDescription] = useState("");
   const [image, setImage] = useState("");
   const [error, setError] = useState("");
   const [selectedCategory, setSelectedCategory] = useState('');
   const categories = ['Foods', 'Drinks', 'Electronics', 'Animal Supplies'];
   const [permission, requestPermission] = ImagePicker.useCameraPermissions();
   const [loading, setUploading] = useState(false);
    const [url, setUrl] = useState("");
   const getPermission = async () => {
      if (Platform.OS == 'web') {
         const { status } = await Permissions.askAsync(Permissions.CAMERA);
         if (status !== 'granted') {
            alert('You must allow access to the camera to take photos');
         }
      }
   };
   // used to pick image from Galary
   const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
         multiple: true,
      });
      console.log(result);
      if (!result.canceled) {
         setImage(result.assets[0].uri);
      }
   };
   const takePhoto = async () => {
      await getPermission();
      let result = await ImagePicker.launchCameraAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });
      setImage(result.uri);
      if (!result.canceled) {
         setImage(result.assets[0].uri);
      }
   };

   const uploadFile = async () => {
      setUploading(true);
     try { const storage = getStorage();
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage,` products/${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(snapshot.ref);

        setUrl(await imageUrl);
        console.log("Download URL:", url);
        Alert.alert("Upload Completed");
        // setImage(null);
     } catch (error) {
        console.error("Upload failed:", error);
        Alert.alert("Upload Failed");
     }finally {
        setUploading(false);
      }
   }
   const handleAddProduct = async () => {
      try {
         if (!name || !price || !description ||!image ) {
            alert('Please fill in all fields and select the image.');
            return;
         }
      const productsCollection = collection(db, "products");

         const newProduct = {
            imageUrl: url,
            productName: name,
            price: parseFloat(price),
            description: description,
            category: selectedCategory
         };
         await addDoc(productsCollection, newProduct);
         Alert.alert("Success", "Product added successfully.");
         setName("");
         setDescription("");
         setPrice("");
         setSelectedCategory("");
         setImage(null);
      } catch (error) {
         console.error("Error adding product:", error);
         Alert.alert("Error", "Failed to add product. Please try again.");
      }
   };


   return (
      <SafeAreaView style={styles.container}>
         <Button title="open camera" onPress={takePhoto} />
          
         <TouchableOpacity onPress={() => pickImage()}>
            <Image   source={{ uri: image }} style={styles.image} />
            {/* // <Image source={require('../../assets/placeholder.jpg')} style={styles.image} /> */}
         </TouchableOpacity>
         <TouchableOpacity onPress={uploadFile}>
          <Text> click here after you choose photo</Text>
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
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline
         />
         <Picker
            selectedValue={selectedCategory}
            style={styles.input}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
         >
            <Picker.Item label="Select category" value=" " />
            {categories.map((category, index) => (
               <Picker.Item label={category} value={category} key={index} />
            ))}
         </Picker>
         <Pressable style={styles.addButton} onPress={handleAddProduct}  >
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
      backgroundColor: "#f0f0f0",
   },
   image: {
      width: 150,
      height: 150,
      margin: 20,
      borderRadius: 75,
      backgroundColor: "#fff",
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