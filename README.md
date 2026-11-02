# minjaebae-727.github.io

Personal academic website of Min Jae Bae (plant epigenetics, chromatin biology).

Live: https://minjaebae-727.github.io/

A static single-page site served by GitHub Pages from the `master` branch. `.nojekyll` turns off the Jekyll build, so files are served as they are.

- `index.html`: all content (sections are switched by `script.js`)
- `style.css`: layout and dark/light theme
- `files/cv.pdf`: CV linked from the "View CV" button, printed from `files/cv.html` with headless Edge:
  `msedge --headless=new --no-pdf-header-footer --print-to-pdf=files\cv.pdf file:///<repo>/files/cv.html`
- `images/`: profile photo, header image, favicons
