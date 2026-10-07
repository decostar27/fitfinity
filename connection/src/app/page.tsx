"use client";

import { Activity, Users, CalendarDays, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Welcome back to the Connectio Control Panel</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-header">
            <h3>Total Applications</h3>
            <Users className="stat-icon" size={40} />
          </div>
          <div className="stat-value">1,284</div>
          <p className="text-muted" style={{ color: "var(--success)" }}>+12% from last month</p>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-header">
            <h3>Active Memberships</h3>
            <Activity className="stat-icon" size={40} />
          </div>
          <div className="stat-value">845</div>
          <p className="text-muted" style={{ color: "var(--success)" }}>+5% from last month</p>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-header">
            <h3>Upcoming Events</h3>
            <CalendarDays className="stat-icon" size={40} />
          </div>
          <div className="stat-value">3</div>
          <p className="text-muted">Next event in 2 days</p>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-header">
            <h3>Monthly Revenue</h3>
            <TrendingUp className="stat-icon" size={40} />
          </div>
          <div className="stat-value">$12,450</div>
          <p className="text-muted" style={{ color: "var(--success)" }}>+18% from last month</p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Recent Applications (from Google Forms)</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Plan Applied</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sarah Jenkins</td>
              <td>Premium Plan</td>
              <td>Oct 7, 2026</td>
              <td><span className="badge badge-success">Reviewed</span></td>
            </tr>
            <tr>
              <td>Mike Ross</td>
              <td>Basic Plan</td>
              <td>Oct 6, 2026</td>
              <td><span className="badge badge-primary">Pending</span></td>
            </tr>
            <tr>
              <td>Jessica Pearson</td>
              <td>Pro Plan</td>
              <td>Oct 5, 2026</td>
              <td><span className="badge badge-success">Reviewed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
