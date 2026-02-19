import React from 'react';
import { Edit3, Trash2, ExternalLink, Search, Filter } from 'lucide-react';

const ProductList = ({ products = [] }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800">Inventory</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search products..." className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full text-sm" />
          </div>
          <button className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100"><Filter size={20}/></button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {/* Map your MongoDB products here */}
            {[1, 2, 3].map((item) => (
              <tr key={item} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden">
                       <img src="https://via.placeholder.com/50" alt="prod" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 text-sm">Premium Wireless Headphones</p>
                      <p className="text-xs text-slate-400 font-medium">ID: #PROD-9920</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-500">Electronics</td>
                <td className="px-6 py-4 font-bold text-slate-700">$299.00</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${item === 3 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {item === 3 ? 'Out of Stock' : '24 in Stock'}
                  </span>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-1.5 text-blue-600 font-bold text-[10px] uppercase">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
                     Featured
                   </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={18}/></button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};