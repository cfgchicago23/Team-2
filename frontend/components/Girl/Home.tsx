import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";

import { tabParamsList } from "./GirlNav";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type Props = BottomTabScreenProps<tabParamsList, 'Home'>;

export default function Home({ route, navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text>Hi</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });