import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Navigation from "./navigation";
import uuid from "react-native-uuid";
import * as SQLite from "expo-sqlite";
import SQL from "./controllers";
const db = SQLite.openDatabase("db.testDb");

const App = () => {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(SQL.create.DeviceID);
      tx.executeSql(SQL.create.Devices);
      tx.executeSql(SQL.create.Files);
      tx.executeSql(SQL.get.DeviceID, [], (_, { rows }) => {
        if (rows.length == 0) {
          tx.executeSql(SQL.add.initDeviceId, [uuid.v4(), "Dian-Exchange-Mobile"], null, (_, err)=>{
            alert(err);
          });
          console.log("Created");
        }

      });
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Navigation database={db} />
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
