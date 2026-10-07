"use client";

import { useState } from "react";
import { PlusCircle, Trash2, Star } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { id: 1, name: "Emily Chen", role: "Pro Member", content: "Fitfinity completely transformed my workout routine. The classes are amazing!", rating: 5 },
    { id: 2, name: "Marcus Johnson", role: "Basic Member", content: "Great equipment and very clean facilities. Highly recommended.", rating: 4 },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ name: "", role: "", content: "", rating: 5 });

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTestimonial.name && newTestimonial.content) {
      setTestimonials([...testimonials, { ...newTestimonial, id: Date.now() }]);
      setIsModalOpen(false);
      setNewTestimonial({ name: "", role: "", content: "", rating: 5 });
    }
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Testimonials</h1>
          <p className="page-subtitle">Manage client reviews shown on the website</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <PlusCircle size={20} />
          Add Testimonial
        </button>
      </div>

      <div className="stats-grid">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '2px', color: '#fbbf24' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < testimonial.rating ? "currentColor" : "none"} />
                ))}
              </div>
              <button className="btn-danger" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setTestimonials(testimonials.filter(t => t.id !== testimonial.id))}>
                <Trash2 size={16} />
              </button>
            </div>
            
            <p style={{ fontStyle: 'italic', flex: 1, color: 'var(--text-muted)' }}>"{testimonial.content}"</p>
            
            <div style={{ marginTop: '1rem' }}>
              <div style={{ fontWeight: 600 }}>{testimonial.name}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>{testimonial.role}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Testimonial Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Add Testimonial</h2>
            <button onClick={() => setIsModalOpen(false)} style={{ fontSize: '1.5rem' }}>&times;</button>
          </div>
          <form onSubmit={handleAddTestimonial}>
            <div className="form-group">
              <label className="form-label">Client Name</label>
              <input 
                type="text" 
                required 
                value={newTestimonial.name} 
                onChange={e => setNewTestimonial({...newTestimonial, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Role/Membership (Optional)</label>
              <input 
                type="text" 
                value={newTestimonial.role} 
                onChange={e => setNewTestimonial({...newTestimonial, role: e.target.value})}
                placeholder="e.g. Premium Member"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Rating (1-5)</label>
              <select 
                value={newTestimonial.rating} 
                onChange={e => setNewTestimonial({...newTestimonial, rating: parseInt(e.target.value)})}
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Review Content</label>
              <textarea 
                required 
                rows={4}
                value={newTestimonial.content} 
                onChange={e => setNewTestimonial({...newTestimonial, content: e.target.value})}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn-primary">Add Review</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
