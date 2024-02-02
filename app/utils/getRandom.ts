/**
 * Get a random item from the array
 * @param items Array of items
 * @returns random item
 */
function getRandom<Type>(items: Type[]): Type | null {
  if (!items.length) {
    return null;
  }
  return items[Math.floor(Math.random() * items.length)];
}

export default getRandom;
