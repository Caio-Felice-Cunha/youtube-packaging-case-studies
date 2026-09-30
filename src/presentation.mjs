// Presentation references approved IDs; artwork and title pairs live in cases.mjs.
export const workOrder = [
  { id: 'tampa-future', variant: 'a' },
  { id: 'starting-over', variant: 'a' },
  { id: 'two-countries', variant: 'a' },
  { id: 'first-car', variant: 'a' },
  { id: 'seven-platforms', variant: 'b' },
  { id: 'canadian-resume', variant: 'a' }
];
export const mainComparison = workOrder[0];
export const featured = workOrder.slice(1, 4);
/** @type {Record<string, string>} */
export const topics = {
  'seven-platforms': 'Work & careers',
  'canadian-resume': 'Work & careers',
  'first-car': 'Life abroad',
  'starting-over': 'Life abroad',
  'tampa-future': 'Places & communities',
  'two-countries': 'Money & obligations'
};
