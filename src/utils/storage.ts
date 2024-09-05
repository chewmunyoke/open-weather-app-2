import { DEFAULT_LOCATION, LOCAL_STORAGE_KEY } from '@/constants';
import type { History } from '@/types';

import { decrypt, encrypt } from './encryption';

function getHistory(setDefault: boolean, currentLocation?: string): History {
  const defaultHistory: History = {
    [currentLocation ? currentLocation : DEFAULT_LOCATION]:
      new Date().getTime(),
  };
  let history = {};
  try {
    history = JSON.parse(
      decrypt(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '') ?? '{}'
    );
  } catch (_) {
    history = {};
  }
  if (!history || !Object.entries(history).length) {
    if (setDefault) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        encrypt(JSON.stringify(defaultHistory))
      );
      return defaultHistory;
    }
    history = {};
  }
  return history;
}

export function getSortedHistoryList(
  setDefault = false,
  currentLocation?: string
): [string, number][] {
  const history = getHistory(setDefault, currentLocation);
  const historyEntries = Object.entries(history);
  if (!historyEntries.length) {
    return [];
  }
  const historyList = historyEntries.sort((a, b) => b[1] - a[1]);
  return historyList;
}

export function getLatestLocationName(): string {
  const historyList = getSortedHistoryList();
  return historyList[0]?.[0] ?? DEFAULT_LOCATION;
}

export function addLocation(locationName: string): void {
  const history = getHistory(false);
  history[locationName] = new Date().getTime();
  localStorage.setItem(LOCAL_STORAGE_KEY, encrypt(JSON.stringify(history)));
}

export function removeLocation(locationName: string): void {
  const history = getHistory(false);
  delete history[locationName];
  localStorage.setItem(LOCAL_STORAGE_KEY, encrypt(JSON.stringify(history)));
}

export function removeAllLocations(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}
