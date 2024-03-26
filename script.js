let number_of_tasbi7 = document.getElementById("number_of_tasbi7");
let tasabi7_ar = document.getElementById("tasabi7_ar");
let tasbi7a_img = document.querySelector("#tasbi7a_img");
let count_btn = document.querySelector(".count_btn");
let reset_btn = document.querySelector(".reset_btn");
let gear_btn = document.querySelector(".gear_icon");
let settings_bar = document.querySelector(".settings_bar");
let themes = document.querySelectorAll(".theme");
let count_badges = document.querySelectorAll(".count_badge");
let badge_1 = document.querySelector(".badge_1");
let badge_2 = document.querySelector(".badge_2");
let reset_settings = document.querySelector(".reset_settings");

console.log(themes);

// settings bar
gear_btn.addEventListener("click", () => {
  if (gear_btn.classList.contains("active_icon")) {
    gear_btn.classList.remove("active_icon");
    settings_bar.classList.remove("active");
  } else {
    gear_btn.classList.add("active_icon");
    settings_bar.classList.add("active");
  }
});

// reset settings btn
reset_settings.addEventListener("click", () => {
  // remove classList
  badge_2.classList.remove("done_badge");
  badge_1.classList.remove("done_badge");
  // remove localstorage
  localStorage.removeItem("badge_1_done");
  localStorage.removeItem("badge_2_done");
  localStorage.removeItem("badge_color_done");
  localStorage.setItem("count", 0);
  updateCountInLocalStorageAndPage(0);
  // reload page
  location.reload();
});

// change themes
window.onload = function () {
  let tasbi7a_theme = localStorage.getItem("tasbi7a_theme");
  if (tasbi7a_theme) {
    tasbi7a_img.src = tasbi7a_theme; // Set the image source based on the stored theme
  }
  themes.forEach((theme) => {
    theme.addEventListener("click", () => {
      localStorage.setItem("tasbi7a_theme", theme.dataset.theme);
      tasbi7a_img.src = theme.dataset.theme; // Update the image source when a theme is clicked
      themes.forEach((btn) => {
        if (btn === theme) {
          btn.classList.add("active_theme");
        } else {
          btn.classList.remove("active_theme");
        }
      });
    });
  });
};

// tasbi7a function
const updateCountInLocalStorageAndPage = (count) => {
  number_of_tasbi7.textContent = count;
  count_badges.forEach((badge) => {
    badge.textContent = count;
  });
  // badge func
  if (count === 5) {
    localStorage.setItem("badge_1_done", "لقد حققت 50 تسبيحة لهذا اليوم");
    badge_1.textContent = localStorage.getItem("badge_1_done");
    localStorage.setItem("badge_color_done", "#388e3c");
    badge_1.style.backgroundColor = localStorage.getItem("badge_color_done");
  } else if (count === 10) {
    localStorage.setItem("badge_2_done", "لقد حققت 100 تسبيحة لهذا اليوم");
    badge_2.textContent = localStorage.getItem("badge_2_done");
    localStorage.setItem("badge_color_done", "#388e3c");
    badge_2.style.backgroundColor = localStorage.getItem("badge_color_done");
  }
};

// tasabi7 
const tasabi7_arr = ['الله أكبر', 'الحمد لله', 'سبحان الله'];
let currentIndex = 0;

// start counting
count_btn.addEventListener("click", () => {
  let count = localStorage.getItem("count") || 0;
  count++;
  localStorage.setItem("count", count);
  updateCountInLocalStorageAndPage(count);
  // show tasabi7
  tasabi7_ar.textContent = tasabi7_arr[currentIndex];
  tasabi7_ar.classList.add('active_tasabi7');
  
  setTimeout(() => {
    tasabi7_ar.classList.remove('active_tasabi7');
    currentIndex = (currentIndex + 1) % tasabi7_arr.length;
  }, 500); 
  // tasabi7_ar.classList.add("active_tasabi7");
});

// reset counting to 0
reset_btn.addEventListener("click", () => {
  localStorage.setItem("count", 0);
  updateCountInLocalStorageAndPage(0);
});

let count = localStorage.getItem("count") || 0;
updateCountInLocalStorageAndPage(count);

badge_1.textContent =
  localStorage.getItem("badge_1_done") || `الهدف الأول ${count}/50`;
if (count === 50) {
  badge_1.style.backgroundColor = localStorage.getItem("badge_color_done");
} else if (count === 100) {
  badge_2.style.backgroundColor = localStorage.getItem("badge_color_done");
}
badge_2.textContent = localStorage.getItem("badge_2_done");
