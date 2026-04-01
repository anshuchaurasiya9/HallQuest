
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components/SharedUI';
import { User, Category, City, CreatePropertyRequest } from '../types';
import { fetchCategories, fetchCities, createProperty } from '../services/venueService';

const AMENITY_CATEGORIES = [
  {
    name: 'CORE INFRASTRUCTURE',
    items: [
      { id: 'valet', label: 'VALET PARKING', icon: '🚗' },
      { id: 'power', label: 'FULL POWER', icon: '⚡' },
      { id: 'ac', label: 'AC / CLIMATE', icon: '❄️' },
    ]
  },
  {
    name: 'HOSPITALITY',
    items: [
      { id: 'chef', label: 'IN-HOUSE CHEF', icon: '👨‍🍳' },
      { id: 'bar', label: 'BAR LICENSE', icon: '🍸' },
      { id: 'suite', label: 'BRIDAL SUITE', icon: '👰' },
    ]
  },
  {
    name: 'TECHNOLOGY & OUTDOORS',
    items: [
      { id: 'wifi', label: 'HIGH SPEED WIFI', icon: '📶' },
      { id: 'led', label: 'LED WALL', icon: '📺' },
      { id: 'garden', label: 'GARDEN ACCESS', icon: '🌿' },
    ]
  }
];

