'use client';

import { useEffect, useRef } from 'react';

export default function TrafficTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    // Only track once per page load to avoid double counting in React strict mode
    if (!tracked.current) {
      tracked.current = true;
      fetch('/api/traffic', {
        method: 'POST',
        // Fire and forget, we don't care about the response
      }).catch(() => {
        // Silently fail if tracker is blocked
      });
    }
  }, []);

  return null;
}
