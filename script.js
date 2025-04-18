// DOM Elements
const themeToggle = document.querySelector(".theme-toggle")
const body = document.body
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links")
const scrollTopBtn = document.querySelector(".scroll-top")
const filterBtns = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")
const contactForm = document.getElementById("contactForm")
const navLinksItems = document.querySelectorAll(".nav-link")
const header = document.querySelector("header")
const cursor = document.querySelector(".cursor")
const cursorFollower = document.querySelector(".cursor-follower")

// Custom cursor
if (window.innerWidth > 991) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  document.addEventListener("mousedown", () => {
    cursor.style.width = "0.8rem"
    cursor.style.height = "0.8rem"
    cursorFollower.style.width = "2rem"
    cursor.style.height = "2rem"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.width = "1rem"
    cursor.style.height = "1rem"
    cursorFollower.style.width = "3rem"
    cursorFollower.style.height = "3rem"
  })

  document.querySelectorAll("a, button, .btn, .filter-btn, .theme-toggle, .hamburger").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursor.style.width = "0"
      cursor.style.height = "0"
      cursorFollower.style.width = "5rem"
      cursorFollower.style.height = "5rem"
      cursorFollower.style.borderWidth = "3px"
      cursorFollower.style.opacity = "0.5"
    })

    item.addEventListener("mouseleave", () => {
      cursor.style.width = "1rem"
      cursor.style.height = "1rem"
      cursorFollower.style.width = "3rem"
      cursorFollower.style.height = "3rem"
      cursorFollower.style.borderWidth = "2px"
      cursorFollower.style.opacity = "0.3"
    })
  })
}

// Theme Toggle
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme")

  // Update icon
  const icon = themeToggle.querySelector("i")
  if (body.classList.contains("dark-theme")) {
    icon.classList.remove("fa-moon")
    icon.classList.add("fa-sun")
    localStorage.setItem("theme", "dark")
  } else {
    icon.classList.remove("fa-sun")
    icon.classList.add("fa-moon")
    localStorage.setItem("theme", "light")
  }
})

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  body.classList.add("dark-theme")
  const icon = themeToggle.querySelector("i")
  icon.classList.remove("fa-moon")
  icon.classList.add("fa-sun")
}

// Mobile Navigation
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navLinks.classList.toggle("active")

  // Animate hamburger
  const lines = hamburger.querySelectorAll(".line")
  if (hamburger.classList.contains("active")) {
    lines[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    lines[1].style.opacity = "0"
    lines[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
  } else {
    lines[0].style.transform = "none"
    lines[1].style.opacity = "1"
    lines[2].style.transform = "none"
  }
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navLinks.classList.remove("active")

    // Reset hamburger
    const lines = hamburger.querySelectorAll(".line")
    lines[0].style.transform = "none"
    lines[1].style.opacity = "1"
    lines[2].style.transform = "none"
  })
})

// Active nav link on scroll
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinksItems.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active")
    }
  })

  // Header shadow on scroll
  if (window.pageYOffset > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  // Scroll to top button
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("active")
  } else {
    scrollTopBtn.classList.remove("active")
  }
})

// Scroll to top
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Project Filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((btn) => btn.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    const filter = btn.getAttribute("data-filter")

    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block"
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "scale(1)"
        }, 100)
      } else {
        card.style.opacity = "0"
        card.style.transform = "scale(0.8)"
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    })
  })
})

// Form Submission
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Here you would typically send the form data to a server
    // For this example, we'll just log it and show a success message
    console.log("Form submitted:", { name, email, subject, message })

    // Show success message
    const formGroups = document.querySelectorAll(".form-group")
    formGroups.forEach((group) => (group.style.display = "none"))

    const submitBtn = contactForm.querySelector('button[type="submit"]')
    submitBtn.style.display = "none"

    const successMessage = document.createElement("div")
    successMessage.classList.add("success-message")
    successMessage.innerHTML = `
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3>Message Sent Successfully!</h3>
      <p>Thank you for reaching out, ${name}. I'll get back to you soon.</p>
    `

    successMessage.style.textAlign = "center"
    successMessage.style.padding = "3rem"

    contactForm.appendChild(successMessage)

    // Reset form after 5 seconds
    setTimeout(() => {
      formGroups.forEach((group) => (group.style.display = "block"))
      submitBtn.style.display = "block"
      successMessage.remove()
      contactForm.reset()
    }, 5000)
  })
}

// Typing effect for hero section
const typingElement = document.querySelector(".hero-content h2")
if (typingElement) {
  const text = typingElement.textContent
  typingElement.textContent = ""

  let i = 0
  function typeWriter() {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }

  // Start typing effect after a delay
  setTimeout(typeWriter, 1000)
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe elements with animation classes
document
  .querySelectorAll(".skill-item, .project-card, .cp-card, .about-image, .contact-form, .contact-info")
  .forEach((el) => {
    observer.observe(el)
  })

// Add animation class for observed elements
document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
      .skill-item, .project-card, .cp-card, .about-image, .contact-form, .contact-info {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .skill-item.animate, .project-card.animate, .cp-card.animate, .about-image.animate, .contact-form.animate, .contact-info.animate {
        opacity: 1;
        transform: translateY(0);
      }
      
      .project-card:nth-child(1) { transition-delay: 0.1s; }
      .project-card:nth-child(2) { transition-delay: 0.2s; }
      .project-card:nth-child(3) { transition-delay: 0.3s; }
      .project-card:nth-child(4) { transition-delay: 0.4s; }
      
      .cp-card:nth-child(1) { transition-delay: 0.1s; }
      .cp-card:nth-child(2) { transition-delay: 0.2s; }
      .cp-card:nth-child(3) { transition-delay: 0.3s; }
      .cp-card:nth-child(4) { transition-delay: 0.4s; }
      
      .skill-item:nth-child(1) { transition-delay: 0.05s; }
      .skill-item:nth-child(2) { transition-delay: 0.1s; }
      .skill-item:nth-child(3) { transition-delay: 0.15s; }
      .skill-item:nth-child(4) { transition-delay: 0.2s; }
    </style>
  `,
)
