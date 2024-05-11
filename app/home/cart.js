import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../../firebase/Config";
import { doc, setDoc, getDoc,updateDoc, arrayUnion, arrayRemove, deleteDoc, deleteField } from "firebase/firestore";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const userId = "8kD0OcMERHSuX4i93QgnkKSmtCG2";
//     const fetchCartItems = async () => {
//       try {
//         const querySnapshot = await db
//           .collection("cartItems")
//           .doc(userId)
//           .get();
//         const items = [];
//         querySnapshot.forEach((doc) => {
//           items.push({
//             id: userId,
//             //doc.id,
//             ...doc.data(),
//           });
//         });
//         setCartItems(items);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//       }
//     };
//     fetchCartItems();
//   }, ["8kD0OcMERHSuX4i93QgnkKSmtCG2"]);
  //[userId]);

    useEffect(() => {
        fetchCartItems();
    }, []);

  const fetchCartItems = async () => {
    try {
      // const userId = "8kD0OcMERHSuX4i93QgnkKSmtCG2";
      const docRef = doc(db, "cartItems", auth.currentUser.uid );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setCartItems(userData.items || []); //items is stored as an array in userData
      } else {
        console.log("No cart items found!");
      }
    } catch (error) {
      console.error("Error fetching cart items: ", error);
    }
  };

  const handleAddToCart = async (productId, productName) => {
    try {
      //const userId = "8kD0OcMERHSuX4i93QgnkKSmtCG2";
      const docRef = doc(db, "cartItems",auth.currentUser.uid);
      await setDoc(docRef, { items: arrayUnion({ productId, productName }) }, { merge: true });
      console.log("Item added to cart!");
      fetchCartItems(); // Refresh cart items after adding
    } catch (error) {
      console.error("Error adding item to cart: ", error);
    }
  };

  //handleAddToCart("1","cake");

  const handleRemoveFromCart = async (productId) => {
    try {
     // const userId = "8kD0OcMERHSuX4i93QgnkKSmtCG2";
      const docRef = doc(db, "cartItems", auth.currentUser.uid);
      await updateDoc(docRef, { items: arrayRemove({ productId }) });
      console.log("Item removed from cart!");
      fetchCartItems(); // Refresh cart items after removing
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  };

 // handleRemoveFromCart("2");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        cartItems.map((items) => (
          <View key={items.productId} style={styles.cartItem}>
            <Text>{items.productName}</Text>
            <TouchableOpacity onPress={() => handleRemoveFromCart(items.productId)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
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
    fontWeight: "700",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  removeButton: {
    color: "red",
  },
});

export default CartPage;