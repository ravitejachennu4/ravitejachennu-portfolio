# Ravi Teja Angular Portfolio

Angular 17 standalone portfolio with an animated, responsive UI.

## Run

```bash
npm install
npm start
```

Then open the local Angular development URL shown by the CLI.

## Included changes

- Hero uses the supplied profile photo from `src/assets/profile-reference.png`.
- Hero keeps the name presentation clean: `Hello, I'm` + `Ravi Teja`.
- Removed the 4+ and 4.7 experience cards from underneath the profile image.
- Added animated profile ring, orbit, glow and floating UI elements.
- Reworked `CODE • BUILD • IMPROVE` into an animated interactive code panel with mouse tilt.
- Rebuilt technical skills into the requested eight skill areas.
- Added animated Instagram, LinkedIn and Facebook social buttons.
- Added a real PDF asset at `src/assets/Ravi_Teja_Resume.pdf`; the Resume buttons download/open that PDF.
- Professional Experience resume action is separated from the timeline cards to avoid overlap.

## Personal links

Edit `socialLinks` in `src/app/app.component.ts` and replace the three platform URLs with the exact Instagram, LinkedIn and Facebook profile URLs.

## Resume

The included PDF is a portfolio-ready resume summary created from the information available in the supplied project. If you have your actual resume PDF, replace `src/assets/Ravi_Teja_Resume.pdf` with it and keep the same filename, or update `resumeUrl` in `app.component.ts`.


## Quick Message email delivery
The Quick Message form sends submissions to `ravitejachennu4@gmail.com` through FormSubmit's AJAX endpoint. FormSubmit documents the AJAX endpoint as a cross-origin form submission method that returns JSON, and the first submission to a new recipient may require email activation/confirmation. Keep the site served through Angular (`ng serve`) or a deployed web server rather than opening `index.html` directly.

The form includes the visitor's name, email, message, a subject, a table email template, and a honeypot field. The UI stays on the portfolio page, shows a sending state, clears the form after success, and displays an error notification if delivery fails.

## Social links
- LinkedIn: `https://www.linkedin.com/in/ravi-teja-chennu`
- Instagram: `https://www.instagram.com/raviteja.chennu_?stkn=MTh6Ymx1MTJwMWd6eg%3D%3D`
- Facebook: `https://www.facebook.com/profile.php?id=100004886144984`
- Naukri: `https://www.naukri.com/mnjuser/homepage`
