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

  // ==========================================
  // EVENTS MANAGEMENT LOGIC (Local Storage)
  // ==========================================
  const eventModal = document.getElementById('event-modal');
  const btnAddEvent = document.getElementById('btn-add-event');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCancelModal = document.getElementById('btn-cancel-modal');
  const addEventForm = document.getElementById('add-event-form');
  const eventsTableBody = document.getElementById('events-table-body');

  function openEventModal() { eventModal.classList.add('open'); }
  function closeEventModal() { eventModal.classList.remove('open'); addEventForm.reset(); }

  if(btnAddEvent) btnAddEvent.addEventListener('click', openEventModal);
  if(btnCloseModal) btnCloseModal.addEventListener('click', closeEventModal);
  if(btnCancelModal) btnCancelModal.addEventListener('click', closeEventModal);

  function loadEvents() {
    const eventsStr = localStorage.getItem('fitfinity_events');
    const events = eventsStr ? JSON.parse(eventsStr) : [];
    renderEvents(events);
  }

  function renderEvents(events) {
    if (!eventsTableBody) return;
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
    
    lucide.createIcons();
  }

  if(addEventForm) {
    addEventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newEvent = {
        id: Date.now(),
        name: document.getElementById('event-name').value,
        date: document.getElementById('event-date').value,
        location: document.getElementById('event-location').value,
        image: document.getElementById('event-image').value,
        description: document.getElementById('event-description').value
      };

      const eventsStr = localStorage.getItem('fitfinity_events');
      const events = eventsStr ? JSON.parse(eventsStr) : [];
      events.push(newEvent);
      localStorage.setItem('fitfinity_events', JSON.stringify(events));
      
      loadEvents();
      closeEventModal();
    });
  }

  window.deleteEvent = function(id) {
    if(confirm("Are you sure you want to delete this event?")) {
      const eventsStr = localStorage.getItem('fitfinity_events');
      let events = eventsStr ? JSON.parse(eventsStr) : [];
      events = events.filter(e => e.id !== id);
      localStorage.setItem('fitfinity_events', JSON.stringify(events));
      loadEvents();
    }
  };


  // ==========================================
  // MEMBERSHIPS MANAGEMENT LOGIC (Local Storage)
  // ==========================================
  const memberModal = document.getElementById('member-modal');
  const btnAddMember = document.getElementById('btn-add-member');
  const btnCloseMemberModal = document.getElementById('btn-close-member-modal');
  const btnCancelMemberModal = document.getElementById('btn-cancel-member-modal');
  const addMemberForm = document.getElementById('add-member-form');
  const membersTableBody = document.getElementById('members-table-body');

  function openMemberModal() { memberModal.classList.add('open'); }
  function closeMemberModal() { memberModal.classList.remove('open'); addMemberForm.reset(); }

  if(btnAddMember) btnAddMember.addEventListener('click', openMemberModal);
  if(btnCloseMemberModal) btnCloseMemberModal.addEventListener('click', closeMemberModal);
  if(btnCancelMemberModal) btnCancelMemberModal.addEventListener('click', closeMemberModal);

  function loadMembers() {
    const membersStr = localStorage.getItem('fitfinity_members');
    const members = membersStr ? JSON.parse(membersStr) : [];
    renderMembers(members);
  }

  function renderMembers(members) {
    if (!membersTableBody) return;
    if (members.length === 0) {
      membersTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;">No members found. Add someone!</td></tr>';
      return;
    }

    membersTableBody.innerHTML = members.map(member => `
      <tr>
        <td style="font-weight: 600;">${member.name}</td>
        <td style="color: var(--text-muted);">${member.email}</td>
        <td>
          <span class="badge ${member.plan === 'Premium' ? 'badge-primary' : member.plan === 'Pro' ? 'badge-success' : 'badge-secondary'}">
            ${member.plan}
          </span>
        </td>
        <td>${new Date(member.date).toLocaleDateString()}</td>
        <td>
          <button class="btn-danger" onclick="deleteMember(${member.id})">
            <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
          </button>
        </td>
      </tr>
    `).join('');
    
    lucide.createIcons();
  }

  if(addMemberForm) {
    addMemberForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newMember = {
        id: Date.now(),
        name: document.getElementById('member-name').value,
        email: document.getElementById('member-email').value,
        plan: document.getElementById('member-plan').value,
        date: document.getElementById('member-date').value
      };

      const membersStr = localStorage.getItem('fitfinity_members');
      const members = membersStr ? JSON.parse(membersStr) : [];
      members.push(newMember);
      localStorage.setItem('fitfinity_members', JSON.stringify(members));
      
      loadMembers();
      closeMemberModal();
    });
  }

  window.deleteMember = function(id) {
    if(confirm("Are you sure you want to remove this member?")) {
      const membersStr = localStorage.getItem('fitfinity_members');
      let members = membersStr ? JSON.parse(membersStr) : [];
      members = members.filter(m => m.id !== id);
      localStorage.setItem('fitfinity_members', JSON.stringify(members));
      loadMembers();
    }
  };

  // Initial Fetches
  loadEvents();
  loadMembers();
});
