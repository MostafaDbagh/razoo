import { Link } from 'react-router-dom';
import { Scissors, Award, Clock, CheckCircle } from 'lucide-react';

const CORE_SERVICES = [
  {
    icon: Scissors,
    title: 'Signature Haircut',
    desc: 'Precision cuts tailored to your style and face shape. Wash included, expert styling.',
  },
  {
    icon: Award,
    title: 'Beard Grooming',
    desc: 'Expert trimming, shaping, and conditioning. From stubble to full beard—we shape it right.',
  },
  {
    icon: Clock,
    title: 'Quick Trim',
    desc: 'Fast touch-ups and maintenance cuts for busy schedules. In and out without the wait.',
  },
];

const PACKAGES = [
  {
    name: 'Basic Cut',
    price: '$35',
    duration: '30 min',
    features: ['Haircut & styling', 'Wash included', 'At your location'],
    popular: false,
  },
  {
    name: 'Full Service',
    price: '$60',
    duration: '45 min',
    features: ['Haircut & styling', 'Beard trim & shape', 'Hot towel treatment', 'At your location'],
    popular: true,
  },
  {
    name: 'Premium Package',
    price: '$85',
    duration: '60 min',
    features: ['Haircut & styling', 'Full beard grooming', 'Facial treatment', 'Scalp massage', 'At your location'],
    popular: false,
  },
];

const ADD_ON_SERVICES = [
  { name: 'Hot towel treatment', desc: 'Relaxing steam and towel wrap' },
  { name: 'Scalp massage', desc: 'Stimulating massage with oil' },
  { name: 'Beard conditioning', desc: 'Oil and balm for healthy growth' },
  { name: 'Neck shave', desc: 'Clean lines and smooth finish' },
];

function ServiceCard({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-neutral-800/80 p-8 transition hover:border-amber-500/50 hover:bg-neutral-800">
      <Icon className="h-12 w-12 text-amber-500 mb-5" aria-hidden />
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Services() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="flex-1 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 text-sm font-medium tracking-wide uppercase mb-3">What we offer</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Premium barbering and grooming at your door. Haircuts, beard work, and full packages—all in one place.
            </p>
          </div>

          {/* Core services */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Core Services</h2>
            <p className="text-gray-500 text-sm mb-8">The essentials, delivered with care</p>
            <div className="grid md:grid-cols-3 gap-8">
              {CORE_SERVICES.map((s) => (
                <ServiceCard key={s.title} icon={s.icon} title={s.title} desc={s.desc} />
              ))}
            </div>
          </div>

          {/* Packages & pricing */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Packages & Pricing</h2>
            <p className="text-gray-500 text-sm mb-8">Transparent rates, no hidden fees</p>
            <div className="grid md:grid-cols-3 gap-8">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`relative rounded-2xl p-8 ${
                    pkg.popular ? 'border-2 border-amber-500 bg-amber-500/5' : 'border border-amber-500/20 bg-neutral-800/80'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
                  <p className="text-amber-500 font-semibold text-2xl mb-1">{pkg.price}</p>
                  <p className="text-gray-500 text-sm mb-6">{pkg.duration}</p>
                  <ul className="space-y-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Add-Ons</h2>
            <p className="text-gray-500 text-sm mb-8">Enhance your visit with these extras</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ADD_ON_SERVICES.map((add) => (
                <div
                  key={add.name}
                  className="rounded-xl border border-amber-500/20 bg-neutral-800/50 px-5 py-4 hover:border-amber-500/40 transition"
                >
                  <p className="font-semibold text-white">{add.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{add.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center rounded-2xl border-2 border-amber-500/40 bg-amber-500/10 py-12 px-6">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to book?</h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">Choose your service and we’ll come to you.</p>
            <Link
              to="/book"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-4 rounded-lg transition"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>
      <footer className="mt-auto bg-black border-t border-amber-600/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} EliteGrooming. Professional Home Barber Services.
        </div>
      </footer>
    </div>
  );
}
