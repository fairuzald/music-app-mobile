# Songify - Music Player Mobile App

**Songify** is a music player mobile application built with React Native, designed to offer an intuitive and user-friendly experience for managing and playing music on mobile devices.

## Features

- **Music Playback**: Seamlessly stream and play your favorite tracks with support for various audio formats.
- **Track Slider**: Control playback position using an interactive slider with `react-native-awesome-slider`.
- **Navigation**: Navigate between different screens effortlessly using `react-navigation`.
- **Customizable UI**: Enhance user experience with icons provided by `react-native-vector-icons`.
- **Persistent Storage**: Store user preferences and playback history with `@react-native-async-storage/async-storage`.
- **Gesture Handling**: Implement smooth gesture interactions with `react-native-gesture-handler`.
- **Safe Area Handling**: Ensure content is properly displayed on devices with notches and rounded corners using `react-native-safe-area-context`.

## Dependencies

### Main Dependencies

- **`@react-native-async-storage/async-storage`**: Provides a simple, asynchronous, persistent key-value storage system.
- **`@react-navigation/native`** and **`@react-navigation/drawer`**: Used for implementing navigation within the app, including drawer navigation.
- **`react-native-reanimated`** and **`react-native-gesture-handler`**: Enhance gesture handling and animations for a smoother user experience.
- **`react-native-track-player`**: A robust solution for managing audio playback and handling background tasks.
- **`react-native-vector-icons`**: Offers a set of customizable icons to enhance the app's visual appeal.

## Installation

To set up the Songify project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/songify.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd songify
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

## Running the App

To run the app on an Android device or emulator, use:

### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

#### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

**Known Issues**:

- Currently supports only Android; iOS support will be added in future releases.

For more detailed release notes and updates, please visit the [Releases](https://github.com/fairuzald/music-app-mobile/releases) page on GitHub.

## Data Scraping Documentation

### Overview

The Data Scraping project is designed to gather data from the NCS (National Career Service) website. The project includes a `scripts` folder where the data scraping operations are performed. This process ensures that all data in the application is sourced from NCS, keeping the app's content current with NCS's offerings.

### Project Structure

- **scripts/**: Contains the data scraping scripts.

### Data Source

- **Website**: [NCS Website](https://www.ncs.io)

### Purpose

The primary objective of the data scraping is to:

- Fetch and update data from the NCS website.
- Ensure the application's content is aligned with the latest offerings from NCS.

### Scraping Process

1. **Script Execution**: The scripts located in the `scripts` folder are responsible for scraping data from the NCS website.
2. **Data Handling**: Once scraped, the data is processed and integrated into the application to reflect the most recent information available from NCS.

### Running the Scraper

To run the data scraping scripts, navigate to the `scripts` folder and execute the desired script using your preferred environment.

```bash
cd scripts
npm install
node scrape.js

```
