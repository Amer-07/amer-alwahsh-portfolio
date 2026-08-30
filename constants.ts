import { Project, SkillCategory } from './types';

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqqnkyb";

// Change this URL to your own profile image
export const HERO_IMAGE = "/img/photo_1.jpg";

export const CONTACT_INFO = {
  email: "ameralwahsh07@gmail.com",
  phone: "00962782238169",
  location: "عمان، الأردن",
  locationEn: "Amman, Jordan",
  social: {
    linkedin: "https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3BdfK6XmpBThuyurZ%2BnvqTTg%3D%3D",
    github: "https://github.com/Amer-07",
    twitter: "https://twitter.com/amer-alwahsh",
    instagram: "https://www.instagram.com/_a07_/",
    whatsapp: "https://wa.me/962782238169"
  }
};

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Frontend Development",
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "HTML5/CSS3"]
  },
  {
    category: "Backend Development",
    items: ["Node.js", "Express", "NestJS", "Python", "REST APIs", "GraphQL"]
  },
  {
    category: "Database & DevOps",
    items: ["PostgreSQL", "MongoDB", "Docker", "AWS", "Git/GitHub", "CI/CD"]
  }
];

export const PROJECTS_DATA = {
  ar: [
    {
      id: 1,
      title: "منصة وإدارة نادي KILLZER للفنون القتالية",
      description: "منصة ويب سحابية متكاملة لإدارة الأكاديميات الرياضية، تشمل واجهة تفاعلية مع لوحات تحكم مخصصة للإدارة، المدربين، واللاعبين، مع نظام إدارة الاشتراكات والحضور وقواعد بيانات فورية على Firebase.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Framer Motion"],
      imageUrl: "/img/killzer_logo.png",
      demoUrl: "https://killzer.com/",
      repoUrl: "https://github.com/Amer-07/killzer-fight-club-web"
    },
    {
      id: 2,
      title: "تصميم واجهة ويب متكاملة",
      description: "مشروع تطبيقي يبرز مهاراتي في تحويل التصاميم إلى صفحات ويب تفاعلية باستخدام تقنيات CSS الحديثة. يتضمن المشروع أقساماً متعددة مثل معرض الأعمال، جداول الأسعار، ونماذج التواصل، مع الالتزام التام بمعايير الويب القياسية وهيكلة الكود البرمجي الصحيحة.",
      tags: ["HTML", "CSS"],
      imageUrl: "/img/photo_2.jpg",
      demoUrl: "https://amer-07.github.io/project_1/",
      repoUrl: "https://github.com/Amer-07/project_1.git"
    },
  ] as Project[],
  en: [
    {
      id: 1,
      title: "KILLZER Fight Club Web App",
      description: "A full-featured cloud web platform for martial arts academy management. Features a public landing page, interactive Admin, Coach, and Player dashboards with real-time Firebase Firestore, subscription tracking, and attendance management.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Framer Motion"],
      imageUrl: "/img/killzer_logo.png",
      demoUrl: "https://killzer.com/",
      repoUrl: "https://github.com/Amer-07/killzer-fight-club-web"
    },
    {
      id: 2,
      title: "Full Web Interface Design",
      description: "A practical project highlighting my skills in converting designs into interactive web pages using modern CSS techniques. It features multiple sections like portfolio, pricing tables, and contact forms, with full adherence to web standards and proper semantic HTML structure.",
      tags: ["HTML", "CSS"],
      imageUrl: "/img/photo_2.jpg",
      demoUrl: "https://amer-07.github.io/project_1/",
      repoUrl: "https://github.com/Amer-07/project_1.git"
    },
  ] as Project[]
};

