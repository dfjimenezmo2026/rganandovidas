document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Drawer Logic
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    const openSidebar = () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeSidebar = () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);

    // 2. Category Tabs Logic
    const tabs = document.querySelectorAll('.tab');
    const cards = document.querySelectorAll('.feed-card');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked
            tab.classList.add('active');
            
            // Filter logic
            const currentTabCat = tab.textContent.trim().toLowerCase();
            
            cards.forEach(card => {
                // Determine if card matches. Note that "todos" shows everyone.
                const cardCat = card.getAttribute('data-category');
                
                if (currentTabCat === 'todos' || cardCat === currentTabCat) {
                    card.style.display = 'block'; // Or flex depending on original css, but default is block/flex. The css doesn't explicitly declare display for cards other than default block since it's an article. Actually, it's relative container. 'block' works best for article.
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Optional: Smooth scroll the tabs container to keep active tab somewhat centered
            tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });

    // 3. Audio Player Logic
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    let isPlaying = false;

    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playIcon.textContent = 'pause_circle';
            // Here you would actually start audio playback
            // e.g., audioContext.play()
        } else {
            playIcon.textContent = 'play_circle';
            // Here you would pause audio playback
        }
    });

    // 4. Like Button Interaction
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent card click
            const icon = btn.querySelector('.material-symbols-rounded');
            const targetColor = '#d12e2e'; // red
            
            if (icon.textContent === 'favorite_border') {
                // Like
                icon.textContent = 'favorite';
                icon.style.color = targetColor;
                icon.classList.add('filled');
                
                // Add simple popup animation class if desired
                icon.style.transform = 'scale(1.2)';
                setTimeout(() => icon.style.transform = 'scale(1)', 200);
            } else {
                // Unlike
                icon.textContent = 'favorite_border';
                icon.style.color = '';
                
                icon.style.transform = 'scale(1.2)';
                setTimeout(() => icon.style.transform = 'scale(1)', 200);
            }
        });
    });
});
