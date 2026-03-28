import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Int "mo:core/Int";

actor {
  type Itinerary = {
    tripType : Text;
    budget : Text;
    destination : Text;
    interests : Text;
    foodPreference : Text;
    duration : Text;
    generatedPlan : Text; // JSON string
    createdAt : Int;
  };

  module Itinerary {
    public func compare(itinerary1 : Itinerary, itinerary2 : Itinerary) : Order.Order {
      Int.compare(
        itinerary1.createdAt,
        itinerary2.createdAt,
      );
    };
  };

  let itineraries = Map.empty<Nat, Itinerary>();
  var nextId = 0;

  public type CreateItinerary = {
    tripType : Text;
    budget : Text;
    destination : Text;
    interests : Text;
    foodPreference : Text;
    duration : Text;
    generatedPlan : Text;
  };

  public shared ({ caller }) func saveItinerary(data : CreateItinerary) : async Nat {
    let id = nextId;
    nextId += 1;

    let itinerary : Itinerary = {
      data with
      createdAt = Time.now();
    };

    itineraries.add(id, itinerary);
    id;
  };

  public query ({ caller }) func getAllItineraries() : async [Itinerary] {
    itineraries.values().toArray().sort();
  };

  public query ({ caller }) func getItinerary(id : Nat) : async Itinerary {
    switch (itineraries.get(id)) {
      case (null) { Runtime.trap("Itinerary not found") };
      case (?itinerary) { itinerary };
    };
  };

  public shared ({ caller }) func deleteItinerary(id : Nat) : async () {
    if (not itineraries.containsKey(id)) { Runtime.trap("Itinerary not found") };
    itineraries.remove(id);
  };
};
