import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_qSO0bWzK-MlofaN9Xx2NNpxAqARMUU0",
  authDomain: "fitfinityexp.firebaseapp.com",
  projectId: "fitfinityexp",
  storageBucket: "fitfinityexp.firebasestorage.app",
  messagingSenderId: "500137610448",
  appId: "1:500137610448:web:a041dc9010e4bba42922d5",
  measurementId: "G-RB7GES9MBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Remove any inline onsubmit handlers to prevent conflicts
        contactForm.removeAttribute('onsubmit');
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'SENDING...';
            submitBtn.disabled = true;

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            try {
                await addDoc(collection(db, "contacts"), {
                    name: name,
                    email: email,
                    message: message,
                    createdAt: serverTimestamp()
                });
                
                alert('Thank you for reaching out! We will get back to you soon.');
                contactForm.reset();
            } catch (error) {
                console.error("Error adding document: ", error);
                alert('Oops! Something went wrong. Please try again later.');
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
