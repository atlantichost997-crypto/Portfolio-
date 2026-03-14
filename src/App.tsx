import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'motion/react';
import { 
  Terminal, 
  Server, 
  Code2, 
  Gamepad2, 
  Volume2, 
  VolumeX, 
  Github, 
  Twitter, 
  Mail, 
  ChevronDown,
  ExternalLink,
  Sparkles,
  User,
  Cpu,
  Database,
  Globe,
  Layout,
  Layers,
  Box,
  Zap,
  Home,
  Briefcase
} from 'lucide-react';

// --- Components ---

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="hidden md:block">
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: mousePos.x - 6, y: mousePos.y - 6 }}
        transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-purple-500/50 bg-purple-500/10 pointer-events-none z-[9998] backdrop-blur-[2px]"
        animate={{ x: mousePos.x - 20, y: mousePos.y - 20 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
      />
    </div>
  );
};

const Header = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 50) {
      setVisible(true);
    } else if (latest > lastScrollY) {
      setVisible(false); // Scrolling down
    } else {
      setVisible(true); // Scrolling up
    }
    setLastScrollY(latest);
  });

  return (
    <motion.header
      initial={{ x: "120%", opacity: 0 }}
      animate={{ x: visible ? 0 : "120%", opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="fixed top-6 right-6 z-50 glass-card rounded-full px-2 py-2 flex gap-2 items-center shadow-[0_0_30px_rgba(168,85,247,0.2)] border border-white/10 backdrop-blur-xl"
    >
      <a href="#" className="p-3 rounded-full hover:bg-white/10 text-zinc-400 hover:text-purple-400 transition-all duration-300 group relative">
        <Home size={20} />
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">Home</span>
      </a>
      <a href="#" className="p-3 rounded-full hover:bg-white/10 text-zinc-400 hover:text-pink-400 transition-all duration-300 group relative">
        <Briefcase size={20} />
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">Work</span>
      </a>
      <a href="#" className="p-3 rounded-full hover:bg-white/10 text-zinc-400 hover:text-cyan-400 transition-all duration-300 group relative">
        <User size={20} />
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">About</span>
      </a>
      <div className="w-[1px] h-8 bg-white/10 mx-2"></div>
      <button className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform duration-300 text-sm">
        Hire Me
      </button>
    </motion.header>
  );
};

const AudioPlayer = ({ isPlaying, togglePlay }: { isPlaying: boolean, togglePlay: () => void }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio 
        ref={audioRef} 
        src="https://upcdn.io/W23MTYW/raw/MONTAGEM_ALQUIMIA_PHONK_256KBPS.webm" 
        loop 
      />
      <button 
        onClick={togglePlay}
        className="p-4 rounded-full glass-card text-purple-400 hover:text-pink-400 transition-all duration-300 shine-effect shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  );
};

const BlurryBackground = () => (
  <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
    <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-cyan-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
  </div>
);

const EnterScreen = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] overflow-hidden"
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <BlurryBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 glass-card p-12 rounded-3xl"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <Sparkles className="text-purple-400" size={32} />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Welcome to my <span className="text-shiny">Universe</span>
        </h1>
        <p className="text-zinc-400 mb-10 max-w-md mx-auto text-lg">
          Experience a journey through my digital creations, powered by modern web technologies and immersive design.
        </p>
        <button 
          onClick={onEnter}
          className="group relative px-8 py-4 rounded-full glass-card text-white font-medium tracking-wide hover:bg-white/10 transition-all duration-300 shine-effect flex items-center gap-3 mx-auto"
        >
          <span>Enter Portfolio</span>
          <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
        </button>
      </motion.div>
    </motion.div>
  );
};

