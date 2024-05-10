// import { useState } from "react";
// import { StyleSheet, Text, Pressable, View } from "react-native";
// import MyButton from "./MyButton";

// export default function Item({
//   isDone,
//   text,
//   onPress,
//   onDelete,
//   onDone,
// }) 
// {
//   return (
//     <View style={styles.item}>

//     <Pressable
//       onPress={onPress}
//       style={({ pressed  }) => [
//         // { opacity: pressed ? 0.2 : 1 },
//         styles.item,
     
//     >
//       <Pressable onPress={()=>{onDone();}}>
//         {({ pressed }) => (
//           <View
//             // style={
//               // {styles.itemContainer}
//               [
//               // styles.checkbox,
//               // pressed && styles.pressed,
//             ]
//           }
//           >
//             {isDone && (
//               <Text style={styles.x}>
//                 {/* {pressed?"o":"x"}x */}
//               </Text>
//             )}
//           </View>
 
//         // Fetch products from Firestore
//         const unsubscribeProducts = onSnapshot(query(collection(db, 'products')), (snapshot) => {
//                 const productsList = snapshot.docs.map((doc) => doc.data());
//                 setProducts(productsList);
//             });

//         return () => {
//             unsubscribeCategories();
//             unsubscribeProducts();
//         };
//     }, 
// );

//     const renderCategoryItem = ({ item }) => (
//         <TouchableOpacity style={styles.categoryItem}>
//             <Text style={styles.categoryText}>{item.name}</Text>
//         </TouchableOpacity>
//     );

//     const renderProductItem = ({ item }) => (
//         <View style={styles.productItem}>
//             <Text style={styles.productName}>{item.name}</Text>
//             <Text style={styles.productPrice}>Price: {item.price}</Text>
//         </View>
//     );

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//           setUser(currentUser);
//         });
//         return unsubscribe;
//       }, []);

//       const handleSearch = () => {
//         const filteredProducts = products.filter(product => product.name.includes(searchQuery));
      
//     };
  
//     const signOut = () => {
//       firebase.auth().signOut();
//     };
   

//     return (
//         <View style={styles.container}>

//      <Text style={{ fontFamily:'cursive', fontWeight: "bold" ,fontSize:40 ,color:"#F1B4BB", marginLeft:10}}>
//       Welcome to ShopEase 
//        {user ? user.name : 'to our app'} !</Text>


//       {/* {user && <Button title="Sign Out" onPress={signOut} />} */}

//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <TextInput
//           style={{ color:"#132043" ,fontFamily:"cursive", flex: 1, borderWidth: 3 ,borderColor:"#FDF0F0", borderRadius:20, padding: 8, marginRight:5 ,marginBottom:20 ,marginTop:20}}
//           placeholder="Search products..."
//           value={searchQuery}
          
//           onChangeText={setSearchQuery}
//         />

//         <MyButton 
//          style={{ backgroundColor:'#1F4172' , borderRadius:20}}>
//           <Text style={{ color: "#F1B4BB" ,fontWeight:"bold" ,fontFamily:'cursive'}}>Search</Text>
        
//         {/* title="Search" onPress={handleSearch}  */}
//         </MyButton>
//       </View>

//             {/* <Text style={{ color: "#1F4172" ,fontWeight:"bold" ,fontFamily:'cursive',fontSize:40}}>
//               Categories:</Text> */}
//             <FlatList
//                 data={categories}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderCategoryItem}
//                 horizontal
//             />

//             <Text style={{ color: "#1F4172" ,fontWeight:"bold" ,fontFamily:'cursive',fontSize:40}}>
//               Products:</Text>
//             <FlatList
//                 data={products}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderProductItem}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },

//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },

//     categoryItem: {
//         backgroundColor: '#f0f0f0',
//         padding: 10,
//         borderRadius: 5,
//         marginRight: 10,
//     },

//     categoryText: {
//         fontSize: 16,
//     },

//     productItem: {
//         backgroundColor: '#FDF0F0',
//         padding: 10,
//         marginBottom: 10,
//         borderRadius: 40,
//     },

//     productName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 5,
//         color:"#1F4172"
//     },


//     productPrice: {
//         fontSize: 16,
//         color: '#F1B4BB',
//     },

//       </Pressable>

//       <Text style={styles.title }>{text}</Text>
//     </Pressable>
//      </View>
//   );
// }

// const styles = StyleSheet.create({
// //   checkbox: {
// //     height: 24,
// //     width: 24,
// //     backgroundColor: "#0ff",
// //     borderWidth: 2,
// //     borderRadius: 12,
// //     borderColor: "white",
// //   },


//   // checked: {
//   //   backgroundColor: "blue",
//   //   borderColor: "black",
//   // },


