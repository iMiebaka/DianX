import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Navigation from "./navigation";
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.testDb') 


const App = () => {
  // useEffect(() => {
  //   "CREATE TABLE IF NOT EXISTS `devices` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `deviceId` VARCHAR(255), `publicId` VARCHAR(255), `deviceType` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);";
  //   "CREATE TABLE IF NOT EXISTS `deviceIDs` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `publicId` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);";
  //   "CREATE TABLE IF NOT EXISTS `files` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `userId` INTEGER, `fileType` VARCHAR(255), `fileName` VARCHAR(255), `publicId` VARCHAR(255), `size` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `deviceId` INTEGER REFERENCES `devices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE);";
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20
  },
});
