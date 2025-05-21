import React from 'react'
import { Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function touchables() {

    const handlePress = (type) => {
        console.log(`Presionaste ${type}`);
        
    }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Ejemplo de Touchables</Text>

        <TouchableOpacity
         style={styles.button}
         onPress={() => handlePress('TouchableOpacity')}
         TouchableOpacity={0.1}
        >
            <Text style={styles.text}>TouchableOpacity</Text>
        </TouchableOpacity>

        <TouchableHighlight
         style={styles.button}
         onPress={() => handlePress('TouchableHighlight')}
         underlayColor='red'
         >
            <Text style={styles.text}>TouchableHighlight</Text>
        </TouchableHighlight>

        <TouchableWithoutFeedback
                 onPress={() => handlePress('TouchableWithoutFeedback')}
        >
            <View style={styles.button}>

            <Text style={styles.text}>TouchableWithoutFeedback</Text>
            </View>
        </TouchableWithoutFeedback>

        <Pressable
            style={({pressed}) => [
                styles.button,
                { backgroundColor: pressed ? 'green' : 'blue'}
            ]}
            onPress={() => handlePress('Pressable')}

        >
            <Text style={styles.text}>Pressable</Text>
        </Pressable>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      alignItems: 'center',
      backgroundColor: '#f0f0f0'
    },
    title: {
      fontSize: 22,
      marginBottom: 20,
      fontWeight: 'bold'
    },
    button: {
      marginBottom: 15,
      backgroundColor: '#2196F3',
      padding: 15,
      borderRadius: 8,
      width: 250,
      alignItems: 'center'
    },
    text: {
      color: '#fff',
      fontSize: 16
    }
  });