# Database Seeders

This directory contains database seeder scripts for initializing your Payload CMS database with default data.

## Available Seeders

### Admin Seeder

Creates a super admin user for accessing the Payload CMS admin panel.

**Usage:**

```bash
npm run seed:admin
```

### Data Seeder

Populates the portfolio with sample data for About, Skills, and Projects.

**Usage:**

```bash
npm run seed:data
```

**Required Environment Variables:**

Before running the seeder, ensure your `.env` file contains:

```env
PAYLOAD_SECRET=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/database
```

**Optional Environment Variables:**

```env
ADMIN_EMAIL=admin@portfolio.com          # Default: admin@portfolio.com
ADMIN_PASSWORD=StrongPassword.12345      # Default: StrongPassword.12345
```

**Example `.env` file:**

```env
# Payload Configuration
PAYLOAD_SECRET=your-super-secret-key-min-32-chars

# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/portfolio

# Admin User (Optional)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=YourSecurePassword123!
```

## Notes

- The seeder will check if an admin user already exists before creating a new one
- Make sure your database is running and accessible before running seeders
- The admin user will have the 'admin' role by default
- Keep your `.env` file secure and never commit it to version control

## Troubleshooting

### "missing secret key" Error

Make sure `PAYLOAD_SECRET` is set in your `.env` file. It should be at least 32 characters long.

### "DATABASE_URL" Error

Ensure your `DATABASE_URL` is properly formatted and the database is accessible:

```
postgresql://username:password@host:port/database
```

### Import Errors

If you see module resolution errors, make sure you're using the npm script:

```bash
npm run seed:admin
```

Do not run the TypeScript file directly with `ts-node` or `node`.
