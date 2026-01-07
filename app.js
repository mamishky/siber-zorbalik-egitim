// Firebase Configuration and Initialization
const firebaseConfig = {
    apiKey: "AIzaSyCvQGYOPCK1Oc94Qlb2omZKe3XAhmL9yjU",
    authDomain: "safestagram-a458a.firebaseapp.com",
    projectId: "safestagram-a458a",
    storageBucket: "safestagram-a458a.firebasestorage.app",
    messagingSenderId: "1046452988416",
    appId: "1:1046452988416:web:588633779fff2ad42b86e5",
    measurementId: "G-VEBYYDND7H"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Gemini API Key (obfuscated)
const _0x = ['QUl6YVN5QzVuekZvSXJqanZFMmtqenFBbkpsdHlVOXNvX2hWeXdJ'];
const getGeminiKey = () => atob(_0x[0]);

// Gemini AI Integration Functions
async function generateBullyingMessage(bullyingType) {
    const bullyingTypeLabels = {
        'sozel': 'Sözel/Psikolojik Saldırı',
        'dislanma': 'Sosyal Dışlanma',
        'tehdit': 'Tehdit ve Şantaj',
        'iftira': 'Yanlış Bilgi/İftira/Dedikodu',
        'kimlik': 'Kimlik Taklidi/Sahte Hesap'
    };
    
    const prompt = `Sen bir lise öğrencisisin. Özel eğitim meslek okulunda okuyan, zihin yetersizliği olan bir öğrenciye yönelik "${bullyingTypeLabels[bullyingType]}" türünde siber zorbalık içeren KISA bir mesaj yaz.

Kurallar:
- Mesaj 1-2 cümle olsun
- Basit ve anlaşılır Türkçe kullan
- Emoji kullanabilirsin
- Sadece mesajı yaz, başka açıklama ekleme

Zorbalık türleri:
- Sözel/Psikolojik Saldırı: Hakaret, aşağılama, küçümseme
- Sosyal Dışlanma: Gruptan atma, yalnız bırakma
- Tehdit ve Şantaj: Korkutma, tehdit etme
- Yanlış Bilgi/İftira/Dedikodu: Yalan haber yayma
- Kimlik Taklidi/Sahte Hesap: Başkası gibi davranma`;
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${getGeminiKey()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });
        
        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text.trim();
        }
    } catch (error) {
        console.error('Error generating bullying message:', error);
    }
    
    // Fallback to predefined messages if API fails
    const fallbacks = {
        'sozel': 'Sen gerçekten çok aptalsın, hiçbir şey bilmiyorsun!',
        'dislanma': 'Seni partiye davet etmedik, kimse seni istemiyor.',
        'tehdit': 'Eğer bunu birine söylersen seni döverim!',
        'iftira': 'Herkes senin hırsızlık yaptığını söylüyor, doğru mu?',
        'kimlik': 'Ben senin en iyi arkadaşınım, şifreni söyler misin?'
    };
    return fallbacks[bullyingType] || 'Mesaj yüklenemedi.';
}

async function generateFriendlyMessage() {
    const prompt = `Sen bir lise öğrencisisin. Özel eğitim meslek okulunda okuyan, zihin yetersizliği olan bir arkadaşına mesaj atacaksın.

Konular (birini seç):
- Film/dizi önerisi
- Hafta sonu planı
- Okul hakkında sohbet
- Hobi paylaşımı
- Doğum günü/kutlama

Kurallar:
- Arkadaşça bir sohbet başlat
- Basit ve anlaşılır Türkçe kullan
- 1-2 cümle olsun
- Cevap bekleyen bir soru sor
- Emoji kullanabilirsin`;
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${getGeminiKey()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });
        
        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text.trim();
        }
    } catch (error) {
        console.error('Error generating friendly message:', error);
    }
    
    return 'Selam! Nasılsın? 😊';
}

async function continueConversation(conversationHistory, userMessage) {
    const historyText = conversationHistory.map(msg => 
        `${msg.sender === 'user' ? 'Ben' : 'Arkadaşın'}: ${msg.text}`
    ).join('\n');
    
    const prompt = `Sen bir lise öğrencisisin. Özel eğitim meslek okulunda okuyan, zihin yetersizliği olan bir arkadaşınla sohbet ediyorsun.

Sohbet geçmişi:
${historyText}

Kullanıcının son mesajı: "${userMessage}"

Kurallar:
- Arkadaşça ve sıcak ol
- Basit ve anlaşılır Türkçe kullan
- 1-2 cümle cevap ver
- Sohbeti devam ettirecek bir soru sorabilirsin
- Emoji kullanabilirsin
- 2-3 mesaj sonra sohbeti doğal şekilde bitir`;
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${getGeminiKey()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });
        
        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text.trim();
        }
    } catch (error) {
        console.error('Error continuing conversation:', error);
    }
    
    return 'Anladım 😊 Teşekkürler!';
}

// Current user state
let currentUser = null;

// Show notification
function showNotification(title, message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Auth State Observer
auth.onAuthStateChanged(async (user) => {
    if (user) {
        currentUser = user;
        // Get user data from Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            currentUser.displayName = `${userData.firstName} ${userData.lastName}`;
            currentUser.firstName = userData.firstName;
            currentUser.lastName = userData.lastName;
            currentUser.email = userData.email;
        }
        
        // Show panel screen if on auth screen
        if (document.getElementById('auth-screen').classList.contains('active')) {
            showScreen('panel-screen');
            updatePanelUserInfo();
        }
    } else {
        currentUser = null;
        // Show auth screen if not on it
        if (!document.getElementById('auth-screen').classList.contains('active')) {
            showScreen('auth-screen');
        }
    }
});

