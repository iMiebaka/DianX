import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { DeviceMenu, socket, Spinner } from "../components";
import uuid from "react-native-uuid";
import ICONS from "../assets/icons";
import * as SQLite from "expo-sqlite";
import api from "../request/axios";
const db = SQLite.openDatabase("db.testDb");

const NewUser = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null),
    [scanned, setScanned] = useState(false),
    [checkingState, setCheckingState] = useState(false),
    [userDetail, setUserDetail] = useState({}),
    [comCode, setComCode] = useState(uuid.v4());
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM deviceIDs WHERE id=1",
        [],
        (_, { rows }) => {
          setUserDetail(rows._array[0]);
        },
        (_, err) => {
          console.log(err);
        }
      );
    });
  }, []);

  useEffect(() => {
    // socket.io();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setCheckingState(true);
    alert(`${data}`);
    const url = JSON.parse(data).data.address;
    console.log(url);
    for (let index = 0; index < url.length; index++) {
      const element = url[index];
      const res = await api(element).post("/find-host");
      if (res.status == 200) {
        socket(element).emit("make_handshake", comCode);
        socket(element).emit("join_room", comCode);
        console.log(res);
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {scanned ? (
        checkingState ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Spinner title={"Pairing"} />
          </View>
        ) : (
          <View>
            <Button
              title={"Search Complete - Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
            <ScrollView>
              <DeviceMenu
                navigation={navigation}
                name={"Misty"}
                status={"active"}
                icon={ICONS.desktop}
                route={"192.168.43.64:3333"}
                goTo="Exchange"
              />
            </ScrollView>
          </View>
        )
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[styles.barCodeView]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barCodeView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: "120%",
  },
});

export default NewUser;
