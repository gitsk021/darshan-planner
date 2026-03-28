export interface TripFormData {
  tripType: "national" | "international";
  budget: "low" | "medium" | "high";
  budgetCurrency: string;
  destination: string;
  interests: string[];
  foodPreference: "veg" | "nonveg";
  duration: string;
}

export interface GeneratedItinerary {
  destination: string;
  bestTime: {
    season: string;
    months: string;
    reason: string;
  };
  mustVisitPlaces: Array<{
    name: string;
    description: string;
    type: string;
  }>;
  activitiesAndSafety: {
    activities: string[];
    safetyTips: string[];
  };
  accommodations: {
    budget: { name: string; type: string; priceRange: string };
    midRange: { name: string; type: string; priceRange: string };
    luxury: { name: string; type: string; priceRange: string };
    transportTips: string[];
  };
  dayByDay: Array<{
    day: number;
    title: string;
    activities: string[];
    meals: { breakfast: string; lunch: string; dinner: string };
  }>;
}

const destinationData: Record<string, Partial<GeneratedItinerary>> = {
  goa: {
    bestTime: {
      season: "Winter (October – March)",
      months: "November to February",
      reason:
        "Pleasant weather with temperatures between 20–32°C, minimal rainfall, and ideal beach conditions.",
    },
    mustVisitPlaces: [
      {
        name: "Baga Beach",
        description:
          "Lively beach with water sports, shacks, and vibrant nightlife.",
        type: "beach",
      },
      {
        name: "Basilica of Bom Jesus",
        description:
          "UNESCO World Heritage Site with stunning Baroque architecture.",
        type: "historical",
      },
      {
        name: "Dudhsagar Falls",
        description:
          "Majestic four-tiered waterfall set amid lush Western Ghats jungle.",
        type: "nature",
      },
      {
        name: "Anjuna Flea Market",
        description:
          "Colourful weekly market selling handicrafts, spices, and souvenirs.",
        type: "culture",
      },
      {
        name: "Fort Aguada",
        description:
          "17th-century Portuguese fort offering panoramic views of the Arabian Sea.",
        type: "historical",
      },
      {
        name: "Palolem Beach",
        description:
          "Crescent-shaped pristine beach ideal for kayaking and silent discos.",
        type: "beach",
      },
    ],
    activitiesAndSafety: {
      activities: [
        "Try a Goan seafood thali at a beach shack on Calangute",
        "Book a dolphin-watching cruise at sunrise",
        "Rent a scooter and explore the spice plantations in Ponda",
        "Visit Old Goa churches on a heritage walk",
        "Enjoy parasailing or jet-skiing at Baga Beach",
      ],
      safetyTips: [
        "Swim only in designated areas; currents can be strong during shoulder season.",
        "Carry small denomination notes for beach shacks and local markets.",
        "Always bargain for taxis — use Goa Miles app for transparent fares.",
      ],
    },
  },
  rajasthan: {
    bestTime: {
      season: "Winter (October – March)",
      months: "November to February",
      reason:
        "Comfortable 10–25°C temperatures perfect for heritage exploration; avoid the scorching May–July desert summer.",
    },
    mustVisitPlaces: [
      {
        name: "Amber Fort, Jaipur",
        description:
          "Majestic hilltop fort with intricate mirror work and elephant rides.",
        type: "historical",
      },
      {
        name: "City Palace, Udaipur",
        description:
          "Breathtaking lakeside palace complex with museums and art galleries.",
        type: "historical",
      },
      {
        name: "Jaisalmer Desert Safari",
        description:
          "Golden sand dunes and camel rides under a star-studded night sky.",
        type: "adventure",
      },
      {
        name: "Mehrangarh Fort, Jodhpur",
        description:
          "Commanding blue-city fortress with eight gates and royal artefacts.",
        type: "historical",
      },
      {
        name: "Pushkar Ghats",
        description:
          "Sacred lake with 52 ghats; the world's only Brahma temple is nearby.",
        type: "temple",
      },
      {
        name: "Ranthambore National Park",
        description:
          "Best chance to spot wild Bengal tigers in their natural habitat.",
        type: "nature",
      },
    ],
    activitiesAndSafety: {
      activities: [
        "Sample dal baati churma at a heritage haveli restaurant",
        "Take a cooking class for authentic Rajasthani cuisine in Jaipur",
        "Watch the sunset from Nahargarh Fort overlooking Jaipur",
        "Shop for block-print textiles and blue pottery in Jodhpur's bazaars",
        "Experience a cultural evening with folk music and Kalbelia dance",
      ],
      safetyTips: [
        "Dress modestly (cover shoulders and knees) when visiting temples and forts.",
        "Stay hydrated — the dry Rajasthani heat can be deceptive even in winter.",
        "Book pre-paid government-authorised guides at major forts to avoid touts.",
      ],
    },
  },
  kerala: {
    bestTime: {
      season: "Winter (November – March)",
      months: "December to February",
      reason:
        "Crisp weather with clear skies, ideal for backwater cruises and wildlife spotting; pleasant 22–32°C temperatures.",
    },
    mustVisitPlaces: [
      {
        name: "Alleppey Backwaters",
        description:
          "Overnight houseboat cruise through serene palm-fringed canals.",
        type: "nature",
      },
      {
        name: "Munnar Tea Estates",
        description:
          "Misty rolling hills covered in emerald tea plantations with wildlife.",
        type: "nature",
      },
      {
        name: "Periyar Wildlife Sanctuary",
        description:
          "Boat safaris on Periyar Lake with elephants and bird-watching.",
        type: "nature",
      },
      {
        name: "Fort Kochi",
        description:
          "Portuguese-era streets with Chinese fishing nets, art galleries, and spice markets.",
        type: "historical",
      },
      {
        name: "Kovalam Beach",
        description:
          "Crescent lighthouse beach famous for Ayurveda rejuvenation centres.",
        type: "beach",
      },
      {
        name: "Padmanabhaswamy Temple",
        description:
          "One of India's wealthiest temples with extraordinary Dravidian architecture.",
        type: "temple",
      },
    ],
    activitiesAndSafety: {
      activities: [
        "Experience an authentic Kerala Sadya banana-leaf feast",
        "Book a traditional Kathakali performance in Kochi",
        "Take a cooking class to master Kerala curry (veg and non-veg options available)",
        "Trek through Wayanad's misty forests to visit Chembra Peak",
        "Try a Panchakarma Ayurveda treatment in Kovalam",
      ],
      safetyTips: [
        "Cover your head when entering temples; non-Hindus may be restricted in inner sanctums.",
        "Book houseboats through KTDC or certified operators to ensure safety standards.",
        "Carry cash for village markets — digital payments are limited in rural backwaters.",
      ],
    },
  },
  paris: {
    bestTime: {
      season: "Spring (April – June)",
      months: "April to June",
      reason:
        "Cherry blossoms, comfortable 15–25°C temperatures, and long daylight hours make this the most romantic season in Paris.",
    },
    mustVisitPlaces: [
      {
        name: "Eiffel Tower",
        description:
          "Iconic iron lattice tower with panoramic city views; book tickets online to skip queues.",
        type: "historical",
      },
      {
        name: "The Louvre Museum",
        description:
          "World's largest art museum housing 35,000 works including the Mona Lisa.",
        type: "culture",
      },
      {
        name: "Montmartre & Sacré-Cœur",
        description:
          "Bohemian hilltop district with stunning white basilica and artist studios.",
        type: "culture",
      },
      {
        name: "Palace of Versailles",
        description:
          "Opulent royal palace with Hall of Mirrors and manicured formal gardens.",
        type: "historical",
      },
      {
        name: "Seine River Cruise",
        description:
          "Evening Bateaux Mouches cruise past floodlit Notre-Dame and bridges.",
        type: "nature",
      },
      {
        name: "Musée d'Orsay",
        description:
          "Masterpieces of Impressionism in a stunning converted railway station.",
        type: "culture",
      },
    ],
    activitiesAndSafety: {
      activities: [
        "Enjoy a croissant and café au lait at a traditional Parisian brasserie",
        "Browse fresh produce and cheese at Rue Mouffetard market",
        "Take an evening stroll along the Champs-Élysées at golden hour",
        "Explore the catacombs for a unique underground Paris experience",
        "Visit the Marais district for galleries, falafel, and vintage shopping",
      ],
      safetyTips: [
        "Beware of pickpockets around the Eiffel Tower and Sacré-Cœur — keep bags zipped.",
        "Validate your Metro ticket before boarding to avoid fines.",
        "Most museums offer free entry on the first Sunday of each month.",
      ],
    },
  },
  bali: {
    bestTime: {
      season: "Dry Season (May – September)",
      months: "June to August",
      reason:
        "Low humidity, minimal rain, and perfect 26–30°C temperatures for temple visits, surfing, and rice terrace treks.",
    },
    mustVisitPlaces: [
      {
        name: "Tanah Lot Temple",
        description:
          "Dramatic sea temple perched on a rocky outcrop, best at sunset.",
        type: "temple",
      },
      {
        name: "Ubud Monkey Forest",
        description:
          "Sacred forest sanctuary home to 700+ long-tailed macaques.",
        type: "nature",
      },
      {
        name: "Tegalalang Rice Terraces",
        description:
          "Stunning UNESCO-recognised stepped rice paddies with café swing experiences.",
        type: "nature",
      },
      {
        name: "Seminyak Beach",
        description:
          "Upscale beach with world-class surf breaks and beach club sundowners.",
        type: "beach",
      },
      {
        name: "Uluwatu Temple",
        description:
          "Clifftop temple 70m above the sea; evening Kecak fire dance performances.",
        type: "temple",
      },
      {
        name: "Mount Batur Sunrise Trek",
        description:
          "Active volcano trek to catch sunrise above the clouds — breathtaking.",
        type: "adventure",
      },
    ],
    activitiesAndSafety: {
      activities: [
        "Take a traditional Balinese cooking class with a market visit in Ubud",
        "Enjoy a Balinese massage and spa treatment",
        "Surf lessons at Kuta Beach for all levels",
        "Cycle through Sidemen Valley's rice fields and coffee plantations",
        "Attend a traditional Legong dance performance",
      ],
      safetyTips: [
        "Dress modestly and wear a sarong when entering any Balinese temple.",
        "Rent a scooter only if you are an experienced rider; traffic can be chaotic.",
        "Avoid tap water; drink only bottled or filtered water throughout your stay.",
      ],
    },
  },
};

