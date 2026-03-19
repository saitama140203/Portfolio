"use client";

import React, { useState, createContext, useContext, useEffect, useRef, useCallback } from "react";
import {
    Github,
    Linkedin,
    Download,
    Mail,
    MapPin,
    Phone,
    Code,
    Cpu,
    Server,
    X,
    FileText,
    Eye,
    ChevronDown,
    ExternalLink,
    Menu,
    XIcon,
} from "lucide-react";

// ======================================================================
// 1. DICTIONARIES & I18N SETUP
// ======================================================================

const translations = {
    en: {
        nav: { about: "About", skills: "Skills", experience: "Experience", projects: "Projects" },
        hero: {
            name: "Le The Phu",
            role: "AI Engineer",
            greeting: "Hello, I'm",
            summary:
                "AI Engineer focusing on Computer Vision and Applied Deep Learning. Passionate about building practical vision systems and optimizing model inference. Experienced with FastAPI, Docker, and modern AI pipelines.",
            downloadCV: "Download CV",
            previewCV: "Preview CV",
            github: "GitHub",
            linkedin: "LinkedIn",
            scrollDown: "Scroll to explore",
        },
        skills: {
            title: "Technical Skills",
            programming: "Programming",
            aiml: "AI / ML",
            backendMlops: "Backend & MLOps",
            programmingList: ["Python", "JavaScript", "Next.js", "Svelte"],
            aimlList: ["PyTorch", "OpenCV", "HuggingFace", "LangChain", "YOLO"],
            backendMlopsList: ["FastAPI", "Docker", "Git", "Linux", "PostgreSQL", "SQL Server"],
        },
        experience: {
            title: "Experience",
            jobs: [
                {
                    company: "Rikai Technology",
                    period: "09/2025 – Present",
                    role: "AI Engineer",
                    location: "Da Nang, Vietnam",
                    description:
                        "Developed fine-grained Computer Vision systems for counterfeit luxury watch detection using ViT and ConvNeXt. Built AI Ad Planner data pipelines and interactive Next.js dashboards. Focused on model optimization and real-time backend services.",
                },
                {
                    company: "SafeHorizons",
                    period: "02/2025 – 06/2025",
                    role: "Software Intern",
                    location: "Da Nang, Vietnam",
                    description:
                        "Developed real-time IoT monitoring dashboards with FastAPI and WebSockets. Implemented edge device telemetry and secure RBAC access portals.",
                },
                {
                    company: "FPT Software",
                    period: "08/2024 – 11/2024",
                    role: "AI Intern",
                    location: "Da Nang, Vietnam",
                    description:
                        "Created an AI-driven meeting summarization pipeline with Whisper and Transformer models. Optimized inference latency with quantization and batching.",
                },
            ],
        },
        projects: {
            title: "Featured Projects",
            viewProject: "View Details",
            viewMore: "Read more",
            viewLess: "Close",
            list: [
                {
                    name: "Luxury Auth",
                    subtitle: "Counterfeit Detection SDK & System",
                    shortDescription: "Production-grade SDK for luxury goods authentication using YOLO detection and ViT/ConvNeXt classifiers with multi-brand support.",
                    description:
                        "Production-grade SDK for luxury goods authentication. Built modular model registry with lazy-loading and caching for YOLO-based part detection + ViT/ConvNeXt fine-grained classifiers. Supports multi-brand (Rolex, LV, Omega) with part-level versioning (P00-P08). Integrated RedFrame IQA service (basic LIQE + advanced XGBoost mode) for image quality validation. Includes CLAHE/LoG preprocessing pipeline and Pydantic-validated schemas.\n\nKey components:\n- Model Package Registry: Dynamic model loading with lazy init and caching\n- Part-based versioning (P00-P08) with multiple model versions per part\n- RedFrame Service: Image quality assessment with basic (LIQE) and advanced (XGBoost) modes\n- Preprocessing pipeline: CLAHE, LoG filtering, brightness/contrast adjustment, white padding removal\n- Pydantic schemas for type-safe validation of detection and auth results",
                    tech: ["PyTorch", "YOLO", "ViT", "ConvNeXt", "FastAPI", "Pydantic", "XGBoost"],
                },
                {
                    name: "EduScan",
                    subtitle: "AI-Powered Exam Grading Platform",
                    shortDescription: "Full-stack automated exam grading system using YOLOv12 detection and OpenCV OMR for bubble recognition.",
                    description:
                        "Full-stack automated exam grading system. AI module uses YOLOv12 for answer sheet detection and OpenCV OMRChecker for bubble recognition and score calculation. Backend (FastAPI + PostgreSQL) handles exam management, real-time WebSocket SBD validation, and result analytics. Frontend built with TypeScript/Next.js featuring live camera capture, batch processing, and exportable grade reports.\n\nArchitecture:\n- AI Module: YOLOv12 answer sheet detection + OpenCV OMRChecker for bubble recognition\n- Backend: FastAPI + PostgreSQL with Alembic migrations, real-time WebSocket SBD validation\n- Frontend: TypeScript/Next.js with live camera capture and batch image processing\n- Deployment: Nginx reverse proxy + Docker containerization with manage-system.sh automation",
                    tech: ["YOLOv12", "OpenCV", "FastAPI", "PostgreSQL", "TypeScript", "Next.js", "WebSocket"],
                },
                {
                    name: "AI Ad Planner",
                    subtitle: "Advertising Analytics Platform",
                    shortDescription: "Data warehouse and analytics platform for AI-driven advertising campaign planning with interactive dashboards.",
                    description:
                        "Data warehouse and analytics platform for AI-driven advertising campaign planning. Designed ETL pipelines for multi-source ad data ingestion, built interactive Next.js dashboards with drill-down reporting, and implemented SQL-based campaign performance analytics with automated KPI tracking.\n\nFeatures:\n- ETL pipelines for multi-source advertising data ingestion and transformation\n- Next.js interactive dashboards with drill-down campaign reporting\n- SQL-based campaign performance analytics with automated KPI tracking\n- Data visualization with custom charts and real-time metric updates",
                    tech: ["FastAPI", "Next.js", "SQL", "Data Pipeline", "ETL"],
                },
                {
                    name: "AIoT Monitor",
                    subtitle: "Smart IoT Device Monitoring System",
                    shortDescription: "Enterprise IoT monitoring platform with RBAC, connection proxy, and AI anomaly detection for smart solutions.",
                    description:
                        "Enterprise IoT monitoring platform acting as a secure intermediary between operators and hub devices for smart house/factory solutions. Features RBAC authentication (JWT/OAuth2), Apache Guacamole connection proxy (SSH/VNC/RDP) with full command logging, AI-powered anomaly detection using Scikit-learn/PyTorch, and multi-database architecture.\n\nSystem Architecture:\n- Backend: FastAPI with SQLAlchemy ORM, JWT/OAuth2 authentication, RBAC authorization\n- Frontend: Vue.js 3 admin dashboard with real-time system status monitoring\n- Connection Proxy: Apache Guacamole (SSH/VNC/RDP) with full command and session logging\n- AI Module: Anomaly detection in user behavior using Scikit-learn/PyTorch\n- Databases: PostgreSQL (users/config) + InfluxDB (time-series telemetry) + Elasticsearch (logs)\n- Deployment: Docker & Kubernetes containerized microservices",
                    tech: ["FastAPI", "Vue.js", "PostgreSQL", "InfluxDB", "Docker", "Guacamole", "PyTorch"],
                },
            ],
        },
        footer: {
            contact: "Contact Information",
            copyright: "aPus.",
        },
        cvModal: {
            title: "CV Preview",
            close: "Close",
            download: "Download PDF",
        },
    },
    vi: {
        nav: { about: "Giới thiệu", skills: "Kỹ năng", experience: "Kinh nghiệm", projects: "Dự án" },
        hero: {
            name: "Lê Thế Phú",
            role: "Kỹ sư AI",
            greeting: "Xin chào, tôi là",
            summary:
                "Kỹ sư AI chuyên về Computer Vision và Applied Deep Learning. Đam mê xây dựng các hệ thống thị giác máy tính thực tiễn và tối ưu hóa suy luận mô hình. Có kinh nghiệm triển khai với FastAPI, Docker và các pipeline AI hiện đại.",
            downloadCV: "Tải CV",
            previewCV: "Xem trước CV",
            github: "GitHub",
            linkedin: "LinkedIn",
            scrollDown: "Cuộn để khám phá",
        },
        skills: {
            title: "Kỹ năng Chuyên môn",
            programming: "Lập trình",
            aiml: "Trí tuệ Nhân tạo / Học máy",
            backendMlops: "Backend & MLOps",
            programmingList: ["Python", "JavaScript", "Next.js", "Svelte"],
            aimlList: ["PyTorch", "OpenCV", "HuggingFace", "LangChain", "YOLO"],
            backendMlopsList: ["FastAPI", "Docker", "Git", "Linux", "PostgreSQL", "SQL Server"],
        },
        experience: {
            title: "Kinh nghiệm Làm việc",
            jobs: [
                {
                    company: "Rikai Technology",
                    period: "09/2025 – Hiện tại",
                    role: "Kỹ sư AI",
                    location: "Đà Nẵng, Việt Nam",
                    description:
                        "Phát triển hệ thống nhận diện chi tiết (fine-grained) để phát hiện đồng hồ xa xỉ giả bằng ViT và ConvNeXt. Xây dựng data pipeline và dashboard Next.js tương tác cho hệ thống AI Ad Planner.",
                },
                {
                    company: "SafeHorizons",
                    period: "02/2025 – 06/2025",
                    role: "Thực tập sinh Phần mềm",
                    location: "Đà Nẵng, Việt Nam",
                    description:
                        "Phát triển dashboard giám sát IoT theo thời gian thực sử dụng FastAPI và WebSockets. Xây dựng luồng dữ liệu truyền xa biên và cổng truy cập an toàn.",
                },
                {
                    company: "FPT Software",
                    period: "08/2024 – 11/2024",
                    role: "Thực tập sinh AI",
                    location: "Đà Nẵng, Việt Nam",
                    description:
                        "Xây dựng pipeline tóm tắt cuộc họp ứng dụng AI, sử dụng mô hình Whisper và Transformer. Tối ưu độ trễ thông qua lượng tử hóa (quantization) và gộp lô (batching).",
                },
            ],
        },
        projects: {
            title: "Dự án Tiêu biểu",
            viewProject: "Xem Chi tiết",
            viewMore: "Xem thêm",
            viewLess: "Đóng",
            list: [
                {
                    name: "Luxury Auth",
                    subtitle: "SDK & Hệ thống Phát hiện Hàng giả",
                    shortDescription: "SDK cấp production cho xác thực hàng xa xỉ sử dụng YOLO detection và ViT/ConvNeXt classifier, hỗ trợ đa thương hiệu.",
                    description:
                        "SDK cấp production cho xác thực hàng xa xỉ. Xây dựng model registry module hóa với lazy-loading và caching cho YOLO detection + ViT/ConvNeXt fine-grained classifier. Hỗ trợ đa thương hiệu (Rolex, LV, Omega) với part-level versioning (P00-P08). Tích hợp RedFrame IQA service (basic LIQE + advanced XGBoost) kiểm tra chất lượng ảnh. Bao gồm pipeline tiền xử lý CLAHE/LoG và schema validation bằng Pydantic.\n\nThành phần chính:\n- Model Package Registry: Tải model động với lazy init và caching\n- Part-based versioning (P00-P08) với nhiều phiên bản model mỗi part\n- RedFrame Service: Đánh giá chất lượng ảnh với basic (LIQE) và advanced (XGBoost)\n- Pipeline tiền xử lý: CLAHE, LoG filtering, điều chỉnh brightness/contrast, loại bỏ white padding\n- Pydantic schemas cho type-safe validation kết quả detection và authentication",
                    tech: ["PyTorch", "YOLO", "ViT", "ConvNeXt", "FastAPI", "Pydantic", "XGBoost"],
                },
                {
                    name: "EduScan",
                    subtitle: "Nền tảng Chấm thi AI",
                    shortDescription: "Hệ thống chấm thi tự động full-stack sử dụng YOLOv12 phát hiện phiếu và OpenCV OMR nhận dạng bong bóng.",
                    description:
                        "Hệ thống chấm thi tự động full-stack. Module AI dùng YOLOv12 phát hiện phiếu trả lời và OpenCV OMRChecker nhận dạng bong bóng, tính điểm. Backend (FastAPI + PostgreSQL) quản lý đề thi, xác thực SBD real-time qua WebSocket, và phân tích kết quả. Frontend TypeScript/Next.js hỗ trợ chụp camera trực tiếp, xử lý hàng loạt, và xuất báo cáo điểm.\n\nKiến trúc:\n- Module AI: YOLOv12 phát hiện phiếu trả lời + OpenCV OMRChecker nhận dạng bong bóng\n- Backend: FastAPI + PostgreSQL với Alembic migrations, xác thực SBD real-time qua WebSocket\n- Frontend: TypeScript/Next.js với chụp camera trực tiếp và xử lý ảnh hàng loạt\n- Triển khai: Nginx reverse proxy + Docker containerization với manage-system.sh tự động hóa",
                    tech: ["YOLOv12", "OpenCV", "FastAPI", "PostgreSQL", "TypeScript", "Next.js", "WebSocket"],
                },
                {
                    name: "AI Ad Planner",
                    subtitle: "Nền tảng Phân tích Quảng cáo",
                    shortDescription: "Kho dữ liệu và nền tảng phân tích cho lập kế hoạch chiến dịch quảng cáo AI với dashboard tương tác.",
                    description:
                        "Kho dữ liệu và nền tảng phân tích cho lập kế hoạch chiến dịch quảng cáo AI. Thiết kế ETL pipeline thu thập dữ liệu đa nguồn, xây dựng dashboard Next.js tương tác với báo cáo drill-down, và triển khai phân tích hiệu suất chiến dịch dựa trên SQL với tự động theo dõi KPI.\n\nTính năng:\n- ETL pipeline thu thập và chuyển đổi dữ liệu quảng cáo đa nguồn\n- Dashboard Next.js tương tác với báo cáo drill-down chiến dịch\n- Phân tích hiệu suất chiến dịch dựa trên SQL với tự động theo dõi KPI\n- Trực quan hóa dữ liệu với charts tùy chỉnh và cập nhật metric real-time",
                    tech: ["FastAPI", "Next.js", "SQL", "Data Pipeline", "ETL"],
                },
                {
                    name: "AIoT Monitor",
                    subtitle: "Hệ thống Giám sát IoT Thông minh",
                    shortDescription: "Nền tảng giám sát IoT doanh nghiệp với RBAC, proxy kết nối, và AI phát hiện bất thường cho giải pháp thông minh.",
                    description:
                        "Nền tảng giám sát IoT doanh nghiệp, đóng vai trò trung gian bảo mật giữa operator và hub device cho giải pháp smart house/factory.\n\nKiến trúc hệ thống:\n- Backend: FastAPI với SQLAlchemy ORM, xác thực JWT/OAuth2, phân quyền RBAC\n- Frontend: Vue.js 3 admin dashboard giám sát trạng thái hệ thống real-time\n- Connection Proxy: Apache Guacamole (SSH/VNC/RDP) ghi log toàn bộ lệnh và session\n- Module AI: Phát hiện bất thường hành vi người dùng bằng Scikit-learn/PyTorch\n- Cơ sở dữ liệu: PostgreSQL (users/config) + InfluxDB (time-series telemetry) + Elasticsearch (logs)\n- Triển khai: Docker & Kubernetes containerized microservices",
                    tech: ["FastAPI", "Vue.js", "PostgreSQL", "InfluxDB", "Docker", "Guacamole", "PyTorch"],
                },
            ],
        },
        footer: {
            contact: "Thông tin Liên hệ",
            copyright: "aPuss",
        },
        cvModal: {
            title: "Xem trước CV",
            close: "Đóng",
            download: "Tải PDF",
        },
    },
};

