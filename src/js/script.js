// register gsap library
gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

// initializing loco scroll
const scroller = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  getSpeed: true,
  getDirection: true,
  inertia: 0.75,
});

// set a default for all scrolltrigger
ScrollTrigger.defaults({
  scroller: "main",
});

// connect to the locomotive scroll
scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length
      ? scroller.scrollTo(value, 0, 0)
      : scroller.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

ScrollTrigger.addEventListener("refresh", () => scroller.update());
ScrollTrigger.refresh();

//anchor links animation
if (
  window.location.pathname == "/" ||
  window.location.pathname == "/demo_2.html" ||
  window.location.pathname == "/demo_3.html"
) {
  const anchorLinks = document.querySelectorAll(".a_link");

  anchorLinks.forEach((anchorLink) => {
    let href = anchorLink.getAttribute("href");
    let target = document.querySelector(href);

    anchorLink.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      scroller.scrollTo(target);
    });
  });
}
