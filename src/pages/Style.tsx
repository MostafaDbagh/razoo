import { Link } from 'react-router-dom';
import { Scissors, Sparkles } from 'lucide-react';

// Card image: gradient + icon. Set imgUrl to use your own photo (e.g. from /public/style/)
function CardImage({ seed, imgUrl }: { seed: string; imgUrl?: string }) {
  const hue = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  if (imgUrl) {
    return (
      <div className="aspect-[4/3] overflow-hidden bg-neutral-800">
        <img src={imgUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }
  return (
    <div
      className="aspect-[4/3] flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 28%, 20%) 0%, hsl(${hue + 15}, 22%, 14%) 100%)`,
      }}
    >
      <Scissors className="h-16 w-16 text-amber-500/50" aria-hidden />
    </div>
  );
}

// Add imgUrl to any item to show your own image (e.g. imgUrl: '/style/crop.jpg')
const POPULAR_HAIRCUTS = [
  { name: 'Textured Crop', desc: 'Short, layered top with a clean fade. Low maintenance, sharp look.', seed: 'crop' },
  { name: 'High Fade', desc: 'Bold contrast from skin to hair. Perfect for defined, modern style.', seed: 'fade' },
  { name: 'Pompadour', desc: 'Classic volume on top, short sides. Timeless and confident.', seed: 'pompadour' },
  { name: 'Side Part', desc: 'Clean, professional part. Works for office and weekend.', seed: 'sidepart' },
  { name: 'Buzz Cut', desc: 'Ultra-short and easy. Maximum simplicity, zero fuss.', seed: 'buzz' },
  { name: 'Quiff', desc: 'Lifted front with texture. Casual yet put-together.', seed: 'quiff' },
];

const ITALIAN_BEARD = [
  { name: 'Short Stubble', desc: '2–3 days of growth. Neat, rugged, very Italian.', seed: 'stubble' },
  { name: 'Balbo', desc: 'Disconnected moustache and beard. Sleek and distinctive.', seed: 'balbo' },
  { name: 'Designer Stubble', desc: 'Trimmed to 4–5 mm. Sharp jawline, minimal effort.', seed: 'designer' },
];

const ARABIC_BEARD = [
  { name: 'Full Arabic Beard', desc: 'Dense, well-groomed beard. Kept full and shaped.', seed: 'arabic' },
  { name: 'Extended Goatee', desc: 'Connected beard and moustache. Strong, traditional look.', seed: 'goatee' },
  { name: 'Boxed Beard', desc: 'Sharp lines along cheeks and neck. Clean and bold.', seed: 'boxed' },
];

const OTHER_BEARDS = [
  { name: 'Full Beard', desc: 'Natural growth, shaped and conditioned. Statement look.', seed: 'full' },
  { name: 'Goatee', desc: 'Chin-only or with moustache. Versatile and classic.', seed: 'goatee2' },
  { name: 'Van Dyke', desc: 'Detached moustache and goatee. Artistic and memorable.', seed: 'vandyke' },
  { name: 'Stubble', desc: 'Light or heavy stubble. Low maintenance, always in style.', seed: 'stubble2' },
];

function StyleCard({ name, desc, seed, imgUrl }: { name: string; desc: string; seed: string; imgUrl?: string }) {
  return (
    <div className="group rounded-2xl border border-amber-500/20 bg-neutral-800/80 overflow-hidden transition hover:border-amber-500/50 hover:bg-neutral-800">
      <CardImage seed={seed} imgUrl={imgUrl} />
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <Scissors className="h-5 w-5 text-amber-500 opacity-80 flex-shrink-0" />
          <h3 className="font-semibold text-white">{name}</h3>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function Style() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="flex-1 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-sm font-medium tracking-wide uppercase mb-3">Inspiration</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Styles & Looks</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              From the most popular haircuts to Italian, Arabic, and classic beard styles—find the look that fits you.
            </p>
            <div
              className="w-full rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl aspect-[21/9] max-h-[320px] grid place-items-center"
              style={{
                background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.15) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)',
              }}
            >
              <Sparkles className="h-24 w-24 text-amber-500/40 shrink-0" aria-hidden />
            </div>
          </div>

          {/* Most Popular Haircuts */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="h-8 w-8 text-amber-500" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Most Popular Haircuts</h2>
                <p className="text-gray-500 text-sm">Trending cuts that work for every face</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {POPULAR_HAIRCUTS.map((item) => (
                <StyleCard key={item.name} name={item.name} desc={item.desc} seed={item.seed} />
              ))}
            </div>
          </div>

          {/* Italian Beard */}
          <div className="mb-20">
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Italian Beard Styles</h2>
              <p className="text-gray-400 mb-6 max-w-2xl">
                Sleek, groomed, and effortlessly sharp. Italian beard styles are about clean lines and confidence—from light stubble to the iconic Balbo.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ITALIAN_BEARD.map((item) => (
                  <StyleCard key={item.name} name={item.name} desc={item.desc} seed={item.seed} />
                ))}
              </div>
            </div>
          </div>

          {/* Arabic Beard */}
          <div className="mb-20">
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Arabic Beard Styles</h2>
              <p className="text-gray-400 mb-6 max-w-2xl">
                Full, well-maintained beards with strong shape. Arabic beard styles are bold and traditional—kept neat with defined edges and healthy growth.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ARABIC_BEARD.map((item) => (
                  <StyleCard key={item.name} name={item.name} desc={item.desc} seed={item.seed} />
                ))}
              </div>
            </div>
          </div>

          {/* Other Beard Styles */}
          <div className="mb-16">
            <div className="rounded-2xl border border-amber-500/20 bg-neutral-800/50 p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">More Beard Styles</h2>
              <p className="text-gray-400 mb-6 max-w-2xl">
                From full beards to goatees and stubble—classic looks that never go out of style.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {OTHER_BEARDS.map((item) => (
                  <StyleCard key={item.name} name={item.name} desc={item.desc} seed={item.seed} />
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center rounded-2xl border-2 border-amber-500/40 bg-amber-500/10 py-12 px-6">
            <h3 className="text-2xl font-bold text-white mb-3">Ready for your new look?</h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">Book a session and we’ll help you get the cut or beard style that suits you best.</p>
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
