import { unwrap } from "solid-js/store";

/**
 * Snapshots Solid stores for truthful console logging.
 */
export function Log(...args: any[]) {
  const snapped = args.map((arg) => {
    if (typeof arg === "object" && arg !== null) {
      try {
        // unwrap removes the proxy, JSON forces an immediate snapshot
        return JSON.parse(JSON.stringify(unwrap(arg)));
      } catch (e) {
        return arg; // Fallback for non-serializable data
      }
    }
    return arg; // Primitives (strings, numbers) are already snapshots
  });

  console.log(...snapped);
}
