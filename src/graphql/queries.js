import { gql } from '@apollo/client';

export const GET_FAMILY_OBSERVATIONS = gql`
  query GetFamily($id: Int!) {
    family(id: $id) {
      id
      name
      observations {
        timestamp
        size
        healthRating
      }
    }
  }
`;

export const GET_FAMILY_LOCATIONS = gql`
  query GetFamilyLocations($id: Int!) {
    family(id: $id) {
      id
      name
      observations {
        latitude
        longitude
        timestamp
      }
      events {
        latitude
        longitude
        timestamp
      }
    }
  }
`;

export const GET_HERD_LOCATIONS = gql`
  query GetHerdLocations($id: Int!) {
    herd(id: $id) {
      id
      species
      families {
        id
        name
        observations {
          latitude
          longitude
          timestamp
        }
        events {
          latitude
          longitude
          timestamp
        }
      }
    }
  }
`;

export const GET_EVENTS_NEAR_LOCATION = gql`
  query EventsNearLocation(
    $latitude: Float!
    $longitude: Float!
    $radiusMiles: Float!
    $startTime: DateTime
    $endTime: DateTime
  ) {
    eventsNearby(
      latitude: $latitude
      longitude: $longitude
      radiusMiles: $radiusMiles
      startTime: $startTime
      endTime: $endTime
    ) {
      latitude
      longitude
      timestamp
      description
    }
  }
`;

export const GET_FAMILIES_NEAR_LOCATION = gql`
  query FamiliesNearLocation(
    $latitude: Float!
    $longitude: Float!
    $radiusMiles: Float!
    $startTime: DateTime
    $endTime: DateTime
  ) {
    familiesNearby(
      latitude: $latitude
      longitude: $longitude
      radiusMiles: $radiusMiles
      startTime: $startTime
      endTime: $endTime
    ) {
      id
      name
      observations {
        latitude
        longitude
        timestamp
      }
      events {
        latitude
        longitude
        timestamp
        description
      }
    }
  }
`;