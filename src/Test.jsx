import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Dumbbell, Brain, TrendingUp, Shield, Zap, Users, ChevronRight, Menu, X, ArrowRight, Star, Check, Play } from 'lucide-react';

const Test = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'apps', 'why', 'coming', 'testimonials'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const testimonials = [
    { quote: 'SoulWhispers helped me find calm in chaos. It\'s like therapy in my pocket.', author: 'Ayesha R.', location: 'Karachi', rating: 5 },
    { quote: 'GymKey has transformed how I manage my gym. My members love the convenience.', author: 'Imran M.', location: 'Gym Owner, Lahore', rating: 5 },
    { quote: 'The integration between apps is seamless. It\'s everything I need in one place.', author: 'Sarah K.', location: 'Islamabad', rating: 5 }
  ];

  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '200+', label: 'Partner Gyms' },
    { value: '1M+', label: 'Workouts Tracked' },
    { value: '98%', label: 'Satisfaction Rate' }
  ];

  const features = [
    { icon: Heart, title: 'Integrated Wellness', desc: 'Physical, mental, and emotional health in one ecosystem' },
    { icon: Sparkles, title: 'AI-Driven Personalization', desc: 'Smart recommendations tailored to your goals' },
    { icon: TrendingUp, title: 'Scalable for Providers', desc: 'From boutique studios to national gym chains' },
    { icon: Shield, title: 'Built for the Future', desc: 'Cloud-native, mobile-first, and privacy-conscious' }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden'
    },
    nav: {
      position: 'fixed',
      width: '100%',
      zIndex: 40,
      transition: 'all 0.5s',
      background: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      boxShadow: scrolled ? '0 10px 40px rgba(168, 85, 247, 0.1)' : 'none',
      padding: scrolled ? '12px 0' : '16px 0'
    },
    navInner: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s'
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 'bold',
      background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px'
    },
    navLink: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#d1d5db',
      cursor: 'pointer',
      position: 'relative',
      transition: 'color 0.3s',
      background: 'none',
      border: 'none'
    },
    navLinkActive: {
      color: '#a855f7'
    },
    button: {
      background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
      padding: '10px 24px',
      borderRadius: '9999px',
      fontSize: '14px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      color: 'white'
    },
    hero: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px'
    },
    heroContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 24px',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(168, 85, 247, 0.1)',
      border: '1px solid rgba(168, 85, 247, 0.2)',
      borderRadius: '9999px',
      padding: '8px 24px',
      marginBottom: '32px',
      backdropFilter: 'blur(4px)'
    },
    h1: {
      fontSize: '72px',
      fontWeight: 'bold',
      marginBottom: '24px',
      lineHeight: '1.1',
      background: 'linear-gradient(90deg, #e9d5ff 0%, #fbcfe8 50%, #e9d5ff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '200% 200%',
      animation: 'gradient-shift 3s ease infinite'
    },
    subtitle: {
      fontSize: '24px',
      color: '#d1d5db',
      marginBottom: '16px',
      maxWidth: '768px',
      margin: '0 auto 16px'
    },
    description: {
      fontSize: '18px',
      color: '#9ca3af',
      marginBottom: '48px',
      maxWidth: '672px',
      margin: '0 auto 48px',
      lineHeight: '1.6'
    },
    buttonGroup: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    buttonPrimary: {
      background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
      padding: '16px 32px',
      borderRadius: '9999px',
      fontSize: '18px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    buttonSecondary: {
      border: '2px solid rgba(168, 85, 247, 0.5)',
      padding: '14px 32px',
      borderRadius: '9999px',
      fontSize: '18px',
      fontWeight: '600',
      background: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.3s',
      color: 'white'
    },
    statsGrid: {
      marginTop: '80px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '32px'
    },
    statItem: {
      textAlign: 'center',
      cursor: 'pointer'
    },
    statValue: {
      fontSize: '48px',
      fontWeight: 'bold',
      background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '8px',
      transition: 'transform 0.3s'
    },
    statLabel: {
      color: '#9ca3af',
      fontSize: '14px'
    },
    section: {
      padding: '96px 0',
      position: 'relative'
    },
    sectionInner: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 24px'
    },
    h2: {
      fontSize: '56px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '64px',
      background: 'linear-gradient(90deg, #e9d5ff 0%, #fbcfe8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    aboutText: {
      maxWidth: '1024px',
      margin: '0 auto',
      textAlign: 'center',
      fontSize: '18px',
      color: '#d1d5db',
      lineHeight: '1.8',
      marginBottom: '24px'
    },
    highlight: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#d8b4fe',
      marginTop: '24px'
    },
    appsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
      gap: '32px'
    },
    appCard: {
      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '32px',
      border: '1px solid rgba(168, 85, 247, 0.2)',
      transition: 'all 0.5s',
      cursor: 'pointer'
    },
    appIcon: {
      width: '64px',
      height: '64px',
      background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      transition: 'transform 0.3s',
      boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
      animation: 'pulse-glow 2s ease-in-out infinite'
    },
    appTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    appSubtitle: {
      fontSize: '18px',
      color: '#d8b4fe',
      marginBottom: '24px'
    },
    appDescription: {
      color: '#d1d5db',
      marginBottom: '24px',
      lineHeight: '1.6'
    },
    featuresList: {
      marginBottom: '32px'
    },
    featuresTitle: {
      fontWeight: '600',
      color: '#d8b4fe',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '8px',
      color: '#d1d5db',
      transition: 'transform 0.3s'
    },
    appButton: {
      width: '100%',
      background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
      padding: '12px',
      borderRadius: '12px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px'
    },
    featureCard: {
      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(168, 85, 247, 0.2)',
      transition: 'all 0.5s',
      cursor: 'pointer'
    },
    featureIcon: {
      width: '48px',
      height: '48px',
      background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px',
      transition: 'transform 0.3s'
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '8px',
      transition: 'color 0.3s'
    },
    featureDesc: {
      color: '#9ca3af',
      transition: 'color 0.3s'
    },
    comingCard: {
      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '48px',
      border: '1px solid rgba(168, 85, 247, 0.3)',
      transition: 'all 0.5s'
    },
    comingGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    comingItem: {
      background: 'rgba(168, 85, 247, 0.1)',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid rgba(168, 85, 247, 0.2)',
      transition: 'all 0.3s',
      cursor: 'pointer'
    },
    testimonialContainer: {
      position: 'relative',
      maxWidth: '1024px',
      margin: '0 auto'
    },
    testimonialCard: {
      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '48px',
      border: '1px solid rgba(168, 85, 247, 0.2)',
      overflow: 'hidden',
      position: 'relative'
    },
    testimonialContent: {
      transition: 'all 0.7s',
      opacity: 1
    },
    stars: {
      display: 'flex',
      justifyContent: 'center',
      gap: '4px',
      marginBottom: '24px'
    },
    quote: {
      fontSize: '28px',
      color: '#e9d5ff',
      marginBottom: '32px',
      textAlign: 'center',
      lineHeight: '1.6',
      fontWeight: '300'
    },
    author: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px'
    },
    authorAvatar: {
      width: '64px',
      height: '64px',
      background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    dots: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginTop: '32px'
    },
    dot: {
      width: '12px',
      height: '12px',
      borderRadius: '9999px',
      background: 'rgba(168, 85, 247, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.3s',
      border: 'none'
    },
    dotActive: {
      width: '48px',
      background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)'
    },
    navButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '48px',
      height: '48px',
      background: 'rgba(168, 85, 247, 0.2)',
      backdropFilter: 'blur(20px)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(168, 85, 247, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    ctaSection: {
      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '64px',
      border: '1px solid rgba(168, 85, 247, 0.3)',
      textAlign: 'center'
    },
    benefits: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '32px',
      fontSize: '14px',
      color: '#9ca3af',
      marginTop: '32px'
    },
    benefit: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    footer: {
      padding: '48px 0',
      borderTop: '1px solid rgba(168, 85, 247, 0.2)',
      position: 'relative'
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '48px',
      marginBottom: '32px'
    },
    footerLinks: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    footerLink: {
      color: '#9ca3af',
      cursor: 'pointer',
      transition: 'color 0.3s',
      background: 'none',
      border: 'none',
      textAlign: 'left',
      fontSize: '14px'
    },
    socialLinks: {
      display: 'flex',
      gap: '16px',
      marginTop: '16px'
    },
    socialButton: {
      width: '40px',
      height: '40px',
      background: 'rgba(168, 85, 247, 0.1)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(168, 85, 247, 0.2)',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    scrollTop: {
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      width: '48px',
      height: '48px',
      background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 40px rgba(168, 85, 247, 0.5)',
      cursor: 'pointer',
      transition: 'all 0.3s',
      border: 'none',
      zIndex: 40,
      opacity: scrolled ? 1 : 0,
      pointerEvents: scrolled ? 'auto' : 'none'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
        }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .apps-grid { grid-template-columns: 1fr !important; }
          h1 { font-size: 48px !important; }
          h2 { font-size: 36px !important; }
        }
      `}</style>

      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo} onClick={() => scrollToSection('home')}>
            <div style={styles.logoIcon}>
              <Heart size={24} />
            </div>
            <span style={styles.logoText}>Wellnex</span>
          </div>

          <div style={styles.navLinks} className="nav-links">
            {['About', 'Apps', 'Why Wellnex', 'Coming Soon'].map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(['about', 'apps', 'why', 'coming'][idx])}
                style={{
                  ...styles.navLink,
                  ...(activeSection === ['about', 'apps', 'why', 'coming'][idx] ? styles.navLinkActive : {})
                }}
                onMouseEnter={(e) => e.target.style.color = '#a855f7'}
                onMouseLeave={(e) => e.target.style.color = activeSection === ['about', 'apps', 'why', 'coming'][idx] ? '#a855f7' : '#d1d5db'}
              >
                {item}
              </button>
            ))}
            <button 
              style={styles.button}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 10px 40px rgba(168, 85, 247, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      <section id="home" style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>
            <Sparkles size={16} color="#d8b4fe" />
            <span style={{ color: '#d8b4fe', fontSize: '14px' }}>Wellness, Reimagined</span>
          </div>

          <h1 style={styles.h1}>Wellnex Systems</h1>
          
          <p style={styles.subtitle}>
            Wellness, Reimagined for the Next Generation
          </p>
          
          <p style={styles.description}>
            A unified digital ecosystem empowering individuals, gyms, and wellness providers through cutting-edge HealthTech and fitness innovation.
          </p>

          <div style={styles.buttonGroup}>
            <button 
              style={styles.buttonPrimary}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(168, 85, 247, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>Join the Movement</span>
              <ArrowRight size={20} />
            </button>
            <button 
              style={styles.buttonSecondary}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.borderColor = '#a855f7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
              }}
            >
              Explore Our Apps
            </button>
          </div>

          <div style={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                style={styles.statItem}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('div').style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('div').style.transform = 'scale(1)';
                }}
              >
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.h2}>Where Wellness Meets What's Next</h2>
          <p style={styles.aboutText}>
            At Wellnex Systems, we believe the future of health and fitness lies in intelligent, integrated, and deeply human-centered technology. Born from the fusion of "Wellness" and "Next," our platform is designed to elevate how people connect with their bodies, minds, and communities—anytime, anywhere.
          </p>
          <p style={styles.highlight}>
            We're not just building apps. We're building a movement.
          </p>
        </div>
      </section>

      <section id="apps" style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.h2}>Our Flagship Apps</h2>

          <div style={styles.appsGrid} className="apps-grid">
            <div 
              style={styles.appCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(168, 85, 247, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
              }}
            >
              <div style={styles.appIcon}>
                <Brain size={32} />
              </div>
              
              <h3 style={styles.appTitle}>SoulWhispers</h3>
              <p style={styles.appSubtitle}>Your Pocket-Sized Wellness Companion</p>
              
              <p style={styles.appDescription}>
                SoulWhispers is a mindfulness and emotional wellness app designed to help users reconnect with their inner calm. Through guided meditations, reflective journaling, and AI-powered mood tracking, SoulWhispers nurtures mental clarity and emotional resilience in a fast-paced world.
              </p>

              <div style={styles.featuresList}>
                <div style={styles.featuresTitle}>
                  <Sparkles size={16} />
                  Key Features:
                </div>
                {['Telehealth and diagnostics', 'Mood journaling with AI insights', 'Personalized providers', 'Seamless booking & check-in for consultation sessions'].map((feature, idx) => (
                  <div 
                    key={idx} 
                    style={styles.featureItem}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(8px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                  >
                    <Check size={20} color="#d8b4fe" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                style={styles.appButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(168, 85, 247, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>Download SoulWhispers</span>
                <ArrowRight size={20} />
              </button>
            </div>

            <div 
              style={styles.appCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(236, 72, 153, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
              }}
            >
              <div style={styles.appIcon}>
                <Dumbbell size={32} />
              </div>
              
              <h3 style={styles.appTitle}>GymKey</h3>
              <p style={styles.appSubtitle}>Smart Access to Fitness, Anytime</p>
              
              <p style={styles.appDescription}>
                GymKey is your digital passport to fitness freedom. Whether you're a gym owner or a fitness enthusiast, GymKey connects users with partner gyms, tracks workouts, and simplifies access—all from a single app.
              </p>

              <div style={styles.featuresList}>
                <div style={styles.featuresTitle}>
                  <Sparkles size={16} />
                  Key Features:
                </div>
                {['Seamless check-in at partner gyms', 'Workout tracking and performance analytics', 'Membership management for gym owners', 'Real-time class schedules and bookings'].map((feature, idx) => (
                  <div 
                    key={idx} 
                    style={styles.featureItem}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(8px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                  >
                    <Check size={20} color="#fbcfe8" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                style={{...styles.appButton, background: 'linear-gradient(90deg, #ec4899 0%, #a855f7 100%)'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(236, 72, 153, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>Explore GymKey</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="why" style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.h2}>Why Wellnex?</h2>

          <div style={styles.featuresGrid}>
            {features.map((item, idx) => (
              <div 
                key={idx}
                style={styles.featureCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(168, 85, 247, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)';
                  e.currentTarget.querySelector('.feature-icon').style.transform = 'scale(1.1) rotate(12deg)';
                  e.currentTarget.querySelector('.feature-title').style.color = '#d8b4fe';
                  e.currentTarget.querySelector('.feature-desc').style.color = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                  e.currentTarget.querySelector('.feature-icon').style.transform = 'scale(1) rotate(0deg)';
                  e.currentTarget.querySelector('.feature-title').style.color = 'white';
                  e.currentTarget.querySelector('.feature-desc').style.color = '#9ca3af';
                }}
              >
                <div style={styles.featureIcon} className="feature-icon">
                  <item.icon size={24} />
                </div>
                <h3 style={styles.featureTitle} className="feature-title">{item.title}</h3>
                <p style={styles.featureDesc} className="feature-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="coming" style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.comingCard}>
            <h2 style={{...styles.h2, textAlign: 'left', marginBottom: '24px'}}>What's Coming Next</h2>
            
            <p style={{...styles.aboutText, textAlign: 'left', fontSize: '20px', marginBottom: '32px'}}>
              We're building a unified Wellnex Platform that brings together fitness, nutrition, mental health, and diagnostics into a single intelligent dashboard. Whether you're a user, trainer, or clinic—Wellnex will be your digital wellness command center.
            </p>

            <div style={styles.comingGrid}>
              {[
                { icon: Zap, title: 'Wearable Integration', desc: 'Sync with your favorite devices' },
                { icon: Heart, title: 'Nutrition & Meal Planning', desc: 'Personalized diet recommendations' },
                { icon: Users, title: 'Corporate Wellness', desc: 'Dashboards for organizations' }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  style={styles.comingItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                  }}
                >
                  <item.icon size={32} color="#d8b4fe" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '14px' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <button 
              style={styles.buttonPrimary}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(168, 85, 247, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>Get Early Access</span>
              <Play size={20} />
            </button>
          </div>
        </div>
      </section>

      <section id="testimonials" style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.h2}>What Our Users Say</h2>

          <div style={styles.testimonialContainer}>
            <div style={styles.testimonialCard}>
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.testimonialContent,
                    opacity: currentTestimonial === idx ? 1 : 0,
                    position: currentTestimonial === idx ? 'relative' : 'absolute',
                    top: 0,
                    left: 0,
                    right: 0
                  }}
                >
                  <div style={styles.stars}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={24} color="#fbbf24" fill="#fbbf24" />
                    ))}
                  </div>
                  
                  <div style={{ fontSize: '64px', textAlign: 'center', color: '#d8b4fe', marginBottom: '16px' }}>"</div>
                  <p style={styles.quote}>
                    {testimonial.quote}
                  </p>
                  
                  <div style={styles.author}>
                    <div style={styles.authorAvatar}>
                      {testimonial.author.charAt(0)}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ fontWeight: '600', fontSize: '18px' }}>{testimonial.author}</p>
                      <p style={{ fontSize: '14px', color: '#9ca3af' }}>{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.dots}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  style={{
                    ...styles.dot,
                    ...(currentTestimonial === idx ? styles.dotActive : {})
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              style={{...styles.navButton, left: '-24px'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.4)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronRight size={24} style={{ transform: 'rotate(180deg)' }} />
            </button>

            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              style={{...styles.navButton, right: '-24px'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.4)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.ctaSection}>
            <h2 style={{...styles.h2, marginBottom: '24px'}}>Stay Connected</h2>
            <p style={{...styles.aboutText, marginBottom: '32px', maxWidth: '672px'}}>
              Be the first to experience the full Wellnex platform and join thousands of users transforming their wellness journey.
            </p>
            
            <div style={styles.buttonGroup}>
              <button 
                style={styles.buttonPrimary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(168, 85, 247, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>Join Our Waitlist</span>
                <ArrowRight size={20} />
              </button>
              <button 
                style={styles.buttonSecondary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = '#a855f7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                }}
              >
                Contact Us
              </button>
            </div>

            <div style={styles.benefits}>
              {['No credit card required', 'Early access perks', 'Priority support'].map((benefit, idx) => (
                <div key={idx} style={styles.benefit}>
                  <Check size={16} color="#d8b4fe" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.sectionInner}>
          <div style={styles.footerGrid}>
            <div>
              <div style={styles.logo}>
                <div style={styles.logoIcon}>
                  <Heart size={24} />
                </div>
                <span style={styles.logoText}>Wellnex</span>
              </div>
              <p style={{ color: '#9ca3af', margin: '16px 0' }}>Empowering Wellness Through Technology</p>
              <div style={styles.socialLinks}>
                {['twitter', 'facebook', 'instagram', 'linkedin'].map((social, idx) => (
                  <button
                    key={idx}
                    style={styles.socialButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                    }}
                  >
                    <div style={{ width: '20px', height: '20px', background: '#d8b4fe', borderRadius: '50%' }}></div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#d8b4fe' }}>Quick Links</h3>
              <div style={styles.footerLinks}>
                {['About Us', 'Our Apps', 'Careers', 'Blog', 'Press Kit'].map((link, idx) => (
                  <button
                    key={idx}
                    style={styles.footerLink}
                    onMouseEnter={(e) => e.target.style.color = '#d8b4fe'}
                    onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#d8b4fe' }}>Get In Touch</h3>
              <div style={{ color: '#9ca3af', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📧</span>
                  <a href="mailto:info@wellnexsystems.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                    info@wellnexsystems.com
                  </a>
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🌐</span>
                  <a href="https://www.wellnexsystems.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                    www.wellnexsystems.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(168, 85, 247, 0.2)', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              © 2025 Wellnex Systems. All rights reserved. Built with ❤️ for wellness enthusiasts worldwide.
            </p>
          </div>
        </div>
      </footer>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={styles.scrollTop}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(168, 85, 247, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 10px 40px rgba(168, 85, 247, 0.5)';
        }}
      >
        <ChevronRight size={24} style={{ transform: 'rotate(-90deg)' }} />
      </button>
    </div>
  );
};

export default Test;