import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Barber2Door Dubai"
        description="Barber2Door Privacy Policy. Learn how we collect, use, and protect your information when you visit our website, book an appointment, or contact us."
        canonical="https://www.barber2door.com/privacy"
      />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: 11/03/2026</p>
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              Your privacy matters to us. This Privacy Policy explains how Barber2Door collects, uses,
              and protects your information when you visit our website, book an appointment, or contact us.
            </p>
            <h2 className="text-xl font-semibold text-white mt-8">Information We Collect</h2>
            <p>
              We may collect your name, email address, phone number, appointment details, service
              preferences, location details, and any notes you provide when making a booking or
              contacting us.
            </p>
            <p>
              We may also collect limited website information such as your browser type, device type,
              and general website activity to help improve performance and user experience.
            </p>
            <h2 className="text-xl font-semibold text-white mt-8">How We Use It</h2>
            <p>
              We use your information to manage bookings, confirm appointments, contact you about your
              service, respond to your questions, and improve the quality of our service.
            </p>
            <p>
              We may also use your information for customer support, internal records, and basic
              website improvement.
            </p>
            <p>We do not sell your personal data.</p>
            <h2 className="text-xl font-semibold text-white mt-8">How We Protect Your Information</h2>
            <p>
              We take reasonable steps to protect your information and keep it secure from unauthorized
              access, loss, misuse, or disclosure.
            </p>
            <p>
              However, no online system is completely secure, so we cannot guarantee absolute security.
            </p>
            <h2 className="text-xl font-semibold text-white mt-8">Sharing Your Information</h2>
            <p>
              We only share your information when necessary to run our services properly, such as for
              bookings, payments, customer support, or legal requirements.
            </p>
            <p>We do not share your information for unnecessary third-party marketing.</p>
            <h2 className="text-xl font-semibold text-white mt-8">Your Choice</h2>
            <p>
              If you would like to update your information or ask about the personal data we hold, you
              can contact us through our <Link to="/contact" className="text-amber-500 hover:text-amber-400">contact page</Link>.
            </p>
            <p>You can also ask us not to send you promotional messages.</p>
            <h2 className="text-xl font-semibold text-white mt-8">Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our{' '}
              <Link to="/contact" className="text-amber-500 hover:text-amber-400">contact page</Link>.
            </p>
          </div>
        </div>
      </section>
      <footer className="bg-black border-t border-amber-600/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          © 2026 Barber2Door. VIP Home Barber Services.
        </div>
      </footer>
    </>
  );
}
