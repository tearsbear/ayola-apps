import React, { useState, useCallback } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import logoWhite from "../assets/logo/white-logo.png";
import Carousel from "react-native-reanimated-carousel";
import CarouselItem1 from "../components/carousel/CarouselItem1";
import CarouselItem2 from "../components/carousel/CarouselItem2";
import CarouselItem3 from "../components/carousel/CarouselItem3";
import Register from "../screens/register/Register";
import Login from "../screens/login/Login";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

SplashScreen.preventAutoHideAsync();

function Index() {
  const router = useRouter();
  const width = Dimensions.get("window").width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fontsLoaded] = useFonts({
    "Cairo-Black": require("../assets/fonts/Cairo-Black.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const carouselData = [
    {
      content: <CarouselItem1 />,
    },
    {
      content: <CarouselItem2 />,
    },
    {
      content: <CarouselItem3 />,
    },
  ];

  const renderPaginationDots = () => {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 250,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === currentIndex ? "#fff" : "gray",
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>
    );
  };

  const getBackgroundColor = () => {
    // Change the background color based on the currentIndex
    return currentIndex === 1 ? "#DE2638" : "#1E1E1E";
  };

  const getButtonBackgroundColor = () => {
    // Change the background color based on the currentIndex
    return currentIndex === 1 ? "#1E1E1E" : "#DE2638";
  };

  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="light" />
      <View
        style={[styles.container, { backgroundColor: getBackgroundColor() }]}
        onLayout={onLayoutRootView}
      >
        <View style={styles.innerContainer}>
          <Image source={logoWhite} style={styles.logo} resizeMode="contain" />
        </View>
        <Carousel
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 50,
            parallaxAdjacentItemScale: 0.8,
          }}
          loop={false}
          width={width}
          autoPlay={false}
          data={carouselData}
          scrollAnimationDuration={200}
          pagingEnabled
          onSnapToItem={(index) => setCurrentIndex(index)}
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
        {renderPaginationDots()}
        <View style={styles.bottomContainer}>
          <Register
            // Pass the getButtonBackgroundColor function as a prop
            getButtonBackgroundColor={getButtonBackgroundColor}
          />
          <Login />
        </View>
      </View>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50, // Handle Android's StatusBar height
    position: "relative",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
    aspectRatio: 1, // You can adjust this ratio as needed
  },
});

export default Index;
