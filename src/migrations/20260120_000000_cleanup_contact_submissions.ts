import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Drop the foreign key constraint if it exists
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'payload_locked_documents_rels_contact_submissions_fk'
        AND table_name = 'payload_locked_documents_rels'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk";
      END IF;
    END $$;
  `)

  // Drop the contact_submissions table if it exists
  await db.execute(sql`
    DROP TABLE IF EXISTS "contact_submissions" CASCADE;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // This migration cannot be rolled back as we're deleting data
  // The contact_submissions table will be recreated by the form builder plugin
}
