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
} else {
    console.error('❌ Firebase Auth or Firestore not initialized');
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
        'dislanma': [
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
        
        // Show panel screen if on auth screen
        if (document.getElementById('auth-screen').classList.contains('active')) {
                console.log('Switching to panel screen');
            showScreen('panel-screen');
            updatePanelUserInfo();
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            showNotification('Uyarı', 'Kullanıcı bilgileri yüklenemedi.', 'warning');
        }
    } else {
        currentUser = null;
        console.log('User logged out');
        // Show auth screen if not on it
        if (!document.getElementById('auth-screen').classList.contains('active')) {
            showScreen('auth-screen');
        }
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

// Signup Form Handler
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
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
        appEntryBtn.addEventListener('click', () => {
            console.log('🚀 Uygulamaya Giriş butonuna tıklandı');
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
    const hintEnabled = document.getElementById('hint-use').checked;
        
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
        currentSession = {
        sessionId: sessionId,
        participantId: `P${Date.now()}`,
        participantName: name,
        participantAge: parseInt(age),
        sessionType: sessionType,
        currentBullyingType: 'all',
        startTime: new Date(),
        endTime: null,
        totalDurationSec: 0,
        userId: currentUser.uid,
        hintEnabled: hintEnabled,
        aiEnabled: false, // Yapay zeka mesaj desteği kapalı – API key sonradan eklenecek
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
            blocking: false,
            informAdult: false
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
        // Inbox mesajları (Madde 5)
        deliveredMessages: [],
        // Mesaj bazlı sonuçlar (Madde 16)
        perMessageResults: [],
        // Beceri basamakları kayıtları (Madde 13, 14)
        skillSteps: {
            navigation: false,
            reading: false,
            replying: false,
            reporting: false,
            complaintType: false,
            blocking: false,
            informAdult: false
        }
    };
        
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
    
    // Navigasyon becerisini başlangıçta true yap
    currentSession.skills.navigation = true;
    
        // Prepare message queue - TAM 10 MESAJ (Madde 4)
        // 5 güvenli + 5 zorbalık (her türden 1)
    currentSession.messageQueue = [];
        
        console.log('📨 Mesaj kuyruğu hazırlanıyor...');
    
    // Map session type to scenarios (handle new session types)
    let scenarioType = sessionType;
    if (sessionType === 'genelleme-on' || sessionType === 'genelleme-son') {
        scenarioType = 'baslama'; // Use baslama scenarios for genelleme tests
    }
    
    const cyberbullyingQueue = [];
    const safeQueue = [];
    
    // Get bullying types from scenarios.js
    const BULLYING_TYPES = window.BULLYING_TYPES || ['sozel', 'dislama', 'tehdit', 'iftira', 'kimlik'];
    
    // Get SCENARIOS from window (scenarios.js'den yüklenir)
    const SCENARIOS = window.SCENARIOS || {};
    
    // Iterate through all 5 bullying types
    BULLYING_TYPES.forEach(bullyingType => {
        const allScenarios = SCENARIOS[scenarioType] ? SCENARIOS[scenarioType][bullyingType] : (SCENARIOS['baslama'] ? SCENARIOS['baslama'][bullyingType] : []);
        
        // Separate cyberbullying and safe messages
        const cyberbullyingMessages = allScenarios.filter(s => 
            s.messages && s.messages.some(m => m.type === 'cyberbullying')
        );
        const safeMessages = allScenarios.filter(s => s.conversation);
        
        // Add 1 cyberbullying message from this type (HER TÜRDEN 1)
        if (cyberbullyingMessages.length > 0) {
            const randomCyberbullying = cyberbullyingMessages[Math.floor(Math.random() * cyberbullyingMessages.length)];
            cyberbullyingQueue.push({
                ...randomCyberbullying,
                _bullyingType: bullyingType,
                _kind: 'cyber',
                _deliveredAt: null,
                _status: 'pending'
            });
        }
        
        // Add 1 safe message from this type
        if (safeMessages.length > 0) {
            const randomSafe = safeMessages[Math.floor(Math.random() * safeMessages.length)];
            safeQueue.push({
                ...randomSafe,
                _bullyingType: bullyingType,
                _kind: 'safe',
                _deliveredAt: null,
                _status: 'pending'
            });
        }
    });
    
    // Karıştır ve birleştir (5 safe + 5 cyber = 10 mesaj)
    cyberbullyingQueue.sort(() => Math.random() - 0.5);
    safeQueue.sort(() => Math.random() - 0.5);
    
    // Mesajları interleave et (karışık sıra)
    currentSession.messageQueue = [...cyberbullyingQueue, ...safeQueue];
    currentSession.messageQueue.sort(() => Math.random() - 0.5);
    
    // İlk mesajın güvenli olmasını tercih et (kullanıcı deneyimi)
    const firstSafeIndex = currentSession.messageQueue.findIndex(m => m._kind === 'safe');
    if (firstSafeIndex > 0) {
        // İlk güvenli mesajı başa al
        const firstSafe = currentSession.messageQueue.splice(firstSafeIndex, 1)[0];
        currentSession.messageQueue.unshift(firstSafe);
        }
        
    currentSession.currentMessageIndex = 0;
        
        console.log('📋 Mesaj kuyruğu hazır:', currentSession.messageQueue.length, 'mesaj');
        console.log('🎯 Simülasyona geçiliyor...');
    
    showScreen('main-app');
    generateFeed();
    renderStories();
    
        console.log('✅ Ana ekran gösteriliyor');
        
        // İlk mesaj HEMEN gönder (Madde 4)
        // Kullanıcı ana sayfaya geldiğinde ilk mesaj gelir
        // Sonraki mesajlar 10 saniye aralıklarla gelecek
        setTimeout(() => {
            console.log('⏰ İlk mesaj gönderiliyor...');
            if (currentSession.messageQueue.length > 0) {
                currentSession.messageQueue[0]._deliveredAt = new Date();
                currentSession.messageQueue[0]._status = 'delivered';
        sendNextMessageNotification();
                console.log('✅ İlk mesaj gönderildi');
            }
        }, 1000); // 1 saniye sonra ilk mesaj
});
}

// Global değişkenler - YENİ YAPI (Madde 6)
let currentSession = {
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
        blocking: false,
        informAdult: false
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
    hintEnabled: true, // Default to true
    aiEnabled: false // Yapay zeka mesaj desteği kapalı – API key sonradan eklenecek
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

// Feed için gönderi verileri
// Not: Eğitim senaryosunda şu anda ana akış için post kullanılmıyor.
// Bu nedenle feed boş bırakıldı.
// Feed için gönderi verileri - scenarios.js'den POSTS_100 kullan
const POSTS = (typeof window !== 'undefined' && window.POSTS_100) ? window.POSTS_100 : (typeof POSTS_100 !== 'undefined' ? POSTS_100 : []);

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
            // Cloudinary video URL'sine autoplay parametresi ekle
            const videoUrl = post.videoEmbedUrl.includes('autoplay') 
                ? post.videoEmbedUrl 
                : post.videoEmbedUrl + (post.videoEmbedUrl.includes('?') ? '&' : '?') + 'autoplay=true&muted=true';
            
            mediaContent = `
                <div class="post-video" data-post="${index}" data-video-index="${index}" style="width: 100%; overflow: hidden; position: relative;">
                    <iframe
                        id="video-iframe-${index}"
                        src=""
                        data-video-url="${videoUrl}"
                        width="100%"
                        style="aspect-ratio: 1 / 1; border: none; display: block;"
                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                        allowfullscreen
                        frameborder="0">
                    </iframe>
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
            
            // Orijinal veriyi güncelle ki bir sonraki tıklamada doğru sayıdan devam etsin
            if (this.classList.contains('liked')) {
                POSTS[postIndex].likes += 1; // Dizideki değeri 1 artır
            } else {
                POSTS[postIndex].likes -= 1; // Dizideki değeri 1 azalt
            }
            
            // Güncel değeri ekrana yazdır
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
    
    // Instagram benzeri video oynatma sistemi - Intersection Observer
    setupVideoAutoplay();
}

// Instagram benzeri video oynatma - görünür videolar otomatik başlar, görünmeyenler durur
function setupVideoAutoplay() {
    const videoPosts = document.querySelectorAll('.post-video');
    if (videoPosts.length === 0) return;
    
    // Intersection Observer options - video ekranın %50'sinden fazlası görünürse oynat
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // Video'nun %50'si görünürse tetikle
    };
    
    // Video oynatma/durdurma fonksiyonu
    const handleVideoVisibility = (entries) => {
        entries.forEach(entry => {
            const iframe = entry.target.querySelector('iframe');
            if (!iframe) return;
            
            const videoUrl = iframe.getAttribute('data-video-url');
            if (!videoUrl) return;
            
            if (entry.isIntersecting) {
                // Video görünür - oynat
                if (!iframe.src || iframe.src === 'about:blank') {
                    iframe.src = videoUrl;
                }
                // Cloudinary iframe'leri için autoplay zaten URL'de var
            } else {
                // Video görünmüyor - durdur (iframe src'sini boşalt)
                // Not: Cloudinary iframe'leri için src'yi boşaltmak video'yu durdurur
                iframe.src = 'about:blank';
            }
        });
    };
    
    // Intersection Observer oluştur
    const observer = new IntersectionObserver(handleVideoVisibility, observerOptions);
    
    // Her video post'unu gözlemle
    videoPosts.forEach(post => {
        observer.observe(post);
    });
    
    // İlk görünür video'yu hemen başlat
    const firstVisibleVideo = Array.from(videoPosts).find(post => {
        const rect = post.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight * 0.5;
    });
    
    if (firstVisibleVideo) {
        const iframe = firstVisibleVideo.querySelector('iframe');
        if (iframe) {
            const videoUrl = iframe.getAttribute('data-video-url');
            if (videoUrl && !iframe.src) {
                iframe.src = videoUrl;
            }
        }
    }
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

// Story üretimi - 100 gerçek ünlü/influencer story
function generateStories() {
    storyState.stories = [];
    
    // STORY_USERS dizisini kullanarak 100 story oluştur
    const storyUsers = (typeof window !== 'undefined' && window.STORY_USERS) ? window.STORY_USERS : (typeof STORY_USERS !== 'undefined' ? STORY_USERS : []);
    
    if (storyUsers.length > 0) {
    for (let i = 0; i < 100; i++) {
            const username = storyUsers[i % storyUsers.length];
        storyState.stories.push({
                username: username + (i > storyUsers.length - 1 ? Math.floor(i / storyUsers.length) : ''),
                avatar: username,
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

// Mesaj bildirimi göster (Instagram DM style) - 10 MESAJ SİSTEMİ (Madde 4)
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
    if (badge) {
    badge.textContent = currentSession.pendingMessages;
    badge.style.display = 'flex';
    }
    
    // Get current message info for notification
    const scenario = currentSession.messageQueue[currentSession.currentMessageIndex];
    
    // Mesajı delivered olarak işaretle ve deliveredMessages'a ekle (Madde 5)
    if (scenario) {
        scenario._deliveredAt = new Date();
        scenario._status = 'delivered';
        
        // deliveredMessages'a ekle (inbox'ta görünsün)
        if (!currentSession.deliveredMessages) {
            currentSession.deliveredMessages = [];
        }
        
        // Mesaj önizlemesi için ilk mesajı al
        let previewText = 'Yeni mesaj';
        if (scenario.messages && scenario.messages.length > 0) {
            previewText = scenario.messages[0].text || 'Yeni mesaj';
        } else if (scenario.conversation && scenario.conversation.length > 0) {
            previewText = scenario.conversation[0].text || 'Yeni mesaj';
        }
        
        currentSession.deliveredMessages.push({
            sender: scenario.sender,
            avatar: scenario.avatar || scenario.sender,
            previewText: previewText,
            createdAt: new Date(),
            deliveredAt: new Date(),
            status: 'delivered',
            readAt: null,
            scenario: scenario
        });
    }
    
    const toast = document.getElementById('dm-notification-toast');
    const avatar = document.getElementById('dm-notif-avatar');
    const sender = document.getElementById('dm-notif-sender');
    const preview = document.getElementById('dm-notif-preview');
    
    if (!toast || !avatar || !sender || !preview || !scenario) return;
    
    // Set notification content
    avatar.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}`;
    sender.textContent = scenario.sender;
    
    // Get preview text - sadece "Yeni mesaj" göster, içeriği gösterme
    preview.textContent = 'Yeni mesaj';
    
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
                alert('Bu kullanıcı engellenmiştir.');
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
    
    // Eğer pending mesaj yoksa ve henüz tüm mesajlar gönderilmemişse, zamanlayıcı başlat
    if (currentSession.pendingMessages === 0 && 
        currentSession.currentMessageIndex > 0 && 
        currentSession.currentMessageIndex < currentSession.messageQueue.length) {
        // Son mesaj tamamlandı, 10 saniye sonra sonrakini gönder
        console.log('⏱️ 10 saniye sonra sonraki mesaj gelecek...');
        scheduleNextMessage();
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
    
    // Her oturumda mesaj geçmişi sıfırlanacak - Instagram benzeri deneyim
    // Geçmiş mesajlar gösterilmeyecek, her oturum temiz başlayacak
    // NOT: Geçmiş mesaj kontrolü tamamen kaldırıldı - her oturum sıfırdan başlıyor
    
    // Her zaman yeni mesaj akışı başlat - geçmiş mesaj kontrolü yok
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
            
            // Mesaj siber zorbalıksa butonları görünür kıl
            const message = scenario.messages[0];
            if (message && message.type === 'cyberbullying') {
                setTimeout(() => {
                    const actionButtons = document.getElementById('action-buttons');
                    const inputContainer = document.getElementById('dm-input-container');
                    if (actionButtons) {
                        actionButtons.style.display = 'flex';
                    }
                    if (inputContainer) {
                        inputContainer.style.display = 'flex';
                    }
                }, 1500); // Mesaj gösterildikten sonra butonları göster
            }
        }, 1000);
    }
}

