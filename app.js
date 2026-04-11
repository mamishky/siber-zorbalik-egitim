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
try {
firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized successfully');
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
    alert('Firebase başlatılamadı. Lütfen sayfayı yenileyin.');
}

const auth = firebase.auth();
const db = firebase.firestore();

// Manuel giriş flag'i - Manuel giriş yapıldığında "Beni Hatırla" kontrolü yapılmasın
let isManualLogin = false;

// Firebase bağlantı kontrolü
if (auth && db) {
    console.log('✅ Firebase Auth and Firestore ready');
    
    // Firestore bağlantısını test et
    testFirestoreConnection();
} else {
    console.error('❌ Firebase Auth or Firestore not initialized');
}

// Firestore bağlantısını test et (sessiz mod - sadece gerçek kullanımda hata yakalama)
async function testFirestoreConnection() {
    // Test koleksiyonuna erişmeye çalışmak yerine, sadece db objesinin varlığını kontrol et
    // Gerçek hatalar kullanıcı giriş yaptığında veya veri okuma/yazma yapıldığında yakalanacak
    if (db) {
        console.log('✅ Firestore bağlantısı hazır');
    } else {
        console.error('❌ Firestore başlatılamadı');
    }
}

// Firestore persistence - Deprecated uyarısını önlemek için kaldırıldı
// Not: enablePersistence() deprecated, yeni yöntem FirestoreSettings.cache
// Ancak compat modda eski API kullanıldığı için persistence olmadan devam ediyoruz
// Offline desteği için gerekirse yeni Firebase v9+ modular API'ye geçilebilir

