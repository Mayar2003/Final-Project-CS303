import { useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import MyButton from "./MyButton";
// import LinearGradient from 'react-native-linear-gradient';

export default function Item({
  isDone,
  text,
  onPress,
  onDelete,
  onDone,
}) 
{
  return (
    <View style={styles.item} >
     

    <Pressable
      onPress={onPress}
      style={({ pressed  }) => [
        // { opacity: pressed ? 0.2 : 1 },
        styles.item,
      ]}
    >
      <Pressable onPress={()=>{onDone();}}>
        {({ pressed }) => (
          <View
            style={
              // {styles.itemContainer}
              [
              // styles.checkbox,
              // pressed && styles.pressed,
            ]
          }
          >
            {isDone && (
              <Text style={styles.x}>
                {/* {pressed?"o":"x"}x */}
              </Text>
            )}
          </View>
        )
        }

      </Pressable>
      <Text  style={styles.title }>{text}</Text>
      {/* <Text style={styles.look}>take a look ! </Text> */}
      <MyButton color={"#7469B6"} /*onPress={onDelete}*/><Text style={styles.look}>Take a look !</Text></MyButton>
    </Pressable>
     </View>
  );
}

const styles = StyleSheet.create({
//   checkbox: {
//     height: 24,
//     width: 24,
//     backgroundColor: "#0ff",
//     borderWidth: 2,
//     borderRadius: 12,
//     borderColor: "white",
//   },


  // checked: {
  //   backgroundColor: "blue",
  //   borderColor: "black",
  // },


  pressed: {
    margin: 2,
    height: 20,
    width: 20,
    // backgroundColor: "pink",
  },


  // x: {
  //   fontSize: 24,
  //   margin: -12,
  //   paddingLeft: 14,
  //   color: "white",
  // },


  selected: {
    color: "black",
  },

  look:{
    // fontFamily
    fontSize:15,
    color:'#FFE6E6',
    textAlign:'right',
    fontFamily:'cursive'
    // marginRight:0,
  },

  //todos not
  item: {
    // backgroundColor: "black",
   // backgroundi: linear-gradient(to left top, #f9c9c9, #efb5c2, #e0a3c1, #cb94c3, #ad88c6);
   // padding: 5,
    // marginVertical: 5,
    // marginHorizontal: 5,
    // flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    flexDirection: "column",
    justifyContent:'center',
    
    
  },

  title: {
    // flex: 1,
    color:'pink',
    // marginLeft:40,
    marginVertical: 5,
    marginHorizontal: 5,
    fontFamily:'cursive',
    borderColor:'#E1AFD1',
    borderRadius:10,
    borderStyle:'solid',
    borderWidth:3,
    fontSize: 32,
    marginRight:5,
    textAlign: "center",
    alignContent:"center",
    flexDirection: "row",
    justifyContent:'center',
    backgroundColor :"#fff9f9",
    width:1300,
    height:150,
    shadowColor: '#7469B6',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  image: {
    width: 50,
    height: 50,
  },
  // itemContainer:{  backgroundColor: "#f9c2ff",
  // padding: 0,
  // marginVertical: 5,
  // marginHorizontal: 5,
  // flexDirection: "column", // This will make each item in the FlatList use column direction
  // justifyContent: "space-between",}
});
