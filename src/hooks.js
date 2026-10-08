import { useEffect, useState } from 'react';

import { APPROX, PRICES, REGION_BY_TIMEZONE } from './config.js';

/**
 * The visitor's likely App Store country: from their time zone first (where they are), then
 * from their browser language ("en-US" -> "US", "fil" -> "PH").
 */
function visitorRegion() {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (REGION_BY_TIMEZONE[zone]) return REGION_BY_TIMEZONE[zone];
  } catch {
    // No time zone support: fall back to the language.
  }
  for (const tag of navigator.languages?.length ? navigator.languages : [navigator.language]) {
    try {
      const region = new Intl.Locale(tag).maximize().region;
      if (region) return region;
    } catch {
      // Ignore malformed language tags.
    }
  }
  return null;
}

/** Rounds a converted price so it doesn't pretend to be exact: $3.49 -> 3.5, 224,280 -> 220,000. */
function roundApprox(value) {
  if (value < 20) return Math.round(value * 2) / 2;
  if (value < 1000) return Math.round(value);
  const step = 10 ** (Math.floor(Math.log10(value)) - 1);
  return Math.round(value / step) * step;
}

function format(amount, currency) {
  return new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}

/**
 * MiLuv Pro prices for the visitor, formatted for their locale:
 * { monthly: "₱99", lifetime: "₱199", approx: false }.
 * Regions listed in PRICES get the exact App Store price. Everyone else gets the Philippine
 * price converted to their currency, rounded, with `approx: true` so the page labels it.
 */
export function useLocalPrices() {
  const [prices, setPrices] = useState({});
  useEffect(() => {
    const region = visitorRegion();
    const result = { approx: false };
    const currency = APPROX.currencyByRegion[region] ?? APPROX.fallbackCurrency;
    const rate = APPROX.usdRates[currency];

    for (const [plan, table] of Object.entries(PRICES)) {
      const exact = table[region];
      if (exact) {
        result[plan] = format(exact.amount, exact.currency);
        continue;
      }
      const base = table[APPROX.base];
      if (!base || !rate) continue;
      result[plan] = format(roundApprox((base.amount / APPROX.phpPerUsd) * rate), currency);
      result.approx = true;
    }

    setPrices(result);
  }, []);
  return prices;
}
