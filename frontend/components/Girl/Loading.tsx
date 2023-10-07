import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
            <ScrollView contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <Text>Please ask your Club Leader to add you to the club!</Text>
            </ScrollView>
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default Loading;
