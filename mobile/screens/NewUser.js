import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { DeviceMenu, Spinner } from "../components";
import uuid from "react-native-uuid";
import * as SQLite from "expo-sqlite";
import { api, socket } from "../request";
const db = SQLite.openDatabase("db.testDb");

const NewUser = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null),
    [scanned, setScanned] = useState(false),
    [checkingState, setCheckingState] = useState(false),
    [userDetail, setUserDetail] = useState({}),
    [comCode, setComCode] = useState(uuid.v4()),
    [statusText, setStatusText] = useState("Paring");
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
    setCheckingState(true);
    setScanned(true);
    // alert(`${data}`);
    const url = JSON.parse(data).data;
    for (let index = 0; index < url.length; index++) {
      const element = url[index];
      try {
        setStatusText(`Paring ${index + 1}/${url.length}`);
        const res = await api(element).post("/find-host", { url: comCode });
        if (res.status == 200) {
          setStatusText(`Paring Complete`);
          setCheckingState(false);
          setScanned(false);
          // socket(element).emit("make_handshake", { data: comCode });
          navigation.navigate("Exchange", {
            route: res.data.publicId,
            name: res.data.deviceName,
            connectionId: comCode,
            url: element,
          });
          // console.log(res.data);
          return;
        }
      } catch {}
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
            <Spinner title={statusText} />
          </View>
        ) : (
          <View>
            <Button
              title={"Search Complete - Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
            <ScrollView>
              {/* <DeviceMenu
                navigation={navigation}
                name={"Misty"}
                status={"active"}
                icon={ICONS.desktop}
                route={"192.168.43.64:3333"}
                goTo="Exchange"
              /> */}
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
