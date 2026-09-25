# rolldown: a JSON module inside a cycle is evaluated before the `init_*` wrapper it needs is assigned

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
    init_app();
    ^
TypeError: init_app is not a function
```

Five files, bundled with `codeSplitting: false`, nothing else set. `app.mjs` imports `h1.mjs`, which imports `app.mjs` back (a cycle), and `app.mjs` loads `lazy.mjs` with a dynamic `import()`. Both `app.mjs` and `lazy.mjs` import `info.json`. No top-level await anywhere.

Every module in the cycle gets a lazy `__esmMin` initializer, and the entry calls `init_app()` last, which would order everything correctly. The JSON module is the exception: it is written out as plain top-level code, and in front of it the bundle runs an immediately-invoked block that evaluates `h1.mjs`. That block calls `init_app()`, which is a `var` assigned further down, so it is still `undefined`.

Either of these makes the same graph work: `codeSplitting: true`, or replacing `info.json` with a JS module exporting the same value.
