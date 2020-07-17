## 20/07/14

- fallback working but site is slow to load when deployed (on routes like /lates, /late/1)
- BROKE AUTH, but https://github.com/nonissue/co-cms/commit/501293dc616c2af82255155857007a4536990819 is working?
- FIXED, i dunno what the fuck was going on, looks like an issue with the vercel cli + env variables. it was adding an extra slash? ADDED using CLI and it worked?

  - LOCALHOST is still working as well!

- In prod, route for `/lates` is pretty fast, individual lates are slow, despite using `getStaticPaths` in `[id].js` and not in `/lates`
  - Maybe use context to set lates when they are all fetched rather than refetching each time?
  - Trying with fallback disabled
    - downside is generic 404 page shown rather than correct error page
