export interface VehicleColor {
  name: string;
  hex: string;
  imageOffset?: string; // option for visual adjustments
  priceModifier: number;
}

export interface VehicleWheel {
  name: string;
  size: string;
  priceModifier: number;
}

export interface VehicleSpecs {
  power: string;      // e.g. "385 kW (523 PS)"
  acceleration: string; // e.g. "4,6 s"
  topSpeed: string;    // e.g. "200 km/h"
  range?: string;      // e.g. "bis zu 630 km"
  battery?: string;    // e.g. "111,5 kWh"
}

export interface Vehicle {
  id: string;
  tag: string;         // e.g. "THE NEW iX"
  title: string;       // e.g. "FREIHEIT NEU INTERPRETIERT."
  description: string; // e.g. "Elektrisch. Innovativ. Inspirierend..."
  basePrice: number;   // e.g. 77300
  image: string;       // generated path
  category: "electric" | "sedan" | "performance" | "service" | "all";
  colors: VehicleColor[];
  wheels: VehicleWheel[];
  specs: VehicleSpecs;
}

export interface TestDriveBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleId: string;
  vehicleName: string;
  date: string;
  timeSlot: string;
  dealerLocation: string;
  status: "confirmed" | "cancelled";
}

export interface QuickLink {
  id: string;
  label: string;
  iconName: string;
  actionType: "configure" | "brochure" | "offers" | "shop" | "testdrive" | "dealer";
}
