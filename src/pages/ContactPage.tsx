import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useCartWishlist();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Question');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(
        'Message Sent!',
        'Thank you! Our design support team will respond within 2-4 hours.',
        'success'
      );
      setName('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  return (
    <div id="contact-page" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
          Get in Touch
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Need licensing help, have custom vector design requirements, or want to collaborate with Ibrahim Samrat? We are here to support your team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111827] text-white rounded-3xl p-8 space-y-6 shadow-xl">
            <h2 className="text-xl font-black">Direct Contact Details</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Reach our design and licensing support desk directly via email, WhatsApp, or phone.
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-[#8B5CF6] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Direct Support Email</span>
                  <a
                    href="mailto:coo.masconsultancy@gmail.com"
                    className="font-bold text-white hover:text-purple-300 transition-colors"
                  >
                    coo.masconsultancy@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-[#8B5CF6] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Phone & WhatsApp</span>
                  <a
                    href="tel:+8801722604376"
                    className="font-bold text-white hover:text-purple-300 transition-colors"
                  >
                    +8801722604376
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-[#8B5CF6] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Studio Location</span>
                  <span className="font-bold text-white">Dhaka, Bangladesh</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-[#8B5CF6] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Response Time</span>
                  <span className="font-bold text-white">Average response under 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@agency.com"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Subject Inquiry</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-semibold text-gray-800"
              >
                <option value="Product Question">Asset & Compatibility Question</option>
                <option value="Extended Licensing">Extended Commercial License Quote</option>
                <option value="Seller Application">Creator & Seller Partnership</option>
                <option value="Custom Design">Custom Branding / Commission Request</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Message</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help your design workflow?"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#6C3BFF] hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-purple-500/20 transition-transform active:scale-95 flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
