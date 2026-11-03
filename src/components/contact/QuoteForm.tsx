import { useState } from 'react'
import type { ChangeEvent, FocusEvent, FormEvent, ReactNode } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Loader2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const ERROR = '#D95D39'

const SERVICES = [
  'Gyprock Installation',
  'Repairs & Patching',
  'Plastering & Flushing',
  'Cornice & Decorative',
  'Commercial Fit-Out',
  'Renovation / Extension',
  'Not sure yet',
]

const HEAR_ABOUT = ['Google', 'Referral', 'Facebook/Instagram', 'Builder', 'Other']

const PROJECT_TYPES = ['Residential', 'Commercial'] as const

type FormValues = {
  name: string
  phone: string
  email: string
  suburb: string
  service: string
  projectType: string
  message: string
  hearAbout: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const INITIAL: FormValues = {
  name: '',
  phone: '',
  email: '',
  suburb: '',
  service: '',
  projectType: '',
  message: '',
  hearAbout: '',
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.'
  else if (!/^[\d\s()+]{8,}$/.test(values.phone.trim()))
    errors.phone = 'Please enter a valid phone number.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.'
  return errors
}

/* ---------- Shared field shell: floating label + amber focus underline + error state ---------- */

function FieldShell({
  label,
  required,
  floated,
  focused,
  error,
  children,
}: {
  label: string
  required?: boolean
  floated: boolean
  focused: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div className="relative pt-5">
      <label
        className={cn(
          'pointer-events-none absolute left-0 transition-all duration-300',
          floated
            ? 'top-0 text-[13px] font-medium tracking-[0.04em]'
            : 'top-[26px] text-base text-ink-soft',
        )}
        style={{ color: floated ? (error ? ERROR : focused ? '#E8A617' : '#5C564D') : undefined }}
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {/* Amber focus underline — scaleX 0→1 (0.3s) */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute bottom-0 left-0 h-[2px] w-full origin-left transition-transform duration-300',
          focused ? 'scale-x-100' : 'scale-x-0',
        )}
        style={{ backgroundColor: error ? ERROR : '#E8A617' }}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1.5 text-[12px] font-medium"
            style={{ color: ERROR }}
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------- Underline-style inputs (design.md §6.5) ---------- */

type CommonProps = {
  name: keyof FormValues
  label: string
  required?: boolean
  value: string
  error?: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  onBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

function TextField({ label, required, value, error, name, onChange, onBlur, type = 'text', autoComplete }: CommonProps & { type?: string; autoComplete?: string }) {
  const [focused, setFocused] = useState(false)
  return (
    <FieldShell label={label} required={required} floated={focused || value.length > 0} focused={focused} error={error}>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          onBlur(e)
        }}
        aria-invalid={!!error}
        className="w-full border-b bg-transparent py-2.5 text-base text-ink outline-none transition-colors duration-300"
        style={{ borderColor: error ? ERROR : '#DED8CC' }}
      />
    </FieldShell>
  )
}

function SelectField({ label, required, value, error, name, onChange, onBlur, options, placeholder }: CommonProps & { options: string[]; placeholder: string }) {
  const [focused, setFocused] = useState(false)
  return (
    <FieldShell label={label} required={required} floated={focused || value.length > 0} focused={focused} error={error}>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false)
            onBlur(e)
          }}
          aria-invalid={!!error}
          className={cn(
            'w-full appearance-none border-b bg-transparent py-2.5 pr-8 text-base outline-none transition-colors duration-300',
            value ? 'text-ink' : 'text-transparent',
          )}
          style={{ borderColor: error ? ERROR : '#DED8CC' }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
          aria-hidden="true"
        />
      </div>
    </FieldShell>
  )
}

/* ---------- Success panel ---------- */

function SuccessPanel({ name }: { name: string }) {
  const firstName = name.trim().split(/\s+/)[0] || 'there'
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex min-h-[480px] flex-col items-center justify-center py-10 text-center"
    >
      {/* Amber check circle — stroke draws in (0.6s) */}
      <motion.svg
        viewBox="0 0 72 72"
        className="h-20 w-20"
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      >
        <motion.circle
          cx="36"
          cy="36"
          r="32"
          fill="none"
          stroke="#E8A617"
          strokeWidth="3"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ rotate: -90, originX: 0.5, originY: 0.5 }}
        />
        <motion.path
          d="M22 37.5 L32 47 L50 27"
          fill="none"
          stroke="#E8A617"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
          transition={{ duration: 0.45, delay: 0.55, ease: 'easeOut' }}
        />
      </motion.svg>

      <motion.h3
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
        className="mt-8 font-display text-[26px] font-bold uppercase leading-[1.15] text-ink"
      >
        Quote Request Received
      </motion.h3>
      <motion.p
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.92, ease: EASE }}
        className="mt-4 max-w-md text-base leading-[1.7] text-ink-soft"
      >
        Thanks {firstName} — we&rsquo;ll be in touch within one business day. Need us sooner? Call{' '}
        <a href="tel:1300000000" className="font-semibold text-amber-deep hover:underline">
          1300 000 000
        </a>
        .
      </motion.p>
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.04, ease: EASE }}
        className="mt-8"
      >
        <Link to="/" className="btn-outline-light">
          Back to Home
        </Link>
      </motion.div>
    </motion.div>
  )
}

