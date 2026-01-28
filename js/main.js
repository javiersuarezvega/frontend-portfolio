/* =====================================================
   HERO PARALLAX (TITLE + VIDEO)
===================================================== */

const hero = document.querySelector(".hero");
const title = document.querySelector(".hero-title-inner");
const accent = title?.querySelector(".accent");
const heroVideo = document.querySelector(".hero-video");

if (hero && window.innerWidth > 768) {
  let tx = 0, ty = 0;
  let cx = 0, cy = 0;

  hero.addEventListener("mousemove", e => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tx = x * 12;
    ty = y * 12;
  });

  function animateHero() {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;

    if (title) {
      title.style.transform = `
        translate(${cx}px, ${cy}px)
        rotateX(${cy * -0.8}deg)
        rotateY(${cx * 0.8}deg)
      `;
    }

    if (accent) {
      accent.style.textShadow = `
        0 0 40px rgba(56,189,248,${0.4 + Math.abs(cx) / 40}),
        0 0 90px rgba(56,189,248,${0.25 + Math.abs(cy) / 50})
      `;
    }

    if (heroVideo) {
      heroVideo.style.transform = `
        scale(1.08)
        translate(${cx * 1.6}px, ${cy * 1.6}px)
      `;
    }

    requestAnimationFrame(animateHero);
  }

  animateHero();

  hero.addEventListener("mouseleave", () => {
    tx = 0;
    ty = 0;
  });
}

/* =====================================================
   GENERIC REVEALS
===================================================== */

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

document.querySelectorAll(".reveal").forEach(el =>
  revealObserver.observe(el)
);

/* =====================================================
   ABOUT STACK
===================================================== */

const aboutStack = document.querySelector(".about-stack");

if (aboutStack) {
  const stackObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        aboutStack.classList.add("visible");
        stackObserver.unobserve(aboutStack);
      }
    },
    { threshold: 0.3 }
  );

  stackObserver.observe(aboutStack);
}

/* =====================================================
   PROJECTS REVEAL
===================================================== */

const projectsObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        projectsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".project").forEach(project =>
  projectsObserver.observe(project)
);

/* =====================================================
   SKILLS TIMELINE (LINE + VIDEO TRIGGER)
===================================================== */

const timeline = document.querySelector(".skills-timeline");
const progressLine = document.querySelector(".timeline-progress");
const skillItems = document.querySelectorAll(".reveal-skill");
const visualSection = document.querySelector(".visual-statement");

let videoTriggered = false;

if (timeline && progressLine) {

  // Reveal de bloques
  const skillObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  skillItems.forEach(item => skillObserver.observe(item));

  // Línea scroll-linked
  function updateTimeline() {
    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;

    const start = vh * 0.35;
    const end = rect.height - vh * 0.25;

    const progress = Math.min(
      Math.max((start - rect.top) / end, 0),
      1
    );

    progressLine.style.height = `${progress * 100}%`;

    // Dispara el video al final
    if (progress > 0.95 && visualSection && !videoTriggered) {
      visualSection.classList.add("visible");
      videoTriggered = true;
    }
  }

  window.addEventListener("scroll", updateTimeline);
  updateTimeline();
}



