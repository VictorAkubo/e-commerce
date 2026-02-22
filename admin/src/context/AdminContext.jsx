import {createContext,useState,useEffect} from "react"
export const ProductContext = createContext(null)
const ProductContextProvider
=({children})=>{
  const [allProducts,setAllProducts] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.product);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  return(
    <ProductContext.Provider value={{allProducts,setAllProducts}}>
      {children}
    </ProductContext.Provider>
    )
}

export default ProductContextProvider