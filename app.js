// Global değişkenler
let currentSession = {
    sessionType: "",
    participantId: "",
    participantName: "",
    participantAge: 0,
    startTime: null,
    currentBullyingType: null,
    currentScenario: null,
    messageIndex: 0,
    sessionData: [],
    skills: {
        navigation: false,
        reading: false,
        replying: false,
        reporting: false,
        blocking: false
    },
    stats: {
        correct: 0,
        wrong: 0,
        hints: 0
    },
    currentMessageStartTime: null,
    hintTimeout: null,
    messageTimeout: null,
    reportClicked: false,
    blockClicked: false,
    pendingMessages: 0,
    messageQueue: [],
    currentMessageIndex: 0,
    selectedComplaintReason: null
};

// Real Instagram DM notification sound (base64 encoded)
// This is a realistic notification beep that sounds like Instagram
const notificationSound = new Audio('data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADhgCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/////////////////////////////////////////8AAABhTEFNRTMuMTAwA6oAAAAAAAAAABQ4JALYQgAAOAAABBoF8kCYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+xDEAAPAAAGkAAAAIAAANIAAAARMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=');

function playNotificationSound() {
    try {
        notificationSound.currentTime = 0;
        notificationSound.play().catch(err => {
            console.log('Could not play sound:', err);
        });
    } catch (e) {
        console.log('Sound playback error:', e);
    }
}

// Feed için gönderi verileri - Çocuk dostu içerikler (fotoğraf + video karışık)
const POSTS = [
    // Hayvanlar
    { username: "sevimli.kedicik", avatar: "sevimlikedicik", image: "https://picsum.photos/seed/cat1/600/600", caption: "Minnoş kedim uyuyor 🐱💤", likes: 342, type: "image" },
    { username: "kopek.dostu", avatar: "kopekdostu", image: "https://picsum.photos/seed/dog1/600/600", caption: "Yavru köpeğim çok oyuncu! 🐕🎾", likes: 521, type: "image" },
    { username: "hayvan.videolari", avatar: "hayvanvideolari", image: "https://picsum.photos/seed/animals1/600/600", caption: "Sevimli hayvan videosu 🐾", likes: 876, type: "video" },
    { username: "tavsan.cicek", avatar: "tavsancicek", image: "https://picsum.photos/seed/rabbit1/600/600", caption: "Tavşanım havuç yiyor 🐰🥕", likes: 398, type: "image" },
    
    // Renkler ve Eğlence
    { username: "gokkusagi.dunyasi", avatar: "gokkusagidunyasi", image: "https://picsum.photos/seed/rainbow1/600/600", caption: "Gökkuşağı çok renkli 🌈☀️", likes: 612, type: "image" },
    { username: "parti.videolari", avatar: "partivideolari", image: "https://picsum.photos/seed/party1/600/600", caption: "Doğum günü partisi! 🎉🎈", likes: 945, type: "video" },
    { username: "balon.partisi", avatar: "balonpartisi", image: "https://picsum.photos/seed/balloons1/600/600", caption: "Renkli balonlarla parti! 🎈🎉", likes: 489, type: "image" },
    { username: "pasta.dunyasi", avatar: "pastadunyasi", image: "https://picsum.photos/seed/cake1/600/600", caption: "Doğum günü pastası hazır 🎂🎊", likes: 576, type: "image" },
    
    // Oyunlar ve Sporlar
    { username: "oyun.zamani", avatar: "oyunzamani", image: "https://picsum.photos/seed/game1/600/600", caption: "Yeni oyunum çok eğlenceli 🎮🕹️", likes: 445, type: "image" },
    { username: "futbol.goller", avatar: "futbolgoller", image: "https://picsum.photos/seed/soccer1/600/600", caption: "Harika gol anı! ⚽🔥", likes: 1234, type: "video" },
    { username: "futbol.yildizi", avatar: "futbolyildizi", image: "https://picsum.photos/seed/soccer2/600/600", caption: "Futbol oynamak çok keyifli! ⚽🏆", likes: 523, type: "image" },
    { username: "basketbol.asa", avatar: "basketbolasa", image: "https://picsum.photos/seed/basketball1/600/600", caption: "Basket atışı yaptım! 🏀🎯", likes: 412, type: "image" },
    
    // Müzik ve Dans
    { username: "dans.show", avatar: "dansshow", image: "https://picsum.photos/seed/dance1/600/600", caption: "Yeni dans hareketim 💃✨", likes: 2156, type: "video" },
    { username: "renk.paleti", avatar: "renkpaleti", image: "https://picsum.photos/seed/paint1/600/600", caption: "Resim yapmayı seviyorum 🎨🖌️", likes: 387, type: "image" },
    { username: "muzik.dunyasi", avatar: "muzikdunyasi", image: "https://picsum.photos/seed/music1/600/600", caption: "Gitar çalmayı öğreniyorum 🎵🎸", likes: 498, type: "image" },
    
    // Doğa ve Dışarı
    { username: "plaj.keyfi", avatar: "plajkeyfi", image: "https://picsum.photos/seed/beach1/600/600", caption: "Deniz ve kumda oynamak 🏖️🌊", likes: 589, type: "image" },
    { username: "lunapark.eglence", avatar: "lunaparkeglence", image: "https://picsum.photos/seed/amusement1/600/600", caption: "Lunapark anıları! 🎡", likes: 1567, type: "video" },
    { username: "lunapark.macerasi", avatar: "lunaparkmacerasi", image: "https://picsum.photos/seed/amusement2/600/600", caption: "Lunapark çok eğlenceli! 🎡🎢", likes: 671, type: "image" },
    { username: "sirk.gozu", avatar: "sirkgozu", image: "https://picsum.photos/seed/circus1/600/600", caption: "Sirkte palyaçolar gördüm 🎪🤡", likes: 534, type: "image" },
    
    // Daha fazla içerik
    { username: "komik.anlar", avatar: "komikanlar", image: "https://picsum.photos/seed/funny1/600/600", caption: "Çok komik an! 😂", likes: 2341, type: "video" },
    { username: "hayvanat.bahcesi", avatar: "hayvanatbahcesi", image: "https://picsum.photos/seed/zoo1/600/600", caption: "Aslan görmeye gittik 🦁👀", likes: 612, type: "image" },
    { username: "akvaryum.balik", avatar: "akvaryumbalik", image: "https://picsum.photos/seed/fish1/600/600", caption: "Renkli balıklar yüzüyor 🐠🐟", likes: 456, type: "image" },
    { username: "cicek.bahcesi", avatar: "cicekbahcesi", image: "https://picsum.photos/seed/flowers1/600/600", caption: "Renkli çiçekler açmış 🌺🌸", likes: 423, type: "image" },
    { username: "skate.videolari", avatar: "skatevideolari", image: "https://picsum.photos/seed/skate1/600/600", caption: "Yeni trick! 🛹", likes: 1876, type: "video" }
];

