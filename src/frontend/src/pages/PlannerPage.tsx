import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Loader2, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { TripFormData } from "../utils/itineraryGenerator";
import { generateItinerary } from "../utils/itineraryGenerator";

const interestOptions = [
  "Temples",
  "Beaches",
  "Street Food",
  "Historical Sites",
  "Adventure Sports",
  "Nature & Wildlife",
  "Nightlife",
  "Art & Culture",
  "Shopping",
  "Trekking",
];

const popularDestinations = [
  "Goa, India",
  "Rajasthan, India",
  "Kerala, India",
  "Paris, France",
  "Bali, Indonesia",
  "Dubai, UAE",
  "Singapore",
  "Manali, India",
];

interface PlannerPageProps {
  onBack: () => void;
  onItineraryGenerated: (
    form: TripFormData,
    plan: ReturnType<typeof generateItinerary>,
  ) => void;
}

export default function PlannerPage({
  onBack,
  onItineraryGenerated,
}: PlannerPageProps) {
  const [tripType, setTripType] = useState<"national" | "international">(
    "national",
  );
  const [budget, setBudget] = useState<"low" | "medium" | "high">("medium");
  const [budgetCurrency, setBudgetCurrency] = useState("INR");
  const [destination, setDestination] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [foodPreference, setFoodPreference] = useState<"veg" | "nonveg">("veg");
  const [duration, setDuration] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const handleGenerate = async () => {
    if (!destination.trim() || !duration.trim()) return;
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1200));
    const form: TripFormData = {
      tripType,
      budget,
      budgetCurrency,
      destination,
      interests: selectedInterests,
      foodPreference,
      duration,
    };
    const plan = generateItinerary(form);
    setIsGenerating(false);
    onItineraryGenerated(form, plan);
  };

  const isValid = destination.trim().length > 1 && duration.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-navy border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center gap-4">
          <button
            type="button"
            data-ocid="planner.back_button"
            onClick={onBack}
            className="text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-white">
              Darshan Planner
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Plan Your Trip
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below and we'll craft a personalised itinerary
              just for you.
            </p>
          </div>

          <div className="space-y-8">
            {/* 1. Trip Type */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <Label className="text-base font-semibold text-foreground mb-4 block">
                1. Trip Type
              </Label>
              <div className="flex gap-4">
                {(["national", "international"] as const).map((type) => (
                  <button
                    type="button"
                    key={type}
                    data-ocid={`planner.triptype_${type}`}
                    onClick={() => setTripType(type)}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all capitalize
                      ${
                        tripType === type
                          ? "border-primary bg-primary/8 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                  >
                    {type === "national" ? "🇮🇳 National" : "✈️ International"}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Budget */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <Label className="text-base font-semibold text-foreground mb-4 block">
                2. Budget
              </Label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {(["low", "medium", "high"] as const).map((b) => (
                  <button
                    type="button"
                    key={b}
                    data-ocid={`planner.budget_${b}`}
                    onClick={() => setBudget(b)}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all capitalize
                      ${
                        budget === b
                          ? "border-primary bg-primary/8 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                  >
                    {b === "low"
                      ? "💰 Low"
                      : b === "medium"
                        ? "💳 Medium"
                        : "💎 High"}
                  </button>
                ))}
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Currency
                </Label>
                <Select
                  value={budgetCurrency}
                  onValueChange={setBudgetCurrency}
                >
                  <SelectTrigger
                    data-ocid="planner.currency_select"
                    className="w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupee (₹ INR)</SelectItem>
                    <SelectItem value="USD">US Dollar ($ USD)</SelectItem>
                    <SelectItem value="EUR">Euro (€ EUR)</SelectItem>
                    <SelectItem value="GBP">British Pound (£ GBP)</SelectItem>
                    <SelectItem value="AED">UAE Dirham (AED)</SelectItem>
                    <SelectItem value="SGD">Singapore Dollar (SGD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 3. Destination */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <Label className="text-base font-semibold text-foreground mb-4 block">
                3. Destination
              </Label>
              <Input
                data-ocid="planner.destination_input"
                placeholder="e.g. Goa, Rajasthan, Bali, Paris…"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mb-4"
              />
              <div>
                <p className="text-xs text-muted-foreground mb-3">
                  Popular Destinations
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularDestinations.map((d) => (
                    <button
                      type="button"
                      key={d}
                      data-ocid="planner.destination_suggestion"
                      onClick={() => setDestination(d)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                        ${
                          destination === d
                            ? "bg-primary text-white border-primary"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Interests */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <Label className="text-base font-semibold text-foreground mb-1 block">
                4. Interests / Places to Visit
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                Select all that apply
              </p>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <button
                    type="button"
                    key={interest}
                    data-ocid="planner.interest_toggle"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all
                      ${
                        selectedInterests.includes(interest)
                          ? "bg-primary border-primary text-white"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              {selectedInterests.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedInterests.map((i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {i}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Food Preference */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <Label className="text-base font-semibold text-foreground mb-4 block">
                5. Food Preference
              </Label>
              <div className="flex gap-4">
                {(["veg", "nonveg"] as const).map((pref) => (
                  <button
                    type="button"
                    key={pref}
                    data-ocid={`planner.food_${pref}`}
                    onClick={() => setFoodPreference(pref)}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all
                      ${
                        foodPreference === pref
                          ? "border-primary bg-primary/8 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                  >
                    {pref === "veg" ? "🥦 Vegetarian" : "🍗 Non-Vegetarian"}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Duration */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <Label
                htmlFor="duration"
                className="text-base font-semibold text-foreground mb-4 block"
              >
                6. Duration (Days)
              </Label>
              <Input
                id="duration"
                data-ocid="planner.duration_input"
                type="number"
                placeholder="e.g. 5"
                min="1"
                max="14"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-2">
                We support up to 7-day detailed day-by-day plans
              </p>
            </div>

            {/* Generate Button */}
            <Button
              data-ocid="planner.generate_button"
              size="lg"
              disabled={!isValid || isGenerating}
              onClick={handleGenerate}
              className="w-full bg-primary hover:bg-primary/90 text-white text-base gap-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Crafting Your Itinerary…
                </>
              ) : (
                <>
                  Generate My Itinerary
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