//   pressed: {
//     margin: 2,
//     height: 20,
//     width: 20,
//     // backgroundColor: "pink",
//   },


//   // x: {
//   //   fontSize: 24,
//   //   margin: -12,
//   //   paddingLeft: 14,
//   //   color: "white",
//   // },


//   selected: {
//     color: "black",
//   },

//   //todos not
//   item: {
//     // backgroundColor: "black",
//     // padding: 5,
//     // marginVertical: 5,
//     // marginHorizontal: 5,
//     flexDirection: "row",
//     justifyContent: "space-between",
    
//   },

//   title: {
//     // flex: 1,
//     color:'pink',
//     marginLeft:40,
//     marginVertical: 5,
//     marginHorizontal: 5,
//     flexDirection: "row",
//     justifyContent:'center',

//     borderColor:'#E1AFD1',
//     borderRadius:10,
//     borderStyle:'solid',
//     borderWidth:3,
//     fontSize: 32,
//     marginRight:5,
//     textAlign: "center",
//     alignContent:"center",

//     backgroundColor :"#fff9f9",
//     width:200,
//     height:150
//   },

//   image: {
//     width: 50,
//     height: 50,
//   },
//   // itemContainer:{  backgroundColor: "#f9c2ff",
//   // padding: 0,
//   // marginVertical: 5,
//   // marginHorizontal: 5,
//   // flexDirection: "column", // This will make each item in the FlatList use column direction
//   // justifyContent: "space-between",}

// });


//not ours








// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, Pressable, View, TextInput, FlatList, TouchableOpacity } from "react-native";
// import MyButton from "./MyButton";

// export default function Item({
//   isDone,
//   text,
//   onPress,
//   onDelete,
//   onDone,
// }) {
//   return (
//     <View style={styles.item}>
//       <Pressable
//         onPress={onPress}
//         style={({ pressed }) => [
//           { opacity: pressed ? 0.2 : 1 },
//           styles.item,
//         ]}
//       >
//         <Pressable onPress={() => { onDone(); }}>
//           {({ pressed }) => (
//             <View style={[styles.checkbox]}>
//               {isDone && (
//                 <Text style={styles.x}>
//                   {pressed ? "o" : "x"}
//                 </Text>
//               )}
//             </View>
//           )}
//         </Pressable>
//         <Text style={styles.title}>{text}</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   checkbox: {
//     height: 24,
//     width: 24,
//     backgroundColor: "#0ff",
//     borderWidth: 2,
//     borderRadius: 12,
//     borderColor: "white",
//   },

//   pressed: {
//     margin: 2,
//     height: 20,
//     width: 20,
//   },

//   x: {
//     fontSize: 24,
//     margin: -12,
//     paddingLeft: 14,
//     color: "white",
//   },

//   item: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   title: {
//     flex: 1,
//     color: 'pink',
//     marginLeft: 40,
//     marginVertical: 5,
//     marginHorizontal: 5,
//     borderColor: '#E1AFD1',
//     borderRadius: 10,
//     borderStyle: 'solid',
//     borderWidth: 3,
//     fontSize: 32,
//     marginRight: 5,
//     textAlign: "center",
//     alignContent: "center",
//     backgroundColor: "#fff9f9",
//     width: 200,
//     height: 150
//   },
// });






// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
// import { collection, query, onSnapshot } from '@firebase/firestore';

// import { db,auth } from '../../firebase/Config';
// const HomeScreen = () => {
//     const [user, setUser] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         // Fetch categories from Firestore
//         const  unsubscribeCategories = onSnapshot(query(collection(db, 'categories')), (snapshot) => {        
//                 const categoriesList = snapshot.docs.map((doc) => doc.data());
//                 setCategories(categoriesList);
//             });

//         // Fetch products from Firestore
//         const unsubscribeProducts = onSnapshot(query(collection(db, 'products')), (snapshot) => {
//                 const productsList = snapshot.docs.map((doc) => doc.data());
//                 setProducts(productsList);
//             });

//         return () => {
//             unsubscribeCategories();
//             unsubscribeProducts();
//         };
//     }, []);

//     const renderCategoryItem = ({ item }) => (
//         <TouchableOpacity style={styles.categoryItem}>
//             <Text style={styles.categoryText}>{item.name}</Text>
//         </TouchableOpacity>
//     );

//     const renderProductItem = ({ item }) => (
//         <View style={styles.productItem}>
//             <Text style={styles.productName}>{item.name}</Text>
//             <Text style={styles.productPrice}>Price: {item.price}</Text>
//         </View>
//     );

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//           setUser(currentUser);
//         });
//         return unsubscribe;
//       }, []);

