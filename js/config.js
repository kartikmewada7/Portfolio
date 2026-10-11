/**
 * PORTFOLIO CONFIGURATION DATA - KARTIK MEWADA
 * Updated with real projects, certificates, skills, and social handles.
 */
window.PORTFOLIO_CONFIG = {
  developer: {
    name: "Kartik Mewada",
    title: "Software Developer & Cloud Engineer",
    tagline: "Building high-performance web applications, computer vision & AI systems, and scalable cloud-deployed architectures.",
    location: "India • Available Worldwide / Remote",
    email: "kartikmewada7@gmail.com",
    status: "Open to Software Engineering Roles & Opportunities",
    resumeUrl: "#",
    stats: [
      { label: "Production Apps", value: "2", suffix: " Live" },
      { label: "Certified Credentials", value: "3", suffix: "x" },
      { label: "Cloud Platforms", value: "5", suffix: "+" },
      { label: "Core Tech Languages", value: "6", suffix: "+" }
    ],
    social: {
      github: "https://github.com/kartikmewada7",
      linkedin: "https://in.linkedin.com/in/kartik-mewada-6a8077331",
      email: "mailto:kartikmewada7@gmail.com"
    }
  },

  // 2 REAL FEATURED PROJECTS
  projects: [
    {
      id: "project-foodie-express",
      title: "Foodie Express",
      subtitle: "Full-Stack Fast Food Delivery & Restaurant Ordering Platform",
      category: "Full-Stack Web App • Cloudflare Workers",
      featured: true,
      badge: "Live on Cloudflare",
      description: "A fast, responsive food delivery application engineered for seamless restaurant browsing, instant menu exploration, interactive cart ordering, and lightning-fast edge delivery hosted on Cloudflare Workers edge network.",
      metrics: [
        { label: "Edge Host", value: "Cloudflare" },
        { label: "Performance", value: "Sub-50ms" },
        { label: "Architecture", value: "Serverless" },
        { label: "Stack", value: "JS / CSS / HTML" }
      ],
      tags: ["JavaScript", "HTML5", "CSS3", "Cloudflare Workers", "Edge Deployment", "REST APIs"],
      links: {
        demo: "https://swing.kartikmewada168.workers.dev",
        github: "https://github.com/kartikmewada7/swing",
        docs: "#"
      },
      architecture: [
        "Serverless global edge execution via Cloudflare Workers for ultra-low latency",
        "Dynamic cart management & checkout workflow with responsive mobile UI",
        "Modular JavaScript architecture with optimized client-side asset caching",
        "Cross-browser responsive layout styled with modern CSS flexbox & grid"
      ]
    },
    {
      id: "project-attendai",
      title: "AttendAI",
      subtitle: "AI-Powered Face Recognition Attendance Management System",
      category: "Computer Vision & Cloud App • Railway",
      featured: true,
      badge: "Live on Railway",
      description: "An automated biometric attendance management system utilizing deep learning and computer vision to identify faces in real-time, authenticate records, and log attendance into databases with high accuracy and zero manual intervention.",
      metrics: [
        { label: "Cloud Deployment", value: "Railway" },
        { label: "Model Type", value: "Facial CV" },
        { label: "Detection Speed", value: "Real-Time" },
        { label: "Database", value: "SQL / SQLite" }
      ],
      tags: ["Python", "Computer Vision", "Machine Learning", "SQL", "Railway Cloud", "REST API", "HTML/CSS"],
      links: {
        demo: "https://attend-production-bbb7.up.railway.app",
        github: "https://github.com/kartikmewada7/Attend",
        docs: "#"
      },
      architecture: [
        "Real-time face detection & facial embedding extraction pipeline in Python",
        "Automated attendance registration and timestamp logging into structured SQL database",
        "Containerized cloud deployment on Railway with persistent state management",
        "Secure admin dashboard for managing attendee records, logs, and analytics"
      ]
    }
  ],

  // 3 REAL INDUSTRY CERTIFICATES
  certificates: [
    {
      id: "cert-deloitte-forage",
      title: "Deloitte Australia - Data Analytics Job Simulation",
      issuer: "Deloitte Australia (via Forage)",
      issueDate: "Verified Credential",
      expiryDate: "Lifetime",
      credentialId: "FORAGE-DELOITTE-DATA-ANALYTICS",
      credentialUrl: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_6a2301e0ca3b5dbb3ac2d1f0_1780733979834_completion_certificate.pdf",
      shortUrlLabel: "theforage.com/certificate/deloitte",
      badgeColor: "emerald",
      skills: ["Data Analytics", "Forensic Data Analysis", "Tableau & Dashboards", "Statistical Modeling", "Client Reporting"],
      description: "Practical simulation covering enterprise data analytics, forensic data investigation, telemetry analysis, and presenting executive findings for Deloitte Australia.",
      status: "Verified & Issued",
      issuerBadgeSvg: "deloitte"
    },
    {
      id: "cert-aws-academy",
      title: "AWS Academy Graduate - Cloud Foundations - Training Badge",
      issuer: "Amazon Web Services (AWS Academy) • Credly",
      issueDate: "Verified Credential",
      expiryDate: "Lifetime",
      credentialId: "CREDLY-AWS-ACADEMY-FOUNDATIONS",
      credentialUrl: "https://www.credly.com/badges/6f672811-b63a-4799-8930-c81b60fc9730",
      shortUrlLabel: "credly.com/badges/aws-academy",
      badgeColor: "gold",
      skills: ["AWS Cloud Architecture", "Cloud Security & IAM", "Compute (EC2, Lambda)", "Storage (S3, EBS)", "Networking & VPC", "Cloud Economics"],
      description: "Demonstrates comprehensive foundational understanding of AWS Cloud computing concepts, security, architecture, pricing, and cloud infrastructure operations.",
      status: "Active on Credly",
      issuerBadgeSvg: "aws"
    },
    {
      id: "cert-python-ml",
      title: "Python for Machine Learning Training",
      issuer: "Spoken Tutorial Project (IIT Bombay) • NMEICT",
      issueDate: "Verified Participant",
      expiryDate: "Lifetime",
      credentialId: "IITB-ST-169149-4532631",
      credentialUrl: "https://spoken-tutorial.org/software-training/test/participant/certificate/169149/4532631/",
      shortUrlLabel: "spoken-tutorial.org/cert/169149",
      badgeColor: "blue",
      skills: ["Python Programming", "Machine Learning Algorithms", "NumPy & Pandas", "Data Visualization", "Model Training & Evaluation"],
      description: "Official certification by the Spoken Tutorial Project at IIT Bombay validating core competency in Python programming, numerical data processing, and machine learning model training.",
      status: "Verified Credential",
      issuerBadgeSvg: "python"
    }
  ],

  // REAL SKILLS MATRIX: Languages, Cloud Platforms, Web & Data
  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "JavaScript", level: 92, icon: "⚡" },
        { name: "Python", level: 90, icon: "🐍" },
        { name: "C++", level: 86, icon: "⚙️" },
        { name: "SQL", level: 88, icon: "🗄️" },
        { name: "HTML5 & Modern CSS3", level: 95, icon: "🎨" }
      ]
    },
    {
      category: "Cloud & Deployment Platforms",
      items: [
        { name: "AWS (Amazon Web Services)", level: 88, icon: "☁️" },
        { name: "Google Cloud Platform (GCP)", level: 82, icon: "🌐" },
        { name: "Cloudflare (Workers & Edge)", level: 90, icon: "⚡" },
        { name: "Railway Cloud", level: 92, icon: "🚂" },
        { name: "Render Cloud Hosting", level: 88, icon: "🚀" }
      ]
    },
    {
      category: "Software & Systems Engineering",
      items: [
        { name: "Machine Learning & CV", level: 85, icon: "👁️" },
        { name: "RESTful API Engineering", level: 90, icon: "🔌" },
        { name: "Data Analytics & Querying", level: 88, icon: "📊" },
        { name: "Responsive UI & Three.js 3D", level: 89, icon: "✨" },
        { name: "Git Version Control & CI/CD", level: 90, icon: "🐙" }
      ]
    }
  ]
};
