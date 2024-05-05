import { Text, View } from "react-native";
import { Stack, router } from "expo-router";
import TodosList from "../../Components/Todos/TodoList";
import MyButton from "../../Components/MyButton";
import { logout } from "../../firebase/auth";

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen style={{ flexDirection: "column"}}
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "All what you need !",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: "#7469B6" , height:100  },
          headerTintColor: "#FFE6E6",
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
              style={{marginRight:5 , backgroundColor: '#FFE6E6'}}
              {...props}
              onPress={async () => {
                await logout();
                router.navigate("/account/login");
              }}
            >
              <Text style={{ color: "#AD88C6"  }}>LogOut</Text>
            </MyButton>
          ),
        }}
      />
      <TodosList />
    </View>
  );
}
