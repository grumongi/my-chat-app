import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const { name, bgColor, userID, db } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (!db) {
      console.error('Firestore database instance is not available');
      return;
    }

    const messagesQuery = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text || '',
          createdAt: data.createdAt?.toDate() || new Date(),
          user: data.user || {},
        };
      });

      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [db]);

  const onSend = async (newMessages = []) => {
    const message = newMessages[0];
    try {
      await addDoc(collection(db, 'messages'), {
        text: message.text,
        createdAt: serverTimestamp(),
        user: {
          _id: userID,
          name: name,
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: '#000' },
        left: { backgroundColor: '#FFF' },
      }}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: bgColor || '#fff' }]}>
      <GiftedChat
        messages={messages}
        onSend={(msgs) => onSend(msgs)}
        user={{ _id: userID, name }}
        renderBubble={renderBubble}
      />
      {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
