// Games Data with Real Images
const games = [
    {
        id: 1,
        name: 'Shadow Quest',
        category: 'action',
        description: 'An intense action game with stunning graphics and challenging combat. Join the shadow warriors and fight against dark forces in mysterious realms. Features: 50+ levels, multiplayer mode, dynamic combat system.',
        image: '🗡️',
        icon: 'fas fa-dragon',
        rating: '⭐ 4.8/5',
        color1: '#667eea',
        color2: '#764ba2'
    },
    {
        id: 2,
        name: 'Puzzle Master',
        category: 'puzzle',
        description: 'Challenge your mind with thousands of engaging and fun puzzles. Progressive difficulty from easy to extremely hard levels. Features: 500+ puzzles, achievements, daily challenges, leaderboards.',
        image: '🧩',
        icon: 'fas fa-puzzle-piece',
        rating: '⭐ 4.6/5',
        color1: '#764ba2',
        color2: '#f093fb'
    },
    {
        id: 3,
        name: 'Football Champion',
        category: 'sports',
        description: 'Official football game featuring world\'s best teams and players. Play official matches and international tournaments. Features: Real teams, realistic physics, career mode, online multiplayer.',
        image: '⚽',
        icon: 'fas fa-basketball',
        rating: '⭐ 4.9/5',
        color1: '#f39c12',
        color2: '#e67e22'
    },
    {
        id: 4,
        name: 'Dragon\'s Treasure',
        category: 'adventure',
        description: 'An epic adventure journey through fantastical worlds filled with secrets and hidden treasures. Discover ancient dragon mysteries and legendary artifacts. Features: Vast open world, dragons, quests, exploration.',
        image: '🐉',
        icon: 'fas fa-dragon',
        rating: '⭐ 4.7/5',
        color1: '#2ecc71',
        color2: '#27ae60'
    },
    {
        id: 5,
        name: 'War Tactics',
        category: 'strategy',
        description: 'Strategic warfare game requiring smart planning and tactical decisions. Build your empire and command massive armies. Features: Real-time strategy, empire building, alliance system, PvP battles.',
        image: '⚔️',
        icon: 'fas fa-chess',
        rating: '⭐ 4.5/5',
        color1: '#e74c3c',
        color2: '#c0392b'
    }
];

let filteredGames = [...games];
let currentCategory = 'all';

// Display Games
function displayGames(gamesToDisplay) {
    const gamesGrid = document.getElementById('gamesGrid');
    
    if (gamesToDisplay.length === 0) {
        gamesGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🎮</div>
                <p>No games match your search</p>
            </div>
        `;
        return;
    }
    
    gamesGrid.innerHTML = gamesToDisplay.map(game => `
        <div class="game-card" onclick="openModal(${game.id})">
            <div class="game-card-image" style="background: linear-gradient(135deg, ${game.color1} 0%, ${game.color2} 100%);">
                <span style="font-size: 80px;">${game.image}</span>
                <div class="game-card-badge">Featured</div>
            </div>
            <div class="game-card-body">
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <div class="game-card-meta">
                    <span class="category-badge">${getCategoryName(game.category)}</span>
                    <span class="rating">${game.rating}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Get Category Name
function getCategoryName(category) {
    const categories = {
        'action': 'Action',
        'puzzle': 'Puzzle',
        'sports': 'Sports',
        'adventure': 'Adventure',
        'strategy': 'Strategy',
        'all': 'All Games'
    };
    return categories[category] || category;
}

// Filter by Category
function filterCategory(category) {
    currentCategory = category;
    
    // Update active links
    document.querySelectorAll('.category-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.category-link').classList.add('active');
    
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

// Search Games
function searchGames() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    if (currentCategory === 'all') {
        const results = games.filter(game => 
            game.name.toLowerCase().includes(searchInput) ||
            game.description.toLowerCase().includes(searchInput)
        );
        displayGames(results);
    } else {
        const results = filteredGames.filter(game => 
            game.name.toLowerCase().includes(searchInput) ||
            game.description.toLowerCase().includes(searchInput)
        );
        displayGames(results);
    }
}

// Open Modal
function openModal(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    
    document.getElementById('modalImage').style.background = `linear-gradient(135deg, ${game.color1} 0%, ${game.color2} 100%)`;
    document.getElementById('modalImage').innerHTML = `<span style="font-size: 120px; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">${game.image}</span>`;
    document.getElementById('modalTitle').textContent = game.name;
    document.getElementById('modalDescription').textContent = game.description;
    document.getElementById('modalCategory').textContent = getCategoryName(game.category);
    document.getElementById('modalRating').textContent = game.rating;
    
    document.getElementById('gameModal').style.display = 'block';
}

// Close Modal
function closeModal() {
    document.getElementById('gameModal').style.display = 'none';
}

// Close Modal on Outside Click
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal || event.target.classList.contains('modal-overlay')) {
        modal.style.display = 'none';
    }
}

// Toggle Wishlist
function toggleWishlist() {
    const btn = event.target.closest('.wishlist-btn');
    btn.classList.toggle('active');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayGames(games);
    
    // Set first category as active
    document.querySelector('.category-link').classList.add('active');
});
