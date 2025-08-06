// #region variables

const Theme = {
    BLACK: 'Black',
    WHITE: 'White',
    DEFAULT: 'Default',
};
const themeOrder = [Theme.DEFAULT, Theme.BLACK, Theme.WHITE];
let themeIndex = 0;
let theme = themeOrder[themeIndex];
let maps;
let mapNames = [
    'Bank',
    'Border',
    'Chalet',
    'Clubhouse',
    'Coastline',
    'Consulate',
    'Kafe',
    'Kanal',
    'Nighthaven',
    'Oregon',
    'Skyscraper',
    'Themepark',
    'Villa',
];

// #endregion variables

// #region initialization

if (localStorage.getItem('themeIndex')) {
    themeIndex = parseInt(localStorage.getItem('themeIndex'), 10);
    theme = themeOrder[themeIndex];
}

window.addEventListener("DOMContentLoaded", () => {
    fillMapSelect();
    document.body.classList.remove('theme-black', 'theme-white', 'theme-default');
    document.body.classList.add(`theme-${theme.toLowerCase()}`);
    fetch('maps.json')
        .then(res => res.json())
        .then(data => {
            maps = data;
        });
});

// #endregion initialization

document.getElementById('map-select').addEventListener('change', (e) => {
    const selectedMap = e.target.value;
    console.log(`Selected map: ${selectedMap}`);
});

function loadMap() {
    const mapSelect = document.getElementById('map-select');
    const selectedMap = mapSelect.value;

    if (maps && maps[selectedMap]) {

    } else {
    }
}

function fillMapSelect() {
    const select = document.getElementById('map-select');
    select.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'custom-map-select';

    const display = document.createElement('div');
    display.className = 'selected-map';
    display.textContent = 'Map Select';
    container.appendChild(display);

    const list = document.createElement('div');
    list.className = 'map-options';
    list.style.display = 'none';


    for (const mapName of mapNames) {
        const option = document.createElement('div');
        option.className = 'map-option';

        const img = new Image();
        img.src = `../Logos/${mapName}.png`;
        img.alt = mapName;
        img.style.width = '32px';
        img.style.height = '32px';
        img.style.verticalAlign = 'middle';
        img.style.marginRight = '8px';

        const text = document.createElement('span');
        text.textContent = mapName;

        option.appendChild(img);
        option.appendChild(text);

        option.addEventListener('click', () => {
            display.innerHTML = '';
            display.appendChild(img.cloneNode());
            display.appendChild(document.createTextNode(' ' + mapName));
            list.style.display = 'none';
            select.value = mapName;
            if (![...select.options].some(opt => opt.value === mapName)) {
                const option = document.createElement('option');
                option.value = mapName;
                option.text = mapName;
                select.appendChild(option);
            }
            select.value = mapName;
            localStorage.setItem('selectedMap', mapName);
            select.dispatchEvent(new Event('change'));
        });

        list.appendChild(option);

        container.appendChild(list);

        display.addEventListener('click', () => {
            list.style.display = list.style.display === 'none' ? 'block' : 'none';
        });

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                list.style.display = 'none';
            }
        });

        if (localStorage.getItem('selectedMap')) {
            const selectedMap = localStorage.getItem('selectedMap');
            const img = new Image();
            img.src = `../Logos/${selectedMap}.png`;
            img.alt = selectedMap;
            img.style.width = '32px';
            img.style.height = '32px';
            img.style.verticalAlign = 'middle';
            img.style.marginRight = '8px';
            display.innerHTML = '';
            display.appendChild(img.cloneNode());
            display.appendChild(document.createTextNode(' ' + selectedMap));
        }

        select.style.display = 'none';
        select.parentNode.insertBefore(container, select.nextSibling);
    }
}


const changeTheme = () => {
    themeIndex = (themeIndex + 1) % themeOrder.length;
    theme = themeOrder[themeIndex];
    localStorage.setItem('themeIndex', themeIndex);
    document.body.classList.remove('theme-black', 'theme-white', 'theme-default');
    switch (theme) {
        case Theme.BLACK:
            document.body.classList.add('theme-black');
            break;
        case Theme.WHITE:
            document.body.classList.add('theme-white');
            break;
        default:
            document.body.classList.add('theme-default');
    }
    document.querySelectorAll('.map-section').forEach(section => {
        section.classList.remove('theme-black', 'theme-white', 'theme-default');
        section.classList.add(`theme-${theme.toLowerCase()}`);
    });
    document.querySelectorAll('.custom-map-select').forEach(el => {
        el.classList.remove('theme-black', 'theme-white', 'theme-default');
        el.classList.add(`theme-${theme.toLowerCase()}`);
    });

    loadMap();
};

const showChannel = () => {
    // Remove existing popup if present
    const existing = document.getElementById('socials');
    if (existing) existing.remove();

    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.id = 'socials';
    // See CSS comment above for styles

    // Create popup box
    const popup = document.createElement('div');
    popup.className = 'popup';

    // Title
    const title = document.createElement('div');
    title.className = 'popup-title';
    title.textContent = 'Visit our YouTube Channel!';
    popup.appendChild(title);

    // YouTube button
    const btn = document.createElement('a');
    btn.className = 'youtube-btn';
    btn.href = 'https://www.youtube.com/@Infinity_Studio_HUN';
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.innerHTML = `<img src="../Images/youtube.webp">Infinity Studio YouTube`;
    popup.appendChild(btn);

    // TikTok button
    const tiktokBtn = document.createElement('a');
    tiktokBtn.className = 'tiktok-btn';
    tiktokBtn.href = 'https://www.tiktok.com/@infinity._.studio';
    tiktokBtn.target = '_blank';
    tiktokBtn.rel = 'noopener noreferrer';
    tiktokBtn.innerHTML = `<img src="../Images/tiktok.png">Infinity Studio TikTok`;
    popup.appendChild(tiktokBtn);
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = 'Close';
    closeBtn.onclick = () => overlay.remove();
    popup.appendChild(closeBtn);

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Close popup when clicking outside the box
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
};