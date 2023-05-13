import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import styles from "./styles";
//import firebase from "firebase";
//import

const LoginPage = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOTP] = useState("");

  const handleMobileChange = (text) => {
    setMobile(text);
  };

  const handleOTPChange = (text) => {
    setOTP(text);
  };

  const handleLogin = () => {
    // TODO: handle login with mobile and OTP
    const appVerifier = firebase.auth.RecaptchaVerifier("recaptcha-container");
    firebase
      .auth()
      .signInWithPhoneNumber(`+91${mobile}`, appVerifier)
      .then((confirmationResult) => {
        const verificationId = confirmationResult.verificationId;
        const credential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          otp
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        onChangeText={handleMobileChange}
        value={mobile}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="OTP"
        onChangeText={handleOTPChange}
        value={otp}
        keyboardType="numeric"
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.error}>Invalid mobile or OTP</Text>
    </View>
  );
};

export default LoginPage;