// Yardımcı fonksiyon: Mesaj tamamlandı, sonraki mesaj için zamanlayıcıyı kur (Madde 4)
// ZAMANLAMA KURALI: Ana sayfaya dönüldükten sonra 10 saniye bekle
function scheduleNextMessage() {
    // Önceki zamanlayıcıyı temizle
    if (currentSession.messageTimeout) {
        clearTimeout(currentSession.messageTimeout);
        currentSession.messageTimeout = null;
    }
    
    // Mevcut mesajı completed olarak işaretle
    if (currentSession.currentMessageIndex < currentSession.messageQueue.length) {
        const currentMsg = currentSession.messageQueue[currentSession.currentMessageIndex];
        if (currentMsg) {
            currentMsg._status = 'completed';
        }
    }
    
    // Sonraki mesaj indeksine geç
    currentSession.currentMessageIndex++;
    
    // Mesaj indeksini kontrol et
    if (currentSession.currentMessageIndex >= 10 || currentSession.currentMessageIndex >= currentSession.messageQueue.length) {
        // Tüm mesajlar tamamlandı - 2 saniye sonra özet ekranı
        setTimeout(() => {
            showSummary();
        }, 2000);
        return;
    }
    
    // 10 saniye sonra sonraki mesajı gönder (Madde 4)
    currentSession.messageTimeout = setTimeout(() => {
        if (currentSession.messageQueue[currentSession.currentMessageIndex]) {
            currentSession.messageQueue[currentSession.currentMessageIndex]._deliveredAt = new Date();
            currentSession.messageQueue[currentSession.currentMessageIndex]._status = 'delivered';
        }
        sendNextMessageNotification();
    }, 10000);
}