// Ekran geçişleri
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Feed'i oluştur
function generateFeed() {
    const feedContainer = document.getElementById('feed-container');
    feedContainer.innerHTML = '';
    
    POSTS.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        
        // Video veya image content
        let mediaContent = '';
        if (post.type === 'video') {
            mediaContent = `
                <div class="post-video" data-post="${index}">
                    <img src="${post.image}" alt="Post" style="width: 100%; height: 100%; object-fit: cover;">
                    <div class="video-overlay" data-post="${index}">
                        <i class="fas fa-play-circle"></i>
                    </div>
                </div>
            `;
        } else {
            mediaContent = `
                <div class="post-image">
                    <img src="${post.image}" alt="Post" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
            `;
        }
        
        postDiv.innerHTML = `
            <div class="post-header">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${post.avatar}" alt="${post.username}">
                <span>${post.username}</span>
            </div>
            ${mediaContent}
            <div class="post-actions">
                <div class="actions-left">
                    <i class="far fa-heart like-btn" data-post="${index}"></i>
                    <i class="far fa-comment comment-btn" data-post="${index}"></i>
                    <i class="far fa-paper-plane share-btn"></i>
                </div>
                <i class="far fa-bookmark save-btn save-icon" data-post="${index}"></i>
            </div>
            <div class="post-likes" data-post="${index}">${formatNumber(post.likes)} beğeni</div>
            <div class="post-caption">
                <strong>${post.username}</strong> ${post.caption}
            </div>
            <div class="post-comments" data-post="${index}">
                <div class="comments-list-${index}"></div>
            </div>
            <div class="comment-input-container">
                <input type="text" placeholder="Yorum ekle..." class="comment-input" data-post="${index}" maxlength="100">
                <button class="comment-submit" data-post="${index}" disabled>Gönder</button>
            </div>
        `;
        feedContainer.appendChild(postDiv);
    });
    
    // Video overlay click handlers
    document.querySelectorAll('.video-overlay').forEach(overlay => {
        overlay.addEventListener('click', function() {
            this.classList.toggle('playing');
            // Video simülasyonu - gerçek videoda bu video.play() olurdu
        });
    });
    
    // Like butonları
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postIndex = this.dataset.post;
            this.classList.toggle('liked');
            this.classList.toggle('fas');
            this.classList.toggle('far');
            
            const likesElement = document.querySelector(`.post-likes[data-post="${postIndex}"]`);
            let likes = POSTS[postIndex].likes;
            if (this.classList.contains('liked')) {
                likes++;
            } else {
                likes--;
            }
            likesElement.textContent = `${formatNumber(likes)} beğeni`;
        });
    });
    
    // Kaydet butonları
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('saved');
            this.classList.toggle('fas');
            this.classList.toggle('far');
        });
    });
    
    // Yorum input'ları
    document.querySelectorAll('.comment-input').forEach(input => {
        input.addEventListener('input', function() {
            const submitBtn = document.querySelector(`.comment-submit[data-post="${this.dataset.post}"]`);
            submitBtn.disabled = this.value.trim() === '';
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                const submitBtn = document.querySelector(`.comment-submit[data-post="${this.dataset.post}"]`);
                submitBtn.click();
            }
        });
    });
    
    // Yorum gönder butonları
    document.querySelectorAll('.comment-submit').forEach(btn => {
        btn.addEventListener('click', function() {
            const postIndex = this.dataset.post;
            const input = document.querySelector(`.comment-input[data-post="${postIndex}"]`);
            const commentText = input.value.trim();
            
            if (commentText) {
                const commentsList = document.querySelector(`.comments-list-${postIndex}`);
                const commentDiv = document.createElement('div');
                commentDiv.className = 'post-comment';
                commentDiv.innerHTML = `<strong>sen</strong> ${commentText}`;
                commentsList.appendChild(commentDiv);
                
                input.value = '';
                this.disabled = true;
            }
        });
    });
}