// Update panel user info
function updatePanelUserInfo() {
    if (currentUser && currentUser.displayName) {
        const fullUserInfo = `${currentUser.displayName} - ${currentUser.email}`;
        document.getElementById('panel-user-name').textContent = fullUserInfo;
        const appEntryUserName = document.getElementById('app-entry-user-name');
        if (appEntryUserName) {
            appEntryUserName.textContent = fullUserInfo;
        }
        const adminUserName = document.getElementById('admin-user-name');
        if (adminUserName) {
            adminUserName.textContent = fullUserInfo;
        }
    }
}

// Auth form toggles
document.addEventListener('DOMContentLoaded', () => {
    const showSignupBtn = document.getElementById('show-signup');
    const showLoginBtn = document.getElementById('show-login');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', () => {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        });
    }
    
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', () => {
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }
});

// Signup Form Handler
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const firstName = document.getElementById('signup-firstname').value.trim();
    const lastName = document.getElementById('signup-lastname').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    
    try {
        // Create user with email and password
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Save user data to Firestore
        await db.collection('users').doc(user.uid).set({
            firstName: firstName,
            lastName: lastName,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Show success notification
        showNotification('Başarılı!', 'Üyeliğiniz onaylandı! Hoş geldiniz.', 'success');
        
        // Clear form
        document.getElementById('signupForm').reset();
        
    } catch (error) {
        console.error('Signup error:', error);
        let errorMessage = 'Kayıt sırasında bir hata oluştu.';
        
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'Bu e-posta adresi zaten kullanılıyor.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Geçersiz e-posta adresi.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Şifre çok zayıf. En az 6 karakter olmalı.';
        }
        
        showNotification('Hata', errorMessage, 'error');
    }
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        showNotification('Başarılı!', 'Giriş yapıldı. Hoş geldiniz!', 'success');
        document.getElementById('loginForm').reset();
    } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'Giriş yapılırken bir hata oluştu.';
        
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            errorMessage = 'E-posta veya şifrenizi yanlış girdiniz.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Geçersiz e-posta adresi.';
        } else if (error.code === 'auth/user-disabled') {
            errorMessage = 'Bu hesap devre dışı bırakılmış.';
        }
        
        showNotification('Hata', errorMessage, 'error');
    }
});

// Panel Logout
document.getElementById('panel-logout').addEventListener('click', async () => {
    try {
        await auth.signOut();
        showNotification('Başarılı', 'Çıkış yapıldı.', 'success');
    } catch (error) {
        console.error('Logout error:', error);
        showNotification('Hata', 'Çıkış yapılırken bir hata oluştu.', 'error');
    }
});

// Panel Buttons
document.getElementById('app-entry-btn').addEventListener('click', () => {
    showScreen('app-entry-screen');
    updatePanelUserInfo(); // Update user name display
});

document.getElementById('academic-panel-btn').addEventListener('click', () => {
    showScreen('admin-panel');
    loadAdminData();
});

document.getElementById('back-to-panel').addEventListener('click', () => {
    showScreen('panel-screen');
});

// Admin Back Button
document.getElementById('admin-back-btn').addEventListener('click', () => {
    showScreen('panel-screen');
});

// Admin Logout
const adminLogoutBtn = document.getElementById('admin-logout');
if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', async () => {
        try {
            await auth.signOut();
            showNotification('Başarılı', 'Çıkış yapıldı.', 'success');
        } catch (error) {
            console.error('Logout error:', error);
            showNotification('Hata', 'Çıkış yapılırken bir hata oluştu.', 'error');
        }
    });
}

// Session Form Handler (App Entry)
document.getElementById('sessionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
        showNotification('Hata', 'Lütfen önce giriş yapın.', 'error');
        return;
    }
    
    const name = document.getElementById('participant-name').value.trim();
    const age = document.getElementById('participant-age').value;
    const sessionType = document.getElementById('session-type').value;
    const hintEnabled = document.getElementById('hint-use').checked;
    
    if (!name || !age || !sessionType) {
        showNotification('Hata', 'Lütfen tüm alanları doldurun!', 'error');
        return;
    }
    
    // Generate a unique session ID
    const sessionId = `S${Date.now()}`;
    currentSession.sessionId = sessionId;
    currentSession.participantId = `P${Date.now()}`;
    currentSession.participantName = name;
    currentSession.participantAge = parseInt(age);
    currentSession.sessionType = sessionType;
    currentSession.currentBullyingType = 'all';
    currentSession.startTime = new Date();
    currentSession.userId = currentUser.uid;
    currentSession.hintEnabled = hintEnabled;
    
    // Create session in Firestore
    try {
        await db.collection('users').doc(currentUser.uid)
            .collection('sessions').doc(sessionId).set({
                participantName: name,
                participantAge: parseInt(age),
                sessionType: sessionType,
                hintEnabled: hintEnabled,
                startedAt: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'active'
            });
    } catch (error) {
        console.error('Error creating session:', error);
        showNotification('Hata', 'Oturum oluşturulamadı.', 'error');
        return;
    }
    
    // Navigasyon becerisini başlangıçta true yap
    currentSession.skills.navigation = true;
    
    // Prepare message queue - EXACTLY 10 messages (5 cyberbullying + 5 safe)
    currentSession.messageQueue = [];
    
    // Map session type to scenarios (handle new session types)
    let scenarioType = sessionType;
    if (sessionType === 'genelleme-on' || sessionType === 'genelleme-son') {
        scenarioType = 'baslama'; // Use baslama scenarios for genelleme tests
    }
    
    // Iterate through all 5 bullying types
    BULLYING_TYPES.forEach(bullyingType => {
        const allScenarios = SCENARIOS[scenarioType] ? SCENARIOS[scenarioType][bullyingType] : SCENARIOS['baslama'][bullyingType];
        
        // Separate cyberbullying and safe messages
        const cyberbullyingMessages = allScenarios.filter(s => 
            s.messages && s.messages.some(m => m.type === 'cyberbullying')
        );
        const safeMessages = allScenarios.filter(s => s.conversation);
        
        // Add 1 cyberbullying message from this type
        if (cyberbullyingMessages.length > 0) {
            const randomCyberbullying = cyberbullyingMessages[Math.floor(Math.random() * cyberbullyingMessages.length)];
            currentSession.messageQueue.push({
                ...randomCyberbullying,
                _bullyingType: bullyingType
            });
        }
        
        // Add 1 safe message from this type
        if (safeMessages.length > 0) {
            const randomSafe = safeMessages[Math.floor(Math.random() * safeMessages.length)];
            currentSession.messageQueue.push({
                ...randomSafe,
                _bullyingType: bullyingType
            });
        }
    });
    
    // Shuffle the queue
    currentSession.messageQueue.sort(() => Math.random() - 0.5);
    currentSession.currentMessageIndex = 0;
    
    showScreen('main-app');
    generateFeed();
    renderStories();
    
    // İlk mesaj için 10 saniye bekle
    currentSession.messageTimeout = setTimeout(() => {
        sendNextMessageNotification();
    }, 10000);
});

