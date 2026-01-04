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
    pendingMessages: 0
};

// Feed için gönderi verileri - Çocuk dostu içerikler
const POSTS = [
    // Hayvanlar
    { username: "sevimli.kedicik", avatar: "sevimlikedicik", image: "https://picsum.photos/seed/cat1/600/600", caption: "Minnoş kedim uyuyor 🐱💤", likes: 342 },
    { username: "kopek.dostu", avatar: "kopekdostu", image: "https://picsum.photos/seed/dog1/600/600", caption: "Yavru köpeğim çok oyuncu! 🐕🎾", likes: 521 },
    { username: "tavsan.cicek", avatar: "tavsancicek", image: "https://picsum.photos/seed/rabbit1/600/600", caption: "Tavşanım havuç yiyor 🐰🥕", likes: 398 },
    { username: "kelebek.bahcesi", avatar: "kelebekbahcesi", image: "https://picsum.photos/seed/butterfly1/600/600", caption: "Renkli kelebekler çok güzel! 🦋✨", likes: 467 },
    
    // Renkler ve Eğlence
    { username: "gokkusagi.dunyasi", avatar: "gokkusagidunyasi", image: "https://picsum.photos/seed/rainbow1/600/600", caption: "Gökkuşağı çok renkli 🌈☀️", likes: 612 },
    { username: "balon.partisi", avatar: "balonpartisi", image: "https://picsum.photos/seed/balloons1/600/600", caption: "Renkli balonlarla parti! 🎈🎉", likes: 489 },
    { username: "pasta.dunyasi", avatar: "pastadunyasi", image: "https://picsum.photos/seed/cake1/600/600", caption: "Doğum günü pastası hazır 🎂🎊", likes: 576 },
    { username: "dondurma.keyfi", avatar: "dondurmakeyfi", image: "https://picsum.photos/seed/icecream1/600/600", caption: "Çikolatalı dondurma en sevdiğim! 🍦😋", likes: 634 },
    
    // Oyunlar ve Sporlar
    { username: "oyun.zamani", avatar: "oyunzamani", image: "https://picsum.photos/seed/game1/600/600", caption: "Yeni oyunum çok eğlenceli 🎮🕹️", likes: 445 },
    { username: "futbol.yildizi", avatar: "futbolyildizi", image: "https://picsum.photos/seed/soccer1/600/600", caption: "Futbol oynamak çok keyifli! ⚽🏆", likes: 523 },
    { username: "basketbol.asa", avatar: "basketbolasa", image: "https://picsum.photos/seed/basketball1/600/600", caption: "Basket atışı yaptım! 🏀🎯", likes: 412 },
    
    // Sanat ve Müzik
    { username: "renk.paleti", avatar: "renkpaleti", image: "https://picsum.photos/seed/paint1/600/600", caption: "Resim yapmayı seviyorum 🎨🖌️", likes: 387 },
    { username: "muzik.dunyasi", avatar: "muzikdunyasi", image: "https://picsum.photos/seed/music1/600/600", caption: "Gitar çalmayı öğreniyorum 🎵🎸", likes: 498 },
    
    // Doğa ve Dışarı
    { username: "plaj.keyfi", avatar: "plajkeyfi", image: "https://picsum.photos/seed/beach1/600/600", caption: "Deniz ve kumda oynamak 🏖️🌊", likes: 589 },
    { username: "lunapark.macerasi", avatar: "lunaparkmacerasi", image: "https://picsum.photos/seed/amusement1/600/600", caption: "Lunapark çok eğlenceli! 🎡🎢", likes: 671 },
    { username: "sirk.gozu", avatar: "sirkgozu", image: "https://picsum.photos/seed/circus1/600/600", caption: "Sirkte palyaçolar gördüm 🎪🤡", likes: 534 },
    { username: "hayvanat.bahcesi", avatar: "hayvanatbahcesi", image: "https://picsum.photos/seed/zoo1/600/600", caption: "Aslan görmeye gittik 🦁👀", likes: 612 },
    { username: "akvaryum.balik", avatar: "akvaryumbalik", image: "https://picsum.photos/seed/fish1/600/600", caption: "Renkli balıklar yüzüyor 🐠🐟", likes: 456 },
    { username: "cicek.bahcesi", avatar: "cicekbahcesi", image: "https://picsum.photos/seed/flowers1/600/600", caption: "Renkli çiçekler açmış 🌺🌸", likes: 423 },
    { username: "orman.yuruyusu", avatar: "ormanyuruyusu", image: "https://picsum.photos/seed/forest1/600/600", caption: "Ormanda yürüyüş yaptık 🌳🌲", likes: 389 },
    
    // Daha fazla çeşitlilik
    { username: "kedi.dostum", avatar: "kedidostum", image: "https://picsum.photos/seed/cat2/600/600", caption: "Kedim çok sevimli 🐱❤️", likes: 445 },
    { username: "kopek.sevgisi", avatar: "kopeksevgisi", image: "https://picsum.photos/seed/dog2/600/600", caption: "Köpeklerle oynamak harika 🐕💕", likes: 512 },
    { username: "pamuk.tavsan", avatar: "pamuktavsan", image: "https://picsum.photos/seed/rabbit2/600/600", caption: "Pamuk gibi beyaz tavşan 🐰☁️", likes: 367 },
    { username: "cicek.kelebek", avatar: "cicekkelebek", image: "https://picsum.photos/seed/butterfly2/600/600", caption: "Kelebekler çiçeklerde 🦋🌼", likes: 421 },
    { username: "rengarenk.dunya", avatar: "rengarenkdunya", image: "https://picsum.photos/seed/rainbow2/600/600", caption: "Her yer renkli ve güzel 🌈🎨", likes: 498 },
    { username: "parti.zamani", avatar: "partizamani", image: "https://picsum.photos/seed/party1/600/600", caption: "Doğum günü partisindeyiz 🎈🎁", likes: 567 },
    { username: "tatli.pasta", avatar: "tatlipasta", image: "https://picsum.photos/seed/cake2/600/600", caption: "Çilekli pasta çok lezzetli 🍰🍓", likes: 489 },
    { username: "meyveli.dondurma", avatar: "meyvelidondurma", image: "https://picsum.photos/seed/icecream2/600/600", caption: "Çilek ve vanilyalı dondurma 🍦🍨", likes: 523 },
    { username: "video.oyunlari", avatar: "videooyunlari", image: "https://picsum.photos/seed/game2/600/600", caption: "Arkadaşlarla oyun oynuyoruz 🎮👾", likes: 478 },
    { username: "gol.krali", avatar: "golkrali", image: "https://picsum.photos/seed/soccer2/600/600", caption: "Bugün gol attım! ⚽🎉", likes: 534 },
    { username: "potayi.buldum", avatar: "potayibuldum", image: "https://picsum.photos/seed/basketball2/600/600", caption: "Üç sayı attım 🏀🔥", likes: 456 },
    { username: "kucuk.ressam", avatar: "kucukressam", image: "https://picsum.photos/seed/paint2/600/600", caption: "Renkli resim yaptım 🎨🖼️", likes: 398 },
    { username: "piyano.dersi", avatar: "pianodersi", image: "https://picsum.photos/seed/music2/600/600", caption: "Piyano çalmayı öğreniyorum 🎹🎶", likes: 467 },
    { username: "kumda.oyun", avatar: "kumdaoyun", image: "https://picsum.photos/seed/beach2/600/600", caption: "Kumdan kale yaptık 🏖️🏰", likes: 512 },
    { username: "eglence.park", avatar: "eglencepark", image: "https://picsum.photos/seed/amusement2/600/600", caption: "Dönme dolap çok yüksek! 🎡😄", likes: 589 }
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
        postDiv.innerHTML = `
            <div class="post-header">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${post.avatar}" alt="${post.username}">
                <span>${post.username}</span>
            </div>
            <div class="post-image">
                <img src="${post.image}" alt="Post" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="post-actions">
                <div class="actions-left">
                    <i class="far fa-heart like-btn" data-post="${index}"></i>
                    <i class="far fa-comment comment-btn" data-post="${index}"></i>
                    <i class="far fa-paper-plane share-btn"></i>
                </div>
                <i class="far fa-bookmark save-btn save-icon" data-post="${index}"></i>
            </div>
            <div class="post-likes" data-post="${index}">${post.likes} beğeni</div>
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
    
    // Like butonları
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const postIndex = this.dataset.post;
            this.classList.toggle('liked');
            this.classList.toggle('fas');
            this.classList.toggle('far');
            
            const likesElement = document.querySelector(`.post-likes[data-post="${postIndex}"]`);
            let likes = parseInt(likesElement.textContent);
            if (this.classList.contains('liked')) {
                likes++;
            } else {
                likes--;
            }
            likesElement.textContent = `${likes} beğeni`;
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
    
    showScreen('main-app');
    generateFeed(); // Feed'i oluştur
    
    // 10 saniye sonra ilk mesajı göster (bildirim olarak)
    setTimeout(() => {
        showMessageNotification();
    }, 10000);
});

// Mesaj bildirimi göster
function showMessageNotification() {
    currentSession.pendingMessages++;
    const badge = document.getElementById('message-badge');
    badge.textContent = currentSession.pendingMessages;
    badge.style.display = 'flex';
}

// Mesaj ikonuna tıklandığında
document.getElementById('message-icon').addEventListener('click', () => {
    if (currentSession.pendingMessages > 0) {
        currentSession.pendingMessages = 0;
        document.getElementById('message-badge').style.display = 'none';
        startFirstScenario();
    }
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

// İlk senaryoyu başlat
function startFirstScenario() {
    // Get all scenarios for the selected bullying type
    const scenarios = SCENARIOS[currentSession.sessionType][currentSession.currentBullyingType];
    
    // Open message inbox
    openMessageInbox(scenarios);
}

// Mesaj inbox'ı aç
function openMessageInbox(scenarios) {
    showScreen('dm-screen');
    
    // Clear DM screen
    document.getElementById('dm-messages').innerHTML = '';
    document.getElementById('dm-input-container').style.display = 'none';
    document.getElementById('action-buttons').style.display = 'none';
    
    // Show inbox header
    document.getElementById('dm-username').textContent = 'Mesajlar';
    document.getElementById('dm-avatar').src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=inbox';
    
    // Create message list
    const messagesContainer = document.getElementById('dm-messages');
    messagesContainer.innerHTML = '<div class="inbox-list"></div>';
    const inboxList = messagesContainer.querySelector('.inbox-list');
    
    scenarios.forEach((scenario, index) => {
        const messagePreview = document.createElement('div');
        messagePreview.className = 'inbox-item unread';
        messagePreview.innerHTML = `
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}" alt="${scenario.sender}">
            <div class="inbox-item-content">
                <div class="inbox-item-header">
                    <span class="inbox-sender">${scenario.sender}</span>
                    <span class="unread-indicator">●</span>
                </div>
                <div class="inbox-message-preview">${scenario.messages[0].text.substring(0, 50)}...</div>
            </div>
        `;
        
        messagePreview.addEventListener('click', () => {
            currentSession.currentScenarioIndex = index;
            openSpecificDM(scenario, index, scenarios);
        });
        
        inboxList.appendChild(messagePreview);
    });
    
    // Mark reading skill as true
    currentSession.skills.reading = true;
}

// Belirli bir DM'i aç
function openSpecificDM(scenario, scenarioIndex, allScenarios) {
    currentSession.currentScenario = scenario;
    currentSession.messageIndex = 0;
    currentSession.allScenarios = allScenarios;
    currentSession.currentScenarioIndex = scenarioIndex;
    
    document.getElementById('dm-username').textContent = scenario.sender;
    document.getElementById('dm-avatar').src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}`;
    
    document.getElementById('dm-messages').innerHTML = '';
    
    // Send the message after a delay
    setTimeout(() => {
        sendMessage();
    }, 1000);
}