// Hikaye overlay'i aç
function openStory(username, avatar) {
    const storyOverlay = document.getElementById('story-overlay');
    document.getElementById('story-avatar').src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar}`;
    document.getElementById('story-username').textContent = username;
    document.getElementById('story-image').src = `https://picsum.photos/400/700?random=${Math.random()}`;
    
    storyOverlay.classList.add('active');
    
    // 5 saniye sonra otomatik kapat
    setTimeout(() => {
        closeStory();
    }, 5000);
}

// Hikaye overlay'i kapat
function closeStory() {
    document.getElementById('story-overlay').classList.remove('active');
}

// Hikaye tıklama event'leri
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.story').forEach(story => {
        story.addEventListener('click', function() {
            const storyData = this.dataset.story;
            const username = this.querySelector('span').textContent;
            openStory(username, storyData);
        });
    });
    
    document.getElementById('story-close').addEventListener('click', closeStory);
});

// Ekran geçişleri
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Hoşgeldiniz Ekranı
document.getElementById('start-session').addEventListener('click', () => {
    const name = document.getElementById('participant-name').value.trim();
    const age = document.getElementById('participant-age').value;
    const sessionType = document.getElementById('session-type').value;
    const bullyingType = document.getElementById('bullying-type').value;
    
    if (!name || !age || !sessionType || !bullyingType) {
        alert('Lütfen tüm alanları doldurun!');
        return;
    }
    
    // Generate a unique participant ID based on timestamp
    currentSession.participantId = `P${Date.now()}`;
    currentSession.participantName = name;
    currentSession.participantAge = parseInt(age);
    currentSession.sessionType = sessionType;
    currentSession.currentBullyingType = bullyingType;
    currentSession.startTime = new Date();
    
    // Navigasyon becerisini başlangıçta true yap
    currentSession.skills.navigation = true;
    
    // Mesaj kuyruğunu hazırla
    const scenarios = SCENARIOS[sessionType][bullyingType];
    currentSession.messageQueue = scenarios;
    currentSession.currentMessageIndex = 0;
    
    showScreen('main-app');
    generateFeed(); // Feed'i oluştur
    
    // 10 saniye sonra ilk mesajı göster (bildirim olarak)
    currentSession.messageTimeout = setTimeout(() => {
        sendNextMessageNotification();
    }, 10000);
});

// Mesaj bildirimi göster
function sendNextMessageNotification() {
    if (currentSession.currentMessageIndex >= currentSession.messageQueue.length) {
        // Tüm mesajlar tamamlandı
        setTimeout(() => {
            showSummary();
        }, 2000);
        return;
    }
    
    currentSession.pendingMessages++;
    const badge = document.getElementById('message-badge');
    badge.textContent = currentSession.pendingMessages;
    badge.style.display = 'flex';
    
    // Bildirim sesini çal
    playNotificationSound();
}

// Mesaj ikonuna tıklandığında - Inbox'ı göster
document.getElementById('message-icon').addEventListener('click', () => {
    if (currentSession.pendingMessages > 0 || currentSession.messageQueue.length > 0) {
        showInbox();
    }
});

// Inbox ekranını göster
function showInbox() {
    showScreen('inbox-screen');
    renderInboxList();
}

// Inbox listesini oluştur
function renderInboxList() {
    const inboxList = document.getElementById('inbox-list');
    inboxList.innerHTML = '';
    
    // Her mesaj için bir inbox item oluştur
    currentSession.messageQueue.forEach((scenario, index) => {
        const isUnread = index >= currentSession.currentMessageIndex && currentSession.pendingMessages > 0;
        const isPast = index < currentSession.currentMessageIndex;
        
        // Sadece mevcut veya geçmiş mesajları göster
        if (index <= currentSession.currentMessageIndex || isPast) {
            const item = document.createElement('div');
            item.className = `inbox-item ${isUnread ? 'unread' : ''}`;
            item.dataset.index = index;
            
            // Mesaj önizlemesi için ilk mesajı al
            let previewText = '';
            if (scenario.messages && scenario.messages.length > 0) {
                previewText = scenario.messages[0].text || '';
                // Uzun mesajları kısalt
                if (previewText.length > 40) {
                    previewText = previewText.substring(0, 40) + '...';
                }
            }
            
            item.innerHTML = `
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}" alt="${scenario.sender}">
                <div class="inbox-item-content">
                    <div class="inbox-item-header">
                        <span class="inbox-sender">${scenario.sender}</span>
                        <span class="inbox-time">Şimdi</span>
                    </div>
                    <div class="inbox-message-preview">
                        ${isUnread ? '<span class="unread-dot"></span>' : ''}
                        ${previewText}
                    </div>
                </div>
            `;
            
            // Tıklama eventi
            item.addEventListener('click', () => {
                openConversationFromInbox(index);
            });
            
            inboxList.appendChild(item);
        }
    });
}

