/* index.js */
function loadPage(page) {
  const seoData = {
    "pages/blog.html": {
      title: "Blog - Grip Learning",
      description: "Read our latest blogs on web development, HTML, CSS, JavaScript, and more at Grip Learning.",
    },
    "pages/courses.html": {
      title: "Courses - Grip Learning",
      description: "Explore our live training courses on web development, real-world projects, and job preparation.",
    },
    "pages/contact.html": {
      title: "Contact Us - Grip Learning",
      description: "Get in touch with Grip Learning for queries, support, and feedback.",
    },
    "pages/resume.html": {
      title: "Resume Builder - Grip Learning",
      description: "Create and download your professional resume with Grip Learning's Resume Builder.",
    },
    // Add more pages and their SEO metadata as needed
  };

  fetch(`${page}`)
    .then((response) => response.text())
    .then((data) => {
      const contentElement = document.getElementById("content");
      contentElement.innerHTML = data;
      contentElement.focus(); // Focus on the content area for better accessibility



      // Update the title and meta description dynamically
      if (seoData[page]) {
        document.title = seoData[page].title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute("content", seoData[page].description);
        } else {
          const newMetaDescription = document.createElement("meta");
          newMetaDescription.setAttribute("name", "description");
          newMetaDescription.setAttribute("content", seoData[page].description);
          document.head.appendChild(newMetaDescription);
        }
      }

      // Execute scripts inside the loaded page
      const scriptTags = contentElement.querySelectorAll("script");
      scriptTags.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) {
          newScript.src = script.src; // For external scripts
        } else {
          newScript.textContent = script.textContent; // For inline scripts
        }
        document.body.appendChild(newScript);
      });


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
