import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Alert, Button, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useProducts } from '../context/productContext';

export default function Productos() {

      const router = useRouter()
      const { productos } = useProducts()

    
    

    const renderItem = ({item}) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/${item.id}/detalle`)}
        >
            <Image source={{uri: item.image}} style={styles.image}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price.toFixed(2)}</Text>
        </TouchableOpacity>
    )
   

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Productos</Text>
        <FlatList
            data={productos}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            numColumns={2}
        />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 18,
    textAlign: 'center',
    color: '#242424',
    backgroundColor: '#fff',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 8,
    borderRadius: 16,
    alignItems: 'center',
    padding: 14,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    minWidth: 150,
    maxWidth: '47%', 
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    resizeMode: 'contain',
    marginBottom: 10,
    backgroundColor: '#F1F1F1',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    marginBottom: 6,
    textAlign: 'center',
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#01B96B', 
    marginBottom: 2,
    textAlign: 'center',
  },
});
