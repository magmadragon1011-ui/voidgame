# VOID HUB — Native + embedded games

This replacement adds an in-site player with:
- **Native games:** static HTML/CSS/JS game files stored in this repository.
- **Embedded games:** provider-approved iframe URLs. Some sites prohibit iframe embedding; use their official embed URL and follow their terms.
- **External links:** ordinary links to game and app websites.
- Search, categories, browser-local favorites, and fullscreen player controls.

## Included example
`games/star-catcher/index.html` is an original mini-game hosted directly in this repository. It demonstrates the native game format.

## Update your existing GitHub Pages site
1. Extract this ZIP.
2. Open your existing `void-hub` GitHub repository.
3. Upload/replace `index.html`, `styles.css`, and `app.js` in the repository root.
4. Upload the entire `games` folder, preserving `games/star-catcher/index.html`.
5. Commit changes to `main`. Wait for Pages to deploy, then refresh the site (try Ctrl+Shift+R).
6. Keep Settings → Pages configured for `main` and `/(root)`.

## Add a native game
1. Create `games/my-game/` in the repo.
2. Put a browser-ready game build in that folder. It needs an `index.html` entry point plus all supporting JS, CSS, images, audio, and assets.
3. Add this object inside the `LINKS` array in `app.js`:
```js
{id:"my-game",name:"My Game",category:"Games",icon:"🎮",description:"A short description.",type:"native",src:"games/my-game/index.html"},
```
4. Commit the new folder and app.js change.

Only upload game files you created, have permission to redistribute, or whose license allows hosting.

## Add an embedded game
Add an object to `LINKS`:
```js
{id:"game-id",name:"Game Name",category:"Games",icon:"🕹️",description:"Short description.",type:"embed",src:"https://provider.example/official-embed-url"},
```
Use the provider's official embed URL. If it refuses to load, the provider may prohibit iframe embedding. Don't attempt to bypass those restrictions; use its official site link instead.

## Notes
GitHub Pages is static hosting: browser HTML/CSS/JS games work, but server-based games and executable desktop games do not. This setup does not bypass school/work network restrictions. Favorites are saved separately in each visitor's browser.
