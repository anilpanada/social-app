import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Notification = () => {
    return (
        <View style={styles.container}>
            <Text>Notification Screen.</Text>
        </View>
    )
}

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
});