import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    marginTop: 10,
    marginHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  input_container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: 300,
    resizeMode: "contain",
  },
  video: {
    height: 300,
  },
  buttons: {
    flexDirection: "row", 
    justifyContent: "space-between",
  },
})