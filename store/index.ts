import { DriverStore, LocationStore, MarkerData } from '@/types/type';
import { create } from 'zustand';

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLatitude: null,
  userLongitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  destinationLatitude: null,

  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    });
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    });
  },
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number | null) =>
    set({ selectedDriver: driverId }),
  clearSelectedDriver: () => set({ selectedDriver: null }),
  setDrivers: (drivers: MarkerData[]) => set({ drivers }),
}));
