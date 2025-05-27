import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Animated, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';

const sedes = [
    {
        id: '1',
        title: 'Sucursal Belgrano',
        description: 'Sucursal en Belgrano',
        coordenadas: { latitude: -34.5895, longitude: -58.4186 }
    },
    {
        id: '2',
        title: 'Sucursal Yatay',
        description: 'Sucursal en Almagro',
        coordenadas: { latitude: -34.6181, longitude: -58.4438 }
    },

]

export default function Maps() {

    const [location, setLocation] = useState(null)
    const [routeCoords, setRouteCoords] = useState(null)
    const [loadingRoute, setLoadingRoute] = useState(null)
    const [selectedSede, setSelectedSede] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);
    const [mapRegion, setMapRegion] = useState(null);

    const mapRef = useRef(null)

    const fadeAnim = useRef(new Animated.Value(0).current)

    useEffect(() => {
        const cargarLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permiso de ubicacion Denegado')
                return;
            }
            let loc = await Location.getCurrentPositionAsync();
            setLocation(loc.coords)
            setMapRegion({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            })
        }

        cargarLocation()
    }, [])

    const fetchRoute = async (destino) => {

    }

    const centerUser = () => {
        if(mapRef.current && location){
            mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            })
        }
    }

    const alignNorth = () => {
        if(mapRef.current && mapRegion){
            mapRef.current.animateCamera({
                heading: 0,
                pitch: 0,
                center:{
                    latitute: mapRegion.latitude,
                    longitude: mapRegion.longitude
                }
            })
        }
    }



    return (
        <View style={styles.container}>
            {location && (
                <MapView
                    mapType='standard'
                    showsMyLocationButton={false}
                    style={styles.map}
                    ref={mapRef}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }}
                    showsUserLocation
                    showsCompass
                    onRegionChangeComplete={setMapRegion}
                >
                    {
                        sedes.map((sede) => (
                            <Marker
                                key={sede.id}
                                coordinate={sede.coordenadas}
                                onPress={() => setSelectedSede(sede)}
                                image={require('../../assets/ort.png')}
                            />
                        ))
                    }

                </MapView>
            )}

        <Pressable style={styles.centerButton} onPress={centerUser}>
            <Image source={require('../../assets/location.png')}
                style={{width: 32, height: 32}}
                resizeMode='contain'
            />
        </Pressable>

        
        <Pressable style={styles.alignButton} onPress={alignNorth}>
            <Image source={require('../../assets/splash-icon.png')}
                style={{width: 32, height: 32}}
                resizeMode='contain'
            />
        </Pressable>

        <Modal
            visible={!!selectedSede}
            animationType='fade'
            transparent
            onRequestClose={() => setSelectedSede(null)}
        >
         <Animated.View style={[styles.modalOverlay, {opacity: fadeAnim}]}>
            <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                    <Image
                        source={require('../../assets/ort.png')}
                        style={styles.modalIcon}
                    />
                    <View>
                        <Text style={styles.modalTitle}>{selectedSede?.title}</Text>
                        <Text style={styles.modalSubtitle}>{selectedSede?.description}</Text>
                    </View>
                </View>
                <View style={{marginVertical: 10}}>
                    <Pressable
                        style={styles.modalButton}
                        onPress={() => fetchRoute(selectedSede.coordenadas)}
                        disabled={loadingRoute}
                    >
                        {loadingRoute ? (
                            <ActivityIndicator color={"#fff"} />
                        ): (
                                <Text style={styles.modalButtonText}>Mostrar Ruta</Text>
                            )
                        }
                    </Pressable>
                </View>
                <Pressable
                    style={styles.closeModal}
                    onPress={() => {
                        setSelectedSede(null)
                        setRouteCoords(null)
                    }}
                >
                    <Text style={styles.closeText}>Cerrar</Text>
                </Pressable>
            </View>
         </Animated.View>
        </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    centerButton: {
        position: 'absolute',
        bottom: 40,
        right: 16,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 24,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    alignButton: {
        position: 'absolute',
        bottom: 100,
        right: 16,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-end',
    },
    modalCard: {
        backgroundColor: 'white',
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        padding: 24,
        paddingBottom: 36,
        minHeight: 220,
        elevation: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.13,
        shadowRadius: 8,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    modalIcon: {
        width: 38,
        height: 38,
        marginRight: 16,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: "#222",
    },
    modalSubtitle: {
        fontSize: 16,
        color: "#707070",
        marginTop: 4,
    },
    modalButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 0.2,
    },
    closeModal: {
        alignSelf: 'center',
        marginTop: 12,
        padding: 6,
    },
    closeText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
    errorBanner: {
        position: 'absolute',
        top: 48,
        left: 16,
        right: 16,
        backgroundColor: '#EA4343',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        zIndex: 999,
    },
});
