import React from 'react';
import ContactForm from "../components/ContactForm";
import LiveChat from "../components/LiveChat";
import SocialLinks from "../components/SocialLinks";

export default function Contact() {
  return (
    <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto space-y-20 text-chrome-silver">
      
      {/* Section 1: Hero Header */}
      <div id="contact-hero" className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-molten-orange">Let's Connect 🤝</h1>
        <p className="mt-4 text-lg md:text-xl text-steel-blue max-w-2xl mx-auto">
          Have a project, idea, or collaboration in mind? Drop a message or start a live chat below.
        </p>
      </div>

      {/* Section 2: Contact Form */}
      <div id="contact-form">
        <ContactForm />
      </div>

      {/* Section 3: Live Chat Widget */}
      <div id="live-chat">
        <LiveChat />
      </div>

      {/* Section 4: Social CTA */}
      <div id="contact-social">
        <SocialLinks />
      </div>

    </section>
  );
} 