const budgetAccommodation: Record<
  string,
  Record<
    string,
    {
      budget: { name: string; type: string; priceRange: string };
      midRange: { name: string; type: string; priceRange: string };
      luxury: { name: string; type: string; priceRange: string };
      transportTips: string[];
    }
  >
> = {
  goa: {
    low: {
      budget: {
        name: "Zostel Goa",
        type: "Beachside hostel with common areas and tours desk",
        priceRange: "₹500–900/night",
      },
      midRange: {
        name: "Acron Waterfront Resort",
        type: "Riverview resort near Baga with pool",
        priceRange: "₹3,000–5,500/night",
      },
      luxury: {
        name: "Taj Holiday Village Goa",
        type: "Luxury beach cottages with private pool access",
        priceRange: "₹18,000–35,000/night",
      },
      transportTips: [
        "Rent a scooter (₹300/day) for complete freedom.",
        "Use Rapido or Goa Miles app for transparent auto fares.",
        "Pre-book airport taxis to avoid surge pricing.",
      ],
    },
    medium: {
      budget: {
        name: "Casa De Goa",
        type: "Portuguese-style guesthouse in North Goa",
        priceRange: "₹1,800–3,000/night",
      },
      midRange: {
        name: "Kenilworth Beach Resort",
        type: "4-star resort with beach access and spa",
        priceRange: "₹5,500–9,000/night",
      },
      luxury: {
        name: "Alila Diwa Goa",
        type: "5-star luxury resort with infinity pool and butler service",
        priceRange: "₹22,000–45,000/night",
      },
      transportTips: [
        "Hire a local taxi driver for the day (₹1,200–1,800).",
        "Use Uber/Ola in North Goa areas.",
        "Take the ferry to Panjim for a scenic river experience.",
      ],
    },
    high: {
      budget: {
        name: "The Doorbell Hostel",
        type: "Boutique hostel with rooftop bar near Anjuna",
        priceRange: "₹2,000–3,500/night",
      },
      midRange: {
        name: "Nerul River Retreat",
        type: "Eco-boutique hotel with yoga and Ayurveda",
        priceRange: "₹8,000–14,000/night",
      },
      luxury: {
        name: "W Goa",
        type: "Ultra-luxury beachfront resort with celebrity-chef restaurant",
        priceRange: "₹35,000–80,000/night",
      },
      transportTips: [
        "Arrange a private chauffeur through the hotel concierge.",
        "Rent a luxury Jeep for heritage and waterfall drives.",
        "Take a helicopter transfer from Dabolim airport.",
      ],
    },
  },
  default: {
    low: {
      budget: {
        name: "Budget Hostel / Guesthouse",
        type: "Clean, social hostel with dorm and private rooms",
        priceRange: "₹500–1,500/night",
      },
      midRange: {
        name: "Heritage Boutique Hotel",
        type: "Mid-range hotel with local character and breakfast",
        priceRange: "₹3,000–7,000/night",
      },
      luxury: {
        name: "5-Star Palace Hotel",
        type: "Full-service luxury property with pool and spa",
        priceRange: "₹15,000–40,000/night",
      },
      transportTips: [
        "Use app-based cabs (Ola/Uber) for safe, metered rides.",
        "Consider a day-rental car with driver (₹1,200–2,000/day).",
        "Local autos and shared taxis are budget-friendly for short hops.",
      ],
    },
    medium: {
      budget: {
        name: "City Inn / Budget Hotel",
        type: "Well-located hotel with private en-suite rooms",
        priceRange: "₹1,500–3,500/night",
      },
      midRange: {
        name: "Boutique Heritage Stay",
        type: "4-star property with character and curated experiences",
        priceRange: "₹5,000–10,000/night",
      },
      luxury: {
        name: "Luxury Resort & Spa",
        type: "5-star resort with all inclusive dining option",
        priceRange: "₹18,000–50,000/night",
      },
      transportTips: [
        "Download the local taxi app before arriving.",
        "Hire a private cab for full-day sightseeing tours.",
        "Use intercity trains/buses for economical travel between cities.",
      ],
    },
    high: {
      budget: {
        name: "Premium Guesthouse",
        type: "Upscale guesthouse with concierge and breakfast",
        priceRange: "₹3,000–6,000/night",
      },
      midRange: {
        name: "Luxury Boutique Hotel",
        type: "Design hotel with rooftop pool and fine dining",
        priceRange: "₹10,000–20,000/night",
      },
      luxury: {
        name: "Ultra-Luxury Palace Stay",
        type: "Iconic palace conversion with personalised butler service",
        priceRange: "₹30,000–1,20,000/night",
      },
      transportTips: [
        "Arrange airport transfers and sightseeing through the hotel's travel desk.",
        "Hire a luxury vehicle with a private guide.",
        "Consider chartered helicopters for iconic aerial views.",
      ],
    },
  },
};

