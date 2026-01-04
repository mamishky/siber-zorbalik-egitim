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

// Feed için gönderi verileri
const POSTS = [
    { username: "ali.yilmaz", avatar: "aliyilmaz", image: "https://picsum.photos/600/600?random=1", caption: "Bugün harika bir gün! 🌟", likes: 245 },
    { username: "ayse.demir", avatar: "aysedemir", image: "https://picsum.photos/600/600?random=2", caption: "Doğa yürüyüşü çok keyifliydi 🌲", likes: 189 },
    { username: "mehmet.kaya", avatar: "mehmetkaya", image: "https://picsum.photos/600/600?random=3", caption: "Yeni hobim fotoğrafçılık 📸", likes: 332 },
    { username: "zeynep.ozturk", avatar: "zeynepozturk", image: "https://picsum.photos/600/600?random=4", caption: "Güneşli bir gün ☀️", likes: 421 },
    { username: "cem.yildiz", avatar: "cemyildiz", image: "https://picsum.photos/600/600?random=5", caption: "Spor sonrası kendimi harika hissediyorum 💪", likes: 276 },
    { username: "selin.yildirim", avatar: "selinyildirim", image: "https://picsum.photos/600/600?random=6", caption: "Kahve molası ☕️", likes: 198 },
    { username: "can.yilmaz", avatar: "canyilmaz", image: "https://picsum.photos/600/600?random=7", caption: "Yeni kitabımı okuyorum 📚", likes: 145 },
    { username: "gizem.sen", avatar: "gizemsen", image: "https://picsum.photos/600/600?random=8", caption: "Güzel bir akşam yemeği 🍝", likes: 389 },
    { username: "tarik.barkan", avatar: "tarikbarkan", image: "https://picsum.photos/600/600?random=9", caption: "Konserde muhteşem bir gece 🎵", likes: 512 },
    { username: "aleyna.tilkici", avatar: "aleynatilkici", image: "https://picsum.photos/600/600?random=10", caption: "Sanat galerisinde 🎨", likes: 298 },
    { username: "berk.ozturk", avatar: "berkozturk", image: "https://picsum.photos/600/600?random=11", caption: "Bisiklet turu harika geçti 🚴", likes: 223 },
    { username: "nadise.guzel", avatar: "nadiseguzel", image: "https://picsum.photos/600/600?random=12", caption: "Günbatımı manzarası 🌅", likes: 467 },
    { username: "barkan.tas", avatar: "barkantas", image: "https://picsum.photos/600/600?random=13", caption: "Yeni projem heyecan verici! 💻", likes: 178 },
    { username: "hadide.kaya", avatar: "hadidekaya", image: "https://picsum.photos/600/600?random=14", caption: "Müzik yapmak ruhu dinlendiriyor 🎸", likes: 345 },
    { username: "murat.demirtas", avatar: "muratdemirtas", image: "https://picsum.photos/600/600?random=15", caption: "Parkta güzel bir gün 🌳", likes: 201 },
    { username: "aleyda.tilki", avatar: "aleydatilki", image: "https://picsum.photos/600/600?random=16", caption: "Yeni elbisem çok güzel 👗", likes: 534 },
    { username: "arda.turan", avatar: "ardaturan", image: "https://picsum.photos/600/600?random=17", caption: "Futbol oynamayı çok seviyorum ⚽️", likes: 412 },
    { username: "ece.demir", avatar: "ecedemir", image: "https://picsum.photos/600/600?random=18", caption: "Çiçekler açmış 🌸", likes: 267 },
    { username: "deniz.akar", avatar: "denizakar", image: "https://picsum.photos/600/600?random=19", caption: "Deniz kenarında huzur 🌊", likes: 398 },
    { username: "burak.ozkan", avatar: "burakozkan", image: "https://picsum.photos/600/600?random=20", caption: "Arkadaşlarla harika bir gün 🎉", likes: 289 },
    { username: "merve.karatas", avatar: "mervekaratas", image: "https://picsum.photos/600/600?random=21", caption: "Yeni pastam çok lezzetli 🍰", likes: 356 },
    { username: "tolga.aydin", avatar: "tolgaaydin", image: "https://picsum.photos/600/600?random=22", caption: "Dağ yürüyüşü manzarası 🏔️", likes: 423 }
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
    const id = document.getElementById('participant-id').value.trim();
    const name = document.getElementById('participant-name').value.trim();
    const age = document.getElementById('participant-age').value;
    const sessionType = document.getElementById('session-type').value;
    
    if (!id || !name || !age) {
        alert('Lütfen tüm alanları doldurun!');
        return;
    }
    
    currentSession.participantId = id;
    currentSession.participantName = name;
    currentSession.participantAge = parseInt(age);
    currentSession.sessionType = sessionType;
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
    if (password === 'akademisyen2024') {
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
    const bullyingTypes = BULLYING_TYPES;
    currentSession.currentBullyingType = bullyingTypes[0];
    currentSession.currentScenario = SCENARIOS[currentSession.sessionType][currentSession.currentBullyingType][0];
    currentSession.messageIndex = 0;
    
    openDMScreen();
}

// DM ekranını aç
function openDMScreen() {
    const scenario = currentSession.currentScenario;
    
    document.getElementById('dm-username').textContent = scenario.sender;
    document.getElementById('dm-avatar').src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}`;
    
    document.getElementById('dm-messages').innerHTML = '';
    
    showScreen('dm-screen');
    
    // Okuma becerisini true yap
    currentSession.skills.reading = true;
    
    // İlk mesajı gönder
    setTimeout(() => {
        sendMessage();
    }, 1000);
}

// Geri butonları
document.getElementById('back-to-feed').addEventListener('click', () => {
    showScreen('main-app');
});

// Mesaj gönder
function sendMessage() {
    const scenario = currentSession.currentScenario;
    const message = scenario.messages[currentSession.messageIndex];
    
    if (!message) {
        // Senaryo bitti, sonrakine geç
        nextScenario();
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
        
        // 5 saniye sonra ipucu göster
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
    
    // 10 saniye sonra sonraki mesaj
    currentSession.messageIndex++;
    setTimeout(() => {
        sendMessage();
    }, 10000);
});

// Şikayet et butonu
document.getElementById('report-btn').addEventListener('click', () => {
    if (currentSession.hintTimeout) {
        clearTimeout(currentSession.hintTimeout);
    }
    
    const hintUsed = document.getElementById('hint-overlay').style.display === 'flex';
    document.getElementById('hint-overlay').style.display = 'none';
    
    // Önce engelle butonuna tıkladıysa uyarı göster
    if (currentSession.blockClicked && !currentSession.reportClicked) {
        document.getElementById('hint-overlay').style.display = 'none';
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
    
    // İpucu göster: Şimdi engelle
    showNextStepHint('block');
});

// Engelle butonu
document.getElementById('block-btn').addEventListener('click', () => {
    if (currentSession.hintTimeout) {
        clearTimeout(currentSession.hintTimeout);
    }
    
    const hintUsed = document.getElementById('hint-overlay').style.display === 'flex';
    document.getElementById('hint-overlay').style.display = 'none';
    
    if (!currentSession.reportClicked) {
        // Önce şikayet etmeden engelleyemez - yanlış sıra
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
    
    // Mesaj tamamlandı, sonraki mesaja geç
    currentSession.messageIndex++;
    setTimeout(() => {
        sendMessage();
    }, 2000);
});

// Yanlış sıra ipucu göster
function showWrongOrderHint(wrongButton) {
    let hintText = '';
    let blinkButton = null;
    
    if (wrongButton === 'block') {
        hintText = 'Önce şikayet etmelisin! ŞİKAYET ET butonuna bas.';
        blinkButton = document.getElementById('report-btn');
    } else if (wrongButton === 'report') {
        hintText = 'Zaten şikayet ettin! Şimdi ENGELLE butonuna bas.';
        blinkButton = document.getElementById('block-btn');
    }
    
    document.getElementById('hint-text').textContent = hintText;
    document.getElementById('hint-overlay').style.display = 'flex';
    
    if (blinkButton) {
        blinkButton.classList.add('blink');
    }
    
    // BUTONLAR TIKLANABİLİR KALIYOR - ipucu 3 saniye sonra kaybolacak
    currentSession.hintTimeout = setTimeout(() => {
        document.getElementById('hint-overlay').style.display = 'none';
        if (blinkButton) {
            blinkButton.classList.remove('blink');
        }
    }, 3000);
}

// İpucu göster
function showHint() {
    const scenario = currentSession.currentScenario;
    const message = scenario.messages[currentSession.messageIndex];
    
    if (message.type !== 'cyberbullying') return;
    
    currentSession.stats.hints++;
    
    let hintText = '';
    let blinkButton = null;
    
    if (!currentSession.reportClicked) {
        hintText = 'Bu mesaj siber zorbalık içeriyor! İlk olarak ŞİKAYET ET butonuna bas.';
        blinkButton = document.getElementById('report-btn');
    } else if (!currentSession.blockClicked) {
        hintText = 'Şimdi bu kişiyi ENGELLE butonuna basarak engelle.';
        blinkButton = document.getElementById('block-btn');
    }
    
    document.getElementById('hint-text').textContent = hintText;
    document.getElementById('hint-overlay').style.display = 'flex';
    
    if (blinkButton) {
        blinkButton.classList.add('blink');
    }
    
    // İpucu gösterildiğinde BUTONLAR TIKLANABİLİR KALIYOR
}

// Sonraki adım ipucu
function showNextStepHint(step) {
    setTimeout(() => {
        let hintText = '';
        let blinkButton = null;
        
        if (step === 'block') {
            hintText = 'Şimdi bu kişiyi ENGELLE butonuna basarak engelle.';
            blinkButton = document.getElementById('block-btn');
        }
        
        document.getElementById('hint-text').textContent = hintText;
        document.getElementById('hint-overlay').style.display = 'flex';
        
        if (blinkButton) {
            blinkButton.classList.add('blink');
        }
        
        currentSession.hintTimeout = setTimeout(() => {
            document.getElementById('hint-overlay').style.display = 'none';
            if (blinkButton) {
                blinkButton.classList.remove('blink');
            }
        }, 5000);
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

// Sonraki senaryoya geç
function nextScenario() {
    const bullyingTypes = BULLYING_TYPES;
    const currentTypeIndex = bullyingTypes.indexOf(currentSession.currentBullyingType);
    
    if (currentTypeIndex < bullyingTypes.length - 1) {
        // Sonraki zorbalık türüne geç
        currentSession.currentBullyingType = bullyingTypes[currentTypeIndex + 1];
        currentSession.currentScenario = SCENARIOS[currentSession.sessionType][currentSession.currentBullyingType][0];
        currentSession.messageIndex = 0;
        
        // Yeni DM ekranını başlat
        openDMScreen();
    } else {
        // Tüm senaryolar bitti - özet ekranını göster
        showSummary();
    }
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
