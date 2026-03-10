import { CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO
        title="About | Premium Mobile Barber Dubai"
        description="Barber2Door brings premium barbering to your doorstep in Dubai. Certified barbers, OpenAI-powered AI suggestions, premium products. Serving executives & VIPs."
        canonical="https://www.barber2door.com/about"
      />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Us</h1>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            We bring premium barbering to your doorstep. Our team of certified barbers delivers
            professional cuts, beard grooming, and styling in the comfort of your home or office.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <img
              src="https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Barber tools"
              className="w-full h-64 object-cover rounded-2xl shadow-2xl"
              loading="lazy"
            />
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Why Choose Us?</h2>
              <ul className="space-y-4">
                {[
                  'Professional certified barbers with 5+ years experience',
                  'Premium products and sterilized equipment',
                  'Flexible scheduling – we work around your hours',
                  'Comfortable home service – no waiting, no rush',
                  'Satisfaction guaranteed',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-500/20 pt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-gray-400 leading-relaxed">
              We started with a simple idea: great grooming shouldn’t require a trip across town.
              Today we serve clients who value their time and expect the same quality they’d get in a
              top salon, delivered where they are.
            </p>
          </div>
        </div>
      </section>
      <footer className="bg-black border-t border-amber-600/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Barber2Door. Professional Home Barber Services.
        </div>
      </footer>
    </>
  );
}
