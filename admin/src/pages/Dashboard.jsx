import React from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingBag, 
  Search, 
  Filter, 
  Edit3, 
  Trash2,
  ArrowUpRight,
  MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  // Mock Data for the Stats
  const stats = [
    { label: 'Total Revenue', value: '$12,450.00', grow: '+12.5%', icon: <DollarSign size={24}/>, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Orders', value: '456', grow: '+5.2%', icon: <ShoppingBag size={24}/>, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Customers', value: '2,890', grow: '+18.1%', icon: <Users size={24}/>, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto w-full space-y-10">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800">Store Overview</h1>
          <p className="text-slate-500 font-medium">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-600 hover:bg-slate-50 transition-all text-sm flex items-center gap-2">
            Download Report <ArrowUpRight size={16}/>
          </button>
        </div>
      </header>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-emerald-500 text-[10px] font-bold flex items-center">
                  <TrendingUp size={12} className="mr-1"/> {stat.grow}
                </span>
                <span className="text-slate-300 text-[10px] font-medium italic">vs last month</span>
              </div>
            </div>
            <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* RECENT PRODUCTS TABLE */}
      <section className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Recent Inventory</h2>
            <p className="text-xs text-slate-400 font-medium mt-1">Manage your most recently added items</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="Find product..." 
                className="pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full text-sm font-medium" 
              />
            </div>
            <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-colors">
              <Filter size={20}/>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
                <th className="px-8 py-4">Product Name</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Price</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: 'Space Grey Headphones', price: '$299', stock: 'In Stock', color: 'text-emerald-500' },
                { name: 'Leather Smart Watch', price: '$150', stock: 'Low Stock', color: 'text-orange-500' },
                { name: 'Mechanical Keyboard', price: '$89', stock: 'Out of Stock', color: 'text-red-500' },
              ].map((item, index) => (
                <tr key={index} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-slate-700 text-sm">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">SKU: NEX-00{index + 1}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg bg-white border border-slate-100 shadow-sm ${item.color}`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="font-black text-slate-800 text-sm">{item.price}</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <Edit3 size={18}/>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-slate-50/30 text-center">
          <button className="text-xs font-bold text-blue-600 hover:underline">View All Inventory</button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;