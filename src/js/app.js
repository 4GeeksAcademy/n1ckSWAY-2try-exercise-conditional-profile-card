import { left, right } from "@popperjs/core";
import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null, $
        lastName: null,$
        role: null,$
        country: null,$
        city: null$
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";
  let name = variables.name === null ? "Lucy" : variables.name;
  let lastName = variables.lastName === null ? "Biolett" : variables.lastName;
  let city = variables.city === null ? "city" : variables.city;
  let role = variables.role === null ? "role" : variables.role;
  let country = variables.country === null ? "country" : variables.country;
  let twitter = variables.twitter === null ? "twitter" : variables.twitter;

  let instagram = variables.instagram === null ? "insta" : variables.instagram;
  let github = variables.github === null ? "github" : variables.github;
  let linkedin = variables.linkedin === null ? "linkedin" : variables.linkedin;

  function getPosition() {
    const dropdown = document.getElementById("socialMediaPosition");
    const selectedValue = dropdown.value;
    if (selectedValue === "position-left") {
      return "position-left";
    } else if (selectedValue === "position-right") {
      return "position-right";
    } else {
      // Handle default case if needed
      return "position-right"; // Default to "position-right" if neither left nor right is selected
    }
  }
  // reset the website body with the new html output

  document.querySelector(
    "#country"
  ).innerHTML = `<select class="picker" id="country" for="country"> <option value="">${country}</option>
    <option value="USA">USA</option>
    <option value="Germany">Germany</option>
    <option value="Canada">Canada</option>
    <option value="Venezuela">Venezuela</option>
  </select>`;
  document.querySelector(
    "#role"
  ).innerHTML = ` <select class="picker" id="role" for="role">
    <option value="">${role}</option>
    <option value="Web Developer">Web Developer</option>
    <option value="Floor Planner">Floor Planner</option>
    <option value="Technical Writter">Technical Writter</option>
  </select>`;

  document.querySelector(
    "#city"
  ).innerHTML = `<select class="picker" id="city" for="city">
      <option value="">${city}</option>
      <option value="Miami">Miami</option>
      <option value="Munich">Munich</option>
      <option value="Caracas">Caracas</option>
      <option value="Toronto">Toronto</option>
    </select>`;
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${name} ${lastName}</h1>
          <h2>${role}</h2>
          <h3>${city}, ${country}</h3>
          <ul class="${getPosition()}">
            <li><a href="https://twitter.com/${twitter}"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://github.com/${github}"><i class="fab fa-github"></i></a></li>
            <li><a href="https://linkedin.com/school/${linkedin}"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="https://instagram.com/${instagram}"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
