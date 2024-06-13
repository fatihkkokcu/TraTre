import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Video from 'react-native-video';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./PostCard_styles";
import colors from "../../../styles/colors";

function PostCard({post}) {
  const [increasePressedOnce, setIncreasePressedOnce] = React.useState(false);
  const [decreasePressedOnce, setDecreasePressedOnce] = React.useState(false);
  const [trashIconColor, setTrashIconColor] = React.useState("white");
  const [treasureIconColor, setTreasureIconColor] = React.useState("white");
  const videoRef = React.useRef();
  const [videoPaused, setVideoPaused] = React.useState(false)
  const [originalUpvote, setOriginalUpvote] = React.useState(null)
  const [originalDownvote, setOriginalDownvote] = React.useState(null)

  React.useEffect(() => {
    database()
    .ref(`/posts/${post.id}/upvote`)
    .once('value')
    .then(snapshot => {
      database()
      .ref(`/users/${auth().currentUser.uid}/votes/${post.id}`)
      .once('value')
      .then(voteSnapshot => {
        const voteStatus = voteSnapshot.val();
        if (voteStatus === "upvoted") {
          setOriginalUpvote(snapshot.val() - 1);
        }
        else {
          setOriginalUpvote(snapshot.val());
        }
      });
    });
  }, [])

  React.useEffect(() => {
    database()
    .ref(`/posts/${post.id}/downvote`)
    .once('value')
    .then(snapshot => {
      database()
      .ref(`/users/${auth().currentUser.uid}/votes/${post.id}`)
      .once('value')
      .then(voteSnapshot => {
        const voteStatus = voteSnapshot.val();
        if (voteStatus === "downvoted") {
          setOriginalDownvote(snapshot.val() - 1);
        }
        else {
          setOriginalDownvote(snapshot.val());
        }
      });
    });
  }, [])
  
  React.useEffect(() => {
    database()
    .ref(`/users/${auth().currentUser.uid}/votes/${post.id}`)
    .once('value')
    .then(snapshot => {
      const voteStatus = snapshot.val();
      if (voteStatus === "upvoted") {
        setIncreasePressedOnce(true);
        setTreasureIconColor(colors.darkgreen);
      } else if (voteStatus === "downvoted") {
        setDecreasePressedOnce(true);
        setTrashIconColor(colors.darkgreen);
      }
    });
  }, [increasePressedOnce, decreasePressedOnce])
  
  const updateUpvote = React.useCallback(
    async (tempCounter) => {
      await
      database()
        .ref(`/posts/${post.id}`)
        .update({
          upvote: tempCounter,
        })
        .then(() => console.log('Data updated.'));
    }, [post.id]
  )
  
  const updateDownvote = React.useCallback(
    async (tempCounter) => {
      await
      database()
        .ref(`/posts/${post.id}`)
        .update({
          downvote: tempCounter,
        })
        .then(() => console.log('Data updated.'));
    }, [post.id]
  )

  const setVotedPost = React.useCallback(
    async (value) => {
      await database()
        .ref(`/users/${auth().currentUser.uid}/votes`)
        .update({ [post.id]: value })
        .then(() => console.log('Post voted.'));
    },
    [post.id]
  );
  
  const removeVotedPost = React.useCallback(
    async () => {
      await database()
        .ref(`/users/${auth().currentUser.uid}/votes/${post.id}`)
        .remove()
        .then(() => console.log('Post unvoted.'));
    },
    [post.id]
  );

  const increaseCounter = React.useCallback(
    async () => {
      if (!increasePressedOnce) {
        const tempCounter = originalUpvote + 1
        await updateUpvote(tempCounter)
        await setVotedPost("upvoted")
        setIncreasePressedOnce(true)
        setTreasureIconColor(colors.darkgreen)
        if (decreasePressedOnce) {
          await updateDownvote(originalDownvote)
          setDecreasePressedOnce(false)
          setTrashIconColor("white")
        }
      }
      else {
        const tempCounter = originalUpvote
        await updateUpvote(tempCounter)
        await removeVotedPost()
        setIncreasePressedOnce(false)
        setTreasureIconColor("white")
      }
    }, [originalUpvote, increasePressedOnce, decreasePressedOnce]
  )

  const decreaseCounter = React.useCallback(
    async () => {
      if (!decreasePressedOnce) {
        const tempCounter = originalDownvote + 1
        await updateDownvote(tempCounter)
        await setVotedPost("downvoted")
        setDecreasePressedOnce(true)
        setTrashIconColor(colors.darkgreen)
        if (increasePressedOnce) {
          await updateUpvote(originalUpvote)
          setIncreasePressedOnce(false)
          setTreasureIconColor("white")
        }
      }
      else {
        const tempCounter = originalDownvote
        await updateDownvote(tempCounter)
        await removeVotedPost()
        setDecreasePressedOnce(false)
        setTrashIconColor("white")
      }
    }, [originalDownvote, increasePressedOnce, decreasePressedOnce]
  )
  
  const handleVideoPress = React.useCallback(
    () => {
      if (videoRef.current) {
        if (!videoPaused) {
          videoRef.current.pause()
          setVideoPaused(true)
        }
        else {
          videoRef.current.resume()
          setVideoPaused(false)
        }
      }
    }, [videoRef, videoPaused]
  ) 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{post.text}</Text>
      {post.image && (
        <Image style={styles.image} source={{uri: post.image}}/>
      )}
      <TouchableOpacity onPress={handleVideoPress}>
        {post.video && (
          <Video 
            ref={videoRef}
            source={{uri: post.video}}
            style={styles.video}
            resizeMode="contain"
            muted={true}
            onEnd={() => videoRef.current.seek(0)}
          />
        )}
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={decreaseCounter}>
          <Icon name="trash-can" size={40} color={trashIconColor}/>
        </TouchableOpacity>
        <Text style={styles.counterText}>{post.upvote - post.downvote}</Text>
        <TouchableOpacity onPress={increaseCounter}>
          <Icon name="treasure-chest" size={40} color={treasureIconColor}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PostCard;