// Geri butonları
document.getElementById('back-to-inbox').addEventListener('click', () => {
    // DM'den direk ana sayfaya dön (Madde 4 - kullanıcı manuel olarak dönmeli)
    const messagesContainer = document.getElementById('dm-messages');
    const scenario = currentSession.currentScenario;
    
    // Save conversation state if not already saved
    if (scenario && messagesContainer) {
        const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
            text: msg.querySelector('.message-content').textContent,
            sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
            time: msg.querySelector('.message-time').textContent
        }));
        
        // Mesaj durumunu kontrol et - eğer kullanıcı cevap vermişse "completed", yoksa "in-progress"
        const messageHistory = loadMessageHistory(currentSession.participantName);
        const senderHistory = messageHistory[scenario.sender];
        
        // Kullanıcının cevap verip vermediğini kontrol et
        const hasUserReply = allMessages.some(msg => msg.sender === 'user');
        
        if (!senderHistory || senderHistory.status !== 'blocked') {
            // Eğer kullanıcı cevap vermişse "completed", yoksa "in-progress" olarak kaydet
            const status = hasUserReply ? 'completed' : 'in-progress';
            saveConversationState(scenario.sender, allMessages, status);
        }
    }
    
    // DİREK ANA SAYFAYA DÖN (inbox'a değil)
    showScreen('main-app');
    
    // 10 saniye sonra sonraki mesajı gönder (Madde 4)
    console.log('📱 Ana sayfaya dönüldü, 10 saniye sonra sonraki mesaj gelecek...');
    scheduleNextMessage();
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
        // Siber zorbalık mesajı - aksiyon butonları ve input birlikte gösteriliyor
        const inputContainer = document.getElementById('dm-input-container');
        const actionButtons = document.getElementById('action-buttons');
        
        if (inputContainer) {
            inputContainer.style.display = 'flex';
        }
        if (actionButtons) {
            actionButtons.style.display = 'flex';
        }
        
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
        
        // 5 saniye sonra ipucu göster (sadece buton yanıp sönsün, metin YOK)
        // Check if hints are enabled before setting timeout
        if (currentSession.hintEnabled) {
            currentSession.hintTimeout = setTimeout(() => {
                showHint();
            }, 5000);
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
 * AI ile mesaj oluştur. API key kaldırıldı – sonradan verilecek.
 * Şu an sadece fallback cevap döner; mesaj/senaryo içeriği boş kalabilir.
 */
async function generateAIMessage(userMessage, conversationHistory, scenario) {
    // API key olmadan çağrı yapılmıyor – fallback kullan
    return getFallbackResponse(userMessage);
}

// Fallback: AI çalışmazsa basit cevaplar
function getFallbackResponse(userMessage) {
    const responses = [
        "Harika! Devam edelim 🎉",
        "Evet, haklısın! 👍",
        "Çok güzel bir fikir! ✨",
        "Aynen öyle! 😊",
        "Süper! 🚀",
        "Tamam, anladım! 👌"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Güvenli mesaja cevap gönder
document.getElementById('dm-send').addEventListener('click', async () => {
    const input = document.getElementById('dm-input');
    const text = input.value.trim();
    
    if (!text) return;
    
    // Cevaplama becerisini true yap
    currentSession.skills.replying = true;
    
    const messagesContainer = document.getElementById('dm-messages');
    const scenario = currentSession.currentScenario;
    
    // Kullanıcı mesajını ekle
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
    
    // Input'u devre dışı bırak (AI cevap beklenirken)
    input.disabled = true;
    document.getElementById('dm-send').disabled = true;
    
    // Conversation history'yi topla
    const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
        text: msg.querySelector('.message-content').textContent,
        sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
        time: msg.querySelector('.message-time').textContent
    }));
    
    // Veri kaydet
    const reactionTime = (Date.now() - currentSession.currentMessageStartTime) / 1000;
    saveMessageData('safe', 'reply', reactionTime, false, true);
    currentSession.stats.correct++;
    
    // Mevcut mesajın tipini kontrol et - güvenli mesaj mı siber zorbalık mı?
    // Safe messages use conversation array, cyberbullying messages use messages array
    const currentMessage = scenario.messages ? scenario.messages[currentSession.messageIndex] : null;
    const isSafeMessage = scenario.conversation !== undefined || 
                          (currentMessage && currentMessage.type !== 'cyberbullying') ||
                          !currentMessage;
    
    // Check if conversation continues or it's a safe message
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
                const aiMessageDiv = document.createElement('div');
                aiMessageDiv.className = 'message';
                
                const aiTime = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
                
                aiMessageDiv.innerHTML = `
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${scenario.avatar}" alt="Avatar" class="message-avatar">
                    <div>
                        <div class="message-content">${aiResponse}</div>
                        <div class="message-time">${aiTime}</div>
                    </div>
                `;
                
                messagesContainer.appendChild(aiMessageDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                
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
    } else {
        // Siber zorbalık mesajı - kullanıcı cevap verdi
        // Cevabı kaydet ve butonları göster
        saveConversationState(scenario.sender, allMessages, 'in-progress');
        
        // Input alanını gizle ama action-buttons'ı GÖSTER
        showSafeModeForCyberbullying();
        
        // NOT: Kullanıcı şikayet + engelle yapana kadar feed'e dönmemeli
        // returnToFeed() çağrısı KALDIRILDI - engelleme sonrası thank-you modal'dan dönecek
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
    
    // DM ekranından geliyorsak mesajı tamamlandı olarak işaretle
    if (currentScreen && currentScreen.id === 'dm-screen') {
        // Conversation state'i kaydet
        const messagesContainer = document.getElementById('dm-messages');
        if (scenario && messagesContainer) {
            const allMessages = Array.from(messagesContainer.querySelectorAll('.message')).map(msg => ({
                text: msg.querySelector('.message-content').textContent,
                sender: msg.classList.contains('sent') ? 'user' : scenario.sender,
                time: msg.querySelector('.message-time').textContent
            }));
            
            // Kullanıcının cevap verip vermediğini kontrol et
            const hasUserReply = allMessages.some(msg => msg.sender === 'user');
            
            // Save as completed if not blocked and user has replied
            const messageHistory = loadMessageHistory(currentSession.participantName);
            const senderHistory = messageHistory[scenario.sender];
            if (!senderHistory || senderHistory.status !== 'blocked') {
                // Eğer kullanıcı cevap vermişse "completed", yoksa "in-progress"
                const status = hasUserReply ? 'completed' : 'in-progress';
                saveConversationState(scenario.sender, allMessages, status);
            }
            
            // Ana sayfaya dön
            showScreen('main-app');
            
            // Sadece kullanıcı cevap vermişse sonraki mesajı planla
            if (hasUserReply) {
                // Mesaj tamamlandı - 10 saniye sonra sonraki mesajı gönder
                scheduleNextMessage();
            }
            // Eğer kullanıcı cevap vermemişse zamanlayıcı kurma, mesaj "in-progress" olarak kalacak
        } else {
            // Inbox'tan veya başka bir yerden geliyorsak sadece ekranı değiştir
            showScreen('main-app');
        }
    } else {
        // Inbox'tan veya başka bir yerden geliyorsak sadece ekranı değiştir
        showScreen('main-app');
    }
}

// Thank you modal'ı kapat ve akışa devam et
document.getElementById('close-thank-you-modal').addEventListener('click', () => {
    document.getElementById('thank-you-modal').style.display = 'none';
    
    // Modal'ı kapat ama FEED'E DÖNME - kullanıcı kendisi geri butonuna basacak
    // NOT: showScreen('main-app') KALDIRILDI - kullanıcı manuel olarak dönmeli
    
    // Mesaj tamamlandı - zamanlayıcıyı kur (indeks scheduleNextMessage içinde artırılacak)
    // Ama önce mevcut mesajın indeksini artır çünkü engelleme tamamlandı
    // NOT: scheduleNextMessage içinde indeks artırılıyor, burada artırmaya gerek yok
    // Sadece zamanlayıcıyı kur
    scheduleNextMessage();
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

// Yetişkine bildir butonu - Şimdilik kullanılmıyor ama skill tracking için hazır
function informAdult() {
    currentSession.skills.informAdult = true;
    showNotification('Bildirildi', 'Bir yetişkine bildirildi olarak işaretlendi.', 'success');
}

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

// Şikayet nedeni seçim modalını göster (Madde 8 uygulandı)
function showComplaintReasonDialog() {
    const modal = document.getElementById('complaint-modal');
    const reasonsContainer = document.getElementById('complaint-reasons');
    const scenario = currentSession.currentScenario;
    const message = scenario.messages[currentSession.messageIndex];
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
            currentSession.skills.complaintType = true; // Madde 13 - Beceri 5
            
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

// Veri kaydet - CEVAP SÜRESİ KALDIRILDI (Madde 15)
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
        // CEVAP SÜRESİ KALDIRILDI (Madde 15) - reactionTime artık kaydedilmiyor
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
    
    const complaintTypeEl = document.getElementById('skill-complaint-type');
    if (complaintTypeEl) {
        complaintTypeEl.textContent = currentSession.skills.complaintType ? '✓' : '✗';
        complaintTypeEl.className = currentSession.skills.complaintType ? 'skill-positive' : 'skill-negative';
    }
    
    document.getElementById('skill-blocking').textContent = currentSession.skills.blocking ? '✓' : '✗';
    document.getElementById('skill-blocking').className = currentSession.skills.blocking ? 'skill-positive' : 'skill-negative';
    
    const informAdultEl = document.getElementById('skill-inform-adult');
    if (informAdultEl) {
        informAdultEl.textContent = currentSession.skills.informAdult ? '✓' : '✗';
        informAdultEl.className = currentSession.skills.informAdult ? 'skill-positive' : 'skill-negative';
    }
    
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
                        status: 'completed'
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
    currentSession = {
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
            blocking: false,
            informAdult: false
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
        hintEnabled: true,
        aiEnabled: false // Yapay zeka mesaj desteği kapalı – API key sonradan eklenecek
    };

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
        
        for (const sessionDoc of sessionsSnapshot.docs) {
            const sessionData = sessionDoc.data();
            const sessionId = sessionDoc.id;
            
            // Filtre uygula - önce öğrenci, sonra oturum türü
            const participantKey = `${sessionData.participantName}_${sessionData.participantAge}`;
            if (selectedParticipant && participantKey !== selectedParticipant) {
                continue; // Bu öğrenci seçili değil, atla
            }
            
            if (selectedSessionType && sessionData.sessionType !== selectedSessionType) {
                continue; // Bu oturum türü seçili değil, atla
            }
            
            // Beceri analizi verisi oluştur (Madde 13, 14)
            const skillsRecord = {
                sessionId: sessionId,
                participantName: sessionData.participantName || 'Bilinmiyor',
                participantAge: sessionData.participantAge || '-',
                sessionType: sessionData.sessionType || 'baslama',
                sessionLabel: SESSION_LABELS[sessionData.sessionType] || 'Bilinmiyor',
                startedAt: sessionData.startedAt ? new Date(sessionData.startedAt.seconds * 1000).toLocaleString('tr-TR') : '-',
                endedAt: sessionData.endedAt ? new Date(sessionData.endedAt.seconds * 1000).toLocaleString('tr-TR') : '-',
                totalDurationSec: sessionData.totalDurationSec || 0,
                totalDurationMin: sessionData.totalDurationSec ? (sessionData.totalDurationSec / 60).toFixed(1) : '0',
                // Beceri basamakları (7 adet)
                skill1: '-', skill2: '-', skill3: '-', skill4: '-', skill5: '-', skill6: '-', skill7: '-',
                correctCount: 0,
                wrongCount: 0,
                correctPercent: '0%',
                wrongPercent: '0%'
            };
            
            // Mesaj bazlı oturum kayıtları
            const dataSnapshot = await db.collection('users').doc(currentUser.uid)
                .collection('sessions').doc(sessionId)
                .collection('data').get();
            
            let correctCount = 0;
            let wrongCount = 0;
            
            dataSnapshot.forEach(doc => {
                const data = doc.data();
                allSessionData.push({
                    sessionId: sessionId,
                    participantName: data.participantName || 'Bilinmiyor',
                    sessionLabel: data.sessionLabel || 'Bilinmiyor',
                    bullyingLabel: data.bullyingLabel || 'Bilinmiyor',
                    messageType: data.messageType || '-',
                    action: data.action || '-',
                    correct: data.correct ? '+' : '-',
                    correctBool: data.correct,
                    hintUsed: data.hintUsed ? 'Evet' : 'Hayır',
                    timestamp: data.timestamp || '-'
                });
                
                if (data.correct) correctCount++;
                else wrongCount++;
            });
            
            // Beceri analizini tamamla
            const total = correctCount + wrongCount;
            if (total > 0) {
                skillsRecord.correctCount = correctCount;
                skillsRecord.wrongCount = wrongCount;
                skillsRecord.correctPercent = ((correctCount / total) * 100).toFixed(1) + '%';
                skillsRecord.wrongPercent = ((wrongCount / total) * 100).toFixed(1) + '%';
            }
            
            allSkillsData.push(skillsRecord);
        }
        
        displaySkillsAnalysis(allSkillsData);
        displaySessionRecords(allSessionData);
    } catch (error) {
        console.error('Error loading admin data:', error);
        const skillsDisplay = document.getElementById('skills-analysis-display');
        const sessionDisplay = document.getElementById('session-records-display');
        if (skillsDisplay) skillsDisplay.innerHTML = '<p style="text-align: center; padding: 20px;">Veriler yüklenirken hata oluştu.</p>';
        if (sessionDisplay) sessionDisplay.innerHTML = '<p style="text-align: center; padding: 20px;">Veriler yüklenirken hata oluştu.</p>';
    }
}

// ALAN 1: Beceri Analizi Tablosu (Madde 14, 16)
function displaySkillsAnalysis(data) {
    const container = document.getElementById('skills-analysis-display');
    
    if (!data || data.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">Henüz beceri analizi verisi bulunmuyor.</p>';
        return;
    }
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Oturum ID</th>
                    <th>Katılımcı</th>
                    <th>Yaş</th>
                    <th>Oturum Türü</th>
                    <th>Başlangıç</th>
                    <th>Bitiş</th>
                    <th>Toplam Süre (dk)</th>
                    <th>Doğru</th>
                    <th>Yanlış</th>
                    <th>Doğru %</th>
                    <th>Yanlış %</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.forEach(item => {
        html += `
            <tr>
                <td>${item.sessionId.substring(0, 8)}...</td>
                <td>${item.participantName}</td>
                <td>${item.participantAge}</td>
                <td>${item.sessionLabel}</td>
                <td>${item.startedAt}</td>
                <td>${item.endedAt}</td>
                <td>${item.totalDurationMin}</td>
                <td>${item.correctCount}</td>
                <td>${item.wrongCount}</td>
                <td>${item.correctPercent}</td>
                <td>${item.wrongPercent}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
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
                    <th>Oturum ID</th>
                    <th>Katılımcı</th>
                    <th>Oturum</th>
                    <th>Mesaj Türü</th>
                    <th>Zorbalık Türü</th>
                    <th>Aksiyon</th>
                    <th>Sonuç (+/-)</th>
                    <th>İpucu</th>
                    <th>Tarih/Saat</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.forEach(item => {
        const resultClass = item.correct === '+' ? 'skill-positive' : 'skill-negative';
        html += `
            <tr>
                <td>${item.sessionId.substring(0, 8)}...</td>
                <td>${item.participantName}</td>
                <td>${item.sessionLabel}</td>
                <td>${item.messageType}</td>
                <td>${item.bullyingLabel}</td>
                <td>${item.action}</td>
                <td class="${resultClass}">${item.correct}</td>
                <td>${item.hintUsed}</td>
                <td>${new Date(item.timestamp).toLocaleString('tr-TR')}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Filtreleme - Firebase'den çek
document.getElementById('filter-participant').addEventListener('change', () => {
    loadAdminData(); // Öğrenci değiştiğinde yeniden yükle
});

document.getElementById('filter-session').addEventListener('change', () => {
    loadAdminData(); // Oturum türü değiştiğinde yeniden yükle
});

// Beceri Analizi CSV İndir (Madde 14)
const exportSkillsBtn = document.getElementById('export-skills-csv');
if (exportSkillsBtn) {
    exportSkillsBtn.addEventListener('click', async () => {
        if (!currentUser) {
            alert('Lütfen giriş yapın!');
            return;
        }
        
        try {
            const sessionsSnapshot = await db.collection('users').doc(currentUser.uid)
                .collection('sessions').get();
            
            if (sessionsSnapshot.empty) {
                alert('Dışa aktarılacak veri bulunmuyor!');
                return;
            }
            
            let csv = '\ufeffOturum ID,Katılımcı,Yaş,Oturum Türü,Başlangıç,Bitiş,Toplam Süre (dk),Doğru,Yanlış,Doğru %,Yanlış %\n';
            
            for (const doc of sessionsSnapshot.docs) {
                const data = doc.data();
                const sessionId = doc.id;
                
                const startedAt = data.startedAt ? new Date(data.startedAt.seconds * 1000).toLocaleString('tr-TR') : '-';
                const endedAt = data.endedAt ? new Date(data.endedAt.seconds * 1000).toLocaleString('tr-TR') : '-';
                const duration = data.totalDurationSec ? (data.totalDurationSec / 60).toFixed(1) : '0';
                
                // Alt koleksiyondan verileri al
                const dataSnapshot = await db.collection('users').doc(currentUser.uid)
                    .collection('sessions').doc(sessionId)
                    .collection('data').get();
                
                let correctCount = 0;
                let wrongCount = 0;
                dataSnapshot.forEach(d => {
                    if (d.data().correct) correctCount++;
                    else wrongCount++;
                });
                
                const total = correctCount + wrongCount;
                const correctPercent = total > 0 ? ((correctCount / total) * 100).toFixed(1) : '0';
                const wrongPercent = total > 0 ? ((wrongCount / total) * 100).toFixed(1) : '0';
                
                csv += `${sessionId},${data.participantName || 'Bilinmiyor'},${data.participantAge || '-'},${SESSION_LABELS[data.sessionType] || 'Bilinmiyor'},${startedAt},${endedAt},${duration},${correctCount},${wrongCount},${correctPercent}%,${wrongPercent}%\n`;
            }
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `safetagram_beceri_analizi_${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
        } catch (error) {
            console.error('CSV export error:', error);
            alert('CSV dışa aktarılırken hata oluştu!');
        }
    });
}

// Oturum Kayıtları CSV İndir (Madde 16)
const exportSessionsBtn = document.getElementById('export-sessions-csv');
if (exportSessionsBtn) {
    exportSessionsBtn.addEventListener('click', async () => {
        if (!currentUser) {
            alert('Lütfen giriş yapın!');
            return;
        }
        
        try {
            const sessionsSnapshot = await db.collection('users').doc(currentUser.uid)
                .collection('sessions').get();
            
            if (sessionsSnapshot.empty) {
        alert('Dışa aktarılacak veri bulunmuyor!');
        return;
    }
    
            let csv = '\ufeffOturum ID,Katılımcı,Oturum Türü,Mesaj Türü,Zorbalık Türü,Aksiyon,Sonuç,İpucu,Tarih/Saat\n';
            
            for (const sessionDoc of sessionsSnapshot.docs) {
                const sessionData = sessionDoc.data();
                const sessionId = sessionDoc.id;
                
                const dataSnapshot = await db.collection('users').doc(currentUser.uid)
                    .collection('sessions').doc(sessionId)
                    .collection('data').get();
                
                dataSnapshot.forEach(doc => {
                    const d = doc.data();
                    csv += `${sessionId},${d.participantName || 'Bilinmiyor'},${d.sessionLabel || 'Bilinmiyor'},${d.messageType || '-'},${d.bullyingLabel || 'Bilinmiyor'},${d.action || '-'},${d.correct ? '+' : '-'},${d.hintUsed ? 'Evet' : 'Hayır'},${new Date(d.timestamp).toLocaleString('tr-TR')}\n`;
                });
            }
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `safetagram_oturum_kayitlari_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
        } catch (error) {
            console.error('CSV export error:', error);
            alert('CSV dışa aktarılırken hata oluştu!');
        }
});
}

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
                    complaintType: false,
                    blocking: false,
                    informAdult: false
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
