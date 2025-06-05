import { gql } from '@apollo/client';

export const GET_WORKOUTS_BY_ATHLETE = gql`
  query WorkoutsByAthlete($username: String!, $startTime: DateTime, $endTime: DateTime) {
    workoutsByAthlete(username: $username, startTime: $startTime, endTime: $endTime) {
      id
      duration
      distance
      timestamp
    }
  }
`;

export const GET_WORKOUTS_MAP = gql`
  query WorkoutsByAthlete($username: String!, $startTime: DateTime, $endTime: DateTime) {
    workoutsByAthlete(username: $username, startTime: $startTime, endTime: $endTime) {
      id
      latitude
      longitude
      workoutType
      distance
      duration
      timestamp
    }
  }
`;

export const GET_NEARBY_EVENTS = gql`
  query EventsNearby(
    $latitude: Float!
    $longitude: Float!
    $radiusMiles: Float!
    $teamName: String
    $startTime: DateTime
    $endTime: DateTime
  ) {
    eventsNearby(
      latitude: $latitude
      longitude: $longitude
      radiusMiles: $radiusMiles
      teamName: $teamName
      startTime: $startTime
      endTime: $endTime
    ) {
      id
      username
      description
      latitude
      longitude
      teamName
      timestamp
    }
  }
`;