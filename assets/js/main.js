// Preloader
window.addEventListener('load', function() {
    anime({
        targets: '.loader-bar',
        width: '100%',
        easing: 'easeInOutQuad',
        duration: 2000,
        complete: function() {
            anime({
                targets: '.loader',
                opacity: 0,
                duration: 500,
                easing: 'easeInOutQuad',
                complete: function() {
                    document.querySelector('.loader').style.display = 'none';
                    
                    // Animate hero section
                    anime({
                        targets: '.hero-title',
                        opacity: 1,
                        translateY: [50, 0],
                        delay: 300,
                        duration: 1000,
                        easing: 'easeOutQuad'
                    });
                    
                    anime({
                        targets: '.hero-subtitle',
                        opacity: 1,
                        translateY: [30, 0],
                        delay: 500,
                        duration: 1000,
                        easing: 'easeOutQuad'
                    });
                    
                    anime({
                        targets: '.hero-cta',
                        opacity: 1,
                        translateY: [20, 0],
                        delay: 700,
                        duration: 1000,
                        easing: 'easeOutQuad'
                    });
                    
                    anime({
                        targets: '.cube-container',
                        opacity: 1,
                        translateX: [100, 0],
                        delay: 500,
                        duration: 1000,
                        easing: 'easeOutQuad'
                    });
                    
                    // Start cube rotation
                    animateCube();
                }
            });
        }
    });
});

// Animate project cards on scroll
const projectCards = document.querySelectorAll('.project-card');

const observerOptions = {
    threshold: 0.1
};

const projectObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            anime({
                targets: entry.target,
                opacity: 1,
                translateY: [30, 0],
                duration: 800,
                easing: 'easeOutQuad'
            });
            projectObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// 3D Cube Animation
function animateCube() {
    anime({
        targets: '.cube',
        rotateY: '+=360',
        rotateX: '+=180',
        duration: 15000,
        easing: 'linear',
        loop: true
    });
}

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', function() {
    nav.classList.toggle('active');
    const icon = this.querySelector('i');
    
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Navigation link click on mobile
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Scroll to section smoothly
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = document.querySelector('.scroll-top');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        scrollTop.classList.add('active');
    } else {
        header.classList.remove('scrolled');
        scrollTop.classList.remove('active');
    }
});

// Scroll to top button
document.querySelector('.scroll-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate skill progress bars
function animateSkillBars() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    skillProgressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        anime({
            targets: bar,
            width: percent + '%',
            duration: 1500,
            easing: 'easeInOutQuart',
            delay: 300
        });
    });
}

// Animate circular progress
function animateCircularProgress() {
    const progressCircles = document.querySelectorAll('.progress-ring-circle-fill');
    progressCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const circumference = 2 * Math.PI * 54; // 2πr where r=54
        const offset = circumference - (percent / 100 * circumference);
        
        anime({
            targets: circle,
            strokeDashoffset: offset,
            duration: 1500,
            easing: 'easeInOutQuart',
            delay: 500
        });
    });
}

// Create observers for skill animations
const skillsSectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            animateCircularProgress();
            skillsSectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

// Observe skills section
const skillsSection = document.querySelector('.skills-container');
if (skillsSection) {
    skillsSectionObserver.observe(skillsSection);
}

// Animate experience cards
const experienceCards = document.querySelectorAll('.experience-card');
const experienceObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            anime({
                targets: entry.target,
                opacity: 1,
                translateY: [30, 0],
                duration: 800,
                easing: 'easeOutQuad'
            });
            experienceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

// Contact Form
(function() {
    // Initialize EmailJS
    emailjs.init("QpXgC-E8ozO8EFpXl");
})();

function sendEmail(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Parameters for auto-reply to user
    const autoReplyParams = {
        to_email: email,           // The user's email
        from_name: "Dhruv Sehgal", // Your name
        name: name                 // Their name for the greeting
    };

    // Parameters for notification to you
    const notificationParams = {
        to_email: "dhrvshgl239@gmail.com", // YOUR email
        from_name: name,          // The user's name
        from_email: email,        // The user's email
        subject: subject,         // Their subject
        message: message          // Their message
    };

    // First send auto-reply to user
    emailjs.send('service_80qd0ol', 'template_s7kk869', autoReplyParams)
        .then(function() {
            // Then send notification to yourself
            return emailjs.send('service_80qd0ol', 'template_30c9vph', notificationParams);
        })
        .then(function() {
            console.log('SUCCESS!');
            alert('Thank you! Your message has been sent successfully.');
            showSuccessModal();
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            alert('Oops! Something went wrong. Please try again later.');
            document.querySelector('.success-content i').className = 'fas fa-exclamation-circle';
            document.querySelector('.success-content h3').textContent = 'Oops!';
            document.querySelector('.success-content p').textContent = 'Something went wrong. Please try again later.';
            showSuccessModal();
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });

    return false;
}
// Modal functions
function showSuccessModal() {
    document.getElementById('successModal').style.display = 'flex';
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Close modal when clicking outside
document.getElementById('successModal').addEventListener('click', function(e) {
    if(e.target === this) {
        closeSuccessModal();
    }
}); 