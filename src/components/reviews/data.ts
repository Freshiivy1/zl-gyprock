import type { LucideIcon } from 'lucide-react'
import { Clock, MessageCircle, Sparkles, Star } from 'lucide-react'

export interface PraiseCategory {
  keyword: string
  line: string
  icon: LucideIcon
}

export const PRAISE_CATEGORIES: PraiseCategory[] = [
  {
    keyword: 'Finish Quality',
    line: '\u201CFlawless\u201D is the word that comes up most. Level 4\u20135 finishes that survive raking light.',
    icon: Star,
  },
  {
    keyword: 'Punctuality',
    line: 'We turn up when we say we will \u2014 reviewers mention it constantly.',
    icon: Clock,
  },
  {
    keyword: 'Cleanliness',
    line: 'Sheeted-off, dust-controlled, vacuumed. \u201CCleaner than they found it\u201D is a recurring line.',
    icon: Sparkles,
  },
  {
    keyword: 'Communication',
    line: 'Fixed quotes in 24 hours, straight answers, no chasing.',
    icon: MessageCircle,
  },
]

export interface Testimonial {
  quote: string
  name: string
  role: string
  suburb: string
  /** Featured cards render on charcoal for masonry rhythm */
  featured?: boolean
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'The finish on our walls is honestly perfect. You can drag a light across them at night and not find a single ridge. Best trades we\u2019ve had through the house.',
    name: 'Sarah M.',
    role: 'Homeowner',
    suburb: 'Maroubra',
    featured: true,
  },
  {
    quote:
      'ZL sheet and flush faster than any crew I\u2019ve used, and their Level 5 work passes inspection first go. They\u2019re on every one of my builds now.',
    name: 'Dave T.',
    role: 'Builder',
    suburb: 'Inner West',
  },
  {
    quote:
      'Water-damaged ceiling gone without a trace. Turned up when they said, sheeted off everything, and left the place cleaner than they found it.',
    name: 'Priya K.',
    role: 'Homeowner',
    suburb: 'Chatswood',
  },
  {
    quote:
      'Heritage cornice in our 1908 terrace was crumbling. They matched the original profile exactly \u2014 even our heritage architect was impressed.',
    name: 'James & Helen R.',
    role: 'Homeowners',
    suburb: 'Paddington',
    featured: true,
  },
  {
    quote:
      'Fit-out done over two weekends so we didn\u2019t lose a trading day. Curved feature wall is now the first thing clients comment on.',
    name: 'Michelle L.',
    role: 'Office Manager',
    suburb: 'Sydney CBD',
  },
  {
    quote:
      'Quoted on Tuesday, started Thursday, finished Monday. Fixed price didn\u2019t move a cent. Rare these days.',
    name: 'Andrew B.',
    role: 'Homeowner',
    suburb: 'Kellyville',
  },
  {
    quote:
      'Our raked ceiling was a nightmare job two other companies walked away from. ZL lined and flushed it \u2014 it\u2019s now the best room in the house.',
    name: 'Karen W.',
    role: 'Homeowner',
    suburb: 'Northern Beaches',
  },
  {
    quote:
      'As a PM I deal with dozens of trades. ZL\u2019s communication and program reliability is genuinely top-tier. Zero defects at handover.',
    name: 'Rob S.',
    role: 'Project Manager',
    suburb: 'Parramatta',
    featured: true,
  },
  {
    quote:
      'Small patch job other companies wouldn\u2019t touch. ZL treated it like a full reno \u2014 matched the texture perfectly and charged fairly.',
    name: 'Tom H.',
    role: 'Homeowner',
    suburb: 'Cronulla',
  },
]