// Global değişkenler
let currentSession = {
    sessionId: "",
    userId: "",
    sessionType: "",
    participantId: "",
    participantName: "",
    participantAge: 0,
    startTime: null,
    currentBullyingType: null,
    currentScenario: null,
    messageIndex: 0,
    conversationIndex: 0,
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
    selectedComplaintReason: null,
    conversationHistory: {}, // Stores message history by sender
    hintEnabled: true // Default to true
};

// Persistent message history functions
function getParticipantStorageKey(participantName) {
    return `safestagram_users`;
}

function loadMessageHistory(participantName) {
    const allUsers = localStorage.getItem('safestagram_users');
    if (allUsers) {
        const usersData = JSON.parse(allUsers);
        const normalizedName = participantName.toLowerCase().trim();
        if (usersData[normalizedName]) {
            return usersData[normalizedName].conversations || {};
        }
    }
    return {};
}

function saveMessageHistory(participantName, conversations) {
    const allUsers = localStorage.getItem('safestagram_users');
    let usersData = allUsers ? JSON.parse(allUsers) : {};
    const normalizedName = participantName.toLowerCase().trim();
    
    if (!usersData[normalizedName]) {
        usersData[normalizedName] = {
            conversations: {},
            watchedStories: []
        };
    }
    
    usersData[normalizedName].conversations = conversations;
    localStorage.setItem('safestagram_users', JSON.stringify(usersData));
}

function saveConversationState(sender, conversation, status, blockedAt = null) {
    if (!currentSession.participantName) return;
    
    const conversations = loadMessageHistory(currentSession.participantName);
    conversations[sender] = {
        messages: conversation,
        status: status, // 'completed' or 'blocked'
        blockedAt: blockedAt,
        timestamp: new Date().toISOString()
    };
    saveMessageHistory(currentSession.participantName, conversations);
}

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

// Feed için gönderi verileri - scenarios.js'den POSTS_100 kullan
const POSTS = POSTS_100;

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
                    <video 
                        src="${post.video}" 
                        autoplay 
                        loop 
                        muted 
                        playsinline
                        class="post-video-element"
                        style="width: 100%; height: 100%; object-fit: cover;"
                    ></video>
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

// Turkish names for stories
const TURKISH_USERNAMES = [
    'ali.yilmaz', 'ayse.demir', 'mehmet.kaya', 'zeynep.ozturk', 'cem.yildiz',
    'selin.yildirim', 'can.yilmaz', 'gizem.sen', 'tarik.barkan', 'ebru.celik',
    'kerem.akar', 'deniz.koc', 'berk.aydin', 'aleyna.yurt', 'kaan.ozer',
    'esra.kara', 'mert.yilmaz', 'pinar.demir', 'onur.aksoy', 'ceren.cetin',
    'serkan.tas', 'gamze.ozturk', 'alper.yildirim', 'irem.guven', 'baris.kaya',
    'asli.celik', 'gorkem.arslan', 'ebru.dogan', 'umut.tuncer', 'neslihan.oz',
    'dilek.polat', 'volkan.sahin', 'sebnem.yavuz', 'engin.koc', 'sevgi.aydin',
    'orhan.celik', 'nihal.demir', 'erdem.yilmaz', 'ozlem.kaya', 'yusuf.ozturk',
    'filiz.tas', 'sinan.guven', 'songul.arslan', 'levent.dogan', 'nurcan.yildirim',
    'kadir.cetin', 'canan.kara', 'serdar.polat', 'belgin.sahin', 'selim.yavuz',
    'gulsum.koc', 'ercan.aydin', 'nurten.celik', 'ismet.demir', 'munevver.yilmaz',
    'nejat.kaya', 'perihan.ozturk', 'nuri.tas', 'saime.guven', 'haluk.arslan',
    'nermin.dogan', 'cemil.yildirim', 'zehra.cetin', 'riza.kara', 'fadime.polat',
    'resat.sahin', 'fadime.yavuz', 'recep.koc', 'sabiha.aydin', 'halil.celik',
    'sevim.demir', 'ramazan.yilmaz', 'aysegul.kaya', 'osman.ozturk', 'hanife.tas',
    'suleyman.guven', 'zeliha.arslan', 'yasar.dogan', 'meryem.yildirim', 'ismail.cetin',
    'serife.kara', 'ahmet.polat', 'fatma.sahin', 'mustafa.yavuz', 'emine.koc',
    'burak.yilmaz', 'elif.demir', 'emre.kaya', 'seda.ozturk', 'hakan.celik',
    'burcu.yildirim', 'tolga.yilmaz', 'tugce.sen', 'batuhan.barkan', 'derya.celik',
    'ege.akar', 'duygu.koc', 'burak.aydin', 'simge.yurt', 'doruk.ozer'
];

