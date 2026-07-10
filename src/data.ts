import { Vehicle, QuickLink } from "./types";

export const VEHICLES: Vehicle[] = [
  {
    id: "ix",
    tag: "THE NEW iX",
    title: "FREIHEIT NEU INTERPRETIERT.",
    description: "Elektrisch. Innovativ. Inspirierend. Entdecken Sie den neuen BMW iX, eine Ikone des modernen Luxus und zukunftsweisender Elektromobilität.",
    basePrice: 77300,
    image: "/src/assets/images/bmw_hero_ix_1783691237591.jpg",
    category: "electric",
    colors: [
      { name: "Sophisto Grau Brillanteffekt", hex: "#3b3e41", priceModifier: 0 },
      { name: "Mineralweiß Metallic", hex: "#f5f5f0", priceModifier: 1200 },
      { name: "Phytonikblau Metallic", hex: "#0f2d59", priceModifier: 1200 },
      { name: "Aventurinrot Metallic", hex: "#6b1120", priceModifier: 2300 },
      { name: "Saphirschwarz Metallic", hex: "#1c1d21", priceModifier: 1200 }
    ],
    wheels: [
      { name: '20" Aerodynamikräder 1002 Bicolor', size: '20"', priceModifier: 0 },
      { name: '21" Aerodynamikräder 1012 3D-Glanzschliff', size: '21"', priceModifier: 1650 },
      { name: '22" Individual Aerodynamikräder 1021 Multicolour', size: '22"', priceModifier: 3200 }
    ],
    specs: {
      power: "385 kW (523 PS)",
      acceleration: "4,6 s",
      topSpeed: "200 km/h",
      range: "bis zu 630 km",
      battery: "111,5 kWh"
    }
  },
  {
    id: "5series",
    tag: "THE NEW 5",
    title: "PERFEKTION IN BEWEGUNG.",
    description: "Dynamik und Komfort auf einem neuen Level. Die BMW 5er Limousine vereint sportliche Eleganz mit modernsten Fahrassistenzsystemen.",
    basePrice: 57550,
    image: "/src/assets/images/bmw_card_5series_1783691249988.jpg",
    category: "sedan",
    colors: [
      { name: "Cape York Grün Metallic", hex: "#2c3b36", priceModifier: 0 },
      { name: "Saphirschwarz Metallic", hex: "#1c1d21", priceModifier: 1050 },
      { name: "Alpinweiß uni", hex: "#ffffff", priceModifier: 0 },
      { name: "Carbon Black Metallic", hex: "#0b141a", priceModifier: 1050 }
    ],
    wheels: [
      { name: '19" Leichtmetallräder Triplex-Speiche', size: '19"', priceModifier: 0 },
      { name: '20" Leichtmetallräder Sternspeiche', size: '20"', priceModifier: 1400 },
      { name: '21" Individual Aerodynamikräder Bicolor', size: '21"', priceModifier: 2900 }
    ],
    specs: {
      power: "150 kW (204 PS)",
      acceleration: "7,5 s",
      topSpeed: "230 km/h",
      range: "bis zu 582 km"
    }
  },
  {
    id: "i4",
    tag: "THE i4",
    title: "100 % ELEKTRISCH. 100 % BMW.",
    description: "Nachhaltige Innovation trifft pure Fahrfreude. Das erste vollelektrische Gran Coupé von BMW setzt neue Maßstäbe in Dynamik und Komfort.",
    basePrice: 56500,
    image: "/src/assets/images/bmw_card_i4_1783691261299.jpg",
    category: "electric",
    colors: [
      { name: "Alpinweiß uni", hex: "#ffffff", priceModifier: 0 },
      { name: "Sunset Orange Metallic", hex: "#bd4a17", priceModifier: 1100 },
      { name: "Sanremo Grün Metallic", hex: "#1f392b", priceModifier: 1100 },
      { name: "Portimao Blau Metallic", hex: "#183f8c", priceModifier: 1100 }
    ],
    wheels: [
      { name: '17" Aerodynamikräder 851', size: '17"', priceModifier: 0 },
      { name: '18" M Aerodynamikräder 858 M Bicolor', size: '18"', priceModifier: 950 },
      { name: '19" M Leichtmetallräder Doppel-Speiche', size: '19"', priceModifier: 1800 }
    ],
    specs: {
      power: "250 kW (340 PS)",
      acceleration: "5,6 s",
      topSpeed: "190 km/h",
      range: "bis zu 589 km",
      battery: "83,9 kWh"
    }
  },
  {
    id: "m3",
    tag: "BMW M",
    title: "GEBOREN AUS LEIDENSCHAFT.",
    description: "Erleben Sie Performance auf höchstem Niveau. Die BMW M Modelle kombinieren kraftvolle Ästhetik mit reinem Rennsport-Charakter.",
    basePrice: 94600,
    image: "/src/assets/images/bmw_card_m3_1783691272589.jpg",
    category: "performance",
    colors: [
      { name: "Isle of Man Grün Metallic", hex: "#124c3e", priceModifier: 0 },
      { name: "Toronto Rot Metallic", hex: "#a31818", priceModifier: 1150 },
      { name: "Portimao Blau Metallic", hex: "#183f8c", priceModifier: 1150 },
      { name: "Saphirschwarz Metallic", hex: "#1c1d21", priceModifier: 1150 },
      { name: "Brooklyn Grau Metallic", hex: "#8e9399", priceModifier: 1150 }
    ],
    wheels: [
      { name: '19"/20" M Schmiederäder Doppelspeiche', size: '19/20"', priceModifier: 0 },
      { name: '19"/20" M Schmiederäder Sternspeiche Schwarz', size: '19/20"', priceModifier: 1950 }
    ],
    specs: {
      power: "375 kW (510 PS)",
      acceleration: "3,5 s",
      topSpeed: "250 km/h (optional 290 km/h)"
    }
  }
];

