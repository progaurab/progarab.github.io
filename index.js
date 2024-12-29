/* index.js */
function loadPage(page) {
  fetch(`${page}`)
    .then((response) => response.text())
    .then((data) => {
      const contentElement = document.getElementById("content");
      contentElement.innerHTML = data;
      contentElement.focus(); // Focus on the content area for better accessibility
    })
    .catch((err) => {
      console.error("Error loading page:", err);
      document.getElementById("content").innerHTML =
        "<p>Failed to load the page. Please try again later.</p>";
    });
}

// Load the initial page
loadPage("pages/courses.html");

function openPaymentPage(courseName, imageUrl) {
  const paymentUrl = new URL("pages/payment.html", window.location.origin);
  paymentUrl.searchParams.append("courseName", courseName);
  paymentUrl.searchParams.append("imageUrl", imageUrl);
  window.location.href = paymentUrl; // This opens the page in the same tab
}

// Consolidated navigation function
function navigateTo(page) {
  loadPage(`pages/${page}.html`);
}

// Examples of calling the navigation function
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

// Register the Service Worker
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
