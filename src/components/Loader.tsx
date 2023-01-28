
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export const Loader = () => {
  return (
    <View style={ style.activityContainer }>
        <ActivityIndicator 
            color="#066EC2"
            size={ 50 }
        />
        <Text>Cargando...</Text>
    </View>
  )
}

const style = StyleSheet.create({
    activityContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
