# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```




# Teach Stack

  1. **Type Checking -- TypeScript**: TypeScript is a statically typed language, which means it checks the types of variables
  2. **Validation -- Zod**: Zod is a library for validating data, it can be used to validate the data in your application
  3. **Library -- React** : React is a JavaScript library for building user interfaces
  4. **Library -- React DOM**: React DOM is a library for rendering React components to the DOM
  5. **Form -- React-Hook-Form** : React Hook Form is a library for managing forms in React applications
  6. **Component Library -- Shadcn/ui** : Shadcn/ui is a component library for building user interfaces
  7. **CLI Tools -- Vite** : Vite is a fast and lightweight development server for building web applications
  8. **Writing CSS -- Tailwind** : Tailwind is a utility-first CSS framework for building user interfaces
  9. **API Calls -- Axios** : Axios is a library for making HTTP requests in JavaScript
  10. **Icon -- lucide-react** : Lucide is a library for using icons in React applications