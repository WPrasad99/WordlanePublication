// Enhanced Loading Screen Animation with Left-to-Right Letter Animation
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen")
  const mainWebsite = document.getElementById("main-website")
  const letters = document.querySelectorAll(".letter")

  // Enhanced letter-by-letter animation from left to right
  let letterIndex = 0
  const animateLetters = () => {
    if (letterIndex < letters.length) {
      const letter = letters[letterIndex]

      // Calculate delay based on position in the entire text (left to right)
      const delay = letterIndex * 100 // 100ms between each letter

      setTimeout(() => {
        letter.style.animationDelay = "0s"
        letter.style.animation = "letterSlideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"

        // Add glow effect
        letter.style.textShadow = "0 0 40px rgba(0, 188, 212, 0.8), 0 0 80px rgba(0, 188, 212, 0.4)"

        setTimeout(() => {
          letter.style.textShadow = "0 0 30px rgba(0, 188, 212, 0.6)"
        }, 300)
      }, delay)

      letterIndex++
      requestAnimationFrame(animateLetters)
    } else {
      // All letters animated, start fade out after delay
      setTimeout(() => {
        loadingScreen.style.opacity = "0"
        loadingScreen.style.transform = "scale(1.05)"
        loadingScreen.style.filter = "blur(10px)"

        setTimeout(() => {
          loadingScreen.style.display = "none"
          mainWebsite.classList.add("show")
        }, 1200)
      }, 1000)
    }
  }

  // Start the animation
  setTimeout(animateLetters, 500)

  // Add modern cursor effect during loading
  const cursor = document.createElement("div")
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(0, 188, 212, 0.8) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    mix-blend-mode: screen;
    transition: transform 0.1s ease;
  `
  document.body.appendChild(cursor)

  document.addEventListener("mousemove", (e) => {
    if (loadingScreen.style.display !== "none") {
      cursor.style.left = e.clientX - 10 + "px"
      cursor.style.top = e.clientY - 10 + "px"
    }
  })

  // Remove cursor when loading is complete
  setTimeout(() => {
    cursor.remove()
  }, 6000)
})

// Enhanced Mobile Menu Functionality
function toggleMobileMenu() {
  const mobileNavOverlay = document.getElementById("mobileNavOverlay")
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")

  mobileNavOverlay.classList.toggle("active")
  mobileMenuBtn.classList.toggle("active")

  // Prevent body scroll when menu is open
  if (mobileNavOverlay.classList.contains("active")) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = ""
  }
}

function closeMobileMenu() {
  const mobileNavOverlay = document.getElementById("mobileNavOverlay")
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")

  mobileNavOverlay.classList.remove("active")
  mobileMenuBtn.classList.remove("active")
  document.body.style.overflow = ""
}

// Close mobile menu when clicking outside
document.addEventListener("click", (event) => {
  const mobileNavOverlay = document.getElementById("mobileNavOverlay")
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")

  if (
    mobileNavOverlay.classList.contains("active") &&
    !mobileNavOverlay.contains(event.target) &&
    !mobileMenuBtn.contains(event.target)
  ) {
    closeMobileMenu()
  }
})

// Close mobile menu on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu()
  }
})


// Enhanced Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      // Close mobile menu if open
      closeMobileMenu()

      // Smooth scroll to target
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 50) {
    header.style.background = "rgba(0, 7, 40, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background = "transparent"
    header.style.backdropFilter = "none"
  }
})

// Add loading animation
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".main-heading, .subheading, .cta-button, .book")

  elements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"

    setTimeout(() => {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, index * 200)
  })
})

// Add hover effects for books
document.querySelectorAll(".book").forEach((book) => {
  book.addEventListener("mouseenter", function () {
    this.style.zIndex = "10"
  })

  book.addEventListener("mouseleave", function () {
    // Reset z-index based on original stacking
    if (this.classList.contains("book-1")) {
      this.style.zIndex = "2"
    } else {
      this.style.zIndex = "1"
    }
  })
})

// Book Carousel Functionality with Updated Book Data
let currentIndex = 0
const totalBooks = 6
const booksPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3
const maxIndex = totalBooks - booksPerView

// Updated Book data with new images and content
const booksData = [
  {
    title: "TOXIC PARENTING",
    author: "NIRANJAN S",
    description:
      "A comprehensive guide exploring the complex dynamics of toxic parenting and its lasting effects. This book provides insights into recognizing harmful patterns and breaking the cycle for healthier relationships.",
    price: "₹199",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bbok%206-VzisHWZmZIk6S8bngFFfHCf5cAmPK7.png",
  },
  {
    title: "A JOURNEY THROUGH LIFE'S LESSONS",
    author: "HRITHIK S",
    description:
      "An inspiring collection of life experiences and wisdom gained through personal growth. This book offers valuable insights into navigating life's challenges and finding meaning in everyday moments.",
    price: "₹165",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/book%205-BMFuGatO0sr4OtEBszyk43SnAb7JFo.png",
  },
  {
    title: "THE SHATTERING",
    author: "STEFFI ZECHMEISTER",
    description:
      "A powerful narrative exploring themes of resilience and transformation. This compelling story takes readers through moments of breaking and rebuilding, offering hope and inspiration.",
    price: "₹210",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BOKKKKK-gB9I24YL343iCeBO3LIkML8vcClItw.png",
  },
  {
    title: "SHATTERED SONNETS",
    author: "SAMRIDDHI GARG",
    description:
      "A beautiful collection of poetry that explores love, loss, and healing. These sonnets capture the raw emotions of human experience with eloquent verse and profound insight.",
    price: "₹175",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-16%20at%2012.12.25_68afe91a-JHAw2W8Ihm6AjhTbnik84Ql5kOQpm9.png",
  },
  {
    title: "A BEAUTIFUL MOMENT",
    author: "SILVY SUSANNA",
    description:
      "A touching story that celebrates the beauty found in life's simple moments. This heartwarming tale reminds us to appreciate the present and find joy in unexpected places.",
    price: "₹155",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/book%205%20%281%29-5JMhZ96vgiMKWSEYmIbiDm6TTesisB.png",
  },
  {
    title: "LIGHT HOUSE RESEARCH ARTICLES",
    author: "DR. L.R.S. KALANTHI",
    description:
      "A comprehensive collection of research articles covering various academic topics. This scholarly work provides valuable insights and analysis for researchers and students alike.",
    price: "₹140",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%20101-n963i7I7aUg3YQDgGSZGonVVwpGKVk.png",
  },
]

function updateCarousel() {
  const track = document.getElementById("booksTrack")
  const bookWidth = window.innerWidth <= 480 ? 220 : window.innerWidth <= 768 ? 250 : 288
  const gap = window.innerWidth <= 768 ? 16 : 32
  const translateX = -(currentIndex * (bookWidth + gap))
  track.style.transform = `translateX(${translateX}px)`
}

function nextSlide() {
  const currentBooksPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3
  const currentMaxIndex = totalBooks - currentBooksPerView

  if (currentIndex < currentMaxIndex) {
    currentIndex++
    updateCarousel()
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--
    updateCarousel()
  }
}

function showHoverCard(bookId) {
  const book = booksData[bookId]
  const hoverCard = document.getElementById("hoverCard")
  const hoverBookImage = document.getElementById("hoverBookImage")
  const hoverBookTitle = document.getElementById("hoverBookTitle")
  const hoverBookAuthor = document.getElementById("hoverBookAuthor")
  const hoverBookDescription = document.getElementById("hoverBookDescription")
  const priceBtn = document.getElementById("priceBtn")

  hoverBookImage.src = book.image
  hoverBookImage.alt = book.title
  hoverBookTitle.textContent = book.title
  hoverBookAuthor.textContent = book.author
  hoverBookDescription.textContent = book.description
  priceBtn.textContent = book.price

  hoverCard.classList.add("active")
  document.body.style.overflow = "hidden"
}

function hideHoverCard() {
  const hoverCard = document.getElementById("hoverCard")
  hoverCard.classList.remove("active")
  document.body.style.overflow = ""
}

function shareBook() {
  // Implement share functionality
  if (navigator.share) {
    navigator.share({
      title: "Check out this book!",
      text: "I found this amazing book you might like.",
      url: window.location.href,
    })
  } else {
    // Fallback for browsers that don't support Web Share API
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!")
    })
  }
}

function buyNow() {
  window.open("form.html", "_blank")
  // Implement purchase functionality here
}

function buyOnAmazon() {
  alert("Redirecting to Amazon...")
  // Implement Amazon redirect functionality here
}

function searchBooks() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase()
  const bookItems = document.querySelectorAll(".book-item")

  bookItems.forEach((item, index) => {
    const book = booksData[index]
    const searchText = `${book.title} ${book.author}`.toLowerCase()

    if (searchText.includes(searchTerm)) {
      item.classList.remove("hidden")
    } else {
      item.classList.add("hidden")
    }
  })
}

// Add event listeners for book carousel
document.addEventListener("DOMContentLoaded", () => {
  const bookItems = document.querySelectorAll(".book-item")
  const hoverCard = document.getElementById("hoverCard")

  bookItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        // Only show on desktop
        showHoverCard(index)
      }
    })

    item.addEventListener("click", () => {
      showHoverCard(index)
    })
  })

  // Close hover card when clicking outside
  hoverCard.addEventListener("click", (e) => {
    if (e.target === hoverCard) {
      hideHoverCard()
    }
  })

  // Close hover card when pressing Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideHoverCard()
    }
  })

  // Price button functionality
  document.getElementById("priceBtn").addEventListener("click", () => {
    // Implement purchase functionality here
  })

  // Update carousel on window resize
  window.addEventListener("resize", () => {
    updateCarousel()
  })
})

// Enhanced About Section Functionality with Active Read More
document.addEventListener("DOMContentLoaded", () => {
  // Enhanced More button functionality with expand/collapse
  const moreButton = document.getElementById("moreBtn")
  const expandedContent = document.getElementById("expandedContent")
  const buttonText = moreButton.querySelector(".button-text")
  let isExpanded = false

  if (moreButton) {
    moreButton.addEventListener("click", function () {
      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)

      // Toggle expanded content
      if (!isExpanded) {
        expandedContent.classList.add("show")
        buttonText.textContent = "READ LESS"
        this.classList.add("expanded")
        isExpanded = true

        // Smooth scroll to show expanded content
        setTimeout(() => {
          expandedContent.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          })
        }, 300)
      } else {
        expandedContent.classList.remove("show")
        buttonText.textContent = "READ MORE"
        this.classList.remove("expanded")
        isExpanded = false
      }
    })

    // Add hover sound effect (optional)
    moreButton.addEventListener("mouseenter", function () {
      // Add subtle hover feedback
      this.style.transition = "all 0.3s ease"
    })
  }

  // Character card hover effect
  const characterCard = document.querySelector(".character-card")

  if (characterCard) {
    characterCard.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    characterCard.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  }

  // Add loading animation for about section
  const aboutElements = document.querySelectorAll(".about-main-title, .about-section-content, .character-card")
  aboutElements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"

    setTimeout(
      () => {
        element.style.transition = "all 0.6s ease"
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      },
      index * 200 + 500,
    ) // Delay to load after hero section
  })
})

// Process Section Functionality
document.addEventListener("DOMContentLoaded", () => {
  const processCards = document.querySelectorAll(".process-card")
  const infoTooltip = document.getElementById("infoTooltip")

  const stepInfo = {
    manuscript: {
      title: "Manuscript Review",
      description:
        "Our expert team thoroughly reviews your manuscript for content quality, structure, and readability to ensure it meets publishing standards.",
    },
    editing: {
      title: "Professional Editing",
      description:
        "Comprehensive editing including grammar, syntax, style, and content refinement to polish your manuscript to perfection.",
    },
    design: {
      title: "Creative Design",
      description:
        "Professional book cover design and interior formatting to create an attractive and marketable final product.",
    },
    publication: {
      title: "Publication Process",
      description:
        "We handle all aspects of publishing including ISBN registration, copyright, and distribution setup across multiple platforms.",
    },
    marketing: {
      title: "Digital Marketing",
      description:
        "Strategic online marketing campaigns including social media promotion, book trailers, and targeted advertising to maximize your book's reach.",
    },
  }

  let currentTooltip = null
  let hideTimeout = null

  function showTooltip(card, step) {
    if (hideTimeout) {
      clearTimeout(hideTimeout)
      hideTimeout = null
    }

    const info = stepInfo[step]
    if (!info) return

    // Update tooltip content
    const titleElement = infoTooltip.querySelector(".info-title")
    const descriptionElement = infoTooltip.querySelector(".info-description")

    titleElement.textContent = info.title
    descriptionElement.textContent = info.description

    // Position tooltip
    positionTooltip(card)

    // Show tooltip
    infoTooltip.classList.add("show")
    currentTooltip = step
  }

  function hideTooltip() {
    hideTimeout = setTimeout(() => {
      infoTooltip.classList.remove("show")
      currentTooltip = null
    }, 150)
  }

  function positionTooltip(card) {
    const cardRect = card.getBoundingClientRect()
    const tooltipRect = infoTooltip.getBoundingClientRect()
    const arrow = infoTooltip.querySelector(".info-arrow")

    // Remove existing arrow classes
    arrow.className = "info-arrow"

    let top, left

    // Try to position above the card first
    if (cardRect.top - tooltipRect.height - 20 > 0) {
      top = cardRect.top - tooltipRect.height - 15
      left = cardRect.left + cardRect.width / 2 - tooltipRect.width / 2
      arrow.classList.add("top")
    }
    // If not enough space above, position below
    else if (cardRect.bottom + tooltipRect.height + 20 < window.innerHeight) {
      top = cardRect.bottom + 15
      left = cardRect.left + cardRect.width / 2 - tooltipRect.width / 2
      arrow.classList.add("bottom")
    }
    // Position to the right
    else if (cardRect.right + tooltipRect.width + 20 < window.innerWidth) {
      top = cardRect.top + cardRect.height / 2 - tooltipRect.height / 2
      left = cardRect.right + 15
      arrow.classList.add("left")
    }
    // Position to the left
    else {
      top = cardRect.top + cardRect.height / 2 - tooltipRect.height / 2
      left = cardRect.left - tooltipRect.width - 15
      arrow.classList.add("right")
    }

    // Ensure tooltip stays within viewport
    left = Math.max(10, Math.min(left, window.innerWidth - tooltipRect.width - 10))
    top = Math.max(10, Math.min(top, window.innerHeight - tooltipRect.height - 10))

    infoTooltip.style.left = `${left}px`
    infoTooltip.style.top = `${top}px`
  }

  processCards.forEach((card) => {
    const step = card.getAttribute("data-step")

    card.addEventListener("mouseenter", () => {
      showTooltip(card, step)
    })

    card.addEventListener("mouseleave", () => {
      hideTooltip()
    })

    // Handle click for mobile
    card.addEventListener("click", (e) => {
      e.preventDefault()
      if (currentTooltip === step) {
        hideTooltip()
      } else {
        showTooltip(card, step)
      }
    })
  })

  // Tooltip hover handling
  infoTooltip.addEventListener("mouseenter", () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout)
      hideTimeout = null
    }
  })

  infoTooltip.addEventListener("mouseleave", () => {
    hideTooltip()
  })

  // Hide tooltip when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".process-card") && !e.target.closest(".info-tooltip")) {
      hideTooltip()
    }
  })

  // Handle window resize
  window.addEventListener("resize", () => {
    if (currentTooltip) {
      const activeCard = document.querySelector(`[data-step="${currentTooltip}"]`)
      if (activeCard) {
        positionTooltip(activeCard)
      }
    }
  })

  // Add entrance animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 100)
        }
      })
    },
    { threshold: 0.1 },
  )

  processCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })
})

// Footer functionality and interactions

// Contact with Publishing Expert
function contactExpert() {
  const btn = event.target

  // Add loading state
  btn.classList.add("loading")
  btn.innerHTML = "CONNECTING..."

  // Simulate API call or redirect
  setTimeout(() => {
    // You can replace this with actual functionality
    // For example: window.location.href = '/contact';
    // Or: window.open('tel:+1234567890');

    alert("Connecting you with our publishing expert...")

    // Reset button
    btn.classList.remove("loading")
    btn.innerHTML = "CONTACT WITH OUR<br>PUBLISHING EXPERT"
  }, 2000)
}

// Publish Book Yourself
function publishYourself() {
  const btn = event.target

  // Add loading state
  btn.classList.add("loading")
  btn.innerHTML = "REDIRECTING..."

  // Simulate redirect
  setTimeout(() => {
    // You can replace this with actual functionality
    // For example: window.location.href = '/self-publish';

    alert("Redirecting to self-publishing portal...")

    // Reset button
    btn.classList.remove("loading")
    btn.innerHTML = "PUBLISH BOOK YOURSELF"
  }, 1500)
}

// Navigation functions
function navigateTo(section) {
  const element = document.getElementById(section)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Social media functions
function openSocial(platform) {
  const urls = {
    instagram: "https://instagram.com/wordlanepublication",
    facebook: "https://facebook.com/wordlanepublication",
    twitter: "https://twitter.com/wordlanepub",
    linkedin: "https://linkedin.com/company/wordlanepublication",
    youtube: "https://youtube.com/@wordlanepublication",
  }

  const url = urls[platform]
  if (url) {
    window.open(url, "_blank")
  }
}

// Add scroll animations for footer
document.addEventListener("DOMContentLoaded", () => {
  const footerElements = document.querySelectorAll(
    ".cta-title, .cta-subtitle, .btn-primary, .btn-secondary, .footer-column",
  )

  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 100)
        }
      })
    },
    { threshold: 0.1 },
  )

  footerElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    footerObserver.observe(element)
  })
})

// Add smooth hover effects for social icons
document.querySelectorAll(".social-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.1)"
  })

  icon.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Add click ripple effect for buttons
document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple animation keyframes
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Add performance optimization for animations
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

if (prefersReducedMotion.matches) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.setProperty("--animation-duration", "0s")
}

// Add intersection observer for performance
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
}

const performanceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// Observe elements that need animation
document.querySelectorAll(".book, .process-card, .footer-column").forEach((el) => {
  performanceObserver.observe(el)
})
