import { Sliders, BookOpen, Tag, ShoppingBag, Compass, MapPin } from "lucide-react";
import { QUICK_LINKS } from "../data";
import { QuickLink } from "../types";

interface QuickLinksBarProps {
  onLinkClick: (actionType: string) => void;
}

export default function QuickLinksBar({ onLinkClick }: QuickLinksBarProps) {
  // Direct icon component mapping for safe static compile
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sliders":
        return <Sliders className="w-5 h-5" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5" />;
      case "Tag":
        return <Tag className="w-5 h-5" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-5 h-5" />;
      case "Compass":
        return <Compass className="w-5 h-5" />;
      case "MapPin":
        return <MapPin className="w-5 h-5" />;
      default:
        return <Sliders className="w-5 h-5" />;
    }
  };

  return (
    <div
      id="quick-links-bar"
      className="bg-[#0A0A0A]/95 border-y border-white/10 text-[#E0DDD5] py-6 md:py-8 sticky top-[72px] lg:top-[88px] z-40 backdrop-blur-md shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-center">
          {QUICK_LINKS.map((link: QuickLink) => (
            <button
              key={link.id}
              onClick={() => onLinkClick(link.actionType)}
              className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-center justify-center gap-3 group text-center md:text-left cursor-pointer hover:bg-white/[0.02] py-2 px-3 border border-transparent hover:border-white/5 transition-all duration-300"
              id={`quick-link-${link.id}`}
            >
              {/* Icon container with hover animation */}
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#E0DDD5]/60 group-hover:text-gold group-hover:bg-gold/10 group-hover:scale-105 transition-all duration-300 border border-white/5 group-hover:border-gold/20">
                {getIcon(link.iconName)}
              </div>
              
              {/* Text label */}
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#E0DDD5]/80 group-hover:text-white transition-colors duration-200">
                  {link.label}
                </span>
                <span className="text-[10px] text-white/30 font-medium hidden md:inline group-hover:text-gold/60 transition-colors">
                  Ansehen
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
