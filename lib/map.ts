import { Driver, MarkerData } from '@/types/type';

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

const extractDurationFromResponse = (
  data: any,
  requestType: string
): number | null => {
  try {
    if (data.status && data.status !== 'OK') {
      return null;
    }

    if (
      !data.routes ||
      !data.routes[0] ||
      !data.routes[0].legs ||
      !data.routes[0].legs[0] ||
      !data.routes[0].legs[0].duration
    ) {
      return null;
    }

    return data.routes[0].legs[0].duration.value;
  } catch {
    return null;
  }
};

export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: Driver[];
  userLatitude: number;
  userLongitude: number;
}): MarkerData[] => {
  return data.map((driver) => {
    const latOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005
    const lngOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005

    return {
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
      title: `${driver.first_name} ${driver.last_name}`,
      ...driver,
    };
  });
};

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
  const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding

  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}) => {
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  )
    return;

  if (!directionsAPI) {
    return markers.map((marker) => ({ ...marker, time: 0, price: '0.00' }));
  }

  try {
    const timesPromises = markers.map(async (marker) => {
      try {
        const responseToUser = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`
        );

        if (!responseToUser.ok) {
          return { ...marker, time: 0, price: '0.00' };
        }

        const dataToUser = await responseToUser.json();
        const timeToUser = extractDurationFromResponse(dataToUser, 'toUser');

        if (timeToUser === null) {
          return { ...marker, time: 0, price: '0.00' };
        }

        const responseToDestination = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`
        );

        if (!responseToDestination.ok) {
          return { ...marker, time: 0, price: '0.00' };
        }

        const dataToDestination = await responseToDestination.json();
        const timeToDestination = extractDurationFromResponse(
          dataToDestination,
          'toDestination'
        );

        if (timeToDestination === null) {
          return { ...marker, time: 0, price: '0.00' };
        }

        const totalTime = (timeToUser + timeToDestination) / 60;
        const price = (totalTime * 0.5).toFixed(2);

        return { ...marker, time: Math.round(totalTime), price };
      } catch {
        return { ...marker, time: 0, price: '0.00' };
      }
    });

    return await Promise.all(timesPromises);
  } catch {
    return markers.map((marker) => ({ ...marker, time: 0, price: '0.00' }));
  }
};