function generateDayPlan(
  destination: string,
  _interests: string[],
  foodPreference: "veg" | "nonveg",
  numDays: number,
): GeneratedItinerary["dayByDay"] {
  const days: GeneratedItinerary["dayByDay"] = [];
  const destLower = destination.toLowerCase();

  const vegMeals: Record<
    string,
    Array<{ breakfast: string; lunch: string; dinner: string }>
  > = {
    goa: [
      {
        breakfast: "Poha and fresh coconut water at a beach shack",
        lunch: "Veg xacuti and sol kadi at Ritz Classic",
        dinner: "Veg thali with kokum curry at Britto's",
      },
      {
        breakfast: "Banana pancakes at a Palolem café",
        lunch: "Aloo rava fry and chaas at Calangute Market",
        dinner: "Mushroom xacuti with Goan bread at Venite Restaurant",
      },
      {
        breakfast: "Idli sambar with coconut chutney at local udipi",
        lunch: "Bhindi masala and rice at Hotel Mandovi",
        dinner: "Paneer cafreal and vegetable rice at Sublime restaurant",
      },
    ],
    rajasthan: [
      {
        breakfast: "Pyaaz ki kachori and masala chai at Rawat Mishthan Bhandar",
        lunch: "Dal baati churma at a traditional haveli",
        dinner: "Laal maas (veg version: kadhi pakoda) at Chokhi Dhani",
      },
      {
        breakfast: "Mirchi bada and rabri at Jodhpur's Clock Tower market",
        lunch: "Gatte ki sabzi with bajra roti at Spice Court",
        dinner: "Ker sangri and maize roti at Dumpukht Marwar",
      },
    ],
    default: [
      {
        breakfast: "Local breakfast speciality with fresh juice",
        lunch: "Regional vegetarian thali at a popular local restaurant",
        dinner: "Traditional paneer and dal makhani dinner",
      },
      {
        breakfast: "South Indian idli-vada combo with filter coffee",
        lunch: "Vegetable biryani and raita at heritage restaurant",
        dinner: "Paneer butter masala with garlic naan and lassi",
      },
    ],
  };

  const nonvegMeals: Record<
    string,
    Array<{ breakfast: string; lunch: string; dinner: string }>
  > = {
    goa: [
      {
        breakfast: "Egg bhurji pav and chai at Ingo's market",
        lunch: "Prawn balchao and rice at Hotel Venite",
        dinner: "Fish thali with rechad mackerel and feni at Fisherman's Wharf",
      },
      {
        breakfast: "Omelette and toast with coconut toddy",
        lunch: "Chicken cafreal with crusty Goan bread at Ritz Classic",
        dinner: "Lobster thermidor and prawn curry at Martin's Corner",
      },
      {
        breakfast:
          "Beef croquettes and local sausages at St. Anthony's Canteen",
        lunch: "Clam and mussel xec xec at Cavelossim Beach shack",
        dinner: "Pork vindaloo with sanna at Baba au Rhum",
      },
    ],
    default: [
      {
        breakfast: "Egg omelette and toast with filter coffee",
        lunch: "Chicken biryani and raita at a heritage restaurant",
        dinner: "Mutton rogan josh with tandoori roti and dessert",
      },
      {
        breakfast: "Keema paratha with curd and pickle",
        lunch: "Fish curry and rice at a popular local eatery",
        dinner: "Chicken tikka masala and butter naan with kulfi",
      },
    ],
  };

  const mealPlan =
    foodPreference === "veg"
      ? vegMeals[destLower] || vegMeals.default
      : nonvegMeals[destLower] || nonvegMeals.default;

  const activityTemplates = [
    [
      "Arrive and settle in. Explore the neighbourhood around your hotel.",
      "Visit the most iconic landmark in the city.",
      "Evening stroll and local market exploration.",
    ],
    [
      "Morning temple/heritage site visit before crowds arrive.",
      "Afternoon adventure activity or nature excursion.",
      "Sunset viewpoint and cultural dinner.",
    ],
    [
      "Full-day excursion to a nearby attraction.",
      "Cooking class or local workshop in the afternoon.",
      "Final souvenir shopping and farewell dinner.",
    ],
    [
      "Sunrise hike or boat ride for a unique perspective.",
      "Museum or art gallery in the afternoon.",
      "Evening cultural performance.",
    ],
    [
      "Day trip to a lesser-known village or natural site.",
      "Street food trail with a local guide.",
      "Rooftop or beachside dinner.",
    ],
  ];

  for (let i = 0; i < Math.min(numDays, 7); i++) {
    const activities = activityTemplates[i % activityTemplates.length];
    const meal = mealPlan[i % mealPlan.length];
    days.push({
      day: i + 1,
      title:
        i === 0
          ? "Arrival & First Impressions"
          : i === numDays - 1
            ? "Final Moments & Departure"
            : `Day ${i + 1} — Deep Dive`,
      activities,
      meals: meal,
    });
  }

  return days;
}

