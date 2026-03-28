import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Itinerary {
    destination: string;
    duration: string;
    foodPreference: string;
    tripType: string;
    interests: string;
    createdAt: bigint;
    budget: string;
    generatedPlan: string;
}
export interface CreateItinerary {
    destination: string;
    duration: string;
    foodPreference: string;
    tripType: string;
    interests: string;
    budget: string;
    generatedPlan: string;
}
export interface backendInterface {
    deleteItinerary(id: bigint): Promise<void>;
    getAllItineraries(): Promise<Array<Itinerary>>;
    getItinerary(id: bigint): Promise<Itinerary>;
    saveItinerary(data: CreateItinerary): Promise<bigint>;
}
