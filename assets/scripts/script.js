//Hide loader when page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const hideLoader = () => {
    loader.style.opacity = "100";
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  };

  // Hide loader after 2 seconds or when page fully loads (whichever comes first)
  const loaderTimeout = setTimeout(hideLoader, 2000);
  window.addEventListener("load", () => {
    clearTimeout(loaderTimeout);
    hideLoader();
  });

  //animate skills when section is in view
  const skillBars = document.querySelectorAll(".skill-progress");
  let skillsAnimated = false;

  const animateSkills = () => {
    if (skillsAnimated) return;

    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;

    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 2;

    if (sectionPosition < screenPosition) {
      skillBars.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        bar.style.width = "0";
        bar.style.transition = "width 1.5s ease-in-out";
        bar.style.width = width;
      });

      skillsAnimated = true;
    }
  };

  // Trigger on scroll and initial load
  window.addEventListener("scroll", animateSkills);
  window.addEventListener("load", animateSkills);

  // Also trigger immediately in case section is already visible
  setTimeout(animateSkills, 100);

  // Project Slider
  const slideContainer = document.getElementById("slideContainer");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;
  const totalSlides = document.querySelectorAll(".slide").length;
  let autoSlideInterval;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentIndex = index;
    slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    updateActiveNavItem();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Event listeners for navigation
  prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    goToSlide(currentIndex - 1);
    startAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    goToSlide(currentIndex + 1);
    startAutoSlide();
  });

  // Event listeners for dots
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      const index = parseInt(dot.getAttribute("data-index"));
      goToSlide(index);
      startAutoSlide();
    });
  });

  // Pause on hover
  slideContainer.addEventListener("mouseenter", stopAutoSlide);
  slideContainer.addEventListener("mouseleave", startAutoSlide);

  // Initialize slider
  startAutoSlide();

  // Modal Functionality
  const modals = document.querySelectorAll(".modal");
  const modalCloseButtons = document.querySelectorAll(".modal-close");
  const projectCards = document.querySelectorAll("[data-modal]");

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const modalId = card.getAttribute("data-modal") + "Modal";
      document.getElementById(modalId).classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modals.forEach((modal) => modal.classList.remove("show"));
      document.body.style.overflow = "auto";
    });
  });

  // Close modal when clicking outside content
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
      }
    });
  });


  // Back to Top Button
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });


  // Update active nav item on scroll
  const navItems = document.querySelectorAll(".mobile-nav-item");

  function updateActiveNavItem() {
    const sections = document.querySelectorAll("section");
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSection}`) {
        item.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavItem);

  // Typing effect for hero text
  const typingText = document.getElementById("typingText");
  const phrases = [
    "Crafting elegant and functional web solutions.",
    "Building responsive and user-friendly interfaces.",
    "Transforming ideas into digital realities.",
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    const speed = isDeleting ? 30 : 100;

    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, speed);
    }
  }

  setTimeout(type, 1000);
});
