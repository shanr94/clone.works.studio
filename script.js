const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});
//declaring variable to dynamically determine loader direction for each page
let loaderDirection = "";
//getting currentPage that will be used in code for dynamic page functions
let currentPage = window.location.pathname;
//declaring variable to store all nav bar links
const navLinks = document.querySelectorAll("#nav-right .box a");
//declaring variable to store nav bar icon image element
const menuIcon = document.querySelector("nav .icon img");

//function controling loader functionality when page is refreshed. A small Video plays and vanishes.
const loaderHandler = () => {
  let tl = gsap.timeline();
  if (loaderDirection == "toBottom") {
    tl.to(".yellowPage1", {
      top: "-100%",
      delay: 0.5,
      duration: 0.5,
      ease: "expo.out",
    })
      .from(
        ".yellowPage2",
        {
          top: "100%",
          delay: 0.5,
          duration: 0.7,
          ease: "expo.out",
        },
        "anim"
      )
      .to(
        ".loader h1",
        {
          delay: 0.6,
          duration: 0.3,
          color: "black",
        },
        "anim"
      )
      .to(".loader", {
        delay: -0.8,
        duration: 0.5,
        display: "none",
      });
  } else {
    tl.to(".yellowPage1", {
      top: "100%",
      delay: 0.5,
      duration: 0.5,
      ease: "expo.out",
    })
      .from(".yellowPage2", {
        top: "100%",
        delay: 0.6,
        duration: 0.7,
        ease: "expo.out",
      })
      .to(".loader", {
        delay: -0.8,
        duration: 0.5,
        display: "none",
      });
  }
};

//function controling nav bar based on active page and determining loader direction
const activePageHandler = () => {
  navLinks.forEach((link) => {
    //underline active page
    if (link.href.includes(currentPage)) {
      link.parentElement.classList.add("active");
    } else {
      if (!link.href.includes("index.html")) {
        link.parentElement.classList.remove("active");
      }
    }
  });
  //setting logo and nav icon color based on active page and determining loader direction
  if (
    document.querySelector(".active").firstElementChild.innerHTML == "About"
  ) {
    document.querySelector("#aboutNavBar .icon img").style.filter = "invert(1)";
    document.querySelector("#aboutNavBar svg path").style.fill = "white";
    loaderDirection = "toTop";
  } else {
    loaderDirection = "toBottom";
  }
};

//function controlling display of nav menu when nav icon is clicked
const navBarHandler = () => {
  let antiClockrotate = true;
  menuIcon.addEventListener("click", () => {
    let tl = gsap.timeline();
    if (antiClockrotate) {
      tl.to(menuIcon, {
        rotate: "-135deg",
        duration: 1,
        ease: "Power1.easeInOut",
      })
        .to("#nav-right", {
          delay: -0.9,
          display: "flex",
          transform: "scaleY(1)",
          duration: 0.2,
          ease: Power3,
        })
        .to(
          "#nav-right .box",
          {
            delay: -0.7,
            opacity: 1,
            ease: Power3,
            duration: 0.2,
            stagger: 0.15,
          },
          "underline"
        )
        .to(
          ".active .underline",
          {
            delay: -1.1,
            scaleX: "1",
          },
          "underline"
        )
        .to("#navContact", {
          opacity: 1,
          duration: 0.3,
          ease: Power3,
          delay: -0.9,
        });

      antiClockrotate = false;
    } else {
      let tl = gsap.timeline();
      tl.to(menuIcon, {
        rotate: "90deg",
        duration: 1,
        ease: Power1,
      })
        .to(
          "#nav-right .box",
          {
            delay: -1.2,
            opacity: 0,
            ease: Power3,
            duration: 0.3,
            stagger: 0.2,
            reversed: true,
          },
          "hide"
        )
        .to(
          ".active .underline",
          {
            delay: -1.2,
            scaleX: "0",
          },
          "hide"
        )
        .to("#navContact", {
          opacity: 0,
          duration: 0.1,
          ease: Power3,
          delay: -1.1,
        })
        .to("#nav-right", {
          delay: 0.1,
          display: "flex",
          transform: "scaleY(0)",
          duration: 0.2,
          ease: Power3,
        });

      antiClockrotate = true;
    }
  });
};

//function controling endless movement of background text
const page2Handler = () => {
  let elems = document.querySelectorAll("#page2 .elem");
  let page2 = document.querySelector("#page2");
  let prevElem;
  let pos = 0;
  setInterval(() => {
    if (pos < elems.length) {
      if (prevElem) {
        prevElem.querySelector(".moving").classList.toggle("selected");
        prevElem.querySelector("h1").style.color = "white";
        prevElem.querySelector("h1").style.fontStyle = "normal";
      }
      let currElem = elems[pos];
      let bgimg = currElem.getAttribute("data-img");
      page2.style.backgroundImage = `URL(${bgimg})`;
      pos++;
      currElem.querySelector("h1").style.color = "black";
      currElem.querySelector("h1").style.fontStyle = "italic";
      currElem.querySelector(".moving").classList.toggle("selected");
      prevElem = currElem;
    } else {
      pos = 0;
    }
  }, 5000);
};