const ListYourVenueScreen: React.FC<{ 
  user: User; 
  onBack: () => void;
  onSuccess: () => void;
}> = ({ user, onBack, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    city_id: '',
    category_id: '',
    contact_number: '',
    guest_capacity: '',
    price: '',
    pan_number: '',
    gst_number: '',
    latitude: '17.3850', // Default Hyderabad
    longitude: '78.4867',
    owner_id: user.id.toString(),
    owner_name: '',
    address: '',
    pincode: ''
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<File[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const totalSteps = 4;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, cityRes] = await Promise.all([fetchCategories(), fetchCities()]);
        if (catRes.success) setCategories(catRes.data);
        if (cityRes.success) setCities(cityRes.data);
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    };
    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' = 'image') => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      if (type === 'image') {
        setUploadedImages((prev) => [...prev, ...newFiles].slice(0, 8));
        newFiles.forEach((file: File) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreviews((prev) => [...prev, reader.result as string].slice(0, 8));
          };
          reader.readAsDataURL(file);
        });
      } else {
        setUploadedVideos((prev) => [...prev, ...newFiles].slice(0, 2));
        newFiles.forEach((file: File) => {
          const url = URL.createObjectURL(file);
          setVideoPreviews((prev) => [...prev, url].slice(0, 2));
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (!user.token) {
      alert('Authentication token missing. Please log in again.');
      return;
    }
    
    setIsLoading(true);
    try {
      const request: CreatePropertyRequest = {
        ...formData,
        images: uploadedImages,
        videos: uploadedVideos,
      };
      
      const response = await createProperty(request, user.token);
      if (response.success) {
        alert('Venue listed successfully!');
        onSuccess();
      } else {
        alert(response.message || 'Failed to list venue');
      }
    } catch (error: any) {
      alert(error.message || 'An error occurred while listing the venue');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setUploadedVideos(prev => prev.filter((_, i) => i !== index));
    setVideoPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 md:space-y-12 animate-fadeIn">
            <div className="bg-indigo-50/50 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] flex items-center space-x-4 md:space-x-6 border border-indigo-100/50">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-sm">👤</div>
              <div>
                <p className="text-[8px] md:text-[10px] font-black text-indigo-400 uppercase tracking-widest">Business Representative</p>
                <h2 className="text-xl md:text-2xl font-black text-slate-800 poppins">Primary Contact Person</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2 md:space-y-3">
                <label className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                <input name="owner_name" value={formData.owner_name || ''} onChange={handleInputChange} placeholder="Owner or Manager Name" className="w-full p-4 md:p-6 bg-slate-50/50 rounded-2xl md:rounded-3xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-700 font-bold transition-all text-base md:text-lg" />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Official Phone</label>
                <input name="contact_number" value={formData.contact_number || ''} onChange={handleInputChange} placeholder="+91 (000) 000-0000" className="w-full p-4 md:p-6 bg-slate-50/50 rounded-2xl md:rounded-3xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-700 font-bold transition-all text-base md:text-lg" />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Business PAN Card</label>
                <input name="pan_number" value={formData.pan_number || ''} onChange={handleInputChange} placeholder="10 DIGIT PAN NUMBER" className="w-full p-4 md:p-6 bg-slate-50/50 rounded-2xl md:rounded-3xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-700 font-bold transition-all text-base md:text-lg uppercase" />
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">GSTIN Certificate</label>
                <input name="gst_number" value={formData.gst_number || ''} onChange={handleInputChange} placeholder="GST REGISTRATION NUMBER" className="w-full p-4 md:p-6 bg-slate-50/50 rounded-2xl md:rounded-3xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-700 font-bold transition-all text-base md:text-lg uppercase" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 md:space-y-10 animate-fadeIn">
            <div className="space-y-3 md:space-y-4">
              <div className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-brand-accent rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black text-brand-primary uppercase tracking-widest border border-brand-primary/10">
                Phase 02
              </div>
              <h2 className="text-2xl md:text-4xl font-black poppins text-slate-900 tracking-tight">Venue Profile & Location</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2 md:space-y-3 md:col-span-2">
                <label className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Hall Display Name</label>
                <input name="title" value={formData.title || ''} onChange={handleInputChange} placeholder="e.g. Royal Imperial Gardens" className="w-full p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900 font-bold transition-all text-base md:text-lg" />
              </div>
              
              <div className="space-y-2 md:space-y-3">
                <label className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Primary Category</label>
                <select name="category_id" value={formData.category_id || ''} onChange={handleInputChange} className="w-full p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900 font-bold transition-all text-base md:text-lg appearance-none">
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              
              <div className="space-y-2 md:space-y-3">
                <label className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Guest Capacity</label>
                <input name="guest_capacity" value={formData.guest_capacity || ''} onChange={handleInputChange} placeholder="Max capacity (e.g. 1500)" className="w-full p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900 font-bold transition-all text-base md:text-lg" />
              </div>

              <div className="space-y-2 md:space-y-3">
                <label className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Price per Event (₹)</label>
                <input name="price" value={formData.price || ''} onChange={handleInputChange} placeholder="e.g. 50000" className="w-full p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900 font-bold transition-all text-base md:text-lg" />
              </div>

              <div className="space-y-2 md:space-y-3">
                <label className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">City / Town</label>
                <select name="city_id" value={formData.city_id || ''} onChange={handleInputChange} className="w-full p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900 font-bold transition-all text-base md:text-lg appearance-none">
                  <option value="">Select City</option>
                  {cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
                </select>
              </div>

              <div className="space-y-2 md:space-y-3 md:col-span-2">
                <label className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Street Address</label>
                <textarea name="address" value={formData.address || ''} onChange={handleInputChange} rows={2} placeholder="Building No, Street Name, Sector, Near Landmark..." className="w-full p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900 font-bold transition-all text-base md:text-lg" />
              </div>

              <div className="space-y-2 md:space-y-3">
                <label className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Pin Code / ZIP</label>
                <input name="pincode" value={formData.pincode || ''} onChange={handleInputChange} placeholder="6-digit PIN" className="w-full p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border-2 border-pink-50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary text-slate-900 font-bold transition-all text-base md:text-lg" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 md:space-y-12 animate-fadeIn">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-black poppins text-slate-900 tracking-tight">Amenities Selection</h2>
              <p className="text-sm md:text-slate-400 font-medium">Select all the features your venue offers to guests.</p>
            </div>
            
            <div className="space-y-10 md:space-y-16">
              {AMENITY_CATEGORIES.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-6 md:space-y-8">
                   <div className="flex items-center space-x-4">
                    <span className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-[0.3em]">{cat.name}</span>
                    <div className="h-px flex-1 bg-slate-100"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {cat.items.map((item) => (
                      <label 
                        key={item.id}
                        className={`group relative p-5 md:p-6 rounded-2xl md:rounded-3xl flex items-center space-x-4 transition-all duration-300 border-2 cursor-pointer ${selectedAmenities.includes(item.id) ? 'bg-brand-accent/20 border-brand-primary shadow-md' : 'bg-white border-slate-100 hover:border-pink-200 hover:shadow-sm'}`}
                      >
                        <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox" 
                            className="peer appearance-none w-6 h-6 md:w-7 md:h-7 rounded-lg border-2 border-slate-200 checked:bg-brand-primary checked:border-brand-primary transition-all cursor-pointer"
                            checked={selectedAmenities.includes(item.id)}
                            onChange={() => toggleAmenity(item.id)}
                          />
                          <span className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none text-xs md:text-sm font-black">✓</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                          <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors ${selectedAmenities.includes(item.id) ? 'text-brand-primary' : 'text-slate-500'}`}>
                            {item.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 md:space-y-12 animate-fadeIn">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-black poppins text-slate-900 tracking-tight">Visual Showcase</h2>
              <p className="text-sm md:text-slate-400 font-medium">Your first impression starts with these photos and videos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 md:border-4 border-dashed border-indigo-100 rounded-3xl md:rounded-[3rem] p-8 md:p-12 text-center space-y-4 hover:bg-indigo-50/30 transition-all cursor-pointer group bg-slate-50/30"
              >
                <input type="file" ref={fileInputRef} multiple accept="image/*" onChange={(e) => handleFileChange(e, 'image')} className="hidden" />
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mx-auto shadow-xl group-hover:rotate-12 transition-transform">📸</div>
                <div className="space-y-1">
                  <h3 className="text-lg md:text-xl font-black text-slate-800 poppins">Upload Photos</h3>
                  <p className="text-slate-400 font-medium text-[10px] md:text-xs">Landscape 16:9 ratio preferred.</p>
                </div>
                <div className="inline-flex bg-indigo-600 text-white px-6 py-2 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg">Select Photos</div>
              </div>

              <div 
                onClick={() => videoInputRef.current?.click()}
                className="relative border-2 md:border-4 border-dashed border-pink-100 rounded-3xl md:rounded-[3rem] p-8 md:p-12 text-center space-y-4 hover:bg-pink-50/30 transition-all cursor-pointer group bg-slate-50/30"
              >
                <input type="file" ref={videoInputRef} multiple accept="video/*" onChange={(e) => handleFileChange(e, 'video')} className="hidden" />
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mx-auto shadow-xl group-hover:-rotate-12 transition-transform">🎥</div>
                <div className="space-y-1">
                  <h3 className="text-lg md:text-xl font-black text-slate-800 poppins">Upload Videos</h3>
                  <p className="text-slate-400 font-medium text-[10px] md:text-xs">Short clips of your venue.</p>
                </div>
                <div className="inline-flex bg-brand-primary text-white px-6 py-2 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg">Select Videos</div>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="space-y-8">
              {/* Photo Gallery */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2 md:px-4">
                  <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Photo Gallery ({uploadedImages.length}/8)</p>
                  {uploadedImages.length > 0 && <button onClick={() => { setUploadedImages([]); setImagePreviews([]); }} className="text-[8px] md:text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline">Clear All</button>}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {[...Array(8)].map((_, i) => {
                    const image = uploadedImages[i];
                    return (
                      <div key={i} className="aspect-square bg-slate-50 rounded-2xl md:rounded-[2rem] border-2 border-dashed border-slate-100 flex items-center justify-center relative overflow-hidden group">
                        {image ? (
                          <>
                            <img src={imagePreviews[i]} className="w-full h-full object-cover" alt={`Venue ${i + 1}`} />
                            <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button onClick={(e) => { e.stopPropagation(); removeImage(i); }} className="bg-white/20 backdrop-blur-md p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-white/40 transition-colors">🗑️</button>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center space-y-1 md:space-y-2 opacity-30 group-hover:opacity-60 transition-opacity">
                             <div className="text-xl md:text-2xl">🖼️</div>
                             <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Reserved</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Video Gallery */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2 md:px-4">
                  <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Video Gallery ({uploadedVideos.length}/2)</p>
                  {uploadedVideos.length > 0 && <button onClick={() => { setUploadedVideos([]); setVideoPreviews([]); }} className="text-[8px] md:text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline">Clear All</button>}
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {[...Array(2)].map((_, i) => {
                    const video = uploadedVideos[i];
                    return (
                      <div key={i} className="aspect-video bg-slate-50 rounded-2xl md:rounded-[2rem] border-2 border-dashed border-slate-100 flex items-center justify-center relative overflow-hidden group">
                        {video ? (
                          <>
                            <video src={videoPreviews[i]} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button onClick={(e) => { e.stopPropagation(); removeVideo(i); }} className="bg-white/20 backdrop-blur-md p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-white/40 transition-colors">🗑️</button>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center space-y-1 md:space-y-2 opacity-30 group-hover:opacity-60 transition-opacity">
                             <div className="text-xl md:text-2xl">🎬</div>
                             <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">Reserved</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar pb-32">
      <nav className="p-6 md:p-12 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-xl z-50 border-b border-slate-50">
        <button onClick={onBack} className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl shadow-xl flex items-center justify-center text-lg hover:text-brand-primary transition-all border border-slate-50 active:scale-90">←</button>
        <div className="flex flex-col items-end">
          <p className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-2 md:mb-3">Onboarding Step {step}/4</p>
          <div className="flex space-x-1.5 md:space-x-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div key={i} className={`h-1.5 md:h-2 rounded-full transition-all duration-700 ${i + 1 <= step ? 'w-8 md:w-10 bg-brand-primary' : 'w-2 md:w-3 bg-slate-100'}`} />
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto w-full px-4 md:px-6 py-8 md:py-12">
        <div className="space-y-8 md:space-y-12">
          {renderStep()}
          
          <div className="pt-8 md:pt-12 flex flex-col sm:flex-row gap-4 md:gap-6">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)} 
                className="flex-1 py-4 md:py-6 rounded-2xl md:rounded-[2rem] border-2 border-slate-100 font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary hover:border-brand-primary/20 transition-all active:scale-95 text-sm md:text-base"
              >
                Back
              </button>
            )}
            <Button 
              label={step === totalSteps ? (isLoading ? "Submitting..." : "Finish Registration") : "Save & Continue"} 
              fullWidth 
              disabled={isLoading}
              onClick={() => step < totalSteps ? setStep(step + 1) : handleSubmit()} 
              className="flex-[2] py-4 md:py-6 shadow-2xl shadow-pink-100 text-base md:text-lg" 
            />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default ListYourVenueScreen;