// Inbox'tan sohbet aç
function openConversationFromInbox(index) {
    currentSession.currentMessageIndex = index;
    const scenario = currentSession.messageQueue[index];
    
    // Badge'i güncelle
    if (currentSession.pendingMessages > 0) {
        currentSession.pendingMessages = Math.max(0, currentSession.pendingMessages - 1);
        const badge = document.getElementById('message-badge');
        if (currentSession.pendingMessages > 0) {
            badge.textContent = currentSession.pendingMessages;
        } else {
            badge.style.display = 'none';
        }
    }
    
    openSpecificDM(scenario);
}

// Inbox'tan ana sayfaya dön
document.getElementById('inbox-back-to-feed').addEventListener('click', () => {
    showScreen('main-app');
});

// Akademisyen Girişi
document.getElementById('admin-login').addEventListener('click', () => {
    showScreen('admin-login-screen');
});

document.getElementById('admin-back').addEventListener('click', () => {
    showScreen('welcome-screen');
});

document.getElementById('admin-submit').addEventListener('click', () => {
    const password = document.getElementById('admin-password').value;
    // Not: Bu şifre demo/tez amaçlı basit bir güvenlik katmanıdır
    // Gerçek üretim ortamında sunucu taraflı kimlik doğrulama kullanılmalıdır
    if (password === '06112002') {
        showScreen('admin-panel');
        loadAdminData();
    } else {
        alert('Yanlış şifre!');
    }
});

document.getElementById('logout').addEventListener('click', () => {
    showScreen('welcome-screen');
});

// Belirli bir DM'i aç
function openSpecificDM(scenario) {
    currentSession.currentScenario = scenario;
    currentSession.messageIndex = 0;
    
    // Mark reading skill as true
    currentSession.skills.reading = true;
    
    showScreen('dm-screen');
    
    document.getElementById('dm-username').textContent = scenario.sender;
    document.getElementById('dm-avatar').src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}`;
    
    document.getElementById('dm-messages').innerHTML = '';
    document.getElementById('dm-input-container').style.display = 'none';
    document.getElementById('action-buttons').style.display = 'none';
    document.getElementById('return-to-feed-container').style.display = 'none';
    
    // Send the message after a delay
    setTimeout(() => {
        sendMessage();
    }, 1000);
}

// Geri butonları
document.getElementById('back-to-inbox').addEventListener('click', () => {
    // Inbox'a dön
    showScreen('inbox-screen');
    renderInboxList();
});

// Mesaj gönder
function sendMessage() {
    const scenario = currentSession.currentScenario;
    const message = scenario.messages[currentSession.messageIndex];
    
    if (!message) {
        return;
    }
    
    currentSession.currentMessageStartTime = Date.now();
    
    const messagesContainer = document.getElementById('dm-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.type === 'cyberbullying' ? 'cyberbullying' : ''}`;
    
    messageDiv.innerHTML = `
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}" alt="Avatar" class="message-avatar">
        <div>
            <div class="message-content">${message.text}</div>
            <div class="message-time">${new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    if (message.type === 'safe') {
        // Güvenli mesaj - metin cevabı bekleniyor
        document.getElementById('dm-input-container').style.display = 'flex';
        document.getElementById('action-buttons').style.display = 'none';
    } else {
        // Siber zorbalık mesajı - aksiyon butonları
        document.getElementById('dm-input-container').style.display = 'none';
        document.getElementById('action-buttons').style.display = 'flex';
        
        // Butonları sıfırla
        currentSession.reportClicked = false;
        currentSession.blockClicked = false;
        currentSession.selectedComplaintReason = null;
        document.getElementById('report-btn').disabled = false;
        document.getElementById('block-btn').disabled = false;
        document.getElementById('report-btn').classList.remove('blink');
        document.getElementById('block-btn').classList.remove('blink');
        
        // 5 saniye sonra ipucu göster (sadece buton yanıp sönsün, metin YOK)
        currentSession.hintTimeout = setTimeout(() => {
            showHint();
        }, 5000);
    }
}

// Güvenli mesaja cevap gönder
document.getElementById('dm-send').addEventListener('click', () => {
    const input = document.getElementById('dm-input');
    const text = input.value.trim();
    
    if (!text) return;
    
    // Cevaplama becerisini true yap
    currentSession.skills.replying = true;
    
    const messagesContainer = document.getElementById('dm-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message sent';
    
    messageDiv.innerHTML = `
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" alt="You" class="message-avatar">
        <div>
            <div class="message-content">${text}</div>
            <div class="message-time">${new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    input.value = '';
    
    // Veri kaydet
    const reactionTime = (Date.now() - currentSession.currentMessageStartTime) / 1000;
    saveMessageData('safe', 'reply', reactionTime, false, true);
    
    currentSession.stats.correct++;
    
    // Input alanını gizle
    document.getElementById('dm-input-container').style.display = 'none';
    
    // Rastgele kapanış mesajı gönder
    setTimeout(() => {
        const closingMessages = [
            "Tamam anlaştık! Görüşürüz 👋",
            "Harika! Sonra konuşuruz 😊",
            "Süper! Görüşmek üzere ✌️",
            "Oldu! Sonra yazışırız 🙌",
            "Tamamdır! Hoşça kal 👋",
            "İyi günler! Görüşürüz 😊",
            "Harika, konuştuğumuz için teşekkürler! 🙏",
            "Tamam o zaman, hadi görüşürüz! 👋"
        ];
        const closingMessage = closingMessages[Math.floor(Math.random() * closingMessages.length)];
        const scenario = currentSession.currentScenario;
        
        const closingDiv = document.createElement('div');
        closingDiv.className = 'message';
        closingDiv.innerHTML = `
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}" alt="Avatar" class="message-avatar">
            <div>
                <div class="message-content">${closingMessage}</div>
                <div class="message-time">${new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
        `;
        
        messagesContainer.appendChild(closingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Kullanıcı doğal olarak geri tuşuna veya home'a basacak
        // "Ana Sayfaya Dön" butonu kaldırıldı
    }, 1000);
});

