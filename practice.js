document.addEventListener('DOMContentLoaded', function() {
  // Hero Animation
  initHeroAnimation();

  // Scroll Reveal Animation
  initScrollReveal();

  // Carousel
  initCarousel();

  // Testimonials Carousel
  initTestimonialsCarousel();

  // Contact Form
  initContactForm();

  // Mobile Menu
  initMobileMenu();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

function initHeroAnimation() {
  const lines = document.querySelectorAll('.hero-animated-title .hero-line');
  const p = document.querySelector('.hero-animated-p');
  const btn = document.querySelector('.hero-animated-btn');
  let totalDelay = 0;
  // You can implement your hero animation logic here
}

function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });

  // Category cards staggered animation
  const categoryCards = document.querySelectorAll('.category-card');
  const categoryObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 100);
        categoryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  categoryCards.forEach(card => {
    categoryObserver.observe(card);
  });
}


function initCarousel() {
  const events = [
  {
    title: "Tech & Gaming",
    desc: "Step into the world of innovation and technology. \nMeet industry leaders and passionate gamers. \nExperience the latest in gaming, gadgets, and software. \nNetwork, compete, and get inspired at every turn.",
    overlay: "Explore groundbreaking tech demos and hands-on workshops. \nConnect with fellow enthusiasts and discover new trends. \nAttend inspiring keynotes from top innovators. \nUnleash your potential in the ultimate tech and gaming arena.",
    img: "https://plus.unsplash.com/premium_photo-1661964187664-e26f70e1a224?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D"
  },
  {
    title: "Corporate & Professional",
    desc: "Elevate your career with exclusive networking opportunities. \nEngage in insightful seminars and workshops. \nLearn from industry experts and thought leaders. \nExpand your professional horizons and skills.",
    overlay: "Participate in panel discussions and interactive sessions. \nBuild connections with professionals from diverse fields. \nGain practical knowledge to advance your career. \nUnlock new opportunities in the corporate world.",
    img: "https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.webp?a=1&b=1&s=612x612&w=0&k=20&c=GANexorEVO7mDrp8JUHZKwoFbER0hfgrhu9pMkGfAq8="
  },
  {
    title: "Music Fest",
    desc: "Immerse yourself in a vibrant musical atmosphere. \nEnjoy live performances from top bands and artists. \nSavor delicious food from local vendors and food trucks. \nCreate unforgettable memories with friends and music lovers.",
    overlay: "Dance to the rhythm of diverse genres and talents. \nExperience the thrill of live concerts under the stars. \nMeet fellow fans and discover new favorite artists. \nCelebrate music, food, and community all in one place.",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVudGVydGFpbm1lbnR8ZW58MHx8MHx8fDA%3D"
  },
  {
    title: "Educational Events",
    desc: "Expand your knowledge with expert-led sessions. \nParticipate in interactive workshops and competitions. \nConnect with mentors and like-minded learners. \nUnlock new skills and boost your academic journey.",
    overlay: "Join seminars on trending topics and future careers. \nEngage in hands-on activities and group projects. \nGet inspired by success stories and real-world insights. \nEmpower yourself for lifelong learning and growth.",
    img: "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVkdWNhdGlvbmFsfGVufDB8fDB8fHww"
  },
  {
    title: "Art & Culture",
    desc: "Dive into a world of creativity and inspiration. \nExplore stunning art installations and cultural exhibits. \nMeet talented artists and creators from around the globe. \nCelebrate diversity through performances and workshops.",
    overlay: "Participate in hands-on art sessions and cultural talks. \nExperience live performances and traditional showcases. \nDiscover new perspectives through visual storytelling. \nBe part of a vibrant, creative community.",
    img: "https://media.istockphoto.com/id/180254996/photo/asian-lanterns-in-lantern-festival.jpg?s=1024x1024&w=is&k=20&c=sQlWVAboY6utNLLoic4fOv_qn5Qy4p2gFAfBqJC7JYo="
  },
  {
    title: "Sports & Fitness",
    desc: "Challenge yourself with exciting competitions and activities. \nJoin fitness workshops led by expert trainers. \nMeet fellow sports enthusiasts and form new teams. \nCelebrate health, wellness, and active living.",
    overlay: "Participate in tournaments and fitness challenges. \nLearn new techniques from professional athletes. \nEnjoy a supportive and energetic environment. \nPush your limits and achieve your fitness goals.",
    img: "https://images.unsplash.com/photo-1623947804329-814d02fe6015?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8"
  }
];
  

  const track = document.getElementById('carousel-track');
  if (!track) return;

  
  track.innerHTML = '';

  events.forEach(event => {
 
  const sectionLinks = {
    "Tech & Gaming": "browse.html#technology",
    "Corporate & Professional": "browse.html#business",
    "Music Fest": "browse.html#music",
    "Educational Events": "browse.html#education",
    "Art & Culture": "browse.html#arts",
    "Sports & Fitness": "browse.html#sports"
  };

  const eventLink = sectionLinks[event.title] || "browse.html";

  const slideHTML = `
    <div class="carousel-slide">
      <div class="carousel-text">
        <h2>${event.title}</h2>
        <hr>
        <p>${event.desc}</p>
        <a href="${eventLink}" class="location-link">BOOK EVENT NOW →</a>
      </div>
      <div class="carousel-right">
        <div class="carousel-image-wrapper">
          <img src="${event.img}" alt="${event.title}" />
        </div>
        <div class="carousel-overlay-card">
          <h3>${event.title}</h3>
          <hr>
          <p>
            ${event.overlay}
          </p>
        </div>
      </div>
    </div>
  `;
  track.insertAdjacentHTML('beforeend', slideHTML);
});
  let currentSlide = 0;
  const slides = track.querySelectorAll('.carousel-slide');

  function updateSlidePosition() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

   
    slides.forEach(slide => {
      const overlay = slide.querySelector('.carousel-overlay-card');
      if (overlay) overlay.classList.remove('overlay-appear');
    });

   
    const activeOverlay = slides[currentSlide].querySelector('.carousel-overlay-card');
    if (activeOverlay) {
      
      void activeOverlay.offsetWidth;
      activeOverlay.classList.add('overlay-appear');
    }
  }

  const nextBtn = document.getElementById('carousel-next');
  const prevBtn = document.getElementById('carousel-prev');

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', function() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlidePosition();
    });

    prevBtn.addEventListener('click', function() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlidePosition();
    });
  }

  window.addEventListener('resize', updateSlidePosition);

 
  updateSlidePosition();
}

