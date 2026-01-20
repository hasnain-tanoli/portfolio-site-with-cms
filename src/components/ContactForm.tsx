'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import { submitContact } from '../app/(frontend)/actions'

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    try {
      const result = await submitContact(formData)

      if (result?.success) {
        toast.success('Message sent successfully!')
        ;(event.target as HTMLFormElement).reset()
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch (error) {
      toast.error('Failed to send message.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full rounded-2xl border-0 bg-stone-100 dark:bg-stone-900 px-6 py-5 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 transition-all"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full rounded-2xl border-0 bg-stone-100 dark:bg-stone-900 px-6 py-5 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 transition-all"
        />
      </div>
      <textarea
        name="message"
        rows={5}
        placeholder="Tell me about your project..."
        required
        className="w-full rounded-2xl border-0 bg-stone-100 dark:bg-stone-900 px-6 py-5 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 transition-all"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto rounded-full bg-stone-900 dark:bg-stone-100 px-12 py-5 text-lg font-bold text-white dark:text-stone-900 transition-all hover:bg-stone-800 dark:hover:bg-stone-200 hover:scale-[1.02] active:scale-95 shadow-xl shadow-stone-200 dark:shadow-stone-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
