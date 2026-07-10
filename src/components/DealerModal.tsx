import { useState, FormEvent } from "react";
import { X, MapPin, Phone, Clock, Calendar, CheckCircle, Wrench, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GERMAN_DEALERS } from "../data";

interface DealerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DealerModal({ isOpen, onClose }: DealerModalProps) {
  const [selectedDealerId, setSelectedDealerId] = useState(GERMAN_DEALERS[0].id);
  const [isServiceForm, setIsServiceForm] = useState(false);
  
  // Service form states
  const [name, setName] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [serviceType, setServiceType] = useState("Inspektion & Ölwechsel");
  const [date, setDate] = useState("");
  const [bookingCompleted, setBookingCompleted] = useState(false);

  const selectedDealer = GERMAN_DEALERS.find((d) => d.id === selectedDealerId);

  const serviceOptions = [
    "Inspektion & Ölwechsel",
    "Räder- & Reifenwechsel",
    "Fahrzeug-Check & TÜV/AU",
    "Bremsen-Service",
    "Klima-Service",
    "Glas-Reparatur"
  ];

  const handleBookService = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !licensePlate || !date) return;
    setBookingCompleted(true);
  };

  const handleClose = () => {
    setIsServiceForm(false);
    setBookingCompleted(false);
    setName("");
    setLicensePlate("");
    setDate("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="bg-[#0A0A0A] border border-white/10 w-full max-w-2xl rounded-none shadow-2xl relative p-6 md:p-10 max-h-[90vh] overflow-y-auto"
        id="dealer-modal-container"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <AnimatePresence mode="wait">
          {!bookingCompleted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="dealer-core"
            >
              {!isServiceForm ? (
                <>
                  <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase block mb-1">
                    STANDORTE & PARTNER
                  </span>
                  <h2 className="font-serif italic font-light text-2xl md:text-3xl text-white capitalize tracking-wide mb-8">
                    BMW niederlassungen in Deutschland
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* List of Dealers */}
                    <div className="space-y-3">
                      {GERMAN_DEALERS.map((dealer) => (
                        <button
                          key={dealer.id}
                          onClick={() => setSelectedDealerId(dealer.id)}
                          className={`w-full text-left p-4 border transition-all rounded-none flex justify-between items-center cursor-pointer ${
                            selectedDealerId === dealer.id
                              ? "bg-gold/10 border-gold text-gold"
                              : "bg-white/5 border-white/5 hover:bg-white/10 text-gray-400"
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold tracking-wider block uppercase">{dealer.city}</span>
                            <span className="text-[10px] text-gray-500 mt-1 block">{dealer.name}</span>
                          </div>
                          <MapPin className={`w-4 h-4 ${selectedDealerId === dealer.id ? "text-gold" : "text-gray-600"}`} />
                        </button>
                      ))}
                    </div>

                    {/* Active Dealer Info Display */}
                    {selectedDealer && (
                      <div className="bg-white/[0.02] border border-white/5 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-gold mb-3">
                            <MapPin className="w-5 h-5" />
                            <span className="text-xs font-bold tracking-widest uppercase">DETAILANSICHT</span>
                          </div>
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{selectedDealer.name}</h4>
                          <p className="text-xs text-white/50 font-light leading-relaxed">
                            {selectedDealer.street}<br />
                            {selectedDealer.zip} {selectedDealer.city}
                          </p>

                          <div className="mt-6 space-y-3 text-xs font-light text-white/60">
                            <div className="flex gap-2 items-center">
                              <Phone className="w-3.5 h-3.5 text-gray-500" />
                              <span>+49 (0) 89 1250 16000</span>
                            </div>
                            <div className="flex gap-2 items-start">
                              <Clock className="w-3.5 h-3.5 text-gray-500 mt-0.5" />
                              <div>
                                <p className="font-semibold text-white">Öffnungszeiten (Verkauf):</p>
                                <p className="text-[11px] text-white/40 mt-0.5">Mo - Fr: 08:00 - 18:30 Uhr</p>
                                <p className="text-[11px] text-white/40">Sa: 09:00 - 16:00 Uhr</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 mt-6">
                          <button
                            onClick={() => setIsServiceForm(true)}
                            className="w-full py-3 bg-gold text-black hover:bg-gold/90 font-bold text-xs tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-md shadow-gold/10"
                          >
                            <Wrench className="w-4 h-4" />
                            Service-Termin anfragen
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <span className="text-xs font-semibold tracking-[0.25em] text-gold uppercase block mb-1">
                    WERKSTATT-PLANER
                  </span>
                  <h2 className="font-serif italic font-light text-2xl md:text-3xl text-white capitalize tracking-wide mb-8">
                    service-termin online buchen
                  </h2>

                  <form onSubmit={handleBookService} className="space-y-5">
                    {/* Active Dealer Notification */}
                    <div className="p-3 bg-white/[0.02] border border-white/10 flex gap-3 items-center text-xs text-white/60">
                      <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>Ausgewählter Partner: <strong className="text-white">{selectedDealer?.name}</strong></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ihr Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Vor- & Nachname"
                          className="w-full bg-white/5 border border-white/10 text-white text-xs p-3 focus:outline-none focus:border-gold"
                        />
                      </div>
                      
                      {/* License plate input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kfz-Kennzeichen</label>
                        <input
                          type="text"
                          required
                          value={licensePlate}
                          onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                          placeholder="M-BMW 2026"
                          className="w-full bg-white/5 border border-white/10 text-white text-xs p-3 focus:outline-none focus:border-gold placeholder:text-gray-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Service Type selection */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Art der Arbeit</label>
                        <select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 text-white text-xs p-3 focus:outline-none focus:border-gold"
                        >
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#0A0A0A] text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Date of service selection */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Terminwunsch</label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full bg-white/5 border border-white/10 text-white text-xs p-3 focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                      <button
                        type="button"
                        onClick={() => setIsServiceForm(false)}
                        className="flex-1 py-3 border border-white/10 hover:border-white text-white font-bold text-xs tracking-widest uppercase transition-all rounded-none cursor-pointer"
                      >
                        Abbrechen
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-gold text-black hover:bg-gold/90 font-bold text-xs tracking-widest uppercase transition-all rounded-none cursor-pointer shadow-md shadow-gold/10 active:scale-98"
                      >
                        Termin anfragen
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center p-6 space-y-6"
              key="service-success"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold text-emerald-400 tracking-[0.25em] uppercase">
                ANFRAGE ERFOLGREICH ÜBERMITTELT
              </span>

              <h3 className="font-serif italic font-light text-2xl md:text-3xl text-white capitalize tracking-wide">
                service-termin bestätigt
              </h3>

              <p className="text-sm text-white/50 font-light max-w-sm leading-relaxed">
                Vielen Dank! Wir haben Ihren Wunschtermin für den Service reserviert. Ein Serviceberater wird sich zwecks Bestätigung in Kürze bei Ihnen melden.
              </p>

              {/* Service Ticket */}
              <div className="w-full max-w-sm border border-white/15 bg-white/5 p-5 text-left space-y-3 rounded-none">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-bold uppercase">Kunde:</span>
                  <span className="text-white font-bold">{name}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-bold uppercase">Kennzeichen:</span>
                  <span className="text-white font-mono">{licensePlate}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-bold uppercase">Service-Art:</span>
                  <span className="text-white font-semibold">{serviceType}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-bold uppercase">Datum:</span>
                  <span className="text-white font-semibold">{new Date(date).toLocaleDateString("de-DE")}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-center gap-2 text-[10px] text-amber-500 bg-amber-500/10 p-2.5 border border-amber-500/20 leading-relaxed">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>Bitte bringen Sie Ihren Fahrzeugschein sowie die Schlüssel mit.</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full max-w-xs py-3 bg-white text-black font-bold text-xs tracking-widest uppercase hover:bg-gray-200 transition-all cursor-pointer"
              >
                Schließen
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
