# My Navigation App

A simple chat application built with React Native and Expo, featuring navigation and customizable chat backgrounds.

## Features

- React Native navigation using [@react-navigation/native](https://reactnavigation.org/)
- Customizable chat background colors
- Splash screen for iOS
- Expo managed workflow

## Project Structure

```
.
├── App.js
├── app.json
├── index.js
├── package.json
├── components/
│   ├── Chat.js
│   └── Start.js
├── assets/
│   ├── adaptive-icon.png
│   ├── background-image.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── ios/
│   └── ... (iOS native files)
└── .expo/
    └── ... (Expo files)
```

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/my-navigation-app.git
   cd my-navigation-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Running the App

- **Start the development server:**
  ```sh
  npm start
  ```
- **Run on Android:**
  ```sh
  npm run android
  ```
- **Run on iOS:**
  ```sh
  npm run ios
  ```
- **Run on Web:**
  ```sh
  npm run web
  ```

## Usage

1. Enter your name and select a background color on the Start screen.
2. Tap "Start Chatting" to enter the chat screen.
3. The chat screen will greet you by name and display your chosen background color.

## Customization

- **Splash Screen:**  
  The iOS splash screen is configured in [`ios/mynavigationapp/SplashScreen.storyboard`](ios/mynavigationapp/SplashScreen.storyboard).
- **Icons and Images:**  
  All app icons and images are located in the [`assets`](assets) folder.

## Dependencies

See [`package.json`](package.json) for a full list. Key dependencies include:
- `react-native`
- `expo`
- `@react-navigation/native`
- `@react-navigation/native-stack`