// Story state management - 100 stories
let storyState = {
    currentStoryIndex: 0,
    stories: [],
    autoplayTimeout: null,
    progressTimeout: null
};

// Generate 100 stories
function generateStories() {
    storyState.stories = [];
    for (let i = 0; i < 100; i++) {
        const username = TURKISH_USERNAMES[i % TURKISH_USERNAMES.length];
        const seed = `${username}${i}`;
        storyState.stories.push({
            username: username + (i > TURKISH_USERNAMES.length - 1 ? Math.floor(i / TURKISH_USERNAMES.length) : ''),
            avatar: seed,
            watched: false
        });
    }
}

// Initialize stories on load
generateStories();

// Render stories into the container
function renderStories() {
    const storiesContainer = document.getElementById('stories-container');
    if (!storiesContainer) return;
    
    storiesContainer.innerHTML = '';
    
    storyState.stories.forEach((story, index) => {
        const storyDiv = document.createElement('div');
        storyDiv.className = 'story';
        storyDiv.dataset.story = story.avatar;
        
        storyDiv.innerHTML = `
            <div class="story-avatar ${story.watched ? 'watched' : 'unwatched'}">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${story.avatar}" alt="Story">
            </div>
            <span>${story.username}</span>
        `;
        
        storyDiv.addEventListener('click', function() {
            openStory(story.username, story.avatar, index);
        });
        
        storiesContainer.appendChild(storyDiv);
    });
}

// Load story watched states from localStorage
function loadStoryStates() {
    const saved = localStorage.getItem('siberguven_stories');
    if (saved) {
        const savedStories = JSON.parse(saved);
        storyState.stories = storyState.stories.map(story => {
            const savedStory = savedStories.find(s => s.username === story.username);
            return savedStory ? { ...story, watched: savedStory.watched } : story;
        });
    }
    updateStoryAvatars();
}

// Save story watched states to localStorage
function saveStoryStates() {
    localStorage.setItem('siberguven_stories', JSON.stringify(storyState.stories));
}

// Update story avatar classes based on watched state
function updateStoryAvatars() {
    storyState.stories.forEach((story, index) => {
        const storyEl = document.querySelector(`.story[data-story="${story.avatar}"]`);
        if (storyEl) {
            const avatar = storyEl.querySelector('.story-avatar');
            if (story.watched) {
                avatar.classList.remove('unwatched');
                avatar.classList.add('watched');
            } else {
                avatar.classList.remove('watched');
                avatar.classList.add('unwatched');
            }
        }
    });
}

// Hikaye overlay'i aç
function openStory(username, avatar, storyIndex) {
    storyState.currentStoryIndex = storyIndex;
    const story = storyState.stories[storyIndex];
    
    const storyOverlay = document.getElementById('story-overlay');
    document.getElementById('story-avatar').src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar}`;
    document.getElementById('story-username').textContent = username;
    document.getElementById('story-image').src = `https://picsum.photos/400/700?random=${storyIndex}`;
    
    // Create progress segments
    const progressContainer = document.getElementById('story-progress-container');
    progressContainer.innerHTML = '';
    
    // Single segment for single story
    const segment = document.createElement('div');
    segment.className = 'story-progress-segment';
    const bar = document.createElement('div');
    bar.className = 'story-progress-bar';
    segment.appendChild(bar);
    progressContainer.appendChild(segment);
    
    storyOverlay.classList.add('active');
    
    // Mark as watched
    story.watched = true;
    saveStoryStates();
    updateStoryAvatars();
    
    // Auto advance after 5 seconds
    storyState.autoplayTimeout = setTimeout(() => {
        nextStory();
    }, 5000);
}

// Next story
function nextStory() {
    clearTimeout(storyState.autoplayTimeout);
    
    if (storyState.currentStoryIndex < storyState.stories.length - 1) {
        const nextIndex = storyState.currentStoryIndex + 1;
        const nextStory = storyState.stories[nextIndex];
        openStory(nextStory.username, nextStory.avatar, nextIndex);
    } else {
        closeStory();
    }
}

// Previous story
function previousStory() {
    clearTimeout(storyState.autoplayTimeout);
    
    if (storyState.currentStoryIndex > 0) {
        const prevIndex = storyState.currentStoryIndex - 1;
        const prevStory = storyState.stories[prevIndex];
        openStory(prevStory.username, prevStory.avatar, prevIndex);
    }
}

// Hikaye overlay'i kapat
function closeStory() {
    clearTimeout(storyState.autoplayTimeout);
    document.getElementById('story-overlay').classList.remove('active');
}

