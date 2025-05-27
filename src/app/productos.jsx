import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Alert, Button, FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useProducts } from '../context/productContext';

export default function Productos() {

      const router = useRouter()
      const {productos } = useProducts()
    

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
