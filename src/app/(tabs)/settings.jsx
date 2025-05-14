import React from 'react'
import { Button, Text, View } from 'react-native'
import { useAuth } from '../../context/authContext';

export default function settings() {
    const { logout } = useAuth();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings</Text>
        <Button title='Log out' onPress={logout}/>
    </View>
  )
}