// Hikaye tıklama event'leri
document.addEventListener('DOMContentLoaded', () => {
    // Load story states on page load and render stories
    loadStoryStates();
    renderStories();
    
    // Story navigation
    document.getElementById('story-nav-left').addEventListener('click', () => {
        previousStory();
    });
    
    document.getElementById('story-nav-right').addEventListener('click', () => {
        nextStory();
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

// Mesaj bildirimi göster (Instagram DM style)
function sendNextMessageNotification() {
    // Check if we've completed all 10 messages
    if (currentSession.currentMessageIndex >= 10 || currentSession.currentMessageIndex >= currentSession.messageQueue.length) {
        // Tüm mesajlar tamamlandı - show summary
        setTimeout(() => {
            showSummary();
        }, 2000);
        return;
    }
    
    currentSession.pendingMessages++;
    const badge = document.getElementById('message-badge');
    badge.textContent = currentSession.pendingMessages;
    badge.style.display = 'flex';
    
    // Get current message info for notification
    const scenario = currentSession.messageQueue[currentSession.currentMessageIndex];
    const toast = document.getElementById('dm-notification-toast');
    const avatar = document.getElementById('dm-notif-avatar');
    const sender = document.getElementById('dm-notif-sender');
    const preview = document.getElementById('dm-notif-preview');
    
    // Set notification content
    avatar.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}`;
    sender.textContent = scenario.sender;
    
    // Get preview text
    let previewText = '';
    if (scenario.conversation && scenario.conversation.length > 0) {
        previewText = scenario.conversation[0].incoming;
    } else if (scenario.messages && scenario.messages.length > 0) {
        previewText = scenario.messages[0].text;
    }
    
    // Truncate if too long
    if (previewText.length > 50) {
        previewText = previewText.substring(0, 50) + '...';
    }
    preview.textContent = previewText;
    
    // Show toast
    toast.style.display = 'flex';
    
    // Bildirim sesini çal
    playNotificationSound();
    
    // Click handler to open message
    toast.onclick = () => {
        toast.style.display = 'none';
        if (currentSession.pendingMessages > 0) {
            showInbox();
        }
    };
    
    // Auto hide after 10 seconds
    setTimeout(() => {
        toast.style.display = 'none';
    }, 10000);
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
    
    // Load message history for this participant
    const messageHistory = loadMessageHistory(currentSession.participantName);
    
    // Her mesaj için bir inbox item oluştur - but only show up to current index
    currentSession.messageQueue.forEach((scenario, index) => {
        // Only show messages up to current index (messages that have been sent)
        if (index > currentSession.currentMessageIndex) {
            return; // Skip future messages
        }
        
        const isUnread = index === currentSession.currentMessageIndex && currentSession.pendingMessages > 0;
        const isPast = index < currentSession.currentMessageIndex;
        
        // Check if this sender is blocked
        const senderHistory = messageHistory[scenario.sender];
        const isBlocked = senderHistory && senderHistory.status === 'blocked';
        
        const item = document.createElement('div');
        item.className = `inbox-item ${isUnread ? 'unread' : ''} ${isBlocked ? 'blocked' : ''}`;
        item.dataset.index = index;
        
        // Mesaj önizlemesi için ilk mesajı al
        let previewText = '';
        if (isBlocked) {
            previewText = '🔴 ENGELLENDİ';
        } else if (scenario.conversation && scenario.conversation.length > 0) {
            // New conversation format
            previewText = scenario.conversation[0].incoming || '';
            // Uzun mesajları kısalt
            if (previewText.length > 40) {
                previewText = previewText.substring(0, 40) + '...';
            }
        } else if (scenario.messages && scenario.messages.length > 0) {
            // Old messages format
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
                    <span class="inbox-sender">${scenario.sender}${isBlocked ? ' <span class="blocked-label">🔴 ENGELLENDİ</span>' : ''}</span>
                    <span class="inbox-time">Şimdi</span>
                </div>
                <div class="inbox-message-preview ${isBlocked ? 'blocked-preview' : ''}">
                    ${isUnread && !isBlocked ? '<span class="unread-dot"></span>' : ''}
                    ${previewText}
                </div>
            </div>
        `;
        
        // Tıklama eventi
        item.addEventListener('click', () => {
            if (isBlocked) {
                alert('Bu kullanıcı engellenmiştir.');
            } else {
                openConversationFromInbox(index);
            }
        });
        
        inboxList.appendChild(item);
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
    
    // Eğer zamanlayıcı yoksa ve hala mesaj gönderilmemişse, zamanlayıcıyı başlat
    if (!currentSession.messageTimeout && currentSession.currentMessageIndex < currentSession.messageQueue.length && currentSession.pendingMessages === 0) {
        currentSession.messageTimeout = setTimeout(() => {
            sendNextMessageNotification();
        }, 10000); // 10 saniye bekle
    }
});

// Belirli bir DM'i aç
function openSpecificDM(scenario) {
    currentSession.currentScenario = scenario;
    currentSession.messageIndex = 0;
    currentSession.conversationIndex = 0;
    
    // Mark reading skill as true
    currentSession.skills.reading = true;
    
    showScreen('dm-screen');
    
    document.getElementById('dm-username').textContent = scenario.sender;
    document.getElementById('dm-avatar').src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}`;
    
    document.getElementById('dm-messages').innerHTML = '';
    document.getElementById('dm-input-container').style.display = 'none';
    document.getElementById('action-buttons').style.display = 'none';
    
    // Load conversation history from localStorage
    const messageHistory = loadMessageHistory(currentSession.participantName);
    const senderHistory = messageHistory[scenario.sender];
    
    if (senderHistory && senderHistory.messages && senderHistory.messages.length > 0) {
        // Display previous messages
        const messagesContainer = document.getElementById('dm-messages');
        senderHistory.messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender === 'user' ? 'sent' : ''}`;
            
            const avatarSrc = msg.sender === 'user' 
                ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1'
                : `https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}`;
            
            messageDiv.innerHTML = `
                <img src="${avatarSrc}" alt="Avatar" class="message-avatar">
                <div>
                    <div class="message-content">${msg.text}</div>
                    <div class="message-time">${msg.time}</div>
                </div>
            `;
            
            messagesContainer.appendChild(messageDiv);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // If conversation was blocked, show blocked status
        if (senderHistory.status === 'blocked') {
            return; // Don't send new messages if blocked
        }
        
        // If conversation is complete, don't send new messages
        if (senderHistory.status === 'completed') {
            return;
        }
    }
    
    // Check if it's a conversation or messages format
    if (scenario.conversation) {
        // New conversation format - turn-based
        setTimeout(() => {
            sendConversationMessage();
        }, 1000);
    } else {
        // Old messages format - cyberbullying
        setTimeout(() => {
            sendMessage();
        }, 1000);
    }
}

