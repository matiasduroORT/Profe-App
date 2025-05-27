import { createContext, useContext, useEffect, useState } from "react";


const ProductContext = createContext()

export const useProducts = () => useContext(ProductContext)

export const ProductProvider = ({children}) => {

    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true);
    
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
            const newProduct = {
                id: Date.now(),
                title,
                description,
                price: Number(price),
                image: imageUri
            }

            console.log("new Product: ", newProduct);
            

            setProductos(prev => [newProduct, ...prev])
        }

        



    return (
        <ProductContext.Provider value={{createProduct, productos, loading}}>
            {children}
        </ProductContext.Provider>
    )
}