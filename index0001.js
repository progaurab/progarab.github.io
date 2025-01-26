/* index.js */

// Fetch and display the course outline
function loadCourseOutline(courseFileName) {
  const courseOutlineElement = document.getElementById("course-outline");

  fetch(`course-outline/${courseFileName}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch course outline: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const courseKey = Object.keys(data)[0]; // Course title is the first key
      const outline = data[courseKey];

      if (!outline || !Array.isArray(outline)) {
        throw new Error("Invalid JSON structure");
      }

      courseOutlineElement.innerHTML = ""; // Clear previous content

      outline.forEach((section) => {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "course-section";

        const topicTitle = document.createElement("h3");
        topicTitle.textContent = section.topic;
        sectionDiv.appendChild(topicTitle);

        const detailsList = document.createElement("ul");
        section.details.forEach((detail) => {
          const li = document.createElement("li");
          li.textContent = detail;
          detailsList.appendChild(li);
        });

        sectionDiv.appendChild(detailsList);
        courseOutlineElement.appendChild(sectionDiv);
      });
    })
    .catch((error) => {
      console.error("Error loading course outline:", error);
      courseOutlineElement.innerHTML =
        "<p>Failed to load course outline. Please try again later.</p>";
    });
}

// Add Razorpay payment button
function initializeRazorpayButton() {
  const razorpayContainer = document.getElementById("razorpay-button-container");

  razorpayContainer.innerHTML = ""; // Clear any existing button

  const form = document.createElement("form");
  form.action = "https://checkout.razorpay.com/v1/checkout.js";
  form.method = "POST";

  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/payment-button.js";
  script.setAttribute("data-payment_button_id", "your-button-id-here"); // Replace with actual ID
  script.async = true;

  form.appendChild(script);
  razorpayContainer.appendChild(form);
}

// Load the payment page
function openPaymentPage(courseTitle, courseImage, courseFileName) {
  loadPage("pages/course-details.html").then(() => {
    document.getElementById("course-title").textContent = courseTitle;
    document.getElementById("course-image").src = courseImage;

    // Load course outline dynamically
    loadCourseOutline(courseFileName);

    // Initialize Razorpay button
    initializeRazorpayButton();
  });
}

// SPA navigation
async function loadPage(page) {
  try {
    const response = await fetch(page);
    if (!response.ok) throw new Error(`Failed to load page: ${response.status}`);
    const html = await response.text();
    document.getElementById("content").innerHTML = html;
  } catch (error) {
    console.error("Error loading page:", error);
    document.getElementById("content").innerHTML =
      "<p>Failed to load the page. Please try again later.</p>";
  }
}

// Example SPA navigation
function navigateTo(page) {
  loadPage(`pages/${page}.html`);
}

// Handle all meny buuton onclick events
function showFeedbackPage() {
  navigateTo("feedback");
}

function goBack() {
  navigateTo("courses");
}

function goToCourses() {
  navigateTo("courses");
}

function goToBlog() {
  navigateTo("blog");
}

function goToResumeBuilder() {
  navigateTo("resume");
}


// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

function loadHeaderFooter() {
  // Load header
  fetch("header.html")
    .then((response) => response.text())
    .then((headerHtml) => {
      const headerElement = document.createElement("div");
      headerElement.innerHTML = headerHtml;
      document.body.insertBefore(headerElement, document.body.firstChild);
    })
    .catch((error) => console.error("Failed to load header:", error));

  // Load footer
  fetch("footer.html")
    .then((response) => response.text())
    .then((footerHtml) => {
      const footerElement = document.createElement("div");
      footerElement.innerHTML = footerHtml;
      document.body.appendChild(footerElement);
    })
    .catch((error) => console.error("Failed to load footer:", error));
}

// SPA Navigation: Update the course-details loading logic
function openPaymentPage(courseTitle, courseImage, courseFileName) {
  loadPage("pages/course-details.html").then(() => {
    document.getElementById("course-title").textContent = courseTitle;
    document.getElementById("course-image").src = courseImage;

    // Load course outline dynamically
    loadCourseOutline(courseFileName);

    // Initialize Razorpay button
    initializeRazorpayButton();

    // Dynamically load header and footer
    loadHeaderFooter();
  });
}

// Call loadHeaderFooter for the initial page
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
  loadPage("pages/courses.html");
});
