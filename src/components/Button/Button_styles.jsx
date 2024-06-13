import { StyleSheet } from "react-native";

import colors from "../../styles/colors";

const base_style = StyleSheet.create({
  container: {
    padding: 8,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  button_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
  }
})

export default {
  primary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: colors.darkgreen,
    },
    title: {
      ...base_style.title,
      color: "white",
    },
  }),

  secondary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: colors.darkgreen,
    },
    title: {
      ...base_style.title,
      color: colors.darkgreen,
    },
  }),
}