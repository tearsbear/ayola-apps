import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import iconAyola from "../../assets/icons/icon.png";
import { EyeIcon, EyeOffIcon, CheckIcon } from "lucide-react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@gluestack-ui/themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";

// Define the Register component
const Register = ({ getButtonBackgroundColor }) => {
  const router = useRouter();
  // Use state to control the modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Declare a state variable to track the checkbox status
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  // State variables for the input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // State variables for the validations
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  // Validate the username
  const validateUsername = () => {
    // Check if the username is empty
    if (username === "") {
      setUsernameValid(false);
      return false;
    } else {
      setUsernameValid(true);
      return true;
    }
  };

  // Validate the password
  const validatePassword = () => {
    // Define the password format regex
    const passwordFormat =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,}$/;

    // Check if the password matches the format
    if (passwordFormat.test(password)) {
      setPasswordValid(true);
      return true;
    } else {
      setPasswordValid(false);
      return false;
    }
  };

  // Validate the email
  const validateEmail = () => {
    // Define the email format regex
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the format
    if (emailFormat.test(email)) {
      setEmailValid(true);
      return true;
    } else {
      setEmailValid(false);
      return false;
    }
  };

  // Handle the submission of the data
  const handleSubmit = async () => {
    // Validate the input fields
    const usernameValid = validateUsername();
    const passwordValid = validatePassword();
    const emailValid = validateEmail();

    // If all fields are valid, store the data in the async storage and navigate to the next page
    if (usernameValid && passwordValid && emailValid) {
      // Navigate to the next page
      router.replace({
        pathname: "/otp",
        params: {
          username: username,
          password: password,
          email: email,
        },
      });
    }
  };

  // Define a function to toggle the state variable
  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  // Define the function to handle the modal close
  const handleClose = () => {
    setModalVisible(false);
  };

  // Define the function to render the register page
  const renderRegisterPage = () => {
    return (
      <SafeAreaView style={styles.containerModal}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleClose}
            style={{ flex: 1, marginLeft: 15 }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/Svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-x"
              viewBox="0 0 16 16"
            >
              <Path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
                fill="#1E1E1E"
              />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.title}>Register</Text>
          <View style={{ flex: 1 }} />
        </View>
        <KeyboardAwareScrollView style={styles.modalView}>
          <Image source={iconAyola} style={styles.icon} resizeMode="contain" />
          <Text style={styles.modalTitle}>First Step</Text>
          <Text style={styles.modalDescription}>
            please complete your account information
          </Text>

          <View style={{ marginTop: 30 }}>
            <Text style={styles.label}>Username</Text>
            <FormControl style={{ marginTop: 10 }} isInvalid={!usernameValid}>
              <Input style={styles.input}>
                <InputField
                  style={{ fontFamily: "Poppins-Medium", marginLeft: 3 }}
                  placeholder="type your username here"
                  value={username}
                  onChangeText={setUsername}
                  onSubmitEditing={validateUsername}
                />
              </Input>
              <FormControlError>
                <FormControlErrorText>
                  Username is required
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Password</Text>
            <FormControl style={{ marginTop: 10 }} isInvalid={!passwordValid}>
              <Input style={styles.input}>
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="type your password here"
                  style={{ fontFamily: "Poppins-Medium", marginLeft: 3 }}
                  value={password}
                  onChangeText={setPassword}
                  onSubmitEditing={validatePassword}
                />
                <InputSlot pr="$3" onPress={handleState}>
                  <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                    color="#A3A3A3"
                    size={15}
                    style={{ marginRight: 5 }}
                  />
                </InputSlot>
              </Input>
              <FormControlError>
                <FormControlErrorText>
                  Password must contain at least 8 characters, a lowercase
                  letter, an uppercase letter, and a symbol
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Email</Text>
            <FormControl style={{ marginTop: 10 }} isInvalid={!emailValid}>
              <Input style={styles.input}>
                <InputField
                  style={{ fontFamily: "Poppins-Medium", marginLeft: 3 }}
                  placeholder="type your email here"
                  value={email}
                  onChangeText={setEmail}
                  onSubmitEditing={validateEmail}
                />
              </Input>
              <FormControlError>
                <FormControlErrorText>
                  Email must be a valid email address
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </View>

          <View style={{ marginTop: 10 }}>
            <Checkbox
              size="sm"
              isInvalid={false}
              isDisabled={false}
              onChange={handleCheckboxChange}
            >
              <CheckboxIndicator mr="$2">
                <CheckboxIcon as={CheckIcon} size="10" />
              </CheckboxIndicator>
              <CheckboxLabel style={{ marginTop: 20 }}>
                I accept the Terms & Condition when creating{"\n"}my account.
              </CheckboxLabel>
            </Checkbox>
          </View>

          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={[
                styles.roundedButton,
                { backgroundColor: isCheckboxChecked ? "#DE2638" : "#CD9298" },
              ]}
              onPress={handleSubmit}
              disabled={!isCheckboxChecked}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.roundedButton,
          // Use the getButtonBackgroundColor function from the prop
          { backgroundColor: getButtonBackgroundColor() },
        ]}
        onPress={() => {
          // Set the modal visible to true
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Register with Email</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        {renderRegisterPage()}
      </Modal>
    </View>
  );
};

// Define the styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  roundedButton: {
    backgroundColor: "#DE2638",
    borderRadius: 100, // Adjust the value for the desired roundness
    paddingVertical: 15,
    paddingHorizontal: 70,
    marginTop: 20, // Adjust the spacing as needed
  },
  containerModal: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  title: {
    color: "#1E1E1E",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
  },
  modalView: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  icon: {
    width: 40,
    height: 40,
    aspectRatio: 1, // You can adjust this ratio as needed
  },
  modalTitle: {
    marginTop: 10,
    fontFamily: "Poppins-Medium",
    fontSize: 19,
    color: "#DE2638",
  },
  modalDescription: {
    marginTop: 3,
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#666666",
  },
  label: {
    fontFamily: "Inter-Medium",
    color: "#979797",
    fontSize: 13,
  },
  input: {
    borderRadius: 10,
    height: 44,
    borderWidth: 1,
    borderColor: "#E9E9E9",
  },
});

export default Register;
