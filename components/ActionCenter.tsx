
import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Camera, MapPin, Send, CheckCircle2, AlertTriangle, CloudUpload } from 'lucide-react';

export const ActionCenter: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    category: 'Waste Burning',
    description: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  return (
    <section className="max-w-[1440px] mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-[var(--text-primary)]">Citizen Action Center</h2>
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto font-light leading-relaxed">Be the change. Report localized pollution sources like stubble burning or industrial violations directly to ward officers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-10">
           <div className="flex gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)] flex items-center justify-center text-orange-500">
                <AlertTriangle size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-[var(--text-primary)]">Real-time Impact</h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">Reports are validated and assigned to ward-specific task forces within 2 hours of submission.</p>
              </div>
           </div>
           <div className="flex gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)] flex items-center justify-center text-blue-500">
                <MapPin size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-[var(--text-primary)]">Geo-Tagged Precison</h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">Using high-precision GPS to locate hotspots even in dense residential clusters.</p>
              </div>
           </div>
           <div className="flex gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)] flex items-center justify-center text-green-500">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-[var(--text-primary)]">Verified Resolution</h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">Receive before-and-after evidence once your reported hotspot is addressed.</p>
              </div>
           </div>
        </div>

        <GlassCard className="!p-0 overflow-hidden relative border-[var(--card-border)]">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center h-[550px] text-center p-8 animate-in fade-in zoom-in duration-500">
               <div className="w-20 h-20 rounded-full bg-green-500 bg-opacity-10 flex items-center justify-center text-green-500 mb-6">
                 <CheckCircle2 size={40} />
               </div>
               <h3 className="text-3xl font-bold mb-4 text-[var(--text-primary)]">Report Received</h3>
               <p className="text-[var(--text-secondary)] mb-8 max-w-xs">Your contribution is being reviewed. Our task force is on the way. Reference ID: #3942-X.</p>
               <button 
                 onClick={() => setIsSuccess(false)}
                 className="px-8 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold transition-transform hover:scale-105"
               >
                 Send Another Report
               </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Category</label>
                    <select 
                      className="w-full bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)] rounded-xl px-4 py-4 text-[var(--text-primary)] outline-none focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Waste Burning</option>
                      <option>Industrial Leak</option>
                      <option>Construction Dust</option>
                      <option>Vehicle Emissions</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Ward</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Rohini" 
                      className="w-full bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)] rounded-xl px-4 py-4 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] placeholder:opacity-40 outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Detailed Description</label>
                <textarea 
                  rows={4}
                  placeholder="Describe the situation..."
                  className="w-full bg-[var(--text-primary)] bg-opacity-5 border border-[var(--card-border)] rounded-xl px-4 py-4 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] placeholder:opacity-40 outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="p-10 border-2 border-dashed border-[var(--card-border)] rounded-3xl text-center hover:bg-[var(--text-primary)] hover:bg-opacity-5 transition-all cursor-pointer group">
                 <CloudUpload className="mx-auto mb-4 text-[var(--text-secondary)] opacity-40 group-hover:opacity-80 transition-opacity" size={48} />
                 <p className="text-sm text-[var(--text-secondary)]">Drag evidence or <span className="text-[var(--text-primary)] font-bold">upload file</span></p>
                 <p className="text-[10px] text-[var(--text-secondary)] opacity-30 mt-2 uppercase tracking-tighter">JPEG, PNG up to 10MB</p>
              </div>

              <button 
                disabled={isSubmitting}
                className={`
                  w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all
                  ${isSubmitting ? 'bg-[var(--text-primary)] bg-opacity-20 text-[var(--bg-primary)]' : 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:scale-[1.02] active:scale-95 shadow-lg'}
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[var(--bg-primary)] border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Report
                  </>
                )}
              </button>
            </form>
          )}
        </GlassCard>
      </div>
    </section>
  );
};
