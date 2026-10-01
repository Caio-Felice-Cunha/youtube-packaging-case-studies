// Presentation references approved IDs; artwork and title pairs live in cases.mjs.
export const workOrder = [
  { id: 'halloween-at-home', variant: 'b' },
  { id: 'cost-of-overtime', variant: 'a' },
  { id: 'florida-seed-starts', variant: 'b' },
  { id: 'autumn-colour-plan', variant: 'b' },
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
  'start-before-ready': 'Personal growth',
  'cost-of-overtime': 'Work & careers',
  'halloween-at-home': 'Home & making',
  'autumn-colour-plan': 'Home & making',
  'florida-seed-starts': 'Home & growing',
  'seven-platforms': 'Work & careers',
  'canadian-resume': 'Work & careers',
  'first-car': 'Life abroad',
  'starting-over': 'Life abroad',
  'tampa-future': 'Places & communities',
  'two-countries': 'Money & obligations'
};
