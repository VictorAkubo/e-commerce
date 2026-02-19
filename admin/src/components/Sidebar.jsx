import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  Settings, 
  LogOut, 
  Package, 
  Menu, 
  X,
  Zap 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20}/> },
    { id: 'products', label: 'All Products', icon: <ShoppingBag size={20}/> },
    { id: 'add-product', label: 'Add New', icon: <PlusCircle size={20}/> },
    { id: 'orders', label: 'Orders', icon: <Package size={20}/> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20}/> },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* --- MOBILE HAMBURGER BUTTON --- */}
      <button 
        onClick={toggleSidebar}
        className={`fixed top-6 left-4 
  ${isOpen ? "translate-x-55" : "translate-x-0"} 
  z-50 p-2 bg-white rounded-xl shadow-lg border border-slate-200 
  md:hidden text-slate-600 hover:text-blue-600 
  transition-all duration-300 ease-in-out active:scale-90`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* --- OVERLAY FOR MOBILE --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* --- SIDEBAR PANEL --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:flex md:flex-col
      `}>
        
        {/* LOGO SECTION */}
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 rotate-3">
            <Zap size={22} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-800 leading-none">Nexus</h1>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">Admin Studio</span>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false); // Close sidebar on mobile after clicking
              }}
              className={`
                w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group
                ${activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-[1.02]' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <span className={`transition-transform duration-300 ${activeTab === item.id ? 'rotate-0' : 'group-hover:rotate-12'}`}>
                {item.icon}
              </span>
              <span className="font-bold text-sm tracking-wide">{item.label}</span>
              
              {activeTab === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* BOTTOM SECTION */}
        <div className="p-6 mt-auto">
          <div className="bg-slate-50 rounded-2xl p-4 mb-4 border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-600 border-2 border-white shadow-sm" />
              <div className="overflow-hidden">
                <p className="text-xs font-black text-slate-700 truncate">Store Manager</p>
                <p className="text-[10px] text-slate-400 truncate">admin@nexus.com</p>
              </div>
            </div>
          </div>
          
          <button className="w-full flex items-center gap-3 p-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;