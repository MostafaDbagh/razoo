import { useState } from 'react';
import { Scissors, Award, CheckCircle, Quote, ChevronDown, Hand } from 'lucide-react';
import { Link } from 'react-router-dom';
import DirhamIcon from '../components/DirhamIcon';
import { SERVICES } from '../data/services';

const FAQ_ITEMS = [
  { q: 'Do you come to my home or do I visit a shop?', a: 'We come to you. EliteGrooming is a mobile barber service—our barbers travel to your home or office at a time that suits you.' },
  { q: 'What areas do you cover?', a: 'We serve the greater metro area. Enter your location when booking and we’ll confirm availability. Contact us if you’re outside our usual zone.' },
  { q: 'How do I book and pay?', a: 'Book online through this site. We’ll confirm your appointment and discuss payment options. We accept card and cash; payment is typically taken at the end of your service.' },
  { q: 'Can I cancel or reschedule?', a: 'Yes. Please let us know at least 24 hours in advance so we can adjust our schedule. Last-minute changes may be subject to our cancellation policy.' },
  { q: 'What should I have ready for the appointment?', a: 'A well-lit area, a chair, and access to a sink for a quick wash if needed. Our barber will bring tools and products.' },
];

function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Premium Barbering,
                <span className="text-amber-500"> At Your Doorstep</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Experience professional grooming services in the comfort of your home.
                Expert barbers, premium products, unmatched convenience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-4 rounded-lg transition text-lg text-center">
                  Schedule Appointment
                </Link>
                <a href="#services" className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-semibold px-8 py-4 rounded-lg transition text-lg text-center">
                  View Services
                </a>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-amber-500">500+</div>
                  <div className="text-gray-400 text-sm mt-1">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-500">5★</div>
                  <div className="text-gray-400 text-sm mt-1">Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-500">10+</div>
                  <div className="text-gray-400 text-sm mt-1">Expert Barbers</div>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="aspect-square bg-gradient-to-br from-amber-500/20 to-transparent rounded-3xl p-8">
                <img
                  src="https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Professional barber at work"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-400">Premium grooming delivered to your location</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Scissors, title: 'Signature Haircut', desc: 'Precision cuts tailored to your style and face shape' },
              { icon: Award, title: 'Beard Grooming', desc: 'Expert trimming, shaping, and conditioning treatments' },
              { icon: Hand, title: 'Manicure & Pedicure', desc: 'Relaxing treatment for healthy nails, soft hands, and smooth feet' },
           
            ].map((service, idx) => (
              <div key={idx} className="bg-neutral-900 border border-amber-500/20 rounded-2xl p-8 hover:border-amber-500/50 transition group">
                <service.icon className="h-12 w-12 text-amber-500 mb-4 group-hover:scale-110 transition" />
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Barber tools"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose Us?</h2>
              <div className="space-y-6">
                {[
                  'Professional certified barbers with 5+ years experience',
                  'Premium products and sterilized equipment',
                  'Flexible scheduling - we work around your hours',
                  'Comfortable home service - no waiting, no rush',
                  'Satisfaction guaranteed or your money back',
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Clients Say About Us</h2>
            <p className="text-xl text-gray-400">Real feedback from people we’ve had the pleasure to serve</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: 'Best decision ever. The barber came on time, was super professional, and my cut was exactly what I wanted. No more waiting at the salon.', name: 'James M.', role: 'Regular client' },
              { quote: 'EliteGrooming has changed how I think about haircuts. Same quality as a high-end barbershop, but at my place. Worth every penny.', name: 'David K.', role: 'Home service customer' },
              { quote: 'I was skeptical at first, but the whole experience was smooth. Great communication, clean tools, and a cut I get compliments on. Highly recommend.', name: 'Alex R.', role: 'First-time client' },
            ].map((t, idx) => (
              <div key={idx} className="bg-neutral-900 border border-amber-500/20 rounded-2xl p-8 hover:border-amber-500/40 transition">
                <Quote className="h-10 w-10 text-amber-500/60 mb-4" aria-hidden />
                <p className="text-gray-300 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-amber-500/80">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-400">Transparent rates, no hidden fees</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((plan, idx) => (
              <div key={idx} className={`flex flex-col min-h-full bg-neutral-900 rounded-2xl p-8 ${plan.popular ? 'border-2 border-amber-500 relative' : 'border border-amber-500/20'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center gap-2 text-4xl font-bold text-amber-500 mb-6">
                  <DirhamIcon className="h-10 w-10 text-amber-500" />
                  <span>{plan.price}</span>
                </div>
                <div className="flex-1 min-h-0" />
                <ul className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/book?service=${encodeURIComponent(plan.name)}`}
                  className={`block w-full mt-8 py-3 rounded-lg font-semibold transition text-center shrink-0 ${plan.popular ? 'bg-amber-500 hover:bg-amber-600 text-black' : 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black'}`}
                >
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400">Quick answers to common questions</p>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="bg-neutral-800/80 border border-amber-500/20 rounded-xl overflow-hidden hover:border-amber-500/40 transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                  aria-expanded={openFaqIndex === idx}
                >
                  <span className="font-medium text-white">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-amber-500 flex-shrink-0 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ${openFaqIndex === idx ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-4 text-gray-400 leading-relaxed border-t border-amber-500/10 pt-0">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Look Sharp?</h2>
          <p className="text-xl text-gray-400 mb-12">Book your appointment today and experience the convenience of professional grooming at home</p>
          <Link to="/book" className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-semibold px-12 py-4 rounded-lg transition text-lg">
            Schedule Your Appointment
          </Link>
        </div>
      </section>

      <footer className="bg-black border-t border-amber-600/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Scissors className="h-8 w-8 text-amber-500" />
              <span className="text-2xl font-bold text-white">EliteGrooming</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-amber-500">Privacy</Link>
              <Link to="/terms" className="hover:text-amber-500">Terms</Link>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">© {new Date().getFullYear()} EliteGrooming. Professional Home Barber Services.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
