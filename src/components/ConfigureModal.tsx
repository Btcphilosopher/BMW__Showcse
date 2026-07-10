import { useState } from "react";
import { X, Check, ArrowRight, Sparkles, AlertCircle, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Vehicle, VehicleColor, VehicleWheel } from "../types";

interface ConfigureModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVehicle: Vehicle;
  allVehicles: Vehicle[];
  onBookTestDrive: (vehicleName: string) => void;
}

export default function ConfigureModal({
  isOpen,
  onClose,
  initialVehicle,
  allVehicles,
  onBookTestDrive,
}: ConfigureModalProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(initialVehicle);
  const [selectedColor, setSelectedColor] = useState<VehicleColor>(initialVehicle.colors[0]);
  const [selectedWheel, setSelectedWheel] = useState<VehicleWheel>(initialVehicle.wheels[0]);
  const [isSaved, setIsSaved] = useState(false);

  // Helper to switch active car in configuration
  const handleVehicleChange = (vehicleId: string) => {
    const target = allVehicles.find((v) => v.id === vehicleId);
    if (target) {
      setSelectedVehicle(target);
      setSelectedColor(target.colors[0]);
      setSelectedWheel(target.wheels[0]);
      setIsSaved(false);
    }
  };

  // Pricing math
  const basePrice = selectedVehicle.basePrice;
  const colorPrice = selectedColor.priceModifier;
  const wheelPrice = selectedWheel.priceModifier;
  const totalPrice = basePrice + colorPrice + wheelPrice;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="bg-[#0A0A0A] border border-white/10 w-full max-w-5xl rounded-none shadow-2xl relative flex flex-col lg:flex-row h-full max-h-[90vh] md:max-h-[85vh] overflow-hidden"
        id="configure-modal-container"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-40 p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
          id="close-config-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left column: Visual Display of Car Spec */}
        <div className="w-full lg:w-[55%] bg-black/50 p-6 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto">
          <div>
            <span className="text-[10px] font-bold text-gold tracking-[0.25em] uppercase block mb-1">
              BMW KONFIGURATOR
            </span>
            <h2 className="font-serif italic font-light text-2xl md:text-3.5xl text-white capitalize tracking-wide">
              {selectedVehicle.tag.toLowerCase()}
            </h2>

            {/* Model Selector Dropdown inside config */}
            <div className="mt-4 flex gap-2">
              <label className="text-xs text-gray-400 font-semibold tracking-wider uppercase self-center">Fahrzeug:</label>
              <select
                value={selectedVehicle.id}
                onChange={(e) => handleVehicleChange(e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-xs font-bold tracking-wider uppercase py-1 px-3 rounded-none focus:outline-none focus:border-gold"
              >
                {allVehicles.map((v) => (
                  <option key={v.id} value={v.id} className="bg-[#0A0A0A] text-white text-xs font-bold">
                    {v.tag.replace("THE NEW ", "")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Large Interactive Car Spec Preview */}
          <div className="my-6 relative flex-1 flex items-center justify-center min-h-[220px]">
            {/* Color Gradient Aura beneath the car corresponding to chosen color */}
            <div
              className="absolute w-[300px] h-[150px] blur-[80px] opacity-30 rounded-full transition-all duration-500"
              style={{ backgroundColor: selectedColor.hex }}
            />

            <img
              src={selectedVehicle.image}
              alt={selectedVehicle.title}
              className="relative z-10 w-full max-w-[450px] h-auto object-contain transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            
            {/* Specs HUD overlay on the preview */}
            <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs border border-white/5 p-3 grid grid-cols-3 gap-2 text-center text-white">
              <div>
                <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Leistung</span>
                <span className="text-xs font-semibold">{selectedVehicle.specs.power.split(" (")[0]}</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">0-100 km/h</span>
                <span className="text-xs font-semibold">{selectedVehicle.specs.acceleration}</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Reichweite</span>
                <span className="text-xs font-semibold">{selectedVehicle.specs.range || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Pricing breakdown HUD at bottom left */}
          <div className="bg-white/5 p-4 border border-white/10">
            <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
              <span>Grundpreis:</span>
              <span className="font-mono">{formatPrice(basePrice)}</span>
            </div>
            {colorPrice > 0 && (
              <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                <span>Lackierung ({selectedColor.name}):</span>
                <span className="font-mono">+{formatPrice(colorPrice)}</span>
              </div>
            )}
            {wheelPrice > 0 && (
              <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                <span>Leichtmetallräder ({selectedWheel.size}):</span>
                <span className="font-mono">+{formatPrice(wheelPrice)}</span>
              </div>
            )}
            <div className="h-px bg-white/10 my-2" />
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Unverbindliche Preisempfehlung:</span>
              <span className="text-xl font-bold font-mono text-bmw-blue leading-none">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Right column: Configurator Actions */}
        <div className="w-full lg:w-[45%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <AnimatePresence mode="wait">
            {!isSaved ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
                key="config-choices"
              >
                {/* Paint Chooser */}
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4 border-b border-white/10 pb-2 flex justify-between">
                    <span>1. EXKLUSIVE LACKIERUNG</span>
                    <span className="text-white normal-case font-medium">{selectedColor.name}</span>
                  </h3>
                  
                  <div className="flex flex-wrap gap-3">
                    {selectedVehicle.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer relative ${
                          selectedColor.name === color.name ? "border-bmw-blue scale-110" : "border-white/25 hover:border-white/50"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor.name === color.name && (
                          <Check className={`w-5 h-5 ${color.hex === "#ffffff" ? "text-black" : "text-white"}`} />
                        )}
                        {color.priceModifier > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-bmw-blue text-white px-1 font-bold rounded-full">
                            +
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wheels Chooser */}
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4 border-b border-white/10 pb-2">
                    2. LEICHTMETALLRÄDER
                  </h3>
                  
                  <div className="space-y-3">
                    {selectedVehicle.wheels.map((wheel) => (
                      <button
                        key={wheel.name}
                        onClick={() => setSelectedWheel(wheel)}
                        className={`w-full text-left p-3.5 border flex items-center justify-between transition-all cursor-pointer ${
                          selectedWheel.name === wheel.name
                            ? "bg-bmw-blue/10 border-bmw-blue text-white"
                            : "bg-white/5 border-white/5 hover:bg-white/10 text-gray-300"
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold tracking-wide uppercase">{wheel.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">Größe: {wheel.size}</p>
                        </div>
                        <span className="text-xs font-mono font-bold">
                          {wheel.priceModifier === 0 ? "Inklusive" : `+ ${formatPrice(wheel.priceModifier)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Tech specs indicator */}
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4 border-b border-white/10 pb-2">
                    TECHNISCHE DATEN ({selectedVehicle.tag.replace("THE NEW ", "")})
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm font-light text-gray-300">
                    <div className="bg-white/5 p-3">
                      <span className="text-[9px] text-gray-500 font-bold block uppercase tracking-wider">Antriebskraft</span>
                      <span className="font-semibold text-white mt-1 block">{selectedVehicle.specs.power}</span>
                    </div>
                    <div className="bg-white/5 p-3">
                      <span className="text-[9px] text-gray-500 font-bold block uppercase tracking-wider">Höchstgeschwindigkeit</span>
                      <span className="font-semibold text-white mt-1 block">{selectedVehicle.specs.topSpeed}</span>
                    </div>
                    {selectedVehicle.specs.battery && (
                      <div className="bg-white/5 p-3">
                        <span className="text-[9px] text-gray-500 font-bold block uppercase tracking-wider">Batteriekapazität</span>
                        <span className="font-semibold text-white mt-1 block">{selectedVehicle.specs.battery}</span>
                      </div>
                    )}
                    <div className="bg-white/5 p-3">
                      <span className="text-[9px] text-gray-500 font-bold block uppercase tracking-wider">CO2 Emissionen</span>
                      <span className="font-semibold text-emerald-400 mt-1 block">0 g/km (Lokale Emissionen)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setIsSaved(true)}
                    className="w-full py-4 bg-bmw-blue hover:bg-blue-600 text-white font-bold text-xs tracking-widest uppercase transition-all duration-200 shadow-lg shadow-bmw-blue/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    Konfiguration speichern
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col justify-center items-center text-center p-6 space-y-6"
                key="config-success"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                  <Check className="w-8 h-8" />
                </div>

                <span className="text-xs font-bold text-emerald-400 tracking-[0.25em] uppercase">
                  ERFOLGREICH GESPEICHERT
                </span>

                <h3 className="font-display font-light text-2xl md:text-3xl text-white uppercase tracking-tight">
                  IHRE INDIVIDUELLE KONFIGURATION
                </h3>

                <p className="text-sm text-gray-300 font-light max-w-sm leading-relaxed">
                  Ihr persönlicher BMW wurde erfolgreich zusammengestellt. Ein digitales Factsheet Ihrer Konfiguration steht bereit.
                </p>

                {/* Spec Summary Ticket */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-none text-left w-full space-y-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-bold uppercase">Modell:</span>
                    <span className="text-white font-bold">{selectedVehicle.tag}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-bold uppercase">Farbe:</span>
                    <span className="text-white">{selectedColor.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-bold uppercase">Räder:</span>
                    <span className="text-white">{selectedWheel.name}</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white uppercase">Endpreis inkl. MwSt:</span>
                    <span className="text-lg font-mono font-bold text-bmw-blue">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <div className="w-full space-y-3 pt-4">
                  <button
                    onClick={() => {
                      onClose();
                      onBookTestDrive(selectedVehicle.tag);
                    }}
                    className="w-full py-3.5 bg-bmw-blue hover:bg-blue-600 text-white font-bold text-xs tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Probefahrt mit diesem Fahrzeug vereinbaren</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsSaved(false)}
                    className="w-full py-3 border border-white/20 hover:border-white text-white font-bold text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer"
                  >
                    Zurück zum Editor
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
