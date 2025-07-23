import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBokLSEisJYVbUkv1HPHdMF7ymzQ9gwIpE',
  authDomain: 'my-chat-app-260d0.firebaseapp.com',
  projectId: 'my-chat-app-260d0',
  storageBucket: 'my-chat-app-260d0.appspot.com',
  messagingSenderId: '139786937112',
  appId: '1:139786937112:web:675bacc1461c259813746d',
  measurementId: 'G-XMNL0S4NNP',
};

// ✅ Initialize Firebase only once
const app = initializeApp(firebaseConfig);

// ✅ Set up Firestore and Auth with persistence
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          options={{ headerShown: false }}
        >
          {(props) => <Start {...props} db={db} auth={auth} />}
        </Stack.Screen>

        <Stack.Screen
          name="Chat"
          options={{ title: 'Chat' }}
        >
          {(props) => <Chat {...props} db={db} auth={auth} />}
        </Stack.Screen>
      </Stack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
