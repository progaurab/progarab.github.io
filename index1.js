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

// function openPaymentPage(courseName, imageUrl) {
//   const paymentUrl = new URL("pages/payment.html", window.location.origin);
//   paymentUrl.searchParams.append("courseName", courseName);
//   paymentUrl.searchParams.append("imageUrl", imageUrl);
//   window.location.href = paymentUrl; 
// }

function openPaymentPage(courseTitle, courseImage) {
  // Fetch and load the course details page dynamically
  loadPage("pages/course-details.html").then(() => {
    // Populate the course details dynamically after loading the page
    document.getElementById("course-title").textContent = courseTitle;
    document.getElementById("course-image").src = courseImage;

    // Example course outlines (map based on title)
    const outlines = {
      "HTML for Beginners": [
        "Introduction to HTML",
        "Basic Tags and Structure",
        "Creating Your First Web Page",
        "Working with Images and Links",
      ],
      "CSS Masterclass": [
        "CSS Basics and Syntax",
        "Selectors and Specificity",
        "Responsive Design with Flexbox",
        "Animations and Transitions",
      ],
      "JavaScript for Beginners": [
        "Introduction to JavaScript",
        "Variables and Data Types",
        "DOM Manipulation Basics",
        "Event Handling",
      ],
      "Generative AI for Beginners": [
        "Introduction to Generative AI",
        "Popular AI Tools",
        "Training Models for Creativity",
        "Project: AI-generated Art",
      ],
    };

    const videos = {
      "HTML for Beginners": "videos/html-intro.mp4",
      "CSS Masterclass": "videos/css-intro.mp4",
      "JavaScript for Beginners": "videos/js-intro.mp4",
      "Generative AI for Beginners": "videos/genai-intro.mp4",
    };

    // Populate course outline
    const courseOutlineElement = document.getElementById("course-outline");
    courseOutlineElement.innerHTML = ""; // Clear existing outline
    (outlines[courseTitle] || []).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      courseOutlineElement.appendChild(li);
    });

    // Populate video source
    const videoSrc = videos[courseTitle];
    if (videoSrc) {
      document.getElementById("course-video").src = videoSrc;
    }
  });
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
