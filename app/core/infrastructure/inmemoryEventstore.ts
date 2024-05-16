import type { Event, EventEnvelope } from '@event-driven-io/emmett'
import {v4} from "uuid"
import {
  type AggregateStreamOptions,
  type AggregateStreamResult,
  type AppendToStreamOptions,
  type AppendToStreamResult,
  type EventStore,
  type ReadStreamOptions,
  type ReadStreamResult,
} from '@event-driven-io/emmett';
import { assertExpectedVersionMatchesCurrent } from '@event-driven-io/emmett';
import {
  getInMemoryEventStore,
  type EventStore,
} from '@event-driven-io/emmett';

const streams = new Map<string, EventEnvelope[]>();

export const debugAllStreams = ():Map<string, EventEnvelope[]> => {
  return streams
}

export const findEventStore = (): EventStore => {
  return getInMemoryEventStore()
}
