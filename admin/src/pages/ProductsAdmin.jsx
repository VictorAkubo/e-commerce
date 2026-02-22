import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/AdminContext'; 
import { Search, Plus, Edit, Trash2, Package, X } from 'lucide-react';

const ProductsAdmin = ({setActiveTab}) => {
  const { allProducts, setAllProducts } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const filteredProducts = allProducts?.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      setAllProducts(allProducts.filter(p => p._id !== id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      {/* Header - Stacks on Mobile */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Product Inventory</h1>
          <p className="text-slate-500 text-sm">Managing {allProducts?.length || 0} items</p>
        </div>
        <button onClick={()=>setActiveTab("add-product")} className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 flex items-center justify-center gap-2 transition shadow-sm">
          <Plus size={18} /> New Product
        </button>
      </div>

      {/* Bulk Action Bar - Made responsive */}
      {selectedProducts.length > 0 && (
        <div className="bg-indigo-900 text-white p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-3 justify-between items-center">
          <span className="font-medium text-sm">{selectedProducts.length} items selected</span>
          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={() => setIsBulkModalOpen(true)} className="flex-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-sm transition text-center">Update Stock</button>
            <button className="flex-1 bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg text-sm transition text-center">Delete</button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- THE FIX: TABLE SCROLLING --- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Added overflow-x-auto to allow horizontal swipe on mobile */}
        <div className="overflow-x-auto">
          {/* Added min-w to prevent column squishing */}
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="p-4 w-10">
                  <input type="checkbox" onChange={(e) => setSelectedProducts(e.target.checked ? allProducts.map(p => p._id) : [])}/>
                </th>
                <th className="p-4">Product</th>
                <th className="p-4 text-center">Pricing</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4">Attributes</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts?.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50 transition">
                  <td className="p-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => toggleSelect(product._id)}
                      className="rounded text-indigo-600 border-slate-300" 
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={product.img} alt="" className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover bg-slate-100 flex-shrink-0" />
                      <div className="max-w-[150px] md:max-w-xs">
                        <div className="font-bold text-slate-800 truncate text-sm md:text-base">{product.name}</div>
                        <div className="text-xs text-slate-400">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="text-sm font-bold text-slate-900">${product.price}</div>
                    {product.oldPrice && <div className="text-xs text-slate-400 line-through">${product.oldPrice}</div>}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold border ${product.stock < 5 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                      {product.stock} Units
                    </span>
                  </td>
                  <td className="p-4">
                     <div className="flex gap-1">
                        {product.colors?.map(color => (
                          <span key={color} className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: color }} />
                        ))}
                     </div>
                     <div className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">{product.sizes?.join(' • ')}</div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1 md:gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(product._id)} className="p-2 text-slate-400 hover:text-red-500 transition"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Swipe indicator for mobile users */}
        <div className="md:hidden text-center py-2 text-[10px] text-slate-400 border-t bg-slate-50 italic">
          Swipe left to see more details →
        </div>
      </div>
    </div>
  );
};

export default ProductsAdmin;