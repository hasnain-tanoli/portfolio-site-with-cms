'use server'

import { redirect } from 'next/navigation'

export async function submitContact(formData: FormData) {
  const email = formData.get('email')
  const message = formData.get('message')

  // Validate fields
  if (!email || !message) {
    // In a real app, you'd verify these properly and return errors
    console.error('Missing fields')
    return
  }

  // Process submission (e.g., save to DB, send email via Resend/SendGrid)
  console.log('Contact Form Submitted:', { email, message })

  // Redirect or show success (For now, just redirect back to home with a query param)
  redirect('/?success=true')
}
