## Project: BW-Lehrpool VueJS Frontend

This document outlines the details, development guidelines, and setup for the VueJS-based frontend for BW-Lehrpool.

**Quick Links:**

- **Active Repository:** [Khoding/bwlp-vue-frontend](https://github.com/Khoding/bwlp-vue-frontend)
- **Archived Repository (for reference):** [Khoding/bwlp-frontend](https://github.com/Khoding/bwlp-frontend)

### Technology Stack

- **Core Framework:** [Vue.js](https://vuejs.org) (v3.5)
- **Build Tool:** [Vite](https://vite.dev)
- **CSS Framework:** [Beer CSS](https://www.beercss.com)
  - A CSS library based on [Material Design 3 (M3)](https://m3.material.io)
  - Facilitates rapid Material Design implementation.
  - Supports [Material You](https://m3.material.io/blog/announcing-material-you) theming (dynamic color theming, e.g., based on images)
  - Read [Helpers documentation on GitHub](https://github.com/beercss/beercss/blob/main/docs/HELPERS.md).
- **Icons:** [Material Symbols via Google Fonts](https://fonts.google.com/icons)

---

## Development Environment Setup

### Recommended IDE

- [Visual Studio Code (VSCode)](https://code.visualstudio.com/)
- **Essential Extensions:**
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (Ensure the older Vetur extension is disabled if installed).
  - [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite).

### Project Installation

```sh
npm install
```

- Copy and paste the `.env.*.example` files and remove the `.example copy` from the name.

### Running the Project

- **Development (with Hot-Reload):**
  ```sh
  npm run dev
  ```
- **Production Build (Compile and Minify):**
  ```sh
  npm run build
  ```

## Console commands

### Vite

- `npm run dev` runs `vite`, main command (takes information from `.env.development`)
- `npm run build` runs `vite build`, self explanatory
- `npm run preview` runs `vite preview`, to view the website as it is in production (takes information from `.env.production`)
- `npx vite --port=4000` (the same as `run dev`)

### VS Code Snippets for Vue

Add these snippets to your VS Code user snippets for the `vue` language to speed up development:

```json
{
  "Vue Component": {
    "prefix": "vue-component",
    "body": [
      "<template>",
      "  $1",
      "</template>",
      "",
      "<script setup>",
      "  $2",
      "</script>",
      "",
      "<style scoped>",
      "  $3",
      "</style>"
    ],
    "description": "Create a Vue component"
  },
  "Vue Component TypeScript": {
    "prefix": "vue-component-ts",
    "body": [
      "<template>",
      "  $1",
      "</template>",
      "",
      "<script setup lang=\"ts\">",
      "  $2",
      "</script>",
      "",
      "<style scoped>",
      "  $3",
      "</style>"
    ],
    "description": "Create a Vue component with TypeScript"
  },
  "Vue Method": {
    "prefix": "vue-method",
    "body": ["${1:methodName}() {", "  ${2:// method body}", "}"],
    "description": "Create a Vue method"
  },
  "Vue Computed Property": {
    "prefix": "vue-computed",
    "body": ["computed: {", "  ${1:computedProperty}() {", "    return ${2:value};", "  }", "}"],
    "description": "Create a Vue computed property"
  },
  "Vue Watcher": {
    "prefix": "vue-watch",
    "body": [
      "watch: {",
      "  ${1:propertyToWatch}(newValue, oldValue) {",
      "    ${2:// watcher body}",
      "  }",
      "}"
    ],
    "description": "Create a Vue watcher"
  },
  "Vue Script Setup": {
    "prefix": "setup",
    "body": ["<script setup>", "  $0", "</script>"],
    "description": "Create a vue script setup block"
  },
  "Vue Script Setup TypeScript": {
    "prefix": "setup",
    "body": ["<script setup lang=\"ts\">", "  $0", "</script>"],
    "description": "Create a vue script setup block with TypeScript"
  },
  "Vue Scoped": {
    "prefix": "scoped",
    "body": ["<style scoped>", "  $0", "</style>"],
    "description": "Create a scoped style block"
  }
}
```

### Configuration

For advanced configuration options, refer to the [Vite Configuration Reference](https://vite.dev/config/).

---

## Development Guidelines

A strong emphasis is placed on code cleanliness and maintainability.

### 1\. Vue Single File Components (SFCs - `.vue` files)

Reference: [Vue SFC Specification](https://vuejs.org/api/sfc-spec.html)

**Philosophy:** Components should be extracted frequently.

- **Main Reason:** A component represents a distinct piece of the UI, regardless of its size or reuse frequency. Extracting makes the structure logical and mirrors the UI breakdown. This promotes code sharing via composables or utils. While it can mean navigating more files, modern IDEs facilitate this.
  - _Example:_ The `DetailDialog` component was initially part of a page, then extracted. Its internal tabs were later extracted into their own components, resulting in a clear structure (`@/components/dialog/`) where related files reside.
- **Technical Reason:** Improves readability of parent components/views. Well-named components (`SortableTable`) make the template understandable without needing to dive into their implementation immediately.

**SFC Block Order:** Use `template` -\> `script` -\> `style`.

1.  **`<template></template>`:** Defines the component's structure. Comes first as it's often the primary block needed to understand the component's purpose.
2.  **`<script setup lang="ts"></script>`:** (Optional) Contains the component's logic.
    - **Must use:** [Composition API](https://vuejs.org/api/composition-api-setup.html) via [`<script setup>`](<https://www.google.com/search?q=%5Bhttps://vuejs.org/api/sfc-script-setup.html%5D(https://vuejs.org/api/sfc-script-setup.html)>). It's the modern standard, enables tools like [VueUse](https://vueuse.org), and removes limitations of the Options API.
    - Attribute Order: `setup` first (defines API), then `lang="ts"` (defines language).
    - Omit the `<script>` block if the component has no logic (common for simple presentational components).
3.  **`<style scoped></style>`:** (Optional) Contains component-specific styles.
    - Comes last as it has the least impact on understanding the component's core function.
    - **Scoped by Default:** Use `scoped` in 99.9% of cases to prevent styles from leaking.
    - **Global Styles:** Place genuinely global styles in the main CSS file (`@/assets/main.css` or similar).
    - **Targeting Child/Slot Content:** Learn and use `:deep()` and `:slotted()` selectors ([SFC CSS Features](https://vuejs.org/api/sfc-css-features.html)).
    - **Escaping Scope:** If `scoped`, `:deep`, and `:slotted` fail for a specific rule that clearly belongs to the component, use `:global(.specific-class-name)` for _that rule only_. Do _not_ make the entire `<style>` block global.
    - **Use Classes:** Scoped styles don't eliminate the need for classes. Classes improve performance and readability ([Scoped Style Tips](https://vuejs.org/api/sfc-css-features.html#scoped-style-tips)).
    - Omit the `<style>` block if the component has no custom styles.

**Rationale for `template`-`script`-`style` order:**

- Aligns with official Vue documentation examples.
- Semantic flow: Structure (`template`) -\> Logic (`script`) -\> Appearance (`style`).
- Developer preference: Often, reading the `template` first is sufficient to grasp the component's role. Scrolling down to the `script` (which can sometimes be long) is only necessary for deeper understanding.

### 2\. Templates (`<template>`)

- **Props & Events Naming:**
  - Define in `script` using `camelCase`.
  - Use in `template` using `kebab-case`.
  - Example: Define `defineProps({ myProp: String })`, use `<MyComponent :my-prop="value" />`.
- **Component Imports:**
  - Always use the alias path `@/` (e.g., `import MyComponent from '@/components/MyComponent.vue'`).
    - `@/` is an alias for `./src`.
  - Avoid relative paths (`../` or `./`) for better clarity on file location.

### 3\. JavaScript / TypeScript (`<script setup>`)

- **Code Extraction:**
  - If logic within an SFC becomes too complex, extract it.
  - **Vue-related Logic (uses refs, computed, lifecycle hooks, etc.):** Extract to a composable function (e.g., `@/composables/useMyLogic.ts`).
    ```javascript
    // Example: @/composables/useCounter.js
    import {ref} from 'vue';
    export function useCounter() {
      const count = ref(0);
      function increment() {
        count.value++;
      }
      return {count, increment};
    }
    ```
  - **Generic JavaScript/TypeScript Logic (no Vue dependencies):** Extract to a utility file (e.g., `@/utils/helpers.ts`).
    ```javascript
    // Example: @/utils/formatDate.js
    export function formatDate(date) {
      return new Date(date).toLocaleDateString(); // Example implementation
    }
    ```
- **NPM Packages:**
  - **Minimize Dependencies:** Avoid adding small NPM packages for simple tasks. Writing a few lines of custom utility code is preferred over introducing dependencies that might complicate updates or cause conflicts later. Aim for a lean `package.json`.
  - **Acceptable Dependencies:**
    - Large, essential functionalities (e.g., internationalization - `vue-i18n` is a likely candidate).
    - Well-established, high-quality packages from the Vue ecosystem.
    - **Potential Exception:** [VueUse](https://vueuse.org) offers many useful composables and is widely adopted; using it can be acceptable if it significantly simplifies implementation.
  - **Keep Dependencies Updated**: Regularly update all project dependencies.
    - Frequency: Aim to check for and apply updates frequently (e.g., weekly). This usually takes minimal time.
    - Benefits: Ensures the initial release is modern and secure. Reduces long-term maintenance burden; it's far easier to manage incremental updates (minor and major versions) over time than to face massive, potentially breaking changes after years of neglect. Continue this practice throughout the project's lifecycle.

### 4\. CSS (`<style>`)

- **Selectors:**
  - **Primarily use Classes:** Apply classes to elements for styling.
  - **Avoid IDs:** IDs can cause conflicts, especially in reusable components. If an ID is technically needed (e.g., for `aria-labelledby` or form `label`'s `for` attribute), generate it dynamically to ensure uniqueness (e.g., `id="name-of-component-${uniqueId}"`).
  - **Rarely use Tag Selectors:** Acceptable for base elements like `html`, `body`, `main`. Avoid for potentially reused tags like `header`, `footer` - use classes instead.
- **`!important`:** **Do not use it.** Find alternative solutions using specificity or restructuring CSS/HTML.
- **CSS Reset/Normalization:** Handled by Beer CSS. The project adds an explicit `box-sizing: border-box` rule for `*`, `*::before`, `*::after` for robustness, as Beer CSS might only apply it to `*`.
  ```css
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  ```
- **`@import`:** Acceptable within Vue SFCs or main CSS files (like `@/assets/main.css`). Vite/Vue compiles the CSS, mitigating the performance issues `@import` causes in traditional CSS (sequential loading, blocking parallel downloads). Useful for organizing large CSS blocks (e.g., font declarations).
  - _Future Consideration:_ Explore [Lightning CSS](https://lightningcss.dev) via Vite integration ([Example Article](https://vuejstips.com/lightningcss-vite)) for CSS optimization and transpilation.
- **Logical Properties (LTR/RTL Support):**
  - **Always use logical properties:** `margin-inline-start` instead of `margin-left`, `padding-block-end` instead of `padding-bottom`, `border-inline-start` instead of `border-left`, etc.
  - This ensures layout adapts correctly if Right-to-Left (RTL) language support is added later.
  - Beer CSS already uses logical properties for its components. Apply this rule to all custom CSS.
- **Accessibility (Units):**
  - Consider accessibility when choosing CSS units for custom styles. Read [Josh Comeau's article on Pixels and Accessibility](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility).
  - Beer CSS primarily uses `rem`, which might affect achieving perfect text resizing according to WCAG guidelines (like the [200% rule](https://www.w3.org/TR/WCAG21/#resize-text)). While sufficient for now, be mindful of this limitation.
- **Modern CSS Features:**
  - Feel free to use modern CSS features supported by the latest versions of Evergreen Browsers (Chrome, Firefox, Safari, Edge - roughly features from 2022 onwards). `:has()` is considered required.
  - Compatibility with older browsers (IE, legacy Edge, old Opera) is not a priority.
  - _Future Idea:_ Use `@supports` queries to detect unsupported features in a user's browser and potentially display a message suggesting an update.
- **CSS Layers (`@layer`):** Acknowledged as a powerful feature for managing specificity, but **currently not used** in this project to avoid adding complexity for developers unfamiliar with them.
- **Container Queries:**
  - Beer CSS provides basic responsive classes (`.s`, `.m`, `.l`), which might be insufficient for complex components.
  - **Use Container Queries** for fine-grained, element-based responsiveness instead of relying solely on viewport-based Media Queries.
  - **Learning Resources:**
    - [Introduction](https://www.joshwcomeau.com/css/container-queries-introduction/)
    - [Comprehensive Guide](https://ishadeed.com/article/css-container-query-guide/)
    - [Advanced Use Cases](https://www.joshwcomeau.com/css/container-queries-unleashed/)

---

## User Feedback & Design Considerations

Recent user feedback highlighted a desire to **edit data directly within the detail dialog**, rather than navigating to a separate edit page. While the lead developer dislikes editing in dialogs due to potential data loss, user needs are paramount.

**Proposed Solutions for Inline Editing:**

1.  **Full-Page Modal:** The fields are disabled until Edit mode is entered:
    - When the "Edit" button is clicked, the dialog transforms into a full-page view that cannot be accidentally closed (e.g., by clicking outside).
    - Closing requires explicit action ("Save Changes" or "Cancel" buttons at the bottom of the Dialog).
    - A confirmation prompt should appear if changes were made before cancelling/closing.
2.  **Locked Dialog:** The dialog remains a dialog but becomes locked (impossible to close without confirmation) in edit mode:
    - Edit mode is activated from interacting with a field.
    - Cannot be closed by clicking the overlay/backdrop.
    - The standard close button (e.g., 'X') is hidden or disabled.
    - Users must explicitly click "Save Changes" or "Cancel Edit" buttons to exit the edit mode.
3.  **Enhanced Current Dialog + Redirect:** Keep the current dialog structure but:
    - Enable form fields within the dialog when "Edit" is toggled (they are currently disabled in view mode).
    - When a user interacts with an enabled field (e.g., clicks/focuses), **immediately redirect them to the main Edit Page**.
    - **Crucially:** Scroll the Edit Page to the _corresponding field_ and provide a visual cue (e.g., brief highlight/flash) so the user knows exactly where to continue editing. This addresses the user complaints about "breaking the flow" and "having to find the data again."

A decision needs to be made on which approach best balances user convenience and data integrity. Leaning towards Full-Page Modal.

---
