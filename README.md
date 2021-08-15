# Welcome to my first [Astro](https://astro.build) project written in JavaScript and Vue 3.

## What is this project about?

It's a simple multilingual website for a CELTA-qualified English Teacher & Translator/Proofreader!


## Project Structure


├── src/
│   ├── components/
│   ├── layouts/
│   ├── data/
│   └── pages/
│       └── EN index.astro
│           ├── de/
│           └── fr/
│               └── FR index.astro
├── public/
└── package.json

Components are multilingual and display the right language according to the language called in the page's `<slot>`  
Example `src/pages/de/kontakt.astro` calles `<Contact slot="Main" lang="de"/>` and `src/pages/contact.astro` calls `<Contact slot="Main" lang="en"/>`

The SideBar and the language selector (NavBar.astro) both import `src/data/router.json` for all link information. In order for the language selector to route to the corresponding page in other languages we pass in the current location to the slot of page.  Example: `src/pages/de/kontakt.astro` calles `<NavBar slot="NavBar" lang="de" location="contact"/>` the contact.astro component used the `location=contact` information to match the right routes in the other languages.