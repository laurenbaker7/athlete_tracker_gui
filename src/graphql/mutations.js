import { gql } from '@apollo/client';

export const REGISTER_TEAM = gql`
  mutation RegisterTeam($teamName: String!) {
    registerTeam(teamName: $teamName) {
      id
      teamName
    }
  }
`;

export const REGISTER_ATHLETE = gql`
  mutation RegisterAthlete($username: String!, $teamName: String) {
    registerAthlete(username: $username, teamName: $teamName) {
      id
      username
      teamName
    }
  }
`;

export const RECORD_WORKOUT = gql`
  mutation RecordWorkout(
    $username: String!
    $workoutType: String!
    $duration: Int!
    $distance: Float!
    $latitude: Float!
    $longitude: Float!
    $intensity: Int
  ) {
    recordWorkout(
      username: $username
      workoutType: $workoutType
      duration: $duration
      distance: $distance
      latitude: $latitude
      longitude: $longitude
      intensity: $intensity
    ) {
      id
      username
      timestamp
    }
  }
`;

export const RECORD_EVENT = gql`
  mutation RecordEvent(
    $username: String!
    $description: String!
    $latitude: Float!
    $longitude: Float!
    $teamName: String
  ) {
    recordEvent(
      username: $username
      description: $description
      latitude: $latitude
      longitude: $longitude
      teamName: $teamName
    ) {
      id
      username
      timestamp
    }
  }
`;