// Contact Form Handler with Formspree Integration
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm")
  const submitBtn = document.getElementById("submitBtn")
  const successModal = document.getElementById("successModal")
  const fileInput = document.getElementById("document")
  const fileSelected = document.getElementById("fileSelected")

  // File upload handling
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (file) {
      const fileSize = (file.size / 1024 / 1024).toFixed(2)
      const fileName = file.name

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        showError("documentError", "File size must be less than 10MB")
        fileInput.value = ""
        fileSelected.classList.remove("show")
        return
      }

      // Check file type
      const allowedTypes = [".pdf", ".doc", ".docx", ".txt"]
      const fileExtension = "." + fileName.split(".").pop().toLowerCase()

      if (!allowedTypes.includes(fileExtension)) {
        showError("documentError", "Please upload a PDF, DOC, DOCX, or TXT file")
        fileInput.value = ""
        fileSelected.classList.remove("show")
        return
      }

      fileSelected.innerHTML = `
                <i class="fas fa-file-alt"></i>
                <strong>${fileName}</strong> (${fileSize} MB)
            `
      fileSelected.classList.add("show")
      clearError("documentError")
    } else {
      fileSelected.classList.remove("show")
    }
  })

  // Real-time validation
  const inputs = form.querySelectorAll("input, select, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })

    input.addEventListener("input", function () {
      if (this.closest(".form-group").classList.contains("error")) {
        validateField(this)
      }
    })
  })

  // Radio button validation
  const radioButtons = form.querySelectorAll('input[name="book_status"]')
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      clearError("bookStatusError")
      document.querySelector('.form-group:has(input[name="book_status"])').classList.remove("error")
    })
  })

  // Form submission
  form.addEventListener("submit", handleSubmit)
})

function validateField(field) {
  const fieldName = field.name
  const value = field.value.trim()
  let isValid = true

  // Clear previous errors
  clearError(fieldName.replace("_", "") + "Error")
  field.closest(".form-group").classList.remove("error")

  switch (fieldName) {
    case "author_name":
      if (!value) {
        showError("authorNameError", "Author name is required")
        isValid = false
      } else if (value.length < 2) {
        showError("authorNameError", "Author name must be at least 2 characters")
        isValid = false
      }
      break

    case "book_name":
      if (!value) {
        showError("bookNameError", "Book title is required")
        isValid = false
      } else if (value.length < 2) {
        showError("bookNameError", "Book title must be at least 2 characters")
        isValid = false
      }
      break

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value) {
        showError("emailError", "Email is required")
        isValid = false
      } else if (!emailRegex.test(value)) {
        showError("emailError", "Please enter a valid email address")
        isValid = false
      }
      break

    case "contact_number":
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
      if (!value) {
        showError("contactNoError", "Contact number is required")
        isValid = false
      } else if (!phoneRegex.test(value.replace(/[\s\-$$$$]/g, ""))) {
        showError("contactNoError", "Please enter a valid contact number")
        isValid = false
      }
      break

    case "genre":
      if (!value) {
        showError("genreError", "Please select a genre")
        isValid = false
      }
      break

    case "message":
      // Message is optional, so no validation needed
      // But you can add length validation if desired
      if (value.length > 1000) {
        showError("messageError", "Message must be less than 1000 characters")
        isValid = false
      }
      break
  }

  return isValid
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  const formGroup = errorElement.closest(".form-group")

  errorElement.textContent = message
  errorElement.classList.add("show")
  formGroup.classList.add("error")
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId)
  const formGroup = errorElement.closest(".form-group")

  errorElement.classList.remove("show")
  formGroup.classList.remove("error")
}

async function handleSubmit(event) {
  event.preventDefault()

  const form = event.target
  const formData = new FormData(form)
  const submitBtn = document.getElementById("submitBtn")

  // Validate all fields
  let isFormValid = true

  // Validate text inputs and select
  const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], select')
  textInputs.forEach((input) => {
    if (!validateField(input)) {
      isFormValid = false
    }
  })

  // Validate radio buttons
  const bookStatus = formData.get("book_status")
  if (!bookStatus) {
    showError("bookStatusError", "Please select book status")
    isFormValid = false
  }

  // Validate file upload (optional but recommended)
  const fileInput = document.getElementById("document")
  if (!fileInput.files.length) {
    showError("documentError", "Please upload a document")
    isFormValid = false
  }

  if (!isFormValid) {
    // Scroll to first error
    const firstError = document.querySelector(".form-group.error")
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" })
    }
    return
  }

  // Show loading state
  submitBtn.classList.add("loading")
  submitBtn.disabled = true

  try {
    // Submit to Formspree
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })

    if (response.ok) {
      // Show success modal
      showSuccessModal()

      // Reset form
      form.reset()
      document.getElementById("fileSelected").classList.remove("show")

      // Clear all errors
      document.querySelectorAll(".error-message").forEach((error) => {
        error.classList.remove("show")
      })
      document.querySelectorAll(".form-group").forEach((group) => {
        group.classList.remove("error")
      })
    } else {
      throw new Error("Form submission failed")
    }
  } catch (error) {
    console.error("Error:", error)
    alert("There was an error submitting the form. Please try again.")
  } finally {
    // Reset loading state
    submitBtn.classList.remove("loading")
    submitBtn.disabled = false
  }
}

function showSuccessModal() {
  const modal = document.getElementById("successModal")
  modal.classList.add("show")
  document.body.style.overflow = "hidden"
}

function closeSuccessModal() {
  const modal = document.getElementById("successModal")
  modal.classList.remove("show")
  document.body.style.overflow = ""
}

// Close modal when clicking overlay
document.getElementById("successModal").addEventListener("click", function (e) {
  if (e.target === this || e.target.classList.contains("modal-overlay")) {
    closeSuccessModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSuccessModal()
  }
})

// Add smooth scrolling for better UX
function smoothScrollToError() {
  const firstError = document.querySelector(".form-group.error")
  if (firstError) {
    firstError.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }
}

// Add form reset functionality
function resetForm() {
  const form = document.getElementById("contactForm")

  // Reset form fields
  form.reset()

  // Hide file selected indicator
  document.getElementById("fileSelected").classList.remove("show")

  // Clear all error messages
  document.querySelectorAll(".error-message").forEach((error) => {
    error.classList.remove("show")
  })

  // Remove error styling
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error")
  })

  // Focus on first input
  document.getElementById("authorName").focus()
}
