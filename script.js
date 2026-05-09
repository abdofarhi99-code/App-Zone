// Professional Game Store Database
const games = [
    {
        id: 1,
        name: 'Shadow Quest',
        category: 'action',
        description: 'An epic action-packed adventure where you battle shadows in a mystical realm. Features fast-paced combat, stunning graphics, and challenging boss fights. Explore dark dungeons and uncover ancient secrets.',
        emoji: '🗡️',
        rating: '4.8/5',
        ratingNum: 4.8
    },
    {
        id: 2,
        name: 'Puzzle Master',
        category: 'puzzle',
        description: 'Test your brain with thousands of challenging puzzles. From easy warm-ups to impossibly hard levels, this game provides endless entertainment. Perfect for puzzle enthusiasts of all skill levels.',
        emoji: '🧩',
        rating: '4.6/5',
        ratingNum: 4.6
    },
    {
        id: 3,
        name: 'Football Champion',
        category: 'sports',
        description: 'The ultimate football simulation featuring real teams, players, and stadiums. Play competitive matches, build your ultimate team, and compete in worldwide tournaments. Experience authentic football gameplay.',
        emoji: '⚽',
        rating: '4.9/5',
        ratingNum: 4.9
    },
    {
        id: 4,
        name: 'Dragon\'s Treasure',
        category: 'adventure',
        description: 'Embark on an epic adventure through mystical lands filled with treasures and secrets. Discover ancient dragon lairs, solve magical puzzles, and collect legendary artifacts in this thrilling fantasy quest.',
        emoji: '🐉',
        rating: '4.7/5',
        ratingNum: 4.7
    },
    {
        id: 5,
        name: 'War Tactics',
        category: 'strategy',
        description: 'Command armies, plan strategies, and conquer territories in this turn-based strategy game. Build your empire, research technologies, and outsmart opponents. Requires tactical thinking and long-term planning.',
        emoji: '⚔️',
        rating: '4.5/5',
        ratingNum: 4.5
    }
];

let currentCategory = 'all';
let filteredGames = [...games];
let wishlist = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayGames(games);
    setupCategoryLinks();
    loadWishlist();
});

// Display games in grid
function displayGames(gamesToDisplay) {
    const gamesGrid = document.getElementById('gamesGrid');
    
    if (gamesToDisplay.length === 0) {
        gamesGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1;">
                <div class="no-results-icon">🎮</div>
                <p>No games found matching your search.</p>
            </div>
        `;
        return;
    }

    gamesGrid.innerHTML = gamesToDisplay.map(game => `
        <div class="game-card" onclick="openModal(${game.id})">
            <div class="game-card-image">${game.emoji}</div>
            <div class="game-card-body">
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <div class="game-card-footer">
                    <span class="category-badge">${formatCategory(game.category)}</span>
                    <span class="rating">⭐ ${game.rating}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Format category name
function formatCategory(category) {
    const categories = {
        'action': 'Action',
        'puzzle': 'Puzzle',
        'sports': 'Sports',
        'adventure': 'Adventure',
        'strategy': 'Strategy'
    };
    return categories[category] || category;
}

// Setup category filter links
function setupCategoryLinks() {
    document.querySelectorAll('.category-link').forEach(link => {
        if (link.textContent.includes('All Games')) {
            link.classList.add('active');
        }
    });
}

// Filter by category
function filterCategory(category) {
    currentCategory = category;
    
    // Update active link
    document.querySelectorAll('.category-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.category-link').classList.add('active');
    
    // Filter games
    if (category === 'all') {
        filteredGames = [...games];
    } else {
        filteredGames = games.filter(game => game.category === category);
    }
    
    // Apply current search
    const searchInput = document.getElementById('searchInput');
    if (searchInput.value) {
        searchGames();
    } else {
        displayGames(filteredGames);
    }
}

// Search games
function searchGames() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let baseGames = currentCategory === 'all' ? games : filteredGames;
    
    const results = baseGames.filter(game => 
        game.name.toLowerCase().includes(searchTerm) ||
        game.description.toLowerCase().includes(searchTerm)
    );
    
    displayGames(results);
}

// Open game modal
function openModal(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    
    document.getElementById('modalImage').textContent = game.emoji;
    document.getElementById('modalTitle').textContent = game.name;
    document.getElementById('modalDescription').textContent = game.description;
    document.getElementById('modalCategory').textContent = formatCategory(game.category);
    document.getElementById('modalRating').innerHTML = `⭐ ${game.rating}`;
    
    // Update wishlist button
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlist.includes(gameId)) {
        wishlistBtn.classList.add('added');
    } else {
        wishlistBtn.classList.remove('added');
    }
    
    // Store current game ID for wishlist function
    wishlistBtn.dataset.gameId = gameId;
    
    document.getElementById('gameModal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('gameModal').style.display = 'none';
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal || event.target.classList.contains('modal-overlay')) {
        modal.style.display = 'none';
    }
}

// Toggle wishlist
function toggleWishlist() {
    const wishlistBtn = document.querySelector('.wishlist-btn');
    const gameId = parseInt(wishlistBtn.dataset.gameId);
    
    const index = wishlist.indexOf(gameId);
    if (index > -1) {
        wishlist.splice(index, 1);
        wishlistBtn.classList.remove('added');
    } else {
        wishlist.push(gameId);
        wishlistBtn.classList.add('added');
    }
    
    saveWishlist();
}

// Save wishlist to localStorage
function saveWishlist() {
    localStorage.setItem('appZoneWishlist', JSON.stringify(wishlist));
}

// Load wishlist from localStorage
function loadWishlist() {
    const saved = localStorage.getItem('appZoneWishlist');
    if (saved) {
        wishlist = JSON.parse(saved);
    }
}
