"use client";

import { useState, useEffect } from "react";
import { CalendarPlus, Trash2, Edit } from "lucide-react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  status: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: "", date: "", location: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      setEvents(eventsData);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching events: ", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.name && newEvent.date && newEvent.location) {
      try {
        await addDoc(collection(db, "events"), {
          ...newEvent,
          status: "Upcoming"
        });
        setIsModalOpen(false);
        setNewEvent({ name: "", date: "", location: "" });
      } catch (error) {
        console.error("Error adding event: ", error);
      }
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteDoc(doc(db, "events", id));
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Events Management</h1>
          <p className="page-subtitle">Add, edit, or remove fitness events</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <CalendarPlus size={20} />
          Add New Event
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Loading events...</td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No events found. Create one!</td>
              </tr>
            ) : (
              events.map(event => (
                <tr key={event.id}>
                  <td style={{ fontWeight: 500 }}>{event.name}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.location}</td>
                  <td>
                    <span className={`badge ${event.status === 'Upcoming' ? 'badge-primary' : 'badge-secondary'}`}>
                      {event.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-secondary" style={{ padding: '0.5rem' }}>
                        <Edit size={16} />
                      </button>
                      <button className="btn-danger" style={{ padding: '0.5rem' }} onClick={() => handleDeleteEvent(event.id)}>
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

      {/* Add Event Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Add New Event</h2>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)' }}>&times;</button>
          </div>
          <form onSubmit={handleAddEvent}>
            <div className="form-group">
              <label className="form-label">Event Name</label>
              <input 
                type="text" 
                required 
                value={newEvent.name} 
                onChange={e => setNewEvent({...newEvent, name: e.target.value})}
                placeholder="e.g. Winter Bootcamp"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Event Date</label>
              <input 
                type="date" 
                required 
                value={newEvent.date} 
                onChange={e => setNewEvent({...newEvent, date: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input 
                type="text" 
                required 
                value={newEvent.location} 
                onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                placeholder="e.g. Main Gym"
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn-primary">Save Event</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
