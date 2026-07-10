/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import QuickLinksBar from "./components/QuickLinksBar";
import VehiclesGrid from "./components/VehiclesGrid";
import FutureBanner from "./components/FutureBanner";
import Footer from "./components/Footer";

// Modals
import ConfigureModal from "./components/ConfigureModal";
import TestDriveModal from "./components/TestDriveModal";
import BrochureModal from "./components/BrochureModal";
import DealerModal from "./components/DealerModal";

// Data
import { VEHICLES } from "./data";
import { Vehicle } from "./types";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, ShoppingBag, X } from "lucide-react";

export default function App() {
  const [activeModal, setActiveModal] = useState<
    "configure" | "testdrive" | "brochure" | "dealer" | null
  >(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(VEHICLES[0]);
  const [prefilledVehicleName, setPrefilledVehicleName] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show dynamic toast helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleQuickLinkClick = (actionType: string) => {
    switch (actionType) {
      case "configure":
        setSelectedVehicle(VEHICLES[0]); // default to iX
        setActiveModal("configure");
        break;
      case "testdrive":
        setPrefilledVehicleName("");
        setActiveModal("testdrive");
        break;
      case "brochure":
        setActiveModal("brochure");
        break;
      case "dealer":
        setActiveModal("dealer");
        break;
      case "offers":
        triggerToast("🎁 Aktuelle Angebote: Profitieren Sie jetzt von attraktiven Leasingkonditionen für alle BMW i Modelle ab 0,99% Effektivzins!");
        break;
      case "shop":
        triggerToast("🛍️ Der BMW Online Shop wird geladen. Zubehör, Lifestyle-Kollektionen und Originalteile sind in Kürze direkt hier bestellbar.");
        break;
      default:
        break;
    }
  };

  const handleConfigureVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setActiveModal("configure");
  };

  const handleExploreVehicle = (vehicle: Vehicle) => {
    // Scroll smoothly to the Grid or trigger details
    setSelectedVehicle(vehicle);
    setPrefilledVehicleName(vehicle.tag);
    setActiveModal("testdrive"); // Open Test Drive for this direct model
    triggerToast(`ℹ️ Technische Details für den ${vehicle.tag.replace("THE NEW ", "")} geladen. Vereinbaren Sie direkt eine Probefahrt!`);
  };

  const handleVehicleSelectFromMenu = (vehicleId: string) => {
    const target = VEHICLES.find((v) => v.id === vehicleId);
    if (target) {
      setSelectedVehicle(target);
      setActiveModal("configure");
      triggerToast(`✨ Konfigurator geladen für: ${target.tag}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col font-sans" id="app-wrapper">
      {/* Premium Header */}
      <Header
        onQuickLinkClick={handleQuickLinkClick}
        onVehicleSelect={handleVehicleSelectFromMenu}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Full screen dynamic Hero slideshow */}
        <HeroSlider
          vehicles={VEHICLES}
          onConfigureClick={handleConfigureVehicle}
          onExploreClick={handleExploreVehicle}
        />

        {/* Quick Utilities Link Bar */}
        <QuickLinksBar onLinkClick={handleQuickLinkClick} />

        {/* Responsive Grid Catalog */}
        <VehiclesGrid
          vehicles={VEHICLES}
          onConfigureClick={handleConfigureVehicle}
          onExploreClick={handleExploreVehicle}
          onServiceClick={() => setActiveModal("dealer")}
        />

        {/* Dynamic Sweeping Future Vision Section */}
        <FutureBanner />
      </main>

      {/* Structured Multi-column Footer */}
      <Footer
        onQuickLinkClick={handleQuickLinkClick}
        onVehicleSelect={handleVehicleSelectFromMenu}
      />

      {/* INTERACTIVE MODALS PORTAL */}
      <AnimatePresence>
        {/* Real-time Configurator */}
        {activeModal === "configure" && (
          <ConfigureModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            initialVehicle={selectedVehicle}
            allVehicles={VEHICLES}
            onBookTestDrive={(vehicleName) => {
              setPrefilledVehicleName(vehicleName);
              setActiveModal("testdrive");
            }}
          />
        )}

        {/* Test Drive Reservation */}
        {activeModal === "testdrive" && (
          <TestDriveModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            vehicles={VEHICLES}
            prefilledVehicleName={prefilledVehicleName}
          />
        )}

        {/* Download Catalogs center */}
        {activeModal === "brochure" && (
          <BrochureModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
          />
        )}

        {/* Find Dealers & Service appointments */}
        {activeModal === "dealer" && (
          <DealerModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>

      {/* PREMIUM FLOATING TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-zinc-950 border border-white/10 p-4 shadow-2xl flex items-start gap-3.5 backdrop-blur-md rounded-none"
            id="toast-notification"
          >
            <div className="p-2 bg-bmw-blue/15 text-bmw-blue rounded-none border border-bmw-blue/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-200 leading-relaxed font-light">{toastMessage}</p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="p-1 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
