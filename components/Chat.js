import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const { name, bgColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
    setMessages([
      {
        _id: 1,
        text: `${name} has entered the chat.`,
        createdAt: new Date(),
        system: true,
      },
      {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, [name, navigation]);

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#000" },
        left: { backgroundColor: "#FFF" }
      }}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: bgColor || '#fff' }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={onSend}
        user={{
          _id: 1,
          name
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;