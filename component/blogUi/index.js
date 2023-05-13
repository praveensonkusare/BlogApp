import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
//import Share from "react-native-share";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";

const BlogPostScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const shareBlogPost = async () => {
    try {
      const titleFromStorage = await AsyncStorage.getItem("@title");
      const contentFromStorage = await AsyncStorage.getItem("@content");
      const message = `${titleFromStorage}\n\n${contentFromStorage}`;
      await Share.open({
        message: message,
      });
    } catch (error) {
      console.log("Error sharing blog post: ", error);
    }
  };

  const saveBlogPost = async () => {
    try {
      await AsyncStorage.setItem("@title", title);
      await AsyncStorage.setItem("@content", content);
      alert("Blog post saved successfully!");
    } catch (error) {
      console.log("Error saving blog post: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon
          name="edit"
          type="font-awesome"
          color="#517fa4"
          size={24}
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Title"
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon
          name="pencil"
          type="font-awesome"
          color="#517fa4"
          size={24}
          style={styles.inputIcon}
        />
        <TextInput
          placeholder="Content"
          style={styles.input}
          value={content}
          onChangeText={(text) => setContent(text)}
          multiline={true}
        />
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => saveBlogPost()}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shareButton}
        onPress={() => shareBlogPost()}
      >
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};
export default BlogPostScreen;
