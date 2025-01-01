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
    "pages/course-details.html": {
      title: "Course Details - Grip Learning",
      description: "View detailed course information and enroll for live training sessions.",
    },
  };

  return fetch(page)
    .then((response) => {
      if (!response.ok) throw new Error("Page not found");
      return response.text();
    })
    .then((data) => {
      const contentElement = document.getElementById("content");
      contentElement.innerHTML = data;

      // Update the title and meta description
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

      // Execute scripts in the loaded page
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

function loadCourseOutline(courseFileName) {
  fetch(`course-outline/${courseFileName}.json`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch course outline");
      return response.json();
    })
    .then((data) => {
      const courseKey = Object.keys(data)[0];
      const outline = data[courseKey];
      if (!outline) {
        console.error("Course outline not found in", courseFileName);
        return;
      }

      const courseOutlineElement = document.getElementById("course-outline");
      courseOutlineElement.innerHTML = "";

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
    .catch((err) => {
      console.error("Error loading course outline:", err);
      document.getElementById("course-outline").innerHTML =
        "<p>Failed to load course outline. Please try again later.</p>";
    });
}

function initializeRazorpayButton() {
  const razorpayScript = document.querySelector(
    "script[src='https://checkout.razorpay.com/v1/payment-button.js']"
  );
  if (razorpayScript) {
    const clonedScript = razorpayScript.cloneNode(true);
    razorpayScript.remove();
    document.body.appendChild(clonedScript);
  }
}

function openPaymentPage(courseTitle, courseImage, courseFileName) {
  loadPage("pages/course-details.html").then(() => {
    document.getElementById("course-title").textContent = courseTitle;
    document.getElementById("course-image").src = courseImage;

    loadCourseOutline(courseFileName);

    initializeRazorpayButton();
  });
}

// Navigation functions
function navigateTo(page) {
  loadPage(`pages/${page}.html`);
}

function goToCourses() {
  navigateTo("courses");
}

function goToBlog() {
  navigateTo("blog");
}

function goToFeedback() {
  navigateTo("feedback");
}

function goToResumeBuilder() {
  navigateTo("resume");
}

function goToContact() {
  navigateTo("contact");
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

// Load the initial page
document.addEventListener("DOMContentLoaded", () => {
  loadPage("pages/courses.html");
});
