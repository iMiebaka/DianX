import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import Navigation from "./navigation";


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
}


export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20
  },
});
