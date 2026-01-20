# Form Builder Plugin Setup Guide

This guide will help you complete the remaining steps to set up the contact form using the Payload Form Builder plugin.

## Completed Steps ✅

1. ✅ Installed @payloadcms/plugin-form-builder package
2. ✅ Updated payload.config.ts to include the plugin
3. ✅ Removed manual ContactSubmissions collection
4. ✅ Updated server action to use plugin's submission endpoint
5. ✅ Generated TypeScript types
6. ✅ Ran database migration

## Remaining Manual Steps

### Step 7: Create Contact Form in Payload Admin UI

1. **Start the development server:**

   ```bash
   pnpm run dev
   ```

2. **Access the Payload Admin:**
   - Open your browser and navigate to: `http://localhost:3000/admin`
   - Log in with your admin credentials

3. **Create a new form:**
   - In the left sidebar, click on "Forms"
   - Click the "+ Create New Form" button
   - Fill in the form details:
     - **Title:** "Contact Form" (or any name you prefer)
     - **Fields:** Add the following fields:
       - **Name Field:**
         - Type: Text
         - Name: `name`
         - Label: "Name"
         - Required: Yes
       - **Email Field:**
         - Type: Email
         - Name: `email`
         - Label: "Email"
         - Required: Yes
       - **Message Field:**
         - Type: Textarea
         - Name: `message`
         - Label: "Message"
         - Required: Yes
     - **Submit Button Label:** "Send Message" (or your preferred text)
     - **Confirmation Type:** Choose "message" or "redirect"
     - **Confirmation Message:** "Thank you for your message! We'll get back to you soon."

4. **Save the form:**
   - Click the "Save" button in the top right corner
   - After saving, note the **Form ID** displayed in the URL or in the form details
   - The Form ID will be a number (e.g., `1`, `2`, etc.)

### Step 8: Add NEXT_PUBLIC_CONTACT_FORM_ID to .env

1. **Open your `.env` file** (or create one if it doesn't exist)

2. **Add the following line** (replace `YOUR_FORM_ID` with the actual ID from step 7):

   ```env
   NEXT_PUBLIC_CONTACT_FORM_ID=YOUR_FORM_ID
   ```

   For example, if your form ID is `1`:

   ```env
   NEXT_PUBLIC_CONTACT_FORM_ID=1
   ```

3. **Save the .env file**

4. **Restart the development server** to load the new environment variable:

   ```bash
   # Stop the current server (Ctrl+C)
   pnpm run dev
   ```

### Step 9: Test Form Submission

1. **Navigate to your contact page** in the frontend (e.g., `http://localhost:3000/contact`)

2. **Fill out the form:**
   - Enter a name
   - Enter an email address
   - Enter a message

3. **Submit the form:**
   - Click the "Send Message" button
   - You should see a success toast message: "Message sent successfully!"

4. **Verify the submission in Payload Admin:**
   - Go to `http://localhost:3000/admin`
   - Click on "Form Submissions" in the left sidebar
   - You should see your submission listed there
   - Click on the submission to view the details

## Troubleshooting

### Form submissions not appearing

1. **Check the browser console** for any errors
2. **Check the server terminal** for any error messages
3. **Verify the Form ID** in your .env file matches the actual form ID in Payload Admin
4. **Check the server action** in `src/app/(frontend)/actions.ts` for any issues

### Form ID not configured error

If you see "Form not configured" error:

1. Make sure you've added `NEXT_PUBLIC_CONTACT_FORM_ID` to your .env file
2. Restart the development server after adding the environment variable
3. Verify the form ID is correct (it should be a number, not a string)

### TypeScript errors

If you see TypeScript errors:

1. Run `pnpm run generate:types` to regenerate the types
2. Restart your TypeScript server in VS Code (Cmd+Shift+P → "TypeScript: Restart TS Server")

## Benefits of Using Form Builder Plugin

✅ **Dynamic Form Management:** Editors can modify form fields without touching code
✅ **Built-in Validation:** The plugin handles form validation automatically
✅ **Email Notifications:** Optional email notifications when forms are submitted
✅ **Structured Data:** All submissions are stored in a consistent format
✅ **Multiple Forms:** You can create multiple forms for different purposes
✅ **No Custom Collections:** No need to manually create and maintain form collections

## Next Steps

After completing the setup:

1. **Customize the form fields** as needed for your specific use case
2. **Set up email notifications** (optional) in the form settings
3. **Add additional forms** for other purposes (newsletter signup, feedback, etc.)
4. **Customize the confirmation message** or redirect URL
5. **Test thoroughly** before deploying to production

## Additional Resources

- [Payload Form Builder Plugin Documentation](https://payloadcms.com/docs/plugins/form-builder)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Form Builder Plugin GitHub](https://github.com/payloadcms/plugin-form-builder)
          required
