import { Link } from 'expo-router'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function Home(){
  return (
    <View style={styles.container}>
        <Link href={'/(tabs)'} asChild>
        <Button title='Ir a Tabs'>

        </Button>
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
