document
  .getElementById("predictionForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get the user's input and trim any extra spaces
    let symptomsInput = document.getElementById("symptoms").value.trim();
    const resultDisplay = document.getElementById("result-display");
    const loader = document.getElementById("loader");

    // Clear previous result and hide it
    resultDisplay.innerHTML = "";
    resultDisplay.classList.remove("visible");

    if (!symptomsInput) {
      resultDisplay.innerHTML = `<p>Please enter symptoms.</p>`;
      resultDisplay.classList.add("visible");
      return;
    }

    // Convert spaces to underscores to match API's expected format
    symptomsInput = symptomsInput.replace(/\s+/g, "_");

    // Show loader
    loader.style.display = "block";

    // API settings
    const apiUrl =
      "https://human-disease-detector.p.rapidapi.com/human_disease/predict";
    const apiKey = "8af7d824b3msh8950f09c4c86ecap1d9b12jsn47e8fd87911a";
    const apiHost = "human-disease-detector.p.rapidapi.com";
    const apiToken = "Makshad Nai Bhoolna @ 2025"; // Add your x-token here

    const requestBody = {
      symptoms: symptomsInput, // Use the modified input with underscores
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": apiHost,
          "x-token": apiToken, // Add x-token header here
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      loader.style.display = "none"; // Hide loader

      // Log the response for debugging
      console.log("API Response:", data);

      // Check if "disease" is present in the response
      if (data && data.disease) {
        // Display result in card format
        const diseaseCard = `
          <div class="result-card">
              <i class="fas fa-heartbeat"></i>
              <h3>${data.disease}</h3>
              <p>Potential Disease Detected</p>
          </div>
        `;
        resultDisplay.innerHTML += diseaseCard;

        // Smoothly display results
        setTimeout(() => {
          resultDisplay.classList.add("visible");
        }, 100);
      } else {
        // If no disease found
        resultDisplay.innerHTML = `<p>No diseases found.</p>`;
        resultDisplay.classList.add("visible");
      }
    } catch (error) {
      loader.style.display = "none";
      console.error("Error fetching data:", error);
      resultDisplay.innerHTML = `<p>Error fetching results. Please try again later.</p>`;
      resultDisplay.classList.add("visible");
    }
  });

// Scroll to form
function scrollToForm() {
  document
    .getElementById("form-section")
    .scrollIntoView({ behavior: "smooth" });
}
