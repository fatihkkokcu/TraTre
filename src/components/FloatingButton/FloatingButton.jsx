import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./FloatingButton_styles";

const FloatingButton = ({onPress, icon}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={icon} color="white" size={30}/>
    </TouchableOpacity>
  )
}

export default FloatingButton;