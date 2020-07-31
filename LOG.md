## 20/07/14

- fallback working but site is slow to load when deployed (on routes like /lates, /late/1)
- BROKE AUTH, but https://github.com/nonissue/co-cms/commit/501293dc616c2af82255155857007a4536990819 is working?
- FIXED, i dunno what the fuck was going on, looks like an issue with the vercel cli + env variables. it was adding an extra slash? ADDED using CLI and it worked?
  - LOCALHOST is still working as well!

# 20/07/15

- In prod, route for `/lates` is pretty fast, individual lates are slow, despite using `getStaticPaths` in `[id].js` and not in `/lates`
  - Maybe use context to set lates when they are all fetched rather than refetching each time?
  - Trying with fallback disabled
    - downside is generic 404 page shown rather than correct error page
    - Disabling fallback: true makes it so only the late specified in staticPaths loads
    - Might be fixed if we just use context, we don't need to fetch them individually...
- Add `css-media-vars` to replace media queries. A bit verbose, but nice to have it inline.
  - Links:
    - https://jsbin.com/muqisetivo/edit?html,css,output
    - https://jsbin.com/racahosuti/edit?css,output
    - https://propjockey.github.io/css-media-vars/
  - Caveats:
    - Had to add `css-media-vars.css` to public folder, then import in `<Head>` to prevent minification from mangling the empty css vars
- Sometimes 'lates' nav item shifts to the left and then back? No idea what's going on. Can't reliably reproduce.
  - Could be related to the css that controls header loading in?

## 2020-07-31:

- Updating prisma to 2.3 seems to break `/api/lates/create` (specifically the connectOrCreate loop for tags)
  - Not sure why, might open a bug
  - Oops, wrong commit msg
