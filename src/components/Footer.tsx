import { Facebook, Instagram, Youtube, Linkedin, ArrowUp } from "lucide-react";

interface FooterProps {
  onQuickLinkClick: (actionType: string) => void;
  onVehicleSelect: (vehicleId: string) => void;
}

export default function Footer({ onQuickLinkClick, onVehicleSelect }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns = [
    {
      title: "MODELLE",
      links: [
        { label: "Alle Modelle", action: () => onQuickLinkClick("configure") },
        { label: "Elektrofahrzeuge", action: () => onVehicleSelect("ix") },
        { label: "Plug-in-Hybride", action: () => onVehicleSelect("5series") },
        { label: "BMW M", action: () => onVehicleSelect("m3") },
        { label: "BMW Individual", action: () => onVehicleSelect("ix") },
      ],
    },
    {
      title: "ELEKTROMOBILITÄT",
      links: [
        { label: "Unsere Elektromodelle", action: () => onVehicleSelect("i4") },
        { label: "Laden & Reichweite", action: () => onQuickLinkClick("configure") },
        { label: "BMW Charging", action: () => onQuickLinkClick("configure") },
        { label: "Nachhaltigkeit", action: () => {
          const section = document.getElementById("future-section");
          section?.scrollIntoView({ behavior: "smooth" });
        } },
      ],
    },
    {
      title: "SERVICE & ZUBEHÖR",
      links: [
        { label: "BMW Service", action: () => onQuickLinkClick("dealer") },
        { label: "Original Zubehör", action: () => onQuickLinkClick("shop") },
        { label: "Räder & Reifen", action: () => onQuickLinkClick("shop") },
        { label: "Teile & Zubehör", action: () => onQuickLinkClick("shop") },
      ],
    },
    {
      title: "ÜBER BMW",
      links: [
        { label: "Unternehmen", action: () => {} },
        { label: "Innovation", action: () => {
          const section = document.getElementById("future-section");
          section?.scrollIntoView({ behavior: "smooth" });
        } },
        { label: "Karriere", action: () => {} },
        { label: "BMW Motorsport", action: () => {} },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook", href: "https://facebook.com/BMW" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "https://instagram.com/BMW" },
    { icon: <Youtube className="w-5 h-5" />, label: "YouTube", href: "https://youtube.com/BMW" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://linkedin.com/company/bmw-group" },
  ];

  const legalLinks = [
    { label: "Impressum", href: "#" },
    { label: "Datenschutz", href: "#" },
    { label: "Rechtliche Hinweise", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "Cookie Einstellungen", href: "#" },
    { label: "Kontakt", href: "#" },
    { label: "Klageportal", href: "#" },
  ];

  return (
    <footer id="main-footer" className="bg-[#0A0A0A] border-t border-white/10 text-[#E0DDD5] pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Footer: Links columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-8 pb-12 border-b border-white/10">
          {columns.map((col, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-400 font-light">
                {col.links.map((link, lIndex) => (
                  <li key={lIndex}>
                    {link.action ? (
                      <button
                        onClick={link.action}
                        className="hover:text-white transition-colors duration-200 text-left cursor-pointer"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <span className="hover:text-white transition-colors duration-200 cursor-pointer">
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links Column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
              FOLGEN SIE UNS
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white hover:bg-white/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Back to top button */}
            <button
              onClick={handleScrollToTop}
              className="mt-6 self-start inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors cursor-pointer group"
              id="back-to-top-btn"
            >
              <span className="p-2 border border-white/10 group-hover:border-white rounded-full transition-all duration-300">
                <ArrowUp className="w-4 h-4" />
              </span>
              Nach oben
            </button>
          </div>
        </div>

        {/* Architectural Metadata Bar from Design Theme */}
        <div className="py-10 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-12 lg:gap-24">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-gold mb-2">PROJEKT STATUS</p>
              <p className="text-xs font-light tracking-wide text-white">4 Vollelektrische Modelle</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-gold mb-2">HAUPTSITZ</p>
              <p className="text-xs font-light tracking-wide text-white">München, DE</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-gold mb-2">VERFÜGBARKEIT</p>
              <p className="text-xs font-light tracking-wide text-[#C5A059]">2026 Curation Release</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-left">
              <p className="text-[9px] uppercase tracking-[0.2em] text-gold mb-1">KOORDINATEN</p>
              <p className="text-[10px] tracking-tighter text-white/80 font-mono">48.1772° N, 11.5561° E</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C5A059] transition-colors cursor-pointer group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white group-hover:text-gold transition-colors"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </div>
          </div>
        </div>

        {/* Bottom Footer: Legal & Copyright */}
        <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-light">
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
            <span className="font-semibold text-gray-400">© BMW AG 2026</span>
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-center lg:text-right text-[10px] text-gray-600">
            Diese Seite dient ausschließlich Demonstrationszwecken. BMW® und das BMW Logo sind eingetragene Marken der BMW AG.
          </div>
        </div>
      </div>
    </footer>
  );
}
