# Form Builder Plugin Migration TODO

## Progress Tracker

### Automated Steps (Completed ✅)

- [x] 1. Install @payloadcms/plugin-form-builder package
- [x] 2. Update payload.config.ts (add plugin, remove ContactSubmissions)
- [x] 3. Delete src/collections/ContactSubmissions.ts
- [x] 4. Update src/app/(frontend)/actions.ts (use plugin submission endpoint)
- [x] 5. Generate TypeScript types
- [x] 6. Run database migration

### Manual Steps (User Action Required)

- [ ] 7. Create contact form in Payload Admin UI
  - See FORM_BUILDER_SETUP.md for detailed instructions
- [ ] 8. Add NEXT_PUBLIC_CONTACT_FORM_ID to .env
  - Add: NEXT_PUBLIC_CONTACT_FORM_ID=YOUR_FORM_ID
- [ ] 9. Test form submission
  - Verify submissions appear in Form Submissions collection

## Notes

- All automated steps have been completed successfully
- Refer to FORM_BUILDER_SETUP.md for detailed instructions on manual steps
- The Form Builder plugin is now installed and configured
- Database schema has been updated with forms and form-submissions collections
