import { gql } from '@apollo/client';

export const REGISTER_HERD = gql`
  mutation RegisterHerd($species: String!) {
    registerHerd(species: $species) {
      id
      species
    }
  }
`;

export const REGISTER_FAMILY = gql`
  mutation RegisterFamily($name: String!, $species: String!, $herdId: Int!) {
    registerFamily(name: $name, species: $species, herdId: $herdId) {
      id
      name
    }
  }
`;

export const RECORD_OBSERVATION = gql`
  mutation RecordObservation(
    $familyId: Int!
    $latitude: Float!
    $longitude: Float!
    $size: Int!
    $healthRating: Int!
  ) {
    recordObservation(
      familyId: $familyId
      latitude: $latitude
      longitude: $longitude
      size: $size
      healthRating: $healthRating
    ) {
      id
      timestamp
    }
  }
`;

export const RECORD_EVENT = gql`
  mutation RecordEvent(
    $familyId: Int!
    $latitude: Float!
    $longitude: Float!
    $description: String!
  ) {
    recordEvent(
      familyId: $familyId
      latitude: $latitude
      longitude: $longitude
      description: $description
    ) {
      id
      timestamp
    }
  }
`;