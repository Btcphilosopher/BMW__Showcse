import { useState } from "react";
import { ArrowRight, Leaf, Eye, Recycle, Zap, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FutureBanner() {
  const [showVisionModal, setShowVisionModal] = useState(false);

  const sustainabilityFacts = [
    {
      icon: <Recycle className="w-6 h-6 text-emerald-400" />,
      title: "Zirkuläres Design",
      desc: "BMW strebt an, den Anteil an Sekundärmaterialien (wie recyceltes Aluminium und Stahl) in Neufahrzeugen auf bis zu 50 % zu erhöhen."
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-400" />,
      title: "Vegane Interieurs",
      desc: "Zukunftsweisende Oberflächenmaterialien reduzieren CO2-Emissionen entlang der Wertschöpfungskette um rund 85 % im Vergleich zu Leder."
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      title: "Grüne Produktion",
      desc: "Das Werk in Debrecen läuft vollkommen ohne fossile Energieträger und setzt ausschließlich auf lokal erzeugten Grünstrom."
    }
  ];

  return (
    <>
      <section
        id="future-section"
        className="relative h-[450px] md:h-[550px] w-full bg-[#0A0A0A] overflow-hidden flex items-center justify-start border-t border-white/10"
      >
        {/* Background Image with Zoom */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10" />
          <img
            src="/src/assets/images/bmw_footer_future_1783691299989.jpg"
            alt="BMW Vision Future"
            className="w-full h-full object-cover object-center transform scale-100 hover:scale-103 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full text-left">
          <div className="max-w-xl">
            <span className="text-xs font-semibold text-gold tracking-[0.3em] uppercase block mb-3">
              BMW INNOVATION & VISION
            </span>
            
            <h2 className="font-serif italic font-light text-3xl md:text-5xl tracking-wide text-white mb-6 leading-tight capitalize">
              die zukunft ist jetzt.
            </h2>
            
            <p className="text-sm md:text-base text-white/50 font-sans font-light leading-relaxed mb-8">
              Erfahren Sie mehr über unsere zukunftsweisenden Visionen, intelligenten Technologien und nachhaltigen Produktionsideen für die Mobilität von morgen.
            </p>

            <button
              onClick={() => setShowVisionModal(true)}
              className="group inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-white hover:text-gold transition-colors cursor-pointer"
              id="future-discover-btn"
            >
              Mehr entdecken
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </section>

      {/* Sustainable Vision Modal */}
      <AnimatePresence>
        {showVisionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0A0A0A] border border-white/10 p-6 md:p-10 max-w-2xl w-full relative rounded-none shadow-2xl"
              id="vision-modal"
            >
              <button
                onClick={() => setShowVisionModal(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="text-xs font-bold tracking-[0.2em] text-gold uppercase block mb-2">
                RE-THINK, RE-DUCE, RE-USE, RE-CYCLE
              </span>
              <h3 className="font-serif italic font-light text-2xl md:text-4xl text-white tracking-tight mb-6 capitalize">
                BMW Neue Klasse & nachhaltigkeit
              </h3>

              <p className="text-sm text-white/50 font-light leading-relaxed mb-8">
                Mit dem BMW i Vision Circular demonstriert die BMW Group ihre konsequente Ausrichtung auf eine Kreislaufwirtschaft. Unser Leitbild vereint Fahrfreude und Ressourceneffizienz auf völlig neuem Level.
              </p>

              <div className="space-y-6">
                {sustainabilityFacts.map((fact, index) => (
                  <div key={index} className="flex gap-4 items-start bg-white/[0.02] p-4 border border-white/5">
                    <div className="p-2.5 bg-gold/10 border border-gold/20 text-gold">
                      {fact.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">
                        {fact.title}
                      </h4>
                      <p className="text-xs text-white/40 leading-relaxed font-light">
                        {fact.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowVisionModal(false)}
                  className="px-6 py-2.5 border border-white/20 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all font-sans font-medium"
                >
                  Schließen
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
