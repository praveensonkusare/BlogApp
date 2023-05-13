import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  input: {
    width: "80%",
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});
export default styles;
