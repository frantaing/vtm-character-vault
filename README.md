# Vampire: The Masquerade Character Vault

Welcome to my personal VtM Character Vault! This project started as a way for me to reference (and ponder) my characters/NPCs from any device, and as an excuse to learn React. It's a passion project that finally centralizes all my errant characters into one place.

This is a simple, wiki-esque collection of my characters (mostly V20), organized by clan, bloodline, or status (Caitiff/Thin-Blood). Each character has their own page with their character sheet, notes, images, and other details, all rendered dynamically from Markdown files.

> [!NOTE]
> Currently under construction! Probably a litle rough around the edges, and I haven't even added a single character aside from the test/placeholder, but I figured I'd just get the future pain of deployment out of the way and relish in the knowing that it does, indeed, work.
> Mobile also needs adapting and polishing, ha!

**[Check out the live demo on GitHub Pages!](https://frantaing.github.io/vtm-character-vault/)**

## ✨ Features

*   **Dynamic Markdown Rendering:** All character sheets are stored as simple `.md` files. The app reads and renders them on the fly, including frontmatter metadata.
*   **Dynamic Routing:** Uses React Router to generate pages for each clan and character automatically based on the URL.
*   **Reusable Image Carousel:** A single, robust carousel component handles character galleries and clan symbols, adapting its image paths based on context.
*   **Context-Aware Breadcrumbs:** Breadcrumbs are dynamically generated and use the React Context API to display proper character names instead of URL slugs/crumbs.
*   **Styled with Tailwind v4:** The entire project is styled using the latest Tailwind v4 alpha, so goodbye `tailwind.config.js`!

## 🛠️ Tech Stack

This is currently a pure frontend project built with:

*   **Framework:** React
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS v4
*   **Routing:** React Router
*   **Markdown:** React Markdown & Gray Matter
*   **Image Carousel:** Swiper.js

In the future, I may add a backend component and deploy on Vercel, but for now, it's living happily on GitHub Pages.

## 📜 Disclaimer

This is a fan-made, non-commercial project created for educational and recreational purposes only. All game mechanics, setting terms, and thematic elements from *Vampire: The Masquerade* belong to their respective copyright holders.

This project is not affiliated with, endorsed, sponsored, or specifically approved by White Wolf Publishing, Paradox Interactive, or any related entity.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.