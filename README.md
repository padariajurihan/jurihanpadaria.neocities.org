# 🌸 Waifu List Portal

An interactive, responsive, and highly organized encyclopedia web application dedicated to cataloging characters (waifus) from various video games, anime, manga, and pop culture franchises. The project features an optimized real-time search system structured with a clean dark-themed interface.

## 🌐 Live Demo & Deployment

The production version of this project is hosted and publicly accessible at:
👉 **[JuriHanPadaria on Neocities](https://jurihanpadaria.neocities.org/)**

For local development and testing, the main catalog route maps to:
`http://localhost:5500/public/waifulist/waifus.html`

---

## 🚀 Key Features

* **Real-Time Dynamic Search:** Filter the entire directory instantly as you type without requiring page reloads or external framework overhead.
* **Case-Insensitive Matching:** The search system normalizes inputs, ensuring queries like `nier`, `NieR`, or `NIER` yield the exact same accurate results.
* **Dual-Query Filtering:** Users can search seamlessly by either the **Character Name** (e.g., *2B*, *Ada Wong*) or the **Origin/Title** (e.g., *Resident Evil*, *Zenless Zone Zero*).
* **Intelligent DOM Layout Management:** Section indexes (`<h3>` headings for alphanumeric categories) dynamically hide if no corresponding items match the current search query, preventing UI clutter.
* **Sticky Global Navigation:** A responsive top navigation bar (`Navbar`) with active-state tracking for seamless transitions across pages.

---

## 📂 Architecture & Directory Structure

The project follows a modular file architecture where the `public/` folder contains the live website pages, assets, and the searchable waifu catalog:

```text
.
├── README.md                  # Project documentation
└── public/
    ├── index.html             # Portal homepage with main navigation links
    ├── contact.html           # Contact / community feedback page
    ├── credits.html           # Credits and project acknowledgements
    ├── not_found.html         # Custom 404 fallback page
    ├── robots.txt             # Search engine crawl directives
    ├── css/
    │   └── style.css         # Global site styling, dark theme, navbar and layout
    ├── js/
    │   └── script.js         # Interactivity: carousel, responsive menu, search filter
    ├── images/
    │   └── favicon/
    │       └── site.webmanifest # Favicon / web app manifest assets
    └── waifulist/
        ├── waifus.html        # Main catalog index and searchable waifu list
        ├── 0-9/               # Numeric profile pages (e.g. 2B, 2P, Seven-7)
        │   ├── 2b.html
        │   └── seven-7.html
        ├── a/                 # Profile pages for characters starting with A
        │   ├── a2.html
        │   ├── ada_wong.html
        │   └── anby.html
        ├── b/                 # Profile pages for characters starting with B
        ├── c/                 # Profile pages for characters starting with C
        ├── d/
        ├── e/
        ├── f/
        ├── g/
        ├── h/
        ├── i/
        ├── j/
        ├── k/
        ├── l/
        ├── m/
        ├── n/
        ├── o/
        ├── p/
        ├── q/
        ├── r/
        ├── s/
        ├── t/
        ├── u/
        ├── v/
        ├── w/
        ├── x/
        ├── y/
        └── z/                 # Profile pages for characters starting with Z
```

- `public/waifulist/waifus.html` acts as the searchable directory and index source for the project.
- Each subfolder under `public/waifulist/` groups individual character profile pages by initial letter or numeric entry for easier maintenance.
- `public/css/style.css` controls the page theme, typography, layout, and responsive navbar styling.
- `public/js/script.js` provides runtime behavior such as the carousel, mobile menu toggle, live search suggestions, and filter/hide logic.
- Public-facing pages including `public/index.html`, `public/contact.html`, `public/credits.html`, and `public/not_found.html` are served directly from inside `public/`.
