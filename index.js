document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');

  // Function to load header and footer dynamically
  function loadHeaderFooter() {
    fetch('header.html')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Header not found');
        }
        return response.text();
      })
      .then((html) => {
        document.getElementById('header').innerHTML = html;
        addNavigationEventListeners(); // Add event listeners after the header is loaded
      })
      .catch((error) => {
        console.error('Error loading header:', error);
      });

    fetch('footer.html')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Footer not found');
        }
        return response.text();
      })
      .then((html) => {
        document.getElementById('footer').innerHTML = html;
      })
      .catch((error) => {
        console.error('Error loading footer:', error);
      });
  }

  // Function to load the main page content dynamically
  function loadPage(page) {
    console.log(`Loading page: ${page}`); // Log which page is being loaded
    fetch(`pages/${page}.html`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Page ${page} not found`);
        }
        return response.text();
      })
      .then((html) => {
        content.innerHTML = html;
        console.log(`Page ${page} loaded successfully`); // Log page load success
        handlePageScripts(page);
      })
      .catch((error) => {
        console.error('Error loading page:', error);
        load404(); // If the page is not found, load the 404 page
      });
  }

  function load404() {
    // Load the 404 page content
    fetch('404.html')
      .then((response) => {
        if (!response.ok) {
          content.innerHTML = '<h1>404 - Page Not Found</h1><p>Oops! This page doesn\'t exist.</p>';
        } else {
          return response.text();
        }
      })
      .then((html) => {
        if (html) {
          content.innerHTML = html; // Show the content from the 404 page
        }
      })
      .catch((error) => {
        console.error('Error loading 404 page:', error);
        content.innerHTML = '<h1>404 - Page Not Found</h1><p>Oops! This page doesn\'t exist.</p>';
      });
  }

  function handlePageScripts(page) {
    if (page === 'courses') {
      initCoursesPage();
    } else if (page === 'blog') {
      initBlogPage();
    } else if (page === 'feedback') {
      initFeedbackPage();
    } else if (page === 'resume') {
      initResumePage();
    }
  }

  function initCoursesPage() {
    console.log('Courses page loaded');
  }

  function initBlogPage() {
    console.log('Blog page loaded');
  }

  function initFeedbackPage() {
    console.log('Feedback page loaded');
  }

  function initResumePage() {
    console.log('Resume page loaded');
  }

  // Set the default page as 'courses' if no page is specified in the URL hash
  function handleNavigation() {
    const page = location.hash.replace('#', '') || 'courses'; // Default to 'courses'
    loadPage(page);
  }

  function addNavigationEventListeners() {
    const blogButton = document.getElementById('goToBlog');
    const feedbackButton = document.getElementById('showFeedbackPage');
    const resumeButton = document.getElementById('goToResumeBuilder');
    const coursesButton = document.getElementById('goToCourses');

    // Define functions for buttons (with event listeners)
    if (blogButton) blogButton.addEventListener('click', () => loadPage('blog'));
    if (feedbackButton) feedbackButton.addEventListener('click', () => loadPage('feedback'));
    if (resumeButton) resumeButton.addEventListener('click', () => loadPage('resume'));
    if (coursesButton) coursesButton.addEventListener('click', () => loadPage('courses'));
  }

  window.addEventListener('hashchange', handleNavigation);

  loadHeaderFooter();
  handleNavigation(); // Load the default page (courses) on initial load
});