// Network hatalarını yakala ve kullanıcıyı bilgilendir
window.addEventListener('error', (event) => {
    if (event.message && event.message.includes('ERR_BLOCKED_BY_CLIENT')) {
        console.error('🚫 Firestore isteği engellendi!');
        console.error('💡 Çözüm: Ad blocker veya tarayıcı uzantılarını devre dışı bırakın');
        console.error('📖 Detaylar için: FIREBASE_ERROR_FIX.md dosyasına bakın');
        
        // Kullanıcıya bilgilendirme (sadece ilk kez)
        if (!sessionStorage.getItem('firebase_error_shown')) {
            setTimeout(() => {
                const errorDiv = document.createElement('div');
                errorDiv.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #ff4444;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                    z-index: 10000;
                    max-width: 400px;
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                `;
                errorDiv.innerHTML = `
                    <strong>⚠️ Firestore Bağlantı Hatası</strong><br>
                    Tarayıcı uzantıları (ad blocker) Firestore isteklerini engelliyor.<br>
                    <small>Çözüm: Ad blocker'ı devre dışı bırakın veya gizli modda test edin.</small>
                    <button onclick="this.parentElement.remove()" style="
                        margin-top: 10px;
                        padding: 5px 10px;
                        background: white;
                        color: #ff4444;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    ">Kapat</button>
                `;
                document.body.appendChild(errorDiv);
                sessionStorage.setItem('firebase_error_shown', 'true');
                
                // 10 saniye sonra otomatik kapat
                setTimeout(() => {
                    if (errorDiv.parentElement) {
                        errorDiv.remove();
                    }
                }, 10000);
            }, 2000);
        }
    }
}, true);

// Predefined message functions
function generateBullyingMessage(bullyingType) {
    const messages = {
        'sozel': [
            'Sen gerçekten çok aptalsın, hiçbir şey bilmiyorsun!',
            'Neden hep yanlış yapıyorsun? Hiçbir işe yaramıyorsun.',
            'Sınıfın en kötüsü sensin, herkes bunu biliyor.'
        ],
        'dislama': [
            'Seni partiye davet etmedik, kimse seni istemiyor.',
            'Bizim gruba giremezsin, sen bizden değilsin.',
            'Kimse seninle oturmak istemiyor.'
        ],
        'tehdit': [
            'Eğer bunu birine söylersen seni döverim!',
            'Yarın buluşalım, hesaplaşacağız!',
            'Sen bittin, göreceksin!'
        ],
        'iftira': [
            'Herkes senin hırsızlık yaptığını söylüyor, doğru mu?',
            'Öğretmene şikayet etmişsin diye duydum, hain!',
            'Sen herkesi arkadan konuşuyormuşsun.'
        ],
        'kimlik': [
            'Ben senin en iyi arkadaşınım, şifreni söyler misin?',
            'Merhaba ben öğretmenim, not bilgilerini gönderir misin?',
            'Arkadaşınım, acil param bitti, para gönderebilir misin?'
        ]
    };
    
    const typeMessages = messages[bullyingType] || ['Mesaj yüklenemedi.'];
    return typeMessages[Math.floor(Math.random() * typeMessages.length)];
}

function generateFriendlyMessage() {
    const messages = [
        'Bugün okul nasıldı? Ben çok eğlendim! 😊',
        'Hafta sonu sinemaya gidelim mi? 🎬',
        'O diziyi izledin mi? Çok güzeldi! 📺',
        'Yarın buluşalım mı? Çok özledim seni! 🤗',
        'Doğum günün için sana hediye aldım! 🎁',
        'Maç çok heyecanlıydı, izledin mi? ⚽',
        'Yeni oyunu denedim, çok güzel! Sen de oyna! 🎮',
        'Ödevde yardım ister misin? Beraber yapalım! 📚'
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
}

function continueConversation(conversationHistory, userMessage) {
    const responses = [
        'Anladım 😊 Ben de öyle düşünüyorum!',
        'Harika! Çok güzel fikir! 👍',
        'Evet, kesinlikle! Ben de çok seviyorum.',
        'Çok eğlenceli olur! Ne zaman buluşalım?',
        'Teşekkürler! Sen de çok iyisin! 🤗',
        'Tamam, anlaştık! Görüşürüz! 😊',
        'Bence de öyle! Çok iyi oldu!',
        'Haklısın! Ben de aynı şeyi düşünüyordum.',
        'Süper! Bunu deneyeceğim! 🎉',
        'Güzel fikir! Beraber yapalım! 💪'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Oturum tipi ve zorbalık türü etiketleri
const SESSION_LABELS = {
    'genelleme-on': 'Genelleme Ön-Test',
    'baslama': 'Başlama Düzeyi',
    'uygulama': 'Uygulama',
    'genelleme-son': 'Genelleme Son-Test',
    'izleme-2': 'İzleme (2. Hafta)',
    'izleme-4': 'İzleme (4. Hafta)',
    'izleme-8': 'İzleme (8. Hafta)',
    // Eski oturum değerleriyle geriye dönük uyumluluk
    'orta': 'Orta Düzey',
    'ileri': 'İleri Düzey'
};

const BULLYING_TYPE_LABELS = {
    'sozel':   'Kötü Söz',
    'dislama': 'Yalnız Bırakma',
    'tehdit':  'Tehdit',
    'iftira':  'Yalan Yaymak',
    'kimlik':  'Sahte Hesap'
};

// 6 beceri adı (özet + admin tabloları)
const SKILL_LABELS = [
    { key: 'navigation',    label: '1. Gelen mesajı açma' },
    { key: 'reading',       label: '2. Gelen mesajı okuma' },
    { key: 'replying',      label: '3. Siber zorbalık içermeyen mesajı cevaplama' },
    { key: 'reporting',     label: '4. Siber zorbalık içeren mesajı şikâyet etme' },
    { key: 'complaintType', label: '5. Siber zorbalık şikayet türünü seçme' },
    { key: 'blocking',      label: '6. Siber zorbalık yapan kişiyi engelleme' }
];

function formatMesajSkoru(correct, wrong, total) {
    const t = total != null ? total : (correct + wrong);
    if (t === 0) return '0 mesaj';
    if (wrong === 0) return `${correct} doğru`;
    if (correct === 0) return `${wrong} yanlış`;
    return `${correct} doğru ${wrong} yanlış`;
}

/** Firestore mesaj satırlarından kuyruk bazlı özet (5 mesaj = 5 satır mantığı) */
function computeSlotSummaryFromRows(rows) {
    if (!rows || rows.length === 0) return { correct: 0, wrong: 0, total: 0 };
    const allHaveSlot = rows.every(r => r.queueSlotIndex != null && r.queueSlotIndex !== undefined);
    if (!allHaveSlot) {
        const replies = rows.filter(r => r.action === 'reply');
        const blocks = rows.filter(r => r.action === 'block');
        const abandons = rows.filter(r => r.action === 'abandon_home');
        let correct = 0, wrong = 0;
        replies.forEach(r => { if (r.correct) correct++; else wrong++; });
        blocks.forEach(r => { if (r.correct) correct++; else wrong++; });
        abandons.forEach(() => { wrong++; });
        const total = replies.length + blocks.length + abandons.length;
        return { correct, wrong, total: total || rows.length };
    }
    const bySlot = {};
    rows.forEach(r => {
        const s = r.queueSlotIndex;
        if (!bySlot[s]) bySlot[s] = [];
        bySlot[s].push(r);
    });
    let correct = 0, wrong = 0;
    const keys = Object.keys(bySlot).sort((a, b) => Number(a) - Number(b));
    keys.forEach(sk => {
        const slotRows = bySlot[sk];
        const hasAbandon = slotRows.some(x => x.action === 'abandon_home');
        const reply = slotRows.find(x => x.action === 'reply');
        const block = slotRows.find(x => x.action === 'block');
        const reportWrong = slotRows.some(x => x.action === 'report' && !x.correct);
        if (reply) {
            if (reply.correct) correct++;
            else wrong++;
        } else if (hasAbandon) {
            wrong++;
        } else if (block) {
            if (block.correct && !reportWrong) correct++;
            else wrong++;
        } else {
            wrong++;
        }
    });
    return { correct, wrong, total: keys.length };
}

function recordQueueSlotOutcome(outcome) {
    const idx = currentSession.currentMessageIndex;
    if (!currentSession.slotRecorded) currentSession.slotRecorded = {};
    if (currentSession.slotRecorded[idx]) return;
    currentSession.slotRecorded[idx] = true;
    if (outcome === 'correct') currentSession.stats.correct++;
    else currentSession.stats.wrong++;
}

/** Olumlu (güvenli) mesaj turu mu? — şikayet/engel burada yanlış kabul edilir */
function isSafeScenario(scenario) {
    if (!scenario) return false;
    if (scenario.isNormal === true) return true;
    if (scenario.conversation && scenario.conversation.length) return true;
    if (!scenario.messages || !scenario.messages.length) return true;
    return !scenario.messages.some(m => m.type === 'cyberbullying');
}

// Current user state
let currentUser = null;
let bootLoadingHidden = false;

function showBootLoading() {
    const overlay = document.getElementById('boot-loading-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
}

function hideBootLoading() {
    if (bootLoadingHidden) return;
    const overlay = document.getElementById('boot-loading-overlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    bootLoadingHidden = true;
    setTimeout(() => {
        if (overlay.parentElement) overlay.remove();
    }, 320);
}

// Uygulama ilk açılışında auth sonucu gelene kadar loading göster
showBootLoading();

// Dev modu: localhost + ?dev=1 ile simülasyon formunu atla, direkt main-app'e git
function isDevMode() {
    const local = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const params = new URLSearchParams(window.location.search);
    return local && (params.get('dev') === '1' || params.get('dev') === 'true');
}

async function startDevSimulation() {
    if (!currentUser) {
        currentUser = { uid: 'dev-user', email: 'dev@localhost', displayName: 'Dev Kullanıcı' };
    }
    const sessionId = `S${Date.now()}_dev`;
    currentSession = getEmptySession({
        sessionId,
        participantId: `P${Date.now()}`,
        participantName: 'Test',
        participantAge: 15,
        sessionType: 'baslama',
        currentBullyingType: 'all',
        startTime: new Date(),
        userId: currentUser.uid,
        hintEnabled: true,
        skills: { navigation: true, reading: false, replying: false, reporting: false, complaintType: false, blocking: false }
    });
    try {
        await db.collection('users').doc(currentUser.uid).collection('sessions').doc(sessionId).set({
            participantName: 'Test',
            participantAge: 15,
            sessionType: 'baslama',
            hintEnabled: true,
            startedAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'active'
        });
    } catch (e) {
        console.warn('Dev mod: Firestore oturum kaydı atlandı', e);
    }
    // Dev modu kuyruk: 3 zorbalık + 2 normal AI mesajı karıştır
    const _devBullyQueue = (typeof buildMessageQueue === 'function') ? buildMessageQueue('Test', 'all') : [];
    if (typeof normalMesajlariKaristir === 'function') {
        currentSession.messageQueue = normalMesajlariKaristir(_devBullyQueue, 2);
    } else {
        currentSession.messageQueue = _devBullyQueue;
    }

    showScreen('main-app');
    generateFeed();
    renderStories();

    // İlk mesajı 5 saniye sonra gönder
    if (currentSession.messageQueue.length > 0) {
        currentSession.messageQueue[0]._deliveredAt = new Date();
        currentSession.messageQueue[0]._status = 'delivered';
        setTimeout(() => sendNextMessageNotification(), 5000);
    }

    console.log('🚀 Dev mod: Simülasyon direkt açıldı');
}

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
    console.log('Auth state changed:', user ? user.uid : 'No user');
    
    if (user) {
        // "Beni Hatırla" kontrolü - Sadece otomatik giriş (sayfa yüklendiğinde) için
        // Manuel giriş yapıldığında kontrol yapma
        if (!isManualLogin) {
            const rememberMe = localStorage.getItem('safetagram_remember');
            
            if (rememberMe !== 'true') {
                // "Beni Hatırla" işaretli değilse ve otomatik giriş ise oturumu kapat
                console.log('⚠️ "Beni Hatırla" işaretli değil, otomatik giriş engellendi...');
                await auth.signOut();
                currentUser = null;
                showScreen('auth-screen');
                hideBootLoading();
                return;
            }
        }
        
        // Manuel giriş flag'ini sıfırla
        isManualLogin = false;
        
        currentUser = user;
        console.log('✅ User logged in:', user.email);
        
        try {
        // Get user data from Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            currentUser.displayName = `${userData.firstName} ${userData.lastName}`;
            currentUser.firstName = userData.firstName;
            currentUser.lastName = userData.lastName;
            currentUser.email = userData.email;
                console.log('User data loaded:', currentUser.displayName);
            } else {
                console.warn('User document not found in Firestore');
        }
        
        await updatePanelUserInfo();

        // REFRESH KONTROLÜ: Hafızada eski oturum var mı?
        const restored = loadAppState();

        if (!restored || restored.currentScreen === 'auth-screen') {
            // Show panel screen if on auth screen (veya dev modda direkt simülasyona git)
            if (document.getElementById('auth-screen').classList.contains('active')) {
                if (isDevMode()) {
                    console.log('🔧 Dev mod: Simülasyona direkt gidiliyor...');
                    await startDevSimulation();
                } else {
                    console.log('Switching to panel screen');
                    showScreen('panel-screen');
                }
            }
        }
        } catch (error) {
            console.error('Error loading user data:', error);
            
            // Permission hatası için özel mesaj
            if (error.code === 'permission-denied') {
                console.error('🚫 Firestore izin hatası: Güvenlik kuralları yanlış yapılandırılmış');
                console.error('💡 Çözüm: Firebase Console > Firestore Database > Rules sekmesine gidin');
                console.error('📖 Detaylı adımlar için: FIREBASE_REACTIVATE.md dosyasına bakın');
                showNotification('Firestore İzin Hatası', 'Firebase Console\'da güvenlik kurallarını kontrol edin. Detaylar için konsola bakın.', 'error');
            } else {
                showNotification('Uyarı', 'Kullanıcı bilgileri yüklenemedi.', 'warning');
            }
        }
        hideBootLoading();
    } else {
        // Dev modda dummy currentUser varsa auth observer'ın onu sıfırlamasına izin verme
        if (isDevMode()) {
            console.log('🔧 Dev mod: auth observer redirect engellendi');
            hideBootLoading();
            return;
        }
        currentUser = null;
        currentSession = getEmptySession();
        clearAppState();
        console.log('User logged out');
        // Show auth screen if not on it
        const authScreen = document.getElementById('auth-screen');
        if (authScreen && !authScreen.classList.contains('active')) {
            showScreen('auth-screen');
        }
        hideBootLoading();
    }
});

// Update panel user info
async function updatePanelUserInfo() {
    if (!currentUser) return;

    // Varsayılan değerler
    let firstName = '';
    let lastName = '';
    let email = currentUser.email || '';

    // Firestore'dan kullanıcı verilerini al
    try {
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            firstName = userData.firstName || '';
            lastName = userData.lastName || '';
            email = userData.email || email;
        }
    } catch (err) {
        console.error('Kullanıcı verisi alınırken hata:', err);
    }

    const fullName = `${firstName} ${lastName}`.trim() || 'Kullanıcı';

    // Panel Screen güncelle
    const panelFullname = document.querySelector('#panel-user-name .user-fullname');
    const panelEmail = document.getElementById('panel-user-email');
    if (panelFullname) panelFullname.textContent = fullName;
    if (panelEmail) panelEmail.textContent = email;

    // App Entry Screen güncelle
    const appFullname = document.querySelector('#app-entry-user-name .user-fullname');
    const appEmail = document.getElementById('app-entry-user-email');
    if (appFullname) appFullname.textContent = fullName;
    if (appEmail) appEmail.textContent = email;

    // Admin Panel güncelle
    const adminFullname = document.querySelector('#admin-user-name .user-fullname');
    const adminEmail = document.getElementById('admin-user-email');
    if (adminFullname) adminFullname.textContent = fullName;
    if (adminEmail) adminEmail.textContent = email;
}

// Auth form toggles ve form handlers
document.addEventListener('DOMContentLoaded', () => {
    // Dev mod: login olmadan direkt simülasyona git
    if (isDevMode()) {
        console.log('🔧 Dev mod aktif: simülasyon açılıyor...');
        startDevSimulation();
        return;
    }

    const showSignupBtn = document.getElementById('show-signup');
    const showLoginBtn = document.getElementById('show-login');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (showSignupBtn && loginForm && signupForm) {
        showSignupBtn.addEventListener('click', () => {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        });
    }
    
    if (showLoginBtn && loginForm && signupForm) {
        showLoginBtn.addEventListener('click', () => {
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

// Whitelist kontrolü (allowed_emails) - birden fazla ID formatını destekler
async function isAllowedEmail(email) {
    const normalized = String(email || '').trim().toLowerCase();
    if (!normalized) return false;

    const candidates = Array.from(new Set([
        normalized,                              // ali.veli@gmail.com
        normalized.replace(/\./g, '_'),          // ali_veli@gmail_com
        normalized.replace(/[@.]/g, '_'),        // ali_veli_gmail_com
        normalized.replace(/@/g, '_at_').replace(/\./g, '_') // ali_veli_at_gmail_com
    ]));

    // 1) Belge ID'den kontrol
    for (const key of candidates) {
        const snap = await db.collection('allowed_emails').doc(key).get();
        if (snap.exists) return true;
    }

    // 2) Alan bazlı fallback (doc içine email/emailLower yazıldıysa)
    const byEmail = await db.collection('allowed_emails')
        .where('email', '==', normalized)
        .limit(1)
        .get();
    if (!byEmail.empty) return true;

    const byEmailLower = await db.collection('allowed_emails')
        .where('emailLower', '==', normalized)
        .limit(1)
        .get();
    return !byEmailLower.empty;
}

// Signup Form Handler
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const firstName = document.getElementById('signup-firstname').value.trim();
            const lastName  = document.getElementById('signup-lastname').value.trim();
            const email     = document.getElementById('signup-email').value.trim().toLowerCase();
            const password  = document.getElementById('signup-password').value;

            try {
                // ── Beyaz liste kontrolü ──────────────────────────────────
                const allowed = await isAllowedEmail(email);
                if (!allowed) {
                    showNotification(
                        'Erişim Reddedildi',
                        'Bu e-posta adresi kayıt için onaylı değil. Lütfen araştırmacıyla iletişime geçin.',
                        'error'
                    );
                    return;
                }
                // ─────────────────────────────────────────────────────────

                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                await db.collection('users').doc(user.uid).set({
                    firstName,
                    lastName,
                    email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                showNotification('Başarılı!', 'Üyeliğiniz onaylandı! Hoş geldiniz.', 'success');
                document.getElementById('signupForm').reset();

            } catch (error) {
                console.error('Signup error:', error);
                let errorMessage = 'Kayıt sırasında bir hata oluştu.';
                if (error.code === 'auth/email-already-in-use') errorMessage = 'Bu e-posta adresi zaten kullanılıyor.';
                else if (error.code === 'auth/invalid-email')   errorMessage = 'Geçersiz e-posta adresi.';
                else if (error.code === 'auth/weak-password')   errorMessage = 'Şifre çok zayıf. En az 6 karakter olmalı.';
                else if (error.code === 'permission-denied')    errorMessage = 'Firestore erişimi reddedildi. Rules bölümünü tekrar Publish edin.';
                showNotification('Hata', errorMessage, 'error');
            }
        });
    }

    // Login Form Handler - BENİ HATIRLA EKLENDİ + GELİŞTİRİLMİŞ ERROR HANDLING
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            const rememberMeCheckbox = document.getElementById('remember-me');
            
            if (!emailInput || !passwordInput) {
                showNotification('Hata', 'Form elementleri bulunamadı.', 'error');
                return;
            }
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;
            
            // Basit doğrulama
            if (!email || !password) {
                showNotification('Uyarı', 'Lütfen e-posta ve şifrenizi girin.', 'warning');
                return;
            }
            
            if (!auth) {
                showNotification('Hata', 'Firebase Auth yüklenmedi. Sayfayı yenileyin.', 'error');
                console.error('Firebase auth is not initialized');
                return;
            }
            
            try {
                console.log('Login attempt:', email, 'Remember:', rememberMe);
                
                // Manuel giriş flag'ini set et - onAuthStateChanged'de kontrol yapılmasın
                isManualLogin = true;
                
                // Firebase Auth persistence ayarla
                const persistence = rememberMe ? 
                    firebase.auth.Auth.Persistence.LOCAL : 
                    firebase.auth.Auth.Persistence.SESSION;
                
                await auth.setPersistence(persistence);
                console.log('Persistence set to:', persistence);
                
                // Giriş yap
                const userCredential = await auth.signInWithEmailAndPassword(email, password);
                console.log('Login successful:', userCredential.user.uid);
                
                // Remember me tercihini sakla
                if (rememberMe) {
                    localStorage.setItem('safetagram_remember', 'true');
                    localStorage.setItem('safetagram_email', email);
                } else {
                    localStorage.removeItem('safetagram_remember');
                    localStorage.removeItem('safetagram_email');
                }
                
        showNotification('Başarılı!', 'Giriş yapıldı. Hoş geldiniz!', 'success');
                
                // Form resetleme - remember me checkbox'ı koru
                emailInput.value = '';
                passwordInput.value = '';
                if (rememberMeCheckbox && !rememberMe) {
                    rememberMeCheckbox.checked = false;
                }
                
    } catch (error) {
        console.error('Login error:', error);
                console.error('Error code:', error.code);
                console.error('Error message:', error.message);
                
        let errorMessage = 'Giriş yapılırken bir hata oluştu.';
        
                switch(error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı. Lütfen üye olun.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Şifreniz yanlış. Lütfen tekrar deneyin.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Geçersiz e-posta adresi formatı.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'Bu hesap devre dışı bırakılmış. Yönetici ile iletişime geçin.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.';
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.';
                        break;
                    case 'auth/invalid-credential':
                        errorMessage = 'E-posta veya şifre hatalı. Lütfen kontrol edip tekrar deneyin.';
                        break;
                    default:
                        errorMessage = `Giriş hatası: ${error.message}`;
                }
                
                showNotification('Giriş Başarısız', errorMessage, 'error');
            }
        });
    }
    
    // Sayfa yüklendiğinde "Beni Hatırla" durumunu kontrol et (Madde 10)
    const rememberMe = localStorage.getItem('safetagram_remember');
    const savedEmail = localStorage.getItem('safetagram_email');
    
    // Not: "Beni Hatırla" kontrolü onAuthStateChanged içinde yapılıyor
    // Burada sadece email'i form'a dolduruyoruz
    
    if (rememberMe === 'true' && savedEmail) {
        const emailInput = document.getElementById('login-email');
        const rememberCheckbox = document.getElementById('remember-me');
        
        if (emailInput) {
            emailInput.value = savedEmail;
        }
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }
    
    // Yaş input validasyonu - değerin otomatik düşmesini önle
    const ageInput = document.getElementById('participant-age');
    if (ageInput) {
        ageInput.addEventListener('input', (e) => {
            let value = parseInt(e.target.value);
            if (value < 1) {
                e.target.value = 1;
            } else if (value > 120) {
                e.target.value = 120;
            }
        });
        
        // Sayfa değiştirme/refresh durumunda değeri koru
        ageInput.addEventListener('blur', (e) => {
            if (!e.target.value || e.target.value < 1) {
                e.target.value = '';
            }
        });
    }
    
    // Session Form Handler'ı başlat
    initSessionFormHandler();
    
    // Panel butonlarını başlat
    initPanelButtons();
    
    console.log('✅ Tüm event listenerlar başlatıldı');
});

// Panel Logout - DOMContentLoaded içinde tanımlanacak (initPanelButtons içinde)

// Panel Buttons - DOMContentLoaded içinde tanımlanacak
function initPanelButtons() {
    // App Entry Button
    const appEntryBtn = document.getElementById('app-entry-btn');
    if (appEntryBtn) {
        appEntryBtn.addEventListener('click', async () => {
            console.log('🚀 Uygulamaya Giriş butonuna tıklandı');
            if (isDevMode()) {
                console.log('🔧 Dev mod: Simülasyona direkt gidiliyor...');
                await startDevSimulation();
                return;
            }
            showScreen('app-entry-screen');
            updatePanelUserInfo();
        });
    }

    // Academic Panel Button
    const academicPanelBtn = document.getElementById('academic-panel-btn');
    if (academicPanelBtn) {
        academicPanelBtn.addEventListener('click', () => {
    showScreen('admin-panel');
    loadAdminData();
});
    }

    // Back to Panel Button
    const backToPanelBtn = document.getElementById('back-to-panel');
    if (backToPanelBtn) {
        backToPanelBtn.addEventListener('click', () => {
    showScreen('panel-screen');
});
    }

// Admin Back Button
    const adminBackBtn = document.getElementById('admin-back-btn');
    if (adminBackBtn) {
        adminBackBtn.addEventListener('click', () => {
    showScreen('panel-screen');
});
    }

// Admin Logout
const adminLogoutBtn = document.getElementById('admin-logout');
if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', async () => {
        try {
            clearAppState();
            await auth.signOut();
            showNotification('Başarılı', 'Çıkış yapıldı.', 'success');
        } catch (error) {
            console.error('Logout error:', error);
            showNotification('Hata', 'Çıkış yapılırken bir hata oluştu.', 'error');
        }
    });
}

    // Panel Logout
    const panelLogoutBtn = document.getElementById('panel-logout');
    if (panelLogoutBtn) {
        panelLogoutBtn.addEventListener('click', async () => {
            try {
                clearAppState();
                currentSession = getEmptySession();
                await auth.signOut();
                showNotification('Başarılı', 'Çıkış yapıldı.', 'success');
            } catch (error) {
                console.error('Logout error:', error);
                showNotification('Hata', 'Çıkış yapılırken bir hata oluştu.', 'error');
            }
        });
    }
}

// Session Form Handler (App Entry) - DOMContentLoaded içinde tanımlanacak
// Bu fonksiyon aşağıda DOMContentLoaded event listener içinde bağlanacak

function initSessionFormHandler() {
    const sessionForm = document.getElementById('sessionForm');
    if (!sessionForm) {
        console.error('❌ sessionForm bulunamadı!');
        return;
    }
    
    console.log('✅ sessionForm event listener eklendi');
    
    sessionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
        console.log('📝 Session form submit edildi');
        console.log('👤 currentUser:', currentUser ? currentUser.email : 'null');
    
    if (!currentUser) {
            console.error('❌ currentUser null, giriş yapılmamış');
        showNotification('Hata', 'Lütfen önce giriş yapın.', 'error');
        return;
    }
        
        console.log('✅ currentUser var, form işleniyor');
    
    const name = document.getElementById('participant-name').value.trim();
    const age = document.getElementById('participant-age').value;
    const sessionType = document.getElementById('session-type').value;
    const hintRadio = document.querySelector('input[name="hint-option"]:checked');
    const hintEnabled = hintRadio ? hintRadio.value === 'use' : true;
        
        console.log('📋 Form değerleri:', { name, age, sessionType, hintEnabled });
    
    if (!name || !age || !sessionType) {
            console.error('❌ Form alanları eksik');
        showNotification('Hata', 'Lütfen tüm alanları doldurun!', 'error');
        return;
    }
    
        // Yaş validasyonu
        const ageNum = parseInt(age);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
            console.error('❌ Yaş geçersiz:', age);
            showNotification('Hata', 'Lütfen geçerli bir yaş girin (1-120).', 'error');
            return;
        }
        
        console.log('✅ Form validasyonu başarılı');
        
        // AI her zaman aktif (Madde 1 & 2 - uyarı yok)
        
        // Oturum başlangıcında TÜM STATE'i SIFIRLA (Madde 6)
        // Zamanlayıcıları temizle
        if (currentSession.messageTimeout) {
            clearTimeout(currentSession.messageTimeout);
        }
        if (currentSession.hintTimeout) {
            clearTimeout(currentSession.hintTimeout);
        }
        
        console.log('🔄 State sıfırlanıyor...');
    
    // Generate a unique session ID
    const sessionId = `S${Date.now()}`;
    currentSession = getEmptySession({
        sessionId,
        participantId: `P${Date.now()}`,
        participantName: name,
        participantAge: parseInt(age),
        sessionType,
        currentBullyingType: 'all',
        startTime: new Date(),
        userId: currentUser.uid,
        hintEnabled
    });
    saveAppState();
        
        console.log('✅ currentSession oluşturuldu:', sessionId);
        
        // localStorage ve sessionStorage'i temizle (Madde 6)
        // Her yeni oturumda geçmiş mesajlar ASLA sızmasın
        localStorage.removeItem('safestagram_users');
        sessionStorage.removeItem('safestagram_session');
        
        console.log('💾 Firebase oturum oluşturuluyor...');
    
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
            console.log('✅ Firebase oturum oluşturuldu');
    } catch (error) {
            console.error('❌ Firebase oturum hatası:', error);
        showNotification('Hata', 'Oturum oluşturulamadı.', 'error');
        return;
    }
    
    // Beceri 1 (navigation = "Gelen mesajı açma") başlangıçta false — mesaj açılınca true olacak
    currentSession.skills.navigation = false;
    
    // Öğrenciye özgü, rastgele ve tekrarsız mesaj kuyruğu oluştur
    let _bullyQueue = [];
    if (typeof buildMessageQueue === 'function') {
        _bullyQueue = buildMessageQueue(
            currentSession.participantName,
            currentSession.currentBullyingType || 'all'
        );
    }
    // Normal (zorbalık içermeyen) AI mesajlarını karıştır (2 adet)
    if (typeof normalMesajlariKaristir === 'function') {
        currentSession.messageQueue = normalMesajlariKaristir(_bullyQueue, 2);
    } else {
        currentSession.messageQueue = _bullyQueue;
    }
    currentSession.deliveredMessages = currentSession.deliveredMessages || [];
    currentSession.currentMessageIndex = 0;

    showScreen('main-app');
    generateFeed();
    renderStories();

    // İlk mesajı 5 saniye sonra gönder
    if (currentSession.messageQueue.length > 0) {
        currentSession.messageQueue[0]._deliveredAt = new Date();
        currentSession.messageQueue[0]._status = 'delivered';
        setTimeout(() => sendNextMessageNotification(), 5000);
    }
});
}

// Boş oturum nesnesi üretir — tüm reset noktaları bu fonksiyonu kullanır
function getEmptySession(overrides = {}) {
    return {
        sessionId: "",
        userId: "",
        sessionType: "",
        participantId: "",
        participantName: "",
        participantAge: 0,
        startTime: null,
        endTime: null,
        totalDurationSec: 0,
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
            complaintType: false,
            blocking: false
        },
        stats: { correct: 0, wrong: 0, hints: 0 },
        slotRecorded: {},
        slotScheduledAdvance: {},
        reportWrongForSlot: false,
        currentMessageStartTime: null,
        hintTimeout: null,
        messageTimeout: null,
        nextMessageDueAt: null,
        reportClicked: false,
        blockClicked: false,
        pendingMessages: 0,
        messageQueue: [],
        currentMessageIndex: 0,
        selectedComplaintReason: null,
        conversationHistory: {},
        hintEnabled: true,
        deliveredMessages: [],
        perMessageResults: [],
        skillSteps: {
            navigation: false,
            reading: false,
            replying: false,
            reporting: false,
            complaintType: false,
            blocking: false
        },
        ...overrides
    };
}

// Global değişkenler - YENİ YAPI (Madde 6)
let currentSession = getEmptySession();

// Uygulama durumunu yerel depolamaya kaydet
function saveAppState() {
    if (!currentUser) return;
    try {
        const state = {
            currentScreen: document.querySelector('.screen.active')?.id || 'panel-screen',
            session: currentSession,
            lastUpdate: Date.now()
        };
        localStorage.setItem('safetagram_persistence', JSON.stringify(state));
    } catch (e) {
        console.error('State kaydetme hatası:', e);
    }
}

// Uygulama durumunu geri yükle
function loadAppState() {
    const savedState = localStorage.getItem('safetagram_persistence');
    if (!savedState) return null;

    try {
        const state = JSON.parse(savedState);

        const sessionState = state.session || state.currentSession;
        if (sessionState) {
            currentSession = {
                ...getEmptySession(),
                ...sessionState
            };

            // JSON sonrası Date alanlarını geri dönüştür
            if (currentSession.startTime) currentSession.startTime = new Date(currentSession.startTime);
            if (currentSession.endTime) currentSession.endTime = new Date(currentSession.endTime);
            if (currentSession.deliveredMessages) {
                currentSession.deliveredMessages.forEach(msg => {
                    if (msg.createdAt) msg.createdAt = new Date(msg.createdAt);
                    if (msg.deliveredAt) msg.deliveredAt = new Date(msg.deliveredAt);
                    if (msg.readAt) msg.readAt = new Date(msg.readAt);
                });
            }

            // Timer referansları restore edilmez
            currentSession.messageTimeout = null;
            currentSession.hintTimeout = null;
        }

        if (state.currentScreen && state.currentScreen !== 'auth-screen') {
            showScreen(state.currentScreen);

            // Ekran bazlı arayüzü yeniden kur
            if (state.currentScreen === 'main-app') {
                generateFeed();
                renderStories();
                if (currentSession.pendingMessages === 0 &&
                    currentSession.currentMessageIndex < currentSession.messageQueue.length) {
                    const currentQueueIndex = currentSession.currentMessageIndex;
                    const alreadyDelivered = (currentSession.deliveredMessages || []).some(
                        m => m.queueIndex === currentQueueIndex
                    );
                    if (!alreadyDelivered) {
                        if (currentSession.nextMessageDueAt) {
                            const remainingMs = currentSession.nextMessageDueAt - Date.now();
                            if (remainingMs <= 0) {
                                console.log('🔄 Akış kaldığı yerden devam ediyor: süresi dolan bildirim hemen tetikleniyor');
                                currentSession.nextMessageDueAt = null;
                                sendNextMessageNotification();
                                saveAppState();
                            } else {
                                console.log('🔄 Akış kaldığı yerden devam ediyor: kalan süreyle zamanlayıcı geri yüklendi', { remainingMs });
                                currentSession.messageTimeout = setTimeout(() => {
                                    currentSession.messageTimeout = null;
                                    currentSession.nextMessageDueAt = null;
                                    clearScenarioCountdownDebug();
                                    sendNextMessageNotification();
                                    saveAppState();
                                }, remainingMs);

                                let remainingSec = Math.ceil(remainingMs / 1000);
                                clearScenarioCountdownDebug();
                                scenarioCountdownInterval = setInterval(() => {
                                    remainingSec -= 1;
                                    if (remainingSec > 0) {
                                        console.log(`[DEBUG][schedule] kalan: ${remainingSec}s (restore idx=${currentSession.currentMessageIndex})`);
                                    } else {
                                        clearScenarioCountdownDebug();
                                    }
                                }, 1000);
                            }
                        }
                    } else if (currentSession.nextMessageDueAt) {
                        currentSession.nextMessageDueAt = null;
                        saveAppState();
                    }
                }
            } else if (state.currentScreen === 'dm-screen' && currentSession.currentScenario) {
                openSpecificDM(currentSession.currentScenario);
            } else if (state.currentScreen === 'inbox-screen') {
                renderInboxList();
            }

            // Senaryo koruyucu: refresh sonrası asılı akışları otomatik ittir
            if (state.currentScreen === 'main-app' || state.currentScreen === 'panel-screen') {
                setTimeout(checkAndResumeScenario, 2000);
            }
        }

        return state;
    } catch (e) {
        console.error('State yükleme hatası:', e);
        return null;
    }
}

// Tüm persistence verilerini temizle
function clearAppState() {
    localStorage.removeItem('safetagram_persistence');
}

// Persistent message history functions
function loadMessageHistory(participantName) {
    const allUsers = localStorage.getItem('safestagram_users');
    if (allUsers) {
        let usersData;
        try { usersData = JSON.parse(allUsers); } catch (e) { console.warn('[loadMessageHistory] bozuk veri:', e); return {}; }
        const normalizedName = participantName.toLowerCase().trim();
        if (usersData[normalizedName]) {
            return usersData[normalizedName].conversations || {};
        }
    }
    return {};
}

function saveMessageHistory(participantName, conversations) {
    const allUsers = localStorage.getItem('safestagram_users');
    let usersData = {};
    if (allUsers) { try { usersData = JSON.parse(allUsers); } catch (e) { console.warn('[saveMessageHistory] bozuk veri sıfırlandı:', e); } }
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

function playNotificationSoundLegacy() {
    try {
        notificationSound.currentTime = 0;
        notificationSound.play().catch(err => {
            console.log('Could not play sound:', err);
        });
    } catch (e) {
        console.log('Sound playback error:', e);
    }
}

// Feed için gönderi verileri
// Not: Eğitim senaryosunda şu anda ana akış için post kullanılmıyor.
// Bu nedenle feed boş bırakıldı.
// Feed için gönderi verileri - scenarios.js'den POSTS_100 kullan
const POSTS = (typeof window !== 'undefined' && window.POSTS_100) ? window.POSTS_100 : (typeof POSTS_100 !== 'undefined' ? POSTS_100 : []);

// Ekran geçişleri
function showScreen(screenId) {
    if (screenId === 'panel-screen' && isDevMode() && currentUser) {
        startDevSimulation();
        return;
    }
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const el = document.getElementById(screenId);
    if (el) {
        el.classList.add('active');
        saveAppState();
    } else {
        console.error('[showScreen] Ekran bulunamadı:', screenId);
    }
}

// Feed'i oluştur
function generateFeed() {
    const feedContainer = document.getElementById('feed-container');
    feedContainer.innerHTML = '';

    // Her oturumda postları rastgele sırala
    const shuffledPosts = [...POSTS].sort(() => Math.random() - 0.5);

    shuffledPosts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        
        // Video veya image content
        // ✅ OPTİMİZASYON 1: Video postlarında iframe OLUŞTURULMAZ
        // Sadece placeholder div oluşturulur, iframe lazım olduğunda dinamik eklenir
        let mediaContent = '';
        if (post.type === 'video') {
            // Cloudinary video URL'sine autoplay parametresi ekle
            const videoUrl = post.videoEmbedUrl.includes('autoplay') 
                ? post.videoEmbedUrl 
                : post.videoEmbedUrl + (post.videoEmbedUrl.includes('?') ? '&' : '?') + 'autoplay=true&muted=true';
            
            mediaContent = `
                <div class="post-video" data-post="${index}" data-video-index="${index}" data-video-url="${videoUrl}" data-video-state="idle" style="width: 100%; overflow: hidden; position: relative;">
                    <div class="video-placeholder" style="width: 100%; aspect-ratio: 1 / 1; background: #1a1a1a; display: flex; align-items: center; justify-content: center;">
                        <div class="video-loading-indicator" style="text-align: center; color: #666;">
                            <i class="fas fa-play-circle" style="font-size: 48px; opacity: 0.5;"></i>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // ✅ OPTİMİZASYON 2: Görsellere loading="lazy" eklendi
            mediaContent = `
                <div class="post-image">
                    <img src="${post.image}" alt="Post" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
            `;
        }
        
        postDiv.innerHTML = `
            <div class="post-header">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${post.avatar}" alt="${post.username}" loading="lazy">
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
            
            if (this.classList.contains('liked')) {
                POSTS[postIndex].likes += 1;
            } else {
                POSTS[postIndex].likes -= 1;
            }
            
            likesElement.textContent = `${formatNumber(POSTS[postIndex].likes)} beğeni`;
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
    
    // ✅ OPTİMİZASYON 3: Gelişmiş video oynatma sistemi
    setupVideoAutoplay();
}

// ============================================================================
// ✅ OPTİMİZE EDİLMİŞ VİDEO OYNATMA SİSTEMİ
// Strateji: Lazy iframe creation + Prefetch + iframe pooling
// ============================================================================

// Aktif iframe havuzu - aynı anda en fazla 3 iframe DOM'da olur
const VIDEO_POOL = {
    maxActive: 3,        // Aynı anda max aktif iframe sayısı
    prefetchAhead: 2,    // Kaç video ilerisini önceden hazırla
    activeIframes: new Map(),  // videoIndex -> iframe element
    prefetchedUrls: new Set(), // Prefetch edilmiş URL'ler
    currentlyPlaying: null     // Şu an oynayan video index
};

// Video iframe'ini dinamik olarak oluştur
function createVideoIframe(videoContainer) {
    const videoUrl = videoContainer.getAttribute('data-video-url');
    const videoIndex = videoContainer.getAttribute('data-video-index');
    if (!videoUrl) return null;
    
    // Zaten iframe varsa tekrar oluşturma
    const existingIframe = videoContainer.querySelector('iframe');
    if (existingIframe) return existingIframe;
    
    // Placeholder'ı kaldır
    const placeholder = videoContainer.querySelector('.video-placeholder');
    
    // Loading spinner göster
    if (placeholder) {
        placeholder.innerHTML = `
            <div style="text-align: center; color: #888;">
                <i class="fas fa-spinner fa-spin" style="font-size: 36px;"></i>
                <div style="margin-top: 8px; font-size: 12px;">Video yükleniyor...</div>
            </div>
        `;
    }
    
    // iframe oluştur
    const iframe = document.createElement('iframe');
    iframe.id = `video-iframe-${videoIndex}`;
    iframe.src = videoUrl;
    iframe.width = '100%';
    iframe.style.cssText = 'aspect-ratio: 1 / 1; border: none; display: block;';
    iframe.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('frameborder', '0');
    
    // iframe yüklendiğinde placeholder'ı kaldır
    iframe.addEventListener('load', () => {
        if (placeholder && placeholder.parentNode) {
            placeholder.remove();
        }
        videoContainer.setAttribute('data-video-state', 'playing');
        console.log(`▶️ Video ${videoIndex} yüklendi ve oynatılıyor`);
    });
    
    videoContainer.appendChild(iframe);
    VIDEO_POOL.activeIframes.set(videoIndex, iframe);
    
    return iframe;
}

// Eski (görünmeyen) iframe'leri temizle - bellek optimizasyonu
function cleanupDistantIframes(currentIndex) {
    const currentIdx = parseInt(currentIndex);
    const toRemove = [];
    
    VIDEO_POOL.activeIframes.forEach((iframe, idx) => {
        const numIdx = parseInt(idx);
        // Mevcut videodan 3'ten fazla uzaktaki iframe'leri kaldır
        if (Math.abs(numIdx - currentIdx) > 3) {
            toRemove.push(idx);
        }
    });
    
    toRemove.forEach(idx => {
        const iframe = VIDEO_POOL.activeIframes.get(idx);
        if (iframe && iframe.parentNode) {
            // iframe'i kaldır, placeholder'ı geri koy
            const container = iframe.closest('.post-video');
            iframe.remove();
            
            if (container) {
                container.setAttribute('data-video-state', 'idle');
                // Placeholder'ı geri ekle
                const placeholder = document.createElement('div');
                placeholder.className = 'video-placeholder';
                placeholder.style.cssText = 'width: 100%; aspect-ratio: 1 / 1; background: #1a1a1a; display: flex; align-items: center; justify-content: center;';
                placeholder.innerHTML = `
                    <div class="video-loading-indicator" style="text-align: center; color: #666;">
                        <i class="fas fa-play-circle" style="font-size: 48px; opacity: 0.5;"></i>
                    </div>
                `;
                container.appendChild(placeholder);
            }
        }
        VIDEO_POOL.activeIframes.delete(idx);
        console.log(`🧹 Video ${idx} iframe temizlendi (uzak)`);
    });
}

// Sonraki videoları prefetch et (link preload ile DNS/bağlantı hazırla)
function prefetchUpcomingVideos(currentIndex) {
    const allVideoPosts = document.querySelectorAll('.post-video');
    const currentIdx = parseInt(currentIndex);
    
    allVideoPosts.forEach(post => {
        const postIdx = parseInt(post.getAttribute('data-video-index'));
        const videoUrl = post.getAttribute('data-video-url');
        
        if (!videoUrl) return;
        
        // Mevcut videodan 1-2 sonraki videoları prefetch et
        if (postIdx > currentIdx && postIdx <= currentIdx + VIDEO_POOL.prefetchAhead) {
            if (!VIDEO_POOL.prefetchedUrls.has(videoUrl)) {
                // DNS prefetch + preconnect ile bağlantıyı hazırla
                try {
                    const urlObj = new URL(videoUrl);
                    const origin = urlObj.origin;
                    
                    // Preconnect link ekle (henüz yoksa)
                    if (!document.querySelector(`link[href="${origin}"][rel="preconnect"]`)) {
                        const preconnect = document.createElement('link');
                        preconnect.rel = 'preconnect';
                        preconnect.href = origin;
                        preconnect.crossOrigin = 'anonymous';
                        document.head.appendChild(preconnect);
                    }
                    
                    // Prefetch link ekle
                    if (!document.querySelector(`link[href="${videoUrl}"][rel="prefetch"]`)) {
                        const prefetch = document.createElement('link');
                        prefetch.rel = 'prefetch';
                        prefetch.href = videoUrl;
                        prefetch.as = 'document'; // iframe içeriği
                        document.head.appendChild(prefetch);
                    }
                    
                    VIDEO_POOL.prefetchedUrls.add(videoUrl);
                    console.log(`📦 Video ${postIdx} prefetch edildi`);
                } catch (e) {
                    // URL parse hatası - yoksay
                }
            }
        }
    });
}

// Instagram benzeri video oynatma - gelişmiş versiyon
function setupVideoAutoplay() {
    const videoPosts = document.querySelectorAll('.post-video');
    if (videoPosts.length === 0) return;
    
    // ✅ Başlangıçta Cloudinary domain'lerine preconnect
    const cloudinaryOrigins = new Set();
    videoPosts.forEach(post => {
        const url = post.getAttribute('data-video-url');
        if (url) {
            try {
                cloudinaryOrigins.add(new URL(url).origin);
            } catch(e) {}
        }
    });
    cloudinaryOrigins.forEach(origin => {
        if (!document.querySelector(`link[href="${origin}"][rel="preconnect"]`)) {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = origin;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
            console.log(`🔗 Preconnect: ${origin}`);
        }
    });
    
    // ✅ Intersection Observer - çoklu threshold ile erken hazırlık
    // rootMargin: '200px' → video ekrana girmeden 200px önce hazırlığa başla
    const observerOptions = {
        root: null,
        rootMargin: '200px 0px 200px 0px', // Üstten ve alttan 200px erken tetikle
        threshold: [0, 0.25, 0.5, 0.75]    // Çoklu eşik
    };
    
    const handleVideoVisibility = (entries) => {
        entries.forEach(entry => {
            const videoContainer = entry.target;
            const videoIndex = videoContainer.getAttribute('data-video-index');
            const videoState = videoContainer.getAttribute('data-video-state');
            
            if (entry.isIntersecting) {
                // Video görünür bölgeye girdi
                if (entry.intersectionRatio >= 0.5) {
                    // %50+ görünür → iframe oluştur ve oynat
                    if (videoState === 'idle' || videoState === 'prefetched') {
                        createVideoIframe(videoContainer);
                        VIDEO_POOL.currentlyPlaying = videoIndex;
                        
                        // Uzaktaki iframe'leri temizle
                        cleanupDistantIframes(videoIndex);
                        
                        // Sonraki videoları prefetch et
                        prefetchUpcomingVideos(videoIndex);
                    }
                } else if (entry.intersectionRatio >= 0.1) {
                    // %10-50 arası görünür → prefetch başlat
                    prefetchUpcomingVideos(videoIndex);
                }
            } else {
                // Video tamamen görünmüyor
                // Ama iframe'i hemen silme - cleanupDistantIframes zaten uzak olanları temizler
                // Bu sayede hızlıca geri scroll edildiğinde yeniden yükleme gerekmez
            }
        });
    };
    
    const observer = new IntersectionObserver(handleVideoVisibility, observerOptions);
    
    // Her video post'unu gözlemle
    videoPosts.forEach(post => {
        observer.observe(post);
    });
    
    // İlk görünür video'yu hemen başlat
    const firstVisibleVideo = Array.from(videoPosts).find(post => {
        const rect = post.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight * 0.7;
    });
    
    if (firstVisibleVideo) {
        createVideoIframe(firstVisibleVideo);
        const idx = firstVisibleVideo.getAttribute('data-video-index');
        VIDEO_POOL.currentlyPlaying = idx;
        prefetchUpcomingVideos(idx);
    }
    
    console.log(`🎬 Video sistemi başlatıldı: ${videoPosts.length} video, max ${VIDEO_POOL.maxActive} aktif iframe`);
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

// Story state management - hikayeler devre dışı (boş liste)
let storyState = {
    currentStoryIndex: 0,
    stories: [],
    autoplayTimeout: null,
    progressTimeout: null
};

const STORY_STRIP_COUNT = 25;

function storyDicebearUrl(seed) {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(String(seed || 'user'))}`;
}

// Story üretimi — önce scenarios.js STORY_ITEMS (gerçek foto URL), yoksa STORY_USERS + Picsum/DiceBear
function generateStories() {
    storyState.stories = [];

    const rawItems = (typeof window !== 'undefined' && window.STORY_ITEMS && window.STORY_ITEMS.length)
        ? window.STORY_ITEMS
        : (typeof STORY_ITEMS !== 'undefined' && STORY_ITEMS.length ? STORY_ITEMS : null);
    const storyUsers = (typeof window !== 'undefined' && window.STORY_USERS) ? window.STORY_USERS : (typeof STORY_USERS !== 'undefined' ? STORY_USERS : []);

    if (rawItems) {
        for (let i = 0; i < Math.min(STORY_STRIP_COUNT, rawItems.length); i++) {
            const it = rawItems[i];
            const username = it.username != null ? String(it.username) : `user${i}`;
            const imageTrim = it.image != null ? String(it.image).trim() : '';
            const thumbTrim = it.thumb != null ? String(it.thumb).trim() : '';
            storyState.stories.push({
                username,
                storyKey: 'story-' + i,
                imageUrl: imageTrim || null,
                thumbUrl: thumbTrim || null,
                avatarSeed: (it.avatar != null && String(it.avatar).trim()) ? String(it.avatar).trim() : username,
                watched: false
            });
        }
    } else if (storyUsers.length > 0) {
        for (let i = 0; i < STORY_STRIP_COUNT; i++) {
            const username = storyUsers[i % storyUsers.length];
            storyState.stories.push({
                username: username + (i > storyUsers.length - 1 ? Math.floor(i / storyUsers.length) : ''),
                storyKey: 'story-' + i,
                imageUrl: null,
                thumbUrl: null,
                avatarSeed: username,
                watched: false
            });
        }
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
        storyDiv.dataset.story = story.storyKey;

        const ringSrc = story.thumbUrl || story.imageUrl || storyDicebearUrl(story.avatarSeed);

        storyDiv.innerHTML = `
            <div class="story-avatar ${story.watched ? 'watched' : 'unwatched'}">
                <img src="${ringSrc}" alt="Story">
            </div>
            <span>${story.username}</span>
        `;

        storyDiv.addEventListener('click', function() {
            openStory(index);
        });

        storiesContainer.appendChild(storyDiv);
    });
}

// Load story watched states from localStorage
function loadStoryStates() {
    const saved = localStorage.getItem('siberguven_stories');
    if (saved) {
        let savedStories;
        try { savedStories = JSON.parse(saved); } catch (e) { console.warn('[loadStoryStates] bozuk veri:', e); return; }
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
        const storyEl = document.querySelector(`.story[data-story="${story.storyKey}"]`);
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

// Hikaye overlay'i aç (storyIndex = storyState.stories içindeki sıra)
function openStory(storyIndex) {
    const story = storyState.stories[storyIndex];
    if (!story) return;

    storyState.currentStoryIndex = storyIndex;

    const storyOverlay = document.getElementById('story-overlay');
    const ringSrc = story.thumbUrl || story.imageUrl || storyDicebearUrl(story.avatarSeed);
    const fullSrc = story.imageUrl || `https://picsum.photos/400/700?random=${storyIndex}`;

    document.getElementById('story-avatar').src = ringSrc;
    document.getElementById('story-username').textContent = story.username;
    document.getElementById('story-image').src = fullSrc;
    
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
        openStory(nextIndex);
    } else {
        closeStory();
    }
}

// Previous story
function previousStory() {
    clearTimeout(storyState.autoplayTimeout);
    
    if (storyState.currentStoryIndex > 0) {
        const prevIndex = storyState.currentStoryIndex - 1;
        openStory(prevIndex);
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

// Mesaj bildirimi sesi - autoplay kısıtına dayanıklı sürüm
let notificationAudioUnlocked = false;
let notificationAudioUnlockBound = false;
let audioUnlockHintShown = false;
let notificationAudioCtx = null;

function playBeepFallback() {
    try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        if (!notificationAudioCtx) notificationAudioCtx = new Ctx();
        if (notificationAudioCtx.state === 'suspended') return;

        const osc = notificationAudioCtx.createOscillator();
        const gain = notificationAudioCtx.createGain();
        osc.connect(gain);
        gain.connect(notificationAudioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, notificationAudioCtx.currentTime);
        gain.gain.setValueAtTime(0, notificationAudioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, notificationAudioCtx.currentTime + 0.01);
        gain.gain.linearRampToValueAtTime(0, notificationAudioCtx.currentTime + 0.28);
        osc.start();
        osc.stop(notificationAudioCtx.currentTime + 0.3);
    } catch (e) {
        // no-op
    }
}

async function unlockNotificationAudio() {
    if (notificationAudioUnlocked) return;
    console.log('[DEBUG][audio] unlock tetiklendi');

    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx && !notificationAudioCtx) notificationAudioCtx = new Ctx();
    if (notificationAudioCtx && notificationAudioCtx.state === 'suspended') {
        try {
            await notificationAudioCtx.resume();
        } catch (e) {
            // resume başarısızsa HTMLAudio ile devam edilir
        }
    }

    // HTMLAudio prime
    try {
        notificationSound.volume = 0;
        const p = notificationSound.play();
        if (p && typeof p.then === 'function') {
            p.then(() => {
                notificationSound.pause();
                notificationSound.currentTime = 0;
                notificationSound.volume = 1;
                notificationAudioUnlocked = true;
                console.log('[DEBUG][audio] notification audio unlocked');
                if (notificationAudioUnlockBound) {
                    window.removeEventListener('pointerdown', unlockNotificationAudio, true);
                    window.removeEventListener('mousedown', unlockNotificationAudio, true);
                    window.removeEventListener('click', unlockNotificationAudio, true);
                    window.removeEventListener('keydown', unlockNotificationAudio, true);
                    window.removeEventListener('touchstart', unlockNotificationAudio, true);
                }
            }).catch(() => {
                notificationSound.volume = 1;
                // HTMLAudio başarısızsa WebAudio üzerinden unlock kabul et
                notificationAudioUnlocked = !!notificationAudioCtx && notificationAudioCtx.state === 'running';
                if (notificationAudioUnlocked) {
                    console.log('[DEBUG][audio] webaudio ile unlock tamam');
                    if (notificationAudioUnlockBound) {
                        window.removeEventListener('pointerdown', unlockNotificationAudio, true);
                        window.removeEventListener('mousedown', unlockNotificationAudio, true);
                        window.removeEventListener('click', unlockNotificationAudio, true);
                        window.removeEventListener('keydown', unlockNotificationAudio, true);
                        window.removeEventListener('touchstart', unlockNotificationAudio, true);
                    }
                }
            });
        } else {
            notificationSound.pause();
            notificationSound.currentTime = 0;
            notificationSound.volume = 1;
            notificationAudioUnlocked = true;
            if (notificationAudioUnlockBound) {
                window.removeEventListener('pointerdown', unlockNotificationAudio, true);
                window.removeEventListener('mousedown', unlockNotificationAudio, true);
                window.removeEventListener('click', unlockNotificationAudio, true);
                window.removeEventListener('keydown', unlockNotificationAudio, true);
                window.removeEventListener('touchstart', unlockNotificationAudio, true);
            }
        }
    } catch (e) {
        notificationSound.volume = 1;
        notificationAudioUnlocked = !!notificationAudioCtx && notificationAudioCtx.state === 'running';
        if (notificationAudioUnlocked && notificationAudioUnlockBound) {
            window.removeEventListener('pointerdown', unlockNotificationAudio, true);
            window.removeEventListener('mousedown', unlockNotificationAudio, true);
            window.removeEventListener('click', unlockNotificationAudio, true);
            window.removeEventListener('keydown', unlockNotificationAudio, true);
            window.removeEventListener('touchstart', unlockNotificationAudio, true);
        }
    }
}

function bindNotificationAudioUnlock() {
    if (notificationAudioUnlockBound) return;
    notificationAudioUnlockBound = true;
    window.addEventListener('pointerdown', unlockNotificationAudio, { once: true, capture: true });
    window.addEventListener('mousedown', unlockNotificationAudio, { once: true, capture: true });
    window.addEventListener('click', unlockNotificationAudio, { once: true, capture: true });
    window.addEventListener('keydown', unlockNotificationAudio, { once: true, capture: true });
    window.addEventListener('touchstart', unlockNotificationAudio, { once: true, capture: true });
}

bindNotificationAudioUnlock();

function playNotificationSound() {
    if (!notificationAudioUnlocked) {
        console.log('[DEBUG][audio] kilitli, user gesture bekleniyor');
        if (!audioUnlockHintShown) {
            audioUnlockHintShown = true;
            showNotification('Ses kapali', 'Bildirim sesi icin ekranda bir kez tiklayin.', 'warning');
        }
        return;
    }

    // Önce HTMLAudio dene, olmazsa beep fallback
    try {
        notificationSound.currentTime = 0;
        const playPromise = notificationSound.play();
        if (playPromise && typeof playPromise.then === 'function') {
            playPromise.catch(() => {
                playBeepFallback();
            });
        }
    } catch (e) {
        playBeepFallback();
    }
}

let scenarioCountdownInterval = null;

function clearScenarioCountdownDebug() {
    if (scenarioCountdownInterval) {
        clearInterval(scenarioCountdownInterval);
        scenarioCountdownInterval = null;
    }
}

function sendNextMessageNotification() {
    console.log('[DEBUG][notify] start', {
        idx: currentSession.currentMessageIndex,
        queueLen: currentSession.messageQueue ? currentSession.messageQueue.length : 0,
        pendingMessages: currentSession.pendingMessages,
        hasTimer: !!currentSession.messageTimeout
    });
    currentSession.nextMessageDueAt = null;
    clearScenarioCountdownDebug();
    if (!currentSession.messageQueue || currentSession.messageQueue.length === 0) return;
    const idx = currentSession.currentMessageIndex;
    if (idx >= currentSession.messageQueue.length) {
        showSummary();
        return;
    }

    const scenario = currentSession.messageQueue[idx];
    if (!scenario) return;

    if (!currentSession.deliveredMessages) currentSession.deliveredMessages = [];

    const isAlreadyInInbox = currentSession.deliveredMessages.some(m => m.queueIndex === idx);
    if (!isAlreadyInInbox) {
        console.log('📬 Yeni mesaj Inboxta yaratılıyor:', scenario.sender);
        currentSession.pendingMessages++;

        scenario._deliveredAt = new Date();
        scenario._status = 'delivered';

        let previewText = 'Yeni mesaj';
        if (scenario.messages && scenario.messages.length > 0) {
            previewText = scenario.messages[0].text || 'Yeni mesaj';
        } else if (scenario.conversation && scenario.conversation.length > 0) {
            previewText = scenario.conversation[0].incoming || 'Yeni mesaj';
        }

        currentSession.deliveredMessages.push({
            sender: scenario.sender,
            avatar: scenario.avatar || scenario.sender,
            previewText,
            createdAt: new Date(),
            deliveredAt: new Date(),
            status: 'delivered',
            readAt: null,
            queueIndex: idx,
            scenario
        });
    } else {
        console.log('[DEBUG][notify] mesaj zaten inbox\'ta', { idx, sender: scenario.sender });
    }

    const badge = document.getElementById('message-badge');
    if (badge) {
        badge.textContent = currentSession.pendingMessages;
        badge.style.display = currentSession.pendingMessages > 0 ? 'flex' : 'none';
    }
    console.log('[DEBUG][notify] badge durumu', {
        pendingMessages: currentSession.pendingMessages,
        badgeVisible: !!(badge && currentSession.pendingMessages > 0)
    });

    playNotificationSound();

    const toast = document.getElementById('dm-notification-toast');
    const avatar = document.getElementById('dm-notif-avatar');
    const sender = document.getElementById('dm-notif-sender');
    const preview = document.getElementById('dm-notif-preview');

    if (!toast || !avatar || !sender || !preview || !scenario) return;

    avatar.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}`;
    sender.textContent = scenario.sender;
    preview.textContent = 'Yeni mesaj';
    toast.style.display = 'flex';

    toast.onclick = () => {
        toast.style.display = 'none';
        showInbox();
    };

    setTimeout(() => {
        toast.style.display = 'none';
    }, 10000);

    saveAppState();
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

// Zaman etiketi formatla (Madde 5) - "Şimdi" / "X dk önce"
function formatRelativeTime(timestamp) {
    if (!timestamp) return 'Şimdi';
    
    const messageTime = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const now = new Date();
    const diffMs = now - messageTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) {
        return 'Şimdi';
    } else if (diffMins < 60) {
        return `${diffMins} dk önce`;
    } else if (diffHours < 24) {
        return `${diffHours} sa önce`;
    } else {
        return `${diffDays} gün önce`;
    }
}

// Mesajı ekrana basan standart fonksiyon
function renderMessageToUI(text, type, time, avatarSeed) {
    const messagesContainer = document.getElementById('dm-messages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type || ''}`.trim();
    const avatar = type === 'sent' ? 'user1' : avatarSeed;

    messageDiv.innerHTML = `
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar}" alt="Avatar" class="message-avatar">
        <div>
            <div class="message-content">${text}</div>
            <div class="message-time">${time}</div>
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Inbox listesini oluştur (Madde 5 - deliveredMessages kullan)
function renderInboxList() {
    const inboxList = document.getElementById('inbox-list');
    if (!inboxList) return;
    
    inboxList.innerHTML = '';
    
    // Load message history for this participant (blocked status için)
    const messageHistory = loadMessageHistory(currentSession.participantName);
    
    // Instagram benzeri: Sadece GELMİŞ mesajları göster (deliveredMessages)
    // Gelecek mesajlar gözükmeyecek - gerçek Instagram deneyimi
    if (!currentSession.deliveredMessages || currentSession.deliveredMessages.length === 0) {
        inboxList.innerHTML = '<div class="empty-inbox">Henüz mesaj yok</div>';
        return;
    }
    
    currentSession.deliveredMessages.forEach((deliveredMsg, index) => {
        const isUnread = deliveredMsg.status === 'delivered' && !deliveredMsg.readAt;
        const isPast = deliveredMsg.status === 'read' || deliveredMsg.readAt;
        
        // Check if this sender is blocked
        const senderHistory = messageHistory[deliveredMsg.sender];
        const isBlocked = senderHistory && senderHistory.status === 'blocked';
        
        const item = document.createElement('div');
        item.className = `inbox-item ${isUnread ? 'unread' : ''} ${isBlocked ? 'blocked' : ''}`;
        item.dataset.index = index;
        item.dataset.sender = deliveredMsg.sender;
        
        // Mesaj önizlemesi için ilk mesajı al
        let previewText = '';
        if (isBlocked) {
            previewText = '🔴 ENGELLENDİ';
        } else if (deliveredMsg.previewText) {
            previewText = deliveredMsg.previewText;
                if (previewText.length > 40) {
                    previewText = previewText.substring(0, 40) + '...';
            }
        } else if (isUnread) {
            previewText = 'Yeni mesaj';
        } else {
            previewText = 'Mesajlaşma başladı';
        }
        
        // Zaman metni - Instagram benzeri (Madde 5) - formatRelativeTime kullan
        const timeText = formatRelativeTime(deliveredMsg.createdAt || deliveredMsg.deliveredAt);
        
        item.innerHTML = `
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${deliveredMsg.sender}" alt="${deliveredMsg.sender}">
            <div class="inbox-item-content">
                <div class="inbox-item-header">
                    <span class="inbox-sender">${deliveredMsg.sender}${isBlocked ? ' <span class="blocked-label">🔴 ENGELLENDİ</span>' : ''}</span>
                    <span class="inbox-time">${timeText}</span>
                </div>
                <div class="inbox-message-preview ${isBlocked ? 'blocked-preview' : ''}">
                    ${isUnread && !isBlocked ? '<span class="unread-dot"></span>' : ''}
                    ${previewText}
                </div>
            </div>
        `;
        
        // Tıklama eventi - Instagram benzeri
        item.addEventListener('click', () => {
            if (isBlocked) {
                showNotification('Engelli Kullanıcı', 'Bu kullanıcı engellenmiştir.', 'info');
            } else {
                // deliveredMsg'dan conversation'ı aç
                openConversationFromInbox(deliveredMsg);
            }
        });
        
        inboxList.appendChild(item);
    });
}

// Inbox'tan sohbet aç (deliveredMsg veya index alabilir)
function openConversationFromInbox(deliveredMsgOrIndex) {
    let scenario;
    
    // Eğer deliveredMsg objesi ise
    if (deliveredMsgOrIndex && typeof deliveredMsgOrIndex === 'object' && deliveredMsgOrIndex.scenario) {
        scenario = deliveredMsgOrIndex.scenario;
        // deliveredMsg'ı read olarak işaretle
        deliveredMsgOrIndex.readAt = new Date();
        deliveredMsgOrIndex.status = 'read';
        
        // messageQueue'da index bul
        const index = currentSession.messageQueue.findIndex(s => s === scenario);
        if (index >= 0) {
    currentSession.currentMessageIndex = index;
        }
    } else {
        // Eğer index ise (eski kullanım)
        const index = deliveredMsgOrIndex;
        currentSession.currentMessageIndex = index;
        scenario = currentSession.messageQueue[index];
    }
    
    if (!scenario) return;
    
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
    
    // Ana sayfaya dönüldü - eğer mesaj tamamlanmışsa sonraki mesajı planla (Madde 4)
    console.log('📱 Inbox\'tan ana sayfaya dönüldü');
    
    // Ekran geçişinde doğrudan schedule çağırmak yerine guard kararı verdir
    checkAndResumeScenario();
});

// Belirli bir DM'i aç
function openSpecificDM(scenario) {
    currentSession.currentScenario = scenario;
    currentSession.messageIndex = 0;
    currentSession.conversationIndex = 0;
    currentSession.reportWrongForSlot = false;
    currentSession.reportClicked = false;
    currentSession.blockClicked = false;
    currentSession.selectedComplaintReason = null;
    if (currentSession.hintTimeout) {
        clearTimeout(currentSession.hintTimeout);
        currentSession.hintTimeout = null;
    }
    
    currentSession.skills.reading = true;
    currentSession.skills.navigation = true; // Beceri 1: Kullanıcı mesajı açtı

    document.getElementById('dm-username').textContent = scenario.sender;
    document.getElementById('dm-avatar').src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}`;

    // Önceki DM'den kalabilecek disabled durumunu her zaman sıfırla
    const dmInputEl = document.getElementById('dm-input');
    const dmSendEl = document.getElementById('dm-send');
    if (dmInputEl) { dmInputEl.disabled = false; dmInputEl.value = ''; }
    if (dmSendEl) dmSendEl.disabled = false;

    // "Takip etmediğin birinden gelen mesaj" ibaresi: sadece olumsuz (siber zorbalık) senaryolarda göster
    const unfollowedMsgEl = document.getElementById('unfollowed-message');
    if (unfollowedMsgEl) {
        unfollowedMsgEl.style.display = isSafeScenario(scenario) ? 'none' : '';
    }

    const messagesContainer = document.getElementById('dm-messages');
    const inputContainer = document.getElementById('dm-input-container');
    const actionButtons = document.getElementById('action-buttons');
    messagesContainer.innerHTML = '';
    const history = loadMessageHistory(currentSession.participantName)[scenario.sender];

    showScreen('dm-screen');

    if (history && history.messages && history.messages.length > 0) {
        console.log('📜 Eski konuşma yükleniyor...');
        history.messages.forEach(msg => {
            const msgType = msg.sender === 'user' ? 'sent' : (msg.text && msg.text.includes('zorbalık') ? 'cyberbullying' : '');
            renderMessageToUI(msg.text, msgType, msg.time, scenario.avatar);
        });

        inputContainer.style.display = history.status === 'blocked' ? 'none' : 'flex';
        actionButtons.style.display = history.status === 'blocked' ? 'none' : 'flex';

        currentSession.messageIndex = scenario.messages ? scenario.messages.length : 0;
        currentSession.conversationIndex = scenario.conversation ? scenario.conversation.length : 0;
        return;
    }

    inputContainer.style.display = 'none';
    actionButtons.style.display = 'none';
    if (scenario.conversation) {
        setTimeout(sendConversationMessage, 1000);
    } else {
        setTimeout(sendMessage, 1000);
    }
}

// Yardımcı fonksiyon: Mesaj tamamlandı, sonraki mesaj için zamanlayıcıyı kur (Madde 4)
// ZAMANLAMA KURALI: Ana sayfaya dönüldükten sonra 10 saniye bekle
function scheduleNextMessage() {
    console.log('[DEBUG][schedule] çağrıldı', {
        beforeIdx: currentSession.currentMessageIndex,
        queueLen: currentSession.messageQueue ? currentSession.messageQueue.length : 0,
        pendingMessages: currentSession.pendingMessages,
        hasTimer: !!currentSession.messageTimeout
    });
    if (!currentSession.messageQueue || currentSession.messageQueue.length === 0) return;
    if (currentSession.messageTimeout) {
        console.log('[DEBUG][schedule] aktif timeout referansı var, yeniden planlama atlandı');
        return;
    }
    const now = Date.now();
    if (currentSession.nextMessageDueAt && currentSession.nextMessageDueAt > now) {
        console.log('[DEBUG][schedule] aktif zamanlayıcı zaten var, yeniden planlanmıyor', {
            dueInMs: currentSession.nextMessageDueAt - now
        });
        return;
    }
    clearScenarioCountdownDebug();

    // Akış bir sonraki slota anında geçsin; bildirim ise gecikmeli gelsin.
    currentSession.currentMessageIndex++;
    currentSession.pendingMessages = 0;
    saveAppState();
    const nextIndex = currentSession.currentMessageIndex;

    if (nextIndex >= currentSession.messageQueue.length) {
        console.log('[DEBUG][schedule] queue bitti, summary açılacak');
        setTimeout(() => {
            showSummary();
        }, 2000);
        return;
    }

    console.log(`⏱️ 10 saniye içinde ${nextIndex}. mesaj tetiklenecek...`);
    currentSession.nextMessageDueAt = Date.now() + 10000;
    currentSession.messageTimeout = setTimeout(() => {
        currentSession.messageTimeout = null;
        currentSession.nextMessageDueAt = null;
        clearScenarioCountdownDebug();
        console.log('[DEBUG][schedule] timeout doldu, notify tetikleniyor', {
            idx: nextIndex
        });
        sendNextMessageNotification();
        saveAppState();
    }, 10000);

    let remainingSec = 10;
    console.log(`[DEBUG][schedule] geri sayım başladı: ${remainingSec}s`);
    scenarioCountdownInterval = setInterval(() => {
        remainingSec -= 1;
        if (remainingSec > 0) {
            console.log(`[DEBUG][schedule] kalan: ${remainingSec}s (nextIdx=${nextIndex})`);
        } else {
            clearScenarioCountdownDebug();
        }
    }, 1000);

    saveAppState();
}

/** Aynı kuyruk slotu için scheduleNextMessage yalnızca bir kez (çift atlama önlemi) */
function scheduleNextMessageIfNotYetForSlot(slotIndex) {
    if (slotIndex === undefined || slotIndex === null) {
        slotIndex = currentSession.currentMessageIndex;
    }
    if (!currentSession.slotScheduledAdvance) currentSession.slotScheduledAdvance = {};
    if (currentSession.slotScheduledAdvance[slotIndex]) {
        // Timer kaybolduysa (refresh/restore vb.) aynı slot için yeniden planlamaya izin ver.
        if (!currentSession.messageTimeout && currentSession.currentMessageIndex === slotIndex) {
            console.log('[DEBUG][schedule-guard] slot planlı görünüyordu ama timer yok, yeniden planlanıyor', { slotIndex });
            currentSession.slotScheduledAdvance[slotIndex] = false;
        } else {
        console.log('[DEBUG][schedule-guard] aynı slot daha önce planlandı, atlanıyor', { slotIndex });
        return;
        }
    }
    currentSession.slotScheduledAdvance[slotIndex] = true;
    console.log('[DEBUG][schedule-guard] slot planlandı', { slotIndex });
    scheduleNextMessage();
}

// Senaryonun durup durmadığını kontrol eden ve gerekirse ittiren ana mekanizma
function checkAndResumeScenario() {
    console.log('[DEBUG][guard] kontrol başladı', {
        idx: currentSession.currentMessageIndex,
        queueLen: currentSession.messageQueue ? currentSession.messageQueue.length : 0,
        pendingMessages: currentSession.pendingMessages,
        hasTimer: !!currentSession.messageTimeout
    });
    if (!currentSession || !currentSession.messageQueue || currentSession.messageQueue.length === 0) return;

    const idx = currentSession.currentMessageIndex;

    // Tüm mesajlar bittiyse özet ekranını garanti et
    if (idx >= currentSession.messageQueue.length) {
        const activeScreenId = document.querySelector('.screen.active')?.id;
        if (activeScreenId !== 'summary-screen') {
            showSummary();
        }
        return;
    }

    const currentScenario = currentSession.messageQueue[idx];
    if (!currentScenario) return;

    const deliveredMsg = (currentSession.deliveredMessages || []).find(m => m.queueIndex === idx);
    const history = loadMessageHistory(currentSession.participantName)[currentScenario.sender];
    const isFinished = history && (history.status === 'completed' || history.status === 'blocked');

    // DURUM 1: Mevcut mesaj bittiyse bir sonrakini planla
    if (isFinished) {
        console.log('🛡️ Guard: Bitmiş mesaj tespit edildi, sonraki planlanıyor...');
        console.log('[DEBUG][guard] isFinished=true', { idx, sender: currentScenario.sender, historyStatus: history && history.status });
        scheduleNextMessage();
        return;
    }

    // DURUM 2: Mesaj henüz inbox'ta yoksa ve timer da yoksa hemen bildirimi tetikle
    if (!deliveredMsg && !currentSession.messageTimeout && currentSession.pendingMessages === 0) {
        console.log('🛡️ Guard: Bekleyen mesaj bildirimini hemen tetikliyor...');
        console.log('[DEBUG][guard] notify koşulu sağlandı', { idx });
        sendNextMessageNotification();
    } else {
        console.log('[DEBUG][guard] bekleme/kilit durumu', {
            hasDeliveredMsg: !!deliveredMsg,
            hasTimer: !!currentSession.messageTimeout,
            pendingMessages: currentSession.pendingMessages,
            isFinished: !!isFinished
        });
    }
}

/**
 * DM'den geri / ana sayfa ile çıkınca skor + kuyruk.
 * Slot zaten kayıtlıysa (doğru/yanlış) sadece kuyruk ilerletilir.
 */
function finalizeDmExitAndQueue(hasUserReply) {
    const scenario = currentSession.currentScenario;
    if (!scenario) return;
    const idx = currentSession.currentMessageIndex;

    if (currentSession.hintTimeout) {
        clearTimeout(currentSession.hintTimeout);
        currentSession.hintTimeout = null;
    }

    if (currentSession.slotRecorded && currentSession.slotRecorded[idx]) {
        scheduleNextMessageIfNotYetForSlot(idx);
        return;
    }

    const reactionTime = (Date.now() - (currentSession.currentMessageStartTime || Date.now())) / 1000;
    const safe = isSafeScenario(scenario);

    if (safe) {
        if (hasUserReply) {
            saveMessageData('safe', 'reply', reactionTime, false, true);
            recordQueueSlotOutcome('correct');
            currentSession.skills.replying = true;
        } else {
            saveMessageData('safe', 'abandon_no_reply', reactionTime, false, false);
            recordQueueSlotOutcome('wrong');
        }
    } else {
        saveMessageData('cyberbullying', 'abandon_home', reactionTime, false, false);
        recordQueueSlotOutcome('wrong');
    }
    scheduleNextMessageIfNotYetForSlot(idx);
}

// Geri butonları
document.getElementById('back-to-inbox').addEventListener('click', () => {
    // DM'den direk ana sayfaya dön (Madde 4 - kullanıcı manuel olarak dönmeli)
    const messagesContainer = document.getElementById('dm-messages');
    const scenario = currentSession.currentScenario;
    let hasUserReply = false;

    // Save conversation state if not already saved
    if (scenario && messagesContainer) {
        const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
            text: msg.querySelector('.message-content').textContent,
            sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
            time: msg.querySelector('.message-time').textContent
        }));

        hasUserReply = allMessages.some(msg => msg.sender === 'user');

        const messageHistory = loadMessageHistory(currentSession.participantName);
        const senderHistory = messageHistory[scenario.sender];

        if (!senderHistory || senderHistory.status !== 'blocked') {
            const status = hasUserReply ? 'completed' : 'in-progress';
            saveConversationState(scenario.sender, allMessages, status);
        }
    }

    showScreen('main-app');

    if (scenario && messagesContainer) {
        finalizeDmExitAndQueue(hasUserReply);
    }
});

