import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function ContactPage(){
    const [formData, setFormData] = userState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [error, setError]= userState(' ');
    const [submitted, setSubmitted] = userState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const {name, email, subject, message} = formData;

        // Simple validation
        if (!name || !email || !subject || !message) {
            setError('All fields are required!');
            setSubmitted(false);
            return;
        }
        setError(' ');
        setSubmitted(true);
        console.log('Feedback submitted:', formData);
        // Clear inputs after successful submission
        setFormData({name: '', email:'', subject:'', message:'' });
        };

        return(
            <div className="app-container">
                <Navbar />
                <main className="contact-main">
                    <h1>Contact Us </h1>
                    {error && <div className="error-alert">{error}</div>}
                    {submitted && <div className="success-alert">Thank You! Your message</div>}

                    <form onSubmit={handleSubmit}>
                        <inpur 
                        type = "text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        ></inpur>
                          <inpur 
                        type = "email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        ></inpur>
                          <inpur 
                        type = "text"
                        placeholder="Your Subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        ></inpur>
                        <textarea
                        type = "text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        ></textarea>
                        <button type="submit">Send Message</button>                        
                    </form>
                </main>
            </div>
        );
}

export default ContactPage;