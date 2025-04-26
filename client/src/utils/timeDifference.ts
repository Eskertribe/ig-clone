export function calculateTimeSince(timeStamp: string | Date) {
  const date = new Date(timeStamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000); // Convert milliseconds to seconds
  const SECONDS_IN_A_YEAR = 31536000;
  const SECONDS_IN_A_MONTH = 2592000; // 30 days
  const SECONDS_IN_A_DAY = 86400; // 24 hours
  const SECONDS_IN_AN_HOUR = 3600; // 1 hour
  const SECONDS_IN_A_MINUTE = 60; // 1 minute

  let interval = Math.floor(seconds / SECONDS_IN_A_YEAR);

  if (interval > 1) {
    return interval + "y";
  }

  interval = Math.floor(seconds / SECONDS_IN_A_MONTH);

  if (interval > 1) {
    return interval + "m";
  }

  interval = Math.floor(seconds / SECONDS_IN_A_DAY);

  if (interval > 1) {
    return interval + "d";
  }

  interval = Math.floor(seconds / SECONDS_IN_AN_HOUR);

  if (interval > 1) {
    return interval + "h";
  }

  interval = Math.floor(seconds / SECONDS_IN_A_MINUTE);

  if (interval > 1) {
    return interval + "min";
  }

  return seconds + "s";
}
