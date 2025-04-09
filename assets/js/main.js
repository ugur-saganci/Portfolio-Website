// Sayfa yüklendiğinde çalışacak kodlar
document.addEventListener('DOMContentLoaded', function() {
    // Scroll olayını dinle
    window.addEventListener('scroll', function() {
        // Header için scroll sınıfı ekle/çıkar
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Sayfadaki elementlerin görünürlüğünü kontrol et
        checkVisibility();
    });

    // Form gönderme işlemi
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form verilerini al
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Form doğrulama
            if (!name || !email || !subject || !message) {
                showNotification('Lütfen tüm alanları doldurun.', 'error');
                return;
            }
            
            // Form gönderme simülasyonu
            showNotification('Mesajınız başarıyla gönderildi!', 'success');
            contactForm.reset();
        });
    }

    // Animasyonlar için görünürlük kontrolü
    function checkVisibility() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animate');
            }
        });
    }

    // Bildirim gösterme fonksiyonu
    function showNotification(message, type) {
        // Bildirim elementini oluştur
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Bildirim elementini sayfaya ekle
        document.body.appendChild(notification);
        
        // Bildirim animasyonu
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Bildirim süre sonunda kaybolsun
        setTimeout(() => {
            notification.classList.remove('show');
            // Tamamen kaybolduğunda elementi kaldır
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Mobil menü göster/gizle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }

    // Sayfa içi linklerin smooth scroll özelliği
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mobil menüyü kapat (eğer açıksa)
            if (menuToggle && menuToggle.classList.contains('open')) {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            }
            
            // Hedef elemana smooth scroll
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animasyon sınıflarını elementlere ekle
    const animateElements = [
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.stat'),
        ...document.querySelectorAll('.skill'),
        document.querySelector('.hero-content'),
        document.querySelector('.hero-image'),
        document.querySelector('.about-text'),
        document.querySelector('.about-stats'),
        document.querySelector('.contact-info'),
        document.querySelector('.contact-form')
    ];
    
    animateElements.forEach(element => {
        if (element) {
            element.classList.add('animate-on-scroll');
        }
    });
    
    // Sayfa yüklendiğinde görünür elementleri kontrol et
    checkVisibility();
    
    // Yazı animasyonu
    const typedText = document.querySelector('.typed-text');
    if (typedText) {
        const text = typedText.getAttribute('data-text').split(',');
        let count = 0;
        let index = 0;
        let currentText = '';
        let letter = '';
        
        function type() {
            if (count === text.length) {
                count = 0;
            }
            
            currentText = text[count];
            letter = currentText.slice(0, ++index);
            
            typedText.textContent = letter;
            
            if (letter.length === currentText.length) {
                count++;
                index = 0;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 100);
            }
        }
        
        type();
    }
}); 