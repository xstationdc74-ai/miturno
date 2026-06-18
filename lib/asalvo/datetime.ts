import { fromZonedTime } from "date-fns-tz";

export function buildParticipantDateTime(
  date: string,
  time: string,
  timezone: string
) {
  const dateTimeString =
    `${date}T${time}`;

  return fromZonedTime(
    dateTimeString,
    timezone
  );
}