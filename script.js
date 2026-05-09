// قائمة الألعاب مع البيانات
const games = [
    {
        id: 1,
        name: 'Shadow Quest',
        category: 'action',
        description: 'لعبة أكشن مثيرة مع رسوميات عالية الجودة وتحديات صعبة. انضم إلى أبطال الظلام وقاتل الأعداء في عوالم سحرية وخطيرة.',
        image: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Shadow+Quest',
        rating: '⭐ 4.8/5'
    },
    {
        id: 2,
        name: 'Puzzle Master',
        category: 'puzzle',
        description: 'تحدى عقلك مع آلاف الألغاز الممتعة والمثيرة. تصاعد المستويات من السهل للصعب جداً واستمتع بساعات من المرح والإثارة.',
        image: 'https://via.placeholder.com/300x200/764ba2/ffffff?text=Puzzle+Master',
        rating: '⭐ 4.6/5'
    },
    {
        id: 3,
        name: 'Football Champion',
        category: 'sports',
        description: 'لعبة كرة القدم الرسمية مع أفضل الفرق واللاعبين العالميين. العب مبارايات رسمية وبطولات عالمية مع أصدقائك.',
        image: 'https://via.placeholder.com/300x200/f39c12/ffffff?text=Football+Champion',
        rating: '⭐ 4.9/5'
    },
    {
        id: 4,
        name: 'Dragon\'s Treasure',
        category: 'adventure',
        description: 'رحلة مغامرة فريدة في عوالم خيالية مليئة بالأسرار والكنوز المخفية. اكتشف أسرار التنانين القديمة والكنوز الضائعة.',
        image: 'https://via.placeholder.com/300x200/2ecc71/ffffff?text=Dragons+Treasure',
        rating: '⭐ 4.7/5'
    },
    {
        id: 5,
        name: 'War Tactics',
        category: 'strategy',
        description: 'لعبة استراتيجية تاريخية تحتاج لتخطيط ذكي واتخاذ قرارات صعبة. بنِ إمبراطوريتك وتحكم في الجيوش بحكمة.',
        image: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=War+Tactics',
        rating: '⭐ 4.5/5'
    }
];

let filteredGames = [...games];
let currentCategory = 'all';

// دالة لعرض الألعاب
function displayGames(gamesToDisplay) {
    const gamesGrid = document.getElementById('gamesGrid');
    
    if (gamesToDisplay.length === 0) {
        gamesGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1;">
                <div class="no-results-icon">🎮</div>
                <p>لا توجد ألعاب تطابق البحث الخاص بك</p>
            </div>
        `;
        return;
    }
    
    gamesGrid.innerHTML = gamesToDisplay.map(game => `
        <div class="game-card" onclick="openModal(${game.id})">
            <img src="${game.image}" alt="${game.name}">
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

// دالة للحصول على اسم الفئة
function getCategoryName(category) {
    const categories = {
        'action': 'أكشن',
        'puzzle': 'ألغاز',
        'sports': 'رياضية',
        'adventure': 'مغامرات',
        'strategy': 'استراتيجية',
        'all': 'جميع الألعاب'
    };
    return categories[category] || category;
}

// دالة تصفية حسب الفئة
function filterCategory(category) {
    currentCategory = category;
    
    // تحديث الروابط النشطة
    document.querySelectorAll('.menu a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (category === 'all') {
        filteredGames = [...games];
    } else {
        filteredGames = games.filter(game => game.category === category);
    }
    
    // تطبيق البحث الحالي
    const searchInput = document.getElementById('searchInput');
    if (searchInput.value) {
        searchGames();
    } else {
        displayGames(filteredGames);
    }
}

// دالة البحث
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

// دالة فتح Modal
function openModal(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
    
    document.getElementById('modalImage').src = game.image;
    document.getElementById('modalTitle').textContent = game.name;
    document.getElementById('modalDescription').innerHTML = `<strong>الوصف:</strong> ${game.description}`;
    document.getElementById('modalCategory').innerHTML = `<strong>الفئة:</strong> ${getCategoryName(game.category)}`;
    document.getElementById('modalRating').innerHTML = `<strong>التقييم:</strong> ${game.rating}`;
    
    document.getElementById('gameModal').style.display = 'block';
}

// دالة إغلاق Modal
function closeModal() {
    document.getElementById('gameModal').style.display = 'none';
}

// إغلاق Modal عند الضغط خارجه
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayGames(games);
    
    // تفعيل الرابط الأول في القائمة
    document.querySelector('.menu a').classList.add('active');
});
