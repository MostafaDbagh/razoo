export default function Terms() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-6">Terms & Conditions</h1>
          <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              By using our website and booking our services, you agree to these terms and conditions.
            </p>
            <h2 className="text-xl font-semibold text-white mt-8">Services</h2>
            <p>
              We provide at-home barbering and grooming services by appointment. Services, pricing,
              and availability are subject to change. We will confirm your booking and any changes
              by email or phone.
            </p>
            <h2 className="text-xl font-semibold text-white mt-8">Booking & Cancellation</h2>
            <p>
              Appointments are confirmed once we have contacted you. Please give at least 24 hours
              notice if you need to cancel or reschedule. Repeated no-shows may affect future
              bookings.
            </p>
            <h2 className="text-xl font-semibold text-white mt-8">Liability</h2>
            <p>
              We carry out our services with care and use professional products. We are not liable
              for any allergic reactions or outcomes beyond our control. Clients provide a safe
              and suitable space for the service.
            </p>
            <h2 className="text-xl font-semibold text-white mt-8">Contact</h2>
            <p>
              For questions about these terms, please contact us through our contact page.
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
