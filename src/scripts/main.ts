/**
 * Main JavaScript
 * Initializes all interactive features
 */

// Dark Mode
const initDarkMode = (): void => {
  const toggles = document.querySelectorAll<HTMLElement>('[data-dark-toggle]');
  if (!toggles.length) return;

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  });
};

// Mobile Menu
const initMobileMenu = (): void => {
  const toggleBtn = document.querySelector<HTMLButtonElement>('[data-mobile-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    menu.classList.toggle('hidden');

    const icon = toggleBtn.querySelector('svg');
    if (icon) {
      icon.innerHTML = !isExpanded
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
    }
  });
};

// Mobile Nav Submenu (dropdown items inside the mobile menu)
const initMobileSubmenu = (): void => {
  const toggles = document.querySelectorAll<HTMLButtonElement>('[data-mobile-submenu-toggle]');
  if (!toggles.length) return;

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const submenu = toggle.nextElementSibling as HTMLElement | null;
      const icon = toggle.querySelector<HTMLElement>('[data-mobile-submenu-icon]');
      if (!submenu) return;

      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      submenu.classList.toggle('hidden');
      if (icon) icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });
};

// Header scroll behavior
const initHeader = (): void => {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  const onScroll = (): void => {
    if (window.scrollY > 50) {
      header.classList.add('shadow-lg');
    } else {
      header.classList.remove('shadow-lg');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
};

// Scroll animations
const initScrollAnimations = (): void => {
  const elements = document.querySelectorAll<HTMLElement>('[data-animate]');
  if (!elements.length) return;

  // Check for reduced motion preference - show all content immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // Don't animate, content is already visible
  }

  // Only apply animations to elements below the fold
  const viewportHeight = window.innerHeight;

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    // Only hide elements that are below the initial viewport
    if (rect.top > viewportHeight * 0.8) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      const delay = el.dataset.delay || '0';
      el.style.transitionDelay = `${delay}ms`;
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
  );

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top > viewportHeight * 0.8) {
      observer.observe(el);
    }
  });
};

// Scroll spy - highlights active nav item
const initScrollSpy = (): void => {
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]');
  if (!navLinks.length) return;

  const sections: HTMLElement[] = [];
  navLinks.forEach((link) => {
    const sectionId = link.dataset.navLink;
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) sections.push(section);
    }
  });

  if (!sections.length) return;

  const setActiveLink = (sectionId: string): void => {
    navLinks.forEach((link) => {
      if (link.dataset.navLink === sectionId) {
        link.classList.add('nav-active');
      } else {
        link.classList.remove('nav-active');
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
};

// Smooth scroll
const initSmoothScroll = (): void => {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]:not([href="#"])');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId) return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        const header = document.querySelector<HTMLElement>('[data-header]');
        const offset = header ? header.offsetHeight + 20 : 20;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        history.pushState(null, '', targetId);
      }
    });
  });
};

// Quote form handling
const initQuoteForm = (): void => {
  const form = document.querySelector<HTMLFormElement>('[data-quote-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!btn) return;

    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      btn.textContent = 'Quote Requested!';
      btn.classList.remove('bg-accent-500', 'hover:bg-accent-600');
      btn.classList.add('bg-green-600');

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('bg-green-600');
        btn.classList.add('bg-accent-500', 'hover:bg-accent-600');
        form.reset();
      }, 3000);
    }, 1500);
  });
};



// FAQ accordion
const initFaqAccordion = (): void => {
  const toggles = document.querySelectorAll<HTMLButtonElement>('[data-faq-toggle]');
  if (!toggles.length) return;

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling as HTMLElement;
      const icon = toggle.querySelector('[data-faq-icon]') as HTMLElement;
      if (!content) return;

      const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

      // Close all other items
      toggles.forEach((other) => {
        const otherContent = other.nextElementSibling as HTMLElement;
        const otherIcon = other.querySelector('[data-faq-icon]') as HTMLElement;
        if (otherContent && other !== toggle) {
          otherContent.style.maxHeight = '0px';
          otherContent.style.opacity = '0';
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (isOpen) {
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
        if (icon) icon.style.transform = 'rotate(45deg)';
      }
    });
  });
};

