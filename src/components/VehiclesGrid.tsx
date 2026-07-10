import { useState } from "react";
import { ArrowRight, Sliders, Info, Cpu, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Vehicle } from "../types";

interface VehiclesGridProps {
  vehicles: Vehicle[];
  onConfigureClick: (vehicle: Vehicle) => void;
  onExploreClick: (vehicle: Vehicle) => void;
  onServiceClick: () => void;
}

type FilterCategory = "all" | "electric" | "sedan" | "performance" | "service";

export default function VehiclesGrid({
  vehicles,
  onConfigureClick,
  onExploreClick,
  onServiceClick,
}: VehiclesGridProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [hoveredVehicleId, setHoveredVehicleId] = useState<string | null>(null);

  // Filters mapping
  const categories = [
    { id: "all", label: "Alle Modelle" },
    { id: "electric", label: "Elektromobilität (i)" },
    { id: "sedan", label: "Limousinen" },
    { id: "performance", label: "M Performance" },
    { id: "service", label: "BMW Service" },
  ];

  // Filter vehicles + custom Service card representation
  const filteredVehicles = vehicles.filter(
    (v) => activeCategory === "all" || v.category === activeCategory
  );

  return (
    <section id="vehicles-grid-section" className="py-24 bg-[#0A0A0A] text-[#E0DDD5] px-4 md:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16 border-b border-white/10 pb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as FilterCategory)}
              className={`px-6 py-2.5 text-[10px] font-medium tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer rounded-full ${
                activeCategory === cat.id
                  ? "bg-gold text-black font-semibold shadow-lg"
                  : "bg-white/5 text-[#E0DDD5]/60 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 2x2 Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="grid-container">
          <AnimatePresence mode="popLayout">
            {/* Cars Render */}
            {filteredVehicles.map((vehicle) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={vehicle.id}
                onMouseEnter={() => setHoveredVehicleId(vehicle.id)}
                onMouseLeave={() => setHoveredVehicleId(null)}
                className="relative group h-[500px] overflow-hidden border border-white/10 rounded-none bg-[#161616] flex flex-col justify-between hover:border-gold/30 transition-all duration-500"
                id={`vehicle-card-${vehicle.id}`}
              >
                {/* Background Image with Zoom on Hover */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 z-10" />
                  <img
                    src={vehicle.image}
                    alt={vehicle.tag}
                    className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Card Header (Top Specs Tag overlay) */}
                <div className="relative z-20 p-6 md:p-8 flex justify-between items-start">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-gold uppercase">
                      {vehicle.tag}
                    </span>
                    <h3 className="font-serif italic font-light text-2xl md:text-3.5xl tracking-wide text-white capitalize mt-1">
                      {vehicle.title.toLowerCase()}
                    </h3>
                  </div>
                  
                  {/* Performance Specs pill */}
                  <div className="hidden sm:flex flex-col items-end text-right bg-[#161616]/85 backdrop-blur-md px-4 py-2 border border-white/10">
                    <span className="text-[9px] font-bold text-gold uppercase tracking-[0.2em]">
                      0-100 km/h
                    </span>
                    <span className="text-xs font-mono font-medium text-[#E0DDD5] mt-0.5">
                      {vehicle.specs.acceleration}
                    </span>
                  </div>
                </div>

                {/* Card Footer (Actions & Description) */}
                <div className="relative z-20 p-6 md:p-8 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent pt-16">
                  <p className="text-xs md:text-sm text-white/50 font-light leading-relaxed mb-6 max-w-md line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {vehicle.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                    {/* Primary actions link */}
                    <button
                      onClick={() => onExploreClick(vehicle)}
                      className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white hover:text-gold transition-colors group/link cursor-pointer"
                    >
                      Mehr erfahren
                      <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1.5 transition-transform duration-200" />
                    </button>

                    {/* Quick Config Button */}
                    <button
                      onClick={() => onConfigureClick(vehicle)}
                      className="px-5 py-2.5 border border-white/20 rounded-full text-[10px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-black hover:border-gold transition-all font-sans font-medium flex items-center gap-2 active:scale-98"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      Konfigurieren
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Always include BMW Service in the default or service filters */}
            {(activeCategory === "all" || activeCategory === "service") && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key="bmw-service-card"
                className="relative group h-[500px] overflow-hidden border border-white/10 rounded-none bg-[#161616] flex flex-col justify-between hover:border-gold/30 transition-all duration-500"
                id="bmw-service-card-div"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 z-10" />
                  <img
                    src="/src/assets/images/bmw_card_service_1783691286892.jpg"
                    alt="BMW Service"
                    className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Header */}
                <div className="relative z-20 p-6 md:p-8 flex justify-between items-start">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-gold uppercase">
                      BMW SERVICE
                    </span>
                    <h3 className="font-serif italic font-light text-2xl md:text-3.5xl tracking-wide text-white capitalize mt-1">
                      für alles bereit.
                    </h3>
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-1.5 bg-gold/10 backdrop-blur-md px-3.5 py-1.5 border border-gold/20 text-gold rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      Online Buchbar
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="relative z-20 p-6 md:p-8 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent pt-16">
                  <p className="text-xs md:text-sm text-white/50 font-light leading-relaxed mb-6 max-w-md">
                    Umfassender Service für ein sorgenfreies Fahrerlebnis. Ob saisonaler Check, Reifenwechsel oder fachmännische Inspektion – wir stehen bereit.
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <button
                      onClick={onServiceClick}
                      className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white hover:text-gold transition-colors group/link cursor-pointer"
                    >
                      Mehr erfahren
                      <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1.5 transition-transform duration-200" />
                    </button>

                    <button
                      onClick={onServiceClick}
                      className="px-5 py-2.5 border border-white/25 rounded-full text-[10px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-black hover:border-gold transition-all font-sans font-medium flex items-center gap-2 active:scale-98"
                    >
                      Termin buchen
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
