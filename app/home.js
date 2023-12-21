import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import logoWhite from "../assets/logo/white-logo.png";
import Carousel from "react-native-reanimated-carousel";
import Card1 from "../assets/vector/card1.png";
import Card2 from "../assets/vector/card2.png";
import ChipAct from "../assets/vector/chip-act.png";
import CardAct1 from "../assets/vector/card-act1.png";
import CardAct2 from "../assets/vector/card-act2.png";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const home = () => {
  const width = Dimensions.get("window").width;
  const router = useRouter();
  const [username, setUsername] = useState("");
  const carouselImage = [
    {
      content: (
        <View style={{ paddingHorizontal: 20 }}>
          <Image source={Card1} style={styles.card} resizeMode="contain" />
        </View>
      ),
    },
    {
      content: (
        <View style={{ paddingHorizontal: 20 }}>
          <Image source={Card2} style={styles.card} resizeMode="contain" />
        </View>
      ),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            // Perform logout actions here
            // For example, clear user session, navigate to the home screen, etc.
            console.log("User logged out");
            router.replace("/");
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    // Define an async function to load the data
    const loadData = async () => {
      // Get the data string with the key
      const dataString = await AsyncStorage.getItem("userData");

      // Check if the data string exists
      if (dataString) {
        // Parse the data string to an object
        const data = JSON.parse(dataString);

        // Set the state variables with the data values
        setUsername(data.username);
      }
    };

    // Call the load data function
    loadData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bgHeader}>
        <SafeAreaView>
          <View style={styles.header}>
            <Image
              source={logoWhite}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity
              onPress={handleLogout}
              style={{ marginLeft: 15, marginTop: 0 }}
            >
              <Svg
                xmlns="http://www.w3.org/2000/Svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-box-arrow-in-right"
                viewBox="0 0 16 16"
              >
                <Path
                  fill={"#fff"}
                  fill-rule="evenodd"
                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                />
                <Path
                  fill={"#fff"}
                  fill-rule="evenodd"
                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.headerText}>
              <View>
                <Text style={styles.lightText}>Wednesday</Text>
                <Text style={styles.boldText}>22 December 2023</Text>
              </View>
              <View style={{ flex: 1 }}></View>
              <View style={{ marginTop: -5 }}>
                <Text style={[styles.lightText, { textAlign: "right" }]}>
                  Welcome Back 👋🏻{" "}
                </Text>
                <Text
                  style={[
                    styles.boldText,
                    { fontSize: 18, textAlign: "right" },
                  ]}
                >
                  {username}
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.bgReserve}>
        <Text style={styles.textReserve}>Today's Reservation</Text>
        <Carousel
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 90,
            parallaxAdjacentItemScale: 1,
          }}
          loop={false}
          width={width}
          autoPlay={false}
          data={carouselImage}
          scrollAnimationDuration={200}
          pagingEnabled
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
              }}
            >
              {item.content}
            </View>
          )}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>
          Your activities {"\n"}starts here
        </Text>
        <Text style={styles.contentDesc}>
          book new classes, appointments, sports facilities, etc.
        </Text>
        <Image source={ChipAct} style={styles.chips} resizeMode="contain" />
        <View
          style={{
            marginTop: -190,
          }}
        >
          <Image
            source={CardAct1}
            style={styles.cardAct}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            marginTop: -360,
          }}
        >
          <Image
            source={CardAct2}
            style={styles.cardAct}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  bgHeader: {
    height: 220,
    backgroundColor: "#DE2638",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  logo: {
    marginTop: -0,
    marginHorizontal: -10,
    width: 100,
    height: 100,
    aspectRatio: 1, // You can adjust this ratio as needed
  },
  headerText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  lightText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  boldText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  bgReserve: {
    height: 175,
    backgroundColor: "#CA2031",
    paddingVertical: 20,
  },
  textReserve: {
    color: "#fff",
    paddingHorizontal: 20,
    fontFamily: "Poppins-Medium",
  },
  card: {
    marginTop: -50,
    width: 300,
  },
  content: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  contentTitle: {
    color: "#DE2638",
    fontSize: 24,
    textTransform: "uppercase",
    fontFamily: "Cairo-Black",
    lineHeight: 30,
  },
  contentDesc: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  chips: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  cardAct: {
    width: "100%",
  },
});

export default home;
