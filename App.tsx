import { useEffect, useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import './index.css';

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    // Custom Cursor Logic
    const cur = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (!cur || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let reqId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top = my + 'px';
    };

    const animR = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      reqId = requestAnimationFrame(animR);
    };

    document.addEventListener('mousemove', onMouseMove);
    animR();

    const interactables = document.querySelectorAll('a, button, .service-card, .video-card, .test-card, .skill-pill, .exp-card, .social-link, .contact-item');
    
    const onEnter = () => {
      cur.style.width = '20px';
      cur.style.height = '20px';
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(255,26,26,0.9)';
    };
    
    const onLeave = () => {
      cur.style.width = '12px';
      cur.style.height = '12px';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(255,26,26,0.6)';
    };

    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // Intersection Observer for fade-up
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    const fadeUps = document.querySelectorAll('.fade-up');
    fadeUps.forEach(el => obs.observe(el));

    // Scroll spy for navigation
    const secs = document.querySelectorAll('section');
    const nlinks = document.querySelectorAll('.nav-links a');
    
    const onScroll = () => {
      let cur2 = '';
      secs.forEach(s => {
        if (window.scrollY >= s.offsetTop - 80) {
          cur2 = s.id;
        }
      });
      nlinks.forEach(a => {
        if (a.getAttribute('href') === '#' + cur2) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
    };
    
    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(reqId);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      fadeUps.forEach(el => obs.unobserve(el));
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const toggleNav = () => setMobileNavOpen(!mobileNavOpen);
  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursorRing"></div>

      <div className={`mobile-nav ${mobileNavOpen ? 'open' : ''}`} id="mobileNav">
        <a href="#hero" onClick={closeMobileNav}>Home</a>
        <a href="#about" onClick={closeMobileNav}>About</a>
        <a href="#services" onClick={closeMobileNav}>Services</a>
        <a href="#edits" onClick={closeMobileNav}>Work</a>
        <a href="#testimonials" onClick={closeMobileNav}>Reviews</a>
        <a href="#hire-me" onClick={closeMobileNav}>Hire Me</a>
      </div>

      <nav>
        <a href="#hero" className="nav-logo">J<span>.</span></a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#edits">Work</a></li>
          <li><a href="#testimonials">Reviews</a></li>
          <li><a href="#hire-me">Hire Me</a></li>
        </ul>
        <a href="#edits" className="nav-cta">View Work</a>
        <div className="hamburger" id="hamburger" onClick={toggleNav}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-grid"></div>
        <div className="hero-light"></div>
        <div className="hero-light-2"></div>
        <div className="scan-line"></div>
        <div className="hero-content">
          <div className="hero-left fade-up">
            <div className="hero-tag">Available for Projects</div>
            <h1 className="hero-name">
              <span className="line1">JACOB</span><br/>
              <span className="line2">VIDEO EDITOR</span>
            </h1>
            <p className="hero-role">Talking Head · Shorts · Motion Graphics</p>
            <p className="hero-desc">I craft high-retention short-form videos — talking head edits, motion graphics, and color-graded content that stops the scroll and builds real audiences.</p>
            <div className="hero-btns">
              <a href="#edits" className="btn-primary">View My Work</a>
              <a href="#about" className="btn-outline">About Me</a>
            </div>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-num">50+</div><div className="stat-label">Projects</div></div>
              <div className="stat-item"><div className="stat-num">3+</div><div className="stat-label">Years Exp.</div></div>
              <div className="stat-item"><div className="stat-num">1M+</div><div className="stat-label">Views</div></div>
            </div>
          </div>
          <div className="hero-right fade-up" style={{ transitionDelay: '0.2s' }}>
            <div className="hero-visual">
              {/* Floating tool icons */}
              <div className="float-icon fi-pr">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#9999FF" opacity="0.15"/><text x="4" y="20" fontFamily="Arial" fontWeight="900" fontSize="14" fill="#9999FF">Pr</text></svg>
              </div>
              <div className="float-icon fi-ae">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#9999FF" opacity="0.15"/><text x="4" y="20" fontFamily="Arial" fontWeight="900" fontSize="13" fill="#D8A8FF">Ae</text></svg>
              </div>
              <div className="float-icon fi-cap">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#ff1a1a" opacity="0.15"/><text x="5" y="19" fontFamily="Arial" fontWeight="900" fontSize="10" fill="#ff4444">CC</text></svg>
              </div>
              <div className="float-icon fi-tik">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="6" fill="#00F2EA" opacity="0.1"/><path d="M18 8h-2.5v8a2.5 2.5 0 1 1-2.5-2.5V11a5 5 0 1 0 5 5V8z" fill="#00F2EA"/></svg>
              </div>
              {/* Central animated editor graphic */}
              <div className="hv-frame">
                <div className="hv-corner tl"></div>
                <div className="hv-corner tr"></div>
                <div className="hv-corner bl"></div>
                <div className="hv-corner br"></div>
                <div className="hv-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M6 6h20v20H6z" stroke="#ff1a1a" strokeWidth="1.5"/>
                    <path d="M12 11l10 5-10 5V11z" fill="#ff1a1a"/>
                  </svg>
                </div>
                <div className="hv-label">Video Editor</div>
                <div className="hv-bars">
                  <div className="hv-bar"></div>
                  <div className="hv-bar"></div>
                  <div className="hv-bar"></div>
                  <div className="hv-bar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-ind"><span>Scroll</span><div className="scroll-dot"></div></div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-content">
          <div className="about-left fade-up">
            <div className="section-label">Who I Am</div>
            <h2 className="about-title">ABOUT<br/><em>ME</em></h2>
            <p className="about-body">I'm Jacob — a video editor specialising in talking head content, short-form videos, motion graphics, and cinematic color correction. I help creators and brands transform raw footage into polished, high-retention content that performs across TikTok, YouTube Shorts, and Instagram Reels.<br/><br/>Every edit is crafted with precise pacing, dynamic captions, and visual storytelling designed to keep viewers hooked from the first second to the last.</p>
            <div className="skills-grid">
              <div className="skill-pill">Talking Head Editing</div>
              <div className="skill-pill">Short-Form Shorts</div>
              <div className="skill-pill">Motion Graphics</div>
              <div className="skill-pill">Color Correction</div>
              <div className="skill-pill">Caption Animation</div>
              <div className="skill-pill">Sound Design</div>
            </div>
          </div>
          <div className="about-right fade-up" style={{ transitionDelay: '0.15s' }}>
            <div className="exp-cards">
              <div className="exp-card"><div className="exp-num">01</div><div className="exp-title">Talking Head Videos</div><div className="exp-desc">Clean, engaging edits for interview and camera-facing content — cuts timed to speech, B-roll integration, and dynamic captions.</div></div>
              <div className="exp-card"><div className="exp-num">02</div><div className="exp-title">Shorts & Reels</div><div className="exp-desc">Algorithm-ready vertical videos with strong hooks, perfect pacing, and formats built to go viral on every platform.</div></div>
              <div className="exp-card"><div className="exp-num">03</div><div className="exp-title">Motion Graphics</div><div className="exp-desc">Custom After Effects animations — kinetic text, logo reveals, and visual effects that elevate every frame.</div></div>
              <div className="exp-card"><div className="exp-num">04</div><div className="exp-title">Color Correction</div><div className="exp-desc">Professional color grading that gives your footage a cinematic, polished look consistent with your brand identity.</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="services-content">
          <div className="services-header fade-up">
            <div>
              <div className="section-label">What I Offer</div>
              <h2 className="services-title">WHAT<br/><em>I DO</em></h2>
            </div>
            <p className="services-subtitle">Premium editing services built for creators who want to grow fast and look professional.</p>
          </div>
          <div className="services-grid fade-up" style={{ transitionDelay: '0.1s' }}>
            <div className="service-card">
              <div className="svc-num">01</div>
              <div className="svc-icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="8" r="4" stroke="#ff1a1a" strokeWidth="1.5"/>
                  <path d="M4 18c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke="#ff1a1a" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="svc-title">Talking Head Editing</div>
              <div className="svc-desc">Camera-facing content edited for clarity and engagement — smart cuts, B-roll, and animated captions that boost watch time.</div>
            </div>
            <div className="service-card">
              <div className="svc-num">02</div>
              <div className="svc-icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="3" y="3" width="16" height="16" rx="2" stroke="#ff1a1a" strokeWidth="1.5"/>
                  <path d="M8 8l6 3-6 3V8z" fill="#ff1a1a"/>
                </svg>
              </div>
              <div className="svc-title">Short-Form Shorts</div>
              <div className="svc-desc">Vertical-first edits built for TikTok, YouTube Shorts, and Instagram Reels — hooks, pacing, and CTAs that drive growth.</div>
            </div>
            <div className="service-card">
              <div className="svc-num">03</div>
              <div className="svc-icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#ff1a1a" strokeWidth="1.5"/>
                  <path d="M11 4v14M4 11h14" stroke="#ff1a1a" strokeWidth="1.2"/>
                </svg>
              </div>
              <div className="svc-title">Motion Graphics</div>
              <div className="svc-desc">Custom After Effects animations — kinetic text, logo stings, and animated overlays that make your content stand out.</div>
            </div>
            <div className="service-card">
              <div className="svc-num">04</div>
              <div className="svc-icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M3 11a8 8 0 1 0 16 0" stroke="#ff1a1a" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M11 3v4M3 11h4M15 11h4" stroke="#ff1a1a" strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx="11" cy="11" r="2" fill="#ff1a1a"/>
                </svg>
              </div>
              <div className="svc-title">Color Correction</div>
              <div className="svc-desc">Cinematic color grading that gives your footage depth, consistency, and a professional finish across every scene.</div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITS / PORTFOLIO */}
      <section id="edits" style={{ minHeight: 'unset', scrollSnapAlign: 'start' }}>
        <div className="edits-content">
          <div className="edits-header fade-up">
            <div className="section-label">Portfolio</div>
            <h2 className="edits-title">SIGNATURE<br/><em>EDITS</em></h2>
          </div>
          <div className="video-grid fade-up" style={{ transitionDelay: '0.1s' }}>

            <div className="video-card">
              <iframe
                src="https://drive.google.com/file/d/16DsG7wFyeWUrh7F3H1_sVVcaPlTVKpeX/preview"
                allow="autoplay"
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="video-meta">
                <div className="video-type">Talking Head</div>
                <div className="video-title-card">Speaker Edit</div>
              </div>
            </div>

            <div className="video-card">
              <iframe
                src="https://drive.google.com/file/d/1o5gygtBhfWWQCggqvUwba087XRPbZNCh/preview"
                allow="autoplay"
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="video-meta">
                <div className="video-type">Short-Form Reel</div>
                <div className="video-title-card">Viral Short</div>
              </div>
            </div>

            <div className="video-card">
              <iframe
                src="https://drive.google.com/file/d/1pqHosmfUMHgptjjsm_7bpj_iv7ZV9HxP/preview"
                allow="autoplay"
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="video-meta">
                <div className="video-type">Motion Graphics</div>
                <div className="video-title-card">Animated Edit</div>
              </div>
            </div>

            <div className="video-card">
              <iframe
                src="https://drive.google.com/file/d/1_RNwKopcfGJizetCiI-Lnk4IuksVlynO/preview"
                allow="autoplay"
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="video-meta">
                <div className="video-type">Color Graded</div>
                <div className="video-title-card">Cinematic Grade</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials">
        <div className="test-content">
          <div className="test-header fade-up">
            <div className="section-label">Client Reviews</div>
            <h2 className="test-title">WHAT THEY<br/><em>SAY</em></h2>
          </div>
          <div className="test-grid">
            <div className="test-card fade-up" style={{ transitionDelay: '0s' }}>
              <span className="test-quote-mark">"</span>
              <div className="test-stars"><span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span></div>
              <p className="test-text">Perfect communication and exceptional skills. Jacob delivered exactly what I needed — a reel that performed 3x better than anything we'd posted before. Absolutely top-tier editor.</p>
              <div className="test-author"><div className="test-avatar">M</div><div><div className="test-name">Marcus</div><div className="test-role">Co-Founder, Creative Agency</div></div></div>
            </div>
            <div className="test-card fade-up" style={{ transitionDelay: '0.1s' }}>
              <span className="test-quote-mark">"</span>
              <div className="test-stars"><span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span></div>
              <p className="test-text">Did a great job and understood all the requirements without back-and-forth. Fast turnaround, clean edits, and the motion graphics were insane. Highly recommend.</p>
              <div className="test-author"><div className="test-avatar">P</div><div><div className="test-name">Peter</div><div className="test-role">Manager, Digital Brand</div></div></div>
            </div>
            <div className="test-card fade-up" style={{ transitionDelay: '0.2s' }}>
              <span className="test-quote-mark">"</span>
              <div className="test-stars"><span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span></div>
              <p className="test-text">Jacob was wonderful to work with. Professional, creative, and always on deadline. The color grading on my videos looked absolutely cinematic. 10 out of 10.</p>
              <div className="test-author"><div className="test-avatar">J</div><div><div className="test-name">Jane</div><div className="test-role">CEO, Influencer Brand</div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* HIRE ME SECTION */}
      <section id="hire-me">
        <div className="hire-content">
          <div className="hire-left fade-up">
            <div className="section-label">Contact</div>
            <h2 className="hire-title">HIRE<br/><em>ME</em></h2>
            <p className="hire-subtitle">Let’s work together and grow your content</p>
            <p className="hire-desc">Available for freelance video editing projects.</p>
            
            <div className="hire-contact">
              <a href="mailto:xxxx@gamik.com" className="contact-item">
                <Mail /> xxxx@gamik.com
              </a>
              <a href="tel:xxxxxxxxxx" className="contact-item">
                <Phone /> xxxxxxxxxx
              </a>
            </div>

            <div className="social-links">
              {/* Replace with actual link */}
              <a href="#" className="social-link" aria-label="Discord">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
              </a>
              {/* Replace with actual link */}
              <a href="#" className="social-link" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* Replace with actual link */}
              <a href="#" className="social-link" aria-label="X (Twitter)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              </a>
            </div>

            <a href="mailto:xxxx@gamik.com" className="btn-primary" style={{ width: 'fit-content' }}>
              Start a Project
            </a>
            <p className="hire-trust">👉 Fast response • Professional work • Reliable delivery</p>
          </div>
          
          <div className="hire-right fade-up" style={{ transitionDelay: '0.15s' }}>
            <div className="hire-image-wrapper">
              <div className="hire-image-inner">
                <img src="/images/creator.jpg" alt="Jacob - Video Editor" />
                <div className="hire-image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-brand">Jacob<span>.</span></div>
        <div className="footer-copy">&#169; 2025 Jacob &#8212; Video Editor. All rights reserved.</div>
      </footer>
    </>
  );
}

export default App;