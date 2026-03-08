/**
 * Shared service definitions for Home pricing and Book form
 */
export const SERVICES = [
  { name: 'Fade haircut', price: 250, features: ['Haircut & styling', 'Wash included', '45 minutes'], popular: false },
  { name: 'Beard trimming', price: 150, features: ['Beard trim & shape', '30 minutes'], popular: false },
  { name: 'hair styling', price: 150, features: ['hair styling', 'Quick wash'], popular: false },
  { name: 'Manicure', price: 170, features: ['Manicure', 'nails cleaning & polishing', 'hand massage'], popular: false },
  { name: 'Pedicure', price: 200, features: ['Pedicure', 'nails cleaning & polishing', 'foot spa & massage'], popular: false },
  { name: 'Manicure & Pedicure', price: 299, features: ['Manicure & Pedicure', 'nails cleaning & polishing', 'hand massage', 'foot spa & massage'], popular: false },
  { name: 'hair full service', price: 399, features: ['hairCut', 'Quick wash', 'hair styling', 'beard trim & shape', '60 minutes'], popular: true },
  { name: 'Full Service', price: 599, features: ['hairCut', 'Quick wash', 'hair styling', 'beard trim & shape', 'manicure & pedicure', 'nails cleaning & polishing', 'hand massage', 'foot spa & massage'], popular: true },
] as const;
