"use client";

import { useState } from "react";
import { DollarSign, Save } from "lucide-react";

export default function MembershipsPage() {
  const [plans, setPlans] = useState([
    { id: 1, name: "Basic Plan", price: 29.99, features: "Access to gym equipment\nLocker room access", popular: false },
    { id: 2, name: "Pro Plan", price: 59.99, features: "All Basic features\nGroup classes\n1 PT session/month", popular: true },
    { id: 3, name: "Premium Plan", price: 99.99, features: "All Pro features\nUnlimited PT sessions\nSpa & Pool access", popular: false },
  ]);

  const [saving, setSaving] = useState(false);

  const handlePriceChange = (id: number, newPrice: string) => {
    setPlans(plans.map(p => p.id === id ? { ...p, price: parseFloat(newPrice) || 0 } : p));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800); // mock save
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Membership Plans</h1>
          <p className="page-subtitle">Configure pricing and features for your plans</p>
        </div>
        <button className="btn-primary" onClick={handleSave}>
          <Save size={20} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="stats-grid">
        {plans.map(plan => (
          <div key={plan.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: plan.popular ? '1px solid var(--primary)' : '' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{plan.name}</h3>
              {plan.popular && <span className="badge badge-primary">Most Popular</span>}
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Monthly Price ($)</label>
              <div style={{ position: 'relative' }}>
                <DollarSign size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="number" 
                  step="0.01"
                  value={plan.price} 
                  onChange={e => handlePriceChange(plan.id, e.target.value)}
                  style={{ paddingLeft: '2.5rem', fontSize: '1.25rem', fontWeight: 600 }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1rem', flex: 1 }}>
              <label className="form-label">Plan Features (one per line)</label>
              <textarea 
                rows={5}
                value={plan.features}
                onChange={e => setPlans(plans.map(p => p.id === plan.id ? { ...p, features: e.target.value } : p))}
                style={{ resize: 'none' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