// Mesaj gönder
function sendMessage() {
    const scenario = currentSession.currentScenario;
    if (!scenario || !scenario.messages) return;
    const message = scenario.messages[currentSession.messageIndex];
    
    if (!message) {
        return;
    }
    
    currentSession.currentMessageStartTime = Date.now();
    
    const messagesContainer = document.getElementById('dm-messages');
    const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    renderMessageToUI(message.text, message.type === 'cyberbullying' ? 'cyberbullying' : '', time, scenario.avatar);
    
    // Save conversation state after each message
    const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
        text: msg.querySelector('.message-content').textContent,
        sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
        time: msg.querySelector('.message-time').textContent
    }));
    saveConversationState(scenario.sender, allMessages, 'in-progress');
    saveAppState();
    
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
            // Son güvenli mesaj - metin cevabı bekleniyor - BUTONLAR GÖSTERİLİYOR
            document.getElementById('dm-input-container').style.display = 'flex';
            document.getElementById('action-buttons').style.display = 'flex'; // Güvenli mesajlarda da butonlar GÖSTERİLİYOR
            
            // Input'a focus
            const dmInput = document.getElementById('dm-input');
            if (dmInput) {
                dmInput.focus();
            }
            
            // Butonları aktif tut
            const reportBtn = document.getElementById('report-btn');
            const blockBtn = document.getElementById('block-btn');
            if (reportBtn) {
                reportBtn.disabled = false;
                reportBtn.classList.remove('blink');
            }
            if (blockBtn) {
                blockBtn.disabled = false;
                blockBtn.classList.remove('blink');
            }
        }
    } else {
        // Siber zorbalık mesajı — dizide daha fazla mesaj varsa sırayla gönder
        const remainingMessages = scenario.messages.slice(currentSession.messageIndex + 1);
        
        if (remainingMessages.length > 0) {
            // Sonraki mesajı 1.5 saniye sonra gönder (gerçekçi yazma süresi)
            setTimeout(() => {
                currentSession.messageIndex++;
                sendMessage();
            }, 1500);
        } else {
            // Son zorbalık mesajı — aksiyon butonlarını göster
            const inputContainer = document.getElementById('dm-input-container');
            const actionButtons = document.getElementById('action-buttons');
            
            if (inputContainer) inputContainer.style.display = 'flex';
            if (actionButtons) actionButtons.style.display = 'flex';
            
            // Butonları sıfırla
            currentSession.reportClicked = false;
            currentSession.blockClicked = false;
            currentSession.selectedComplaintReason = null;
            const reportBtn = document.getElementById('report-btn');
            const blockBtn = document.getElementById('block-btn');
            if (reportBtn) {
                reportBtn.disabled = false;
                reportBtn.classList.remove('blink');
            }
            if (blockBtn) {
                blockBtn.disabled = false;
                blockBtn.classList.remove('blink');
            }
            
            // 5 saniye sonra ipucu göster (sadece buton yanıp sönsün)
            if (currentSession.hintEnabled) {
                currentSession.hintTimeout = setTimeout(() => {
                    showHint();
                }, 5000);
            }
        }
    }
}

