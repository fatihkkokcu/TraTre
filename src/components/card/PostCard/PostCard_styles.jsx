import { Dimensions, StyleSheet } from "react-native";

import colors from "../../../styles/colors";

export default StyleSheet.create({
  container: {
    backgroundColor: "#B1E3DF",
    borderRadius: 8,
    marginTop: 6,
    marginHorizontal: 2,
    paddingTop: 4,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  text: {
    color: colors.darkgreen,
    fontSize: 24,
    textAlign: "left",
    paddingLeft: 8,
    paddingBottom: 6,
  },
  image: {
    alignSelf: "center",
    backgroundColor: "#E5F3F2",
    width: Dimensions.get("window").width * 0.95,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    resizeMode: "contain",
  },
  video: {
    minHeight: 200,
    width: Dimensions.get("window").width * 0.95,
    alignSelf: "center",
    backgroundColor: "#E5F3F2",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  counterText: {
    color: colors.darkgreen,
    fontSize: 30,
  }
})