import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { captureUTMsFromURL, clearTrackingAfterConversion } from './utils/tracking';
import feather from 'feather-icons';
import { translations, Language } from './i18n';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';
import Careers from './pages/Careers';
import Documentation from './pages/Documentation';
import HelpCenter from './pages/HelpCenter';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Roadmap from './pages/Roadmap';
import PostReading from './pages/PostReading';
import Pricing from './pages/Pricing';
import ContentPage from './pages/ContentPage';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import LoginModal from './components/LoginModal';

// Scroll to top and refresh icons on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    captureUTMsFromURL();
    // Add a small delay to ensure React has finished mounting components
    const timer = setTimeout(() => {
      feather.replace();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved as Language) || 'en';
  });

  const [isLightMode, setIsLightMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light';
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    // Expose feather globally for all components
    (window as any).feather = feather;

    // Lang persistence
    localStorage.setItem('lang', lang);

    // Theme application
    if (isLightMode) {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }

    // Update Favicons and Logos
    const mode = isLightMode ? 'clear_mode' : 'dark-mode';
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    const appleIcon = document.getElementById('apple-icon') as HTMLLinkElement;
    const manifest = document.getElementById('manifest') as HTMLLinkElement;

    if (favicon) favicon.href = `/assets/visual-identity/${mode}/favicon.ico`;
    if (appleIcon) appleIcon.href = `/assets/visual-identity/${mode}/apple-touch-icon.png`;
    if (manifest) manifest.href = `/assets/visual-identity/${mode}/site.webmanifest`;
  }, [isLightMode, lang]);

  // Separate effect for icons to avoid race conditions and nesting errors
  useEffect(() => {
    const timer = setTimeout(() => {
      feather.replace();
    }, 300);
    return () => clearTimeout(timer);
  }, [isLightMode, lang]);

  useEffect(() => {
    captureUTMsFromURL();
    clearTrackingAfterConversion();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Header
        lang={lang}
        setLang={setLang}
        isLightMode={isLightMode}
        toggleTheme={() => setIsLightMode(!isLightMode)}
        openLogin={() => setIsLoginOpen(true)}
      />

      <Routes>
        <Route path="/" element={<Home lang={lang} isLightMode={isLightMode} />} />
        <Route path="/how-it-works" element={<Home lang={lang} isLightMode={isLightMode} />} />
        <Route path="/benefits" element={<Home lang={lang} isLightMode={isLightMode} />} />
        <Route path="/for-who" element={<Home lang={lang} isLightMode={isLightMode} />} />
        <Route path="/testimonials" element={<Home lang={lang} isLightMode={isLightMode} />} />
        <Route path="/features" element={<Features lang={lang} isLightMode={isLightMode} />} />
        <Route path="/pricing" element={<Pricing lang={lang} isLightMode={isLightMode} />} />
        <Route path="/roadmap" element={<Roadmap lang={lang} isLightMode={isLightMode} />} />
        <Route path="/about" element={<About lang={lang} isLightMode={isLightMode} />} />
        <Route path="/blog" element={<Blog lang={lang} isLightMode={isLightMode} />} />
        <Route path="/blog/:slug" element={<PostReading lang={lang} isLightMode={isLightMode} />} />
        <Route path="/careers" element={<Careers lang={lang} isLightMode={isLightMode} />} />
        <Route path="/documentation" element={<Documentation lang={lang} isLightMode={isLightMode} />} />
        <Route path="/help-center" element={<HelpCenter lang={lang} isLightMode={isLightMode} />} />
        <Route path="/contact" element={<Contact lang={lang} isLightMode={isLightMode} />} />
        <Route path="/terms" element={<Terms lang={lang} isLightMode={isLightMode} />} />
        <Route path="/privacy" element={<Privacy lang={lang} isLightMode={isLightMode} />} />
        <Route path="*" element={<NotFound lang={lang} isLightMode={isLightMode} />} />
      </Routes>

      <Footer lang={lang} isLightMode={isLightMode} />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        lang={lang}
        isLightMode={isLightMode}
      />
    </Router>
  );
}

export default App;
