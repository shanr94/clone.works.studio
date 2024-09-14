const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

//declaring constant to store nav bar icon image element
const menuIcon = document.querySelector("nav .icon img");
//declaring constant to store all nav bar links
const navLinks = document.querySelectorAll("#nav-right .box a");

let ImgContainerArry = [];
//declaring variable to store loader direction for each page
let loaderDirection = "";
//declaring variable to store activePage info that will be used in code for dynamic page functions
let currentPage = window.location.pathname;
//variable to store window's width
let windowWidth;

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
    if (link.href.includes(currentPage) || link.href.includes("studies")) {
      link.parentElement.classList.add("active");
    } else {
      if (!link.href.includes("index.html")) {
        link.parentElement.classList.remove("active");
      }
    }
  });
  //setting logo and nav icon color based on active page and determining loader direction
  if (
    document.querySelector(".active").firstElementChild.innerHTML == "About" ||
    document.querySelector(".active").firstElementChild.innerHTML == "Studies"
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
};

//function controlling display of nav menu when nav icon is clicked
const navBarHandler = () => {
  let antiClockrotate = true;
  menuIcon.addEventListener("click", () => {
    windowWidth = window.innerWidth;
    if (antiClockrotate) {
      gsap.to(menuIcon, {
        rotate: "-135deg",
        duration: 1,
        ease: "Power1.easeInOut",
      });
      if (windowWidth < 1024) {
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
          .to("#nav-right .box a", {
            color: "black",
            delay: -2,
          })
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
          .to("#nav-right", {
            display: "flex",
            duration: 0.2,
            ease: Power3,
            transform: "scaleY(1)",
          })
          .to(
            "#box1",
            {
              x: "300%",
              ease: Power3,
              duration: 0.8,
            },
            "step1"
          )
          .to(
            "#box2 a",
            {
              left: "135%",
              ease: Power3,
              duration: 0.5,
              delay: -0.2,
            },
            "step1"
          )
          .to(
            "#box2",
            {
              x: "100%",
              ease: Power3,
              duration: 0.2,
            },
            "step2"
          )
          .to(
            "#box3 a",
            {
              x: "135%",
              ease: Power3,
              duration: 0.5,
              delay: -0.5,
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
      if (windowWidth < 1024) {
        let smallNavCloseTL = gsap.timeline();
        smallNavCloseTL
          .to(
            "#nav-right .box",
            {
              delay: -1.2,
              opacity: 0,
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
          .to("#nav-right", {
            duration: 0.2,
            ease: Power3,
            transform: "scaleY(1)",
          })
          .to(
            "#box1",
            {
              x: "0%",
              ease: Power3,
              duration: 0.5,
            },
            "step1"
          )
          .to(
            "#box2",
            {
              x: "0%",
              ease: Power3,
              delay: 0.1,
              duration: 0.3,
            },
            "step1"
          )
          .to(
            "#box2 a",
            {
              left: "50%",
              ease: Power3,
              duration: 0.5,
              delay: -0.2,
            },
            "step2"
          )
          .to(
            "#box3 a",
            {
              x: "0%",
              ease: Power3,
              duration: 0.5,
              delay: -0.5,
            },
            "step2"
          );
      }

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
const sectionLinkHandler = () => {
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
  const originalImageArry = [];
  let ImgContainerArry = document.querySelectorAll(".largeDevice");

  ImgContainerArry.forEach((container) => {
    originalImageArry.push(container.children);
  });
  let iterationCount = 0;
  originalImageArry.forEach((arry) => {
    let currElemLength = arry.length;
    if (currElemLength > iterationCount) {
      iterationCount = currElemLength;
    }
  });
  if (window.innerWidth < 600) {
    let sortedImageArry = [];
    ImgContainerArry.forEach((container) => {
      container.style.display = "none";
    });

    for (let i = 0; i < iterationCount; i++) {
      for (let l = 0; l < originalImageArry.length; l++) {
        if (originalImageArry[l][i]) {
          sortedImageArry.push(originalImageArry[l][i].cloneNode(true));
        }
      }
    }
    let smallDeviceContainer = document.getElementById("line4");
    if (smallDeviceContainer) {
      smallDeviceContainer.style.display = "flex";
      sortedImageArry.forEach((image) => {
        smallDeviceContainer.appendChild(image);
      });
    }
  } else {
    ImgContainerArry.forEach((container) => {
      container.style.display = "flex";
      document.getElementById("line4").style.display = "none";
    });
  }
};
//control logo and nav icon color based on active page
const navIconHandler = () => {
  let logo = document.querySelector(".nav-top-bar svg path");
  let elem = document.querySelector("#nav-right");
  let anchorElms = document.querySelectorAll("nav a");
  let elemDisplay = window.getComputedStyle(elem).display;
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
        },
        onLeaveBack: () => {
          logo.style.fill = "black";
          menuIcon.style.filter = "Invert(0)";
          anchorElms.forEach((a) => {
            a.style.color = "black";
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
        },
        onLeaveBack: () => {
          logo.style.fill = "white";
          menuIcon.style.filter = "Invert(1)";
          anchorElms.forEach((a) => {
            a.style.color = "white";
          });
        },
      },
    });
  }
  //about page navbar color handler
  else if (currentPage.includes("about.html")) {
    gsap.to(logo, {
      scrollTrigger: {
        trigger: "#arrow-info",
        scroller: "body",
        start: "top 10%",
        markers: true,
        onEnter: () => {
          logo.style.fill = "black";
        },
        onLeaveBack: () => {
          logo.style.fill = "white";
        },
      },
    });
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

//on screen resize resetting nav bar and calling function;
window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
  const navRight = document.querySelector("#nav-right");
  const boxes = document.querySelectorAll(".box");
  if (windowWidth < 1024) {
    navRight.style.display = "none";
    navRight.style.flexDirection = "column";
    navRight.style.alignItems = "flex-end";
    navRight.style.transform = "scaleY (0)";
    boxes.forEach((box) => {
      box.style.transform = "translate(0%, 0%)";
    });
  } else {
    navRight.style.display = "flex";
    navRight.style.flexDirection = "row";
    navRight.style.alignItems = "center";
    navRight.style.transform = "scaleY (1)";
    boxes.forEach((box) => {
      box.style.transform = "translate(0%, 0%)";
    });
  }
  page3Handler();
});

//invoking functions
activePageHandler();
loaderHandler();
sectionLinkHandler();
navBarHandler();
page2Handler();
page3Handler();
navIconHandler();
navLinkclickHandler();