// Enter tuşu ile mesaj gönderme
document.getElementById('dm-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
        document.getElementById('dm-send').click();
    }
});

// Ana sayfaya dön (home icon click)
function returnToFeed() {
    showScreen('main-app');
    
    // Mesaj indeksini artır
    currentSession.currentMessageIndex++;
    
    // 10 saniye sonra sonraki mesajı gönder
    if (currentSession.currentMessageIndex < currentSession.messageQueue.length) {
        currentSession.messageTimeout = setTimeout(() => {
            sendNextMessageNotification();
        }, 10000);
    } else {
        // Tüm mesajlar tamamlandı
        setTimeout(() => {
            showSummary();
        }, 2000);
    }
}

// Thank you modal'ı kapat ve akışa devam et
document.getElementById('close-thank-you-modal').addEventListener('click', () => {
    document.getElementById('thank-you-modal').style.display = 'none';
    // Kullanıcı doğal olarak geri veya home tuşuyla dönecek
});

// Şikayet et butonu
document.getElementById('report-btn').addEventListener('click', () => {
    if (currentSession.hintTimeout) {
        clearTimeout(currentSession.hintTimeout);
    }
    
    // Önce engelle butonuna tıkladıysa sadece doğru butonu yanıp sönsün
    if (currentSession.blockClicked && !currentSession.reportClicked) {
        showWrongOrderHint('report');
        return;
    }
    
    // Şikayet nedeni modalını göster
    showComplaintReasonDialog();
});

// Engelle butonu
document.getElementById('block-btn').addEventListener('click', () => {
    if (currentSession.hintTimeout) {
        clearTimeout(currentSession.hintTimeout);
    }
    
    const hintUsed = document.getElementById('block-btn').classList.contains('blink');
    
    if (!currentSession.reportClicked) {
        // Önce şikayet etmeden engelleyemez - sadece doğru butonu yanıp sönsün
        showWrongOrderHint('block');
        return;
    }
    
    currentSession.blockClicked = true;
    currentSession.skills.blocking = true;
    
    document.getElementById('block-btn').disabled = true;
    document.getElementById('block-btn').classList.remove('blink');
    document.getElementById('action-buttons').style.display = 'none';
    
    const reactionTime = (Date.now() - currentSession.currentMessageStartTime) / 1000;
    saveMessageData('cyberbullying', 'block', reactionTime, hintUsed, true);
    
    currentSession.stats.correct++;
    
    // Teşekkür mesajını göster
    document.getElementById('thank-you-modal').style.display = 'flex';
});

// Yanlış sıra ipucu göster (sadece doğru buton yanıp sönecek, metin YOK)
function showWrongOrderHint(wrongButton) {
    let blinkButton = null;
    
    if (wrongButton === 'block') {
        blinkButton = document.getElementById('report-btn');
    } else if (wrongButton === 'report') {
        blinkButton = document.getElementById('block-btn');
    }
    
    if (blinkButton) {
        blinkButton.classList.add('blink');
        
        // 3 saniye sonra yanıp sönmeyi durdur
        setTimeout(() => {
            blinkButton.classList.remove('blink');
        }, 3000);
    }
}