// Cookie consent
const initCookieConsent = (): void => {
  const banner = document.getElementById('cookie-consent');
  if (!banner || localStorage.getItem('cookie-consent')) return;

  setTimeout(() => { banner.style.transform = 'translateY(0)'; }, 1500);

  const hide = (): void => {
    banner.style.transform = 'translateY(100%)';
    setTimeout(() => banner.remove(), 300);
  };

  banner.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    hide();
  });
  banner.querySelector('[data-cookie-decline]')?.addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'essential');
    hide();
  });
};


// Testimonial carousel
const initTestimonialCarousel = (): void => {
  const carousels = document.querySelectorAll<HTMLElement>('[data-carousel]');
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    const track = carousel.querySelector<HTMLElement>('[data-carousel-track]');
    const slides = carousel.querySelectorAll<HTMLElement>('[data-carousel-slide]');
    const dotsContainer = carousel.querySelector<HTMLElement>('[data-carousel-dots]');
    const prevBtn = carousel.querySelector<HTMLButtonElement>('[data-carousel-prev]');
    const nextBtn = carousel.querySelector<HTMLButtonElement>('[data-carousel-next]');
    if (!track || slides.length < 2) return;

    let current = 0;
    let perView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    let autoplay: ReturnType<typeof setInterval>;
    const maxIndex = () => Math.max(0, slides.length - perView);

    const update = (): void => {
      const container = track.parentElement;
      if (!container) return;
      const containerWidth = container.offsetWidth;
      const slideWidth = containerWidth / perView;
      slides.forEach((slide) => { slide.style.width = slideWidth + 'px'; });
      track.style.transform = `translateX(-${current * slideWidth}px)`;

      const canSlide = maxIndex() > 0;
      if (prevBtn) prevBtn.style.display = canSlide ? 'flex' : 'none';
      if (nextBtn) nextBtn.style.display = canSlide ? 'flex' : 'none';

      dotsContainer?.querySelectorAll('button').forEach((dot, i) => {
        const isActive = i === current;
        dot.className = `h-2.5 rounded-full transition-all ${isActive ? 'w-8 bg-primary-600 dark:bg-primary-400' : 'w-2.5 bg-gray-300 dark:bg-gray-600'}`;
      });
    };

    const goNext = (): void => { current = current >= maxIndex() ? 0 : current + 1; update(); };
    const goPrev = (): void => { current = current <= 0 ? maxIndex() : current - 1; update(); };
    const resetAutoplay = (): void => { clearInterval(autoplay); autoplay = setInterval(goNext, 5000); };

    nextBtn?.addEventListener('click', () => { goNext(); resetAutoplay(); });
    prevBtn?.addEventListener('click', () => { goPrev(); resetAutoplay(); });

    const buildDots = (): void => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const dotCount = maxIndex() + 1;
      if (dotCount <= 1) return;
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.ariaLabel = `Go to slide ${i + 1}`;
        dot.addEventListener('click', () => { current = i; update(); resetAutoplay(); });
        dotsContainer.appendChild(dot);
      }
    };

    window.addEventListener('resize', () => {
      const newPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      if (newPerView !== perView) {
        perView = newPerView;
        current = Math.min(current, maxIndex());
        buildDots();
      }
      update();
    });

    buildDots();
    autoplay = setInterval(goNext, 5000);
    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', resetAutoplay);
    update();
  });
};

// Animated counters
const initCounters = (): void => {
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = el.dataset.counter || '0';
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
};

const animateCounter = (el: HTMLElement, target: string): void => {
  const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
  const duration = 2000;
  const startTime = performance.now();
  const hasPlus = target.includes('+');
  const hasPercent = target.includes('%');
  const hasK = target.includes('K');
  const hasM = target.includes('M');
  const hasDollar = target.includes('$');
  const hasDecimal = target.includes('.');

  const update = (currentTime: number): void => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = numericValue * easeOut;

    let display = '';
    if (hasDollar && hasM) {
      display = '$' + current.toFixed(1) + 'M';
    } else if (hasDollar && hasK) {
      display = '$' + Math.round(current) + 'K';
    } else if (hasK) {
      display = Math.round(current) + 'K';
    } else if (hasM) {
      display = current.toFixed(1) + 'M';
    } else if (hasPercent) {
      display = Math.round(current) + '%';
    } else if (hasDecimal) {
      display = current.toFixed(1);
    } else {
      display = Math.round(current).toString();
    }

    if (hasPlus) display += '+';
    el.textContent = display;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  };

  requestAnimationFrame(update);
};
// Back to top
const initBackToTop = (): void => {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const toggle = (): void => {
    if (window.scrollY > 300) {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
      btn.style.transform = 'translateY(0)';
    } else {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
      btn.style.transform = 'translateY(16px)';
    }
  };

  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  toggle();
};

