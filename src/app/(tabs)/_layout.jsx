import { Tabs } from 'expo-router'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function TabsLayout() {
  return (
    <Tabs>
        <Tabs.Screen 
            name="index" 
            options={{
                title: "Home",
                tabBarIcon: ({ color, size}) => (
                    <Ionicons name='home' color={color} size={size} />
                ),
                headerShown: false
            }}/>
            <Tabs.Screen 
            name="settings" 
            options={{
                title: "Settings",
                tabBarIcon: ({ color, size}) => (
                    <Ionicons name='settings' color={color} size={size} />
                ),
                headerShown: false
            }}/>
    </Tabs>
  )
}