//function controlling scrolling to particular section on a page
const scrollHandler = () => {
  let arrowElems = document.querySelectorAll(".arrow");
  arrowElems.forEach((arrow) => {
    arrow.addEventListener("click", (evt) => {
      evt.preventDefault;
      let scrollToElem;
      if (currentPage.includes("index.html")) {
        if (evt.target.parentElement.id == "arrow-contactInfo") {
          scrollToElem = document.querySelector("#page2");
        } else if (evt.target.parentElement.id == "arrow-page2Footer") {
          scrollToElem = document.querySelector("#page3");
        } else {
          scrollToElem = document.querySelector("#page1");
        }
      } else if (currentPage.includes("about.html")) {
        if (evt.target.parentElement.id == "arrow-info") {
          scrollToElem = document.querySelector("#about-page2");
        } else {
          scrollToElem = document.querySelector("#about-page1");
        }
      }
      scroll.scrollTo(scrollToElem);
    });
  });
};

//function to determine order of images based on device
const page3Handler = () => {
  let linesArry = document.querySelectorAll(".line");
  let lineImageArry = [];
  let index = 0;
  let imageOrderArry = [];
  linesArry.forEach((line) => {
    lineImageArry[index] = line.querySelectorAll(".image-div");
    index++;
  });

  let iterationCount = 0;
  lineImageArry.forEach((arry) => {
    currElemLength = arry.length;
    if (currElemLength > iterationCount) {
      iterationCount = currElemLength;
    }
  });
  for (let i = 0; i < iterationCount; i++) {
    for (let line = 0; line < lineImageArry.length; line++) {
      if (lineImageArry[line][i]) {
        imageOrderArry.push(lineImageArry[line][i]);
      }
    }
  }
  if (window.innerWidth < 600) {
    let imageRow = document.getElementById("line1");
    if (imageRow) {
      imageRow.style.display = "flex";
      imageRow.style.gap = "1rem";
      imageOrderArry.forEach((image) => {
        imageRow.appendChild(image);
      });
    }
  }
};

//control logo and nav icon color based on active page
const menuIconHandler = () => {
  console.log(currentPage);
  let menuSVG = document.querySelector(".nav-top-bar svg path");
  let elem = document.querySelector("#nav-right");
  let elemDisplay = window.getComputedStyle(elem).display;
  if (elemDisplay == "none") {
    //index page navbar color handler
    if (currentPage.includes("/index.html")) {
      gsap.to(menuSVG, {
        scrollTrigger: {
          trigger: "#page2",
          scroller: "body",
          start: "10% 10%",
          onEnter: () => {
            menuSVG.style.fill = "white";
            menuIcon.style.filter = "Invert(1)";
          },
          onLeaveBack: () => {
            menuSVG.style.fill = "black";
            menuIcon.style.filter = "Invert(0)";
          },
        },
      });
      gsap.to(menuSVG, {
        scrollTrigger: {
          trigger: "#page3",
          scroller: "body",
          start: "top 0%",
          onEnter: () => {
            menuSVG.style.fill = "black";
            menuIcon.style.filter = "Invert(0)";
          },
          onLeaveBack: () => {
            menuSVG.style.fill = "white";
            menuIcon.style.filter = "Invert(1)";
          },
        },
      });
    }
    //about page navbar color handler
    else if (currentPage.includes("about.html")) {
      gsap.to(menuSVG, {
        scrollTrigger: {
          trigger: "#arrow-info",
          scroller: "body",
          start: "top 10%",
          onEnter: () => {
            menuSVG.style.fill = "black";
          },
          onLeaveBack: () => {
            menuSVG.style.fill = "white";
          },
        },
      });
    }
  } else {
    console.log("bye");
  }
};

//function controling nav menu display when nav links are clicked
const navLinkclickHandler = () => {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      let tl = gsap.timeline();
      tl.to(menuIcon, {
        rotate: "90deg",
        duration: 1,
        ease: Power1,
      })
        .to(
          "#nav-right .box",
          {
            delay: -1.2,
            opacity: 0,
            ease: Power3,
            duration: 0.3,
            stagger: 0.2,
            reversed: true,
          },
          "hide"
        )
        .to(
          ".active .underline",
          {
            delay: -1.2,
            scaleX: "0",
          },
          "hide"
        )
        .to("#navContact", {
          opacity: 0,
          duration: 0.1,
          ease: Power3,
          delay: -1.1,
        })
        .to("#nav-right", {
          delay: 0.1,
          display: "flex",
          transform: "scaleY(0)",
          duration: 0.2,
          ease: Power3,
        });
    });
  });
};

//invoking functions
activePageHandler();
loaderHandler();
scrollHandler();
navBarHandler();
page2Handler();
page3Handler();
menuIconHandler();
navLinkclickHandler();
