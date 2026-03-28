import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import ItineraryPage from "./pages/ItineraryPage";
import LandingPage from "./pages/LandingPage";
import PlannerPage from "./pages/PlannerPage";
import SavedPage from "./pages/SavedPage";
import type {
  GeneratedItinerary,
  TripFormData,
} from "./utils/itineraryGenerator";
import type { generateItinerary } from "./utils/itineraryGenerator";

type Page = "home" | "planner" | "itinerary" | "saved";

interface ItineraryState {
  form: TripFormData;
  plan: GeneratedItinerary;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [itineraryState, setItineraryState] = useState<ItineraryState | null>(
    null,
  );

  const handleItineraryGenerated = (
    form: TripFormData,
    plan: ReturnType<typeof generateItinerary>,
  ) => {
    setItineraryState({ form, plan });
    setPage("itinerary");
  };

  return (
    <>
      {page === "home" && (
        <LandingPage
          onStartPlanning={() => setPage("planner")}
          onSavedItineraries={() => setPage("saved")}
        />
      )}
      {page === "planner" && (
        <PlannerPage
          onBack={() => setPage("home")}
          onItineraryGenerated={handleItineraryGenerated}
        />
      )}
      {page === "itinerary" && itineraryState && (
        <ItineraryPage
          form={itineraryState.form}
          plan={itineraryState.plan}
          onBack={() => setPage("planner")}
          onSavedItineraries={() => setPage("saved")}
        />
      )}
      {page === "saved" && (
        <SavedPage
          onBack={() => setPage("home")}
          onNewTrip={() => setPage("planner")}
        />
      )}
      <Toaster richColors position="top-right" />
    </>
  );
}
