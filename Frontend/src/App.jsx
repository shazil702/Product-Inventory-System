import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Login"
import Register from "./Components/Register"
import Dashboard from "./Components/Dashboard"
import ProductDetail from "./Components/ProductDetail"
import AddProduct from "./Components/AddProduct"

function App() {

  return (
   <BrowserRouter>
   <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/register" element={<Register/>} />
     <Route path="/dashboard" element={<Dashboard/>} />
     <Route path='/productDetail' element={<ProductDetail/>}/>
     <Route path="/add-product" element={<AddProduct/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
