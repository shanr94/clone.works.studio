const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

//declaring constant and variables
const menuIcon = document.querySelector("nav .icon img");
const navLinks = document.querySelectorAll("#nav-right .box a");
const largeImageContainers = document.querySelectorAll(".largeDevice");
const smallImageContainer = document.querySelector("#smallDevice");
let loaderDirection = "toBottom";
let currentPage = window.location.pathname;
let imagesArry = [];
let sortedImageArry = [];

//function controling loader functionality when page is refreshed. A small Video plays and vanishes.
function loaderHandler() {
  let tl = gsap.timeline();
  if (loaderDirection == "toBottom") {
    tl.to(".yellowPage1", {
      top: "-100%",
      delay: 0.5,
      duration: 0.5,
      ease: "expo.out",
    })
      .from(".yellowPage2", {
        top: "100%",
        delay: 0.5,
        duration: 0.7,
        ease: "expo.out",
      })
      .to(".loader h1", {
        delay: -0.5,
        duration: 0.2,
        color: "black",
      })
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
}
//function controling nav bar based on active page and determining loader direction
function activePageHandler() {
  navLinks.forEach((link) => {
    //underline active page
    if (link.href.includes(currentPage)) {
      link.parentElement.classList.add("active");
      if (currentPage.includes("index.html")) {
        link.parentElement.querySelector(".underline").style.display = "none";
      }
    } else {
      link.parentElement.classList.remove("active");
    }
  });
  //setting logo and nav icon color based on active page and determining loader direction
  let activeElem = document.querySelector(".active");
  activeElem.gete;
  if (
    activeElem.firstElementChild.innerHTML == "About" ||
    activeElem.firstElementChild.innerHTML == "Studies"
  ) {
    document.querySelector(".nav-top-bar .icon img").style.filter = "invert(1)";
    document.querySelector(".nav-top-bar svg path").style.fill = "white";
    document.querySelectorAll("#nav-right .box a").forEach((elm) => {
      elm.style.color = "white";
    });
    document.querySelectorAll(".underline").forEach((elm) => {
      elm.style.backgroundColor = "white";
    });
    loaderDirection = "toTop";
  } else {
    loaderDirection = "toBottom";
  }
}
//function controlling display of nav menu when nav icon is clicked
function navBarHandler() {
  let antiClockrotate = true;
  menuIcon.addEventListener("click", () => {
    if (antiClockrotate) {
      gsap.to(menuIcon, {
        rotate: "-135deg",
        duration: 1,
        ease: "Power1.easeInOut",
      });
      if (window.innerWidth < 1024) {
        let smallNavOpenTL = new gsap.timeline();
        smallNavOpenTL
          .to("#nav-right", {
            duration: 0.2,
            ease: Power3,
            display: "flex",
            transform: "scaleY(1)",
          })
          .to(
            "#nav-right .box",
            {
              delay: -0.2,
              opacity: 1,
              ease: Power3,
              duration: 0.2,
              stagger: 0.2,
            },
            "underline"
          )
          .to(
            "#nav-right .box a",
            {
              color: "black",
            },
            "underline"
          )
          .to(
            ".active .underline",
            {
              delay: -1.1,
              scaleX: "0",
            },
            "underline"
          )
          .to("#navContact", {
            opacity: 1,
            duration: 0.3,
            ease: Power3,
            delay: 0.2,
          });
      } else {
        let largeNavOpenTL = new gsap.timeline();
        largeNavOpenTL
          .to(".active .underline", {
            opacity: 0,
            duration: 0.01,
            ease: Power1,
          })
          .to(
            ".box a",
            {
              x: "120%",
              duration: 0.5,
              ease: Power1,
              stagger: 0.2,
              delay: 0.2,
            },
            "step1"
          )
          .to(
            ".box",
            {
              display: "none",
              duration: 0.8,
              ease: Power1,
            },
            "step1"
          )
          .to(
            ".active",
            {
              delay: 0.2,
              display: "flex",
              right: 0,
              ease: Power3,
              opacity: 1,
            },
            "step2"
          )
          .to(
            ".active  .underline",
            {
              opacity: 1,
              transform: "scaleX(1)",
              duration: 0.5,
              ease: Power3,
            },
            "step2"
          )
          .to(
            ".active a",
            {
              x: "0%",
              ease: Power3,
              duration: 1,
            },
            "step2"
          );
      }
      antiClockrotate = false;
    } else {
      gsap.to(menuIcon, {
        rotate: "90deg",
        duration: 1,
        ease: Power1,
      });
      if (window.innerWidth < 1024) {
        let smallNavCloseTL = gsap.timeline();
        smallNavCloseTL
          .to(
            "#nav-right .box",
            {
              delay: -1.2,
              ease: Power3,
              duration: 0.2,
              stagger: 0.15,
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
            display: "none",
            transform: "scaleY(0)",
            duration: 0.2,
            ease: Power3,
          });
      } else {
        let largeNavCloseTL = new gsap.timeline();
        largeNavCloseTL
          .to(".active", {
            opacity: 0,
            duration: 0.1,
          })
          .to(
            ".box",
            {
              delay: 0.2,
              display: "flex",
              duration: 0.8,
              ease: Power1,
            },
            "visible"
          )
          .to(
            ".active",
            {
              delay: 0.2,
              opacity: 1,
              duration: 0.1,
            },
            "visible"
          )
          .from(
            ".active",
            {
              x: "285%",
              ease: Power1,
              duration: 1,
            },
            "step1"
          )
          .to(
            ".box a",
            {
              delay: 0.5,
              x: "0%",
              duration: 0.8,
              ease: Power1,
              stagger: 0.2,
            },
            "step1"
          );
      }
      antiClockrotate = true;
    }
  });
}
// //control logo and nav icon color based on active page
function navIconHandler() {
  let logo = document.querySelector(".nav-top-bar svg path");
  let anchorElms = document.querySelectorAll("nav a");
  let underlineElems = document.querySelectorAll("nav .underline");
  //index page navbar color handler
  if (currentPage.includes("/index.html")) {
    gsap.to(logo, {
      scrollTrigger: {
        trigger: "#page2",
        scroller: "body",
        start: "10% 10%",
        onEnter: () => {
          logo.style.fill = "white";
          menuIcon.style.filter = "Invert(1)";
          anchorElms.forEach((a) => {
            a.style.color = "white";
          });
          underlineElems.forEach((line) => {
            line.style.backgroundColor = "white";
          });
        },
        onLeaveBack: () => {
          logo.style.fill = "black";
          menuIcon.style.filter = "Invert(0)";
          anchorElms.forEach((a) => {
            a.style.color = "black";
          });
          underlineElems.forEach((line) => {
            line.style.backgroundColor = "black";
          });
        },
      },
    });
    gsap.to(logo, {
      scrollTrigger: {
        trigger: "#page3",
        scroller: "body",
        start: "top 0%",
        onEnter: () => {
          logo.style.fill = "black";
          menuIcon.style.filter = "Invert(0)";
          anchorElms.forEach((a) => {
            a.style.color = "black";
          });
          underlineElems.forEach((line) => {
            line.style.backgroundColor = "black";
          });
        },
        onLeaveBack: () => {
          logo.style.fill = "white";
          menuIcon.style.filter = "Invert(1)";
          anchorElms.forEach((a) => {
            a.style.color = "white";
          });
          underlineElems.forEach((line) => {
            line.style.backgroundColor = "white";
          });
        },
      },
    });
  }
  //about page navbar color handler
  else if (currentPage.includes("about.html")) {
    gsap.to(logo, {
      scrollTrigger: {
        trigger: "#about-page2",
        scroller: "body",
        start: "top 10%",
        onEnter: () => {
          logo.style.fill = "black";
          menuIcon.style.filter = "Invert(0)";
          anchorElms.forEach((a) => {
            a.style.color = "black";
          });
          underlineElems.forEach((line) => {
            line.style.backgroundColor = "black";
          });
        },
        onLeaveBack: () => {
          logo.style.fill = "white";
          menuIcon.style.filter = "Invert(1)";
          anchorElms.forEach((a) => {
            a.style.color = "white";
          });
          underlineElems.forEach((line) => {
            line.style.backgroundColor = "white";
          });
        },
      },
    });
  }
}
//function controling nav menu display when nav links are clicked
function navLinkclickHandler() {
  navLinks.forEach((link) => {
    link.addEventListener("click", (evt) => {
      window.onload = console.log(evt);
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
}
//function to reset nav bar on window resize
function resetNavIcon(isLargeDevice) {
  const navRight = document.querySelector("#nav-right");
  const boxes = document.querySelectorAll(".box");
  const links = document.querySelectorAll(".box a");
  menuIcon.style.transform = "rotate(0)";
  if (isLargeDevice) {
    navRight.style.display = "flex";
    navRight.style.flexDirection = "row";
    navRight.style.alignItems = "center";
    navRight.style.transform = "scale(1)";
    boxes.forEach((box) => {
      box.style.transform = "unset";
    });
  } else {
    navRight.style.display = "none";
    navRight.style.flexDirection = "column";
    navRight.style.alignItems = "flex-end";
    navRight.style.transform = "scaleY (0)";
    boxes.forEach((box) => {
      box.style.right = "unset";
      box.style.display = "flex";
    });
    links.forEach((link) => {
      link.style.transform = "unset";
      link.style.color = "black";
    });
    document.querySelector(".active").style.position = "relative";
  }
}
//function controling endless movement of background text
function page2Handler() {
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
}
//function controlling scrolling to particular section on a page
function sectionLinkHandler() {
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
}
//function to sort images
function updateSmallDeviceImages() {
  largeImageContainers.forEach((container) => {
    imagesArry.push(container.children);
  });
  let iterationCount = 0;
  imagesArry.forEach((arry) => {
    let currElemLength = arry.length;
    if (currElemLength > iterationCount) {
      iterationCount = currElemLength;
    }
  });
  for (let i = 0; i < iterationCount; i++) {
    for (let l = 0; l < imagesArry.length; l++) {
      if (imagesArry[l][i]) {
        sortedImageArry.push(imagesArry[l][i].cloneNode(true));
      }
    }
  }
  sortedImageArry.forEach((image) => {
    smallImageContainer.appendChild(image);
  });
}
//function to display images according to large or small device
function page3Handler() {
  let smallDeviceContainer = document.querySelector(
    ".smallDevice-IMGcontainer"
  );
  let largeDeviceContainer = document.querySelector(
    ".largeDevice-IMGcontainer"
  );
  if (smallDeviceContainer || largeDeviceContainer) {
    if (window.innerWidth < 700) {
      smallDeviceContainer.style.display = "flex";
      largeDeviceContainer.style.display = "none";
    } else {
      largeDeviceContainer.style.display = "flex";
      smallDeviceContainer.style.display = "none";
    }
  }
}
//on screen resize resetting nav bar and page3 images layout
function resizeHandler() {
  window.addEventListener("resize", () => {
    if (window.innerWidth < 1024) {
      resetNavIcon(false);
    } else {
      resetNavIcon(true);
    }
    page3Handler();
  });
}
//invoking functions
window.addEventListener("load", () => {
  updateSmallDeviceImages();
  navIconHandler();
  activePageHandler();
  loaderHandler();
  sectionLinkHandler();
  navBarHandler();
  page2Handler();
  page3Handler();
  resizeHandler();
});
