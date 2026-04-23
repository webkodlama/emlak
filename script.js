/**
 * HANCIOGLU EMLAK - JavaScript Dosyası
 * Modern, Responsive ve Animasyonlu İşlevsellik
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // NAVİGASYON İŞLEMLERİ
    // ============================================
    
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Header scroll efekti
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Hamburger menü toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Mobil menü linklerine tıklandığında menüyü kapat
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Aktif menü öğesini güncelle
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // ============================================
    // YUKARI ÇIK BUTONU
    // ============================================
    
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ============================================
    // SAYAÇ ANİMASYONU (Hero Bölümü)
    // ============================================
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function checkCounters() {
        if (countersAnimated) return;
        
        const heroSection = document.querySelector('.hero');
        const rect = heroSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
            countersAnimated = true;
        }
    }
    
    window.addEventListener('scroll', checkCounters);
    checkCounters(); // Sayfa yüklendiğinde kontrol et
    
    // ============================================
    // SCROLL ANİMASYONLARI
    // ============================================
    
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => observer.observe(el));
    
    // ============================================
    // İLAN FİLTRELEME
    // ============================================
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Aktif butonu güncelle
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Kartları filtrele
            propertyCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    const categories = card.getAttribute('data-category');
                    if (categories && categories.includes(filter)) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.classList.add('hidden');
                        }, 300);
                    }
                }
            });
        });
    });
    
    // ============================================
    // GERİ SAYIM SAYACI
    // ============================================
    
    function updateCountdown() {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (!daysEl) return;
        
        // Hedef tarih: 15 gün sonra
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 15);
        
        function calculate() {
            const now = new Date();
            const diff = targetDate - now;
            
            if (diff <= 0) {
                // Süre dolduğunda yeniden başlat
                targetDate.setDate(targetDate.getDate() + 15);
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
        
        calculate();
        setInterval(calculate, 1000);
    }
    
    updateCountdown();
    
    // ============================================
    // SSS (FAQ) AKORDEON
    // ============================================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Tüm öğeleri kapat
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Tıklanan öğeyi aç (eğer kapalıysa)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ============================================
    // İLETİŞİM FORMU
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Doğrulama
            if (!data.name || !data.phone) {
                showNotification('Lütfen zorunlu alanları doldurun.', 'error');
                return;
            }
            
            if (!data.consent) {
                showNotification('Lütfen aydınlatma metnini onaylayın.', 'error');
                return;
            }
            
            // Telefon doğrulama
            const phoneRegex = /^[0-9]{10,11}$/;
            const cleanPhone = data.phone.replace(/\s/g, '').replace(/^0/, '');
            if (!phoneRegex.test(cleanPhone)) {
                showNotification('Lütfen geçerli bir telefon numarası girin.', 'error');
                return;
            }
            
            // Başarılı mesajı
            showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
            contactForm.reset();
        });
    }
    
    // Bildirim fonksiyonu
    function showNotification(message, type = 'success') {
        // Mevcut bildirimleri kaldır
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());
        
        // Yeni bildirim oluştur
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Stil ekle
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        // Animasyon stili ekle
        if (!document.getElementById('notification-style')) {
            const style = document.createElement('style');
            style.id = 'notification-style';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // 5 saniye sonra kaldır
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    // ============================================
    // TEL INPUT MASK
    // ============================================
    
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.startsWith('0')) {
                    value = value.substring(1);
                }
                
                if (value.length <= 3) {
                    e.target.value = value;
                } else if (value.length <= 6) {
                    e.target.value = value.slice(0, 3) + ' ' + value.slice(3);
                } else if (value.length <= 8) {
                    e.target.value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
                } else {
                    e.target.value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 8) + ' ' + value.slice(8, 10);
                }
            }
        });
    }
    
    // ============================================
    // LAZY LOADING İÇİN GÖRSEL YÜKLEME
    // ============================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ============================================
    // PARALLAX EFEKTİ (Hero Arka Plan)
    // ============================================
    
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg && window.matchMedia('(min-width: 768px)').matches) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
    
    // ============================================
    // YÜKLEME OPTİMİZASYONU
    // ============================================
    
    // Sayfa tamamen yüklendiğinde
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    console.log('🏠 Hancıoğlu Emlak - Site yüklendi');
});
