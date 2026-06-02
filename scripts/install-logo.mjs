import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dest = path.join(__dirname, '..', 'public', 'logo.png')

const sources = [
  path.join(
    process.env.USERPROFILE || '',
    '.cursor',
    'projects',
    'd-royal-academy',
    'assets',
    'c__Users_DELL_AppData_Roaming_Cursor_User_workspaceStorage_0689d7dc95626fe1e328522ef530116a_images_1733201645120-d6715a66-eb82-4025-ae26-8baa4c2b0a82.png'
  ),
  path.join(__dirname, '..', '..', 'assets', 'royal-logo.png'),
  path.join(__dirname, '..', 'public', 'royal-logo.png'),
]

const found = sources.find((s) => s && fs.existsSync(s))
if (!found) {
  console.error('Logo source not found. Copy your logo image to:')
  console.error(' ', dest)
  console.error('Or place it at: client/public/royal-logo.png and run again.')
  process.exit(1)
}

fs.copyFileSync(found, dest)
console.log('Installed logo:', dest, `(${fs.statSync(dest).size} bytes)`)
