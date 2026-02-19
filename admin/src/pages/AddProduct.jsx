import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, X, CheckCircle2, ChevronRight, 
  Tag, Info, Star, Hash, Palette, Ruler 
} from 'lucide-react';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Schema-aligned State
  const [formData, setFormData] = useState({
    name: '',
    category: 'men', // Default value
    price: '',
    oldPrice: '',
    rating: 5,
    totalReviews: 0,
    stock: '',
    description: '',
    isFeatured: false
  });

  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Add Size on Enter
  const addSize = (e) => {
    if (e.key === 'Enter' && sizeInput.trim()) {
      e.preventDefault();
      if (!sizes.includes(sizeInput.trim().toUpperCase())) {
        setSizes([...sizes, sizeInput.trim().toUpperCase()]);
      }
      setSizeInput('');
    }
  };

  const addColor = () => {
    if (!colors.includes(currentColor)) setColors([...colors, currentColor]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Matches your Mongoose Schema exactly
    const finalData = {
      ...formData,
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice),
      rating: Number(formData.rating),
      totalReviews: Number(formData.totalReviews),
      stock: Number(formData.stock),
      colors: colors,
      sizes: sizes,
      img: imageFile // This will be handled by Multer/Cloudinary in the backend
    };

    console.log("Ready to send to MongoDB:", finalData);
    
    // Simulate API call
    await new Promise(res => setTimeout(res, 2000));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen pb-20">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Add Clothing Item</h1>
        <p className="text-slate-500 font-medium">Categorize and list new arrivals for your store.</p>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* General Details */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
              <Info size={16}/> <span>General Details</span>
            </div>
            <div className="space-y-4">
              <input name="name" type="text" placeholder="Product Name (e.g. Slim Fit Denim)" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xl font-bold outline-none focus:ring-2 focus:ring-blue-500/20" onChange={handleInputChange} required />
              <textarea name="description" rows="4" placeholder="Fabric, fit, and care instructions..." className="w-full bg-slate-50 border-none rounded-2xl p-4 outline-none font-medium text-slate-600" onChange={handleInputChange}></textarea>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
             <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-6">
              <Hash size={16}/> <span>Pricing & Inventory</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputBlock label="Price ($)" name="price" type="number" onChange={handleInputChange} />
              <InputBlock label="Old Price ($)" name="oldPrice" type="number" onChange={handleInputChange} />
              <InputBlock label="Stock Qty" name="stock" type="number" onChange={handleInputChange} />
            </div>
          </div>

          {/* Clothing specific: Colors & Sizes */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-4">
                <Palette size={14}/> <span>Color Swatches</span>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {colors.map((c, i) => (
                  <button type="button" key={i} onClick={() => setColors(colors.filter(col => col !== c))} className="w-8 h-8 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100" style={{ backgroundColor: c }} />
                ))}
                <input type="color" value={currentColor} onChange={(e) => setCurrentColor(e.target.value)} className="w-8 h-8 rounded-full border-none bg-transparent cursor-pointer" />
                <button type="button" onClick={addColor} className="text-xs font-bold text-blue-600 hover:underline">+ Add Color</button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-4">
                <Ruler size={14}/> <span>Size Tags (Press Enter)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1">
                    {s} <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => setSizes(sizes.filter(sz => sz !== s))}/>
                  </span>
                ))}
                <input type="text" placeholder="Add size..." value={sizeInput} onChange={(e) => setSizeInput(e.target.value)} onKeyDown={addSize} className="bg-transparent border-b border-slate-200 outline-none text-xs w-20" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8">
          {/* Image Upload */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 text-center">Gallery</h2>
            <div 
              onClick={() => fileInputRef.current.click()}
              className="aspect-[4/5] rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:bg-slate-50 transition-all group"
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto text-slate-300 group-hover:text-blue-500 transition-colors" size={40} />
                  <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">Upload Photo</p>
                </div>
              )}
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Category Dropdown */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase ml-1 flex items-center gap-2">
                 <Tag size={12}/> Target Category
               </label>
               <select 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange}
                className="w-full bg-slate-50 border-none rounded-xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
               >
                 <option value="men">Men</option>
                 <option value="women">Women</option>
                 <option value="children">Children</option>
               </select>
            </div>
            
            <div className="flex items-center justify-between px-2 pt-2 border-t border-slate-50">
              <label className="text-sm font-bold text-slate-700">Featured</label>
              <input name="isFeatured" type="checkbox" className="w-5 h-5 accent-blue-600" onChange={handleInputChange} />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || !imageFile}
            className={`w-full py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2 
              ${loading || !imageFile ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {loading ? "Publishing..." : <>Publish Item <ChevronRight size={20}/></>}
          </button>

          <AnimatePresence>
            {success && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-emerald-600 font-bold justify-center bg-emerald-50 py-3 rounded-2xl border border-emerald-100">
                <CheckCircle2 size={18}/> Product Listed!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
};

const InputBlock = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{label}</label>
    <input {...props} className="w-full bg-slate-50 border-none rounded-xl p-3 font-bold outline-none focus:ring-2 focus:ring-blue-500/20" />
  </div>
);

export default AddProduct;