type Language = "en" | "vi";

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

// ======================================================================
// 2. ANIMATION HOOKS
// ======================================================================

/** Intersection Observer hook: triggers CSS class swap on scroll into view */
function useInView(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(el); // animate once
                }
            },
            { threshold: 0.15, ...options }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return { ref, isInView };
}

/** Typing effect hook */
function useTypingEffect(text: string, speed = 60) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDisplayed("");
        setDone(false);
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1));
                i++;
            } else {
                setDone(true);
                clearInterval(interval);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return { displayed, done };
}

// ======================================================================
// 3. SHARED ANIMATION WRAPPER
// ======================================================================

type AnimDir = "up" | "left" | "right" | "scale";

const AnimateIn = ({
    children,
    direction = "up",
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    direction?: AnimDir;
    delay?: number;
    className?: string;
}) => {
    const { ref, isInView } = useInView();

    const baseTransform: Record<AnimDir, string> = {
        up: "translateY(40px)",
        left: "translateX(-40px)",
        right: "translateX(40px)",
        scale: "scale(0.9)",
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "none" : baseTransform[direction],
                transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
            }}
        >
            {children}
        </div>
    );
};

// ======================================================================
// 4. FLOATING PARTICLES BACKGROUND
// ======================================================================

const ParticleField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
        const PARTICLE_COUNT = 50;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Seed particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 2 + 0.5,
                a: Math.random() * 0.4 + 0.1,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 92, 246, ${p.a})`;
                ctx.fill();
            });

            // Draw connections between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
};

// ======================================================================
// 5. CV PREVIEW MODAL
// ======================================================================

const CVPreviewModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { t } = useI18n();

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn" />

            {/* Modal content */}
            <div
                className="relative z-10 w-full max-w-7xl h-[90vh] bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 animate-modalSlideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-600/20 rounded-lg">
                            <FileText size={20} className="text-purple-400" />
                        </div>
                        <h3 className="text-lg font-semibold">{t.cvModal.title}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="/cv.pdf"
                            download
                            className="flex items-center gap-2 text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95"
                        >
                            <Download size={16} />
                            {t.cvModal.download}
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* PDF iframe */}
                <div className="h-[calc(90vh-65px)] bg-neutral-800">
                    <iframe
                        src="/cv.pdf"
                        title="CV Preview"
                        className="w-full h-full border-0"
                        style={{ background: "#262626" }}
                    />
                </div>
            </div>
        </div>
    );
};

// ======================================================================
// 6. COMPONENTS
// ======================================================================

const Header = () => {
    const { lang, setLang, t } = useI18n();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { href: "#about", label: t.nav.about },
        { href: "#skills", label: t.nav.skills },
        { href: "#experience", label: t.nav.experience },
        { href: "#projects", label: t.nav.projects },
    ];

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${scrolled
                ? "border-neutral-800 bg-neutral-950/90 backdrop-blur-xl shadow-lg shadow-black/20"
                : "border-transparent bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <a
                    href="#about"
                    className="text-lg font-bold font-mono text-green-400 hover:text-green-300 transition-colors"
                >
                    <span className="text-neutral-600">&gt; </span>LTP.ai
                </a>

                {/* Desktop nav - terminal style */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-mono text-neutral-500">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="relative py-1 hover:text-green-400 transition-colors group"
                        >
                            <span className="text-neutral-700 group-hover:text-green-600 transition-colors">./</span>{link.label.toLowerCase()}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-green-500 transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    {/* Language Toggle */}
                    <div className="flex items-center bg-neutral-900/80 rounded-md p-0.5 border border-neutral-800 font-mono">
                        <button
                            onClick={() => setLang("en")}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all duration-300 ${lang === "en"
                                ? "bg-green-600/20 text-green-400 border border-green-500/30"
                                : "text-neutral-600 hover:text-neutral-300 border border-transparent"
                                }`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLang("vi")}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all duration-300 ${lang === "vi"
                                ? "bg-green-600/20 text-green-400 border border-green-500/30"
                                : "text-neutral-600 hover:text-neutral-300 border border-transparent"
                                }`}
                        >
                            VI
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        {mobileOpen ? <XIcon size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-64 border-t border-neutral-800" : "max-h-0"
                    }`}
            >
                <nav className="flex flex-col px-6 py-4 gap-3 bg-neutral-950/95 backdrop-blur-xl font-mono text-sm">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-neutral-400 hover:text-green-400 transition-colors"
                        >
                            <span className="text-neutral-700">$ </span>{link.label.toLowerCase()}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

