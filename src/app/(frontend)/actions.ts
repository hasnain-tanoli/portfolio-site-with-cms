'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function submitContact(formData: FormData) {
  const nameValue = formData.get('name')
  const emailValue = formData.get('email')
  const messageValue = formData.get('message')

  if (typeof emailValue !== 'string' || typeof messageValue !== 'string') {
    console.error('Invalid form data: email and message must be strings')
    return { success: false, error: 'Invalid form data' }
  }

  const email = emailValue.trim()
  const message = messageValue.trim()
  const name = typeof nameValue === 'string' ? nameValue.trim() : ''

  if (!email || !message) {
    console.error('Missing required fields')
    return { success: false, error: 'Email and message are required' }
  }

  try {
    const payload = await getPayload({ config: await config })
    const formId = process.env.NEXT_PUBLIC_CONTACT_FORM_ID

    if (!formId) {
      console.error('Contact form ID not configured')
      return { success: false, error: 'Form not configured' }
    }

    const formIdNumber = parseInt(formId, 10)

    if (isNaN(formIdNumber)) {
      console.error('Invalid contact form ID: must be a valid number')
      return { success: false, error: 'Invalid form configuration' }
    }

    await payload.create({
      collection: 'form-submissions',
      data: {
        form: formIdNumber,
        submissionData: [
          {
            field: 'name',
            value: name || 'Anonymous',
          },
          {
            field: 'email',
            value: email,
          },
          {
            field: 'message',
            value: message,
          },
        ],
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Error submitting form:', error)
    return { success: false, error: 'Failed to submit form' }
  }
}