// Şikayet nedeni seçim modalını göster
function showComplaintReasonDialog() {
    const modal = document.getElementById('complaint-modal');
    const reasonsContainer = document.getElementById('complaint-reasons');
    const scenario = currentSession.currentScenario;
    const message = scenario.messages[currentSession.messageIndex];
    const correctReason = message.complaintReason;
    
    // Nedenleri oluştur
    reasonsContainer.innerHTML = '';
    COMPLAINT_REASONS.forEach(reason => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'complaint-reason-option';
        optionDiv.dataset.reason = reason.id;
        
        optionDiv.innerHTML = `
            <input type="radio" name="complaint-reason" id="reason-${reason.id}" value="${reason.id}">
            <label for="reason-${reason.id}">${reason.label}</label>
        `;
        
        optionDiv.addEventListener('click', function() {
            // Radio button'ı seç
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Tüm seçeneklerin seçimini kaldır
            document.querySelectorAll('.complaint-reason-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Bu seçeneği seç
            this.classList.add('selected');
            
            // Gönder butonunu aktif et
            document.getElementById('submit-complaint').disabled = false;
            
            // Seçilen nedeni kaydet
            currentSession.selectedComplaintReason = reason.id;
        });
        
        reasonsContainer.appendChild(optionDiv);
    });
    
    // Modalı göster
    modal.style.display = 'flex';
    
    // 5 saniye sonra doğru cevabı yanıp söndür
    setTimeout(() => {
        if (!currentSession.selectedComplaintReason) {
            const correctOption = document.querySelector(`[data-reason="${correctReason}"]`);
            if (correctOption) {
                correctOption.classList.add('blink-hint');
                currentSession.stats.hints++;
            }
        }
    }, 5000);
}

// Şikayet gönder butonu
document.getElementById('submit-complaint').addEventListener('click', () => {
    const scenario = currentSession.currentScenario;
    const message = scenario.messages[currentSession.messageIndex];
    const correctReason = message.complaintReason;
    const selectedReason = currentSession.selectedComplaintReason;
    
    const hintUsed = document.querySelector('.complaint-reason-option.blink-hint') !== null;
    
    if (selectedReason === correctReason) {
        // Doğru seçim
        const correctOption = document.querySelector(`[data-reason="${correctReason}"]`);
        correctOption.classList.remove('blink-hint');
        correctOption.classList.add('correct');
        
        // Tik animasyonu göster
        setTimeout(() => {
            document.getElementById('complaint-modal').style.display = 'none';
            
            // Şikayet tamamlandı
            currentSession.reportClicked = true;
            currentSession.skills.reporting = true;
            
            document.getElementById('report-btn').disabled = true;
            document.getElementById('report-btn').classList.remove('blink');
            
            const reactionTime = (Date.now() - currentSession.currentMessageStartTime) / 1000;
            saveMessageData('cyberbullying', 'report', reactionTime, hintUsed, true);
            
            currentSession.stats.correct++;
            
            // Engelle butonunu yanıp söndür
            showNextStepHint('block');
        }, 500);
    } else {
        // Yanlış seçim - doğru cevabı göster
        const correctOption = document.querySelector(`[data-reason="${correctReason}"]`);
        const selectedOption = document.querySelector(`[data-reason="${selectedReason}"]`);
        
        // Seçilen seçeneğin seçimini kaldır
        if (selectedOption) {
            selectedOption.classList.remove('selected');
            selectedOption.querySelector('input[type="radio"]').checked = false;
        }
        
        // Doğru cevabı yanıp söndür
        if (correctOption) {
            correctOption.classList.add('blink-hint');
        }
        
        // Seçimi sıfırla
        currentSession.selectedComplaintReason = null;
        document.getElementById('submit-complaint').disabled = true;
        
        currentSession.stats.hints++;
    }
});

// İpucu göster (sadece butonlar yanıp sönsün, metin YOK)
function showHint() {
    const scenario = currentSession.currentScenario;
    const message = scenario.messages[currentSession.messageIndex];
    
    if (message.type !== 'cyberbullying') return;
    
    currentSession.stats.hints++;
    
    let blinkButton = null;
    
    if (!currentSession.reportClicked) {
        blinkButton = document.getElementById('report-btn');
    } else if (!currentSession.blockClicked) {
        blinkButton = document.getElementById('block-btn');
    }
    
    if (blinkButton) {
        blinkButton.classList.add('blink');
    }
}

// Sonraki adım ipucu (sadece buton yanıp sönecek, metin YOK)
function showNextStepHint(step) {
    setTimeout(() => {
        let blinkButton = null;
        
        if (step === 'block') {
            blinkButton = document.getElementById('block-btn');
        }
        
        if (blinkButton) {
            blinkButton.classList.add('blink');
            
            // 5 saniye sonra yanıp sönmeyi durdur
            setTimeout(() => {
                blinkButton.classList.remove('blink');
            }, 5000);
        }
    }, 2000);
}

// Veri kaydet
function saveMessageData(messageType, action, reactionTime, hintUsed, correct) {
    const data = {
        participantId: currentSession.participantId,
        participantName: currentSession.participantName,
        participantAge: currentSession.participantAge,
        sessionType: currentSession.sessionType,
        sessionLabel: SESSION_LABELS[currentSession.sessionType],
        bullyingType: currentSession.currentBullyingType,
        bullyingLabel: BULLYING_TYPE_LABELS[currentSession.currentBullyingType],
        messageType: messageType,
        action: action,
        reactionTime: reactionTime.toFixed(2),
        hintUsed: hintUsed,
        correct: correct,
        timestamp: new Date().toISOString()
    };
    
    currentSession.sessionData.push(data);
    
    // LocalStorage'a kaydet
    const allData = JSON.parse(localStorage.getItem('siberguven_data') || '[]');
    allData.push(data);
    localStorage.setItem('siberguven_data', JSON.stringify(allData));
}

