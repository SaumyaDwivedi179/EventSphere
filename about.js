document.addEventListener('DOMContentLoaded', function() {
  // Initialize all animations
  initLetterAnimations();
  initWordAnimations();
  initScrollAnimations();
  initFormAnimations();
  initTypingAnimation();
  initCounterAnimation();
  initFloatingCards();
  
  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Smooth scrolling for navigation links
  initSmoothScrolling();
});

// Letter by letter animation for title
function initLetterAnimations() {
  const letters = document.querySelectorAll('.letter');
  letters.forEach((letter, index) => {
    letter.style.setProperty('--i', index);
    letter.style.animationDelay = `${index * 0.1}s`;
  });
}

// Word by word animation
function initWordAnimations() {
  const words = document.querySelectorAll('.word');
  words.forEach((word, index) => {
    word.style.setProperty('--i', index);
    word.style.animationDelay = `${index * 0.2}s`;
  });
}

// Scroll-triggered animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Trigger specific animations based on element
        if (entry.target.classList.contains('stat-number')) {
          animateCounter(entry.target);
        }
        
        if (entry.target.classList.contains('info-card')) {
          const cards = document.querySelectorAll('.info-card');
          const index = Array.from(cards).indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 0.2}s`;
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.stat-item, .info-card, .developer-card').forEach(el => {
    observer.observe(el);
  });
}

// Floating cards animation
function initFloatingCards() {
  const cards = document.querySelectorAll('.floating-card');
  cards.forEach((card, index) => {
    card.style.setProperty('--i', index);
    card.style.animationDelay = `${index * 0.5}s`;
  });
}

// Counter animation for stats
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Typing animation for developer name
function initTypingAnimation() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;
  
  const text = typingElement.getAttribute('data-text');
  const speed = 100; // milliseconds per character
  
  typingElement.textContent = '';
  
  setTimeout(() => {
    let i = 0;
    const typeTimer = setInterval(() => {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeTimer);
      }
    }, speed);
  }, 1000); // Start after 1 second
}

// Form animations and interactions
function initFormAnimations() {
  const formInputs = document.querySelectorAll('.form-input');
  
  formInputs.forEach(input => {
    // Add focus animations
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
    
    // Add typing effect
    input.addEventListener('input', function() {
      if (this.value) {
        this.parentElement.classList.add('has-content');
      } else {
        this.parentElement.classList.remove('has-content');
      }
    });
  });
}

// Form submission with animation
function handleFormSubmit(e) {
  e.preventDefault();
  
  const submitBtn = e.target.querySelector('.submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const originalText = btnText.textContent;
  
  // Animate button
  submitBtn.style.transform = 'scale(0.95)';
  btnText.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission
  setTimeout(() => {
    btnText.textContent = 'Message Sent!';
    submitBtn.style.background = '#28a745';
    submitBtn.style.borderColor = '#28a745';
    submitBtn.style.color = 'white';
    
    // Reset form
    setTimeout(() => {
      e.target.reset();
      btnText.textContent = originalText;
      submitBtn.style.transform = 'scale(1)';
      submitBtn.style.background = '';
      submitBtn.style.borderColor = '';
      submitBtn.style.color = '';
      submitBtn.disabled = false;
      
      // Remove form classes
      document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('focused', 'has-content');
      });
    }, 2000);
  }, 1500);
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add mouse interaction effects
document.addEventListener('mousemove', function(e) {
  const cards = document.querySelectorAll('.about-card, .info-card');
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    } else {
      card.style.transform = '';
    }
  });
});

// Add parallax effect for floating elements
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll('.floating-shape');
  
  shapes.forEach((shape, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
  });
});

// Add particle effect on button hover
document.querySelectorAll('.submit-btn, .social-link').forEach(button => {
  button.addEventListener('mouseenter', function() {
    createParticles(this);
  });
});

function createParticles(element) {
  const rect = element.getBoundingClientRect();
  const particleCount = 6;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#D29F80';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * rect.height;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    // Animate particle
    const animation = particle.animate([
      { 
        transform: 'translate(0, 0) scale(1)', 
        opacity: 1 
      },
      { 
        transform: `translate(${(Math.random() - 0.5) * 100}px, ${-50}px) scale(0)`, 
        opacity: 0 
      }
    ], {
      duration: 1000,
      easing: 'ease-out'
    });
    
    animation.onfinish = () => {
      particle.remove();
    };
  }
}

// Add wave effect on scroll
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY;
  
  // Add wave effect to floating shapes
  document.querySelectorAll('.floating-shape').forEach((shape, index) => {
    const intensity = delta * 0.1;
    shape.style.transform += ` rotate(${intensity}deg)`;
  });
  
  lastScrollY = currentScrollY;
}, { passive: true });
