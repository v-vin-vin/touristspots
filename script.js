// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all photo cards
    const photoCards = document.querySelectorAll('.photo-card');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentIndex = 0;
    const photos = Array.from(photoCards);
    
    // Open lightbox when photo is clicked
    photoCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            updateLightbox();
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    });
    
    // Previous image
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        updateLightbox();
    });
    
    // Next image
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % photos.length;
        updateLightbox();
    });
    
    // Update lightbox content
    function updateLightbox() {
        const imgSrc = photos[currentIndex].querySelector('img').src;
        const caption = photos[currentIndex].querySelector('.photo-info h3').textContent + 
                       ' - ' + 
                       photos[currentIndex].querySelector('.photo-info p').textContent;
        
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption;
    }
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Filter gallery images
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter images
            photoCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Slideshow functionality
    let slideIndex = 1;
    showSlides(slideIndex);
    
    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    
    // Thumbnail image controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    
    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active-dot", "");
        }
        
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active-dot";
    }
    
    // Auto-advance slideshow
    let slideInterval = setInterval(() => {
        plusSlides(1);
    }, 5000);
    
    // Pause slideshow on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slideshowContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            plusSlides(1);
        }, 5000);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle (for smaller screens)
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header .container').appendChild(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', () => {
        document.querySelector('nav').classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('nav').classList.remove('active');
        });
    });
});