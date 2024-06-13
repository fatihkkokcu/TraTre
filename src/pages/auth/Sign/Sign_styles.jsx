import { StyleSheet } from "react-native";

import colors from "../../../styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  body_container: {
    flex: 1,
  },
  header: {
    color: colors.darkgreen,
    margin: 5,
    marginBottom: 60,
    fontSize: 80,
    textAlign: "center",
  },
})