// Toast notification
const showToast = (message: string, type: 'success' | 'error' = 'success'): void => {
  const toast = document.createElement('div');
  toast.className = `fixed top-6 right-6 z-[80] flex items-center gap-3 rounded-lg px-5 py-3 shadow-lg transition-all duration-300 ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`;
  toast.style.transform = 'translateX(120%)';
  toast.innerHTML = `
    <svg class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      ${type === 'success'
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'}
    </svg>
    <span class="text-sm font-medium">${message}</span>
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.transform = 'translateX(0)'; });
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

// Form validation
const initFormValidation = (): void => {
  const forms = document.querySelectorAll<HTMLFormElement>('form[data-validate]');
  if (!forms.length) return;

  const showError = (input: HTMLInputElement | HTMLTextAreaElement, message: string): void => {
    input.classList.add('!border-red-500');
    let errorEl = input.parentElement?.querySelector<HTMLElement>('[data-error]');
    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.setAttribute('data-error', '');
      errorEl.className = 'mt-1 text-sm text-red-500';
      input.parentElement?.appendChild(errorEl);
    }
    errorEl.textContent = message;
  };

  const clearError = (input: HTMLInputElement | HTMLTextAreaElement): void => {
    input.classList.remove('!border-red-500');
    const errorEl = input.parentElement?.querySelector('[data-error]');
    if (errorEl) errorEl.remove();
  };

  const validateField = (input: HTMLInputElement | HTMLTextAreaElement): boolean => {
    clearError(input);
    if (input.required && !input.value.trim()) {
      showError(input, 'This field is required');
      return false;
    }
    if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      showError(input, 'Please enter a valid email address');
      return false;
    }
    return true;
  };

  forms.forEach((form) => {
    const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.parentElement?.querySelector('[data-error]')) validateField(input);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      inputs.forEach((input) => { if (!validateField(input)) valid = false; });
      if (valid) {
        form.reset();
        showToast('Message sent successfully!');
      }
    });
  });
};

// Typewriter text rotation
const initTypewriter = (): void => {
  const elements = document.querySelectorAll<HTMLElement>('[data-typewriter]');
  if (!elements.length) return;

  elements.forEach((el) => {
    const data = el.dataset.typewriter;
    if (!data) return;
    let words: string[];
    try { words = JSON.parse(data); } catch { return; }
    if (!words.length) return;

    const original = el.textContent || '';
    const allWords = [original, ...words];
    let index = 0;

    const rotate = (): void => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      setTimeout(() => {
        index = (index + 1) % allWords.length;
        el.textContent = allWords[index];
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300);
    };

    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    el.style.display = 'inline-block';
    setInterval(rotate, 3000);
  });
};

// Scroll progress bar
const initScrollProgress = (): void => {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const update = (): void => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
};

// Image lightbox
const initLightbox = (): void => {
  const images = document.querySelectorAll<HTMLImageElement>('[data-lightbox]');
  if (!images.length) return;

  images.forEach((img) => {
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm';
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease';

      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.setAttribute('data-lightbox-close', '');
      closeButton.className = 'absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20';
      closeButton.setAttribute('aria-label', 'Close');

      const closeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      closeIcon.setAttribute('class', 'h-6 w-6');
      closeIcon.setAttribute('fill', 'none');
      closeIcon.setAttribute('viewBox', '0 0 24 24');
      closeIcon.setAttribute('stroke', 'currentColor');

      const closePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      closePath.setAttribute('stroke-linecap', 'round');
      closePath.setAttribute('stroke-linejoin', 'round');
      closePath.setAttribute('stroke-width', '2');
      closePath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
      closeIcon.appendChild(closePath);
      closeButton.appendChild(closeIcon);

      const lightboxImage = document.createElement('img');
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt || '';
      lightboxImage.className = 'max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl';

      overlay.appendChild(closeButton);
      overlay.appendChild(lightboxImage);

      if (img.alt) {
        const caption = document.createElement('p');
        caption.className = 'absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-black/50 px-4 py-2 text-sm text-white';
        caption.textContent = img.alt;
        overlay.appendChild(caption);
      }

      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => { overlay.style.opacity = '1'; });

      const close = (): void => {
        overlay.style.opacity = '0';
        setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 300);
      };

      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
      overlay.querySelector('[data-lightbox-close]')?.addEventListener('click', close);
      document.addEventListener('keydown', function handler(e: KeyboardEvent) {
        if (e.key === 'Escape') { close(); document.removeEventListener('keydown', handler); }
      });
    });
  });
};

// Blog Category Filter
const initBlogFilter = (): void => {
  const filterContainer = document.querySelector('[data-blog-filters]');
  if (!filterContainer) return;
  const buttons = filterContainer.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const articles = document.querySelectorAll<HTMLElement>('[data-category]');
  if (!buttons.length || !articles.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter || 'all';
      buttons.forEach((b) => {
        b.classList.toggle('bg-primary-600', b === btn);
        b.classList.toggle('text-white', b === btn);
        b.classList.toggle('dark:text-white', b === btn);
        b.classList.toggle('bg-gray-200', b !== btn);
        b.classList.toggle('dark:bg-gray-700', b !== btn);
        b.classList.toggle('text-gray-700', b !== btn);
        b.classList.toggle('dark:text-gray-300', b !== btn);
      });
      articles.forEach((article) => {
        if (filter === 'all' || article.dataset.category === filter) {
          article.style.display = '';
          article.style.opacity = '0';
          article.style.transform = 'translateY(10px)';
          requestAnimationFrame(() => {
            article.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
          });
        } else {
          article.style.display = 'none';
        }
      });
    });
  });
};

// Parallax Scroll Effect
const initParallax = (): void => {
  const elements = document.querySelectorAll<HTMLElement>('[data-parallax]');
  if (!elements.length) return;

  const update = (): void => {
    const scrollY = window.scrollY;
    elements.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || '0.3');
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight + 200) return;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
};


// Blog Search
const initBlogSearch = (): void => {
  const input = document.querySelector<HTMLInputElement>('[data-blog-search]');
  if (!input) return;
  const articles = document.querySelectorAll<HTMLElement>('[data-category]');
  if (!articles.length) return;

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    const filterContainer = document.querySelector('[data-blog-filters]');
    const activeFilter = filterContainer?.querySelector<HTMLButtonElement>('.bg-primary-600')?.dataset.filter || 'all';

    articles.forEach((article) => {
      const title = article.querySelector('h3')?.textContent?.toLowerCase() || '';
      const desc = article.querySelector('p')?.textContent?.toLowerCase() || '';
      const category = article.dataset.category || '';
      const matchesSearch = !query || title.includes(query) || desc.includes(query);
      const matchesFilter = activeFilter === 'all' || category === activeFilter;

      if (matchesSearch && matchesFilter) {
        article.style.display = '';
        article.style.opacity = '1';
        article.style.transform = 'translateY(0)';
      } else {
        article.style.display = 'none';
      }
    });

    // Show "no results" message
    const grid = articles[0]?.parentElement;
    if (!grid) return;
    let noResults = grid.querySelector('[data-no-results]') as HTMLElement | null;
    const visibleCount = Array.from(articles).filter(a => a.style.display !== 'none').length;
    if (visibleCount === 0) {
      if (!noResults) {
        noResults = document.createElement('div');
        noResults.setAttribute('data-no-results', '');
        noResults.className = 'col-span-full py-16 text-center';
        noResults.innerHTML = '<p class="text-lg text-gray-500 dark:text-gray-400">No articles found matching your search.</p>';
        grid.appendChild(noResults);
      }
      noResults.style.display = '';
    } else if (noResults) {
      noResults.style.display = 'none';
    }
  });
};

// Image Shimmer Loading
const initImageShimmer = (): void => {
  const images = document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]');
  if (!images.length) return;
  images.forEach((img) => {
    if (img.complete) return;
    img.classList.add('img-shimmer');
    img.addEventListener('load', () => { img.classList.remove('img-shimmer'); }, { once: true });
    img.addEventListener('error', () => { img.classList.remove('img-shimmer'); }, { once: true });
  });
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initMobileMenu();
  initMobileSubmenu();
  initHeader();
  initSmoothScroll();
  initScrollSpy();
  initTypewriter();
  initBackToTop();
  initScrollProgress();
  initTestimonialCarousel();

  initCounters();
  initCookieConsent();
  initFaqAccordion();
  initQuoteForm();
  initFormValidation();
  initLightbox();
  initBlogFilter();
  initBlogSearch();
  initParallax();
  initImageShimmer();
});

// Run animations after paint
requestAnimationFrame(() => {
  initScrollAnimations();
});

// Make this a module
export {};
