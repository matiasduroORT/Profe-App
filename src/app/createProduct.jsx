import React, { useState } from 'react'
import { Alert, Button, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { useProducts } from '../context/productContext';
import { useRouter } from 'expo-router';
import { pickImageFromGallery, takePhotoFromCamera } from '../utils/imagePicker';

export default function CreatProducto() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageUri, setImageUri] = useState(null)

    const router = useRouter()

    const { createProduct } = useProducts()
    
    const pickImage = async() => {
        const uri = await pickImageFromGallery()
        if(uri) setImageUri(uri)
    }

    const takePhoto = async() => {
        const uri = await takePhotoFromCamera()
        if(uri) setImageUri(uri)
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Nuevo Producto</Text>

            <Text style={styles.label}>Titulo</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder='Ej. Zapatillas'
                placeholderTextColor={'#aaa'}
            />

            <Text style={styles.label}>Descripcion</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder='Descripcion del producto'
                placeholderTextColor={'#aaa'}
            />

            <Text style={styles.label}>Precio</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder='10000'
                placeholderTextColor={'#aaa'}
            />

            {
                imageUri && (
                    <Image source={{uri: imageUri}} style={styles.image}/>
                )
            }

            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => pickImage()}
                >
                    <Text style={styles.secondaryText}>Seleccionar Imagen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => takePhoto()}
                >
                    <Text style={styles.secondaryText}>Tomar Foto</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryButton}
                onPress={( ) => {
                    createProduct({title, description, price, imageUri})
                    router.replace("/productos")
                }}
            >
                <Text style={styles.primaryText}>Crear Producto</Text>
            </TouchableOpacity>



        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'F9fafb',
        padding: 20,
        paddingBottom: 40
    },
    heading:{
        fontSize: 28,
        fontWeight: '700',
        color: '#111',
        marginBottom: 24
    },
    label:{
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    input:{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        borderColor: '#e5e7eb',
        borderWidth: 1,
        marginBottom: 16,
        color: '#111'
    },
    textArea:{
        height: 100,
        textAlignVertical: 'top'
    },
    image: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
        borderRadius: 12,
        marginBottom: 16,
      },
      buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 24,
      },
      secondaryButton: {
        flex: 1,
        backgroundColor: '#E5E7EB',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
      },
      secondaryText: {
        color: '#111',
        fontSize: 15,
        fontWeight: '500',
      },
      primaryButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
      },
      primaryText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
      },

});
