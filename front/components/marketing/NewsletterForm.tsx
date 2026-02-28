'use client'

import Button from '@/components/ui/Button'

export default function NewsletterForm() {
  return (
    <form
      onSubmit={e => e.preventDefault()}
      className="flex flex-col sm:flex-row gap-3 mb-4"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Votre adresse email
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="votre@email.com"
        className="
          flex-1 px-4 py-3 rounded-btn
          bg-glass-06 border border-stroke-12 text-paper-50
          placeholder:text-paper-50/30
          focus:outline-none focus:border-[rgba(214,181,109,0.6)]
          text-ui
        "
      />
      <Button variant="primary" type="submit">
        Rejoindre
      </Button>
    </form>
  )
}