// Özet ekranını göster
function showSummary() {
    document.getElementById('correct-count').textContent = currentSession.stats.correct;
    document.getElementById('wrong-count').textContent = currentSession.stats.wrong;
    document.getElementById('hint-count').textContent = currentSession.stats.hints;
    
    // Becerileri göster
    document.getElementById('skill-navigation').textContent = currentSession.skills.navigation ? '✓' : '✗';
    document.getElementById('skill-navigation').className = currentSession.skills.navigation ? 'skill-positive' : 'skill-negative';
    
    document.getElementById('skill-reading').textContent = currentSession.skills.reading ? '✓' : '✗';
    document.getElementById('skill-reading').className = currentSession.skills.reading ? 'skill-positive' : 'skill-negative';
    
    document.getElementById('skill-replying').textContent = currentSession.skills.replying ? '✓' : '✗';
    document.getElementById('skill-replying').className = currentSession.skills.replying ? 'skill-positive' : 'skill-negative';
    
    document.getElementById('skill-reporting').textContent = currentSession.skills.reporting ? '✓' : '✗';
    document.getElementById('skill-reporting').className = currentSession.skills.reporting ? 'skill-positive' : 'skill-negative';
    
    document.getElementById('skill-blocking').textContent = currentSession.skills.blocking ? '✓' : '✗';
    document.getElementById('skill-blocking').className = currentSession.skills.blocking ? 'skill-positive' : 'skill-negative';
    
    showScreen('summary-screen');
}

// Bitir butonu
document.getElementById('finish-session').addEventListener('click', () => {
    // Zamanlayıcıları temizle
    if (currentSession.messageTimeout) {
        clearTimeout(currentSession.messageTimeout);
    }
    if (currentSession.hintTimeout) {
        clearTimeout(currentSession.hintTimeout);
    }
    
    // Tüm verileri sıfırla
    currentSession = {
        sessionType: "",
        participantId: "",
        participantName: "",
        participantAge: 0,
        startTime: null,
        currentBullyingType: null,
        currentScenario: null,
        messageIndex: 0,
        sessionData: [],
        skills: {
            navigation: false,
            reading: false,
            replying: false,
            reporting: false,
            blocking: false
        },
        stats: {
            correct: 0,
            wrong: 0,
            hints: 0
        },
        currentMessageStartTime: null,
        hintTimeout: null,
        messageTimeout: null,
        reportClicked: false,
        blockClicked: false,
        pendingMessages: 0,
        messageQueue: [],
        currentMessageIndex: 0,
        selectedComplaintReason: null
    };
    
    showScreen('welcome-screen');
});

// Akademisyen Panel Fonksiyonları
function loadAdminData() {
    const allData = JSON.parse(localStorage.getItem('siberguven_data') || '[]');
    displayAdminData(allData);
}

