import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { CONTACT_INFO, SKILLS_DATA, HERO_IMAGE } from '../constants';

const SEO: React.FC = () => {
  const { language, t, isRTL } = useLanguage();

  // Dynamic Content based on Language
  const title = language === 'ar' 
    ? 'المهندس عامر الوحش | مطور ويب شامل (Full Stack Developer)'
    : 'Amer Alwahsh | Full Stack Web Developer';
    
  const description = language === 'ar'
    ? 'الموقع الشخصي للمهندس عامر الوحش، مطور برمجيات متخصص في بناء تطبيقات الويب الحديثة باستخدام React, Node.js وأحدث التقنيات. تواصل معي لبناء مشروعك القادم.'
    : 'Professional portfolio of Eng. Amer Alwahsh, a Full Stack Developer specializing in modern web applications using React, Node.js, and cloud technologies.';

  const keywords = language === 'ar'
    ? 'عامر الوحش, مبرمج, مطور ويب, الأردن, React, Node.js, تصميم مواقع, برمجة تطبيقات'
    : 'Amer Alwahsh, Full Stack Developer, Web Developer Jordan, React Expert, Node.js, Software Engineer, Portfolio';

  const siteUrl = 'https://amer-alwahsh.com'; // Replace with actual domain if available
  const fullName = language === 'ar' ? 'عامر الوحش' : 'Amer Alwahsh';

  // Structured Data (JSON-LD) for Google Knowledge Graph
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Amer Alwahsh",
    "alternateName": "عامر الوحش",
    "url": siteUrl,
    "image": HERO_IMAGE,
    "jobTitle": "Full Stack Web Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance / Independent"
    },
    "description": description,
    "email": CONTACT_INFO.email,
    "telephone": CONTACT_INFO.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Amman",
      "addressCountry": "Jordan"
    },
    "sameAs": [
      CONTACT_INFO.social.linkedin,
      CONTACT_INFO.social.github,
      CONTACT_INFO.social.twitter,
      CONTACT_INFO.social.instagram
    ],
    "knowsAbout": SKILLS_DATA.flatMap(cat => cat.items)
  };

  return (
    <Helmet>
      {/* General Meta Tags */}
      <html lang={language} dir={isRTL ? 'rtl' : 'ltr'} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={fullName} />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={HERO_IMAGE} />
      <meta property="og:locale" content={language === 'ar' ? 'ar_AR' : 'en_US'} />
      <meta property="og:site_name" content={fullName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={HERO_IMAGE} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;