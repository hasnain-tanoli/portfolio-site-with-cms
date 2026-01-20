import * as migration_20260119_063946 from './20260119_063946'
import * as migration_20260120_000000_cleanup_contact_submissions from './20260120_000000_cleanup_contact_submissions'

export const migrations = [
  {
    up: migration_20260119_063946.up,
    down: migration_20260119_063946.down,
    name: '20260119_063946',
  },
  {
    up: migration_20260120_000000_cleanup_contact_submissions.up,
    down: migration_20260120_000000_cleanup_contact_submissions.down,
    name: '20260120_000000_cleanup_contact_submissions',
  },
]
