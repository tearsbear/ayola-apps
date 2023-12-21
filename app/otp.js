import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Login from "../screens/login/Login";
import logoRed from "../assets/logo/red-logo.png";
import iconOtp from "../assets/vector/otp.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Otp() {
  const params = useLocalSearchParams();
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const { username, email, password } = params;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(30);
    // Add logic to resend OTP
  };

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value === "") {
      // Handle backspace when the current input is empty
      if (index > 0) {
        newOtp[index - 1] = "";
        refs[index - 1].focus();
      }
    } else if (index < 3) {
      // Move focus to the next input
      refs[index + 1].focus();
    }

    setOtp(newOtp);
  };

  const handleOtpSubmit = async () => {
    const enteredOtp = otp.join("");
    const correctOtp = "1111";

    if (enteredOtp === correctOtp) {
      try {
        // Define the data object
        const userData = {
          username: params.username,
          password: params.password,
          email: params.email,
        };

        // Convert the data object to a JSON string
        const dataString = JSON.stringify(userData);

        // Store the data string with a key
        await AsyncStorage.setItem("userData", dataString);
        // Open the login modal
        setLoginModalVisible(true);

        // Return true to indicate successful storage
        return true;
      } catch (error) {
        // Error storing data
        Alert.alert("Ooops", "Error storing the data", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        console.log(error);
        return false;
      }
    } else if (enteredOtp.trim() === "") {
      // Empty OTP
      Alert.alert("Empty OTP", "Please enter the OTP code before submitting.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      // Incorrect OTP
      Alert.alert("Incorrect OTP", "Please enter the correct OTP.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  const refs = [];

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Image source={logoRed} style={styles.logo} resizeMode="contain" />
            <Image source={iconOtp} style={styles.icon} resizeMode="contain" />
            <Text style={styles.title}>Enter the verification code</Text>
            <Text style={styles.description}>
              We sent the verification code to
            </Text>
            <Text
              style={[styles.description, { fontFamily: "Inter-SemiBold" }]}
            >
              +628122891822
            </Text>

            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.boxInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(value) => handleInputChange(index, value)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                      handleInputChange(index, ""); // Trigger handleInputChange with an empty value for backspace
                    }
                  }}
                  ref={(input) => (refs[index] = input)}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.roundedButton}
              onPress={handleOtpSubmit}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>

            <View
              style={{ position: "absolute", bottom: 0, paddingBottom: 50 }}
            >
              {timer > 0 ? (
                <>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#666666",
                      fontFamily: "Inter-Regular",
                      fontSize: 14,
                    }}
                  >
                    ({`00:${timer < 10 ? "0" : ""}${timer}`})
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#666666",
                      fontFamily: "Inter-SemiBold",
                      fontSize: 14,
                    }}
                  >
                    Wait 30s to resend the code
                  </Text>
                </>
              ) : (
                <>
                  <Text style={{ color: "#666666", fontSize: 14 }}>
                    Didn't receive the code?
                  </Text>
                  <TouchableOpacity onPress={handleResend}>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#FF071F",
                        fontSize: 15,
                        fontFamily: "Inter-SemiBold",
                      }}
                    >
                      Send again
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {isLoginModalVisible && <Login isRegister={true} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50, // Handle Android's StatusBar height
    position: "relative",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    aspectRatio: 1, // You can adjust this ratio as needed
  },
  icon: {
    marginTop: -10,
    width: 180,
    height: 180,
    aspectRatio: 2, // You can adjust this ratio as needed
  },
  title: {
    fontSize: 19,
    marginTop: 20,
    color: "#DE2638",
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  description: {
    marginTop: 3,
    textAlign: "center",
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: "#666666",
  },
  boxInput: {
    backgroundColor: "#F2F3F5",
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginRight: 10,
    textAlign: "center",
    fontSize: 20,
    color: "#FF071F",
  },
  roundedButton: {
    backgroundColor: "#DE2638",
    borderRadius: 100, // Adjust the value for the desired roundness
    paddingVertical: 12,
    paddingHorizontal: 100,
    marginTop: 50, // Adjust the spacing as needed
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
  },
});

export default Otp;
