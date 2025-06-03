import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import { useSedes } from "../context/sedeContext";

export default function AddSede() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState()
    const [loading, setLoading] = useState(false)

    const { addSede } = useSedes()

    const handleAdd = async () => {
        if(!title || !description || !address){
            Alert.alert('Todos los campos son obligatorios')
            return
        }

        setLoading(true)

        try {

            console.log("ejecutando addSede");
            
            await addSede({ title, description, address})

            Alert.alert('Sede agregada')
            setTitle('')
            setDescription('')
            setAddress('')
        } catch (error) {
            Alert.alert('Error', error.message)

        }
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Agregar nueva Sede</Text>
            <TextInput
                style={styles.input}
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección (ej: Av. Rivadavia 4800, CABA)"
                value={address}
                onChangeText={setAddress}
            />
            <Pressable style={styles.button} onPress={handleAdd} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Agregar sucursal</Text>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
    heading: { fontSize: 22, fontWeight: '700', marginBottom: 30, textAlign: 'center' },
    input: {
        borderWidth: 1, borderColor: '#bbb', borderRadius: 10, padding: 12,
        marginBottom: 18, fontSize: 16, backgroundColor: '#f9f9f9'
    },
    button: {
        backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center'
    },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});