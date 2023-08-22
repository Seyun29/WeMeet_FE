import { StyleSheet, Platform, StatusBar } from "react-native";

const commonStyles = StyleSheet.create({
  safeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export const mainColor = "#191A21";
export const subColorBlack = "#2A2B34"; //lighter than mainColor
export const subColorBlack2 = "#141519"; //darker than mainColor
export const subColorPink = "#FC8368";
export const subColorBlue = "#5B66F6";
export default commonStyles;