// Geri butonları
document.getElementById('back-to-inbox').addEventListener('click', () => {
    // Inbox'a dön - mesaj tamamlandığında çağrılır
    const messagesContainer = document.getElementById('dm-messages');
    const scenario = currentSession.currentScenario;
    
    // Save conversation state if not already saved
    if (scenario && messagesContainer) {
        const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
            text: msg.querySelector('.message-content').textContent,
            sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
            time: msg.querySelector('.message-time').textContent
        }));
        
        // Save as completed if not blocked
        const messageHistory = loadMessageHistory(currentSession.participantName);
        const senderHistory = messageHistory[scenario.sender];
        if (!senderHistory || senderHistory.status !== 'blocked') {
            saveConversationState(scenario.sender, allMessages, 'completed');
        }
    }
    
    // İndeksi artır ve inbox'a dön
    currentSession.currentMessageIndex++;
    showScreen('inbox-screen');
    renderInboxList();
    
    // Check if we've completed all 10 messages
    if (currentSession.currentMessageIndex >= 10 || currentSession.currentMessageIndex >= currentSession.messageQueue.length) {
        // Tüm mesajlar tamamlandı - 2 saniye sonra özet ekranı
        setTimeout(() => {
            showSummary();
        }, 2000);
    } else {
        // 10 saniye sonra sonraki mesajı gönder
        clearTimeout(currentSession.messageTimeout); // Önceki zamanlayıcıyı temizle
        currentSession.messageTimeout = setTimeout(() => {
            sendNextMessageNotification();
        }, 10000); // 10 saniye bekle
    }
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
    
    const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}" alt="Avatar" class="message-avatar">
        <div>
            <div class="message-content">${message.text}</div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Save conversation state after each message
    const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
        text: msg.querySelector('.message-content').textContent,
        sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
        time: msg.querySelector('.message-time').textContent
    }));
    saveConversationState(scenario.sender, allMessages, 'in-progress');
    
    if (message.type === 'safe') {
        // Güvenli mesaj - eğer birden fazla mesaj varsa otomatik olarak devam et
        const remainingSafeMessages = scenario.messages.slice(currentSession.messageIndex + 1).filter(m => m.type === 'safe');
        
        if (remainingSafeMessages.length > 0) {
            // Otomatik olarak sonraki mesajı gönder
            setTimeout(() => {
                currentSession.messageIndex++;
                sendMessage();
            }, 2000);
        } else {
            // Son güvenli mesaj - metin cevabı bekleniyor
            document.getElementById('dm-input-container').style.display = 'flex';
            document.getElementById('action-buttons').style.display = 'none';
        }
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
        // Check if hints are enabled before setting timeout
        if (currentSession.hintEnabled) {
            currentSession.hintTimeout = setTimeout(() => {
                showHint();
            }, 5000);
        }
    }
}

