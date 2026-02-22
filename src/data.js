import makeUpGold from './assets/gambar/MakeUp/TheOrnamentsGold.png'
import makeUpSilver from './assets/gambar/MakeUp/TheOrnamentsSilver.png'
import makeUpPattern from './assets/gambar/MakeUp/ThePatterns.png'
import makeUpMascara from './assets/gambar/MakeUp/mascara.png'
import makeUpCherry from './assets/gambar/MakeUp/TheCherryBlossom.png'
import makeUpDenim from './assets/gambar/MakeUp/TheDenimFlora.png'
import makeUpRose from './assets/gambar/MakeUp/TheRedRose.png'

import skincare1 from './assets/gambar/Skincare/skincare1.png'
import skincare2 from './assets/gambar/Skincare/skincare2.png'
import skincare3 from './assets/gambar/Skincare/skincare3.png'
import skincare4 from './assets/gambar/Skincare/skincare4.png'
import skincare5 from './assets/gambar/Skincare/skincare5.png'

export const topCategories = ['Makeup', 'Skincare']

export const products = [
  {
    id: 1,
    sku: 'MUP-GLD-001',
    name: 'Rouge G Jewel Case · Gold Harmony',
    price: 84,
    stock: 26,
    category: 'Makeup',
    description: 'Iconic couture lipstick case with a luminous gold finish for a bold, polished statement.',
    image: makeUpGold,
  },
  {
    id: 2,
    sku: 'MUP-SLV-002',
    name: 'Rouge G Jewel Case · Silver Veil',
    price: 86,
    stock: 22,
    category: 'Makeup',
    description: 'Elegant silver case paired with a refined nude tone designed for effortless daily luxury.',
    image: makeUpSilver,
  },
  {
    id: 3,
    sku: 'MUP-PTN-003',
    name: 'Rouge G Jewel Case · Signature Motif',
    price: 88,
    stock: 20,
    category: 'Makeup',
    description: 'Exclusive patterned case inspired by Maison Guerlain design codes and collectible artistry.',
    image: makeUpPattern,
  },
  {
    id: 4,
    sku: 'MUP-MSC-004',
    name: 'Noir G Intense Volume Mascara',
    price: 90,
    stock: 28,
    category: 'Makeup',
    description: 'Long-wear mascara with couture volume and clean definition for sophisticated eye looks.',
    image: makeUpMascara,
  },
  {
    id: 5,
    sku: 'MUP-CHR-005',
    name: 'KissKiss Bee Glow · Cherry Bloom',
    price: 85,
    stock: 30,
    category: 'Makeup',
    description: 'Fresh floral tint with a radiant finish, crafted for naturally vibrant lips.',
    image: makeUpCherry,
  },
  {
    id: 6,
    sku: 'MUP-DNM-006',
    name: 'Rouge G Collector Case · Denim Flora',
    price: 89,
    stock: 18,
    category: 'Makeup',
    description: 'Seasonal limited collector case with denim-floral artistry for exclusive beauty wardrobes.',
    image: makeUpDenim,
  },
  {
    id: 7,
    sku: 'MUP-RRS-007',
    name: 'Rouge G Satin · Red Rose',
    price: 92,
    stock: 24,
    category: 'Makeup',
    description: 'Satin lipstick in a deep rose tone delivering elegant color payoff for evening glam.',
    image: makeUpRose,
  },
  {
    id: 8,
    sku: 'SKN-GLW-008',
    name: 'Abeille Royale Youth Watery Oil Serum',
    price: 82,
    stock: 40,
    category: 'Skincare',
    description: 'Silky daily serum that boosts glow and comfort while leaving skin supple and radiant.',
    image: skincare1,
  },
  {
    id: 9,
    sku: 'SKN-CLN-009',
    name: 'Orchidée Impériale Gentle Foam Cleanser',
    price: 87,
    stock: 34,
    category: 'Skincare',
    description: 'Soft cleansing foam that purifies without stripping, preserving hydration and comfort.',
    image: skincare2,
  },
  {
    id: 10,
    sku: 'SKN-TON-010',
    name: 'Abeille Royale Fortifying Lotion',
    price: 90,
    stock: 29,
    category: 'Skincare',
    description: 'Lightweight pre-serum lotion that refines skin texture and enhances your skincare ritual.',
    image: skincare3,
  },
  {
    id: 11,
    sku: 'SKN-CRM-011',
    name: 'Orchidée Impériale Rich Cream',
    price: 88,
    stock: 31,
    category: 'Skincare',
    description: 'Nourishing face cream with a velvety texture designed to support firmness and resilience.',
    image: skincare4,
  },
  {
    id: 12,
    sku: 'SKN-MST-012',
    name: 'Parure Gold Skin Mist Essence',
    price: 83,
    stock: 27,
    category: 'Skincare',
    description: 'Refreshing essence mist for instant hydration and luminous skin throughout the day.',
    image: skincare5,
  },
]

export const stats = [
  { label: 'Curated Products', value: 3200, suffix: '+' },
  { label: 'Satisfied Clients', value: 9800, suffix: '+' },
  { label: 'Beauty Consultants', value: 120, suffix: '+' },
  { label: 'Average Rating', value: 4.9, suffix: '/5' },
]

export const brandLogos = ['GUERLAIN', 'PARIS', 'ROUGE G', 'ABEILLE ROYALE', 'ORCHIDÉE', 'KISSKISS', 'AQUA ALLEGORIA']

export const testimonials = [
  {
    id: 1,
    name: 'Clara Bennett',
    role: 'Beauty Editor',
    quote: 'The Guerlain curation feels refined and intentional. Every product card looks truly couture.',
  },
  {
    id: 2,
    name: 'Ethan Cole',
    role: 'Luxury Retail Consultant',
    quote: 'Motion is elegant and subtle, making the full shopping journey feel premium from start to checkout.',
  },
  {
    id: 3,
    name: 'Sophia Leclerc',
    role: 'Early Client',
    quote: 'The visual language is luxurious yet modern. It is smooth on mobile and effortless to navigate.',
  },
]