export function generateItinerary(form: TripFormData): GeneratedItinerary {
  const destKey = form.destination.toLowerCase().includes("goa")
    ? "goa"
    : form.destination.toLowerCase().includes("rajasthan") ||
        form.destination.toLowerCase().includes("jaipur") ||
        form.destination.toLowerCase().includes("udaipur")
      ? "rajasthan"
      : form.destination.toLowerCase().includes("kerala")
        ? "kerala"
        : form.destination.toLowerCase().includes("paris")
          ? "paris"
          : form.destination.toLowerCase().includes("bali")
            ? "bali"
            : null;

  const baseData = destKey ? destinationData[destKey] : {};
  const numDays = Number.parseInt(form.duration) || 4;

  const budgetKey = form.budget as "low" | "medium" | "high";
  const accommodationSource =
    budgetAccommodation[destKey || "default"] || budgetAccommodation.default;
  const accommodation =
    accommodationSource[budgetKey] || accommodationSource.medium;

  const defaultBestTime: GeneratedItinerary["bestTime"] = {
    season: "October to March (Winter)",
    months: "November to February",
    reason: `Comfortable weather ideal for sightseeing and outdoor activities in ${form.destination}.`,
  };

  const defaultMustVisit: GeneratedItinerary["mustVisitPlaces"] = [
    {
      name: `${form.destination} City Centre`,
      description:
        "Explore the historic heart of the city with its markets and monuments.",
      type: "culture",
    },
    {
      name: "Main Heritage Landmark",
      description: "The most celebrated historical site in the region.",
      type: "historical",
    },
    {
      name: "Local Nature Reserve",
      description:
        "Beautiful natural landscapes perfect for photography and relaxation.",
      type: "nature",
    },
    {
      name: "Traditional Market",
      description:
        "Vibrant local bazaar for handicrafts, spices, and street food.",
      type: "culture",
    },
    {
      name: "Cultural Museum",
      description:
        "Rich exhibits showcasing the region's art, history, and traditions.",
      type: "culture",
    },
  ];

  const defaultActivities: GeneratedItinerary["activitiesAndSafety"] = {
    activities: [
      `Explore ${form.destination}'s iconic streets on a guided heritage walk`,
      "Sample the local street food scene with a knowledgeable guide",
      "Visit sunrise viewpoints for panoramic photography",
      "Shop for authentic local handicrafts and souvenirs",
      "Experience a traditional cultural performance",
    ],
    safetyTips: [
      "Dress respectfully at religious and heritage sites — cover shoulders and knees.",
      "Keep digital copies of important documents and emergency numbers saved offline.",
      "Use only licensed taxis and pre-booked transport for long distances.",
    ],
  };

  return {
    destination: form.destination,
    bestTime: baseData.bestTime || defaultBestTime,
    mustVisitPlaces: baseData.mustVisitPlaces || defaultMustVisit,
    activitiesAndSafety: baseData.activitiesAndSafety || defaultActivities,
    accommodations: {
      budget: accommodation.budget,
      midRange: accommodation.midRange,
      luxury: accommodation.luxury,
      transportTips: accommodation.transportTips,
    },
    dayByDay: generateDayPlan(
      form.destination,
      form.interests,
      form.foodPreference,
      numDays,
    ),
  };
}
