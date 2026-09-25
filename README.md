# rolldown: JSON module in a cycle is evaluated too early

```
npm install
npm run repro
```

Expected (what the unbundled files print):

```
app-h1 -json app-json
```

Actual:

```
out/bundle.mjs:26
    await init_entry();
          ^
TypeError: init_entry is not a function
```

Four files. `entry.mjs` imports `h1.mjs`, which imports `entry.mjs` back (a cycle), and `entry.mjs` also loads `lazy.mjs` with a dynamic `import()`. Both `entry.mjs` and `lazy.mjs` import `info.json`. Bundled with `codeSplitting: false`.

Every module gets a lazy `__esmMin` initializer, except the JSON module, which is written out as plain top-level code. In front of it the bundle runs an immediately-invoked block that evaluates `h1.mjs`, and that block calls `init_entry()`, which is a `var` assigned further down. So it is still `undefined` at that point.

Either of these makes it work: `codeSplitting: true`, or replacing `info.json` with a JS module exporting the same value.
