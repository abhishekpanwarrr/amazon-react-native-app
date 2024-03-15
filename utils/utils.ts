import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const fetchAddresses = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/user/address/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("error---", error);
  }
};

export const fetchUser = async () => {
  const token = await AsyncStorage.getItem("id");
  return token
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data
  } catch (error) {
    console.log("error message", error);
  }
};

export const logout = async () => {
  await clearAuthToken();
};
const clearAuthToken = async () => {
  await AsyncStorage.removeItem("authToken");
};