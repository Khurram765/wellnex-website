import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Dumbbell, Brain, TrendingUp, Shield, Zap, Users, ChevronRight, Menu, X, ArrowRight, Star, Check, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const App = () => {
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
      
      const sections = ['home', 'about', 'apps', 'why', 'coming', 'testimonials', 'connect'];
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
      overflowX: 'hidden',
      position: 'relative'
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
      // lineHeight: '1.1',
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
      cursor: 'pointer',
      padding: '16px',
      background: 'rgba(168, 85, 247, 0.1)',
      borderRadius: '12px',
      transition: 'all 0.3s'
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
      marginBottom: '24px',
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
      marginTop: '24px',
      textAlign:'center'
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
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
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
      transition: 'all 0.5s',
      position: 'relative',
      overflow: 'hidden'
    },
    comingGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    comingItem: {
      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid rgba(168, 85, 247, 0.2)',
      transition: 'all 0.3s',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
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
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
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
      color:'white',
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
    },
    mobileMenu: {
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100vh',
      width: '300px',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(20px)',
      padding: '80px 24px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      zIndex: 50,
      transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease-in-out'
    },
    hamburger: {
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      zIndex: 50
    }
  };

  return (<div style={styles.container}>
        <style>{`
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
            50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @media (max-width: 768px) {
            .nav-links { display: none !important; }
            .apps-grid { grid-template-columns: 1fr !important; }
            h1 { font-size: 48px !important; }
            h2 { font-size: 36px !important; }
            .hamburger { display: block !important; }
          }
        `}</style>

        <nav style={styles.nav}>
          <div style={styles.navInner}>
            <motion.div 
              style={styles.logo} 
              onClick={() => scrollToSection('home')}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                style={styles.logoIcon}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart size={24} />
              </motion.div>
              <span style={styles.logoText}>Wellnex</span>
            </motion.div>

            <div style={styles.navLinks} className="nav-links">
              {['About', 'Apps', 'Why Wellnex', 'Coming Soon'].map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => scrollToSection(['about', 'apps', 'why', 'coming'][idx])}
                  style={{
                    ...styles.navLink,
                    ...(activeSection === ['about', 'apps', 'why', 'coming'][idx] ? styles.navLinkActive : {})
                  }}
                  whileHover={{ scale: 1.1, color: '#a855f7' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
              <motion.button 
                style={styles.button}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(168, 85, 247, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Join Waitlist
              </motion.button>
            </div>

            <motion.button 
              style={{...styles.hamburger, display: 'none'}} 
              className="hamburger" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
            </motion.button>
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              style={styles.mobileMenu}
            >
              {['Home', 'About', 'Apps', 'Why Wellnex', 'Coming Soon', 'Testimonials', 'Connect'].map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => scrollToSection(['home', 'about', 'apps', 'why', 'coming', 'testimonials', 'connect'][idx])}
                  style={{
                    ...styles.navLink,
                    fontSize: '18px',
                    textAlign: 'left'
                  }}
                  whileHover={{ scale: 1.05, color: '#a855f7' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
              <motion.button 
                style={{...styles.button, width: '100%'}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Waitlist
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <section id="home" style={styles.hero}>
          <motion.div 
            style={styles.heroContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={styles.badge}
            >
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Sparkles size={16} color="#d8b4fe" />
              </motion.div>
              <span style={{ color: '#d8b4fe', fontSize: '14px' }}>Wellness, Reimagined</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              style={styles.h1}
            >Wellnex Systems</motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={styles.subtitle}
            >
              Wellness, Reimagined for the Next Generation
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={styles.description}
            >
              A unified digital ecosystem empowering individuals, gyms, and wellness providers through cutting-edge HealthTech and fitness innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={styles.buttonGroup}
            >
              <motion.button 
                style={styles.buttonPrimary}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(168, 85, 247, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Join the Movement</span>
                <ArrowRight size={20} />
              </motion.button>
              <motion.button 
                style={styles.buttonSecondary}
                whileHover={{ scale: 1.05, background: 'rgba(168, 85, 247, 0.1)', borderColor: '#a855f7' }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Our Apps
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={styles.statsGrid}
            >
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  style={styles.statItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.1, boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)' }}
                >
                  <motion.div 
                    style={styles.statValue}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >{stat.value}</motion.div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="about" style={styles.section}>
          <div style={styles.sectionInner}>
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={styles.h2}
            >Where Wellness Meets What's Next</motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={styles.aboutText}
            >
              At Wellnex Systems, we believe the future of health and fitness lies in intelligent, integrated, and deeply human-centered technology. Born from the fusion of "Wellness" and "Next," our platform is designed to elevate how people connect with their bodies, minds, and communities—anytime, anywhere.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={styles.highlight}
            >
              We're not just building apps. We're building a movement.
            </motion.p>
          </div>
        </section>

        <section id="apps" style={styles.section}>
          <div style={styles.sectionInner}>
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={styles.h2}
            >Our Flagship Apps</motion.h2>

            <div style={styles.appsGrid} className="apps-grid">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={styles.appCard}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(168, 85, 247, 0.3)' }}
              >
                <motion.div 
                  style={styles.appIcon}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Brain size={32} />
                </motion.div>
                
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
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      style={styles.featureItem}
                    >
                      <Check size={20} color="#d8b4fe" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button 
                  style={styles.appButton}
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(168, 85, 247, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Download SoulWhispers</span>
                  <ArrowRight size={20} />
                </motion.button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={styles.appCard}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(236, 72, 153, 0.3)' }}
              >
                <motion.div 
                  style={styles.appIcon}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Dumbbell size={32} />
                </motion.div>
                
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
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      style={styles.featureItem}
                    >
                      <Check size={20} color="#fbcfe8" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button 
                  style={{...styles.appButton, background: 'linear-gradient(90deg, #ec4899 0%, #a855f7 100%)'}}
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(236, 72, 153, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore GymKey</span>
                  <ArrowRight size={20} />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="why" style={styles.section}>
          <div style={styles.sectionInner}>
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={styles.h2}
            >Why Wellnex?</motion.h2>

            <div style={styles.featuresGrid}>
              {features.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  style={styles.featureCard}
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(168, 85, 247, 0.3)' }}
                >
                  <motion.div 
                    style={styles.featureIcon} 
                    className="feature-icon"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  >
                    <item.icon size={24} />
                  </motion.div>
                  <h3 style={styles.featureTitle} className="feature-title">{item.title}</h3>
                  <p style={styles.featureDesc} className="feature-desc">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="coming" style={styles.section}>
          <div style={styles.sectionInner}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={styles.comingCard}
            >
              <motion.h2 
                style={{...styles.h2, textAlign: 'left', marginBottom: '24px'}}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >What's Coming Next</motion.h2>
              
              <motion.p 
                style={{...styles.aboutText, textAlign: 'left', fontSize: '20px',margin:'0', marginBottom: '32px'}}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                We're building a unified Wellnex Platform that brings together fitness, nutrition, mental health, and diagnostics into a single intelligent dashboard. Whether you're a user, trainer, or clinic—Wellnex will be your digital wellness command center.
              </motion.p>

              <div style={styles.comingGrid}>
                {[
                  { icon: Zap, title: 'Wearable Integration', desc: 'Sync with your favorite devices' },
                  { icon: Heart, title: 'Nutrition & Meal Planning', desc: 'Personalized diet recommendations' },
                  { icon: Users, title: 'Corporate Wellness', desc: 'Dashboards for organizations' }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, duration: 0.6 }}
                    style={styles.comingItem}
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)' }}
                  >
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <item.icon size={32} color="#d8b4fe" style={{ marginBottom: '12px' }} />
                    </motion.div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{item.title}</h3>
                    <p style={{ color: '#9ca3af', fontSize: '14px' }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={styles.buttonPrimary}
              >
                <span>Get Early Access</span>
                <Play size={20} />
              </motion.button>
            </motion.div>
          </div>
        </section>

        <section id="testimonials" style={styles.section}>
          <div style={styles.sectionInner}>
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={styles.h2}
            >What Our Users Say</motion.h2>

            <div style={styles.testimonialContainer}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={styles.testimonialCard}
              >
                <AnimatePresence mode="wait">
                  {testimonials.map((testimonial, idx) => (
                    currentTestimonial === idx && (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        style={styles.testimonialContent}
                      >
                        <div style={styles.stars}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1, duration: 0.3 }}
                            >
                              <Star size={24} color="#fbbf24" fill="#fbbf24" />
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* <div style={{ fontSize: '64px', textAlign: 'center', color: '#d8b4fe', marginBottom: '16px' }}>"</div> */}
                        <p style={styles.quote}>
                          {testimonial.quote}
                        </p>
                        
                        <div style={styles.author}>
                          <motion.div 
                            style={styles.authorAvatar}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {testimonial.author.charAt(0)}
                          </motion.div>
                          <div style={{ textAlign: 'left' }}>
                            <p style={{ fontWeight: '600', fontSize: '18px' }}>{testimonial.author}</p>
                            <p style={{ fontSize: '14px', color: '#9ca3af' }}>{testimonial.location}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </motion.div>

              <div style={styles.dots}>
                {testimonials.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    style={{
                      ...styles.dot,
                      ...(currentTestimonial === idx ? styles.dotActive : {})
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                style={{...styles.navButton, left: '-24px'}}
                whileHover={{ scale: 1.1, background: 'rgba(168, 85, 247, 0.4)' }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} style={{ transform: 'rotate(180deg)' }} />
              </motion.button>

              <motion.button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                style={{...styles.navButton, right: '-24px'}}
                whileHover={{ scale: 1.1, background: 'rgba(168, 85, 247, 0.4)' }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
        </section>

        <section id="connect" style={styles.section}>
          <div style={styles.sectionInner}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={styles.ctaSection}
            >
              <motion.h2 
                style={{...styles.h2, marginBottom: '24px'}}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >Stay Connected</motion.h2>
              <motion.p 
                style={{...styles.aboutText, marginBottom: '32px', maxWidth: '672px'}}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Be the first to experience the full Wellnex platform and join thousands of users transforming their wellness journey.
              </motion.p>
              
              <motion.div 
                style={styles.buttonGroup}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(168, 85, 247, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  style={styles.buttonPrimary}
                >
                  <span>Join Our Waitlist</span>
                  <ArrowRight size={20} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, background: 'rgba(168, 85, 247, 0.1)', borderColor: '#a855f7' }}
                  whileTap={{ scale: 0.95 }}
                  style={styles.buttonSecondary}
                >
                  Contact Us
                </motion.button>
              </motion.div>

              <motion.div 
                style={styles.benefits}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {['No credit card required', 'Early access perks', 'Priority support'].map((benefit, idx) => (
                  <motion.div 
                    key={idx} 
                    style={styles.benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    <Check size={16} color="#d8b4fe" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <footer style={styles.footer}>
          <div style={styles.sectionInner}>
            <div style={styles.footerGrid}>
              <div>
                <motion.div 
                  style={styles.logo}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    style={styles.logoIcon}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart size={24} />
                  </motion.div>
                  <span style={styles.logoText}>Wellnex</span>
                </motion.div>
                <p style={{ color: '#9ca3af', margin: '16px 0' }}>Empowering Wellness Through Technology</p>
                {/* <div style={styles.socialLinks}>
                  {['twitter', 'facebook', 'instagram', 'linkedin'].map((social, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.1 }}
                      style={styles.socialButton}
                    >
                      <div style={{ width: '20px', height: '20px', background: '#d8b4fe', borderRadius: '50%' }}></div>
                    </motion.button>
                  ))}
                </div> */}
                <div style={styles.socialLinks}>
      {[<FaTwitter />, <FaFacebook />, <FaInstagram />, <FaLinkedin />].map((icon, idx) => (
        <motion.button
          key={idx}
          whileHover={{ scale: 1.1 }}
          style={styles.socialButton}
        >
          {icon}
        </motion.button>
      ))}
    </div>
              </div>

              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#d8b4fe' }}>Quick Links</h3>
                <div style={styles.footerLinks}>
                  {['About Us', 'Our Apps', 'Careers', 'Blog', 'Press Kit'].map((link, idx) => (
                    <motion.button
                      key={idx}
                      style={styles.footerLink}
                      whileHover={{ color: '#d8b4fe', x: 5 }}
                    >
                      {link}
                    </motion.button>
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

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={styles.scrollTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} style={{ transform: 'rotate(-90deg)' }} />
        </motion.button>
      </div>
      );
};
export default App;