// Turn-based conversation message handler
function sendConversationMessage() {
    const scenario = currentSession.currentScenario;
    const conversation = scenario.conversation;
    
    if (!conversation || currentSession.conversationIndex >= conversation.length) {
        return;
    }
    
    const turnData = conversation[currentSession.conversationIndex];
    currentSession.currentMessageStartTime = Date.now();
    
    const messagesContainer = document.getElementById('dm-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    
    const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}" alt="Avatar" class="message-avatar">
        <div>
            <div class="message-content">${turnData.incoming}</div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Save conversation state after each incoming message
    const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
        text: msg.querySelector('.message-content').textContent,
        sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
        time: msg.querySelector('.message-time').textContent
    }));
    saveConversationState(scenario.sender, allMessages, 'in-progress');
    
    // Check if we need to wait for user reply
    if (turnData.waitForReply) {
        // Show input for user to reply
        document.getElementById('dm-input-container').style.display = 'flex';
        document.getElementById('dm-input').focus();
    } else {
        // If it's the last message and doesn't wait for reply, end conversation
        if (turnData.endsConversation) {
            // Save conversation state
            saveConversationState(scenario.sender, allMessages, 'completed');
        } else {
            // Continue with next message after 1-2 seconds
            currentSession.conversationIndex++;
            setTimeout(() => {
                sendConversationMessage();
            }, 1500);
        }
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
    
    const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" alt="You" class="message-avatar">
        <div>
            <div class="message-content">${text}</div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    input.value = '';
    
    // Save conversation state after user reply
    const scenario = currentSession.currentScenario;
    const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
        text: msg.querySelector('.message-content').textContent,
        sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
        time: msg.querySelector('.message-time').textContent
    }));
    saveConversationState(scenario.sender, allMessages, 'in-progress');
    
    // Veri kaydet
    const reactionTime = (Date.now() - currentSession.currentMessageStartTime) / 1000;
    saveMessageData('safe', 'reply', reactionTime, false, true);
    
    currentSession.stats.correct++;
    
    // Input alanını gizle
    document.getElementById('dm-input-container').style.display = 'none';
    
    // Check if conversation continues
    if (scenario.conversation) {
        // Turn-based conversation - advance to next turn
        currentSession.conversationIndex++;
        
        if (currentSession.conversationIndex < scenario.conversation.length) {
            // Continue conversation after 1-2 seconds
            setTimeout(() => {
                sendConversationMessage();
            }, 1500);
        } else {
            // Conversation ended - save state and show back button hint
            saveConversationState(scenario.sender, allMessages, 'completed');
            
            // Sohbet bitti - kullanıcı geri tuşuna basmalı
            // Otomatik olarak 3 saniye sonra feed'e dön
            setTimeout(() => {
                returnToFeed();
            }, 3000);
        }
    } else {
        // Old format - save and return to feed automatically
        saveConversationState(scenario.sender, allMessages, 'completed');
        
        // Otomatik olarak 3 saniye sonra feed'e dön
        setTimeout(() => {
            returnToFeed();
        }, 3000);
    }
});

// Enter tuşu ile mesaj gönderme
document.getElementById('dm-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
        document.getElementById('dm-send').click();
    }
});

// Ana sayfaya dön (home icon click)
function returnToFeed() {
    const currentScreen = document.querySelector('.screen.active');
    showScreen('main-app');
    
    // Sadece DM ekranından geliyorsak mesaj indeksini artır
    if (currentScreen && currentScreen.id === 'dm-screen') {
        // Mesaj indeksini artır
        currentSession.currentMessageIndex++;
        
        // Check if we've completed all 10 messages
        if (currentSession.currentMessageIndex >= 10 || currentSession.currentMessageIndex >= currentSession.messageQueue.length) {
            // Tüm mesajlar tamamlandı - 2 saniye sonra özet ekranı
            setTimeout(() => {
                showSummary();
            }, 2000);
        } else {
            // 10 saniye sonra sonraki mesajı gönder
            clearTimeout(currentSession.messageTimeout); // Önceki zamanlayıcıyı temizle
            currentSession.messageTimeout = setTimeout(() => {
                sendNextMessageNotification();
            }, 10000); // 10 saniye bekle
        }
    }
}

// Thank you modal'ı kapat ve akışa devam et
document.getElementById('close-thank-you-modal').addEventListener('click', () => {
    document.getElementById('thank-you-modal').style.display = 'none';
    
    // Return to feed after closing thank you modal
    currentSession.currentMessageIndex++;
    showScreen('main-app');
    
    // Check if we've completed all 10 messages
    if (currentSession.currentMessageIndex >= 10 || currentSession.currentMessageIndex >= currentSession.messageQueue.length) {
        // Tüm mesajlar tamamlandı - 2 saniye sonra özet ekranı
        setTimeout(() => {
            showSummary();
        }, 2000);
    } else {
        // 10 saniye sonra sonraki mesajı gönder
        clearTimeout(currentSession.messageTimeout); // Önceki zamanlayıcıyı temizle
        currentSession.messageTimeout = setTimeout(() => {
            sendNextMessageNotification();
        }, 10000); // 10 saniye bekle
    }
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
    
    // Save blocked status to message history
    const scenario = currentSession.currentScenario;
    const messagesContainer = document.getElementById('dm-messages');
    const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
        text: msg.querySelector('.message-content').textContent,
        sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
        time: msg.querySelector('.message-time').textContent
    }));
    
    saveConversationState(scenario.sender, allMessages, 'blocked', new Date().toISOString());
    
    // Teşekkür mesajını göster
    document.getElementById('thank-you-modal').style.display = 'flex';
    
    // Not: thank you modal'ın close butonu otomatik olarak timer'ı başlatacak
});

