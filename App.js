import { Provider } from "react-redux";
import StackNavigator from "./navigation/StackNavigator";
import store from "./redux/store";
import { ModalPortal } from "react-native-modals";
import { UserContext } from "./context/UserContext";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
export default function App() {
  const [isConnected, setConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnected(state.isConnected);
      if (!state.isConnected) {
        showAlert();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const showAlert = () => {
    Alert.alert(
      "Internet Connection",
      "You are offline. Some features may not be available."
    );
  };
  return (
    <Provider store={store}>
      <UserContext>
        <StackNavigator />
        <ModalPortal />
        <View style={{ padding: 30 }}>
          {isConnected ? <Text>Online</Text> : <Text>Offline</Text>}
        </View>
      </UserContext>
    </Provider>
  );
}