// YARDIMCI FONKSİYON: Siber zorbalık mesajına cevap veren kullanıcı için aksiyon butonlarını güncelle
function showSafeModeForCyberbullying() {
    // Siber zorbalık mesajına cevap verildi, şimdi input'u gizle ve sadece butonları göster
    const inputContainer = document.getElementById('dm-input-container');
    const actionButtons = document.getElementById('action-buttons');
    
    if (inputContainer) {
        inputContainer.style.display = 'none';
    }
    if (actionButtons) {
        actionButtons.style.display = 'flex';
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
    const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    renderMessageToUI(turnData.incoming, '', time, scenario.avatar);
    
    // Save conversation state after each incoming message
    const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
        text: msg.querySelector('.message-content').textContent,
        sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
        time: msg.querySelector('.message-time').textContent
    }));
    saveConversationState(scenario.sender, allMessages, 'in-progress');
    saveAppState();
    
    // Check if we need to wait for user reply
    if (turnData.waitForReply) {
        // Show input for user to reply - action butonları GÖSTERİLİYOR
        const inputContainer = document.getElementById('dm-input-container');
        const actionButtons = document.getElementById('action-buttons');
        const dmInput = document.getElementById('dm-input');
        
        if (inputContainer) {
            inputContainer.style.display = 'flex';
        }
        // Action butonlarını göster
        if (actionButtons) {
            actionButtons.style.display = 'flex';
        }
        
        // Butonları aktif tut
        const reportBtn = document.getElementById('report-btn');
        const blockBtn = document.getElementById('block-btn');
        if (reportBtn) {
            reportBtn.disabled = false;
            reportBtn.classList.remove('blink');
        }
        if (blockBtn) {
            blockBtn.disabled = false;
            blockBtn.classList.remove('blink');
        }
        
        if (dmInput) {
            dmInput.focus();
        }
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

// ============================================
// YAPAY ZEKA MESAJ DESTEĞI (API KEY SONRADAN EKLENECEK)
// ============================================
// Mesajlar ve senaryolar şu an boş/fallback. API key verildiğinde
// generateAIMessage tekrar backend (/api/ai/generate) çağrısına bağlanabilir.

/**
 * Normal (zorbalık içermeyen) sohbetlerde AI yanıtı üret.
 * Siber zorbalık senaryolarında (scenario.isNormal !== true) fallback kullanılır.
 */
async function generateAIMessage(userMessage, conversationHistory, scenario) {
    // Sadece normal mesajlarda Gemini'yi çağır
    if (scenario && scenario.isNormal && typeof geminiCevapUret === 'function') {
        const participantAge = currentSession ? currentSession.participantAge : 14;
        const cevap = await geminiCevapUret(userMessage, conversationHistory, participantAge);
        if (cevap) return cevap;
    }
    return getFallbackResponse(userMessage);
}

// Fallback: safetagram-ai.js yüklenmediyse son çare
function getFallbackResponse(userMessage) {
    const u = (userMessage || '').toLowerCase();
    if (u.includes('?')) return 'Ben de merak etmiştim. Çok ilginç.';
    return 'Anlıyorum. Devam et.';
}

// Güvenli mesaja cevap gönder
document.getElementById('dm-send').addEventListener('click', async () => {
    const input = document.getElementById('dm-input');
    const text = input.value.trim();
    
    if (!text) return;
    
    const messagesContainer = document.getElementById('dm-messages');
    const scenario = currentSession.currentScenario;
    
    const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    renderMessageToUI(text, 'sent', time, scenario.avatar);
    input.value = '';
    
    // Input'u devre dışı bırak (AI cevap beklenirken)
    input.disabled = true;
    document.getElementById('dm-send').disabled = true;
    
    // Conversation history'yi topla
    const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
        text: msg.querySelector('.message-content').textContent,
        sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
        time: msg.querySelector('.message-time').textContent
    }));
    
    const reactionTime = (Date.now() - currentSession.currentMessageStartTime) / 1000;
    const safe = isSafeScenario(scenario);

    // Siber zorbalıkta metinle cevap = yanlış (şikayet + engelle beklenir)
    if (!safe) {
        saveMessageData('cyberbullying', 'reply_inappropriate', reactionTime, false, false);
        recordQueueSlotOutcome('wrong');
        currentSession.skills.replying = false;
        showNotification('Yanlış', 'Olumsuz mesajlarda sohbetle cevap verilmez. Şikayet et ve engelle kullanılmalıydı.', 'error');
        document.getElementById('action-buttons').style.display = 'none';
        document.getElementById('dm-input-container').style.display = 'none';
        const slotIdx = currentSession.currentMessageIndex;
        showScreen('main-app');
        scheduleNextMessageIfNotYetForSlot(slotIdx);
        return;
    }

    // Olumlu mesajda metin cevabı = doğru
    saveMessageData('safe', 'reply', reactionTime, false, true);
    recordQueueSlotOutcome('correct');
    currentSession.skills.replying = true;
    
    const currentMessage = scenario.messages ? scenario.messages[currentSession.messageIndex] : null;
    const isSafeMessage = scenario.conversation !== undefined || 
                          (currentMessage && currentMessage.type !== 'cyberbullying') ||
                          !currentMessage;
    
    if (isSafeMessage) {
        // Güvenli mesajlar için input her zaman aktif olmalı
        // Input'u gizleme - kullanıcı mesaj yazabilmeli
        // Input her zaman görünür ve aktif olmalı
        const inputContainer = document.getElementById('dm-input-container');
        const dmInput = document.getElementById('dm-input');
        const dmSendBtn = document.getElementById('dm-send');
        
        if (inputContainer) {
            inputContainer.style.display = 'flex';
        }
        if (dmInput) {
            dmInput.disabled = false; // Her zaman aktif
        }
        if (dmSendBtn) {
            dmSendBtn.disabled = false; // Her zaman aktif
        }
        
        // AI entegrasyonu HER ZAMAN AKTİF (Madde 1 & 3)
        // AI ile yeni mesaj oluştur (Gemini backend entegrasyonu)
            const aiResponse = await generateAIMessage(text, allMessages, scenario);
            
            // AI cevabını göster
            setTimeout(() => {
                const aiTime = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
                renderMessageToUI(aiResponse, '', aiTime, scenario.avatar);
                
                // Conversation state'i güncelle
                const updatedMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
                    text: msg.querySelector('.message-content').textContent,
                    sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
                    time: msg.querySelector('.message-time').textContent
                }));
                saveConversationState(scenario.sender, updatedMessages, 'in-progress');
                
                // Kullanıcı geri tuşuna basana kadar sohbet devam etmeli
                // Input'u tekrar göster - kullanıcı istediği kadar mesajlaşabilir
                setTimeout(() => {
                    document.getElementById('dm-input-container').style.display = 'flex';
                    // Action butonlarını göster
                    document.getElementById('action-buttons').style.display = 'flex';
                    input.disabled = false;
                    document.getElementById('dm-send').disabled = false;
                    input.focus();
                    
                    // Butonları aktif tut
                    const reportBtn = document.getElementById('report-btn');
                    const blockBtn = document.getElementById('block-btn');
                    if (reportBtn) {
                        reportBtn.disabled = false;
                        reportBtn.classList.remove('blink');
                    }
                    if (blockBtn) {
                        blockBtn.disabled = false;
                        blockBtn.classList.remove('blink');
                    }
                }, 1500);
            }, 1000);
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
    const scenario = currentSession.currentScenario;

    if (currentScreen && currentScreen.id === 'dm-screen') {
        const messagesContainer = document.getElementById('dm-messages');
        let hasUserReply = false;

        if (scenario && messagesContainer) {
            const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
                text: msg.querySelector('.message-content').textContent,
                sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
                time: msg.querySelector('.message-time').textContent
            }));

            hasUserReply = allMessages.some(msg => msg.sender === 'user');

            const messageHistory = loadMessageHistory(currentSession.participantName);
            const senderHistory = messageHistory[scenario.sender];
            if (!senderHistory || senderHistory.status !== 'blocked') {
                const status = hasUserReply ? 'completed' : 'in-progress';
                saveConversationState(scenario.sender, allMessages, status);
            }

            showScreen('main-app');
            finalizeDmExitAndQueue(hasUserReply);
        } else {
            showScreen('main-app');
        }
    } else {
        showScreen('main-app');
    }
}

