import { Text, View ,Image } from "react-native";
import { Stack, router } from "expo-router";
import TodosList from "../../Components/Todos/TodoList";
import MyButton from "../../Components/MyButton";
import { logout } from "../../firebase/auth";



export default function Page() {
  return (
    <View style={{ flexDirection:"row", alignItems: "center", justifyContent: "center" }}>
     
 {/* <Image style={{width:50 , height:50}}  
        source={require('../../assets/Screenshot__18_-removebg-preview.png')} // Static image
  
      /> */}


      <Stack.Screen style={{ flexDirection: "column"}}
        options={{   
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "All what you need !",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: "#132043" , height:100  },
          headerTintColor: "#FDF0F0",
          headerTitleStyle: {
            fontSize: 40 ,
            marginLeft:450,
            fontFamily:'cursive',
            fontWeight: "bold",
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          // headerTitle: props => <LogoTitle {...props} />,

          headerRight: (props) => (
            
            <MyButton
              style={{marginRight:5 , backgroundColor: '#F1B4BB',borderRadius:30}}
              {...props}
              onPress={async () => {
                await logout();
                router.navigate("/account/login");
              }}
            >
              <Text style={{ color: "#1F4172" ,fontWeight:"bold" ,fontFamily:'cursive'}}>LogOut</Text>
            </MyButton>
          ),
        }}
      />
      <TodosList />
    </View>
  );
}