const Marquee = () => {
  // Create an array with just the Creeper MC item, repeated to fill the screen
  const items = Array(6).fill({ 
    icon: <img src="https://iili.io/q0WkTNe.th.png" alt="Creeper MC" className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />, 
    text: "CREEPER MC" 
  });

  return (
    <div className="relative w-full py-8 overflow-hidden glass-card border-y border-white/10 rotate-[-2deg] scale-110 z-20 shadow-[0_0_40px_rgba(168,85,247,0.1)] backdrop-blur-2xl">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 group">
                <div className="p-2 rounded-2xl glass-card border border-white/5 shadow-inner group-hover:scale-110 group-hover:border-white/20 transition-all duration-500 shine-effect bg-black/20">
                  {item.icon}
                </div>
                <span className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white/80 group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  {item.text}
                </span>
                <span className="mx-6 text-purple-500/50 text-3xl animate-pulse">✦</span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl flex flex-col items-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full glass-card p-1 mb-8 shine-effect flex items-center justify-center"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center overflow-hidden">
              <User size={48} className="text-white/50" />
            </div>
          </motion.div>
          
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass-card text-sm font-medium text-purple-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Available for new projects
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-extrabold leading-[1.1] tracking-tight mb-6">
            Hi, I'm Alex. <br />
            I build <span className="text-shiny">Digital Experiences</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl font-light mb-10">
            A passionate developer blending the worlds of high-performance Minecraft servers and modern, immersive web applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              View My Work
            </button>
            <button className="px-8 py-4 rounded-full glass-card text-white font-semibold hover:bg-white/10 transition-colors duration-300 shine-effect">
              Contact Me
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-zinc-500"
      >
        <span className="text-sm font-medium tracking-widest uppercase text-white/50">Scroll Down</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-16 bg-gradient-to-b from-purple-500 to-transparent" 
        />
      </motion.div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Server size={32} className="text-cyan-400" />,
      title: "Server Architecture",
      desc: "Designing scalable, lag-free Minecraft networks using Paper and Velocity. Handling 1000+ concurrent players with optimized JVM flags."
    },
    {
      icon: <Code2 size={32} className="text-purple-400" />,
      title: "Plugin Development",
      desc: "Writing efficient, thread-safe Java plugins using the Spigot/Paper API. Custom minigames, economy systems, and complex core mechanics."
    },
    {
      icon: <Terminal size={32} className="text-pink-400" />,
      title: "Full Stack Web",
      desc: "Building modern web interfaces, server stores, and admin dashboards using React, Node.js, and Tailwind CSS. Bridging the gap between game and web."
    }
  ];

  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">What I Do</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Combining game development expertise with modern web technologies to create seamless ecosystems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="glass-card p-8 rounded-3xl shine-effect group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/10 shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white/90">{service.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Hypixel-Style Network",
      category: "Minecraft Network",
      image: "https://images.unsplash.com/photo-1607513746994-51f730a44832?q=80&w=2000&auto=format&fit=crop",
      desc: "A fully custom minigame network featuring a scalable proxy setup, custom party system, and cross-server matchmaking."
    },
    {
      title: "Nexus Dashboard",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
      desc: "A real-time web dashboard for server administrators to monitor TPS, player counts, and manage punishments via a REST API."
    },
    {
      title: "RPG Core Mechanics",
      category: "Java Plugin",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2000&auto=format&fit=crop",
      desc: "A massive custom RPG plugin featuring custom mobs, items with NBT data, skill trees, and a complex quest engine."
    }
  ];

  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Featured Work</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">A selection of my best projects bridging the gap between high-performance game servers and modern web technologies.</p>
        </div>

        <div className="space-y-24">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full md:w-1/2 relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                  <div className="relative overflow-hidden aspect-video rounded-3xl glass-card p-2">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full md:w-1/2 flex flex-col justify-center"
                >
                  <div className="inline-block px-4 py-1.5 rounded-full glass-card text-sm font-medium text-pink-300 w-max mb-6">
                    {project.category}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white/90">{project.title}</h3>
                  <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                    {project.desc}
                  </p>
                  <button className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors font-medium w-max group">
                    View Project <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative py-12 mt-20 border-t border-white/10 overflow-hidden glass-card rounded-t-[3rem]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Let's build something amazing.</h2>
            <p className="text-zinc-400 text-sm">Available for freelance opportunities.</p>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="p-3 rounded-full glass-card text-zinc-300 hover:text-white hover:scale-110 transition-all duration-300 shine-effect">
              <Github size={20} />
            </a>
            <a href="#" className="p-3 rounded-full glass-card text-zinc-300 hover:text-white hover:scale-110 transition-all duration-300 shine-effect">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-3 rounded-full glass-card text-zinc-300 hover:text-white hover:scale-110 transition-all duration-300 shine-effect">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} Alex. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Designed By <span className="text-purple-400 font-semibold hover:text-pink-400 transition-colors cursor-pointer">CursedDev.gg</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
    setIsPlaying(true);
  };

  return (
    <div className="bg-[#030014] min-h-screen text-zinc-50 selection:bg-purple-500/30 selection:text-purple-200 relative overflow-hidden md:cursor-none">
      <CustomCursor />
      <BlurryBackground />
      
      <AnimatePresence>
        {!hasEntered && <EnterScreen onEnter={handleEnter} />}
      </AnimatePresence>

      {hasEntered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <Header />
          <AudioPlayer isPlaying={isPlaying} togglePlay={() => setIsPlaying(!isPlaying)} />
          
          <main>
            <Hero />
            <Marquee />
            <Services />
            <Projects />
          </main>
          
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