//       const handleSearch = () => {
//         const filteredProducts = products.filter(product => product.name.includes(searchQuery));
      
//     };
  
//     const signOut = () => {
//       firebase.auth().signOut();
//     };
   

//     return (
//         <View style={styles.container}>

//      <Text>Welcome {user ? user.email : 'to our app'}!</Text>
//       {user && <Button title="Sign Out" onPress={signOut} />}
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <TextInput
//           style={{ flex: 1, borderWidth: 1, padding: 8, marginRight: 8 }}
//           placeholder="Search products..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <Button title="Search" onPress={handleSearch} />
//       </View>

//             <Text style={styles.title}>Categories:</Text>
//             <FlatList
//                 data={categories}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderCategoryItem}
//                 horizontal
//             />

//             <Text style={styles.title}>Products:</Text>
//             <FlatList
//                 data={products}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderProductItem}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     categoryItem: {
//         backgroundColor: '#f0f0f0',
//         padding: 10,
//         borderRadius: 5,
//         marginRight: 10,
//     },
//     categoryText: {
//         fontSize: 16,
//     },
//     productItem: {
//         backgroundColor: '#f9f9f9',
//         padding: 10,
//         marginBottom: 10,
//         borderRadius: 5,
//     },
//     productName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     productPrice: {
//         fontSize: 16,
//         color: '#666',
//     },
// });
// export default HomeScreen;






/*colors : 
#132043
#1F4172
#F1B4BB
#FDF0F0 */

import React, { useState, useEffect } from 'react';
import { Text ,ScrollView, Image, FlatList, StyleSheet, TouchableOpacity, TextInput, View , Pressable, Button } from 'react-native';
import { collection, query, onSnapshot } from '@firebase/firestore';
// import MyButton from "../../Components/MyButton";
import MyButton from "./MyButton";


import { db,auth } from '../firebase/Config';

const HomeScreen = () => {
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    // const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch categories from Firestore
        // const  unsubscribeCategories = onSnapshot(query(collection(db, 'categories')), (snapshot) => {        
        //         const categoriesList = snapshot.docs.map((doc) => doc.data());
        //         setCategories(categoriesList);
        //     });

        // Fetch products from Firestore
        const unsubscribeProducts = onSnapshot(query(collection(db, 'products')), (snapshot) => {
                const productsList = snapshot.docs.map((doc) => doc.data());
                setProducts(productsList);
            });

        return () => {
            // unsubscribeCategories();

            <ScrollView contentContainerStyle={styles.items}>
                unsubscribeProducts();
            </ScrollView>
        };
    }, []);

    // const renderCategoryItem = ({ item }) => (
    //     <TouchableOpacity style={styles.categoryItem}>
    //         <Text style={styles.categoryText}>{item.name}</Text>
    //     </TouchableOpacity>
    // );

    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <Text style={styles.productName}>{item.productName}</Text>
            <Text style={styles.productName}>{item.category}</Text>

            {/* <Image source={item.imageUrl} style={styles.image} /> */}
            <Image source={{ uri: item.imageUrl }} style={styles.image} />


            <Text style={styles.productPrice}>Price: {item.price}</Text>
        </View>
    );

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
          setUser(currentUser);
        });
        return unsubscribe;
      }, []);

    //   const handleSearch = () => {
    //     const filteredProducts = products.filter(product => product.name.includes(searchQuery));

    // };


    const handleSearch = async () => {
        try {
            const querySnapshot = await query(
                collection(db, 'products'),
                where('name', '>=', searchQuery.toLowerCase()),
                where('name', '<=', searchQuery.toLowerCase() + '\uf8ff')
            ).get();
    
            const filteredProducts = querySnapshot.docs.map((doc) => doc.data());
            setProducts(filteredProducts);
        } catch (error) {
            console.error('Error searching products:', error);
        }
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

      <View style={{ flexDirection: 'row', alignItems: 'center'  }}>
        <TextInput
          style={{ flex: 1, borderWidth: 3 ,borderColor:"#FDF0F0", borderRadius:20, padding: 8, marginRight:5 ,marginBottom:20 ,marginTop:20}}
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

            <Text style={{ color: "#1F4172" ,fontWeight:"bold" ,fontFamily:'cursive',fontSize:40}}>
              Products:</Text>


              <ScrollView>
                <View style={{paddingBottom: 20}}>
                    {products.map((product, index) => (
                        <TouchableOpacity key={index} onPress={() => {console.log("llll")}}>
                            {renderProductItem({ item: product })}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>


            
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

  image:{
        width:100 , 
        height:100
    },

    productPrice: {
        fontSize: 16,
        color: '#F1B4BB',
    },

   

});

export default HomeScreen;