function displayAdminData(data) {
    const container = document.getElementById('data-display');
    
    if (data.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">Henüz veri bulunmuyor.</p>';
        return;
    }
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Katılımcı ID</th>
                    <th>Ad</th>
                    <th>Yaş</th>
                    <th>Oturum</th>
                    <th>Zorbalık Türü</th>
                    <th>Mesaj Türü</th>
                    <th>Aksiyon</th>
                    <th>Tepki Süresi (sn)</th>
                    <th>İpucu</th>
                    <th>Doğru</th>
                    <th>Tarih/Saat</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.forEach(item => {
        html += `
            <tr>
                <td>${item.participantId}</td>
                <td>${item.participantName}</td>
                <td>${item.participantAge}</td>
                <td>${item.sessionLabel}</td>
                <td>${item.bullyingLabel}</td>
                <td>${item.messageType}</td>
                <td>${item.action}</td>
                <td>${item.reactionTime}</td>
                <td>${item.hintUsed ? 'Evet' : 'Hayır'}</td>
                <td>${item.correct ? '✓' : '✗'}</td>
                <td>${new Date(item.timestamp).toLocaleString('tr-TR')}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Filtreleme
document.getElementById('filter-session').addEventListener('change', applyFilters);
document.getElementById('filter-type').addEventListener('change', applyFilters);

function applyFilters() {
    const sessionFilter = document.getElementById('filter-session').value;
    const typeFilter = document.getElementById('filter-type').value;
    
    let allData = JSON.parse(localStorage.getItem('siberguven_data') || '[]');
    
    if (sessionFilter) {
        allData = allData.filter(item => item.sessionType === sessionFilter);
    }
    
    if (typeFilter) {
        allData = allData.filter(item => item.bullyingType === typeFilter);
    }
    
    displayAdminData(allData);
}

// Excel'e Aktar
document.getElementById('export-excel').addEventListener('click', () => {
    const allData = JSON.parse(localStorage.getItem('siberguven_data') || '[]');
    
    if (allData.length === 0) {
        alert('Dışa aktarılacak veri bulunmuyor!');
        return;
    }
    
    // CSV formatında oluştur
    let csv = 'Katılımcı ID,Ad,Yaş,Oturum,Zorbalık Türü,Mesaj Türü,Aksiyon,Tepki Süresi (sn),İpucu,Doğru,Tarih/Saat\n';
    
    allData.forEach(item => {
        csv += `${item.participantId},${item.participantName},${item.participantAge},${item.sessionLabel},${item.bullyingLabel},${item.messageType},${item.action},${item.reactionTime},${item.hintUsed ? 'Evet' : 'Hayır'},${item.correct ? 'Evet' : 'Hayır'},${new Date(item.timestamp).toLocaleString('tr-TR')}\n`;
    });
    
    // Dosyayı indir - BOM (Byte Order Mark) karakteri Türkçe karakterlerin Excel'de doğru görünmesi için eklenir
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `siberguven_veriler_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Verileri Temizle
document.getElementById('clear-data').addEventListener('click', () => {
    if (confirm('Tüm verileri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
        localStorage.removeItem('siberguven_data');
        loadAdminData();
        alert('Tüm veriler temizlendi!');
    }
});

// Alt navigasyon butonları
document.addEventListener('DOMContentLoaded', () => {
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        const icons = bottomNav.querySelectorAll('i[data-nav]');
        icons.forEach((icon) => {
            icon.addEventListener('click', () => {
                // Aktif durumu güncelle
                document.querySelectorAll('.bottom-nav i').forEach(i => i.classList.remove('active'));
                icon.classList.add('active');
                
                const navType = icon.dataset.nav;
                
                // Navigasyon becerisini true yap
                if (currentSession.sessionType) {
                    currentSession.skills.navigation = true;
                }
                
                // Ekran geçişleri
                switch(navType) {
                    case 'home':
                        returnToFeed();
                        break;
                    case 'reels':
                        showReels();
                        break;
                    case 'search':
                    case 'likes':
                    case 'profile':
                        // Bu özellikler demo için devre dışı
                        break;
                }
            });
        });
    }
});

// Reels ekranını göster
function showReels() {
    showScreen('reels-screen');
    generateReels();
}

// Reels içeriğini oluştur
function generateReels() {
    const reelsScroll = document.getElementById('reels-scroll');
    if (reelsScroll.children.length > 0) return; // Zaten oluşturulmuş
    
    const reelsData = [
        { username: "spor.klipler", avatar: "sporklipler", image: "https://picsum.photos/seed/sports1/600/1067", caption: "Harika gol! ⚽🔥", likes: 1234 },
        { username: "komik.anlar", avatar: "komikanlar", image: "https://picsum.photos/seed/funny1/600/1067", caption: "Çok komik ya 😂😂", likes: 2341 },
        { username: "dans.videolari", avatar: "dansvideolari", image: "https://picsum.photos/seed/dance1/600/1067", caption: "Bu dans hareketi çok güzel 💃", likes: 3456 },
        { username: "oyun.dunyasi", avatar: "oyundunyasi", image: "https://picsum.photos/seed/game1/600/1067", caption: "En iyi oyun anları! 🎮", likes: 4567 },
        { username: "muzik.cover", avatar: "muzikcover", image: "https://picsum.photos/seed/music1/600/1067", caption: "Bu şarkıyı cover yaptım 🎵", likes: 5678 },
        { username: "skate.tricks", avatar: "skatetricks", image: "https://picsum.photos/seed/skate1/600/1067", caption: "Yeni trick öğrendim! 🛹", likes: 3421 },
        { username: "sanat.dunyasi", avatar: "sanatdunyasi", image: "https://picsum.photos/seed/art1/600/1067", caption: "Bu resmi çizdim 🎨", likes: 2987 },
        { username: "yemek.tarifleri", avatar: "yemektarifleri", image: "https://picsum.photos/seed/food1/600/1067", caption: "Kolay pasta tarifi! 🍰", likes: 5432 }
    ];
    
    reelsData.forEach(reel => {
        const reelDiv = document.createElement('div');
        reelDiv.className = 'reel';
        reelDiv.innerHTML = `
            <img src="${reel.image}" alt="Reel">
            <div class="reel-overlay">
                <div class="reel-user">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${reel.avatar}" alt="${reel.username}">
                    <span class="reel-username">${reel.username}</span>
                </div>
                <div class="reel-caption">${reel.caption}</div>
            </div>
            <div class="reel-actions">
                <div class="reel-action like-reel">
                    <i class="far fa-heart"></i>
                    <span>${formatNumber(reel.likes)}</span>
                </div>
                <div class="reel-action">
                    <i class="far fa-comment"></i>
                    <span>89</span>
                </div>
                <div class="reel-action">
                    <i class="far fa-paper-plane"></i>
                </div>
                <div class="reel-action">
                    <i class="fas fa-ellipsis-v"></i>
                </div>
            </div>
        `;
        reelsScroll.appendChild(reelDiv);
        
        // Like functionality
        const likeBtn = reelDiv.querySelector('.like-reel');
        likeBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            this.classList.toggle('liked');
        });
    });
}

// Format numbers (1234 -> 1.2K)
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
