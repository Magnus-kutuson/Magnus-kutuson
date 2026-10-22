# Magnus Abeiku Kutuson — Portfolio

Personal portfolio for Magnus Abeiku Kutuson, frontend developer (Angular, React, TypeScript) and videographer based in Accra, Ghana.

Built with Angular 22 and Tailwind CSS 4.

## Editing content

All portfolio content lives as data in [`src/app/app.ts`](src/app/app.ts):

| What | Property |
| --- | --- |
| Services offered | `services` |
| Projects (strongest first — the first one is featured full-width) | `workItems` |
| Video reels (hidden until `href` is a real link) | `reelItems` |
| Skills | `codeSkills`, `filmSkills` |
| Dev roles / earlier roles | `experiences`, `earlierRoles` |
| Education | `education` |
| Contact links (hidden while `href` is `'#'`) | `contactLinks` |

Page title and social-share metadata are in [`src/index.html`](src/index.html). Images live in `public/assets/images/`.

## Development

```bash
npm install
npm start        # http://localhost:4200
npm run build    # production build in dist/
npm test         # unit tests (Vitest)
```