const Hero = ({ onPreviewCV }: { onPreviewCV: () => void }) => {
    const { t } = useI18n();
    const { displayed, done } = useTypingEffect(t.hero.name, 80);

    return (
        <section id="about" className="relative pt-24 pb-24 px-6 container mx-auto min-h-[90vh] flex items-center">
            {/* Subtle gradient orbs */}
            <div className="absolute top-20 -left-20 w-72 h-72 bg-green-600/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />

            <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16 relative z-10 w-full max-w-5xl">
                {/* Left: content */}
                <div className="flex-1 min-w-0">
                    {/* Terminal-style greeting */}
                    <AnimateIn direction="up" delay={0}>
                        <div className="font-mono text-sm text-neutral-600 mb-4">
                            <span className="text-green-500">$</span> cat ./profile.json
                        </div>
                    </AnimateIn>

                    <AnimateIn direction="up" delay={0.15}>
                        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 mb-8">
                            {/* Terminal header bar */}
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-800">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                <span className="ml-3 text-xs font-mono text-neutral-600">~/portfolio</span>
                            </div>

                            <div className="font-mono text-sm space-y-2">
                                <div><span className="text-neutral-600">name:</span> <span className="text-green-400 text-lg font-bold">{displayed}<span className={`inline-block w-[2px] h-[1em] ml-0.5 bg-green-500 align-text-bottom ${done ? "animate-blink" : ""}`} /></span></div>
                                <div><span className="text-neutral-600">role:</span> <span className="text-purple-400 font-semibold">{t.hero.role}</span></div>
                                <div><span className="text-neutral-600">location:</span> <span className="text-yellow-400">&quot;Da Nang, Vietnam&quot;</span></div>
                                <div><span className="text-neutral-600">status:</span> <span className="text-emerald-400">&quot;available&quot;</span></div>
                            </div>
                        </div>
                    </AnimateIn>

                    <AnimateIn direction="up" delay={0.45}>
                        <p className="text-base md:text-lg text-neutral-400 mb-10 leading-relaxed max-w-2xl font-mono text-sm">
                            <span className="text-neutral-600">// </span>{t.hero.summary}
                        </p>
                    </AnimateIn>

                    <AnimateIn direction="up" delay={0.6}>
                        <div className="flex flex-wrap items-center gap-3 text-sm font-mono">
                            <button
                                onClick={onPreviewCV}
                                className="group flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30 hover:border-green-500/50 px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-green-500/10"
                            >
                                <Eye size={16} />
                                {t.hero.previewCV}
                            </button>
                            <a
                                href="/cv.pdf"
                                download
                                className="flex items-center gap-2 bg-neutral-900/60 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800 hover:border-neutral-700 px-5 py-2.5 rounded-lg transition-all"
                            >
                                <Download size={16} />
                                {t.hero.downloadCV}
                            </a>
                            <a
                                href="https://github.com/saitama140203"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 bg-neutral-900/60 hover:bg-neutral-900 text-neutral-500 hover:text-white border border-neutral-800 hover:border-neutral-700 px-3 py-2.5 rounded-lg transition-all"
                            >
                                <Github size={16} />
                            </a>
                            <a
                                href="https://linkedin.com/in/saitama140203"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 bg-neutral-900/60 hover:bg-neutral-900 text-neutral-500 hover:text-blue-400 border border-neutral-800 hover:border-neutral-700 px-3 py-2.5 rounded-lg transition-all"
                            >
                                <Linkedin size={16} />
                            </a>
                        </div>
                    </AnimateIn>

                    {/* Scroll indicator */}
                    <AnimateIn direction="up" delay={0.9}>
                        <a href="#skills" className="inline-flex flex-col items-center mt-16 group text-neutral-600 hover:text-green-400 transition-colors font-mono">
                            <span className="text-xs mb-2">{t.hero.scrollDown}</span>
                            <ChevronDown size={20} className="animate-bounce" />
                        </a>
                    </AnimateIn>
                </div>

                {/* Right: Avatar in terminal frame */}
                <AnimateIn direction="right" delay={0.3}>
                    <div className="shrink-0 w-64 md:w-80">
                        <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg overflow-hidden hover:border-neutral-700 transition-all duration-300 group">
                            {/* Terminal title bar */}
                            <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-800/50 bg-neutral-950/50">
                                <div className="w-2 h-2 rounded-full bg-red-500/70" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                                <div className="w-2 h-2 rounded-full bg-green-500/70" />
                                <span className="ml-1 text-[10px] font-mono text-neutral-600">avt.jpeg</span>
                            </div>
                            {/* Avatar image */}
                            <div className="relative">
                                <img
                                    src="/avt.jpeg"
                                    alt="Le The Phu"
                                    className="w-full aspect-[4/5] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                                />
                                {/* Subtle scanline overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/[0.02] to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </AnimateIn>
            </div>
        </section>
    );
};
// Skill proficiency & color mapping
const SKILL_DATA: Record<string, { color: string; dot: string; level: number }> = {
    Python: { color: "text-yellow-400", dot: "bg-yellow-500", level: 90 },
    JavaScript: { color: "text-yellow-300", dot: "bg-yellow-400", level: 70 },
    "Next.js": { color: "text-white", dot: "bg-white", level: 65 },
    Svelte: { color: "text-orange-500", dot: "bg-orange-500", level: 60 },
    PyTorch: { color: "text-orange-400", dot: "bg-orange-500", level: 85 },
    OpenCV: { color: "text-green-400", dot: "bg-green-500", level: 80 },
    HuggingFace: { color: "text-amber-400", dot: "bg-amber-500", level: 75 },
    LangChain: { color: "text-emerald-400", dot: "bg-emerald-500", level: 70 },
    YOLO: { color: "text-violet-400", dot: "bg-violet-500", level: 85 },
    FastAPI: { color: "text-teal-400", dot: "bg-teal-500", level: 90 },
    Docker: { color: "text-blue-400", dot: "bg-blue-400", level: 75 },
    Git: { color: "text-red-400", dot: "bg-red-500", level: 80 },
    Linux: { color: "text-amber-300", dot: "bg-amber-400", level: 70 },
    PostgreSQL: { color: "text-blue-300", dot: "bg-blue-300", level: 75 },
    "SQL Server": { color: "text-red-300", dot: "bg-red-400", level: 65 },
};

const fallbackSkill = { color: "text-neutral-400", dot: "bg-neutral-500", level: 50 };

const SkillRow = ({ name }: { name: string; idx: number }) => {
    const data = SKILL_DATA[name] || fallbackSkill;
    return (
        <div className="group flex items-center gap-3 py-1.5 hover:bg-neutral-800/30 px-2 -mx-2 rounded transition-colors cursor-default">
            <div className={`w-1.5 h-1.5 rounded-full ${data.dot} shrink-0`} />
            <span className={`font-mono text-sm ${data.color} group-hover:brightness-125 transition-all`}>
                {name}
            </span>
        </div>
    );
};

const Skills = () => {
    const { t } = useI18n();

    const categories = [
        {
            title: t.skills.programming,
            skills: t.skills.programmingList,
            file: "languages.ts",
            icon: <Code size={14} className="text-blue-400" />,
            borderColor: "border-l-blue-500",
        },
        {
            title: t.skills.aiml,
            skills: t.skills.aimlList,
            file: "models.py",
            icon: <Cpu size={14} className="text-purple-400" />,
            borderColor: "border-l-purple-500",
        },
        {
            title: t.skills.backendMlops,
            skills: t.skills.backendMlopsList,
            file: "infra.yaml",
            icon: <Server size={14} className="text-teal-400" />,
            borderColor: "border-l-teal-500",
        },
    ];

    const totalSkills = categories.reduce((sum, c) => sum + c.skills.length, 0);

    return (
        <section id="skills" className="py-24 px-6 container mx-auto relative">
            <AnimateIn direction="up">
                <div className="mb-10">
                    <h3 className="text-2xl md:text-3xl font-bold font-mono flex items-center gap-2">
                        <span className="text-purple-500">&gt;</span> {t.skills.title}
                        <span className="inline-block w-2 h-5 bg-purple-500 animate-blink ml-1" />
                    </h3>
                    <p className="text-neutral-500 font-mono text-sm mt-2">
                        total_skills: <span className="text-green-400">{totalSkills}</span> | categories: <span className="text-blue-400">{categories.length}</span>
                    </p>
                </div>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map((cat, catIdx) => (
                    <AnimateIn key={catIdx} direction="up" delay={catIdx * 0.12}>
                        <div className={`bg-neutral-900/60 border border-neutral-800 border-l-2 ${cat.borderColor} rounded-lg overflow-hidden hover:border-neutral-700 transition-all duration-300 h-full`}>
                            {/* Terminal title bar */}
                            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-800/50 bg-neutral-950/50">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                                <span className="ml-2 text-[11px] font-mono text-neutral-600">{cat.file}</span>
                                <div className="ml-auto flex items-center gap-1.5">
                                    {cat.icon}
                                    <span className="text-[11px] font-mono text-neutral-500">{cat.skills.length}</span>
                                </div>
                            </div>

                            {/* Skill rows */}
                            <div className="p-4 space-y-0">
                                {cat.skills.map((skill, idx) => (
                                    <SkillRow key={skill} name={skill} idx={idx} />
                                ))}
                            </div>
                        </div>
                    </AnimateIn>
                ))}
            </div>
        </section>
    );
};