export const CONTENT = {
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من أنا',
      skills: 'المهارات',
      projects: 'المشاريع',
      contact: 'تواصل معي'
    },
    hero: {
      welcome: "أهلاً بك في موقعي الشخصي",
      name: "المهندس عامر الوحش",
      title: "Full Stack Web Developer",
      tagline: "تحويل الأفكار إلى واقع رقمي متكامل",
      description: "مبرمج شغوف متخصص في بناء تطبيقات الويب الحديثة والمواقع الإلكترونية عالية الأداء. أجمع بين جمال التصميم وقوة البرمجة لتقديم حلول تقنية تخدم أهدافك.",
      ctaProject: "شاهد أعمالي",
      ctaContact: "تواصل معي"
    },
    about: {
      title: "من أنا",
      // Unified concise bio instead of separate sections
      bioTitle: "شغف تقني، وحلول عملية.",
      bio: "مطور برمجيات Full Stack متخصص في بناء حلول رقمية تجمع بين الأداء العالي والتصميم الذكي. لا أكتب الكود لمجرد الكتابة، بل لبناء أنظمة تخدم أهدافك وتنمو مع طموحك. أركز على التفاصيل الدقيقة التي تصنع الفرق بين الموقع العادي والتجربة الاستثنائية.",
      stats: [
        { label: "سنوات خبرة", value: "+2" },
        { label: "مشاريع ناجحة", value: "10" },
        { label: "عملاء سعداء", value: "10" },
      ]
    },
    skills: {
      title: "مهاراتي التقنية",
      subtitle: "أدوات وتقنيات أستخدمها لصناعة تجارب رقمية استثنائية"
    },
    projects: {
      title: "أعمال مميزة"
    },
    contact: {
      title: "تواصل معي",
      subtitle: "هل لديك مشروع في ذهنك؟ دعنا نحوله إلى واقع.",
      infoTitle: "معلومات الاتصال",
      infoDesc: "أنا متاح للعمل الحر والمشاريع الخاصة. تواصل معي عبر النموذج أو من خلال قنوات الاتصال المباشرة.",
      labels: {
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        location: "الموقع",
        namePlaceholder: "اسمك الكريم",
        emailPlaceholder: "example@domain.com",
        msgPlaceholder: "كيف يمكنني مساعدتك؟",
        submit: "إرسال الرسالة",
        submitting: "جاري الإرسال...",
        success: "تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.",
        error: "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.",
        nameLabel: "الاسم",
        emailLabel: "البريد الإلكتروني",
        messageLabel: "الرسالة"
      }
    },
    footer: {
      rights: "جميع الحقوق محفوظة."
    },
    raad: {
      title: "المساعد رعد ⚡",
      subtitle: "مساعد مبيعات ذكي",
      welcome: "أهلاً يا غالي! 👋 أنا رعد، المساعد الشخصي للمهندس عامر الوحش. كيف بقدر أساعدك تبني موقع أحلامك اليوم؟",
      placeholder: "اسأل رعد...",
      typing: "رعد بيكتب..."
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Me',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      welcome: "Welcome to my portfolio",
      name: "Engineer Amer Al-Wahsh",
      title: "Full Stack Web Developer",
      tagline: "Turning ideas into integrated digital reality",
      description: "Passionate developer specializing in building modern web applications and high-performance websites. I combine design aesthetics with coding power to deliver technical solutions that serve your goals.",
      ctaProject: "View My Work",
      ctaContact: "Contact Me"
    },
    about: {
      title: "About Me",
      bioTitle: "Technical Passion, Practical Solutions.",
      bio: "A Full Stack Developer dedicated to building digital solutions that combine high performance with intelligent design. I don't just write code; I build systems that serve your goals and grow with your ambition. I focus on the intricate details that make the difference between an ordinary website and an exceptional experience.",
      stats: [
        { label: "Years Experience", value: "+2" },
        { label: "Successful Projects", value: "10" },
        { label: "Happy Clients", value: "10" },
      ]
    },
    skills: {
      title: "Technical Skills",
      subtitle: "Tools and technologies I use to create exceptional digital experiences"
    },
    projects: {
      title: "Featured Work"
    },
    contact: {
      title: "Contact Me",
      subtitle: "Have a project in mind? Let's turn it into reality.",
      infoTitle: "Contact Information",
      infoDesc: "I am available for freelance work and special projects. Contact me via the form or direct communication channels.",
      labels: {
        email: "Email",
        phone: "Phone",
        location: "Location",
        namePlaceholder: "Your Name",
        emailPlaceholder: "example@domain.com",
        msgPlaceholder: "How can I help you?",
        submit: "Send Message",
        submitting: "Sending...",
        success: "Message sent successfully! I'll be in touch soon.",
        error: "An error occurred. Please try again.",
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Message"
      }
    },
    footer: {
      rights: "All rights reserved."
    },
    raad: {
      title: "Raad Assistant ⚡",
      subtitle: "Smart Sales Assistant",
      welcome: "Hello there! 👋 I'm Raad, Engineer Amer Al-Wahsh's personal assistant. How can I help you build your dream website today?",
      placeholder: "Ask Raad...",
      typing: "Raad is typing..."
    }
  }
};