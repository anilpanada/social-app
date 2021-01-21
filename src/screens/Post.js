import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Post = () => {
    return (
        <View style={styles.container}>
            <Text>Post Screen.</Text>
        </View>
    )
}

export default Post;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
});