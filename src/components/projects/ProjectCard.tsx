import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { Project } from './data'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface ProjectCardProps {
  project: Project
  /** Skip the curtain reveal (used when cards re-enter after filtering) */
  instant?: boolean
  onOpen: () => void
}

/**
 * Gallery card (projects.md §2). forwardRef so Framer Motion `popLayout`
 * mode can measure it during filter transitions.
 */
const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(function ProjectCard(
  { project, instant = false, onOpen },
  ref,
) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25, ease: EASE } }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className="group cursor-pointer"
      onClick={onOpen}
    >
      {/* Image with curtain reveal */}
      <div className="relative overflow-hidden bg-paper-dim" style={{ aspectRatio: project.ratio }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        >
          <motion.img
            src={project.img}
            alt={project.title}
            loading="lazy"
            variants={{ hidden: { scale: 1.08 }, show: { scale: 1 } }}
            transition={{ duration: 0.9, delay: instant ? 0 : 0.3, ease: EASE }}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Curtain panel slides away on scroll into view */}
        <motion.div
          initial={instant ? false : { x: '0%' }}
          whileInView={{ x: '100%' }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute inset-0 z-20 bg-paper"
          aria-hidden="true"
        />

        {/* Bottom gradient overlay — hover only */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* Amber arrow chip slides in top-right on hover */}
        <div className="absolute right-4 top-4 z-10 flex h-10 w-10 translate-x-3 items-center justify-center bg-amber opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5 text-charcoal" />
        </div>
      </div>

      {/* Meta below image */}
      <div className="pt-5">
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-amber-deep">
          {project.category}
        </p>
        <h3 className="mt-2 font-display text-[22px] font-bold uppercase leading-[1.15] text-ink">
          <span className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-300 group-hover:decoration-amber">
            {project.title}
          </span>
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-[13px] font-medium tracking-[0.04em] text-ink-soft">
          <MapPin className="h-3.5 w-3.5 text-amber-deep" />
          {project.location}
        </p>
      </div>
    </motion.article>
  )
})

export default ProjectCard
