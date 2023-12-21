import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import groupActivities from "../../assets/icons/group-act.png";
import groupActChip from "../../assets/icons/group-act-chip.png";
import cardSchedule from "../../assets/vector/card-schedule.png";

export default function CarouselItem1() {
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 100 }}>
      <Image
        source={groupActivities}
        style={styles.groupAct}
        resizeMode="contain"
      />
      <Text style={styles.tagline1}>
        Focus on the {"\n"} experience, {"\n"} we'll take care {"\n"} of the
        rest.
      </Text>
      <Text style={styles.description}>
        The all-in-one platform for booking, {"\n"} payments, and more.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  groupAct: {
    width: 260,
    height: 260,
    marginTop: -80,
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