// Yanlış sıra ipucu göster (sadece doğru buton yanıp sönecek, metin YOK)
function showWrongOrderHint(wrongButton) {
    // Check if hints are enabled
    if (!currentSession.hintEnabled) {
        return; // Don't show hints if disabled
    }
    
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
    
    // 5 saniye sonra doğru cevabı yanıp söndür - only if hints enabled
    if (currentSession.hintEnabled) {
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
    // Check if hints are enabled
    if (!currentSession.hintEnabled) {
        return; // Don't show hints if disabled
    }
    
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
    // Check if hints are enabled
    if (!currentSession.hintEnabled) {
        return; // Don't show hints if disabled
    }
    
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
    // Get the bullying type from the current scenario (tagged during queue creation)
    const scenarioBullyingType = currentSession.currentScenario && currentSession.currentScenario._bullyingType 
        ? currentSession.currentScenario._bullyingType 
        : 'unknown';
    
    const data = {
        participantId: currentSession.participantId,
        participantName: currentSession.participantName,
        participantAge: currentSession.participantAge,
        sessionType: currentSession.sessionType,
        sessionLabel: SESSION_LABELS[currentSession.sessionType],
        bullyingType: scenarioBullyingType,
        bullyingLabel: BULLYING_TYPE_LABELS[scenarioBullyingType] || 'Bilinmiyor',
        messageType: messageType,
        action: action,
        reactionTime: reactionTime.toFixed(2),
        hintUsed: hintUsed,
        correct: correct,
        timestamp: new Date().toISOString()
    };
    
    currentSession.sessionData.push(data);
    
    // Save to Firestore
    if (currentUser && currentSession.sessionId) {
        db.collection('users').doc(currentUser.uid)
            .collection('sessions').doc(currentSession.sessionId)
            .collection('data').add(data)
            .catch(error => {
                console.error('Error saving data to Firestore:', error);
            });
    }
    
    // Also save to localStorage for backward compatibility
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
        sessionId: "",
        userId: "",
        sessionType: "",
        participantId: "",
        participantName: "",
        participantAge: 0,
        startTime: null,
        currentBullyingType: null,
        currentScenario: null,
        messageIndex: 0,
        conversationIndex: 0,
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
        selectedComplaintReason: null,
        conversationHistory: {},
        hintEnabled: true
    };
    
    showScreen('panel-screen');
});

// Uygulamacı Panel Fonksiyonları
async function loadAdminData() {
    if (!currentUser) {
        document.getElementById('data-display').innerHTML = '<p style="text-align: center; padding: 20px;">Lütfen giriş yapın.</p>';
        return;
    }
    
    try {
        // Load all data from all sessions for the current user
        const sessionsSnapshot = await db.collection('users').doc(currentUser.uid)
            .collection('sessions').get();
        
        const allData = [];
        
        for (const sessionDoc of sessionsSnapshot.docs) {
            const dataSnapshot = await db.collection('users').doc(currentUser.uid)
                .collection('sessions').doc(sessionDoc.id)
                .collection('data').get();
            
            dataSnapshot.forEach(doc => {
                allData.push(doc.data());
            });
        }
        
        displayAdminData(allData);
    } catch (error) {
        console.error('Error loading admin data:', error);
        document.getElementById('data-display').innerHTML = '<p style="text-align: center; padding: 20px;">Veriler yüklenirken hata oluştu.</p>';
    }
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
document.getElementById('clear-data').addEventListener('click', async () => {
    if (confirm('Tüm verileri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
        if (!currentUser) {
            alert('Lütfen giriş yapın.');
            return;
        }
        
        try {
            // Delete all sessions and their data for the current user
            const sessionsSnapshot = await db.collection('users').doc(currentUser.uid)
                .collection('sessions').get();
            
            const batch = db.batch();
            
            for (const sessionDoc of sessionsSnapshot.docs) {
                // Delete all data documents in this session
                const dataSnapshot = await db.collection('users').doc(currentUser.uid)
                    .collection('sessions').doc(sessionDoc.id)
                    .collection('data').get();
                
                dataSnapshot.forEach(doc => {
                    batch.delete(doc.ref);
                });
                
                // Delete the session document
                batch.delete(sessionDoc.ref);
            }
            
            await batch.commit();
            
            // Also clear localStorage for backward compatibility
            localStorage.removeItem('siberguven_data');
            
            loadAdminData();
            showNotification('Başarılı', 'Tüm veriler temizlendi!', 'success');
        } catch (error) {
            console.error('Error clearing data:', error);
            showNotification('Hata', 'Veriler silinirken hata oluştu.', 'error');
        }
    }
});

// Alt navigasyon butonları
document.addEventListener('DOMContentLoaded', () => {
    // Logout functionality
    const logoutOverlay = document.getElementById('logout-overlay');
    const logoutBtn = document.getElementById('logout-btn');
    const closeLogoutModal = document.getElementById('close-logout-modal');
    
    if (closeLogoutModal) {
        closeLogoutModal.addEventListener('click', () => {
            logoutOverlay.style.display = 'none';
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Clear current session timeouts
            if (currentSession.messageTimeout) {
                clearTimeout(currentSession.messageTimeout);
            }
            if (currentSession.hintTimeout) {
                clearTimeout(currentSession.hintTimeout);
            }
            
            // Reset session
            currentSession = {
                sessionId: "",
                userId: "",
                sessionType: "",
                participantId: "",
                participantName: "",
                participantAge: 0,
                startTime: null,
                currentBullyingType: null,
                currentScenario: null,
                messageIndex: 0,
                conversationIndex: 0,
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
                selectedComplaintReason: null,
                conversationHistory: {},
                hintEnabled: true
            };
            
            // Hide overlay and return to panel screen
            logoutOverlay.style.display = 'none';
            showScreen('panel-screen');
        });
    }
    
    // Reels close button
    const reelsCloseBtn = document.getElementById('reels-close-btn');
    if (reelsCloseBtn) {
        reelsCloseBtn.addEventListener('click', () => {
            showScreen('main-app');
        });
    }
    
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        const icons = bottomNav.querySelectorAll('i[data-nav]');
        icons.forEach((icon) => {
            icon.addEventListener('click', () => {
                const navType = icon.dataset.nav;
                
                // Handle profile separately (show logout modal)
                if (navType === 'profile') {
                    if (logoutOverlay) {
                        logoutOverlay.style.display = 'flex';
                    }
                    return;
                }
                
                // Aktif durumu güncelle
                document.querySelectorAll('.bottom-nav i').forEach(i => i.classList.remove('active'));
                icon.classList.add('active');
                
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
