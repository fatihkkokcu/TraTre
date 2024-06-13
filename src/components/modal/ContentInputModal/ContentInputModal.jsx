import React from "react";
import { View, TextInput, Image, KeyboardAvoidingView } from "react-native";
import Modal from "react-native-modal";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Video from 'react-native-video';
import { Video as Compressor } from 'react-native-compressor';
import Button from "../../Button";

import styles from "./ContentInputModal_styles";

const ContentInputModal = ({visible, onClose, onSend}) => {
  const [text, setText] = React.useState(null)
  const [imageUri, setImageUri] = React.useState(null)
  const [imageName, setImageName] = React.useState(null)
  const [reference, setReference] = React.useState(null)
  const [videoUri, setVideoUri] = React.useState(null)
  const [videoName, setVideoName] = React.useState(null)
  const videoRef = React.useRef(null);

  const selectImage = () => {
    launchImageLibrary({ title: 'Select Image', mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const imageUri = response.assets[0].uri
        const imageName = response.assets[0].fileName
        setReference(storage().ref(`images/${imageName}`))
        setImageUri(imageUri);
        setImageName(imageName);
        setVideoUri(null);
        setVideoName(null);
        console.log(imageUri);
        console.log(imageName);
      }
    });
  };

  const selectVideo = () => {
    launchImageLibrary({ title: 'Select Video', mediaType: 'video' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const videoUri = response.assets[0].uri
        const videoName = response.assets[0].fileName
        setReference(storage().ref(`videos/${videoName}`))
        setVideoUri(videoUri);
        setVideoName(videoName);
        setImageUri(null);
        setImageName(null);
        console.log(videoUri)
        console.log(videoName)
      }
    });
  };

  async function handleSend() {
    if (!text) {
      return
    }
    if (imageUri) {
      await reference.putFile(imageUri);
      console.log(imageUri)
      const url = await storage().ref(`images/${imageName}`).getDownloadURL();
      console.log(url)
      contentList = [text, url, null]
    }
    if (videoUri) {
      const result = await Compressor.compress(
        videoUri,
        {},
        (progress) => {
          console.log('Compression Progress: ', progress);
        }
      );
      await reference.putFile(result);
      console.log(result)
      const url = await storage().ref(`videos/${videoName}`).getDownloadURL();
      console.log(url)
      contentList = [text, null, url]
    }
    onSend(contentList)
    setText(null)
    setImageUri(null)
    setImageName(null)
    setVideoUri(null)
    setVideoName(null)
    setReference(null)
  }

  // const uploadImage = async () => {
  //   const pathToFile = imageUri;
  //   await reference.putFile(pathToFile);
  //   console.log(pathToFile)
  // }

  // const uploadImageUri = async () => {
  //   const url = await storage().ref(`images/${imageName}`).getDownloadURL();
  //   setUploadUrl(url)
  //   console.log(uploadUrl)
  // }
  
  return (
    <Modal 
      style={styles.modal}
      isVisible={visible}
      swipeDirection="down" 
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput
            placeholder="Darla hadi milleti..."
            placeholderTextColor="black"
            onChangeText={setText}
            multiline
            style={{ color: "black" }}
          />
        </View>
        {imageUri && (
          <Image source={{uri: imageUri}} style={styles.image} />
        )}
        {videoUri && (
          <Video 
            ref={videoRef}
            source={{uri: videoUri}}
            style={styles.video}
            resizeMode="contain"
            muted={true}
            onEnd={() => videoRef.current.seek(0)}
          />
        )}
        <View style={styles.buttons}>
          <Button text="Image" onPress={selectImage}/>
          <Button text="Video" onPress={selectVideo} />
          <Button text="Post" onPress={handleSend}/>
        </View>
      </View>
    </Modal>
  )
}

export default ContentInputModal;