// Thank you modal'ı kapat ve akışa devam et
document.getElementById('close-thank-you-modal').addEventListener('click', () => {
    document.getElementById('thank-you-modal').style.display = 'none';

    // Engelleme sonrası DM ekranında bekletme yerine ana akışa geri dön
    showScreen('main-app');

    // Sonraki mesajı planla (index artırımı schedule içinde yapılır)
    scheduleNextMessage();

    saveAppState();
    console.log('✅ Engelleme tamamlandı, bir sonraki mesaj planlandı.');
});

// Şikayet et butonu
document.getElementById('report-btn').addEventListener('click', () => {
    if (currentSession.hintTimeout) {
        clearTimeout(currentSession.hintTimeout);
    }

    const scenario = currentSession.currentScenario;
    if (scenario && isSafeScenario(scenario)) {
        const idx = currentSession.currentMessageIndex;
        if (!currentSession.slotRecorded[idx]) {
            const reactionTime = (Date.now() - (currentSession.currentMessageStartTime || Date.now())) / 1000;
            saveMessageData('safe', 'report_inappropriate', reactionTime, false, false);
            recordQueueSlotOutcome('wrong');
        }
        showNotification('Yanlış', 'Olumlu mesajlarda şikayet etme.', 'error');
        document.getElementById('complaint-modal').style.display = 'none';
        document.getElementById('action-buttons').style.display = 'none';
        showScreen('main-app');
        scheduleNextMessageIfNotYetForSlot(idx);
        return;
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

    const scenario = currentSession.currentScenario;
    if (scenario && isSafeScenario(scenario)) {
        const idx = currentSession.currentMessageIndex;
        if (!currentSession.slotRecorded[idx]) {
            const reactionTime = (Date.now() - (currentSession.currentMessageStartTime || Date.now())) / 1000;
            saveMessageData('safe', 'block_inappropriate', reactionTime, false, false);
            recordQueueSlotOutcome('wrong');
        }
        showNotification('Yanlış', 'Olumlu mesajlarda engelle kullanılmaz.', 'error');
        document.getElementById('action-buttons').style.display = 'none';
        showScreen('main-app');
        scheduleNextMessageIfNotYetForSlot(idx);
        return;
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
    
    recordQueueSlotOutcome(currentSession.reportWrongForSlot ? 'wrong' : 'correct');

    // Save blocked status to message history
    const messagesContainer = document.getElementById('dm-messages');
    const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
        text: msg.querySelector('.message-content').textContent,
        sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
        time: msg.querySelector('.message-time').textContent
    }));
    
    saveConversationState(scenario.sender, allMessages, 'blocked', new Date().toISOString());
    
    // Teşekkür mesajını göster
    document.getElementById('thank-you-modal').style.display = 'flex';
    saveAppState();

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

// Şikayet nedeni seçim modalını göster (Madde 8 uygulandı)
function showComplaintReasonDialog() {
    const modal = document.getElementById('complaint-modal');
    const reasonsContainer = document.getElementById('complaint-reasons');
    const scenario = currentSession.currentScenario;
    if (!scenario || !scenario.messages) return; // Normal mesajlarda messages yok
    const message = scenario.messages[currentSession.messageIndex];
    if (!message) return;
    const correctReason = message.complaintReason;
    
    // Nedenleri oluştur
    reasonsContainer.innerHTML = '';
    const complaintReasons = (typeof window !== 'undefined' && window.COMPLAINT_REASONS) ? window.COMPLAINT_REASONS : (typeof COMPLAINT_REASONS !== 'undefined' ? COMPLAINT_REASONS : []);
    complaintReasons.forEach(reason => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'complaint-reason-option';
        optionDiv.dataset.reason = reason.id;
        
        optionDiv.innerHTML = `
            <input type="radio" name="complaint-reason" id="reason-${reason.id}" value="${reason.id}">
            <label for="reason-${reason.id}">
                ${reason.icon ? `<i class="${reason.icon}" style="margin-right:7px;opacity:0.85"></i>` : ''}${reason.label}
            </label>
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
    
    // Madde 8: İpucu kullanma modunda highlight YAPMA
    if (currentSession.hintEnabled) {
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
    // İpucu kapalıysa (hintEnabled === false) hiçbir görsel ipucu gösterme (Madde 8)
}

// Şikayet gönder butonu
document.getElementById('submit-complaint').addEventListener('click', () => {
    const scenario = currentSession.currentScenario;
    if (!scenario || !scenario.messages) return;
    const message = scenario.messages[currentSession.messageIndex];
    if (!message) return;
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
            currentSession.skills.complaintType = true; // Madde 13 - Beceri 5
            
            document.getElementById('report-btn').disabled = true;
            document.getElementById('report-btn').classList.remove('blink');
            
            const reactionTime = (Date.now() - currentSession.currentMessageStartTime) / 1000;
            saveMessageData('cyberbullying', 'report', reactionTime, hintUsed, true);
            currentSession.reportWrongForSlot = false;

            // Kuyruk skoru tek seferde engellemede sayılır (recordQueueSlotOutcome)

            // Engelle butonunu yanıp söndür
            showNextStepHint('block');
        }, 500);
    } else {
        // Yanlış seçim
        const correctOption = document.querySelector(`[data-reason="${correctReason}"]`);
        const selectedOption = document.querySelector(`[data-reason="${selectedReason}"]`);

        if (!currentSession.hintEnabled) {
            // İpucu KAPALI: yanlışı kaydet, doğruyu GÖSTERME, direkt kapat
            const reactionTime = (Date.now() - currentSession.currentMessageStartTime) / 1000;
            saveMessageData('cyberbullying', 'report', reactionTime, false, false);
            currentSession.reportWrongForSlot = true;

            // Hiçbir görsel ipucu göstermeden modalı kapat
            document.getElementById('complaint-modal').style.display = 'none';

            currentSession.reportClicked = true;
            currentSession.skills.reporting = true;

            document.getElementById('report-btn').disabled = true;
            document.getElementById('report-btn').classList.remove('blink');

            showNextStepHint('block');
        } else {
            // İpucu AÇIK: seçimi sıfırla, doğruyu yanıp söndür, tekrar denesin
            if (selectedOption) {
                selectedOption.classList.remove('selected');
                selectedOption.querySelector('input[type="radio"]').checked = false;
            }
            if (correctOption) correctOption.classList.add('blink-hint');
            currentSession.stats.hints++;

            currentSession.selectedComplaintReason = null;
            document.getElementById('submit-complaint').disabled = true;
        }
    }
});

// İpucu göster (sadece butonlar yanıp sönsün, metin YOK)
function showHint() {
    // Check if hints are enabled
    if (!currentSession.hintEnabled) {
        return; // Don't show hints if disabled
    }
    
    const scenario = currentSession.currentScenario;
    if (!scenario || !scenario.messages) return; // Normal mesajlarda ipucu yok
    const message = scenario.messages[currentSession.messageIndex];
    if (!message) return;
    
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
    const scenarioBullyingType = currentSession.currentScenario && currentSession.currentScenario._bullyingType
        ? currentSession.currentScenario._bullyingType
        : 'unknown';

    // Tepki süresini tam saniye olarak kaydet (örn: 5)
    const reactionSec = reactionTime != null ? Math.round(reactionTime) : null;

    const data = {
        participantId: currentSession.participantId,
        participantName: currentSession.participantName,
        participantAge: currentSession.participantAge,
        sessionType: currentSession.sessionType,
        sessionLabel: SESSION_LABELS[currentSession.sessionType] || currentSession.sessionType || 'Bilinmiyor',
        bullyingType: scenarioBullyingType,
        bullyingLabel: BULLYING_TYPE_LABELS[scenarioBullyingType] || 'Bilinmiyor',
        messageType: messageType,
        action: action,
        queueSlotIndex: currentSession.currentMessageIndex,
        reactionSec: reactionSec,               // tam saniye (örn: 5)
        reactionLabel: reactionSec != null ? reactionSec + ' saniye' : '-',
        hintUsed: hintUsed,
        correct: correct,
        timestamp: new Date().toISOString()
    };
    
    currentSession.sessionData.push(data);
    saveAppState();
    
    // Save to Firestore
    if (currentUser && currentSession.sessionId) {
        db.collection('users').doc(currentUser.uid)
            .collection('sessions').doc(currentSession.sessionId)
            .collection('data').add(data)
            .catch(error => {
                console.error('Error saving data to Firestore:', error);
            });
    }
}

/** Özet ekranı — mesaj kayıtları tablosu (öğrenci) */
function renderStudentSummaryMessagesTable() {
    const tbody = document.getElementById('summary-messages-body');
    if (!tbody) return;
    const SUMMARY_MSG_TYPE = { safe: 'Güvenli', cyberbullying: 'Siber zorbalık' };
    const ACTION_LABELS = {
        reply: 'Cevap verildi',
        report: 'Şikayet edildi',
        block: 'Engellendi',
        abandon_home: 'Yarım bırakıldı',
        abandon_no_reply: 'Cevapsız çıkış',
        reply_inappropriate: 'Hatalı cevap',
        report_inappropriate: 'Gereksiz şikayet',
        block_inappropriate: 'Gereksiz engelleme'
    };

    const groupedBySlot = {};
    (currentSession.sessionData || []).forEach((r) => {
        const idx = r.queueSlotIndex;
        if (idx === undefined || idx === null) return;

        if (!groupedBySlot[idx]) {
            groupedBySlot[idx] = {
                messageType: r.messageType,
                bullyingLabel: r.bullyingLabel,
                actions: new Set(),
                isCorrect: false,
                isHintUsed: false
            };
        }

        groupedBySlot[idx].actions.add(ACTION_LABELS[r.action] || r.action || '-');
        if (r.correct) groupedBySlot[idx].isCorrect = true;
        if (r.hintUsed) groupedBySlot[idx].isHintUsed = true;
    });

    const rows = Object.keys(groupedBySlot).sort((a, b) => Number(a) - Number(b));
    if (rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#64748b;padding:16px;">Henüz kayıt yok.</td></tr>';
        return;
    }

    tbody.innerHTML = rows.map((slotIdx, i) => {
        const data = groupedBySlot[slotIdx];
        const mt = SUMMARY_MSG_TYPE[data.messageType] || data.messageType || '-';
        const bl = data.bullyingLabel || '-';
        const act = Array.from(data.actions).join(', ');
        const ok = data.isCorrect ? 'Doğru' : 'Yanlış';
        const okClass = data.isCorrect ? 'skill-positive' : 'skill-negative';
        const hint = data.isHintUsed ? 'Evet' : 'Hayır';
        return `<tr><td>${i + 1}</td><td>${escapeHtml(String(mt))}</td><td>${escapeHtml(String(bl))}</td><td>${escapeHtml(String(act))}</td><td class="${okClass}">${ok}</td><td>${hint}</td></tr>`;
    }).join('');
}

function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
}

// Özet ekranını göster
function showSummary() {
    const c = currentSession.stats.correct;
    const w = currentSession.stats.wrong;
    const expected = (currentSession.messageQueue && currentSession.messageQueue.length) ? currentSession.messageQueue.length : (c + w);
    document.getElementById('correct-count').textContent = c;
    document.getElementById('wrong-count').textContent = w;
    document.getElementById('hint-count').textContent = currentSession.stats.hints;
    const scoreLine = document.getElementById('summary-score-line');
    if (scoreLine) {
        scoreLine.textContent = (c + w) > 0
            ? formatMesajSkoru(c, w, expected)
            : 'Henüz kayıt yok';
    }

    renderStudentSummaryMessagesTable();
    
    // Becerileri göster
    document.getElementById('skill-navigation').textContent = currentSession.skills.navigation ? '✓' : '✗';
    document.getElementById('skill-navigation').className = currentSession.skills.navigation ? 'skill-positive' : 'skill-negative';
    
    document.getElementById('skill-reading').textContent = currentSession.skills.reading ? '✓' : '✗';
    document.getElementById('skill-reading').className = currentSession.skills.reading ? 'skill-positive' : 'skill-negative';
    
    document.getElementById('skill-replying').textContent = currentSession.skills.replying ? '✓' : '✗';
    document.getElementById('skill-replying').className = currentSession.skills.replying ? 'skill-positive' : 'skill-negative';
    
    document.getElementById('skill-reporting').textContent = currentSession.skills.reporting ? '✓' : '✗';
    document.getElementById('skill-reporting').className = currentSession.skills.reporting ? 'skill-positive' : 'skill-negative';
    
    const complaintTypeEl = document.getElementById('skill-complaint-type');
    if (complaintTypeEl) {
        complaintTypeEl.textContent = currentSession.skills.complaintType ? '✓' : '✗';
        complaintTypeEl.className = currentSession.skills.complaintType ? 'skill-positive' : 'skill-negative';
    }
    
    document.getElementById('skill-blocking').textContent = currentSession.skills.blocking ? '✓' : '✗';
    document.getElementById('skill-blocking').className = currentSession.skills.blocking ? 'skill-positive' : 'skill-negative';

    showScreen('summary-screen');
}

// Bitir butonu
document.getElementById('finish-session').addEventListener('click', async () => {
    // Oturum bitiş zamanını kaydet (Madde 15)
    if (currentSession.startTime && currentSession.sessionId) {
        currentSession.endTime = new Date();
        currentSession.totalDurationSec = Math.floor((currentSession.endTime - currentSession.startTime) / 1000);
        
        // Firebase'e kaydet (async/await ile)
        try {
            if (currentUser && currentUser.uid) {
                await db.collection('users').doc(currentUser.uid)
                    .collection('sessions').doc(currentSession.sessionId)
                    .update({
                        endedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        totalDurationSec: currentSession.totalDurationSec,
                        status: 'completed',
                        skillsSnapshot: {
                            navigation: !!currentSession.skills.navigation,
                            reading: !!currentSession.skills.reading,
                            replying: !!currentSession.skills.replying,
                            reporting: !!currentSession.skills.reporting,
                            complaintType: !!currentSession.skills.complaintType,
                            blocking: !!currentSession.skills.blocking
                        },
                        statsSnapshot: {
                            correct: currentSession.stats.correct,
                            wrong: currentSession.stats.wrong,
                            hints: currentSession.stats.hints
                        }
                    });
            } else {
                console.warn('Oturum bitişi kaydedilirken currentUser bulunamadı.');
            }
        } catch (error) {
            console.error('Oturum bitiş zamanı kaydedilemedi:', error);
        }
    }
    
    // Zamanlayıcıları temizle
    if (currentSession.messageTimeout) {
        clearTimeout(currentSession.messageTimeout);
    }
    if (currentSession.hintTimeout) {
        clearTimeout(currentSession.hintTimeout);
    }
    
    // Tüm verileri sıfırla (Madde 6)
    currentSession = getEmptySession();

    showScreen('panel-screen');
});

// Uygulamacı Panel Fonksiyonları - 2 AYRI VERİ ALANI (Madde 16)
async function loadAdminData() {
    if (!currentUser) {
        const skillsDisplay = document.getElementById('skills-analysis-display');
        const sessionDisplay = document.getElementById('session-records-display');
        if (skillsDisplay) skillsDisplay.innerHTML = '<p style="text-align: center; padding: 20px;">Lütfen giriş yapın.</p>';
        if (sessionDisplay) sessionDisplay.innerHTML = '<p style="text-align: center; padding: 20px;">Lütfen giriş yapın.</p>';
        return;
    }
    
    try {
        // Load all data from all sessions for the current user
        const sessionsSnapshot = await db.collection('users').doc(currentUser.uid)
            .collection('sessions').get();
        
        // Öğrenci listesini doldur (benzersiz öğrenciler)
        const participantsSet = new Set();
        const participantsData = [];
        
        sessionsSnapshot.forEach(doc => {
            const data = doc.data();
            const participantKey = `${data.participantName}_${data.participantAge}`;
            if (!participantsSet.has(participantKey)) {
                participantsSet.add(participantKey);
                participantsData.push({
                    name: data.participantName || 'Bilinmiyor',
                    age: data.participantAge || '-',
                    key: participantKey
                });
            }
        });
        
        // Öğrenci dropdown'ını doldur
        const participantFilter = document.getElementById('filter-participant');
        if (participantFilter && participantsData.length > 0) {
            // Mevcut seçimi koru
            const currentSelection = participantFilter.value;
            
            // Dropdown'ı temizle ve yeniden doldur
            participantFilter.innerHTML = '<option value="">Tüm Öğrenciler</option>';
            participantsData.forEach(p => {
                const option = document.createElement('option');
                option.value = p.key;
                option.textContent = `${p.name} (${p.age} yaş)`;
                participantFilter.appendChild(option);
            });
            
            // Önceki seçimi geri yükle
            if (currentSelection) {
                participantFilter.value = currentSelection;
            }
        }
        
        // Filtreleri al
        const selectedParticipant = document.getElementById('filter-participant').value;
        const selectedSessionType = document.getElementById('filter-session').value;
        
        const allSkillsData = [];
        const allSessionData = [];
        const messagesBySession = {};
        const pct = (s) => s.t > 0 ? ((s.c / s.t) * 100).toFixed(0) + '%' : '-';

        // Filtrele
        const filteredDocs = sessionsSnapshot.docs.filter(doc => {
            const sd = doc.data();
            const participantKey = `${sd.participantName}_${sd.participantAge}`;
            if (selectedParticipant && participantKey !== selectedParticipant) return false;
            if (selectedSessionType && sd.sessionType !== selectedSessionType) return false;
            return true;
        });

        // Tüm alt koleksiyon sorgularını paralel çalıştır (N+1 → Promise.all)
        const dataSnapshots = await Promise.all(
            filteredDocs.map(doc =>
                db.collection('users').doc(currentUser.uid)
                    .collection('sessions').doc(doc.id)
                    .collection('data').get()
            )
        );

        filteredDocs.forEach((sessionDoc, i) => {
            const sessionData = sessionDoc.data();
            const sessionId = sessionDoc.id;
            const dataSnapshot = dataSnapshots[i];

            const startedAtRaw = sessionData.startedAt ? sessionData.startedAt.seconds * 1000 : 0;
            const skillsRecord = {
                sessionId,
                participantName: sessionData.participantName || 'Bilinmiyor',
                participantAge: sessionData.participantAge || '-',
                sessionType: sessionData.sessionType || 'baslama',
                sessionLabel: SESSION_LABELS[sessionData.sessionType] || 'Bilinmiyor',
                startedAt: sessionData.startedAt ? new Date(startedAtRaw).toLocaleString('tr-TR') : '-',
                startedAtRaw,
                endedAt: sessionData.endedAt ? new Date(sessionData.endedAt.seconds * 1000).toLocaleString('tr-TR') : '-',
                totalDurationSec: sessionData.totalDurationSec || 0,
                totalDurationMin: sessionData.totalDurationSec ? (sessionData.totalDurationSec / 60).toFixed(1) : '0',
                correctCount: 0, wrongCount: 0,
                correctPercent: '0%', wrongPercent: '0%',
                hintCount: 0,
                bullyStats: { sozel: {c:0,t:0}, dislama: {c:0,t:0}, tehdit: {c:0,t:0}, iftira: {c:0,t:0}, kimlik: {c:0,t:0} },
                skillsSnapshot: sessionData.skillsSnapshot || null,
                statsSnapshot: sessionData.statsSnapshot || null
            };

            let hintCount = 0;

            const sessionMsgs = [];
            dataSnapshot.forEach(doc => {
                const data = doc.data();
                const row = {
                    sessionId,
                    participantName: data.participantName || 'Bilinmiyor',
                    sessionLabel: data.sessionLabel || 'Bilinmiyor',
                    bullyingLabel: data.bullyingLabel || 'Bilinmiyor',
                    messageType: data.messageType || '-',
                    action: data.action || '-',
                    queueSlotIndex: data.queueSlotIndex,
                    reactionLabel: data.reactionLabel || (data.reactionSec != null ? data.reactionSec + ' saniye' : '-'),
                    correct: data.correct ? '+' : '-',
                    correctBool: data.correct,
                    hintUsed: data.hintUsed ? 'Evet' : 'Hayır',
                    timestamp: data.timestamp || '-'
                };
                allSessionData.push(row);
                sessionMsgs.push(row);

                if (data.hintUsed) hintCount++;

                if (data.messageType === 'cyberbullying' && data.bullyingType) {
                    const bt = data.bullyingType;
                    if (skillsRecord.bullyStats[bt]) {
                        skillsRecord.bullyStats[bt].t++;
                        if (data.correct) skillsRecord.bullyStats[bt].c++;
                    }
                }
            });

            sessionMsgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            const slotSum = computeSlotSummaryFromRows(sessionMsgs.map(r => ({
                action: r.action,
                correct: r.correctBool,
                queueSlotIndex: r.queueSlotIndex,
                messageType: r.messageType
            })));
            const correctCount = slotSum.correct;
            const wrongCount = slotSum.wrong;
            const total = slotSum.total;

            skillsRecord.correctCount = correctCount;
            skillsRecord.wrongCount = wrongCount;
            skillsRecord.hintCount = hintCount;
            skillsRecord.correctPercent = total > 0 ? ((correctCount / total) * 100).toFixed(1) + '%' : '0%';
            skillsRecord.wrongPercent   = total > 0 ? ((wrongCount  / total) * 100).toFixed(1) + '%' : '0%';
            skillsRecord.bully_sozel   = pct(skillsRecord.bullyStats.sozel);
            skillsRecord.bully_dislama = pct(skillsRecord.bullyStats.dislama);
            skillsRecord.bully_tehdit  = pct(skillsRecord.bullyStats.tehdit);
            skillsRecord.bully_iftira  = pct(skillsRecord.bullyStats.iftira);
            skillsRecord.bully_kimlik  = pct(skillsRecord.bullyStats.kimlik);
            skillsRecord.totalMessages = total;
            skillsRecord.scoreLine = formatMesajSkoru(correctCount, wrongCount, total);
            messagesBySession[sessionId] = sessionMsgs;

            allSkillsData.push(skillsRecord);
        });
        
        allSessionData.sort((a, b) => {
            if (a.sessionId !== b.sessionId) return String(a.sessionId).localeCompare(String(b.sessionId));
            return new Date(a.timestamp) - new Date(b.timestamp);
        });
        const msgNoBySession = {};
        allSessionData.forEach(row => {
            msgNoBySession[row.sessionId] = (msgNoBySession[row.sessionId] || 0) + 1;
            row._msgNo = msgNoBySession[row.sessionId];
        });

        displaySkillsAnalysis(allSkillsData, messagesBySession);
        displaySessionRecords(allSessionData);
    } catch (error) {
        console.error('Error loading admin data:', error);
        const skillsDisplay = document.getElementById('skills-analysis-display');
        const sessionDisplay = document.getElementById('session-records-display');
        if (skillsDisplay) skillsDisplay.innerHTML = '<p style="text-align: center; padding: 20px;">Veriler yüklenirken hata oluştu.</p>';
        if (sessionDisplay) sessionDisplay.innerHTML = '<p style="text-align: center; padding: 20px;">Veriler yüklenirken hata oluştu.</p>';
    }
}

function skillSnapshotCell(sk, key) {
    if (!sk || typeof sk[key] === 'undefined') return '—';
    return sk[key] ? '✓' : '✗';
}

// ALAN 1: Mesaj sonuçları + 6 beceri yan yana (oturum kartları)
function displaySkillsAnalysis(data, messagesBySession = {}) {
    const container = document.getElementById('skills-analysis-display');
    
    if (!data || data.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">Henüz beceri analizi verisi bulunmuyor.</p>';
        return;
    }

    const byParticipant = {};
    data.forEach(item => {
        const key = `${item.participantName}_${item.participantAge}`;
        if (!byParticipant[key]) byParticipant[key] = [];
        byParticipant[key].push(item);
    });

    let html = '';

    const multiSessions = Object.values(byParticipant).filter(arr => arr.length > 1);
    if (multiSessions.length > 0) {
        html += `<h4 style="padding:12px 20px 4px;color:#6c63ff;">📈 Oturumlar Arası Gelişim</h4>
        <table><thead><tr>
            <th>Öğrenci</th><th>Oturum</th><th>Tür</th>
            <th>Mesaj özeti</th>
            <th>Doğru %</th><th>İpucu</th><th>💬 Kötü Söz</th><th>👤 Yalnız Bırakma</th>
            <th>⚠️ Tehdit</th><th>📢 Yalan Yaymak</th><th>🎭 Sahte Hesap</th><th>Süre (dk)</th>
        </tr></thead><tbody>`;

        multiSessions.forEach(sessions => {
            sessions.sort((a, b) => a.startedAtRaw - b.startedAtRaw);
            sessions.forEach((item, i) => {
                const trend = i > 0 ? (parseFloat(item.correctPercent) > parseFloat(sessions[i-1].correctPercent) ? '⬆️' : parseFloat(item.correctPercent) < parseFloat(sessions[i-1].correctPercent) ? '⬇️' : '➡️') : '';
                html += `<tr>
                    <td>${item.participantName} (${item.participantAge})</td>
                    <td>${i + 1}. Oturum ${trend}</td>
                    <td>${item.sessionLabel}</td>
                    <td><strong>${item.scoreLine || item.correctPercent}</strong></td>
                    <td><strong>${item.correctPercent}</strong></td>
                    <td>${item.hintCount}</td>
                    <td>${item.bully_sozel}</td><td>${item.bully_dislama}</td>
                    <td>${item.bully_tehdit}</td><td>${item.bully_iftira}</td>
                    <td>${item.bully_kimlik}</td>
                    <td>${item.totalDurationMin}</td>
                </tr>`;
            });
        });
        html += '</tbody></table>';
    }

    html += `<h4 style="padding:12px 20px 4px;color:#6c63ff;">📋 Oturumlar — Mesaj kayıtları ve 6 beceri (yan yana)</h4>`;

    // Öğrenci başlığı + tüm öğrenciyi silme butonu
    const participantKeys = Object.keys(byParticipant);
    if (participantKeys.length > 0) {
        html += '<div style="display:flex;flex-direction:column;gap:6px;padding:0 20px 12px;">';
        participantKeys.forEach(key => {
            const sample = byParticipant[key][0];
            const sessionIds = byParticipant[key].map(s => s.sessionId);
            html += `
            <div style="display:flex;align-items:center;justify-content:space-between;background:#f8f8ff;border-radius:8px;padding:8px 14px;border:1px solid #e0e0f0;">
                <span style="font-weight:600;color:#4b4ba3;">👤 ${sample.participantName} (${sample.participantAge} yaş) · ${byParticipant[key].length} oturum</span>
                <button onclick="deleteParticipant('${sample.participantName}', ${sample.participantAge}, ${JSON.stringify(sessionIds).replace(/"/g, "'")})"
                    style="background:#fee2e2;color:#dc2626;border:1px solid #fca5a5;border-radius:6px;padding:4px 12px;font-size:0.78rem;cursor:pointer;">
                    🗑 Tüm Oturumları Sil
                </button>
            </div>`;
        });
        html += '</div>';
    }

    data.sort((a, b) => (b.startedAtRaw || 0) - (a.startedAtRaw || 0));

    data.forEach(item => {
        const msgs = messagesBySession[item.sessionId] || [];
        const sk = item.skillsSnapshot;

        let skillsRows = '';
        SKILL_LABELS.forEach(({ key, label }) => {
            const v = skillSnapshotCell(sk, key);
            const cls = sk && sk[key] ? 'skill-positive' : (sk && sk[key] === false ? 'skill-negative' : '');
            skillsRows += `<tr><td style="text-align:left;font-size:0.85rem;">${label}</td><td class="${cls}" style="font-weight:700;">${v}</td></tr>`;
        });

        let msgRows = '';
        msgs.forEach((m, idx) => {
            const rc = m.correctBool ? 'skill-positive' : 'skill-negative';
            msgRows += `<tr>
                <td>${idx + 1}</td>
                <td>${m.messageType}</td>
                <td>${m.bullyingLabel}</td>
                <td>${m.action}</td>
                <td class="${rc}">${m.correct}</td>
                <td>${m.hintUsed}</td>
            </tr>`;
        });
        if (msgRows === '') {
            msgRows = '<tr><td colspan="6" style="text-align:center;color:#64748b;">Mesaj kaydı yok</td></tr>';
        }

        html += `
        <div class="admin-session-card" data-session-id="${item.sessionId}">
            <div class="admin-session-header">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
                    <div>
                        <strong>${item.participantName}</strong> (${item.participantAge} yaş) · ${item.sessionLabel}<br>
                        <span class="admin-session-meta">${item.startedAt} · Süre: ${item.totalDurationMin} dk · İpucu: ${item.hintCount}</span><br>
                        <span class="admin-score-highlight">${item.scoreLine}</span>
                    </div>
                    <button onclick="deleteSession('${item.sessionId}', '${item.participantName}')"
                        style="flex-shrink:0;background:#fee2e2;color:#dc2626;border:1px solid #fca5a5;border-radius:6px;padding:4px 10px;font-size:0.78rem;cursor:pointer;white-space:nowrap;">
                        🗑 Oturumu Sil
                    </button>
                </div>
            </div>
            <div class="admin-session-tables-stack">
                <div class="admin-session-block">
                    <h5>1) Mesajlara verilen cevaplar (ham kayıt)</h5>
                    <table class="admin-nested-table admin-nested-table-wide">
                        <thead><tr>
                            <th>#</th><th>Mesaj türü</th><th>Zorbalık türü</th><th>Aksiyon</th><th>Sonuç</th><th>İpucu</th>
                        </tr></thead>
                        <tbody>${msgRows}</tbody>
                    </table>
                </div>
                <div class="admin-session-block">
                    <h5>2) 6 beceri analizi (oturum sonu özeti)</h5>
                    <table class="admin-nested-table admin-skills-mini admin-nested-table-wide">
                        <thead><tr><th>Beceri</th><th>Durum</th></tr></thead>
                        <tbody>${skillsRows}</tbody>
                    </table>
                    <p class="admin-skills-note">${sk ? 'Oturum bitiminde kaydedilen beceri durumlarıdır.' : 'Eski oturum: beceri özeti yok (yeni oturumlarda otomatik kaydedilir).'}</p>
                </div>
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

