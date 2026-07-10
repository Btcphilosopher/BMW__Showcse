import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sliders, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Vehicle } from "../types";

interface HeroSliderProps {
  vehicles: Vehicle[];
  onConfigureClick: (vehicle: Vehicle) => void;
  onExploreClick: (vehicle: Vehicle) => void;
}

export default function HeroSlider({ vehicles, onConfigureClick, onExploreClick }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? vehicles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === vehicles.length - 1 ? 0 : prev + 1));
  };

  const currentVehicle = vehicles[currentIndex];

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8, ease: "easeOut" },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.5 },
      },
    }),
  };

  return (
    <section id="hero-slider-section" className="relative h-screen w-full bg-black overflow-hidden flex items-center">
      {/* Background Images with AnimatePresence */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
            
            <img
              src={currentVehicle.image}
              alt={currentVehicle.title}
              className="w-full h-full object-cover object-center transform scale-100"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full select-none">
        <div className="max-w-xl md:max-w-2xl text-left">
          {/* Animated Tag */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            key={`tag-${currentIndex}`}
            className="inline-block text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-gold mb-4"
          >
            {currentVehicle.tag}
          </motion.span>

          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            key={`title-${currentIndex}`}
            className="font-serif italic font-light text-4xl md:text-7xl tracking-wide text-white mb-6 leading-[1.1] capitalize"
          >
            {currentVehicle.title.toLowerCase()}
          </motion.h1>

          {/* Animated Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            key={`desc-${currentIndex}`}
            className="text-sm md:text-base text-white/50 font-sans font-light leading-relaxed mb-10 max-w-lg"
          >
            {currentVehicle.description}
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            key={`actions-${currentIndex}`}
            className="flex flex-wrap gap-8 items-center"
          >
            {/* Fine Luxury Explore Button */}
            <button
              onClick={() => onExploreClick(currentVehicle)}
              className="group flex items-center gap-4 text-left active:scale-98 transition-all"
              id="hero-explore-btn"
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white group-hover:bg-gold group-hover:border-gold group-hover:text-black transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-white/90 group-hover:text-gold transition-colors">
                Mehr erfahren
              </span>
            </button>

            {/* Inquire-styled configure button */}
            <button
              onClick={() => onConfigureClick(currentVehicle)}
              className="px-6 py-3 border border-white/25 rounded-full text-[10px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-black hover:border-gold transition-all font-sans font-medium flex items-center gap-2 active:scale-98"
              id="hero-configure-btn"
            >
              <Sliders className="w-3.5 h-3.5" />
              Konfigurieren
            </button>
          </motion.div>
        </div>
      </div>

      {/* Manual Arrow Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 border border-white/20 hover:border-white text-white/50 hover:text-white rounded-full bg-black/20 hover:bg-black/60 transition-all cursor-pointer backdrop-blur-xs"
        aria-label="Vorheriges Fahrzeug"
        id="hero-prev-btn"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 border border-white/20 hover:border-white text-white/50 hover:text-white rounded-full bg-black/20 hover:bg-black/60 transition-all cursor-pointer backdrop-blur-xs"
        aria-label="Nächstes Fahrzeug"
        id="hero-next-btn"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Slide Progress indicators at bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-8 flex justify-center gap-3">
        {vehicles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className="flex-1 py-3 focus:outline-none cursor-pointer group"
          >
            {/* The progress bar line */}
            <div className="h-[2px] w-full bg-white/10 relative rounded-full overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full bg-gold transition-all duration-[8000ms] ease-linear ${
                  idx === currentIndex ? "w-full" : "w-0"
                } ${idx < currentIndex ? "w-full transition-none" : ""}`}
              />
            </div>
            {/* Mini label */}
            <span className={`text-[10px] font-bold tracking-wider uppercase block text-center mt-2 transition-colors duration-300 ${idx === currentIndex ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}>
              0{idx + 1}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
