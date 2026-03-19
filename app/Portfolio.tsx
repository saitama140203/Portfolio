"use client";

import React, { useState, createContext, useContext } from "react";
import {
    Github,
    Linkedin,
    Download,
    Mail,
    MapPin,
    Phone,
    Code,
    Cpu,
    Server
} from "lucide-react";

// ----------------------------------------------------------------------
// 1. DICTIONARIES & I18N SETUP
// ----------------------------------------------------------------------

const translations = {
    en: {
        nav: { about: "About", skills: "Skills", experience: "Experience", projects: "Projects" },
        hero: {
            name: "Le The Phu",
            role: "AI Engineer",
            summary: "AI Engineer focusing on Computer Vision and Applied Deep Learning. Passionate about building practical vision systems and optimizing model inference. Experienced with FastAPI, Docker, and modern AI pipelines.",
            downloadCV: "Download CV",
            github: "GitHub",
            linkedin: "LinkedIn"
        },
        skills: {
            title: "Technical Skills",
            programming: "Programming",
            aiml: "AI / ML",
            backendMlops: "Backend & MLOps",
            programmingList: ["Python", "JavaScript", "Next.js", "CSS/Tailwind"],
            aimlList: ["PyTorch", "OpenCV", "HuggingFace", "LangChain", "YOLO"],
            backendMlopsList: ["FastAPI", "Docker", "Git", "Linux", "PostgreSQL", "SQL Server"]
        },
        experience: {
            title: "Experience",
            jobs: [
                {
                    company: "Rikai Technology",
                    period: "09/2025 – Present",
                    role: "AI Engineer",
                    description: "Developed fine-grained Computer Vision systems for counterfeit luxury watch detection using ViT and ConvNeXt. Built AI Ad Planner data pipelines and interactive Next.js dashboards. Focused on model optimization and real-time backend services."
                },
                {
                    company: "SafeHorizons",
                    period: "02/2025 – 06/2025",
                    role: "Software Intern",
                    description: "Developed real-time IoT monitoring dashboards with FastAPI and WebSockets. Implemented edge device telemetry and secure RBAC access portals."
                },
                {
                    company: "FPT Software",
                    period: "08/2024 – 11/2024",
                    role: "AI Intern",
                    description: "Created an AI-driven meeting summarization pipeline with Whisper and Transformer models. Optimized inference latency with quantization and batching."
                }
            ]
        },
        projects: {
            title: "Featured Projects",
            list: [
                {
                    name: "EduScan",
                    description: "Automated exam grading system using YOLOv12 and OpenCV for multiple-choice alignment and scoring.",
                    tech: ["FastAPI", "YOLOv12", "OpenCV", "PostgreSQL"]
                },
                {
                    name: "AI Ad Planner",
                    description: "Data warehouse and analytics platform for AI-driven advertising campaign planning and reporting.",
                    tech: ["FastAPI", "Next.js", "SQL"]
                },
                {
                    name: "AIoT Monitor",
                    description: "Real-time telemetry monitoring platform for IoT edge devices with WebSocket streaming.",
                    tech: ["FastAPI", "WebSocket", "Docker"]
                }
            ]
        },
        footer: {
            contact: "Contact Information",
        }
    },
    vi: {
        nav: { about: "Giới thiệu", skills: "Kỹ năng", experience: "Kinh nghiệm", projects: "Dự án" },
        hero: {
            name: "Lê Thế Phú",
            role: "Kỹ sư AI",
            summary: "Kỹ sư AI chuyên về Computer Vision và Applied Deep Learning. Đam mê xây dựng các hệ thống thị giác máy tính thực tiễn và tối ưu hóa suy luận mô hình. Có kinh nghiệm triển khai với FastAPI, Docker và các pipeline AI hiện đại.",
            downloadCV: "Tải CV",
            github: "GitHub",
            linkedin: "LinkedIn"
        },
        skills: {
            title: "Kỹ năng Chuyên môn",
            programming: "Lập trình",
            aiml: "Trí tuệ Nhân tạo / Học máy",
            backendMlops: "Backend & MLOps",
            programmingList: ["Python", "JavaScript", "Next.js", "CSS/Tailwind"],
            aimlList: ["PyTorch", "OpenCV", "HuggingFace", "LangChain", "YOLO"],
            backendMlopsList: ["FastAPI", "Docker", "Git", "Linux", "PostgreSQL", "SQL Server"]
        },
        experience: {
            title: "Kinh nghiệm Làm việc",
            jobs: [
                {
                    company: "Rikai Technology",
                    period: "09/2025 – Hiện tại",
                    role: "Kỹ sư AI",
                    description: "Phát triển hệ thống nhận diện chi tiết (fine-grained) để phát hiện đồng hồ xa xỉ giả bằng ViT và ConvNeXt. Xây dựng data pipeline và dashboard Next.js tương tác cho hệ thống AI Ad Planner. Tập trung vào tối ưu hóa suy luận thuật toán và dịch vụ backend."
                },
                {
                    company: "SafeHorizons",
                    period: "02/2025 – 06/2025",
                    role: "Thực tập sinh Phần mềm",
                    description: "Phát triển dashboard giám sát IoT theo thời gian thực sử dụng FastAPI và WebSockets. Xây dựng luồng dữ liệu truyền xa biên và cổng truy cập an toàn."
                },
                {
                    company: "FPT Software",
                    period: "08/2024 – 11/2024",
                    role: "Thực tập sinh AI",
                    description: "Xây dựng pipeline tóm tắt cuộc họp ứng dụng AI, sử dụng mô hình Whisper và Transformer. Tối ưu độ trễ thông qua lượng tử hóa (quantization) và gộp lô (batching)."
                }
            ]
        },
        projects: {
            title: "Dự án Tiêu biểu",
            list: [
                {
                    name: "EduScan",
                    description: "Hệ thống tự động chấm điểm bài thi trắc nghiệm ứng dụng YOLOv12 và OpenCV để căn chỉnh và tính điểm.",
                    tech: ["FastAPI", "YOLOv12", "OpenCV", "PostgreSQL"]
                },
                {
                    name: "AI Ad Planner",
                    description: "Kho dữ liệu và nền tảng phân tích phục vụ lập kế hoạch và báo cáo chiến dịch quảng cáo được AI tối ưu.",
                    tech: ["FastAPI", "Next.js", "SQL"]
                },
                {
                    name: "AIoT Monitor",
                    description: "Nền tảng giám sát thông số từ xa theo thời gian thực cho thiết bị IoT ứng dụng giao thức WebSocket.",
                    tech: ["FastAPI", "WebSocket", "Docker"]
                }
            ]
        },
        footer: {
            contact: "Thông tin Liên hệ",
        }
    }
};

