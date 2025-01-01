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
        description: "View the course outline, introduction video, and enroll for live training.",
      },
    };
  
    return fetch(page)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load page: ${page}`);
        }
        return response.text();
      })
      .then((data) => {
        const contentElement = document.getElementById("content");
        contentElement.innerHTML = data;
        contentElement.focus();
  
        // Update SEO metadata
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
            newScript.src = script.src;
          } else {
            newScript.textContent = script.textContent;
          }
          document.body.appendChild(newScript);
        });
  
        // Reinitialize Razorpay Payment Button Script
        if (page === "pages/course-details.html") {
          initializePaymentButton();
        }
      })
      .catch((err) => {
        console.error("Error loading page:", err);
        const contentElement = document.getElementById("content");
        contentElement.innerHTML = `<p>Failed to load the page. Please try again later.</p>`;
      });
  }
  
  function initializePaymentButton() {
    const paymentButtonContainer = document.getElementById("payment-button-container");
    if (paymentButtonContainer) {
      paymentButtonContainer.innerHTML = `
        <script src="https://checkout.razorpay.com/v1/payment-button.js" 
          data-payment_button_id="your_payment_button_id"></script>
      `;
    }
  }
  
  function openPaymentPage(courseTitle, courseImage) {
    loadPage("pages/course-details.html").then(() => {
      // Populate the course details
      document.getElementById("course-title").textContent = courseTitle;
      document.getElementById("course-image").src = courseImage;
  
      const outlines = {
        "HTML for Beginners": ["Introduction to HTML", "Basic Tags", "Creating Web Pages", "Images and Links"],
        "CSS Masterclass": ["CSS Basics", "Selectors", "Responsive Design", "Animations"],
      };
      const videos = {
        "HTML for Beginners": "videos/html-intro.mp4",
        "CSS Masterclass": "videos/css-intro.mp4",
      };
  
      const outlineElement = document.getElementById("course-outline");
      outlineElement.innerHTML = "";
      (outlines[courseTitle] || []).forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        outlineElement.appendChild(li);
      });
  
      const videoSrc = videos[courseTitle];
      if (videoSrc) {
        const videoElement = document.getElementById("course-video");
        videoElement.src = videoSrc;
        videoElement.style.display = "block";
      }
    });
  }
  
  // Load the initial page
  loadPage("pages/courses.html");
  