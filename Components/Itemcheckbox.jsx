
/*colors : 
#132043
#1F4172
#F1B4BB
#FDF0F0 */

import React, { useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet, TouchableOpacity, TextInput, View , Pressable, Button } from 'react-native';
import { collection, query, onSnapshot } from '@firebase/firestore';
// import MyButton from "../../Components/MyButton";
import MyButton from "./MyButton";
// import { db,auth } from '../../firebase/Config';
import { db,auth } from '../firebase/Config';

const HomeScreen = () => {
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch categories from Firestore
        const  unsubscribeCategories = onSnapshot(query(collection(db, 'categories')), (snapshot) => {        
                const categoriesList = snapshot.docs.map((doc) => doc.data());
                setCategories(categoriesList);
            });

        // Fetch products from Firestore
        const unsubscribeProducts = onSnapshot(query(collection(db, 'products')), (snapshot) => {
                const productsList = snapshot.docs.map((doc) => doc.data());
                setProducts(productsList);
            });

        return () => {
            unsubscribeCategories();
            unsubscribeProducts();
        };
    }, []);

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>Price: {item.price}</Text>
        </View>
    );

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
          setUser(currentUser);
        });
        return unsubscribe;
      }, []);

      const handleSearch = () => {
        const filteredProducts = products.filter(product => product.name.includes(searchQuery));
      
    };
  
    const signOut = () => {
      firebase.auth().signOut();
    };
   

    return (
        <View style={styles.container}>

     <Text style={{ fontFamily:'cursive', fontWeight: "bold" ,fontSize:40 ,color:"#F1B4BB", marginLeft:10}}>
      Welcome to ShopEase 
       {user ? user.name : 'to our app'} !</Text>


      {/* {user && <Button title="Sign Out" onPress={signOut} />} */}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ color:"#132043" ,fontFamily:"cursive", flex: 1, borderWidth: 3 ,borderColor:"#FDF0F0", borderRadius:20, padding: 8, marginRight:5 ,marginBottom:20 ,marginTop:20}}
          placeholder="Search products..."
          value={searchQuery}
          
          onChangeText={setSearchQuery}
        />

        <MyButton 
         style={{ backgroundColor:'#1F4172' , borderRadius:20}}>
          <Text style={{ color: "#F1B4BB" ,fontWeight:"bold" ,fontFamily:'cursive'}}>Search</Text>
        
        {/* title="Search" onPress={handleSearch}  */}
        </MyButton>
      </View>

            {/* <Text style={{ color: "#1F4172" ,fontWeight:"bold" ,fontFamily:'cursive',fontSize:40}}>
              Categories:</Text> */}
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                horizontal
            />

            <Text style={{ color: "#1F4172" ,fontWeight:"bold" ,fontFamily:'cursive',fontSize:40}}>
              Products:</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={renderProductItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    categoryItem: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },

    categoryText: {
        fontSize: 16,
    },

    productItem: {
        backgroundColor: '#FDF0F0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 40,
    },

    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color:"#1F4172"
    },


    productPrice: {
        fontSize: 16,
        color: '#F1B4BB',
    },

});

export default HomeScreen;