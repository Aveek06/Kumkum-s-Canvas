
import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, CheckCircle2, XCircle, 
  BarChart3, LayoutGrid, LogOut, Save, Image as ImageIcon,
  DollarSign, Package, CheckCircle, PlusCircle, MinusCircle
} from 'lucide-react';
import { ARTIST_NAME, ADMIN_PASSWORD, getPersistentArtworks, savePersistentArtworks } from '../constants';
import { Artwork, PrintOption } from '../types';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Artwork>>({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setArtworks(getPersistentArtworks());
    if (sessionStorage.getItem('admin_logged_in') === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      sessionStorage.setItem('admin_logged_in', 'true');
    } else {
      alert('Invalid Password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('admin_logged_in');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedArtworks: Artwork[];
    
    const sanitizedData = {
      ...formData,
      price: Number(formData.price || 0),
      printPrices: (formData.printPrices || []).map(p => ({ ...p, price: Number(p.price) }))
    };
    
    if (editingId) {
      updatedArtworks = artworks.map(art => 
        art.id === editingId ? { ...art, ...sanitizedData } as Artwork : art
      );
    } else {
      const newArtwork = {
        ...sanitizedData,
        id: Date.now().toString(),
        available: formData.available ?? true,
      } as Artwork;
      updatedArtworks = [newArtwork, ...artworks];
    }
    
    setArtworks(updatedArtworks);
    savePersistentArtworks(updatedArtworks);
    setShowForm(false);
    setEditingId(null);
    setFormData({});
  };

  const deleteArtwork = (id: string) => {
    if (window.confirm('Are you sure you want to remove this artwork?')) {
      const updated = artworks.filter(art => art.id !== id);
      setArtworks(updated);
      savePersistentArtworks(updated);
    }
  };

  const startEdit = (artwork: Artwork) => {
    setEditingId(artwork.id);
    setFormData({ ...artwork });
    setShowForm(true);
  };

  const addPrintOption = () => {
    const current = formData.printPrices || [];
    setFormData({ ...formData, printPrices: [...current, { size: '', price: 0 }] });
  };

  const updatePrintOption = (index: number, field: keyof PrintOption, value: string | number) => {
    const current = [...(formData.printPrices || [])];
    current[index] = { ...current[index], [field]: value };
    setFormData({ ...formData, printPrices: current });
  };

  const removePrintOption = (index: number) => {
    const current = [...(formData.printPrices || [])];
    current.splice(index, 1);
    setFormData({ ...formData, printPrices: current });
  };

  const toggleAvailability = (id: string) => {
    const updated = artworks.map(art => 
      art.id === id ? { ...art, available: !art.available } : art
    );
    setArtworks(updated);
    savePersistentArtworks(updated);
  };

  const stats = {
    total: artworks.length,
    sold: artworks.filter(a => !a.available).length,
    available: artworks.filter(a => a.available).length,
    totalValue: artworks.reduce((acc, curr) => acc + curr.price, 0),
    soldValue: artworks.filter(a => !a.available).reduce((acc, curr) => acc + curr.price, 0)
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-slate-950 mb-2">Admin Portal</h2>
            <p className="text-slate-500 text-sm font-medium">Protecting {ARTIST_NAME}'s Digital Studio</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-3">Master Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 outline-none smooth-transition text-slate-900 font-bold"
                placeholder="••••••••"
                required
              />
            </div>
            <button className="w-full bg-slate-950 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-600 smooth-transition shadow-xl shadow-slate-200">
              Unlock Studio
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-slate-950">Management Suite</h1>
            <p className="text-slate-500 font-medium">Curate and monitor your digital gallery</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => { setShowForm(true); setEditingId(null); setFormData({ printPrices: [] }); }}
              className="bg-amber-400 text-slate-950 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-amber-500 smooth-transition shadow-lg shadow-amber-200"
            >
              <Plus size={16} /> New Artwork
            </button>
            <button 
              onClick={handleLogout}
              className="bg-white text-slate-400 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-slate-100 hover:text-rose-500 smooth-transition shadow-sm"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<Package className="text-sky-600" />} label="Total Works" value={stats.total} />
          <StatCard icon={<CheckCircle className="text-emerald-600" />} label="Sold" value={stats.sold} />
          <StatCard icon={<LayoutGrid className="text-amber-600" />} label="Available" value={stats.available} />
          <StatCard icon={<DollarSign className="text-slate-950" />} label="Revenue" value={`₹${stats.soldValue.toLocaleString('en-IN')}`} />
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-black text-slate-400">Artwork</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-black text-slate-400">Original Price</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-black text-slate-400">Print Variations</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-black text-slate-400">Status</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-widest font-black text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {artworks.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/50 smooth-transition">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={art.imageUrl} className="w-16 h-16 rounded-xl object-cover border border-slate-100" alt={art.title} />
                        <div>
                          <p className="font-bold text-slate-950">{art.title}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">{art.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <p className="font-black text-slate-950">₹{art.price.toLocaleString('en-IN')}</p>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-[10px] font-black text-amber-600 uppercase">
                         {art.printPrices?.length || 0} Size Options
                       </p>
                    </td>
                    <td className="px-8 py-6">
                       <button 
                        onClick={() => toggleAvailability(art.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          art.available 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                            : 'bg-rose-50 text-rose-500 border-rose-100'
                        }`}
                       >
                         {art.available ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                         {art.available ? 'Available' : 'Sold'}
                       </button>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(art)} className="p-3 text-slate-400 hover:text-amber-600 hover:bg-white rounded-xl smooth-transition border border-transparent hover:border-slate-100">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => deleteArtwork(art.id)} className="p-3 text-slate-400 hover:text-rose-500 hover:bg-white rounded-xl smooth-transition border border-transparent hover:border-slate-100">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowForm(false)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
             <div className="p-8 md:p-12 h-[85vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-serif font-bold text-slate-950">
                    {editingId ? 'Refine Artwork' : 'Curate New Artwork'}
                  </h2>
                  <button onClick={() => setShowForm(false)} className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-slate-950 transition-colors">
                    <XCircle size={24} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <FormGroup label="Artwork Title" name="title" value={formData.title} onChange={(v) => setFormData({...formData, title: v})} required />
                    <FormGroup label="Image URL (./name.png)" name="imageUrl" value={formData.imageUrl} onChange={(v) => setFormData({...formData, imageUrl: v})} required icon={<ImageIcon size={18} />} />
                    
                    <div className="grid grid-cols-1 gap-4">
                      <FormGroup label="Original Canvas Price (INR)" type="number" name="price" value={formData.price} onChange={(v) => setFormData({...formData, price: v})} required />
                    </div>

                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[10px] uppercase tracking-widest font-black text-slate-400">Print Pricing Options</h3>
                        <button type="button" onClick={addPrintOption} className="text-amber-600 hover:text-amber-700 smooth-transition">
                          <PlusCircle size={24} />
                        </button>
                      </div>
                      
                      {formData.printPrices?.map((option, idx) => (
                        <div key={idx} className="flex gap-3 items-end animate-in fade-in slide-in-from-top-2">
                          <div className="flex-grow">
                            <label className="text-[8px] uppercase font-black text-slate-400 ml-1 mb-1 block">Size Name</label>
                            <input 
                              type="text" 
                              value={option.size} 
                              placeholder='e.g. A3 or 12"x18"'
                              onChange={(e) => updatePrintOption(idx, 'size', e.target.value)}
                              className="w-full px-4 py-2 rounded-xl bg-white border border-slate-100 text-sm font-bold outline-none focus:border-amber-400"
                            />
                          </div>
                          <div className="w-24">
                            <label className="text-[8px] uppercase font-black text-slate-400 ml-1 mb-1 block">Price</label>
                            <input 
                              type="number" 
                              value={option.price} 
                              onChange={(e) => updatePrintOption(idx, 'price', e.target.value)}
                              className="w-full px-4 py-2 rounded-xl bg-white border border-slate-100 text-sm font-bold outline-none focus:border-amber-400"
                            />
                          </div>
                          <button type="button" onClick={() => removePrintOption(idx)} className="p-2 text-rose-400 hover:text-rose-600 smooth-transition">
                            <MinusCircle size={20} />
                          </button>
                        </div>
                      ))}
                      
                      {(!formData.printPrices || formData.printPrices.length === 0) && (
                        <p className="text-center text-[10px] text-slate-400 italic py-4">No print options added yet.</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormGroup label="Dimensions" name="size" value={formData.size} onChange={(v) => setFormData({...formData, size: v})} placeholder="e.g. 24x36" />
                      <FormGroup label="Category" name="category" value={formData.category} onChange={(v) => setFormData({...formData, category: v as any})} placeholder="Nature" />
                    </div>
                    <FormGroup label="Medium" name="medium" value={formData.medium} onChange={(v) => setFormData({...formData, medium: v})} placeholder="Oil on Canvas" />
                    <FormGroup label="Short Description" name="description" value={formData.description} onChange={(v) => setFormData({...formData, description: v})} textarea />
                    <FormGroup label="The Story" name="story" value={formData.story} onChange={(v) => setFormData({...formData, story: v})} textarea />
                    <FormGroup label="Inspiration Source" name="inspiration" value={formData.inspiration} onChange={(v) => setFormData({...formData, inspiration: v})} textarea />
                    
                    <div className="flex items-center gap-6 pt-4">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={formData.available ?? true} 
                          onChange={(e) => setFormData({...formData, available: e.target.checked})}
                          className="w-6 h-6 rounded-lg text-emerald-500 focus:ring-emerald-500 border-slate-200 smooth-transition"
                        />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 smooth-transition">Available for Sale</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={formData.isFeatured || false} 
                          onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                          className="w-6 h-6 rounded-lg text-amber-500 focus:ring-amber-500 border-slate-200 smooth-transition"
                        />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 smooth-transition">Featured Masterpiece</span>
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-2 pt-8">
                    <button className="w-full bg-slate-950 text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 hover:bg-amber-600 smooth-transition shadow-2xl hover:scale-[1.01] active:scale-95">
                      <Save size={20} />
                      {editingId ? 'Update Masterpiece' : 'List in Gallery'}
                    </button>
                  </div>
                </form>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
      <h3 className="text-[10px] uppercase tracking-widest font-black text-slate-400">{label}</h3>
    </div>
    <p className="text-3xl font-serif font-black text-slate-950">{value}</p>
  </div>
);

const FormGroup = ({ label, icon, textarea, ...props }: any) => (
  <div>
    <label className="block text-[10px] uppercase tracking-widest font-black text-slate-400 mb-3 ml-2">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
      {textarea ? (
        <textarea 
          {...props}
          rows={3}
          onChange={(e) => props.onChange(e.target.value)}
          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 outline-none smooth-transition text-slate-900 font-bold resize-none"
        />
      ) : (
        <input 
          {...props}
          onChange={(e) => props.onChange(e.target.value)}
          className={`w-full ${icon ? 'pl-16' : 'px-6'} py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 outline-none smooth-transition text-slate-900 font-bold`}
        />
      )}
    </div>
  </div>
);

export default Admin;
