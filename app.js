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
        blocking: false,
        notifying: false
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
    blockClicked: false
};

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
    
    // 10 saniye sonra ilk mesajı göster
    setTimeout(() => {
        startFirstScenario();
    }, 10000);
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
        
        // Butonları sıfırla
        currentSession.reportClicked = false;
        currentSession.blockClicked = false;
        document.getElementById('report-btn').disabled = false;
        document.getElementById('block-btn').disabled = true;
        document.getElementById('notify-btn').disabled = true;
        
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
    
    currentSession.reportClicked = true;
    currentSession.skills.reporting = true;
    
    document.getElementById('report-btn').disabled = true;
    document.getElementById('block-btn').disabled = false;
    
    const reactionTime = (Date.now() - currentSession.currentMessageStartTime) / 1000;
    saveMessageData('cyberbullying', 'report', reactionTime, hintUsed, true);
    
    currentSession.stats.correct++;
    
    // İpucu göster
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
        // Önce şikayet etmeden engelleyemez
        alert('Önce şikayet etmelisiniz!');
        return;
    }
    
    currentSession.blockClicked = true;
    currentSession.skills.blocking = true;
    
    document.getElementById('block-btn').disabled = true;
    document.getElementById('notify-btn').disabled = false;
    
    const reactionTime = (Date.now() - currentSession.currentMessageStartTime) / 1000;
    saveMessageData('cyberbullying', 'block', reactionTime, hintUsed, true);
    
    currentSession.stats.correct++;
    
    // İpucu göster
    showNextStepHint('notify');
});

// Yetişkine bildir butonu
document.getElementById('notify-btn').addEventListener('click', () => {
    if (currentSession.hintTimeout) {
        clearTimeout(currentSession.hintTimeout);
    }
    
    const hintUsed = document.getElementById('hint-overlay').style.display === 'flex';
    document.getElementById('hint-overlay').style.display = 'none';
    
    if (!currentSession.blockClicked) {
        // Önce engellemeden bildiremez
        alert('Önce engellemelisiniz!');
        return;
    }
    
    currentSession.skills.notifying = true;
    
    document.getElementById('notify-btn').disabled = true;
    
    const reactionTime = (Date.now() - currentSession.currentMessageStartTime) / 1000;
    saveMessageData('cyberbullying', 'notify', reactionTime, hintUsed, true);
    
    currentSession.stats.correct++;
    
    // 10 saniye sonra sonraki mesaj
    currentSession.messageIndex++;
    setTimeout(() => {
        sendMessage();
    }, 10000);
});

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
    } else {
        hintText = 'Son olarak bu durumu YETİŞKİNE BİLDİR butonuna basarak bildir.';
        blinkButton = document.getElementById('notify-btn');
    }
    
    document.getElementById('hint-text').textContent = hintText;
    document.getElementById('hint-overlay').style.display = 'flex';
    
    if (blinkButton) {
        blinkButton.classList.add('blink');
    }
}

// Sonraki adım ipucu
function showNextStepHint(step) {
    setTimeout(() => {
        let hintText = '';
        let blinkButton = null;
        
        if (step === 'block') {
            hintText = 'Şimdi bu kişiyi ENGELLE butonuna basarak engelle.';
            blinkButton = document.getElementById('block-btn');
        } else if (step === 'notify') {
            hintText = 'Son olarak bu durumu YETİŞKİNE BİLDİR butonuna basarak bildir.';
            blinkButton = document.getElementById('notify-btn');
        }
        
        document.getElementById('hint-text').textContent = hintText;
        document.getElementById('hint-overlay').style.display = 'flex';
        
        if (blinkButton) {
            blinkButton.classList.add('blink');
        }
        
        currentSession.hintTimeout = setTimeout(() => {
            document.getElementById('hint-overlay').style.display = 'none';
        }, 5000);
    }, 5000);
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
    
    document.getElementById('skill-notifying').textContent = currentSession.skills.notifying ? '✓' : '✗';
    document.getElementById('skill-notifying').className = currentSession.skills.notifying ? 'skill-positive' : 'skill-negative';
    
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
            blocking: false,
            notifying: false
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
        blockClicked: false
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
    
    // Dosyayı indir
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
