"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Code,
  Palette,
  Smartphone,
  ChevronDown,
  MapPin,
  Calendar,
  Coffee,
  Zap,
  Heart,
  Star,
  Sparkles,
  Menu,
  X,
  Twitter,
} from "lucide-react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView, type PanInfo, AnimatePresence } from "framer-motion"
import { MobileNav } from "../components/MobileNav"

// Mobile-optimized animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const bounceIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
}

// Swipeable Project Card Component
function SwipeableProjectCard({ project, index }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [flipped, setFlipped] = useState(false)

  const handleSwipe = (event: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      setIsLiked(true)
      setTimeout(() => setIsLiked(false), 1000)
    } else if (info.offset.x < -100) {
      setCurrentImageIndex((prev) => (prev + 1) % 3)
    }
  }

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFlipped((f) => !f)
  }

  return (
    <div className="relative group cursor-pointer" style={{ perspective: 1200 }} onClick={handleFlip}>
      <motion.div
        className="w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d", minHeight: 320 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>
          <Card className="bg-gradient-to-br from-purple-900/80 to-slate-900/90 border-purple-800/60 backdrop-blur-xl hover:from-purple-900/90 hover:to-slate-900/95 transition-all duration-300 overflow-hidden">
            <div className="relative overflow-hidden">
              <Image
                src={project.image || "/web profile.jpg"}
                alt={project.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              {/* Swipe indicators */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <Badge className="bg-black/50 text-white border-0 backdrop-blur-sm">{project.status}</Badge>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-white/50" />
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                </div>
              </div>
              {/* Like animation */}
              <AnimatePresence>
                {isLiked && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-red-500 rounded-full p-4">
                      <Heart className="h-8 w-8 text-white fill-white" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech.slice(0, 3).map((tech: string, techIndex: number) => (
                  <Badge key={techIndex} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.tech.length > 3 && (
                  <Badge className="bg-white/10 text-white/60 border-white/20 text-xs">+{project.tech.length - 3}</Badge>
                )}
              </div>
              <span className="text-xs text-white/40">Tap to flip for details</span>
            </CardContent>
          </Card>
        </div>
        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900/90 to-purple-900/90 border border-purple-800/60 backdrop-blur-xl p-6 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {project.title}
            </h3>
            <p className="text-white/80 text-sm mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-1 justify-center mb-3">
              {project.tech.map((tech: string, techIndex: number) => (
                <Badge key={techIndex} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-white/40">Tap to flip back</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Swipeable Skills Component
function SwipeableSkills({ skills }: any) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const skillsPerPage = 2

  const handleSwipe = (event: any, info: PanInfo) => {
    if (info.offset.x > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - skillsPerPage)
    } else if (info.offset.x < -50 && currentIndex < skills.length - skillsPerPage) {
      setCurrentIndex(currentIndex + skillsPerPage)
    }
  }

  return (
    <div className="relative">
      <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleSwipe} className="overflow-hidden">
        <motion.div
          animate={{ x: -currentIndex * (100 / skillsPerPage) + "%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex"
        >
          {skills.map((skill: any, index: number) => (
            <div key={index} className="w-1/2 flex-shrink-0 px-2">
              <SkillCard skill={skill} index={index} />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(skills.length / skillsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * skillsPerPage)}
            className={`w-2 h-2 rounded-full transition-all ${
              Math.floor(currentIndex / skillsPerPage) === index ? "bg-purple-400" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

// Skill Card Component
function SkillCard({ skill, index }: { skill: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 30, rotateY: -45 },
        visible: {
          opacity: 1,
          y: 0,
          rotateY: 0,
          transition: { delay: index * 0.05, duration: 0.4, type: "spring" },
        },
      }}
      whileTap={{ scale: 0.95 }}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 overflow-hidden">
        <CardContent className="p-4 text-center relative">
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="text-2xl mb-2"
          >
            {skill.icon}
          </motion.div>
          <h3 className="text-sm font-bold mb-2 text-purple-900 dark:text-purple-200">
            {skill.name}
          </h3>
          <div className="w-full bg-white/10 rounded-full h-1.5 mb-1">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
            />
          </div>
          <span className="text-purple-900 dark:text-purple-200 font-semibold text-xs">{skill.level}%</span>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Pull to refresh component
function PullToRefresh({ onRefresh }: { onRefresh: () => void }) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)

  const handleDrag = (event: any, info: PanInfo) => {
    if (info.offset.y > 0 && window.scrollY === 0) {
      setIsPulling(true)
      setPullDistance(Math.min(info.offset.y, 100))
    }
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (pullDistance > 60) {
      onRefresh()
    }
    setIsPulling(false)
    setPullDistance(0)
  }

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className="fixed top-0 left-0 right-0 z-30 pointer-events-none"
    >
      <AnimatePresence>
        {isPulling && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: pullDistance - 50 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex justify-center pt-4"
          >
            <div className="bg-purple-500/20 backdrop-blur-sm rounded-full p-3 border border-purple-500/30">
              <motion.div animate={{ rotate: pullDistance * 3.6 }} transition={{ duration: 0.1 }}>
                <Sparkles className="h-5 w-5 text-purple-400" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [currentEmoji, setCurrentEmoji] = useState("👋")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { scrollYProgress } = useScroll()

  // Parallax effects (reduced for mobile performance)
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Emoji rotation
  const emojis = ["👋", "🚀", "💻", "🎨", "⚡", "🔥", "✨", "🎯"]
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji(emojis[Math.floor(Math.random() * emojis.length)])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const skills = [
    { name: "React", level: 95, icon: "⚛️" },
    { name: "Next.js", level: 90, icon: "🔺" },
    { name: "TypeScript", level: 88, icon: "📘" },
    { name: "Node.js", level: 85, icon: "🟢" },
    { name: "Python", level: 82, icon: "🐍" },
    { name: "UI/UX", level: 78, icon: "🎨" },
  ]

  const projects = [
    {
      title: "OnyxChain",
      description: "OnyxChain: Because trusting centralized clouds with your files was just too easy. Now, enjoy complex blockchain magic, wallet logins, and immutability,because who doesn’t love a little extra hassle for “security”?",
      image: "/OnyxChain.jpg?height=200&width=300",
      tech: ["React", "Blockchain", "IPFS", "Hardhat"],
      github: "#",
      live: "#",
      status: "🔥 Hot",
    },
    {
      title: "BrainSpark AI",
      description: "Brainspark AI: The genius solution that promises to replace your brain, because who needs critical thinking when an algorithm can guess your next move? Perfect for those who love trusting robots more than themselves.",
      image: "/BrainSparkAI.png?height=200&width=300",
      tech: ["Next.js", "WebSocket", "Tailwind", "Vercel"],
      github: "#",
      live: "#",
      status: "💬 Chatty",
    },
    {
      title: "Dynamic Landing Page",
      description: "A versatile dynamic landing page: Because who wants a simple website when you can have endless animations, sliders, and buttons that confuse visitors faster than they can say “call to action”? Perfect chaos!",
      image: "/Dynamic Landing Page.png?height=200&width=300",
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Radix UI"],
      github: "#",
      live: "#",
      status: "📊 Engaging",
    },
  ]

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
      window.location.reload()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation bar restored: transparent, fixed, and spanning the top */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-xl border-b border-purple-500/20"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Amlan Pulak Pani {currentEmoji}
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {["home", "about", "skills", "projects", "contact"].map((section, index) => (
              <motion.button
                key={section}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.1, color: "#a855f7" }}
                onClick={() => scrollToSection(section)}
                className={`capitalize transition-all duration-300 font-medium ${
                  activeSection === section ? "text-purple-400 font-bold" : "text-white/80 hover:text-purple-400"
                }`}
              >
                {section}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileNavOpen(true)}
            className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.nav>
      {/* Mobile Navigation */}
      <MobileNav
        isOpen={mobileNavOpen}
        setIsOpen={setMobileNavOpen}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* Pull to refresh */}
      <PullToRefresh onRefresh={handleRefresh} />

      {/* Floating Background Elements - Optimized for mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-10 left-10 w-32 h-32 md:w-72 md:h-72 bg-purple-500/20 rounded-full blur-2xl md:blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-10 right-10 w-40 h-40 md:w-96 md:h-96 bg-pink-500/20 rounded-full blur-2xl md:blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-24 md:pt-32">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 group"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-full blur-lg opacity-75"
              />
              <Image
                src="/web profile.jpg?height=192&width=192"
                alt="Profile"
                width={192}
                height={192}
                className="relative rounded-full border-4 border-white/20 group-hover:border-purple-400/50 transition-all duration-300 w-full h-full object-cover"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -top-2 -right-2 text-xl md:text-2xl"
              >
                ✨
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-8xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Amlan Pulak Pani
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="mb-6"
          >
            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-3 text-white/90">
              Full-Stack Developer & Digital Creator
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto px-4">
              Building the future, one line of code at a time 💻 Currently obsessed with creating apps that don't suck
              ✨
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 px-4"
          >
            <motion.div whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }}>
              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 px-3 py-1 text-xs md:text-sm font-medium">
                🚀 Available for work
              </Badge>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.95 }}>
              <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30 px-3 py-1 text-xs md:text-sm font-medium">
                📍 Odisha, INDIA
              </Badge>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, rotate: 1 }} whileTap={{ scale: 0.95 }}>
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 px-3 py-1 text-xs md:text-sm font-medium">
                ☕ Powered by coffee
              </Badge>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
            className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8 px-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-full shadow-lg shadow-purple-500/25 w-full sm:w-auto"
              >
                Check out my work 🔥
              </Button>
            </motion.div>
            <a href="https://drive.google.com/file/d/1Qc736qAcA-7ITM5NyhIlFLC7V-snbK8s/view?usp=drive_link">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
  className="bg-[#1a1a1a] border-2 border-pink-500 text-white hover:bg-pink-500/10 hover:border-pink-400 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-full shadow-lg shadow-pink-500/30 backdrop-blur-sm w-full sm:w-auto transition-all duration-300"
                >
                  <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Resume
                </Button>
              </motion.div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center space-x-4 md:space-x-6"
          >
            {[
              { icon: Github, href: "https://github.com/rishipani", color: "hover:text-purple-400 md:text-white md:hover:text-purple-400" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/iamamlanpani", color: "hover:text-blue-400 md:text-white md:hover:text-blue-400" },
  { icon: Twitter, href: "https://x.com/PaniOnTheRocks", color: "hover:text-pink-400 md:text-white md:hover:text-pink-400", newTab: false },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.2,
                  rotate: 360,
                }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 ${social.color}`}
              >
                <social.icon className="h-5 w-5 md:h-6 md:w-6 text-white md:text-inherit" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 relative px-4">
        <div className="container mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-12 md:mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            About Me 
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-4 md:space-y-6"
            >
              <motion.p variants={slideInLeft} className="text-base md:text-lg text-white/80 leading-relaxed">
                Hey there! 👋 I'm a 19-year-old developer who's absolutely obsessed with creating digital experiences
                that don't make people want to throw their phones. Been coding since I was 16 and honestly? Still get
                excited every time my code actually works on the first try (rare but magical moments ✨).
              </motion.p>

              <motion.p variants={slideInLeft} className="text-base md:text-lg text-white/80 leading-relaxed">
                When I'm not debugging at 3 AM with my 5th cup of coffee ☕, you'll find me exploring the latest tech
                trends, watching reels about coding fails, or trying to convince my friends that yes, coding IS a
                creative field 🎨
              </motion.p>

              <motion.div variants={slideInLeft} className="space-y-3 md:space-y-4">
                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm"
                >
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-purple-400 flex-shrink-0" />
                  <span className="text-sm md:text-base">Based in Odisha, INDIA (College Life is a pain 💸)</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm"
                >
                  <Calendar className="h-4 w-4 md:h-5 md:w-5 text-pink-400 flex-shrink-0" />
                  <span className="text-sm md:text-base">
                    <AnimatedCounter end={2} />+ Years of self-inflicted deadlines, bugs, and features creep- all for projects no one asked for
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm"
                >
                  <Coffee className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-sm md:text-base">
                    <AnimatedCounter end={1247} />+ Cups of coffee consumed
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
  className="space-y-4 md:space-y-6"
>
  <motion.div variants={slideInRight}>
    <motion.div whileHover={{ scale: 1.02, rotateY: 5 }} whileTap={{ scale: 0.98 }}>
      <Card className="bg-[#8B008B]/80 border border-[#8B008B]/50 backdrop-blur-xl hover:bg-[#8B008B]/90 transition-all duration-300">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center mb-3">
            <Zap className="h-5 w-5 md:h-6 md:w-6 text-yellow-400 mr-3" />
            <h3 className="text-lg md:text-xl font-bold text-purple-300">Current Vibe</h3>
          </div>
          <p className="text-white/80 text-sm md:text-base">
            Building apps that actually solve problems (not just another todo app 😅). Currently obsessed
            with AI integration and making UIs that spark joy ✨
          </p>
        </CardContent>
      </Card>
    </motion.div>
  </motion.div>

  <motion.div variants={slideInRight}>
    <motion.div whileHover={{ scale: 1.02, rotateY: -5 }} whileTap={{ scale: 0.98 }}>
      <Card className="bg-blue-900/90 border border-blue-800/70 backdrop-blur-xl hover:bg-blue-900/95 transition-all duration-300">
  <CardContent className="p-4 md:p-6">
    <div className="flex items-center mb-3">
      <Heart className="h-5 w-5 md:h-6 md:w-6 text-red-400 mr-3" />
      <h3 className="text-lg md:text-xl font-bold text-blue-300">What I Love</h3>
    </div>
    <p className="text-white/80 text-sm md:text-base">
            Clean code, smooth animations, and that feeling when everything just clicks. Also a sucker for
            good design and apps that feel like magic 🪄
          </p>
        </CardContent>
      </Card>
    </motion.div>
  </motion.div>
</motion.div>

          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-20 relative px-4">
        <div className="container mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-6 md:mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Skills That Pay The Bills 💰
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/70 mb-12 md:mb-16 text-base md:text-lg"
          >
            These are the tools I use to turn caffeine into code ☕ → 💻
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16"
          >
            {[
  {
    icon: Code,
    title: "Frontend Magic",
    desc: "React, Next.js, TypeScript, Tailwind CSS",
    gradient: "from-purple-700/40 to-pink-700/40",
    border: "border-purple-700/60",
    iconColor: "text-purple-600",
  },
  {
    icon: Smartphone,
    title: "Backend Wizardry",
    desc: "Node.js, Python, PostgreSQL, MongoDB",
    gradient: "from-blue-900/40 to-blue-700/50",
    border: "border-blue-800/70",
    iconColor: "text-blue-600",
  },
  {
    icon: Palette,
    title: "Design Vibes",
    desc: "Figma, Adobe XD, UI/UX, Motion Design",
    gradient: "from-pink-700/40 to-red-700/40",
    border: "border-pink-700/60",
    iconColor: "text-pink-600",
  },
]
.map((item, index) => (
              <motion.div
                key={index}
                variants={bounceIn}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Card
                  className={`bg-gradient-to-br ${item.gradient} ${item.border} backdrop-blur-xl hover:scale-105 transition-all duration-300 h-full`}
                >
                  <CardContent className="p-6 md:p-8 text-center">
                    <motion.div
                      whileHover={{
                        rotate: 360,
                        scale: 1.2,
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      <item.icon className={`h-10 w-10 md:h-12 md:w-12 mx-auto mb-4 ${item.iconColor}`} />
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-white/70 text-sm md:text-base">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Swipeable Skills */}
          <div className="md:hidden">
            <SwipeableSkills skills={skills} />
          </div>

          {/* Desktop Skills Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-20 relative px-4">
        <div className="container mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-6 md:mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Projects That Slap 🔥
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/70 mb-8 md:mb-16 text-base md:text-lg"
          >
            Some of my favorite creations that I'm actually proud of (no cap 🧢)
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/50 mb-8 text-sm md:hidden"
          >
            💡 Swipe left for more info, swipe right to like!
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {projects.map((project, index) => (
              <div key={index} className="md:hidden">
                <SwipeableProjectCard project={project} index={index} />
              </div>
            ))}

            {/* Desktop Project Cards */}
            {projects.map((project, index) => (
              <motion.div
                key={`desktop-${index}`}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                }}
                className="group hidden md:block"
              >
                <Card className="bg-gradient-to-br from-purple-900/80 to-slate-900/90 border-purple-800/60 backdrop-blur-xl hover:from-purple-900/90 hover:to-slate-900/95 transition-all duration-300 overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/50 text-white border-0 backdrop-blur-sm">{project.status}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {project.title}
                    </h3>
                    <p className="text-white/70 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.1 }}
                          whileHover={{
                            scale: 1.1,
                            rotate: 360,
                          }}
                        >
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">{tech}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20 relative px-4">
        <div className="container mx-auto text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Let's Build Something Epic 🚀
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/80 mb-8 md:mb-12 max-w-2xl mx-auto"
          >
            Got a wild idea? Need someone to turn your vision into reality? Let's chat! I promise I won't judge your
            wireframes drawn on napkins 📝✨
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12 md:mb-16"
          >
            <a href="mailto:paniamlan5@gmail.com" target="_blank" rel="noopener noreferrer">
              <motion.div variants={bounceIn} whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-full shadow-lg shadow-purple-500/25 w-full sm:w-auto">
                  <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Hit me up! 📧
                </Button>
              </motion.div>
            </a>
            
            
          </motion.div>

          <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.5 }}
  className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm"
>

            <h3 className="text-xl md:text-2xl font-bold mb-4 text-purple-300">Currently Available For:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/80">
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
                <span className="text-sm md:text-base">Freelance Projects</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Zap className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
                <span className="text-sm md:text-base">Full-time Opportunities</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Coffee className="h-4 w-4 md:h-5 md:w-5 text-yellow-600" />
                <span className="text-sm md:text-base">Coffee Chats</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-6 md:py-8 border-t border-purple-500/20 backdrop-blur-xl px-4"
      >
        <div className="container mx-auto text-center">
          <p className="text-white/60 text-sm md:text-base">
            © 2025 Amlan Pulak Pani. Made with ❤️, lots of ☕, and probably too much 🎵 lo-fi hip hop
          </p>
          <p className="text-white/40 text-xs md:text-sm mt-2">
            No cap, this website is actually responsive and accessible 💯
          </p>
        </div>
      </motion.footer>

      {/* Add transparent scrollbar styles */}
      <style jsx global>{`
  ::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.15) 100%);
    border-radius: 8px;
    transition: background 0.3s;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(90deg, rgba(168,85,247,0.25) 0%, rgba(236,72,153,0.25) 100%);
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: rgba(168,85,247,0.15) rgba(0,0,0,0);
  }
`}</style>
    </div>
  )
}
