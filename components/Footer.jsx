export default function Footer() {
  return (
    <footer className="mt-20 px-6 pb-10">
      
      {/* Social Card */}
      <div className="max-w-xl mx-auto rounded-2xl p-6 text-center
                      bg-[#0b2545] border border-white/10
                      shadow-[0_0_30px_rgba(59,130,246,0.15)]">
        <h3 className="font-bold mb-4 tracking-wide">CONNECT WITH US</h3>

        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 rounded-full border border-pink-500
                             hover:bg-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.6)]
                             transition">
            Instagram
          </button>

          <button className="px-6 py-2 rounded-full border border-green-500
                             hover:bg-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)]
                             transition">
            WhatsApp
          </button>
        </div>
      </div>

      {/* Trust */}
      <div className="mt-8 max-w-xl mx-auto rounded-2xl p-6 text-center
                      bg-[#0b2545] border border-white/10">
        <h4 className="font-semibold">100% Secure & Manual</h4>
        <p className="text-xs text-gray-400 mt-2">
          We never use bots. Orders are fulfilled manually with care.
        </p>
      </div>

      <p className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} FameSaathi · Privacy & Terms
      </p>
    </footer>
  );
}
