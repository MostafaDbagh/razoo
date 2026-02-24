import { Scissors, Clock, Award, CheckCircle } from 'lucide-react';
import Navigation from '../components/Navigation';

function Home() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Navigation />

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
                <a href="/contact" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-4 rounded-lg transition text-lg text-center">
                  Schedule Appointment
                </a>
                <button className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-semibold px-8 py-4 rounded-lg transition text-lg">
                  View Services
                </button>
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
            <div className="relative">
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
              { icon: Clock, title: 'Quick Trim', desc: 'Fast touch-ups and maintenance cuts for busy schedules' },
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

      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-400">Transparent rates, no hidden fees</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Basic Cut', price: '$35', features: ['Haircut & styling', 'Wash included', '30 minutes'] },
              { name: 'Full Service', price: '$60', features: ['Haircut & styling', 'Beard trim & shape', 'Hot towel treatment', '45 minutes'], popular: true },
              { name: 'Premium Package', price: '$85', features: ['Haircut & styling', 'Full beard grooming', 'Facial treatment', 'Scalp massage', '60 minutes'] },
            ].map((plan, idx) => (
              <div key={idx} className={`bg-neutral-900 rounded-2xl p-8 ${plan.popular ? 'border-2 border-amber-500 relative' : 'border border-amber-500/20'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-amber-500 mb-6">{plan.price}</div>
                <ul className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center space-x-2 text-gray-300">
                      <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-8 py-3 rounded-lg font-semibold transition ${plan.popular ? 'bg-amber-500 hover:bg-amber-600 text-black' : 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black'}`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Look Sharp?</h2>
          <p className="text-xl text-gray-400 mb-12">Book your appointment today and experience the convenience of professional grooming at home</p>
          <a href="/contact" className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-semibold px-12 py-4 rounded-lg transition text-lg">
            Schedule Your Appointment
          </a>
        </div>
      </section>

      <footer className="bg-black border-t border-amber-600/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Scissors className="h-8 w-8 text-amber-500" />
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

export default Home;
