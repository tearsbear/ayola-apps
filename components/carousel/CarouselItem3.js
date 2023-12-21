import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import cardSchedule from "../../assets/vector/card-schedule.png";

export default function CarouselItem3() {
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 100 }}>
      <Image
        source={cardSchedule}
        style={styles.cardSchedule}
        resizeMode="contain"
      />
      <Text style={styles.tagline1}>Scheduling</Text>
      <Text style={styles.description}>
        We provide automated bookings for{"\n"}various ticket types from hourly
        to daily{"\n"} time slots for classes, appointments,{"\n"}
        sports facilities to anything requiring a{"\n"} reservation system.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardSchedule: {
    width: 300,
    height: 300,
    marginTop: -40,
  },
  tagline1: {
    fontFamily: "Cairo-Black",
    fontSize: 44,
    marginTop: -10,
    textAlign: "center",
    color: "#fff",
    lineHeight: 55,
  },
  description: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 15,
  },
});
