function showFeedbackPage() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
  document.getElementById("page3").style.display = "none";
}

function goBack() {
  document.getElementById("page1").style.display = "block";
  document.getElementById("page2").style.display = "none";
}

// Handle form submission
document.getElementById("feedbackForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent form submission
  const form = document.getElementById("feedbackForm");

  const inputs = form.querySelectorAll('input[type="text"], input[type="number"], input[type="email"]');
  const radioGroups = form.querySelectorAll(".radio-group");

  let allValid = true;

  // Validate text, number, and email fields
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      console.log(`The field "${input.placeholder}" is empty.`);
      allValid = false;
    } else {
      input.style.border = ""; // Reset border for valid fields
    }
  });

  // Validate radio groups
  radioGroups.forEach((group) => {
    const radios = group.querySelectorAll('input[type="radio"]');
    const isChecked = Array.from(radios).some((radio) => radio.checked);
    if (!isChecked) {
      console.log(
        `Please select an option for: "${group.previousElementSibling.textContent}"`
      );
      group.style.border = "2px solid red"; // Highlight radio group
      allValid = false;
    } else {
      group.style.border = ""; // Reset border for valid selection
    }
  });

  if (allValid) {
    console.log("All fields are filled.");
      // Proceed with form submission or other logic
      // Collect form data
      const name = document.getElementById("name").value;
      const mobile = document.getElementById("mobile").value;
      const college = document.getElementById("college").value;
      const engagement = document.querySelector(
        'input[name="engagement"]:checked'
      ).value;
      const material = document.querySelector(
        'input[name="material"]:checked'
      ).value;
      const learnNext = document.getElementById("learn-next").value;

      // Send data to Google Sheets
      fetch(
        "https://script.google.com/macros/s/AKfycbxzJNVGX7omfXX5z100rtQIinQ7U26QjjkPEZlksryh3ejtwJrj0RW_1kY3mpqfLw83/exec",
        {
          method: "POST",
          body: new URLSearchParams({
            name,
            mobile,
            college,
            engagement,
            material,
            learnNext,
          }),
        }
      )
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          alert("Feedback submitted successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally (() => {
            document.getElementById("page1").style.display = "none";
            document.getElementById("page2").style.display = "none";
            document.getElementById("page3").style.display = "block";
        })
  } else {
    alert("Please fill/select in all fields.");
    
    // You can show an alert or highlight the empty fields if needed
  }
});

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
