import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface Project {
  img: string
  title: string
  category: string
  tall?: boolean
}

const PROJECTS: Project[] = [
  {
    img: '/work-1.jpg',
    title: 'Luxury Living Room — Vaucluse',
    category: 'Plasterboard Installation',
    tall: true,
  },
  {
    img: '/work-4.jpg',
    title: 'Curved Feature Walls — CBD Office Fit-Out',
    category: 'Commercial',
  },
  {
    img: '/work-6.jpg',
    title: 'Raked Ceiling & Bulkhead — Northern Beaches Reno',
    category: 'Renovation',
  },
]

function ProjectTile({ project, delay }: { project: Project; delay: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={project.tall ? 'lg:col-span-7' : 'lg:col-span-5'}
    >
      <Link
        to="/projects"
        className="group relative block w-full overflow-hidden"
        style={{ aspectRatio: project.tall ? '4 / 3' : '16 / 9' }}
        aria-label={project.title}
      >
        {/* Image with curtain reveal */}
        <motion.img
          src={project.img}
          alt={project.title}
          variants={{ hidden: { scale: 1.08 }, show: { scale: 1 } }}
          transition={{ duration: 0.9, delay: delay + 0.35, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        {/* Curtain panel slides away */}
        <motion.div
          variants={{ hidden: { x: '0%' }, show: { x: '100%' } }}
          transition={{ duration: 0.8, delay, ease: EASE }}
          className="absolute inset-0 z-20 bg-paper"
          aria-hidden="true"
        />
        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        {/* Amber arrow chip slides in top-right on hover */}
        <div className="absolute right-5 top-5 z-10 flex h-11 w-11 translate-x-3 items-center justify-center bg-amber opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5 text-charcoal" />
        </div>
        {/* Overlay text */}
        <div className="absolute bottom-0 left-0 z-10 p-6 md:p-8">
          <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-amber">
            {project.category}
          </p>
          <h3 className="mt-2 font-display text-lg font-bold uppercase leading-[1.15] text-bone md:text-[22px]">
            {project.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  )
}

export default function FeaturedProjects() {
  return (
    <section className="bg-paper pb-24 md:pb-[140px]">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Recent Work</span>
            <div className="mt-4 overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="font-display text-[34px] font-bold uppercase leading-none tracking-[-0.015em] text-ink md:text-[56px]"
              >
                Proof, Not Promises
              </motion.h2>
            </div>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-amber-deep"
          >
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <ProjectTile project={PROJECTS[0]} delay={0} />
          <div className="flex flex-col gap-6 lg:col-span-5">
            <ProjectTile project={{ ...PROJECTS[1], tall: false }} delay={0.15} />
            <ProjectTile project={{ ...PROJECTS[2], tall: false }} delay={0.3} />
          </div>
        </div>
      </div>
    </section>
  )
}