const Experience = () => {
    const { t } = useI18n();

    const nodeColors = ["bg-green-500", "bg-yellow-500", "bg-blue-500"];
    const borderColors = ["border-l-green-500", "border-l-yellow-500", "border-l-blue-500"];
    const glowColors = ["shadow-green-500/20", "shadow-yellow-500/20", "shadow-blue-500/20"];
    const statusLabels = ["active", "completed", "completed"];

    return (
        <section id="experience" className="py-24 px-6 container mx-auto relative">
            <AnimateIn direction="up">
                <div className="mb-14">
                    <h3 className="text-2xl md:text-3xl font-bold font-mono flex items-center gap-2">
                        <span className="text-purple-500">&gt;</span> {t.experience.title}
                        <span className="inline-block w-2 h-5 bg-purple-500 animate-blink ml-1" />
                    </h3>
                    <p className="text-neutral-500 font-mono text-sm mt-2">
                        total_positions: <span className="text-green-400">{t.experience.jobs.length}</span> | status: <span className="text-green-400">&quot;employed&quot;</span>
                    </p>
                </div>
            </AnimateIn>

            {/* Timeline container */}
            <div className="relative max-w-5xl mx-auto">
                {/* Vertical timeline line */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-green-500/50 via-yellow-500/30 to-blue-500/20" />

                {t.experience.jobs.map((job, idx) => {
                    const isLeft = idx % 2 === 0;
                    const isFirst = idx === 0;

                    return (
                        <AnimateIn key={idx} direction={isLeft ? "left" : "right"} delay={idx * 0.15}>
                            <div className={`relative flex items-start mb-12 last:mb-0 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                                {/* Node dot on timeline */}
                                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                                    <div className={`relative w-4 h-4 rounded-full ${nodeColors[idx]} ${isFirst ? `shadow-lg ${glowColors[idx]}` : ""}`}>
                                        {/* Pulse ring for active job */}
                                        {isFirst && (
                                            <div className={`absolute inset-0 rounded-full ${nodeColors[idx]} animate-ping opacity-40`} />
                                        )}
                                    </div>
                                </div>

                                {/* Spacer for left side on mobile */}
                                <div className="w-14 shrink-0 md:hidden" />

                                {/* Card - takes half width on desktop */}
                                <div className={`flex-1 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-10" : "md:pl-10"}`}>
                                    <div className={`group bg-neutral-900/60 border border-neutral-800 border-l-2 ${borderColors[idx]} rounded-lg hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300 hover:shadow-lg ${glowColors[idx]} overflow-hidden`}>
                                        {/* Terminal header bar */}
                                        <div className="flex items-center gap-2 px-4 py-2 border-b border-neutral-800/50 bg-neutral-950/50">
                                            <div className="w-2 h-2 rounded-full bg-red-500/70" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                                            <div className="w-2 h-2 rounded-full bg-green-500/70" />
                                            <span className="ml-1 text-[10px] font-mono text-neutral-600">{job.company.toLowerCase().replace(/\s/g, "_")}.log</span>
                                            <div className="ml-auto flex items-center gap-1.5">
                                                <span className={`w-1.5 h-1.5 rounded-full ${nodeColors[idx]}`} />
                                                <span className="text-[10px] font-mono text-neutral-600">{statusLabels[idx]}</span>
                                            </div>
                                        </div>

                                        <div className="p-4 font-mono">
                                            {/* Period badge */}
                                            <span className="inline-block text-[10px] text-neutral-500 bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded mb-3">
                                                {job.period}
                                            </span>

                                            <h4 className="text-sm font-bold text-green-400 mb-1">{job.role}</h4>

                                            <div className="flex items-center gap-1.5 mb-3 text-xs">
                                                <span className="text-purple-400">{job.company}</span>
                                                <span className="text-neutral-700">|</span>
                                                <span className="text-neutral-500 flex items-center gap-1">
                                                    <MapPin size={10} />
                                                    {job.location}
                                                </span>
                                            </div>

                                            <p className="text-neutral-500 leading-relaxed text-xs">
                                                <span className="text-neutral-700">// </span>{job.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Empty spacer for the other side on desktop */}
                                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                            </div>
                        </AnimateIn>
                    );
                })}

                {/* Timeline end dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 -bottom-2">
                    <div className="w-2 h-2 rounded-full bg-neutral-700" />
                </div>
            </div>
        </section>
    );
};

const ProjectDetailModal = ({ project, onClose, borderColor }: { project: any; onClose: () => void; borderColor: string }) => {
    const { t } = useI18n();
    // Parse description with newline sections
    const descParts = project.description.split("\n\n");

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn" />
            <div
                className={`relative z-10 w-full max-w-3xl max-h-[85vh] bg-neutral-900 border border-neutral-700 border-l-2 ${borderColor} rounded-lg overflow-hidden shadow-2xl shadow-purple-500/10 animate-modalSlideUp`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-950/80">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="ml-2 text-[11px] font-mono text-neutral-600">{project.name.toLowerCase().replace(/\s/g, "_")}/README.md</span>
                    <button onClick={onClose} className="ml-auto p-1 rounded hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white">
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(85vh-50px)] p-6 font-mono">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-green-400">{project.name}</h3>
                    </div>
                    <p className="text-sm text-purple-400/80 mb-5">{project.subtitle}</p>

                    {/* Description sections */}
                    <div className="space-y-4">
                        {descParts.map((part: string, i: number) => {
                            // Check if section has a header (e.g. "Key components:")
                            const lines = part.split("\n");
                            const isListSection = lines.length > 1 && lines.slice(1).every((l: string) => l.startsWith("- "));

                            if (isListSection) {
                                return (
                                    <div key={i}>
                                        <p className="text-sm text-neutral-300 font-semibold mb-2">
                                            <span className="text-neutral-600">## </span>{lines[0]}
                                        </p>
                                        <div className="space-y-1.5 pl-4">
                                            {lines.slice(1).map((line: string, j: number) => (
                                                <p key={j} className="text-xs text-neutral-400 leading-relaxed">
                                                    <span className="text-green-500/70">  - </span>{line.replace(/^- /, "")}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <p key={i} className="text-sm text-neutral-400 leading-relaxed">
                                    <span className="text-neutral-600">// </span>{part}
                                </p>
                            );
                        })}
                    </div>

                    {/* Tech stack */}
                    <div className="mt-6 pt-4 border-t border-neutral-800">
                        <p className="text-xs text-neutral-600 mb-3">stack:</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((tag: string, i: number) => (
                                <span
                                    key={i}
                                    className="text-[11px] font-mono text-green-300/80 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const { t } = useI18n();
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    const projectColors = ["border-l-purple-500", "border-l-green-500", "border-l-cyan-500", "border-l-amber-500"];
    const dotColors = ["bg-purple-500", "bg-green-500", "bg-cyan-500", "bg-amber-500"];
    const textAccents = ["text-purple-400", "text-green-400", "text-cyan-400", "text-amber-400"];

    return (
        <>
            <section id="projects" className="py-24 px-6 container mx-auto relative">
                <AnimateIn direction="up">
                    <div className="mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold font-mono flex items-center gap-2">
                            <span className="text-purple-500">&gt;</span> {t.projects.title}
                            <span className="inline-block w-2 h-5 bg-purple-500 animate-blink ml-1" />
                        </h3>
                        <p className="text-neutral-500 font-mono text-sm mt-2">
                            total_projects: <span className="text-green-400">{t.projects.list.length}</span> | type: <span className="text-blue-400">"production"</span>
                        </p>
                    </div>
                </AnimateIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {t.projects.list.map((project, idx) => (
                        <AnimateIn key={idx} direction="up" delay={idx * 0.1}>
                            <div className={`group bg-neutral-900/60 border border-neutral-800 border-l-2 ${projectColors[idx]} rounded-lg hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg overflow-hidden h-full flex flex-col`}>
                                {/* Terminal header bar */}
                                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-800/50 bg-neutral-950/50">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                                    <span className="ml-2 text-[11px] font-mono text-neutral-600">{project.name.toLowerCase().replace(/\s/g, "_")}/README.md</span>
                                    <span className="ml-auto text-[11px] font-mono text-neutral-700">0{idx + 1}</span>
                                </div>

                                <div className="p-5 font-mono flex-grow flex flex-col">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`w-2 h-2 rounded-full ${dotColors[idx]} shrink-0`} />
                                        <h4 className="text-lg font-bold text-neutral-100 group-hover:text-green-400 transition-colors">{project.name}</h4>
                                    </div>
                                    <p className="text-xs text-purple-400/80 mb-3 pl-5">{project.subtitle}</p>
                                    <p className="text-neutral-500 text-xs mb-4 leading-relaxed pl-5 flex-grow">
                                        <span className="text-neutral-700">// </span>{project.shortDescription}
                                    </p>

                                    <div className="flex items-center justify-between pl-5">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.slice(0, 4).map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[11px] font-mono text-green-300/80 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tech.length > 4 && (
                                                <span className="text-[11px] font-mono text-neutral-600">+{project.tech.length - 4}</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setSelectedProject(idx)}
                                            className={`text-xs ${textAccents[idx]} hover:underline underline-offset-4 transition-colors flex items-center gap-1`}
                                        >
                                            {t.projects.viewMore}
                                            <ChevronDown size={12} className="-rotate-90" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </AnimateIn>
                    ))}
                </div>
            </section>

            {/* Project detail modal */}
            {selectedProject !== null && (
                <ProjectDetailModal
                    project={t.projects.list[selectedProject]}
                    borderColor={projectColors[selectedProject]}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </>
    );
};

const Footer = () => {
    const { t } = useI18n();

    return (
        <footer className="relative border-t border-neutral-900 bg-neutral-950 py-10">
            <div className="container mx-auto px-6">
                <AnimateIn direction="up">
                    <div className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-6 font-mono">
                        {/* Terminal header bar */}
                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-800">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                            <span className="ml-2 text-[11px] text-neutral-600">contact.sh</span>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="text-neutral-500">
                                <span className="text-green-500">$</span> echo <span className="text-green-400">$CONTACT_INFO</span>
                            </div>
                            <div className="pl-4 space-y-1.5">
                                <a
                                    href="mailto:lethephu.140203@gmail.com"
                                    className="flex items-center gap-2 text-neutral-400 hover:text-green-400 transition-colors group w-fit"
                                >
                                    <Mail size={14} className="text-neutral-600 group-hover:text-green-500" />
                                    lethephu.140203@gmail.com
                                </a>
                                <span className="flex items-center gap-2 text-neutral-400">
                                    <Phone size={14} className="text-neutral-600" /> +84 837 253 685
                                </span>
                                <span className="flex items-center gap-2 text-neutral-400">
                                    <MapPin size={14} className="text-neutral-600" /> Da Nang, Vietnam
                                </span>
                            </div>
                        </div>
                    </div>
                </AnimateIn>

                <div className="mt-6 text-center text-[11px] font-mono text-neutral-700">
                    <span className="text-neutral-600">&copy; {new Date().getFullYear()}</span> Le The Phu <span className="text-neutral-800">|</span> {t.footer.copyright}
                </div>
            </div>
        </footer>
    );
};

// ======================================================================
// 7. MAIN APP
// ======================================================================

export default function PortfolioApp() {
    const [lang, setLang] = useState<Language>("en");
    const [cvOpen, setCvOpen] = useState(false);
    const t = translations[lang];

    return (
        <I18nContext.Provider value={{ lang, setLang, t }}>
            {/* Global CSS animations injected via style tag */}
            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-modalSlideUp { animation: modalSlideUp 0.4s cubic-bezier(.22,1,.36,1); }
        .animate-blink { animation: blink 1s step-end infinite; }

        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>

            <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-purple-500/30">
                <ParticleField />
                <div className="relative z-10">
                    <Header />
                    <main>
                        <Hero onPreviewCV={() => setCvOpen(true)} />
                        <Skills />
                        <Experience />
                        <Projects />
                    </main>
                    <Footer />
                </div>
                <CVPreviewModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
            </div>
        </I18nContext.Provider>
    );
}