// Geri butonları
document.getElementById('back-to-feed').addEventListener('click', () => {
    // If we're in a specific DM, go back to inbox
    if (currentSession.allScenarios) {
        openMessageInbox(currentSession.allScenarios);
    } else {
        showScreen('main-app');
    }
});

// Mesaj gönder
function sendMessage() {
    const scenario = currentSession.currentScenario;
    const message = scenario.messages[currentSession.messageIndex];
    
    if (!message) {
        // Bu kişiden daha fazla mesaj yok, sonraki kişiye geç
        nextPerson();
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
        
        // Butonları sıfırla - HER İKİ BUTON DA AKTİF BAŞLIYOR
        currentSession.reportClicked = false;
        currentSession.blockClicked = false;
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
    
    // Sonraki kişiye geç
    nextPerson();
});

// Sonraki kişiye geç
function nextPerson() {
    if (!currentSession.allScenarios) {
        // Eğer allScenarios yoksa, tüm session bitti
        showSummary();
        return;
    }
    
    const nextIndex = currentSession.currentScenarioIndex + 1;
    
    if (nextIndex < currentSession.allScenarios.length) {
        // Sonraki kişiye geç
        setTimeout(() => {
            openMessageInbox(currentSession.allScenarios);
        }, 2000);
    } else {
        // Bu zorbalık türü bitti, oturum tamamlandı
        setTimeout(() => {
            showSummary();
        }, 2000);
    }
}

