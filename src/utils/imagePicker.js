import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'

export const pickImageFromGallery = async () => {

        const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!permiso.granted){
            alert('Permiso requerido para acceder a la galeria')
            return
        }
        const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1,
            allowsEditing: false
        }) 

        if(!result.canceled){
            return result.assets[0].uri
        }

        return null
    }

export const takePhotoFromCamera = async () => {

        const permiso = await ImagePicker.requestCameraPermissionsAsync();
        if(!permiso.granted){
            alert('Permiso requerido para acceder a la camara')
            return
        }
        const result = await ImagePicker.launchCameraAsync({ quality: 1, allowsEditing: true})

        if(!result.canceled){
            return result.assets[0].uri;
        }

        return null;
    }