function initTestimonialsCarousel() {
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const slides = document.querySelectorAll('.testimonial-slide');

  if (!track || !prevBtn || !nextBtn || slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;

  function updateSlidePosition() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  
  setInterval(nextSlide, 5000);

 
  window.addEventListener('resize', updateSlidePosition);
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      alert(`Thank you ${name}! Your message has been sent. We'll get back to you soon.`);
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

function initMobileMenu() {
  const mobileMenuIcon = document.getElementById('mobile-menu');
  const navLeft = document.querySelector('.nav-left');
  const navRight = document.querySelector('.nav-right');

  if (!mobileMenuIcon) return;

  mobileMenuIcon.addEventListener('click', function() {
   
    console.log('Mobile menu clicked');
  });
}


document.querySelector('.login-btn').onclick = function(e) {
  e.preventDefault();
  document.querySelector('.login-popup').classList.add('active');
  document.querySelector('.blur-bg-overlay').style.display = 'block';
  document.body.style.overflow = 'hidden';
};

document.querySelector('.close-btn').onclick = function() {
  document.querySelector('.login-popup').classList.remove('active');
  document.querySelector('.blur-bg-overlay').style.display = 'none';
  document.body.style.overflow = '';
  document.querySelector('.signup-form').style.display = 'none';
  document.querySelector('.login-form').style.display = 'block';
};

document.getElementById('show-signup').onclick = function(e) {
  e.preventDefault();
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('.signup-form').style.display = 'block';
};

document.getElementById('show-login').onclick = function(e) {
  e.preventDefault();
  document.querySelector('.signup-form').style.display = 'none';
  document.querySelector('.login-form').style.display = 'block';
};

document.querySelector('.blur-bg-overlay').onclick = function() {
  document.querySelector('.login-popup').classList.remove('active');
  document.querySelector('.blur-bg-overlay').style.display = 'none';
  document.body.style.overflow = '';
  document.querySelector('.signup-form').style.display = 'none';
  document.querySelector('.login-form').style.display = 'block';
};