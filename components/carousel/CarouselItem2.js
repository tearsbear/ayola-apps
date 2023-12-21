import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import groupActChip from "../../assets/icons/group-act-chip.png";
import cardSchedule from "../../assets/vector/card-schedule.png";

export default function CarouselItem2() {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginTop: 100,
      }}
    >
      <Text
        style={[
          styles.tagline1,
          {
            textAlign: "left",
            fontSize: 44,
          },
        ]}
      >
        Let us handle{"\n"}the admin,{"\n"}while you do more of what you love.
      </Text>
      <Image
        source={groupActChip}
        style={styles.groupActChip}
        resizeMode="contain"
      />
      <Text style={[styles.description, { textAlign: "left", marginTop: -40 }]}>
        The all-in-one platform for booking,{"\n"}payments, and more.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  groupActChip: {
    width: 220,
    height: 220,
    marginTop: -60,
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
