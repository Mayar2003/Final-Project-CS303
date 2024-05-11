
  
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MyButton from "../../Components/MyButton";
import { logout } from "../../firebase/auth";
import Itemcheckbox from "../../Components/Itemcheckbox";

export default function Layout() {
  const [selectedTab, setSelectedTab] = useState('home');
  const [showCartPage, setShowCartPage] = useState(false);
  const router = useRouter();

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    setShowCartPage(false); // Reset cart page visibility when changing tabs
  };

  const handleAddToCart = () => {
    setShowCartPage(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContent}>
        {selectedTab === 'home' && (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontSize: 40,
                  marginLeft: 450,
                  fontFamily: 'cursive',
                  fontWeight: "bold",
                }}
              >
                All what you need !
              </Text>
              <TouchableOpacity
                style={{ marginRight: 5, backgroundColor: '#FFE6E6' }}
                onPress={async () => {
                  await logout();
                  router.navigate("/account/login");
                }}
              >
                <Text style={{ color: "#AD88C6" }}>LogOut</Text>
              </TouchableOpacity>
            </View>
            <Itemcheckbox />
          </View>
        )}
        {selectedTab === 'profile' && <Text>Profile Screen Content</Text>}
        {showCartPage && <Text>Cart Screen Content</Text>}
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'home' && styles.selectedTab]}
          onPress={() => handleTabPress('home')}
        >
          <Ionicons name="home" size={24} color={selectedTab === 'home' ? 'blue' : 'black'} />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'profile' && styles.selectedTab]}
          onPress={() => handleTabPress('profile')}
        >
          <Ionicons name="person" size={24} color={selectedTab === 'profile' ? 'blue' : 'black'} />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart" size={24} color={showCartPage ? 'blue' : 'black'} />
          <Text style={styles.tabText}>Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 12,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
