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
    // 1. Contact Form Logic
    const contactForm = document.getElementById('contactForm');
    
    function showNotification(message, isError = false) {
        const toast = document.getElementById('toastNotification');
        const toastMsg = document.getElementById('toastMessage');

        if (!toast || !toastMsg) {
            // Fallback if toast elements don't exist
            alert(message);
            return;
        }
        
        toastMsg.innerText = message;
        
        if (isError) {
            toast.classList.add('error');
            toast.classList.remove('success');
        } else {
            toast.classList.add('success');
            toast.classList.remove('error');
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    if (contactForm) {
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
                // Changed collection name to "contact_us" as requested
                await addDoc(collection(db, "contact_us"), {
                    name: name,
                    email: email,
                    message: message,
                    createdAt: serverTimestamp()
                });
                
                showNotification('Thank you for reaching out! We will get back to you soon.');
                contactForm.reset();
            } catch (error) {
                console.error("Error adding document: ", error);
                showNotification('Oops! Something went wrong. Please try again later.', true);
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // 2. Newsletter / Subscription Form Logic
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.removeAttribute('onsubmit');
        
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'SUBSCRIBING...';
            submitBtn.disabled = true;

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            try {
                // Changed collection name to "subscription" as requested
                await addDoc(collection(db, "subscription"), {
                    email: email,
                    subscribedAt: new Date().toISOString(),
                    status: "Active"
                });
                
                showNotification('Thanks for joining our family!');
                newsletterForm.reset();
                
                // Close the modal if it's open
                const joinModal = document.getElementById('joinModal');
                if (joinModal) {
                    setTimeout(() => {
                        joinModal.classList.remove('open');
                    }, 1500);
                }
            } catch (error) {
                console.error("Error adding subscriber: ", error);
                showNotification('Oops! Something went wrong. Please try again later.', true);
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
