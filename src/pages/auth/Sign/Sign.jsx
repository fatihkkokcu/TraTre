import React, { useState } from "react";
import { View, Text } from "react-native";
import { Formik } from "formik";
import auth from "@react-native-firebase/auth";
import { showMessage } from "react-native-flash-message";
import styles from "./Sign_styles";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

const initialFormValues = {
  usermail: "",
  password: "",
  repassword: "",
}

const Sign = ({navigation}) => {
  const [loading, setLoading] = useState(false)
  function handleLogin() {
    navigation.goBack()
  }
  
  async function handleFormSubmit(formValues) {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: "Şifreler uyuşmuyor",
        type: "danger",
      })
      return
    }
    try {
      setLoading(true)
      await auth().createUserWithEmailAndPassword(formValues.usermail, formValues.password)
      showMessage({
        message: "Kullanıcı oluşturuldu",
        type: "success",
      });
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TraTre</Text>
      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
        {({values, handleChange, handleSubmit}) => (
        <>
          <Input onType={handleChange("usermail")} value={values.usermail} placeholder="e-postanızı giriniz..."/>
          <Input onType={handleChange("password")} value={values.password} placeholder="Şifrenizi giriniz..." isSecure/>
          <Input onType={handleChange("repassword")} value={values.repassword} placeholder="Şifrenizi tekrar giriniz..." isSecure/>
          <Button text="Kayıt Ol" onPress={handleSubmit} loading={loading}/>
        </>
        )}
      </Formik>
      <Button text="Geri" theme="secondary" onPress={handleLogin}/>
    </View>
  )
}

export default Sign;