// Şikayet et butonu
document.getElementById('report-btn').addEventListener('click', () => {
    if (currentSession.hintTimeout) {
        clearTimeout(currentSession.hintTimeout);
    }
    
    const hintUsed = document.getElementById('report-btn').classList.contains('blink');
    
    // Önce engelle butonuna tıkladıysa sadece doğru butonu yanıp sönsün
    if (currentSession.blockClicked && !currentSession.reportClicked) {
        showWrongOrderHint('report');
        return;
    }
    
    currentSession.reportClicked = true;
    currentSession.skills.reporting = true;
    
    document.getElementById('report-btn').disabled = true;
    document.getElementById('report-btn').classList.remove('blink');
    
    const reactionTime = (Date.now() - currentSession.currentMessageStartTime) / 1000;
    saveMessageData('cyberbullying', 'report', reactionTime, hintUsed, true);
    
    currentSession.stats.correct++;
    
    // Şimdi engelle butonunu yanıp söndür
    showNextStepHint('block');
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
    
    const reactionTime = (Date.now() - currentSession.currentMessageStartTime) / 1000;
    saveMessageData('cyberbullying', 'block', reactionTime, hintUsed, true);
    
    currentSession.stats.correct++;
    
    // Mesaj tamamlandı, sonraki kişiye geç
    nextPerson();
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
        pendingMessages: 0
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
        const icons = bottomNav.querySelectorAll('i');
        icons.forEach((icon, index) => {
            icon.addEventListener('click', () => {
                // Aktif durumu güncelle
                icons.forEach(i => i.classList.remove('active'));
                icon.classList.add('active');
                
                // Navigasyon becerisini true yap
                if (currentSession.sessionType) {
                    currentSession.skills.navigation = true;
                }
            });
        });
    }
});
