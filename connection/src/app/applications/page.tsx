"use client";

import { useState } from "react";
import { Search, Download, Filter } from "lucide-react";

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data representing Google Form entries synced via Firebase
  const applications = [
    { id: "APP-001", name: "Sarah Jenkins", email: "sarah.j@example.com", phone: "(555) 123-4567", plan: "Premium Plan", date: "2026-10-07", status: "New" },
    { id: "APP-002", name: "Mike Ross", email: "mross@example.com", phone: "(555) 987-6543", plan: "Basic Plan", date: "2026-10-06", status: "Contacted" },
    { id: "APP-003", name: "Jessica Pearson", email: "jpearson@example.com", phone: "(555) 555-5555", plan: "Pro Plan", date: "2026-10-05", status: "Approved" },
    { id: "APP-004", name: "Harvey Specter", email: "harvey@example.com", phone: "(555) 111-2222", plan: "Premium Plan", date: "2026-10-04", status: "Approved" },
    { id: "APP-005", name: "Donna Paulsen", email: "donna@example.com", phone: "(555) 333-4444", plan: "Pro Plan", date: "2026-10-02", status: "New" },
  ];

  const filteredApps = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Membership Applications</h1>
          <p className="page-subtitle">View and manage leads coming from your Google Forms</p>
        </div>
        <button className="btn-secondary">
          <Download size={20} />
          Export CSV
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search applicants by name or email..." 
              style={{ paddingLeft: '2.5rem' }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-secondary">
            <Filter size={18} />
            Filter by Plan
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Applicant Name</th>
              <th>Contact Info</th>
              <th>Plan Selected</th>
              <th>Applied On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map(app => (
              <tr key={app.id}>
                <td style={{ color: 'var(--text-muted)' }}>{app.id}</td>
                <td style={{ fontWeight: 500 }}>{app.name}</td>
                <td>
                  <div>{app.email}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{app.phone}</div>
                </td>
                <td>{app.plan}</td>
                <td>{new Date(app.date).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${
                    app.status === 'New' ? 'badge-primary' : 
                    app.status === 'Approved' ? 'badge-success' : 'badge-secondary'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <select defaultValue={app.status} style={{ padding: '0.25rem 0.5rem', width: 'auto' }}>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
            {filteredApps.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>No applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
