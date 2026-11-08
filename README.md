# Daniels Olubi Chukwuebuka Portfolio

This project is a personal academic portfolio and student management website built for a COS 106 web technologies assignment.

## Project structure

```text
MyPortfolio/
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── data-analysis.html
├── css/
│   ├── style.css
│   └── data-analysis.css
├── js/
│   ├── main.js
│   ├── planner.js
│   ├── projects.js
│   ├── contact.js
│   └── data-analysis.js
├── assets/
│   ├── images/
│   └── video/
├── README.md
└── project media files
```

## Features

- Responsive multi-page portfolio layout
- Dark/light mode toggle
- Mobile navigation menu
- Project category filter
- Academic planner with localStorage
- Contact form validation
- Video section with local placeholder media
- Agricultural production dashboard with fictional crop data, calculated yields, charts, filtering and sorting

## Running the site

Open `index.html` in a browser, or serve the folder locally with:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

- Use the local files in the `assets` folder to replace placeholders with final photographs and video.
- The planner stores tasks in the browser using `localStorage`, so the tasks remain available after refresh.
- The contact form is a frontend demonstration only and does not deliver real email messages without a backend service.
