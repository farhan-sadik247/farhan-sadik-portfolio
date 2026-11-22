export type Project = {
  id: number;
  title: string;
  category: string | string[];
  description: string;
  image: string;
  techStack: string[];
  github: string;
  live: string;
};

export const categories = ["All", "Featured", "Frontend", "Full Stack", "Healthcare", "Database"];

export const projectsData: Project[] = [
  {
    id: 15,
    title: "codeWithFarhan",
    category: ["Full Stack", "Featured"],
    description: "A full-stack Python Learning Platform designed for structured course delivery, coding practice, and progress tracking. It features role-based Admin, Teacher, and Student dashboards, course and lesson management, coding homeworks with Monaco Editor, Python code execution, automated test-case grading, submissions, and student progress tracking.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1790000737/python-learning-website_gfjg6d.png",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Prisma", "PostgreSQL", "Supabase", "Python", "Monaco Editor", "Node.js", "Vercel"],
    github: "https://github.com/farhan-sadik247/python-learning-platform",
    live: "https://codewithfarhan.vercel.app/"
  },
  {
    id: 1,
    title: "Academic Journal Publish Website",
    category: ["Full Stack", "Featured"],
    description: "Built a full-stack academic journal platform supporting end-to-end workflow: submission → peer review → editorial decision → copyediting → publication. Integrated Google OAuth with role-based access and promotion system. Enabled real-time manuscript tracking, email notifications, and manual payment processing via bank transfer.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1790943687/journal_website_wg44zr.png",
    techStack: ["Next.js", "MongoDB", "TypeScript", "NextAuth.js", "SCSS"],
    github: "https://github.com/farhan-sadik247/journalWebsite.git",
    live: "https://gjadt.vercel.app/"
  },
  {
    id: 5,
    title: "Shoe Bay - AI Shoe Assistant",
    category: ["Full Stack", "Featured"],
    description: "A conversational e-commerce web app for discovering and buying shoes that combines classic product browsing with an AI shopping assistant. Features include AI-powered search and recommendations, comprehensive shoe catalog, and cart functionality.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1790943687/shoe-bay_bgvmyg.png",
    techStack: ["Next.js", "React", "TypeScript", "MongoDB", "NextAuth", "Gemini AI", "SCSS"],
    github: "https://github.com/farhan-sadik247/ai-ecommerce-chatbot",
    live: "https://shoe-bay247.vercel.app/"
  },
  {
    id: 2,
    title: "Tailor Maven",
    category: "Full Stack",
    description: "Developed an online tailoring platform with 3D suit previews, real-time customization using React Three Fiber, and live chat. Integrated Stripe payment gateway and OAuth2.0 login system for secure and seamless transactions.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708790/tailor_gpbqbw.png",
    techStack: ["MERN Stack", "Stripe", "Socket.io", "React Three Fiber"],
    github: "https://github.com/farhan-sadik247/TailorMaven.git",
    live: "https://tailor-maven-app.vercel.app/"
  },
  {
    id: 3,
    title: "Neeramoy Digital Services Ltd.",
    category: "Healthcare",
    description: "Implemented scheduled push notifications, backend validation, REST API integrations, Google Analytics 4, and enhancements to the clinic attendant module while contributing to healthcare web applications built with Angular, Python, Firebase, and AWS Lambda.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784709397/neeramoy_hik3yq.png",
    techStack: ["Angular", "Python", "Firebase", "AWS Lambda", "REST APIs"],
    github: "https://github.com/farhan-sadik247",
    live: "https://neeramoy.com/"
  },
  {
    id: 4,
    title: "Missing Link",
    category: "Full Stack",
    description: "Developed a decentralized application (DApp) for reporting, tracking, and assisting in finding missing individuals. Enabled public case visibility and secure on-chain reporting with smart contracts on Ethereum.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708783/missing-link_hsyqqw.jpg",
    techStack: ["Solidity", "React.js", "Web3.js", "Truffle", "Docker"],
    github: "https://github.com/farhan-sadik247/missing-person.git",
    live: ""
  },
  {
    id: 6,
    title: "Dua - Islamic Supplications Website",
    category: "Frontend",
    description: "A modern web application for browsing, learning, and managing Islamic duas. Features include a fully functional categories sidebar, context-aware dua cards, and a complete admin dashboard for CRUD operations.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784711443/dua_cyv8av.png",
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "SQLite", "Node.js"],
    github: "https://github.com/farhan-sadik247/Dua---Islamic-Supplications-Website.git",
    live: "https://dua-pori.vercel.app/"
  },
  {
    id: 7,
    title: "Disease Diagnosis & Symptom Checker",
    category: ["Healthcare", "Database"],
    description: "A comprehensive full-stack web application for exploring 395+ diseases and checking symptoms. Features an intelligent AI-powered symptom matching system, advanced filtering, and a medical-grade user interface.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784711443/disease_jnb3bj.png",
    techStack: ["React 18", "TypeScript", "Vite", "Django", "SQLite", "SCSS"],
    github: "https://github.com/farhan-sadik247/diseaseDiagonose",
    live: "https://diseasediagonose.vercel.app/"
  },
  {
    id: 8,
    title: "Education Platform Website",
    category: "Full Stack",
    description: "Created an e-learning platform inspired by BUX, allowing teachers to upload and manage content. Implemented secure user roles for students and instructors. Enabled enrollment system and dashboard for viewing lectures and progress.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708783/edu_bv0gdn.png",
    techStack: ["React.js", "Django", "PostgreSQL"],
    github: "https://github.com/farhan-sadik247/EducationPlatForm-Frontend",
    live: ""
  },
  {
    id: 9,
    title: "Snake Game",
    category: "Frontend",
    description: "A classic Snake game built with Python and Pygame featuring modern graphics and smooth gameplay mechanics. Includes beautiful brick-style borders, multiple game states, real-time scoring system, responsive controls with arrow keys.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708783/snakeGame_ixleu2.png",
    techStack: ["Python", "Pygame"],
    github: "https://github.com/farhan-sadik247/snakeGame_Python",
    live: ""
  },
  {
    id: 10,
    title: "Mini Design Editor App",
    category: "Frontend",
    description: "Built a cross-platform mobile design editor with canvas rendering via Skia, enabling real-time drawing and manipulation. Integrated gesture-based interactions (drag, pinch, zoom) using Gesture Handler and smooth 60fps animations with Reanimated.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784709879/design-editor_vvmvxs.png",
    techStack: ["React Native", "Expo", "TypeScript", "Skia", "Reanimated"],
    github: "https://github.com/farhan-sadik247/dragNdrop_editorApp.git",
    live: "https://tinyurl.com/DragNDrop2o"
  },
  {
    id: 11,
    title: "Calculator Website",
    category: "Frontend",
    description: "SadikCalc is a sleek and functional scientific calculator application designed to handle both basic arithmetic and advanced mathematical operations. Supports features such as trigonometric functions, logarithmic and exponential operations, constants like π and e.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708782/calc_eltav4.png",
    techStack: ["MERN Stack", "Node.js", "Tailwind CSS"],
    github: "https://github.com/farhan-sadik247/calculator-app.git",
    live: "https://calcsdk.netlify.app/"
  },
  {
    id: 12,
    title: "House Rental Website",
    category: "Full Stack",
    description: "Designed a city-specific rental platform with searchable listings and booking functionality. Implemented an admin panel to manage property data and access control. Focused on ease-of-use for individuals relocating to Dhaka.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708785/tolet_fugpxb.png",
    techStack: ["Django", "SQLite", "HTML/CSS"],
    github: "https://github.com/farhan-sadik247/House-Rental-Website.git",
    live: ""
  },
  {
    id: 13,
    title: "BD Medicine Database",
    category: ["Full Stack", "Database"],
    description: "A comprehensive Next.js web application for searching and browsing medicines and drugs available in Bangladesh. Features advanced search with full-text search across medicine names, generic names, manufacturers, and categories.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708782/bdmedicine_pnq77j.png",
    techStack: ["Next.js", "React 19", "TypeScript", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/farhan-sadik247/bdmedicine_database",
    live: "https://bdmedicine.vercel.app/"
  },
  {
    id: 14,
    title: "Age Calculator & Health Hub",
    category: ["Healthcare", "Frontend"],
    description: "A comprehensive health and wellness application that calculates exact age with precision and provides personalized health insights. Features include personalized BMI analysis, custom diet plans, health tips tailored to user needs.",
    image: "https://res.cloudinary.com/dupf4kmfg/image/upload/v1784708782/ageCalc_x0mqos.png",
    techStack: ["Next.js", "React", "TypeScript", "SCSS", "jsPDF"],
    github: "https://github.com/farhan-sadik247/age-calculator",
    live: "https://age-health-calculator.vercel.app/"
  }
];
