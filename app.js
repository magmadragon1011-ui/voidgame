// Edit this list to customize the links shown on your hub.
// Only add sites you trust and have permission to access.
const LINKS = [
  {id:"crazygames",name:"CrazyGames",category:"Games",icon:"🎮",description:"A large collection of free browser games.",url:"https://www.crazygames.com/"},
  {id:"poki",name:"Poki",category:"Games",icon:"🕹️",description:"Quick-play browser games across many genres.",url:"https://poki.com/"},
  {id:"itch",name:"itch.io",category:"Games",icon:"👾",description:"Discover indie games, including browser-playable titles.",url:"https://itch.io/games/html5"},
  {id:"scratch",name:"Scratch",category:"Games",icon:"🐱",description:"Play and create community-made games.",url:"https://scratch.mit.edu/"},
  {id:"photopea",name:"Photopea",category:"Web tools",icon:"🎨",description:"Edit images and PSD files in your browser.",url:"https://www.photopea.com/"},
  {id:"translate",name:"Google Translate",category:"Web tools",icon:"🌐",description:"Translate text and websites.",url:"https://translate.google.com/"},
  {id:"calculator",name:"Calculator",category:"Web tools",icon:"➗",description:"A simple online calculator.",url:"https://www.desmos.com/scientific"},
  {id:"excalidraw",name:"Excalidraw",category:"Web tools",icon:"✏️",description:"Sketch diagrams and ideas on a virtual whiteboard.",url:"https://excalidraw.com/"},
  {id:"scratchapp",name:"Scratch Editor",category:"Apps",icon:"🧩",description:"Build interactive stories, games, and animations.",url:"https://scratch.mit.edu/projects/editor/"},
  {id:"discord",name:"Discord",category:"Apps",icon:"💬",description:"Communicate and organize communities.",url:"https://discord.com/app"},
  {id:"canva",name:"Canva",category:"Apps",icon:"🖌️",description:"Create presentations, posters, and designs.",url:"https://www.canva.com/"},
  {id:"notion",name:"Notion",category:"Apps",icon:"🗒️",description:"Keep notes, tasks, and projects organized.",url:"https://www.notion.so/"}
];

const grid = document.querySelector("#cardGrid");
const searchInput = document.querySelector("#searchInput");
const count = document.querySelector("#resultCount");
const empty = document.querySelector("#emptyState");
const title = document.querySelector("#sectionTitle");
const eyebrow = document.querySelector("#sectionEyebrow");
const dialog = document.querySelector("#settingsDialog");
const newTabToggle = document.querySelector("#newTabToggle");
let activeFilter = "all";
let searchTerm = "";
let openInNewTab = true;
let favorites = new Set();

try { favorites = new Set(JSON.parse(localStorage.getItem("voidHubFavorites") || "[]")); } catch { favorites = new Set(); }

function persistFavorites() {
  try { localStorage.setItem("voidHubFavorites", JSON.stringify([...favorites])); } catch {}
}

function render() {
  const filtered = LINKS.filter(item => {
    const matchesCategory = activeFilter === "all" || item.category === activeFilter || (activeFilter === "Favorites" && favorites.has(item.id));
    const haystack = `${item.name} ${item.category} ${item.description}`.toLowerCase();
    return matchesCategory && haystack.includes(searchTerm.toLowerCase());
  });
  grid.innerHTML = "";
  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = "link-card";
    const top = document.createElement("div"); top.className = "card-top";
    const icon = document.createElement("div"); icon.className = "card-icon"; icon.textContent = item.icon; icon.setAttribute("aria-hidden","true");
    const category = document.createElement("span"); category.className = "card-category"; category.textContent = item.category;
    const favorite = document.createElement("button"); favorite.className = "favorite-button" + (favorites.has(item.id) ? " saved" : "");
    favorite.type = "button"; favorite.textContent = favorites.has(item.id) ? "★" : "☆";
    favorite.setAttribute("aria-label", favorites.has(item.id) ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`);
    favorite.addEventListener("click", () => {
      favorites.has(item.id) ? favorites.delete(item.id) : favorites.add(item.id);
      persistFavorites(); render();
    });
    top.append(icon, category, favorite);
    const name = document.createElement("h3"); name.className = "card-title"; name.textContent = item.name;
    const desc = document.createElement("p"); desc.className = "card-description"; desc.textContent = item.description;
    const link = document.createElement("a"); link.className = "card-open"; link.href = item.url; link.textContent = "↗";
    link.setAttribute("aria-label", `Open ${item.name}`); link.rel = "noopener noreferrer";
    if (openInNewTab) link.target = "_blank";
    card.append(top, name, desc, link); grid.append(card);
  });
  count.textContent = `${filtered.length} ${filtered.length === 1 ? "LINK" : "LINKS"}`;
  empty.hidden = filtered.length !== 0;
  grid.hidden = filtered.length === 0;
  const labels = {all:["THE COLLECTION","Featured links"],Games:["PLAY SOMETHING","Games"],"Web tools":["USEFUL STUFF","Web tools"],Apps:["YOUR WORKSPACE","Apps"],Favorites:["SAVED BY YOU","Favorites"]};
  const label = labels[activeFilter] || labels.all;
  eyebrow.textContent = label[0]; title.textContent = label[1];
}

document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  activeFilter = tab.dataset.filter;
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === tab));
  render();
}));
searchInput.addEventListener("input", () => { searchTerm = searchInput.value.trim(); render(); });
document.querySelector("#clearSearch").addEventListener("click", () => { searchInput.value = ""; searchTerm = ""; render(); searchInput.focus(); });
document.querySelector("#settingsButton").addEventListener("click", () => dialog.showModal());
newTabToggle.addEventListener("change", () => { openInNewTab = newTabToggle.checked; render(); });
render();
