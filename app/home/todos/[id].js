// import { Stack, router, useLocalSearchParams } from "expo-router";
// import { View } from "react-native";
// import EditTodo from "../../../Components/Todos/EditTodo";
// import { getTodo } from "../../../firebase/todos";
// import { useEffect, useState } from "react";

// export default function Page() {
//   const { id, uid } = useLocalSearchParams();
//   const [todo, setTodo] = useState({ id, uid });

//   const getTodoFromFirebase = async (uid, id) => {
//     const t = await getTodo(uid, id);
//     if(!t) router.back();
//     setTodo(t);
//     console.log("getting todo with id ", id, t?.name, t?.id);
//   };
//   useEffect(() => {
//     getTodoFromFirebase(uid, id);
//   }, []);

//   return (
//     todo && 
//     (<View>
//       <Stack.Screen
//         options={{
//           title: "Edit Todo",
//         }}
//       />
//       <EditTodo onSave={()=>{}} todo={todo} />
//     </View>)
//   );
// }
import React, { useEffect, useState } from 'react';
import { View,
    ActivityIndicator,
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Alert,Dimensions } from 'react-native';
import { doc, getDoc,setDoc } from 'firebase/firestore';
import { db ,auth} from '../../../firebase/Config';
import { useRoute } from '@react-navigation/native';
export default function Product() {
  const route = useRoute();
  const { productId } = route.params; // Get productId from route params

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const productData = docSnapshot.data();
          console.log("Product Image URL:", productData.imageUrl); // Log the imageURL
          setProduct(productData);
        } else {
          console.log("No such document!");
          setProduct({});
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct({});
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (quantity > product.stockQuantity) {
      Alert.alert("Error", "Quantity exceeds stock quantity", [{ text: "OK" }]);
      return;
    }

    const currentUser = auth.currentUser; // Get the authenticated user
    if (!currentUser) {
      console.error("User not authenticated.");
      return;
    }

    const cartRef = doc(db, "Cart", currentUser.uid); // Use the authenticated user's ID
    const cartDoc = await getDoc(cartRef);

    let cartItems = [];
    if (cartDoc.exists()) {
      cartItems = cartDoc.data().cartItems;
    }

    const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({ productId, quantity });
    }

    await setDoc(cartRef, { cartItems });
    Alert.alert("Success", "Product added to cart", [{ text: "OK" }]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={{ uri: product.imageURL }}
          style={styles.productImage}
          onError={() => console.log("Image loading error")}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>Price: {product.price} EGP</Text>
          <Text style={styles.productDescription}>Description: {product.description}</Text>
          <View style={styles.addToCartContainer}>
            <TouchableOpacity
              style={styles.addToCartBtn}
              onPress={handleAddToCart}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            <View style={styles.QuantityChangeView}>
              <Text style={styles.Text}>Quantity</Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  disabled={quantity <= 1}
                  onPress={() => setQuantity(quantity - 1)}
                  style={styles.quantityBtn}
                >
                  <Text style={styles.quantityBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.currentQuantity}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => setQuantity(quantity + 1)}
                  style={styles.quantityBtn}
                >
                  <Text style={styles.quantityBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  productDetails: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  addToCartContainer: {
    alignItems: 'center',
  },
  addToCartBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  QuantityChangeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Text: {
    fontSize: 18,
    marginRight: 10,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityBtn: {
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quantityBtnText: {
    fontSize: 18,
  },
  currentQuantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});