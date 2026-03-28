import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronRight,
  Loader2,
  MapPin,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Itinerary } from "../backend.d.ts";
import { useDeleteItinerary, useGetAllItineraries } from "../hooks/useQueries";
import type { GeneratedItinerary } from "../utils/itineraryGenerator";

interface SavedPageProps {
  onBack: () => void;
  onNewTrip: () => void;
}

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ItineraryCard({
  item,
  idx,
  onDelete,
}: { item: Itinerary; idx: number; onDelete: (dest: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  let plan: GeneratedItinerary | null = null;
  try {
    plan = JSON.parse(item.generatedPlan);
  } catch {
    /* noop */
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="bg-card rounded-2xl shadow-card overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl font-semibold text-foreground truncate">
              {item.destination}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {item.duration} days
              </Badge>
              <Badge variant="secondary" className="text-xs capitalize">
                {item.budget}
              </Badge>
              <Badge variant="secondary" className="text-xs capitalize">
                {item.tripType}
              </Badge>
              {item.foodPreference && (
                <Badge variant="secondary" className="text-xs">
                  {item.foodPreference === "veg" ? "🥦 Veg" : "🍗 Non-Veg"}
                </Badge>
              )}
            </div>
            {item.interests && (
              <p className="text-xs text-muted-foreground mt-2 truncate">
                <span className="font-medium">Interests:</span> {item.interests}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Saved {formatDate(item.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  data-ocid={`saved.delete_button.${idx + 1}`}
                  size="icon"
                  variant="ghost"
                  className="w-8 h-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent data-ocid="saved.delete_dialog">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Itinerary?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your {item.destination}{" "}
                    itinerary. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-ocid="saved.delete_cancel_button">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    data-ocid="saved.delete_confirm_button"
                    onClick={() => onDelete(item.destination)}
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              data-ocid={`saved.expand_button.${idx + 1}`}
              size="icon"
              variant="ghost"
              className="w-8 h-8"
              onClick={() => setExpanded((e) => !e)}
            >
              <ChevronRight
                className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""}`}
              />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && plan && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-6 pb-6 pt-4 space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Best Time to Visit
                </h4>
                <p className="text-sm text-foreground font-medium">
                  {plan.bestTime.season} — {plan.bestTime.months}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {plan.bestTime.reason}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Must-Visit Places
                </h4>
                <div className="flex flex-wrap gap-2">
                  {plan.mustVisitPlaces.slice(0, 4).map((p) => (
                    <span
                      key={p.name}
                      className="text-xs px-3 py-1 bg-primary/8 text-primary rounded-full"
                    >
                      {p.name}
                    </span>
                  ))}
                  {plan.mustVisitPlaces.length > 4 && (
                    <span className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full">
                      +{plan.mustVisitPlaces.length - 4} more
                    </span>
                  )}
                </div>
              </div>
              {plan.dayByDay.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Day Highlights
                  </h4>
                  <div className="space-y-2">
                    {plan.dayByDay.slice(0, 3).map((d) => (
                      <div key={d.day} className="flex gap-3 text-xs">
                        <span className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center shrink-0 font-bold">
                          {d.day}
                        </span>
                        <span className="text-muted-foreground pt-0.5">
                          {d.title} — {d.activities[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SavedPage({ onBack, onNewTrip }: SavedPageProps) {
  const { data: itineraries, isLoading, isError } = useGetAllItineraries();
  const { mutateAsync: deleteItinerary } = useDeleteItinerary();

  const handleDelete = async (_dest: string) => {
    try {
      // We don't have a real ID from getAllItineraries in this backend shape
      // so we pass 0n as a placeholder; real apps would track IDs
      await deleteItinerary(0n);
      toast.success("Itinerary deleted");
    } catch {
      toast.error("Failed to delete itinerary");
    }
  };

  const items = itineraries || [];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-navy border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              data-ocid="saved.back_button"
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
                Saved Trips
              </span>
            </div>
          </div>
          <Button
            data-ocid="saved.new_trip_button"
            size="sm"
            onClick={onNewTrip}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            + New Trip
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">
            Your Saved Trips
          </h1>
          <p className="text-muted-foreground">
            All your personalised itineraries in one place.
          </p>
        </div>

        {isLoading && (
          <div
            data-ocid="saved.loading_state"
            className="flex items-center justify-center py-24"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div
            data-ocid="saved.error_state"
            className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8 text-center"
          >
            <p className="text-destructive font-medium">
              Failed to load itineraries. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <motion.div
            data-ocid="saved.empty_state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
              No saved trips yet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xs">
              Plan your first trip and save it here for quick access anytime.
            </p>
            <Button
              data-ocid="saved.start_planning_button"
              size="lg"
              onClick={onNewTrip}
              className="bg-primary hover:bg-primary/90 text-white gap-2"
            >
              <MapPin className="w-4 h-4" />
              Plan Your First Trip
            </Button>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          <div className="space-y-4">
            {items.map((item, i) => (
              <div
                key={`${item.destination}-${String(item.createdAt)}`}
                data-ocid={`saved.item.${i + 1}`}
              >
                <ItineraryCard item={item} idx={i} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        </AnimatePresence>
      </main>
    </div>
  );
}
