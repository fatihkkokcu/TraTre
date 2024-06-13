import React, { useEffect } from "react";
import { FlatList, View, RefreshControl } from "react-native";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

import PostCard from "../../components/card/PostCard";
import FloatingButton from "../../components/FloatingButton";
import ContentInputModal from "../../components/modal/ContentInputModal";
import parseContentData from "../../utils/parseContentData";

function Homepage() {
  const [inputModalVisible, setInputModalVisible] = React.useState(false)
  const [data, setData] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false);

  const listenDB = () => {
    // const reference = database().ref("/posts");
    // reference.on('value', snapshot => {
    //   const contentData = snapshot.val()
    //   const parsedData = parseContentData(contentData)
    //   setData(parsedData)
    // });
    const reference = database().ref("/posts");
    reference.once('value').then(snapshot => {
      const contentData = snapshot.val()
      const parsedData = parseContentData(contentData)
      setData(parsedData)
    });
  }  

  useEffect(() => {
    listenDB()
  }, [data])
  
  function handleSendContent(content) {
    handleInputToggle()
    sendContent(content)
  }

  function sendContent(content) {
    const userMail = auth().currentUser.email

    const contentObject = {
      text: content[0],
      username: userMail.split("@")[0],
      date: new Date().toISOString(),
      upvote: 0,
      downvote: 0,
      image: content[1],
      video: content[2],
    }

    database().ref("/posts").push(contentObject)
  }

  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible)
  }

  const renderPost = ({item}) => <PostCard post={item}/>
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      listenDB()
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: "#E5F3F2"}}>
      <FlatList
        data={data}
        renderItem={renderPost}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <FloatingButton icon="plus" onPress={handleInputToggle}/>
      <ContentInputModal 
        visible={inputModalVisible} 
        onClose={handleInputToggle} 
        onSend={handleSendContent}
      />
    </View>
  )
}

export default Homepage;