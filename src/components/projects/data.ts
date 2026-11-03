export type FilterKey =
  | 'All'
  | 'Installation'
  | 'Repairs'
  | 'Plastering'
  | 'Cornice & Heritage'
  | 'Commercial'
  | 'Renovations'

export const FILTERS: FilterKey[] = [
  'All',
  'Installation',
  'Repairs',
  'Plastering',
  'Cornice & Heritage',
  'Commercial',
  'Renovations',
]

export interface Project {
  id: string
  img: string
  title: string
  /** Category eyebrow shown on the card / lightbox */
  category: string
  /** Filter bucket */
  filter: Exclude<FilterKey, 'All'>
  location: string
  scope: string
  /** Aspect-ratio treatment for the editorial grid rhythm */
  ratio: string
  spec: {
    suburb: string
    service: string
    finish: string
    duration: string
  }
}

export const PROJECTS: Project[] = [
  {
    id: 'shadow-line-living-room',
    img: '/work-1.jpg',
    title: 'Shadow-Line Living Room',
    category: 'Installation + Level 5 Finish',
    filter: 'Installation',
    location: 'Vaucluse',
    scope:
      'Full re-sheet and Level 5 skim throughout a harbourside living space. Square-set ceilings, shadow-line details.',
    ratio: '4 / 3',
    spec: {
      suburb: 'Vaucluse',
      service: 'Gyprock Installation',
      finish: 'Level 5',
      duration: '6 days',
    },
  },
  {
    id: 'new-build-sheet-out',
    img: '/work-2.jpg',
    title: 'New Build Sheet-Out',
    category: 'Installation',
    filter: 'Installation',
    location: 'Kellyville',
    scope:
      'Complete plasterboard installation, 4-bed new build. Hung, set and flushed in five days.',
    ratio: '3 / 4',
    spec: {
      suburb: 'Kellyville',
      service: 'Gyprock Installation',
      finish: 'Level 4',
      duration: '5 days',
    },
  },
  {
    id: 'heritage-cornice-restoration',
    img: '/work-3.jpg',
    title: 'Heritage Cornice Restoration',
    category: 'Cornice & Heritage',
    filter: 'Cornice & Heritage',
    location: 'Paddington',
    scope:
      'Victorian terrace cornice and ceiling rose restored and reinstated, period profiles matched.',
    ratio: '4 / 3',
    spec: {
      suburb: 'Paddington',
      service: 'Cornice & Decorative',
      finish: 'Period profile match',
      duration: '4 days',
    },
  },
  {
    id: 'curved-office-feature-walls',
    img: '/work-4.jpg',
    title: 'Curved Office Feature Walls',
    category: 'Commercial',
    filter: 'Commercial',
    location: 'Sydney CBD',
    scope:
      'Curved plasterboard feature walls with cove lighting for a 2-level office fit-out. After-hours program.',
    ratio: '4 / 3',
    spec: {
      suburb: 'Sydney CBD',
      service: 'Commercial Fit-Out',
      finish: 'Level 4 + cove detail',
      duration: '2 weekends',
    },
  },
  {
    id: 'venetian-bathroom-finish',
    img: '/work-5.jpg',
    title: 'Venetian Bathroom Finish',
    category: 'Plastering',
    filter: 'Plastering',
    location: 'Mosman',
    scope:
      'Venetian-style plaster feature finish in a luxury bathroom renovation. Brass and travertine pairing.',
    ratio: '3 / 4',
    spec: {
      suburb: 'Mosman',
      service: 'Plastering & Flushing',
      finish: 'Venetian-style plaster',
      duration: '3 days',
    },
  },
  {
    id: 'raked-ceiling-bulkhead',
    img: '/work-6.jpg',
    title: 'Raked Ceiling & Bulkhead',
    category: 'Renovations',
    filter: 'Renovations',
    location: 'Northern Beaches',
    scope:
      'Cathedral ceiling lined and flushed with sculptural bulkhead and warm LED cove detail.',
    ratio: '4 / 3',
    spec: {
      suburb: 'Northern Beaches',
      service: 'Renovations & Extensions',
      finish: 'Level 4 flush',
      duration: '5 days',
    },
  },
]