// ALAN 2: Oturum Kayıtları Tablosu (Mesaj Bazlı) (Madde 16)
function displaySessionRecords(data) {
    const container = document.getElementById('session-records-display');
    
    if (!data || data.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">Henüz oturum kaydı bulunmuyor.</p>';
        return;
    }
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Oturum ID</th>
                    <th>Katılımcı</th>
                    <th>Oturum</th>
                    <th>Mesaj Türü</th>
                    <th>Zorbalık Türü</th>
                    <th>Aksiyon</th>
                    <th>Tepki Süresi</th>
                    <th>Sonuç (+/-)</th>
                    <th>İpucu</th>
                    <th>Tarih/Saat</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.forEach(item => {
        const resultClass = item.correct === '+' ? 'skill-positive' : 'skill-negative';
        const no = item._msgNo != null ? item._msgNo : '—';
        html += `
            <tr>
                <td>${no}</td>
                <td>${item.sessionId.substring(0, 8)}...</td>
                <td>${item.participantName}</td>
                <td>${item.sessionLabel}</td>
                <td>${item.messageType}</td>
                <td>${item.bullyingLabel}</td>
                <td>${item.action}</td>
                <td>${item.reactionLabel}</td>
                <td class="${resultClass}">${item.correct}</td>
                <td>${item.hintUsed}</td>
                <td>${new Date(item.timestamp).toLocaleString('tr-TR')}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Admin sekme navigasyonu
document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById('tab-' + tab.dataset.tab);
        if (target) target.classList.add('active');
    });
});

// Filtreleme - Firebase'den çek
document.getElementById('filter-participant').addEventListener('change', () => {
    loadAdminData();
});

document.getElementById('filter-session').addEventListener('change', () => {
    loadAdminData();
});

// Beceri Analizi CSV İndir (Madde 14)
function downloadExcel(rows, filename) {
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const colWidths = rows[0].map((_, ci) => ({
        wch: Math.max(...rows.map(r => String(r[ci] ?? '').length), 10)
    }));
    ws['!cols'] = colWidths;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Veri');
    XLSX.writeFile(wb, filename);
}

const exportSkillsBtn = document.getElementById('export-skills-csv');
if (exportSkillsBtn) {
    exportSkillsBtn.addEventListener('click', async () => {
        if (!currentUser) {
            showNotification('Giriş Gerekli', 'Lütfen giriş yapın!', 'warning');
            return;
        }
        
        try {
            const sessionsSnapshot = await db.collection('users').doc(currentUser.uid)
                .collection('sessions').get();
            
            if (sessionsSnapshot.empty) {
                showNotification('Veri Yok', 'Dışa aktarılacak veri bulunmuyor!', 'info');
                return;
            }
            
            const rows = [['Oturum ID', 'Katılımcı', 'Yaş', 'Oturum Türü', 'Başlangıç', 'Bitiş', 'Süre (dk)', 'Mesaj özeti (doğru/yanlış)', 'Doğru %', 'İpucu Sayısı', 'Kötü Söz %', 'Yalnız Bırakma %', 'Tehdit %', 'Yalan Yaymak %', 'Sahte Hesap %', 'Beceri 1', 'Beceri 2', 'Beceri 3', 'Beceri 4', 'Beceri 5', 'Beceri 6']];
            
            for (const doc of sessionsSnapshot.docs) {
                const data = doc.data();
                const sessionId = doc.id;
                
                const startedAt = data.startedAt ? new Date(data.startedAt.seconds * 1000).toLocaleString('tr-TR') : '-';
                const endedAt = data.endedAt ? new Date(data.endedAt.seconds * 1000).toLocaleString('tr-TR') : '-';
                const duration = data.totalDurationSec ? (data.totalDurationSec / 60).toFixed(1) : '0';
                
                const dataSnapshot = await db.collection('users').doc(currentUser.uid)
                    .collection('sessions').doc(sessionId)
                    .collection('data').get();
                
                let correct = 0, wrong = 0, total = 0, hints = 0;
                const bs = { sozel:{c:0,t:0}, dislama:{c:0,t:0}, tehdit:{c:0,t:0}, iftira:{c:0,t:0}, kimlik:{c:0,t:0} };
                dataSnapshot.forEach(d => {
                    const dd = d.data();
                    total++;
                    if (dd.correct) correct++;
                    else wrong++;
                    if (dd.hintUsed) hints++;
                    if (dd.messageType === 'cyberbullying' && dd.bullyingType && bs[dd.bullyingType]) {
                        bs[dd.bullyingType].t++;
                        if (dd.correct) bs[dd.bullyingType].c++;
                    }
                });
                const pct = (s) => s.t > 0 ? ((s.c/s.t)*100).toFixed(1)+'%' : '-';
                const correctPct = total > 0 ? ((correct/total)*100).toFixed(1)+'%' : '0%';
                const scoreLine = formatMesajSkoru(correct, wrong, total);
                const sk = data.skillsSnapshot || {};
                const b = (k) => (sk[k] === true ? 'Doğru' : sk[k] === false ? 'Yanlış' : '—');
                
                rows.push([
                    sessionId,
                    data.participantName || 'Bilinmiyor',
                    data.participantAge || '-',
                    SESSION_LABELS[data.sessionType] || 'Bilinmiyor',
                    startedAt, endedAt, parseFloat(duration),
                    scoreLine,
                    correctPct, hints,
                    pct(bs.sozel), pct(bs.dislama), pct(bs.tehdit), pct(bs.iftira), pct(bs.kimlik),
                    b('navigation'), b('reading'), b('replying'), b('reporting'), b('complaintType'), b('blocking')
                ]);
            }
            
            downloadExcel(rows, `safetagram_beceri_analizi_${new Date().toISOString().split('T')[0]}.xlsx`);
        } catch (error) {
            console.error('Excel export error:', error);
            showNotification('Hata', 'Excel dışa aktarılırken hata oluştu!', 'error');
        }
    });
}

// Oturum Kayıtları Excel İndir
const exportSessionsBtn = document.getElementById('export-sessions-csv');
if (exportSessionsBtn) {
    exportSessionsBtn.addEventListener('click', async () => {
        if (!currentUser) {
            showNotification('Giriş Gerekli', 'Lütfen giriş yapın!', 'warning');
            return;
        }
        
        try {
            const sessionsSnapshot = await db.collection('users').doc(currentUser.uid)
                .collection('sessions').get();
            
            if (sessionsSnapshot.empty) {
                showNotification('Veri Yok', 'Dışa aktarılacak veri bulunmuyor!', 'info');
                return;
            }

            const rows = [['Oturum ID', 'Katılımcı', 'Oturum Türü', 'Mesaj Türü', 'Zorbalık Türü', 'Aksiyon', 'Tepki Süresi (sn)', 'Sonuç', 'İpucu', 'Tarih/Saat']];
            
            for (const sessionDoc of sessionsSnapshot.docs) {
                const sessionData = sessionDoc.data();
                const sessionId = sessionDoc.id;
                
                const dataSnapshot = await db.collection('users').doc(currentUser.uid)
                    .collection('sessions').doc(sessionId)
                    .collection('data').get();
                
                dataSnapshot.forEach(doc => {
                    const d = doc.data();
                    const reactionSec = d.reactionSec != null ? d.reactionSec : '-';
                    rows.push([
                        sessionId,
                        d.participantName || 'Bilinmiyor',
                        d.sessionLabel || 'Bilinmiyor',
                        d.messageType || '-',
                        d.bullyingLabel || 'Bilinmiyor',
                        d.action || '-',
                        reactionSec,
                        d.correct ? 'Doğru' : 'Yanlış',
                        d.hintUsed ? 'Evet' : 'Hayır',
                        new Date(d.timestamp).toLocaleString('tr-TR')
                    ]);
                });
            }
            
            downloadExcel(rows, `safetagram_oturum_kayitlari_${new Date().toISOString().split('T')[0]}.xlsx`);
        } catch (error) {
            console.error('Excel export error:', error);
            showNotification('Hata', 'Excel dışa aktarılırken hata oluştu!', 'error');
        }
    });
}

// Tek oturumu sil
async function deleteSession(sessionId, participantName) {
    if (!confirm(`"${participantName}" adlı öğrencinin bu oturumu silinecek. Onaylıyor musunuz?`)) return;
    if (!currentUser) return;
    try {
        const dataSnap = await db.collection('users').doc(currentUser.uid)
            .collection('sessions').doc(sessionId)
            .collection('data').get();
        const batch = db.batch();
        dataSnap.forEach(doc => batch.delete(doc.ref));
        batch.delete(db.collection('users').doc(currentUser.uid).collection('sessions').doc(sessionId));
        await batch.commit();
        showNotification('Silindi', 'Oturum başarıyla silindi.', 'success');
        loadAdminData();
    } catch (err) {
        console.error('deleteSession error:', err);
        showNotification('Hata', 'Oturum silinirken hata oluştu.', 'error');
    }
}

// Bir öğrenciye ait tüm oturumları sil
async function deleteParticipant(participantName, participantAge, sessionIds) {
    if (!confirm(`"${participantName}" adlı öğrencinin TÜM ${sessionIds.length} oturumu silinecek. Bu işlem geri alınamaz!`)) return;
    if (!currentUser) return;
    try {
        const batch = db.batch();
        for (const sessionId of sessionIds) {
            const dataSnap = await db.collection('users').doc(currentUser.uid)
                .collection('sessions').doc(sessionId)
                .collection('data').get();
            dataSnap.forEach(doc => batch.delete(doc.ref));
            batch.delete(db.collection('users').doc(currentUser.uid).collection('sessions').doc(sessionId));
        }
        await batch.commit();
        showNotification('Silindi', `${participantName} adlı öğrencinin tüm oturumları silindi.`, 'success');
        loadAdminData();
    } catch (err) {
        console.error('deleteParticipant error:', err);
        showNotification('Hata', 'Veriler silinirken hata oluştu.', 'error');
    }
}

// Verileri Temizle (toplu — tüm öğrenciler)
document.getElementById('clear-data').addEventListener('click', async () => {
    if (confirm('Tüm verileri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
        if (!currentUser) {
            showNotification('Giriş Gerekli', 'Lütfen giriş yapın.', 'warning');
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
            currentSession = getEmptySession();
            
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
                        // Reels devre dışı bırakıldı
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
    
    // Reels içeriği eğitim senaryosunda kullanılmadığı için boş bırakıldı
    const reelsData = [];
    
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
            const span = this.querySelector('span'); // Beğeni sayısının olduğu yer
            
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            this.classList.toggle('liked');
            
            // Reels verisini de o anlık güncelle
            if (this.classList.contains('liked')) {
                reel.likes += 1;
            } else {
                reel.likes -= 1;
            }
            span.textContent = formatNumber(reel.likes);
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
