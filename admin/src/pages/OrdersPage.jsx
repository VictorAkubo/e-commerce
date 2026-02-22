import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/AdminContext'; // Consuming your context
import { Search, Eye, Package, Clock, CheckCircle, X, MapPin, Truck } from 'lucide-react';

const OrdersPage = () => {
  // Using the same context you have for products
  const { allProducts } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingOrder, setViewingOrder] = useState(null);

  // Mock Orders Data (In a real app, this might come from an 'allOrders' context)
  // Note: 'items' contains IDs that link to your allProducts context
  const [orders, setOrders] = useState([
    {
      _id: "ORD-99210",
      customer: "Sarah Jenkins",
      email: "sarah@example.com",
      status: "Processing",
      date: "Feb 22, 2026",
      items: [
        { productId: "65d1a...", quantity: 1, price: 120 },
      ],
      total: 120,
      address: "123 Tech Lane, NY"
    }
  ]);

  const getStatusStyle = (status) => {
    const styles = {
      Completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      Processing: 'bg-amber-100 text-amber-700 border-amber-200',
      Shipped: 'bg-blue-100 text-blue-700 border-blue-200',
      Cancelled: 'bg-red-100 text-red-700 border-red-200',
    };
    return styles[status] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="text-sm text-slate-500">Track and manage customer purchases</p>
      </div>

      {/* Stats Quick Look */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Pending', count: 12, icon: Clock, color: 'text-amber-600' },
          { label: 'Completed', count: 145, icon: CheckCircle, color: 'text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-slate-500">{stat.label}</span>
              <stat.icon size={18} className={stat.color} />
            </div>
            <div className="text-2xl font-bold mt-2">{stat.count}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Table - Desktop + Mobile Scroll Fix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase">Order ID</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase">Customer</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase">Total</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase">Date</th>
                <th className="p-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 font-mono text-sm text-indigo-600 font-medium">{order._id}</td>
                  <td className="p-4">
                    <div className="text-sm font-bold text-slate-800">{order.customer}</div>
                    <div className="text-xs text-slate-400">{order.email}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900">${order.total}</td>
                  <td className="p-4 text-sm text-slate-500">{order.date}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setViewingOrder(order)}
                      className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden text-center py-3 bg-slate-50 text-[10px] text-slate-400 italic border-t">
          Swipe to see all columns →
        </div>
      </div>

      {/* Slide-over Order Details Panel */}
      {viewingOrder && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40" onClick={() => setViewingOrder(null)} />
          
          {/* Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Order Details</h2>
                <p className="text-xs text-slate-500 font-mono">{viewingOrder._id}</p>
              </div>
              <button onClick={() => setViewingOrder(null)} className="p-2 hover:bg-white rounded-full shadow-sm"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Customer Info */}
              <section>
                <div className="flex items-center gap-2 mb-3 text-indigo-600">
                  <MapPin size={18} />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Shipping To</h3>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="font-bold text-slate-800">{viewingOrder.customer}</p>
                  <p className="text-sm text-slate-600 mt-1">{viewingOrder.address}</p>
                </div>
              </section>

              {/* Items List */}
              <section>
                <div className="flex items-center gap-2 mb-3 text-indigo-600">
                  <Package size={18} />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Order Items</h3>
                </div>
                <div className="space-y-3">
                  {viewingOrder.items.map((item, idx) => {
                    // Finding product image from your ProductContext
                    const productInfo = allProducts?.find(p => p._id === item.productId);
                    return (
                      <div key={idx} className="flex items-center gap-4 p-3 border rounded-xl">
                        <img src={productInfo?.img || '/placeholder.png'} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800 truncate">{productInfo?.name || "Product"}</p>
                          <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-slate-900">${item.price}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className="p-6 border-t bg-slate-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500">Total Amount</span>
                <span className="text-xl font-bold text-slate-900">${viewingOrder.total}</span>
              </div>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition">
                <Truck size={20} /> Mark as Shipped
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;