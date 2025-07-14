document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initScrollAnimations();
  initFilterSystem();
  initCardAnimations();
  initBookingSystem();
  
  // Add parallax effect to floating shapes
  initParallaxEffect();
});

// Scroll-triggered animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Add stagger effect for cards
        if (entry.target.classList.contains('events-grid')) {
          const cards = entry.target.querySelectorAll('.event-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animationDelay = `${index * 0.1}s`;
              card.classList.add('revealed');
            }, index * 100);
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.category-section, .events-grid, .event-card').forEach(el => {
    observer.observe(el);
  });
}

// Filter system with animations
function initFilterSystem() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const categoryData = {
    'all': ['technology', 'business', 'arts', 'sports'],
    'technology': ['technology'],
    'business': ['business'],
    'arts': ['arts'],
    'sports': ['sports'],
    'music': ['music'],
    'education': ['education']
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Add button click effect
      createRippleEffect(this);
      
      // Filter categories with animation
      filterCategories(category, categoryData);
    });
  });
}

function filterCategories(selectedCategory, categoryData) {
  const sections = document.querySelectorAll('.category-section');
  const categoriesToShow = categoryData[selectedCategory] || [selectedCategory];
  
  sections.forEach(section => {
    const sectionCategory = section.getAttribute('data-category');
    
    if (selectedCategory === 'all' || categoriesToShow.includes(sectionCategory)) {
      section.style.display = 'block';
      section.classList.remove('hide');
      section.classList.add('show');
    } else {
      section.classList.remove('show');
      section.classList.add('hide');
      setTimeout(() => {
        section.style.display = 'none';
      }, 500);
    }
  });
}

// Card hover animations
function initCardAnimations() {
  const cards = document.querySelectorAll('.event-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Add floating effect
      this.style.transform = 'translateY(-15px) scale(1.02)';
      
      // Create particle effect
      createParticleEffect(this);
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

// Particle effect for card hover
function createParticleEffect(element) {
  const rect = element.getBoundingClientRect();
  const particleCount = 5;
  
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
        transform: `translate(${(Math.random() - 0.5) * 80}px, ${-40}px) scale(0)`, 
        opacity: 0 
      }
    ], {
      duration: 800,
      easing: 'ease-out'
    });
    
    animation.onfinish = () => {
      particle.remove();
    };
  }
}

// Ripple effect for buttons
function createRippleEffect(button) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = '50%';
  ripple.style.top = '50%';
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(255, 255, 255, 0.6)';
  ripple.style.transform = 'translate(-50%, -50%) scale(0)';
  ripple.style.pointerEvents = 'none';
  
  button.style.position = 'relative';
  button.appendChild(ripple);
  
  ripple.animate([
    { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
    { transform: 'translate(-50%, -50%) scale(2)', opacity: 0 }
  ], {
    duration: 600,
    easing: 'ease-out'
  }).onfinish = () => {
    ripple.remove();
  };
}

// Booking system
function initBookingSystem() {
  const modal = document.getElementById('bookingModal');
  const form = document.getElementById('bookingForm');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.modal-book-btn');
    const originalText = submitBtn.textContent;
    
    // Animate button
    submitBtn.style.transform = 'scale(0.95)';
    submitBtn.innerHTML = '<span>Processing...</span>';
    submitBtn.disabled = true;
    
    // Simulate booking process
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Booking Confirmed!</span>';
      submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
      
      // Show success message
      showSuccessMessage();
      
      setTimeout(() => {
        closeModal();
        form.reset();
        submitBtn.innerHTML = '<span>Complete Booking</span>';
        submitBtn.style.background = '';
        submitBtn.style.transform = '';
        submitBtn.disabled = false;
      }, 2000);
    }, 1500);
  });
}

// Book event function
function bookEvent(eventTitle, price) {
  const modal = document.getElementById('bookingModal');
  const modalTitle = document.getElementById('modalEventTitle');
  const modalPrice = document.getElementById('modalEventPrice');
  
  modalTitle.textContent = eventTitle;
  modalPrice.textContent = price;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Add entrance animation
  modal.classList.add('show');
}

// Close modal function
function closeModal() {
  const modal = document.getElementById('bookingModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Success message
function showSuccessMessage() {
  const message = document.createElement('div');
  message.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(45deg, #28a745, #20c997);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
      z-index: 3000;
      animation: slideInRight 0.5s ease-out;
    ">
      ✅ Event booked successfully! Check your mail for Details
    </div>
  `;
  
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.remove();
  }, 3000);
}

// Parallax effect for floating shapes
function initParallaxEffect() {
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
      const speed = 0.3 + (index * 0.1);
      const yPos = -(scrolled * speed);
      shape.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${scrolled * 0.1}deg)`;
    });
  });
}

// Add typing effect to category titles
document.addEventListener('DOMContentLoaded', function() {
  const titles = document.querySelectorAll('.title-text');
  
  titles.forEach((title, index) => {
    const text = title.textContent;
    title.textContent = '';
    
    setTimeout(() => {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          title.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);
    }, 1000 + (index * 500));
  });
});

// Add magnetic effect to buttons
document.querySelectorAll('.book-btn, .filter-btn').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  const modal = document.getElementById('bookingModal');
  if (e.target === modal) {
    closeModal();
  }
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);