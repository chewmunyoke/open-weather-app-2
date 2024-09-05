export function debounce(fn: () => void, delay = 0): () => void {
  let timeoutID: NodeJS.Timeout | undefined = undefined;
  return () => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      timeoutID = undefined;
      fn();
    }, delay);
  };
}

export function toTitleCase(str: string): string {
  const words = str
    .toLowerCase()
    .split(' ')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.substring(1)}`);

  return words.join(' ');
}

export function getFormattedDate(date: Date, timezoneOffset?: number): string {
  const currentOffset = date.getTimezoneOffset() * 60 * 1000;
  let offset = 0;
  if (timezoneOffset && !isNaN(timezoneOffset)) {
    offset += currentOffset + timezoneOffset;
  }
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date.getTime() + offset);
}

export function getLocationFromSlug(slug: string): string {
  const location = decodeURIComponent(slug);
  const index = location.lastIndexOf(',');
  return `${toTitleCase(location.substring(0, index))}${location.substring(index)}`;
}

export function getLocationPath(location: string): string {
  return `/location/${encodeURIComponent(location)}`;
}
