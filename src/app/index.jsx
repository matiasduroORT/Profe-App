import { Link } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

export default function Home(){
  return (
    <View>
        <Link href={'/(tabs)'} asChild>
        <Button title='Ir a Tabs'>

        </Button>
        </Link>
    </View>
  )
}