type Language = "en" | "vi";

// Create Context for unified Dictionary access
const I18nContext = createContext<{
    lang: Language;
    setLang: (l: Language) => void;
    t: typeof translations.en;
}>({
    lang: "en",
    setLang: () => { },
    t: translations.en,
});

const useI18n = () => useContext(I18nContext);

// ----------------------------------------------------------------------
// 2. REUSABLE COMPONENTS
// ----------------------------------------------------------------------

const Header = () => {
    const { lang, setLang, t } = useI18n();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    LTP.AI
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
                    <a href="#about" className="hover:text-purple-400 transition-colors">{t.nav.about}</a>
                    <a href="#skills" className="hover:text-purple-400 transition-colors">{t.nav.skills}</a>
                    <a href="#experience" className="hover:text-purple-400 transition-colors">{t.nav.experience}</a>
                    <a href="#projects" className="hover:text-purple-400 transition-colors">{t.nav.projects}</a>
                </nav>

                {/* Language Toggle */}
                <div className="flex items-center gap-2 bg-neutral-900 rounded-full p-1 border border-neutral-800">
                    <button
                        onClick={() => setLang("en")}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === "en" ? "bg-purple-600 text-white" : "text-neutral-500 hover:text-white"
                            }`}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => setLang("vi")}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === "vi" ? "bg-purple-600 text-white" : "text-neutral-500 hover:text-white"
                            }`}
                    >
                        VI
                    </button>
                </div>
            </div>
        </header>
    );
};

