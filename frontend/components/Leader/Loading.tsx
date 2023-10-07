import { DocumentData } from 'firebase/firestore';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, RefreshControl, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchUserData } from '../../firebase/firestore';
import colors from '../../constants/colors';


export type LoadingProps = {
    user: any,
    userData: any,
    fetchUserData: any,
    setUserData: any,
}

const Loading = (props: LoadingProps) => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.fetchUserData(props.user, props.setUserData)

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            {/* Add an Image component at the top */}
            <Image
                source={require('../../constants/images/CFGLongLogo.png')} // Adjust the path to your image
                style={styles.logo}
            />
            <ScrollView contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                {/* <Text style={styles.firstText}>Hello!</Text> */}
                <Text style={styles.loadingText}>Welcome! Please ask your Global Family Network employee to finish and join a club. </Text>
            </ScrollView>
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    loadingText: {
        fontSize: 30,
        fontWeight: 'semibold',
        color: 'black',
        // marginBottom: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 5,
        marginBottom: 170, // Adjust the margin here to reduce the gap
        marginTop: 0, // Adjust the margin here to reduce the gap
        paddingLeft: 20,
        paddingRight: 20,
      },
      logo: {
          width: 400,
          height: 180,
          justifyContent: 'center',
          marginLeft: 70,
          marginTop: 30,
      },
  });
  export default Loading;
  