import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { AppBar, Icon, IconButton} from "@react-native-material/core";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default () => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <AppBar 
            title="Home"
            color={colors.navBar}
            style={{
                padding: 10,
            }}
            // trailing={props => (
            //     <IconButton icon={props => <Icon name="menu" {...props} />} {...props} />
            //   )}
        />
        <StatusBar style="auto"/>
    </SafeAreaView>
  );
};
