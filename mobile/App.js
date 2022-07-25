import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import Navigation from "./navigation";
import { createStore } from "redux";
import allReaducers from "./redux/reducer";
import { Provider } from "react-redux";

const store = createStore(allReaducers);

const App = () => {
  

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20
  },
});
