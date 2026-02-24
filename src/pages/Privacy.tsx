export default function Privacy() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              We respect your privacy. This policy describes how we collect, use, and protect your
              information when you use our booking and contact forms or visit our website.
            </p>
            <h2 className="text-xl font-semibold text-white mt-8">Information We Collect</h2>
            <p>
              When you book an appointment or contact us, we may collect your name, email address,
              phone number, preferred date and time, service preferences, and any notes you provide.
            </p>
            <h2 className="text-xl font-semibold text-white mt-8">How We Use It</h2>
            <p>
              We use this information to schedule and confirm your appointments, respond to your
              inquiries, and improve our services. We do not sell your data to third parties.
            </p>
            <h2 className="text-xl font-semibold text-white mt-8">Data Security</h2>
            <p>
              We take reasonable measures to protect your personal information from unauthorized
              access, loss, or misuse.
            </p>
            <h2 className="text-xl font-semibold text-white mt-8">Contact</h2>
            <p>
              If you have questions about this privacy policy, please contact us through our
              contact page.
            </p>
          </div>
        </div>
      </section>
      <footer className="bg-black border-t border-amber-600/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} EliteGrooming. Professional Home Barber Services.
        </div>
      </footer>
    </>
  );
}
