import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateItinerary, Itinerary } from "../backend.d.ts";
import { useActor } from "./useActor";

export function useGetAllItineraries() {
  const { actor, isFetching } = useActor();
  return useQuery<Itinerary[]>({
    queryKey: ["itineraries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllItineraries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveItinerary() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateItinerary) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveItinerary(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itineraries"] });
    },
  });
}

export function useDeleteItinerary() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteItinerary(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itineraries"] });
    },
  });
}
