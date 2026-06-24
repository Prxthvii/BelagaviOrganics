# Belagavi Organics — Static Website

> **Sustainably Sown, Organically Grown** — a multilingual, device-friendly website for Belagavi Organics, an organic farm business based in Belagavi, Karnataka (India).

Built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step. Just open `index.html` or deploy to GitHub Pages.

---

## ✨ Features

- **Village / Nature theme** — Orange (sky/sun) → cream (clouds) → green (rolling hills, huts, cows, trees) background, inspired by the design references.
- **Multilingual (4 languages)** — English, हिंदी (Hindi), ಕನ್ನಡ (Kannada), मराठी (Marathi). Language preference is remembered via `localStorage`.
- **Embedded product catalogue (PDF)** — A 7-page PDF catalogue is embedded directly in the Products section, with a poster-image fallback for browsers that don't render PDFs in iframes.
- **WhatsApp deep-links everywhere** — Every "Buy Now" / "Enquire" button opens WhatsApp with the product name and category pre-filled in the message. The same deep-links also work **inside the PDF catalogue** — tap any green "Buy" button in the PDF to start a chat.
- **Device-friendly** — Mobile-first responsive layout, hamburger nav, fluid grids, large tap targets.
- **No build step** — Pure static files. Deploy to GitHub Pages, Netlify, Vercel, or any static host.

---

## 📁 Project Structure

```
belagavi-organics/
├── index.html                    # Main page (all sections)
├── css/
│   └── style.css                 # All styling (vanilla CSS)
├── js/
│   ├── i18n.js                   # Multilingual dictionary + language switcher
│   ├── products.js               # Product categories + WhatsApp link builder
│   └── main.js                   # Nav toggle, scroll reveal, smooth scroll, etc.
├── assets/
│   ├── catalog/
│   │   ├── belagavi-organics-catalog.pdf   # The embedded product catalogue
│   │   ├── catalog.html                    # Source HTML used to generate the PDF
│   │   └── catalog-preview.png             # Fallback poster image
│   └── images/                   # Logo, brochures, product label photos
└── README.md
```

---

## 🚀 Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `belagavi-organics`).
2. Upload all files in this folder to the repo root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `(root)` / `Save`
5. Wait 1–2 minutes. Your site will be live at:
   ```
   https://<your-username>.github.io/belagavi-organics/
   ```

### Local Preview

```bash
cd belagavi-organics
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

---

## 🌱 Editing Content

### Update products

Edit the `CATEGORIES` array in `js/products.js`. Each category has:
```js
{ key: "spices", name: "Spices & Seeds", icon: "spice", count: 23,
  nameLocal: { en: "Spices & Seeds", hi: "...", kn: "...", mr: "..." } }
```

### Update the PDF catalogue

The PDF is regenerated from `assets/catalog/catalog.html` (a self-contained HTML file). To rebuild:

```bash
# Requires Node.js + the pdf skill scripts
node /path/to/pdf/scripts/html2pdf-next.js \
  assets/catalog/catalog.html \
  --output assets/catalog/belagavi-organics-catalog.pdf \
  --width 720px --height 1020px --nopaged \
  --title "Belagavi Organics - Product Catalogue 2025"
```

Then regenerate the preview thumbnail:
```bash
python3 -c "
import pypdfium2 as pdfium
pdf = pdfium.PdfDocument('assets/catalog/belagavi-organics-catalog.pdf')
pdf[0].render(scale=1.5).to_pil().save('assets/catalog/catalog-preview.png')
"
```

### Update contact info / WhatsApp number

- WhatsApp number: `WHATSAPP_NUMBER` constant in `js/products.js` and inside `assets/catalog/catalog.html` (used to regenerate the PDF).
- Address, email, hours: directly in `index.html` and `assets/catalog/catalog.html`.
- Social media URLs: in `index.html` (Instagram / Facebook `<a>` tags).

### Add a new translation

1. Add a new language entry to the `I18N` object in `js/i18n.js` (copy the `en` block and translate every value).
2. Add a matching entry to `LANG_META`.
3. Add a new `<li data-lang="xx">` to the language menu in `index.html` (inside `.lang-menu`).
4. Add `nameLocal.xx` for each category in `js/products.js`.

---

## 📞 Business Contact

- **Maruti Mellikeri** — +91 8884063030 (WhatsApp / Call)
- **Email:** omfbelagavi@gmail.com
- **Address:** IAT Building, Joint Director of Agriculture Premises, Near RTO Circle, Shivaji Nagar, Belagavi — 590016
- **Hours:** Mon–Fri 8 AM – 6 PM · Sat 9 AM – 4 PM · Sun Closed

---

© 2025 Belagavi Organics · *Arogyan Dhanasampada* · Sustainably Sown, Organically Grown
