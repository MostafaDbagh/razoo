import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, CheckCircle, AlertCircle, User } from 'lucide-react';
import { submitContact } from '../lib/api';
import SEO from '../components/SEO';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMsg('');
    try {
      const res = await submitContact({
        name: form.name,
        phone: form.phone,
        subject: form.subject || undefined,
        message: form.message,
      });
      if (res.success) {
        setStatus('success');
        setForm({ name: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(res.error ?? 'Failed to send message');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact | Elite Barbers Dubai"
        description="Contact Barber2Door Dubai. Questions about our OpenAI-powered AI mobile barber service, pricing, or VIP grooming? Get in touch."
        canonical="https://www.barber2door.com/contact"
      />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-gray-400">Get in touch – we’ll respond as soon as we can.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-neutral-800 rounded-2xl p-8 border border-amber-500/20">
              <Phone className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
              <a href="tel:+971586057772" className="text-gray-400 hover:text-amber-500 transition">
                +971 586057772
              </a>
            </div>
            <div className="bg-neutral-800 rounded-2xl p-8 border border-amber-500/20">
              <Mail className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
              <a href="mailto:info@Barber2Door.com" className="text-gray-400 hover:text-amber-500 transition">
                info@Barber2Door.com
              </a>
            </div>
            <div className="bg-neutral-800 rounded-2xl p-8 border border-amber-500/20">
              <MapPin className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Service Area</h3>
              <p className="text-gray-400">Dubai Emirate – same-day appointments available</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Send a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500/60 pointer-events-none" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-800/80 border border-amber-500/25 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 transition-colors duration-200 hover:border-amber-500/40 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500/60 pointer-events-none" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-800/80 border border-amber-500/25 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 transition-colors duration-200 hover:border-amber-500/40 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-neutral-800 border border-amber-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-neutral-800 border border-amber-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {status === 'success' && (
                  <div className="flex items-center gap-3 rounded-lg border border-green-500/50 bg-green-500/10 p-4">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <p className="text-green-400">Message sent! We’ll get back to you soon.</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-3 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-400">{errorMsg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !form.name.trim() || !form.phone.trim() || !form.message.trim()}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-lg transition text-lg"
                >
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl p-8 border border-amber-500/30">
                <h3 className="text-2xl font-bold text-white mb-4">Why contact us?</h3>
                <ul className="space-y-4">
                  {[
                    'Questions about services or pricing',
                    'Custom or group bookings',
                    'Feedback or suggestions',
                    'Partnership inquiries',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-500 text-sm">
                To book an appointment, use the <Link to="/book" className="text-amber-500 hover:underline">Book</Link> page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-amber-600/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="/logo.png" alt="Barber2Door" className="w-[190px] h-10 object-cover" />
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-amber-500">Privacy</Link>
            <Link to="/terms" className="hover:text-amber-500">Terms</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Barber2Door. Professional Home Barber Services.
        </div>
      </footer>
    </>
  );
}
