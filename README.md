# 📒 Daybook — Task Manager

A clean, ledger-styled task manager built with vanilla **HTML, CSS, and JavaScript**. No frameworks, no build tools — just open it in a browser.

🔗 **Live Demo:** [nandinikanwar24set-del.github.io/day-book](https://nandinikanwar24set-del.github.io/day-book/)
📂 **Repository:** [github.com/nandinikanwar24set-del/day-book](https://github.com/nandinikanwar24set-del/day-book)

## ✨ Features

- **Add tasks** with a title and priority level (Low / Medium / High)
- **Mark tasks complete** — completed tasks get a rotated "DONE" stamp
- **Delete tasks** with a smooth fade-out animation
- **Filter tasks** by All / Open / Done
- **Live stats bar** showing total, open, and done counts with a progress bar
- **Persistent storage** — tasks are saved to `localStorage`, so they survive a page refresh
- **Fully responsive** — works cleanly on mobile, tablet, and desktop
- **No page reloads** — all updates happen dynamically via DOM manipulation

## 🛠️ Built With

- **HTML5** — semantic structure
- **CSS3** — custom properties, flexbox, responsive layout, no frameworks
- **JavaScript (ES6+)** — DOM manipulation, event handling, `localStorage` API

## 📁 Project Structure

```
task-manager/
├── index.html      # Page structure
├── style.css        # All styling (no inline CSS)
├── script.js         # App logic (no inline JS)
└── README.md
```

## 🚀 Getting Started

### Run locally
1. Clone the repo:
   ```bash
   git clone https://github.com/nandinikanwar24set-del/day-book.git
   cd day-book
   ```
2. Open `index.html` in your browser — that's it, no install step needed.

### Deploy
This is a static site, so it can be hosted for free on any of the following:
- **GitHub Pages** — Settings → Pages → deploy from `main` branch
- **Netlify** — drag and drop the project folder into the Netlify dashboard
- **Vercel** — `vercel deploy` from the project root

## 🎯 How It Works

- Tasks are stored as an array of objects in memory and synced to `localStorage` on every change.
- The UI re-renders from that array whenever a task is added, toggled, deleted, or filtered — so the DOM always reflects the current state.
- Priority is shown as a colored accent bar on the left edge of each task card.

## 🔮 Possible Future Improvements

- Edit tasks in place
- Due dates with overdue highlighting
- Drag-and-drop reordering
- Dark mode toggle
- Sync tasks across devices with a backend (e.g. Firebase)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
