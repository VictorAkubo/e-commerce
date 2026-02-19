import { useState } from 'react'
import Sidebar from "./components/Sidebar.jsx"
// Ensure these paths match your actual folder structure!
import Dashboard from "./pages/Dashboard.jsx" 
import AddProduct from "./pages/AddProduct.jsx" // Rename the upload component to this for clarity

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar handles changing the activeTab */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto">
        {/* VIEW 1: The Main Stats & Table */}
        {activeTab === 'overview' && <Dashboard />}

        {/* VIEW 2: The Upload Form */}
        {activeTab === 'add-product' && <AddProduct />}
        
        {/* Add more views as you build them (Orders, Settings, etc.) */}
      </main>
    </div>
  )
}

export default App