export const QUICK_LINKS: QuickLink[] = [
  { id: "ql_config", label: "Konfigurator", iconName: "Sliders", actionType: "configure" },
  { id: "ql_brochure", label: "Broschüren & Preise", iconName: "BookOpen", actionType: "brochure" },
  { id: "ql_offers", label: "Angebote", iconName: "Tag", actionType: "offers" },
  { id: "ql_shop", label: "BMW Online Shop", iconName: "ShoppingBag", actionType: "shop" },
  { id: "ql_testdrive", label: "Probefahrt", iconName: "Compass", actionType: "testdrive" },
  { id: "ql_dealer", label: "Händler finden", iconName: "MapPin", actionType: "dealer" }
];

export const BROCHURES = [
  { id: "b_ix", title: "Der BMW iX - Preisliste & Technische Daten", size: "4.2 MB", date: "05/2026", url: "#" },
  { id: "b_5", title: "Die BMW 5er Limousine - Broschüre & Highlights", size: "8.7 MB", date: "04/2026", url: "#" },
  { id: "b_i4", title: "Der BMW i4 - Preisliste & Ausstattungen", size: "3.9 MB", date: "06/2026", url: "#" },
  { id: "b_m", title: "Die BMW M Modelle - Performance-Katalog", size: "12.4 MB", date: "02/2026", url: "#" }
];

export const GERMAN_DEALERS = [
  { id: "d_muc", name: "BMW Niederlassung München (Hauptsitz)", city: "München", street: "Dachauer Str. 660", zip: "80995" },
  { id: "d_ber", name: "BMW Niederlassung Berlin", city: "Berlin", street: "Kaiserdamm 90", zip: "14057" },
  { id: "d_ham", name: "BMW Niederlassung Hamburg", city: "Hamburg", street: "Offakamp 10", zip: "22529" },
  { id: "d_fra", name: "BMW Niederlassung Frankfurt", city: "Frankfurt am Main", street: "Hanauer Landstraße 256", zip: "60314" },
  { id: "d_stu", name: "BMW Niederlassung Stuttgart", city: "Stuttgart", street: "Untere Waldplätze 3", zip: "70569" }
];
