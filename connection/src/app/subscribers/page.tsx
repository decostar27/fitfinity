"use client";

import { useState, useEffect } from "react";
import { MailPlus, Trash2 } from "lucide-react";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Subscriber = {
  id: string;
  email: string;
  subscribedAt: string;
  status: string;
};

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "subscribers"), (snapshot) => {
      const subscribersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Subscriber[];
      setSubscribers(subscribersData);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching subscribers: ", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail) {
      try {
        await addDoc(collection(db, "subscribers"), {
          email: newEmail,
          subscribedAt: new Date().toISOString(),
          status: "Active"
        });
        setIsModalOpen(false);
        setNewEmail("");
      } catch (error) {
        console.error("Error adding subscriber: ", error);
      }
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    try {
      await deleteDoc(doc(db, "subscribers", id));
    } catch (error) {
      console.error("Error deleting subscriber: ", error);
    }
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Subscribers Management</h1>
          <p className="page-subtitle">Manage newsletter and updates subscriptions</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <MailPlus size={20} />
          Add Subscriber
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Email Address</th>
              <th>Subscribed At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>Loading subscribers...</td>
              </tr>
            ) : subscribers.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>No subscribers found.</td>
              </tr>
            ) : (
              subscribers.map(sub => (
                <tr key={sub.id}>
                  <td style={{ fontWeight: 500 }}>{sub.email}</td>
                  <td>{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${sub.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-danger" style={{ padding: '0.5rem' }} onClick={() => handleDeleteSubscriber(sub.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Subscriber Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Add New Subscriber</h2>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)' }}>&times;</button>
          </div>
          <form onSubmit={handleAddSubscriber}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                required 
                value={newEmail} 
                onChange={e => setNewEmail(e.target.value)}
                placeholder="e.g. user@example.com"
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn-primary">Add Subscriber</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
