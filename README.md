# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

  This work is based on "Gift box" (https://sketchfab.com/3d-models/gift-box-9aadeeb6635440af88606903a06950d8) by Multipainkiller Studio (https://sketchfab.com/Multipainkiller_Studio) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)

  This work is based on "Gift" (https://sketchfab.com/3d-models/gift-729c11632ae14db6975e4d58e8749b54) by Mug (https://sketchfab.com/1Mug) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)

  This work is based on "A Gift Box" (https://sketchfab.com/3d-models/a-gift-box-1a53662e300b4d7e9ae39eba101409ea) by Rofnay (https://sketchfab.com/Rofnay) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
