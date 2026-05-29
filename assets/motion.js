(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;

  document
    .querySelectorAll("main > .section, .section-title, .split, .table-wrap, .flow, .motion-proof")
    .forEach((item) => {
      if (!item.hasAttribute("data-reveal")) item.setAttribute("data-reveal", "section");
    });

  document
    .querySelectorAll(".proof-strip, .case-grid, .artifact-grid, .value-grid, .metric-grid, .secondary-grid, .site-map")
    .forEach((item) => {
      if (!item.hasAttribute("data-reveal")) item.setAttribute("data-reveal", "group");
    });

  body.classList.add("motion-ready");

  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

  revealItems.forEach((item) => {
    if (item.dataset.reveal === "group") {
      Array.from(item.children).forEach((child, index) => {
        child.style.setProperty("--reveal-index", index);
      });
    }
  });

  const revealNow = (item) => item.classList.add("is-visible");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(revealNow);
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealNow(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const activate = (items, activeIndex) => {
    items.forEach((item, index) => {
      item.classList.toggle("is-active", index === activeIndex);
      if (item.classList.contains("motion-step")) {
        item.setAttribute("aria-pressed", String(index === activeIndex));
      }
      if (item.classList.contains("proof-frame")) {
        item.setAttribute("aria-hidden", String(index !== activeIndex));
      }
    });
  };

  document.querySelectorAll(".motion-proof").forEach((proof) => {
    const steps = Array.from(proof.querySelectorAll(".motion-step"));
    const frames = Array.from(proof.querySelectorAll(".proof-frame"));
    if (!steps.length || !frames.length) return;

    let activeIndex = 0;
    let timer = null;
    let userPaused = false;
    const interval = Number(proof.dataset.interval || 1800);

    const setActive = (index) => {
      activeIndex = (index + steps.length) % steps.length;
      activate(steps, activeIndex);
      activate(frames, activeIndex);
    };

    steps.forEach((step, index) => {
      if (!step.hasAttribute("type")) step.setAttribute("type", "button");
      step.addEventListener("click", () => {
        userPaused = true;
        window.clearInterval(timer);
        setActive(index);
      });
    });

    setActive(0);

    if (prefersReducedMotion || proof.dataset.autoplay === "false") return;

    const start = () => {
      if (timer || userPaused) return;
      timer = window.setInterval(() => setActive(activeIndex + 1), interval);
    };

    const stop = () => {
      window.clearInterval(timer);
      timer = null;
    };

    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }

    const proofObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0.35 }
    );

    proofObserver.observe(proof);
  });

  if (prefersReducedMotion) return;

  document.querySelectorAll(".flow").forEach((flow) => {
    const steps = Array.from(flow.querySelectorAll(".flow-step"));
    if (steps.length < 2) return;

    let activeIndex = 0;
    let timer = null;

    const setFlowStep = (index) => {
      activeIndex = (index + steps.length) % steps.length;
      activate(steps, activeIndex);
    };

    const start = () => {
      if (timer) return;
      setFlowStep(0);
      timer = window.setInterval(() => setFlowStep(activeIndex + 1), 1400);
    };

    const stop = () => {
      window.clearInterval(timer);
      timer = null;
    };

    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }

    const flowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0.45 }
    );

    flowObserver.observe(flow);
  });
})();
