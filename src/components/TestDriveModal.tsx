import { useState, FormEvent } from "react";
import { X, Calendar, Clock, MapPin, User, Mail, Phone, CheckCircle2, Ticket, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Vehicle, TestDriveBooking } from "../types";
import { GERMAN_DEALERS } from "../data";

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  prefilledVehicleName?: string;
}

export default function TestDriveModal({
  isOpen,
  onClose,
  vehicles,
  prefilledVehicleName = "",
}: TestDriveModalProps) {
  const [selectedVehicleId, setSelectedVehicleId] = useState(
    vehicles.find((v) => v.tag === prefilledVehicleName)?.id || vehicles[0].id
  );
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10:00 - 12:00 Uhr");
  const [dealerId, setDealerId] = useState(GERMAN_DEALERS[0].id);
  
  // Contact info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Submit State
  const [bookingResult, setBookingResult] = useState<TestDriveBooking | null>(null);

  const timeSlots = [
    "08:00 - 10:00 Uhr",
    "10:00 - 12:00 Uhr",
    "13:00 - 15:00 Uhr",
    "15:00 - 17:00 Uhr",
    "17:00 - 19:00 Uhr"
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!date || !name || !email || !phone) return;

    const chosenVehicle = vehicles.find((v) => v.id === selectedVehicleId);
    const chosenDealer = GERMAN_DEALERS.find((d) => d.id === dealerId);

    const booking: TestDriveBooking = {
      id: "BMW-" + Math.floor(Math.random() * 900000 + 100000),
      name,
      email,
      phone,
      vehicleId: selectedVehicleId,
      vehicleName: chosenVehicle?.tag || "BMW Fahrzeug",
      date,
      timeSlot,
      dealerLocation: chosenDealer ? `${chosenDealer.name}, ${chosenDealer.city}` : "BMW Partner",
      status: "confirmed"
    };

    setBookingResult(booking);
  };

  const resetForm = () => {
    setBookingResult(null);
    setDate("");
    setName("");
    setEmail("");
    setPhone("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="bg-[#0A0A0A] border border-white/10 w-full max-w-2xl rounded-none shadow-2xl relative p-6 md:p-10 max-h-[90vh] overflow-y-auto"
        id="test-drive-modal-container"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <AnimatePresence mode="wait">
          {!bookingResult ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="booking-form-wrapper"
            >
              <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase block mb-1">
                EXKLUSIVES ERLEBNIS
              </span>
              <h2 className="font-serif italic font-light text-2xl md:text-4xl text-white capitalize tracking-wide mb-8">
                probefahrt vereinbaren
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Vehicle selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <span>1. Fahrzeug auswählen</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {vehicles.map((v) => (
                      <button
                        type="button"
                        key={v.id}
                        onClick={() => setSelectedVehicleId(v.id)}
                        className={`p-3.5 border text-left flex flex-col justify-between transition-all rounded-none cursor-pointer ${
                          selectedVehicleId === v.id
                            ? "bg-gold/10 border-gold text-gold"
                            : "bg-white/5 border-white/5 hover:bg-white/10 text-gray-400"
                        }`}
                      >
                        <span className="text-[10px] font-bold tracking-wider uppercase block">{v.tag.replace("THE NEW ", "")}</span>
                        <span className="text-[9px] text-gray-500 font-mono mt-2">{v.specs.power.split(" (")[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dealer and DateTime selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* BMW Dealer selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      <span>2. BMW Niederlassung</span>
                    </label>
                    <select
                      value={dealerId}
                      onChange={(e) => setDealerId(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white text-xs font-bold tracking-wider uppercase p-3 rounded-none focus:outline-none focus:border-gold"
                    >
                      {GERMAN_DEALERS.map((dealer) => (
                        <option key={dealer.id} value={dealer.id} className="bg-[#0A0A0A] text-white">
                          {dealer.city} - {dealer.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>3. Wunschdatum</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-white/5 border border-white/10 text-white text-xs font-bold tracking-wider uppercase p-3 rounded-none focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Time Slot selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span>4. Wunsch-Uhrzeit</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTimeSlot(slot)}
                        className={`px-4 py-2 border text-[10px] font-bold tracking-wider uppercase transition-all rounded-none cursor-pointer ${
                          timeSlot === slot
                            ? "bg-gold border-gold text-black"
                            : "bg-white/5 border-white/5 hover:bg-white/10 text-gray-300"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact information */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gold" />
                    <span>5. Kontaktdaten</span>
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Vor- & Nachname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white text-xs p-3.5 pl-4 rounded-none focus:outline-none focus:border-gold placeholder:text-gray-600"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="E-Mail-Adresse"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white text-xs p-3.5 pl-4 rounded-none focus:outline-none focus:border-gold placeholder:text-gray-600"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="Telefonnummer"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white text-xs p-3.5 pl-4 rounded-none focus:outline-none focus:border-gold placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gold text-black hover:bg-gold/90 font-bold text-xs tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold/15 active:scale-98"
                  >
                    <span>Probefahrt verbindlich anfragen</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center p-6 space-y-6"
              key="booking-success"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold text-emerald-400 tracking-[0.25em] uppercase">
                BUCHUNG ERFOLGREICH ÜBERMITTELT
              </span>

              <h3 className="font-serif italic font-light text-2xl md:text-3xl text-white capitalize tracking-wide">
                probefahrt-bestätigung
              </h3>

              <p className="text-sm text-white/50 font-light max-w-md leading-relaxed">
                Vielen Dank! Ihre Anfrage wurde an die gewählte BMW Niederlassung übermittelt. Ein Kundenberater wird Sie in Kürze kontaktieren.
              </p>

              {/* Digital Booking Ticket */}
              <div className="w-full max-w-md border border-white/15 bg-white/5 rounded-none relative overflow-hidden" id="ticket-summary">
                {/* Ticket edge notch effects */}
                <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0A0A0A] border-r border-white/15" />
                <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0A0A0A] border-l border-white/15" />
                
                {/* Ticket Header */}
                <div className="bg-gold/10 border-b border-dashed border-white/20 p-5 flex justify-between items-center text-left">
                  <div className="flex gap-2 items-center text-gold">
                    <Ticket className="w-5 h-5" />
                    <span className="text-xs font-bold tracking-widest uppercase">PROBEFAHRT PASS</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-white">{bookingResult.id}</span>
                </div>

                {/* Ticket Body */}
                <div className="p-5 text-left space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Kunde</span>
                      <span className="font-bold text-white block mt-0.5">{bookingResult.name}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Fahrzeug</span>
                      <span className="font-bold text-white block mt-0.5">{bookingResult.vehicleName}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div>
                      <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Datum / Uhrzeit</span>
                      <span className="text-white block mt-0.5 font-semibold">
                        {new Date(bookingResult.date).toLocaleDateString("de-DE", {
                          weekday: "short",
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </span>
                      <span className="text-[10px] text-gray-500 mt-0.5 block">{bookingResult.timeSlot}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">BMW Partner</span>
                      <span className="text-white block mt-0.5 font-semibold leading-tight">{bookingResult.dealerLocation}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-sm space-y-3 pt-4">
                <button
                  onClick={resetForm}
                  className="w-full py-3.5 bg-white text-black font-bold text-xs tracking-widest uppercase hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Weiteren Termin buchen
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 border border-white/20 hover:border-white text-white font-bold text-xs tracking-widest uppercase transition-all cursor-pointer"
                >
                  Schließen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
