import { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  address: string;
  message: string;
}

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: 'Full Service',
    preferred_date: '',
    preferred_time: '',
    address: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([formData]);

      if (error) {
        setStatus('error');
        setErrorMessage(error.message || 'Failed to submit booking');
      } else {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Full Service',
          preferred_date: '',
          preferred_time: '',
          address: '',
          message: '',
        });
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navigation />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Book Your Appointment</h1>
            <p className="text-xl text-gray-400">Schedule professional grooming at your home</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-neutral-800 rounded-2xl p-8 border border-amber-500/20">
              <Phone className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
              <a href="tel:+1234567890" className="text-gray-400 hover:text-amber-500 transition">
                (123) 456-7890
              </a>
            </div>
            <div className="bg-neutral-800 rounded-2xl p-8 border border-amber-500/20">
              <Mail className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
              <a href="mailto:info@elitegrooming.com" className="text-gray-400 hover:text-amber-500 transition">
                info@elitegrooming.com
              </a>
            </div>
            <div className="bg-neutral-800 rounded-2xl p-8 border border-amber-500/20">
              <MapPin className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Service Area</h3>
              <p className="text-gray-400">Metro Area - Same day appointments available</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Quick Contact</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-800 border border-amber-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-800 border border-amber-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-800 border border-amber-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-neutral-800 border border-amber-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition"
                  >
                    <option>Basic Cut - $35</option>
                    <option>Full Service - $60</option>
                    <option>Premium Package - $85</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Preferred Date</label>
                    <input
                      type="date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-800 border border-amber-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Preferred Time</label>
                    <input
                      type="time"
                      name="preferred_time"
                      value={formData.preferred_time}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-800 border border-amber-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Service Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-800 border border-amber-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                    placeholder="123 Main St, City, State"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Additional Notes (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-neutral-800 border border-amber-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition resize-none"
                    placeholder="Any special requests or preferences..."
                  />
                </div>

                {status === 'success' && (
                  <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <p className="text-green-400">Booking submitted successfully! We'll contact you soon to confirm.</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-400">{errorMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 text-black font-semibold py-4 rounded-lg transition text-lg"
                >
                  {loading ? 'Booking...' : 'Book Appointment'}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl p-8 border border-amber-500/30">
                <h3 className="text-2xl font-bold text-white mb-4">Why Book With Us?</h3>
                <div className="space-y-4">
                  {[
                    'Professional barbers at your home',
                    'Flexible scheduling for your convenience',
                    'Premium products and equipment',
                    'No waiting - direct service',
                    'Same-day appointment availability',
                    'Satisfaction guarantee',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-800 rounded-2xl p-8 border border-amber-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">Service Hours</h3>
                <div className="space-y-2 text-gray-400">
                  <p className="flex justify-between"><span>Monday - Friday:</span> <span className="text-white">8:00 AM - 8:00 PM</span></p>
                  <p className="flex justify-between"><span>Saturday:</span> <span className="text-white">8:00 AM - 6:00 PM</span></p>
                  <p className="flex justify-between"><span>Sunday:</span> <span className="text-white">10:00 AM - 4:00 PM</span></p>
                </div>
              </div>

              <img
                src="https://images.pexels.com/photos/3375910/pexels-photo-3375910.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional barber service"
                className="w-full h-64 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-amber-600/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-2xl font-bold text-white">EliteGrooming</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>© 2024 EliteGrooming. All rights reserved.</p>
              <p className="text-sm mt-1">Professional Home Barber Services</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
