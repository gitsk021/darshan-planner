import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Hotel,
  Loader2,
  MapPin,
  Shield,
  Star,
  Utensils,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSaveItinerary } from "../hooks/useQueries";
import type {
  GeneratedItinerary,
  TripFormData,
} from "../utils/itineraryGenerator";

interface ItineraryPageProps {
  form: TripFormData;
  plan: GeneratedItinerary;
  onBack: () => void;
  onSavedItineraries: () => void;
}

function SectionCard({
  id,
  icon: Icon,
  label,
  children,
}: {
  id: string;
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-2xl shadow-card overflow-hidden"
    >
      <button
        type="button"
        data-ocid={`itinerary.${id}_panel`}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-6 hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-lg text-foreground">
            {label}
          </h3>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </motion.div>
  );
}

export default function ItineraryPage({
  form,
  plan,
  onBack,
  onSavedItineraries,
}: ItineraryPageProps) {
  const { mutateAsync: saveItinerary, isPending } = useSaveItinerary();
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      await saveItinerary({
        destination: form.destination,
        duration: form.duration,
        foodPreference: form.foodPreference,
        tripType: form.tripType,
        interests: form.interests.join(", "),
        budget: `${form.budget} (${form.budgetCurrency})`,
        generatedPlan: JSON.stringify(plan),
      });
      setSaved(true);
      toast.success("Itinerary saved successfully!");
    } catch {
      toast.error("Failed to save itinerary. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-navy border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              data-ocid="itinerary.back_button"
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
                Your Itinerary
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              data-ocid="itinerary.save_button"
              size="sm"
              variant="outline"
              onClick={handleSave}
              disabled={isPending || saved}
              className="border-white/30 text-white bg-white/10 hover:bg-white/20 gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving…
                </>
              ) : saved ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" /> Saved
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" /> Save Trip
                </>
              )}
            </Button>
            <Button
              data-ocid="itinerary.view_saved_button"
              size="sm"
              variant="ghost"
              onClick={onSavedItineraries}
              className="text-white/70 hover:text-white"
            >
              All Trips
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-navy rounded-2xl p-8 text-white">
            <h1 className="font-display text-4xl font-bold mb-2">
              {form.destination}
            </h1>
            <div className="flex flex-wrap gap-3 mt-4">
              <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20">
                {form.duration} days / {Math.max(1, Number(form.duration) - 1)}{" "}
                nights
              </Badge>
              <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20 capitalize">
                {form.budget} budget ({form.budgetCurrency})
              </Badge>
              <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20 capitalize">
                {form.tripType}
              </Badge>
              <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20 capitalize">
                {form.foodPreference === "veg"
                  ? "🥦 Vegetarian"
                  : "🍗 Non-Vegetarian"}
              </Badge>
            </div>
            {form.interests.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.interests.map((interest) => (
                  <span
                    key={interest}
                    className="text-xs px-3 py-1 rounded-full bg-primary/40 text-white"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Section 1: Destination & Best Time */}
          <SectionCard
            id="besttime"
            icon={Calendar}
            label="1. Destination & Best Time"
          >
            <div className="bg-background rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <Star className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    {plan.bestTime.season}
                  </p>
                  <p className="text-sm text-primary">{plan.bestTime.months}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {plan.bestTime.reason}
              </p>
            </div>
          </SectionCard>

          {/* Section 2: Must-Visit Places */}
          <SectionCard id="places" icon={MapPin} label="2. Must-Visit Places">
            <div className="grid gap-3">
              {plan.mustVisitPlaces.map((place, i) => (
                <motion.div
                  key={place.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  data-ocid={`itinerary.place.${i + 1}`}
                  className="flex gap-4 p-4 bg-background rounded-xl hover:shadow-xs transition-shadow"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {place.name}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                      {place.description}
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-2 text-xs capitalize"
                    >
                      {place.type}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionCard>

          {/* Section 3: Activities & Safety */}
          <SectionCard
            id="activities"
            icon={Shield}
            label="3. What To Do & Safety Precautions"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-primary" /> Activities
                </h4>
                <ul className="space-y-2">
                  {plan.activitiesAndSafety.activities.map((activity) => (
                    <li
                      key={activity}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-border pt-4">
                <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" /> Safety & Practical
                  Tips
                </h4>
                <ul className="space-y-2">
                  {plan.activitiesAndSafety.safetyTips.map((tip, i) => (
                    <li
                      key={tip}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <div className="w-4 h-4 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center mt-0.5 shrink-0">
                        <span className="text-amber-600 text-[9px] font-bold">
                          {i + 1}
                        </span>
                      </div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionCard>

          {/* Section 4: Hotels & Transport */}
          <SectionCard
            id="hotels"
            icon={Hotel}
            label="4. Hotels & Travel Suggestions"
          >
            <div className="space-y-4">
              <div className="grid gap-3">
                {(
                  [
                    {
                      key: "budget",
                      label: "Budget Stay",
                      color: "bg-emerald-50 border-emerald-200",
                      badge: "bg-emerald-100 text-emerald-700",
                    },
                    {
                      key: "midRange",
                      label: "Mid-Range Stay",
                      color: "bg-blue-50 border-blue-200",
                      badge: "bg-blue-100 text-blue-700",
                    },
                    {
                      key: "luxury",
                      label: "Luxury Stay",
                      color: "bg-amber-50 border-amber-200",
                      badge: "bg-amber-100 text-amber-700",
                    },
                  ] as const
                ).map(({ key, label, color, badge }) => {
                  const hotel = plan.accommodations[key];
                  return (
                    <div
                      key={key}
                      data-ocid={`itinerary.hotel.${key}`}
                      className={`p-4 rounded-xl border ${color}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span
                            className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${badge} mb-2`}
                          >
                            {label}
                          </span>
                          <p className="font-medium text-foreground text-sm">
                            {hotel.name}
                          </p>
                          <p className="text-muted-foreground text-xs mt-1">
                            {hotel.type}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                          {hotel.priceRange}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-border pt-4">
                <h4 className="font-semibold text-sm text-foreground mb-3">
                  🚗 Transport Tips
                </h4>
                <ul className="space-y-2">
                  {plan.accommodations.transportTips.map((tip) => (
                    <li
                      key={tip}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionCard>

          {/* Day-by-Day Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card rounded-2xl shadow-card overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">
                  Day-by-Day Plan
                </h3>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {plan.dayByDay.map((day) => (
                <div
                  key={day.day}
                  data-ocid={`itinerary.day.${day.day}`}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center shrink-0">
                      {day.day}
                    </div>
                    {day.day < plan.dayByDay.length && (
                      <div className="w-0.5 flex-1 bg-border mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <h4 className="font-semibold text-foreground mb-3">
                      {day.title}
                    </h4>
                    <ul className="space-y-1.5 mb-4">
                      {day.activities.map((act) => (
                        <li
                          key={act}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-primary mt-0.5">•</span>
                          {act}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-muted/50 rounded-xl p-4 text-xs space-y-1.5">
                      <p className="font-medium text-foreground text-xs mb-2">
                        🍽️ Meals
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Breakfast:
                        </span>{" "}
                        {day.meals.breakfast}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Lunch:
                        </span>{" "}
                        {day.meals.lunch}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Dinner:
                        </span>{" "}
                        {day.meals.dinner}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {!saved && (
            <Button
              data-ocid="itinerary.save_cta_button"
              size="lg"
              onClick={handleSave}
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 text-white text-base gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Saving…
                </>
              ) : (
                <>
                  <Bookmark className="w-5 h-5" /> Save This Itinerary
                </>
              )}
            </Button>
          )}
          {saved && (
            <Button
              data-ocid="itinerary.view_saved_cta_button"
              size="lg"
              variant="outline"
              onClick={onSavedItineraries}
              className="w-full text-base gap-2"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
              View All Saved Trips
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
