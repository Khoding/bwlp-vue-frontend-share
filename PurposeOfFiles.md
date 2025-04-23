# So, we want a thing going over the purpose of important files now, do we?

## The "WE NEED THEM" files

- `@/main.ts` -> the ultimate main file, it's basically the file that gets executed and does everything.
- `index.html` -> like in React, this file contains the `#app` that has everything mounted on it.
- `@/App.vue` -> this contains the entire app, everything gets built inside of it
  - It contains the Navigation, the header, the `main` tag with the main `RouterView` and the Transition animation you see when changing page
  - It also contains the Minigame (very important)
  - It loads the theme into the app on page mounted
  - Very few stuff should be hosted in this file now that the app is already kind of mature

## The Views

You can find the views being defined in `@/router/index.ts`, this comes from an official Vue package that handles the Routes, it gives us a few utils, and two very important components, `RouterView` and `RouterLink`, an "inside-app" `a` tag (in the app, RouterLinks are used to go from page to page while `a` tags go to external websites). From what I know, it works mainly the same as React Router, only the syntax is different.

The views are all neatly organised in `@/views` in subfolders for their category (edit pages, create pages, whatever-the-fuck pages).

The most important ones are in `@/views/lists`, the "home page" is `@/views/lists/ImageListView.vue`

## Components

The most important pieces of the Vue app.

- Found in `@/components` under neatly organised little folders like for the views, except there are more.
  - You'll find what you're looking for in `navigation`, `edit-create` and in `dialog`.
  - I would suggest spending a while learning about how the `dialog` works as it's one of the most complicated part of the app, and it's only gonna get worse with the introduction of content edition in them as discussed at the end of the README file.

## Composables / utils

There are very few of those, found in their respective subfolders of `@` as `composables` and `utils`.

## Internationalisation - i18n

- Found under `@/i18n`, this is responsible for the translation of the webapp. This will be a major piece of Rebar up the ahh to implement, best of luck, Young Padawan.
  - It uses `vue-i18n`, the most popular package for this task.

## Stores

This part holds all the Pinia stuff, for in-browser-saved data.

- Found under `@/stores`.

## Assets

Assets are where you store scripts, CSS, fonts, images, etc. that don't belong anywhere else, usually static content. (In fact, assets is called static in some web frameworks, as they static are 99% of the time).  
I made respective subfolders for all of the categories to keep the main folder easy to navigate.

## Public

The files in the `./public/` folder all get copied in the `./dist` folder at build time, not a lot of file belong there, only ones that need to be accessible from the app in any way but aren't referenced anywhere in the rest of the app. Because let's say you have an image in your assets folder and you don't use it anywhere in the app, it won't be in the build bundle, which means not in the final app, even if you know the exact hypothetical path that it would have.

## code-workspace

So, I use VS Code like a fucking pro :Kappa:, in `./bwlp-vue-frontend.code-workspace`, you find the settings of this specific repository, for some reason it doesn't work on my computer right now but it doesn't matter.

You can read about code-workspaces [on the official VS Code documentation](https://code.visualstudio.com/docs/editing/workspaces/workspaces).

I often make use of [Multi-root workspaces](https://code.visualstudio.com/docs/editing/workspaces/workspaces#_multiroot-workspaces), like I had the original repo from the old frontend referenced there and I could browse the code easily.
