import { copyFile } from 'node:fs/promises'

// GitHub Pages serves 404.html for client-side routes. Reusing the built
// index lets React Router read the original URL and render the correct page.
await copyFile('dist/index.html', 'dist/404.html')
console.log('Created dist/404.html for GitHub Pages SPA routing.')
