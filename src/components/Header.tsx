import { useState, useEffect } from "react";
import { Search, MapPin, User, Menu, X, ChevronDown, Compass, Tag, ShoppingBag, Sliders, BookOpen } from "lucide-react";

interface HeaderProps {
  onQuickLinkClick: (actionType: string) => void;
  onVehicleSelect: (vehicleId: string) => void;
}

export default function Header({ onQuickLinkClick, onVehicleSelect }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "modelle", label: "Modelle", hasDropdown: true },
    { id: "elektro", label: "Elektromobilität", hasDropdown: true },
    { id: "konfig", label: "Konfigurator", hasDropdown: false, action: () => onQuickLinkClick("configure") },
    { id: "service", label: "Service & Zubehör", hasDropdown: true },
    { id: "entdecken", label: "Entdecken", hasDropdown: true },
  ];

  const handleDropdownToggle = (id: string) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-3" : "bg-gradient-to-b from-black/80 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left Side: Logo & Primary Nav */}
        <div className="flex items-center gap-8 lg:gap-12">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" id="logo-link">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#C5A059] to-[#8E793E] rounded-full flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <span className="text-[10px] font-bold text-black tracking-tighter">BMW</span>
            </div>
            <span className="text-sm font-medium tracking-[0.25em] uppercase text-[#E0DDD5] group-hover:text-gold transition-colors">AETHER</span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" id="desktop-nav">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.hasDropdown ? (
                  <button
                    onClick={() => handleDropdownToggle(item.id)}
                    className={`flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors uppercase ${
                      activeDropdown === item.id ? "text-gold" : "text-gray-200 hover:text-gold"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.id ? "rotate-180 text-gold" : ""}`} />
                  </button>
                ) : (
                  <button
                    onClick={item.action}
                    className="text-sm font-medium tracking-wide text-gray-200 hover:text-gold transition-colors uppercase"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Side: Utilities & Hamburger */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => onQuickLinkClick("dealer")}
            className="p-2 text-gray-300 hover:text-gold hover:bg-white/5 rounded-full transition-all"
            aria-label="Standorte"
          >
            <MapPin className="w-5 h-5" />
          </button>
          <button
            onClick={() => onQuickLinkClick("testdrive")}
            className="p-2 text-gray-300 hover:text-gold hover:bg-white/5 rounded-full transition-all"
            aria-label="Mein Profil"
          >
            <User className="w-5 h-5" />
          </button>
          
          <div className="h-6 w-px bg-white/20 hidden lg:block" />

          {/* Luxury Inquiry Button from theme */}
          <button
            onClick={() => onQuickLinkClick("testdrive")}
            className="hidden md:inline-block px-5 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all font-sans font-medium"
          >
            Anfragen
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-2 text-gray-300 hover:text-white bg-white/5 lg:bg-transparent px-3 py-1.5 lg:p-2 rounded-full lg:rounded-none transition-all lg:hover:bg-none"
            id="mobile-menu-btn"
          >
            <span className="text-xs uppercase tracking-widest font-semibold hidden lg:inline">Menu</span>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Models Dropdown Panel */}
      {activeDropdown === "modelle" && (
        <div className="absolute left-0 w-full bg-black/95 border-b border-white/10 py-10 shadow-2xl z-40 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-8">
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 border-b border-white/10 pb-2">Elektro (i)</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => { onVehicleSelect("ix"); setActiveDropdown(null); }} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">BMW iX (Luxury SUV)</button></li>
                <li><button onClick={() => { onVehicleSelect("i4"); setActiveDropdown(null); }} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">BMW i4 (Gran Coupé)</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 border-b border-white/10 pb-2">Limousinen / Coupés</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => { onVehicleSelect("5series"); setActiveDropdown(null); }} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">BMW 5er Limousine</button></li>
                <li><a href="#" className="text-gray-500 hover:text-white transition-colors">BMW 3er Limousine</a></li>
                <li><a href="#" className="text-gray-500 hover:text-white transition-colors">BMW 7er Luxusklasse</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 border-b border-white/10 pb-2">BMW M Performance</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => { onVehicleSelect("m3"); setActiveDropdown(null); }} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150">BMW M3 Competition</button></li>
                <li><a href="#" className="text-gray-500 hover:text-white transition-colors">BMW M4 Coupé</a></li>
                <li><a href="#" className="text-gray-500 hover:text-white transition-colors">BMW M5 High-Performance</a></li>
              </ul>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <span className="text-xs font-bold text-bmw-blue uppercase tracking-widest">Highlights 2026</span>
              <h5 className="font-display font-medium text-lg text-white mt-2 leading-tight">Zukunft der Elektromobilität</h5>
              <p className="text-xs text-gray-400 mt-2">Jetzt Probefahrt buchen und die Faszination des rein elektrischen Fahrens erleben.</p>
              <button
                onClick={() => { onQuickLinkClick("testdrive"); setActiveDropdown(null); }}
                className="mt-4 px-4 py-2 bg-bmw-blue hover:bg-blue-600 text-white text-xs font-bold tracking-widest uppercase transition-all duration-200"
              >
                Probefahrt anfragen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Elektromobilität Dropdown Panel */}
      {activeDropdown === "elektro" && (
        <div className="absolute left-0 w-full bg-black/95 border-b border-white/10 py-10 shadow-2xl z-40 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-8">
            <div className="col-span-2">
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 border-b border-white/10 pb-2">Elektrisierende Innovationen</h4>
              <p className="text-sm text-gray-300 leading-relaxed max-w-lg mb-4">
                BMW i bietet visionäre Elektrofahrzeuge und Mobilitätsdienstleistungen, ein inspirierendes Design sowie ein neues Verständnis von Premium, das sich stark über Nachhaltigkeit definiert.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => { onVehicleSelect("ix"); setActiveDropdown(null); }} className="p-4 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-left transition-all">
                  <span className="text-xs text-bmw-blue font-bold tracking-widest block uppercase">SUV</span>
                  <span className="text-sm font-semibold text-white block mt-1">BMW iX</span>
                </button>
                <button onClick={() => { onVehicleSelect("i4"); setActiveDropdown(null); }} className="p-4 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-left transition-all">
                  <span className="text-xs text-bmw-blue font-bold tracking-widest block uppercase">Coupé</span>
                  <span className="text-sm font-semibold text-white block mt-1">BMW i4</span>
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 border-b border-white/10 pb-2">Ladelösungen</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">BMW Wallbox für Zuhause</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Öffentliches Laden & Tarife</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reichweitenrechner</a></li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-bmw-blue/20 to-black p-6 rounded-lg border border-white/10">
              <h5 className="font-display font-medium text-lg text-white">Reichweiten & Ladezeiten</h5>
              <p className="text-xs text-gray-300 mt-2">Die Batterie des BMW iX lädt an einer Schnellladestation in nur 31 Minuten von 10 auf 80 %.</p>
              <button
                onClick={() => { onQuickLinkClick("configure"); setActiveDropdown(null); }}
                className="mt-4 px-4 py-2 border border-white text-white hover:bg-white hover:text-black text-xs font-bold tracking-widest uppercase transition-all duration-200"
              >
                Konfigurieren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Dropdown Panel */}
      {activeDropdown === "service" && (
        <div className="absolute left-0 w-full bg-black/95 border-b border-white/10 py-10 shadow-2xl z-40 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-8">
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 border-b border-white/10 pb-2">BMW Service</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Service & Inspektion</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gewährleistung & Garantie</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pannenhilfe 24/7</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 border-b border-white/10 pb-2">Original BMW Zubehör</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Räder & Reifen</a></li>
                <li><a href="#" className="hover:text-white transition-colors">M Performance Parts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dachboxen & Trägersysteme</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 border-b border-white/10 pb-2">ConnectedDrive</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">My BMW App</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ConnectedDrive Store</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Software-Updates</a></li>
              </ul>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest block">● Service Termin online</span>
              <h5 className="font-display font-medium text-lg text-white mt-2 leading-tight">Rundum sorglos.</h5>
              <p className="text-xs text-gray-400 mt-2">Buchen Sie Ihren nächsten Service-Termin in nur 2 Minuten ganz bequem online.</p>
              <button
                onClick={() => { onQuickLinkClick("dealer"); setActiveDropdown(null); }}
                className="mt-4 px-4 py-2 bg-white text-black hover:bg-gray-200 text-xs font-bold tracking-widest uppercase transition-all duration-200"
              >
                Termin vereinbaren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Entdecken Dropdown Panel */}
      {activeDropdown === "entdecken" && (
        <div className="absolute left-0 w-full bg-black/95 border-b border-white/10 py-10 shadow-2xl z-40 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-8">
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 border-b border-white/10 pb-2">BMW Welt & Museum</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Besucher-Informationen</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Werksführungen</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Veranstaltungen</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 border-b border-white/10 pb-2">Motorsport</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">BMW M Motorsport</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Formel E & Rennserien</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fahrer-Ausbildungen</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 border-b border-white/10 pb-2">Nachhaltigkeit</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Kreislaufwirtschaft</a></li>
                <li><a href="#" className="hover:text-white transition-colors">CO2-Reduzierung</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Zukunftskonzepte</a></li>
              </ul>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block">BMW Design</span>
              <h5 className="font-display font-medium text-lg text-white mt-2 leading-tight">BMW Neue Klasse</h5>
              <p className="text-xs text-gray-400 mt-2">Die Vision des nächsten Kapitels der BMW Ära: Digital, zirkulär und rein elektrisch.</p>
              <a href="#future-section" onClick={() => setActiveDropdown(null)} className="mt-4 inline-block px-4 py-2 border border-white/30 hover:border-white text-white text-xs font-bold tracking-widest uppercase transition-all duration-200">
                Mehr erfahren
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for desktop dropdowns to close on click outside */}
      {activeDropdown && (
        <div
          className="fixed inset-0 top-[88px] bg-black/40 z-30"
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col justify-between p-6 animate-in fade-in duration-200" id="mobile-menu-container">
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-semibold tracking-widest uppercase text-white">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white"
                id="close-menu-btn"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-5 text-xl font-medium tracking-wide" id="mobile-nav-links">
              <button
                onClick={() => { setMobileMenuOpen(false); onVehicleSelect("ix"); }}
                className="text-left py-2 border-b border-white/10 hover:text-bmw-blue transition-colors text-white"
              >
                BMW iX
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onVehicleSelect("5series"); }}
                className="text-left py-2 border-b border-white/10 hover:text-bmw-blue transition-colors text-white"
              >
                BMW 5er Limousine
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onVehicleSelect("i4"); }}
                className="text-left py-2 border-b border-white/10 hover:text-bmw-blue transition-colors text-white"
              >
                BMW i4 Gran Coupé
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onVehicleSelect("m3"); }}
                className="text-left py-2 border-b border-white/10 hover:text-bmw-blue transition-colors text-white"
              >
                BMW M3 Competition
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onQuickLinkClick("configure"); }}
                className="text-left py-2 border-b border-white/10 text-bmw-blue flex items-center gap-2"
              >
                <Sliders className="w-5 h-5" /> Konfigurator
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onQuickLinkClick("testdrive"); }}
                className="text-left py-2 border-b border-white/10 text-white flex items-center gap-2"
              >
                <Compass className="w-5 h-5" /> Probefahrt buchen
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onQuickLinkClick("brochure"); }}
                className="text-left py-2 border-b border-white/10 text-white flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" /> Broschüren & Preise
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onQuickLinkClick("dealer"); }}
                className="text-left py-2 border-b border-white/10 text-white flex items-center gap-2"
              >
                <MapPin className="w-5 h-5" /> Händler finden
              </button>
            </nav>
          </div>

          <div className="text-xs text-gray-500 text-center border-t border-white/15 pt-4">
            © BMW AG 2026 | Alle Rechte vorbehalten.
          </div>
        </div>
      )}
    </header>
  );
}
