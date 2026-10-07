// Initialize Lucide icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.dock-item');
  const sections = document.querySelectorAll('.page-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all nav items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Add active class to clicked item
      item.classList.add('active');
      
      // Get target section id
      const targetId = item.getAttribute('data-target');
      
      // Hide all sections and show target section with animation
      sections.forEach(section => {
        if (section.id === targetId) {
          section.classList.add('active');
          
          // Re-trigger animation
          section.classList.remove('animate-in');
          void section.offsetWidth; // Trigger reflow
          section.classList.add('animate-in');
        } else {
          section.classList.remove('active');
        }
      });
    });
  });

  // Track mouse for a subtle liquid glow interaction
  const blob1 = document.querySelector('.blob-1');
  const blob3 = document.querySelector('.blob-3');
  
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Slight parallax effect on blobs based on mouse position
    const moveX = (x - window.innerWidth / 2) * 0.05;
    const moveY = (y - window.innerHeight / 2) * 0.05;
    
    if(blob1) blob1.style.transform = `translate(${moveX}px, ${moveY}px)`;
    if(blob3) blob3.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
  });

  // Events Management Logic
  const eventModal = document.getElementById('event-modal');
  const btnAddEvent = document.getElementById('btn-add-event');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCancelModal = document.getElementById('btn-cancel-modal');
  const addEventForm = document.getElementById('add-event-form');
  const eventsTableBody = document.getElementById('events-table-body');

  function openModal() { eventModal.classList.add('open'); }
  function closeModal() { eventModal.classList.remove('open'); addEventForm.reset(); }

  if(btnAddEvent) btnAddEvent.addEventListener('click', openModal);
  if(btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if(btnCancelModal) btnCancelModal.addEventListener('click', closeModal);

  // Fetch Events from API
  async function fetchEvents() {
    try {
      const res = await fetch('/api/events');
      const events = await res.json();
      renderEvents(events);
    } catch (e) {
      console.log("Not running local server, showing empty state.");
      eventsTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Run `node server.js` to enable local saving!</td></tr>';
    }
  }

  function renderEvents(events) {
    if (events.length === 0) {
      eventsTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;">No events found. Create one!</td></tr>';
      return;
    }

    eventsTableBody.innerHTML = events.map(event => `
      <tr>
        <td>
          <img src="${event.image || 'https://via.placeholder.com/150'}" alt="${event.name}" class="event-thumbnail" onerror="this.src='https://via.placeholder.com/150'">
        </td>
        <td>
          <div style="font-weight: 700; color: #fff; margin-bottom: 0.25rem;">${event.name}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${event.description}</div>
        </td>
        <td>${new Date(event.date).toLocaleDateString()}</td>
        <td>${event.location}</td>
        <td>
          <button class="btn-danger" onclick="deleteEvent(${event.id})">
            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
          </button>
        </td>
      </tr>
    `).join('');
    
    lucide.createIcons(); // re-init icons for new HTML
  }

  // Handle Form Submit
  if(addEventForm) {
    addEventForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const newEvent = {
        name: document.getElementById('event-name').value,
        date: document.getElementById('event-date').value,
        location: document.getElementById('event-location').value,
        image: document.getElementById('event-image').value,
        description: document.getElementById('event-description').value
      };

      try {
        await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEvent)
        });
        fetchEvents();
        closeModal();
      } catch (e) {
        alert("Make sure you are running `node server.js` to save data!");
      }
    });
  }

  // Delete Event
  window.deleteEvent = async function(id) {
    if(confirm("Are you sure you want to delete this event?")) {
      try {
        await fetch(`/api/events/${id}`, { method: 'DELETE' });
        fetchEvents();
      } catch (e) {
        alert("Failed to delete. Make sure server is running.");
      }
    }
  };

  // Initial Fetch
  fetchEvents();
});
