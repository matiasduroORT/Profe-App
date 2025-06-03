import { createContext, useContext, useState } from "react"

const GOOGLE_MAPS_APIKEY = 'AIzaSyA5_igLeSHGtZ5Z0vj1Ilib7d7s93C3buU'

const SedeContext = createContext()

export const useSedes = () => useContext(SedeContext);

export function SedeProvider({ children }) {
    const [sedes, setSedes] = useState([{
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
    },])

    const getCordenadas = async (address) => {

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_APIKEY}`;

        try {

            const resp = await fetch(url)
            const data = await resp.json()

            if(data.results && data.results.length){
                const {lat, lng} = data.results[0].geometry.location

                return {
                    latitude: lat,
                    longitude: lng
                }
            }
            return null;
        } catch (error) {
            return null
        }

    }


    const addSede = async ({ title, description, address}) => {

        const coordenadas = await getCordenadas(address)

        if (!coordenadas) throw new Error("No se pudo obtener la ubicacion")

        const newSede = {
            id: Date.now().toString(),
            title,
            description,
            coordenadas
        }

        setSedes((prev) => [...prev, newSede])

        return newSede
    }



    return (
        <SedeContext.Provider value={{sedes, addSede}}>
            {children}
        </SedeContext.Provider>
    )

}