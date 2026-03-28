import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  Globe,
  MapPin,
  Shield,
  Sparkles,
  Star,
  Utensils,
} from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onStartPlanning: () => void;
  onSavedItineraries: () => void;
}

const steps = [
  {
    icon: Globe,
    title: "Tell Us Your Dream",
    description:
      "Share your trip type, budget, destination preferences, and travel duration.",
  },
  {
    icon: Sparkles,
    title: "We Craft Your Plan",
    description:
      "Darshan Planner generates a personalised, day-by-day itinerary tailored to your tastes.",
  },
  {
    icon: MapPin,
    title: "Explore & Save",
    description:
      "Get hotel picks, local tips, food recommendations, and save your itinerary for later.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    avatar: "PS",
    rating: 5,
    text: "Darshan Planner turned our Rajasthan family trip into the most organised holiday we've ever had. The day-by-day plan was spot on!",
  },
  {
    name: "Arjun Mehta",
    location: "Bangalore, India",
    avatar: "AM",
    rating: 5,
    text: "I had no idea where to go for our anniversary, and within seconds I had a beautiful Kerala itinerary complete with houseboat stays.",
  },
  {
    name: "Sophie Laurent",
    location: "Paris, France",
    avatar: "SL",
    rating: 5,
    text: "Used it for a Bali backpacking trip on a budget. The food recommendations were incredibly accurate and the safety tips were genuinely useful.",
  },
];

const highlights = [
  { icon: Calendar, label: "Day-by-Day Plans" },
  { icon: Utensils, label: "Food Preferences" },
  { icon: Shield, label: "Safety Tips" },
  { icon: MapPin, label: "Hotel Picks" },
];

export default function LandingPage({
  onStartPlanning,
  onSavedItineraries,
}: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-white text-lg">
              Darshan Planner
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="nav.saved_link"
              onClick={onSavedItineraries}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              Saved Trips
            </button>
            <Button
              data-ocid="nav.plan_button"
              size="sm"
              onClick={onStartPlanning}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Plan a Trip
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "oklch(var(--navy))" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-travel.dim_1400x600.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              Your AI-Powered Travel Expert
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Plan Your Perfect
              <span className="block text-primary"> Journey</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Tell Darshan Planner your dream destination, budget, and interests
              — and get a detailed, personalised travel itinerary in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                data-ocid="hero.plan_button"
                size="lg"
                onClick={onStartPlanning}
                className="bg-primary hover:bg-primary/90 text-white text-base px-8 gap-2 shadow-hero"
              >
                Start Planning Free
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                data-ocid="hero.saved_button"
                size="lg"
                variant="outline"
                onClick={onSavedItineraries}
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 text-base px-8"
              >
                View Saved Trips
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 flex flex-wrap justify-center gap-4"
          >
            {highlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-sm"
              >
                <Icon className="w-4 h-4 text-primary" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Three simple steps to your dream holiday itinerary
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center mx-auto -mt-2 mb-4">
                  {i + 1}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ background: "oklch(var(--navy))" }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Loved by Travellers
            </h2>
            <p className="text-white/60 text-lg">
              Join thousands of happy explorers
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, location, avatar, rating, text }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white/8 border border-white/12 rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].slice(0, rating).map((starNum) => (
                    <Star
                      key={`${name}-star-${starNum}`}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed mb-6 text-sm">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                    {avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{name}</p>
                    <p className="text-white/50 text-xs">{location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Explore the World?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Your personalised adventure is just a few clicks away.
            </p>
            <Button
              data-ocid="cta.plan_button"
              size="lg"
              onClick={onStartPlanning}
              className="bg-primary hover:bg-primary/90 text-white text-base px-10 gap-2 shadow-card"
            >
              Create My Itinerary
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-semibold text-foreground">
              Darshan Planner
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
