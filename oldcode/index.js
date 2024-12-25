function loadPage(page) {
  fetch(`${page}`)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("content").innerHTML = data;
    })
    .catch((err) => console.error("Error loading page:", err));
}

loadPage("courses.html");


// function openPaymentPage(courseName, imageUrl) {
//   const paymentUrl = new URL('payment.html', window.location.origin);
//   paymentUrl.searchParams.append('courseName', courseName);
//   paymentUrl.searchParams.append('imageUrl', imageUrl);
//   window.open(paymentUrl);
// }

function openPaymentPage(courseName, imageUrl) {
  const paymentUrl = new URL('payment.html', window.location.origin);
  paymentUrl.searchParams.append('courseName', courseName);
  paymentUrl.searchParams.append('imageUrl', imageUrl);
  window.location.href = paymentUrl;  // This opens the page in the same tab
}

function showFeedbackPage() {
  loadPage("feedback.html"); // Loads feedback.html
}

function goBack() {
  loadPage("courses.html"); // Loads feedback.html
}

function goToCourses() {
  loadPage("courses.html"); // Loads feedback.html
}

function goToBlog() {
  loadPage("blog.html"); // Loads feedback.html
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
