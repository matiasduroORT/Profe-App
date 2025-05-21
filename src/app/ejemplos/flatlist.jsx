import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function scroll() {

    const [users, setUsers] = useState([])

    useEffect(() => {

    const fetchUsers = async() => {
        try {
            const respuesta = await fetch('https://randomuser.me/api/?results=20');
            const data = await respuesta.json()
            setUsers(data.results)
        } catch (error) {
            console.log("error: ", error);
            
        }
        }
        fetchUsers()
    }, [])


  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.name}>FlatList</Text>

        <FlatList
            data={users}
            keyExtractor={(item) => item.login.uuid}
            renderItem={({item}) => (
                <View style={styles.userContainer}>
                <Image source={{ uri: item.picture.large}} style={styles.image}/>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
                        <Text style={styles.detalle}>Nacionalidad: {item.nat}</Text>
                        <Text style={styles.detalle}>Edad: {item.dob.age}</Text>
                    </View>
            </View>
            )}
        >
        </FlatList>

        <TextInput style={{height: 40, borderWidth: 1, marginBottom: 10}} placeholder='Escribe algo' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'wheat',
        paddingTop: 20,
    },
    userContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#c1bdbd',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight:  15
    },
    infoContainer: {
        flex: 1,
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    detalle:{
        fontSize: 16,
        color: '#666'
    }
})
