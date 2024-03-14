import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation() as any;
  const isEmpty = email === "" || password === "";
  const handleLogin = async () => {
    if (isEmpty) {
      return Alert.alert("Enter all fields");
    }
    try {
      setLoading(true);
      const user = {
        email: email.toLowerCase(),
        password: password,
      };
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user
      );
      if (res.data.accessToken) {
        setLoading(false);
        Alert.alert("Logged in successfully");
        AsyncStorage.setItem("authToken", res.data.accessToken);
        AsyncStorage.setItem("id",res.data.user._id)
        return navigation.replace("Main");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error registering user:", error.message);
    }
  };
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Main");
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    checkLoginStatus();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
      }}
    >
      <View>
        <Image
          style={{
            width: 150,
            height: 100,
          }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041e42",
            }}
          >
            Login to Amazon
          </Text>
        </View>
        <View
          style={{
            marginTop: 60,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#d0d0d0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 18 : 16,
              }}
              placeholder="Enter your email"
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#d0d0d0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name="lock1"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              style={{ color: "gray", marginVertical: 10, width: 300 }}
              placeholder="Enter your password"
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Keep me logged in</Text>
          <Text
            style={{
              color: "#007fff",
              fontWeight: "500",
            }}
          >
            Forgot password?
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <Pressable
            onPress={() => handleLogin()}
            style={{
              width: 200,
              backgroundColor: "#febe10",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Login
              </Text>
            )}
          </Pressable>
          <Pressable
            style={{ marginTop: 15 }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Don't have an account? Signup
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