const Hero = () => {
    const { t } = useI18n();

    return (
        <section id="about" className="pt-32 pb-20 px-6 container mx-auto">
            <div className="max-w-3xl">
                <h2 className="text-purple-500 font-mono text-sm mb-4 tracking-wider uppercase">
                    {t.hero.role}
                </h2>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                    {t.hero.name}
                </h1>
                <p className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed max-w-2xl">
                    {t.hero.summary}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                    <a href="/cv.pdf" download className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
                        <Download size={18} />
                        {t.hero.downloadCV}
                    </a>
                    <a href="https://github.com/saitama140203" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 px-6 py-3 rounded-lg transition-colors">
                        <Github size={18} />
                        {t.hero.github}
                    </a>
                    <a href="https://linkedin.com/in/saitama140203" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 px-6 py-3 rounded-lg transition-colors">
                        <Linkedin size={18} />
                        {t.hero.linkedin}
                    </a>
                </div>
            </div>
        </section>
    );
};

const Skills = () => {
    const { t } = useI18n();

    const skillCategories = [
        { title: t.skills.programming, icon: <Code size={24} className="text-blue-400" />, skills: t.skills.programmingList },
        { title: t.skills.aiml, icon: <Cpu size={24} className="text-purple-400" />, skills: t.skills.aimlList },
        { title: t.skills.backendMlops, icon: <Server size={24} className="text-cyan-400" />, skills: t.skills.backendMlopsList },
    ];

    return (
        <section id="skills" className="py-20 px-6 container mx-auto border-t border-neutral-900">
            <h3 className="text-3xl font-bold mb-12">{t.skills.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skillCategories.map((category, idx) => (
                    <div key={idx} className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl hover:border-purple-500/30 transition-colors">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                                {category.icon}
                            </div>
                            <h4 className="text-lg font-semibold">{category.title}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, i) => (
                                <span key={i} className="bg-neutral-950 text-neutral-300 border border-neutral-800 px-3 py-1.5 rounded-md text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Experience = () => {
    const { t } = useI18n();

    return (
        <section id="experience" className="py-20 px-6 container mx-auto border-t border-neutral-900">
            <h3 className="text-3xl font-bold mb-12">{t.experience.title}</h3>
            <div className="space-y-12 max-w-4xl border-l border-neutral-800 ml-3 pl-8 relative">
                {t.experience.jobs.map((job, idx) => (
                    <div key={idx} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full bg-neutral-950 border-2 border-purple-500"></div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                            <h4 className="text-xl font-bold text-neutral-100">{job.role}</h4>
                            <span className="text-sm font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full w-fit">
                                {job.period}
                            </span>
                        </div>
                        <div className="text-blue-400 font-medium mb-4">{job.company}</div>
                        <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                            {job.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Projects = () => {
    const { t } = useI18n();

    return (
        <section id="projects" className="py-20 px-6 container mx-auto border-t border-neutral-900">
            <h3 className="text-3xl font-bold mb-12">{t.projects.title}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {t.projects.list.map((project, idx) => (
                    <div key={idx} className="group bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-900 transition-all hover:-translate-y-1 relative overflow-hidden">
                        {/* Ambient neon effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>

                        <h4 className="text-xl font-bold mb-3">{project.name}</h4>
                        <p className="text-neutral-400 text-sm mb-6 flex-grow leading-relaxed">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((tag, i) => (
                                <span key={i} className="text-xs font-mono text-blue-300 bg-blue-500/10 px-2 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Footer = () => {
    const { t } = useI18n();

    return (
        <footer className="border-t border-neutral-900 bg-neutral-950 py-12">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                        LTP.AI
                    </h2>
                    <p className="text-sm text-neutral-500">{t.footer.contact}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 text-sm text-neutral-400">
                    <a href="mailto:lethephu.140203@gmail.com" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                        <Mail size={16} /> lethephu.140203@gmail.com
                    </a>
                    <span className="flex items-center gap-2">
                        <Phone size={16} /> +84 837 253 685
                    </span>
                    <span className="flex items-center gap-2">
                        <MapPin size={16} /> Da Nang, Vietnam
                    </span>
                </div>
            </div>
        </footer>
    );
};

// ----------------------------------------------------------------------
// 3. MAIN APP MODULE
// ----------------------------------------------------------------------

export default function PortfolioApp() {
    const [lang, setLang] = useState<Language>("en");
    const t = translations[lang];

    return (
        <I18nContext.Provider value={{ lang, setLang, t }}>
            <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-purple-500/30 scroll-smooth">
                <Header />
                <main>
                    <Hero />
                    <Skills />
                    <Experience />
                    <Projects />
                </main>
                <Footer />
            </div>
        </I18nContext.Provider>
    );
}
