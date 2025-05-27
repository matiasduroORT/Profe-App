import { createClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";


const ProductContext = createContext()

export const useProducts = () => useContext(ProductContext)

export const ProductProvider = ({children}) => {

    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true);

    const supabaseUrl = 'https://madkyfprrhsqifvjpisv.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZGt5ZnBycmhzcWlmdmpwaXN2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODM4NDM1MywiZXhwIjoyMDYzOTYwMzUzfQ.7e07GcWyO5RPw1F3FTIsiWGw0m6d0Ump1aIILZBX-lI'


    const supabase = createClient(supabaseUrl, supabaseKey)
    
        useEffect(() => {
          fetch('https://fakestoreapi.com/products')
          .then( res => res.json())
          .then(data => {
            setProductos(data)
            setLoading(false)
        })
          .catch(err => {
            console.error(err)
            setLoading(false)
        })
        }, [])

        const createProduct = async ({ title, description, price, imageUri}) => {
            
            try {
            console.log("image: ", imageUri);
            
            const response = await fetch(imageUri)
            const blob = await response.blob();

            console.log('image ahora: ', blob);
            

            const fileExt = imageUri.split('.').pop();
            const fileName = `img-${Date.now()}.${fileExt}`
            const filePath = `productos/imagenes/${fileName}`
            console.log("File: ", {
                fileExt,
                fileName,
                filePath
            });

            const { error: uploadError } = await supabase.storage.from("pnt2-bucket").upload(filePath, blob, {upsert: false});
            
            if(uploadError) throw uploadError

            const { publicURL, error: urlError } = await supabase.storage.from('pnt2-bucket').getPublicUrl(filePath)

            if(urlError) throw urlError
            if(!publicURL) throw new Error ('No se pudo obtener la URL')
            

            const newProduct = {
                id: Date.now(),
                title,
                description,
                price: Number(price),
                image: publicURL
            }

            console.log("new Product: ", newProduct);
            

            setProductos(prev => [newProduct, ...prev])
                            
        } catch (error) {
            console.error('Error creando producto: ', error)    
        }
        }

        



    return (
        <ProductContext.Provider value={{createProduct, productos, loading}}>
            {children}
        </ProductContext.Provider>
    )
}