/* ---------- Quote form card ---------- */

export default function QuoteForm() {
  const [values, setValues] = useState<FormValues>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    const next = { ...values, [name]: value }
    setValues(next)
    // Re-validate a field once it has an error, so messages clear as the user fixes them
    if (errors[name as keyof FormValues]) {
      const nextErrors = validate(next)
      setErrors((prev) => ({ ...prev, [name]: nextErrors[name as keyof FormValues] }))
    }
  }

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name as keyof FormValues
    setTouched((prev) => ({ ...prev, [name]: true }))
    if (name === 'name' || name === 'phone' || name === 'email') {
      const nextErrors = validate(values)
      setErrors((prev) => ({ ...prev, [name]: nextErrors[name] }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched({ name: true, phone: true, email: true })
    if (Object.keys(nextErrors).length > 0) return
    setStatus('submitting')
    // Frontend-only: simulate submission, then show the success panel
    window.setTimeout(() => setStatus('success'), 1400)
  }

  const fieldProps = { onChange: handleChange, onBlur: handleBlur }

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
      className="relative border border-line-light bg-paper p-6 shadow-elevated md:p-10"
    >
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <SuccessPanel key="success" name={values.name} />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-display text-[22px] font-bold uppercase leading-[1.15] text-ink md:text-[26px]">
              Request a Quote
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Tell us about the job — we&rsquo;ll come back within one business day.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField name="name" label="Name" required autoComplete="name" value={values.name} error={touched.name ? errors.name : undefined} {...fieldProps} />
                <TextField name="phone" label="Phone" required type="tel" autoComplete="tel" value={values.phone} error={touched.phone ? errors.phone : undefined} {...fieldProps} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField name="email" label="Email" required type="email" autoComplete="email" value={values.email} error={touched.email ? errors.email : undefined} {...fieldProps} />
                <TextField name="suburb" label="Suburb" value={values.suburb} error={errors.suburb} {...fieldProps} />
              </div>
              <SelectField
                name="service"
                label="Service needed"
                value={values.service}
                error={errors.service}
                options={SERVICES}
                placeholder="Select a service"
                {...fieldProps}
              />

              {/* Project type — radio toggle chips */}
              <fieldset>
                <legend className="text-[13px] font-medium tracking-[0.04em] text-ink-soft">
                  Project type
                </legend>
                <div className="mt-3 flex gap-3" role="radiogroup" aria-label="Project type">
                  {PROJECT_TYPES.map((type) => {
                    const active = values.projectType === type
                    return (
                      <button
                        key={type}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setValues((v) => ({ ...v, projectType: type }))}
                        className={cn(
                          'relative overflow-hidden border px-6 py-2.5 font-display text-[13px] font-bold uppercase tracking-[0.12em] transition-colors duration-300',
                          active
                            ? 'border-amber text-charcoal'
                            : 'border-line-light text-ink-soft hover:border-ink hover:text-ink',
                        )}
                      >
                        {/* Amber fill animates in on select (0.25s) */}
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-0 origin-left bg-amber"
                          initial={false}
                          animate={{ scaleX: active ? 1 : 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                        />
                        <span className="relative z-10">{type}</span>
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              {/* Message textarea */}
              <TextAreaField
                name="message"
                label="Tell us about the job"
                value={values.message}
                error={errors.message}
                {...fieldProps}
              />

              <SelectField
                name="hearAbout"
                label="How did you hear about us?"
                value={values.hearAbout}
                error={errors.hearAbout}
                options={HEAR_ABOUT}
                placeholder="Optional"
                {...fieldProps}
              />

              <div className="mt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Quote Request
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-xs leading-relaxed text-ink-soft">
                  By submitting you agree to be contacted about your quote. We never share your
                  details.
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ---------- Textarea with floating label ---------- */

function TextAreaField({ label, required, value, error, name, onChange, onBlur }: CommonProps) {
  const [focused, setFocused] = useState(false)
  const floated = focused || value.length > 0
  return (
    <FieldShell label={label} required={required} floated={floated} focused={focused} error={error}>
      <textarea
        id={name}
        name={name}
        rows={4}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          onBlur(e)
        }}
        placeholder={floated ? 'e.g. Water-damaged ceiling in the lounge room, roughly 3×4m…' : undefined}
        aria-invalid={!!error}
        className="w-full resize-none border-b bg-transparent py-2.5 text-base text-ink outline-none transition-colors duration-300 placeholder:text-ink-soft/60"
        style={{ borderColor: error ? ERROR : '#DED8CC' }}
      />
    </FieldShell>
  )
}
