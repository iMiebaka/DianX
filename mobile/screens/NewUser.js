import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { DeviceMenu, Spinner } from "../components";
import ICONS from "../assets/icons";

const NewUser = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null),
    [scanned, setScanned] = useState(true),
    [checkingState, setCheckingState] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`${data}`);
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
          <Spinner title={"Pairing"} />
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
          style={[StyleSheet.absoluteFillObject, styles.container]}
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
    height: "100%",
  },
});

export default NewUser;
