import { useState, useRef, useEffect } from "react";
import { Card } from "./components/ui/card";
import { X, Minimize2, Square, User, Briefcase, Mail, FileText, Wifi, Battery, Volume2, Linkedin, Folder } from "lucide-react";

const icons = [
  { 
    name: "About Me", 
    id: "about", 
    icon: () => (
      <img 
        src="/calc.svg" 
        alt="About Me" 
        className="w-40 h-40"
      />
    ),
    color: "bg-transparent"
  },
  { 
    name: "Work", 
    id: "work", 
    icon: () => (
      <img 
        src="/folder.svg" 
        alt="Folder" 
        className="w-36 h-40"
      />
    ),
    color: "bg-transparent"
  },
  { 
    name: "Projects", 
    id: "projects", 
    icon: () => (
      <img 
        src="/folder.svg" 
        alt="Projects" 
        className="w-36 h-40"
      />
    ),
    color: "bg-transparent"
  },
  { 
    name: "Fun", 
    id: "fun", 
    icon: () => (
      <img 
        src="/folder.svg" 
        alt="Fun" 
        className="w-36 h-40"
      />
    ),
    color: "bg-transparent"
  },
  { 
    name: "Find Me", 
    id: "contact", 
    icon: () => (
      <img 
        src="/find.svg" 
        alt="Find Me" 
        className="w-50 h-50 rotate-90"
      />
    ),
    color: "bg-transparent"
  },
];

const windowContent = {
  about: {
    title: "About Me",
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Rishabh Sinha</h2>
            <p className="text-gray-600">Math and Economics, University of College London</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Second year student, interested in the intersection of technology and finance, 
          and currently working at L'Oreal as a their Commercial Intern.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Modelling", "Analytics", "Statistics", "Python", "LaTeX", "R", "Finance", "Data Science"].map(skill => (
            <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    )
  },
  work: {
    title: "Work",
    content: (
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={() => window.open('/resume.pdf', '_blank')}
            className="flex flex-col items-center group"
          >
            <div className="w-16 h-16 bg-transparent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <img src="/pdf.svg" alt="PDF" className="w-40 h-40" />
            </div>
            <span className="text-sm text-gray-700 mt-2">Resume</span>
          </button>
          <button
            onClick={() => window.open('https://www.linkedin.com/in/rishabh-sinha-b4309a180', '_blank')}
            className="flex flex-col items-center group"
          >
            <div className="w-16 h-16 bg-transparent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <img src="/linkedin.svg" alt="LinkedIn" className="w-40 h-40" />
            </div>
            <span className="text-sm text-gray-700 mt-2">LinkedIn</span>
          </button>
        </div>
      </div>
    )
  },
  projects: {
    title: "Projects",
    content: (
      <div className="space-y-4">
        {[
          { name: "E-commerce Platform", tech: "React, Node.js, MongoDB", desc: "Full-stack e-commerce solution with payment integration" },
          { name: "Task Management App", tech: "Vue.js, Express, PostgreSQL", desc: "Collaborative project management tool" },
          { name: "Weather Dashboard", tech: "React, D3.js, API Integration", desc: "Interactive weather visualization dashboard" }
        ].map((project, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <h4 className="font-medium text-gray-800">{project.name}</h4>
            <p className="text-sm text-blue-600 mb-2">{project.tech}</p>
            <p className="text-sm text-gray-700">{project.desc}</p>
          </div>
        ))}
      </div>
    )
  },
  fun: {
    title: "Fun",
    content: (
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={() => window.open('https://rishabh365.weebly.com/', '_blank')}
            className="flex flex-col items-center group"
          >
            <div className="w-20 h-20 bg-transparent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <img src="/photos.svg" alt="Posters" className="w-40 h-40" />
            </div>
            <span className="text-sm text-gray-700 mt-2">Posters</span>
          </button>
        </div>
      </div>
    )
  },
  contact: {
    title: "Contact",
    content: (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Get In Touch</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <Mail className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700">rishabhsinhaspace@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-5 h-5 bg-green-500 rounded text-white flex items-center justify-center text-xs font-bold">sp</div>
            <span className="text-gray-700">sptfy.com/Qbnp</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-5 h-5 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded text-white flex items-center justify-center text-xs font-bold">ig</div>
            <span className="text-gray-700">instagram.com/rishabh2k_</span>
          </div>
        </div>
      </div>
    )
  },
  linkedin: {
    title: "LinkedIn",
    content: (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect with me on LinkedIn</h3>
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center">
              <Linkedin className="w-12 h-12 text-white" />
            </div>
          </div>
          <p className="text-gray-700 mb-6">
            Feel free to connect with me on LinkedIn to stay updated with my professional journey and network.
          </p>
          <button
            onClick={() => window.open('https://www.linkedin.com/in/rishabh-sinha-b4309a180', '_blank')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <Linkedin className="w-5 h-5" />
            Visit My LinkedIn Profile
          </button>
        </div>
      </div>
    )
  }
};

function AnimatedDonut() {
  const [output, setOutput] = useState("");
  const [t, setT] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const width = 30;
      const height = 15;
      const buffer = Array.from({ length: height }, () => Array(width).fill(" "));
      const R1 = 1, R2 = 2, K2 = 5;
      const K1 = height * K2 * 3 / (8 * (R1 + R2));

      // Rotate on all axes
      const A = t * 0.07;  // Rotate on y-axis
      const B = t * 0.03;  // Rotate on x/z axes

      const cosA = Math.cos(A), sinA = Math.sin(A);
      const cosB = Math.cos(B), sinB = Math.sin(B);

      for (let theta = 0; theta < 2 * Math.PI; theta += 0.07) {
        const cosTheta = Math.cos(theta), sinTheta = Math.sin(theta);
        
        for (let phi = 0; phi < 2 * Math.PI; phi += 0.02) {
          const cosPhi = Math.cos(phi), sinPhi = Math.sin(phi);
          
          // 3D coordinates
          const x = R2 + R1 * cosTheta;
          const y = R1 * sinTheta;
          
          // 3D rotation
          const x1 = x * (cosB * cosPhi + sinA * sinB * sinPhi) - y * cosA * sinB;
          const y1 = x * (sinB * cosPhi - sinA * cosB * sinPhi) + y * cosA * cosB;
          const z1 = K2 + cosA * x * sinPhi + y * sinA;
          const ooz = 1 / z1;
          
          // Projection
          const xp = Math.round(width / 2 + K1 * ooz * x1);
          const yp = Math.round(height / 2 - K1 * ooz * y1);
          
          // Luminance
          const L = cosPhi * cosTheta * sinB - cosA * cosTheta * sinPhi - sinA * sinTheta + cosB * (cosA * sinTheta - cosTheta * sinA * sinPhi);
          
          if (L > 0 && xp >= 0 && xp < width && yp >= 0 && yp < height) {
            const luminanceIndex = Math.floor(L * 8);
            const chars = ".,-~:;=!*#$@";
            if (ooz > buffer[yp][xp].charCodeAt(0) / 255) {
              buffer[yp][xp] = chars[luminanceIndex];
            }
          }
        }
      }
      
      setOutput(buffer.map(row => row.join("")).join("\n"));
      setT(prevT => prevT + 1);
    }, 50);

    return () => clearInterval(interval);
  }, [t]);

  return (
    <div className="fixed right-4 top-12 p-2">
      <pre className="text-purple-400 font-mono text-[8px] leading-[8px] whitespace-pre">
        {output}
      </pre>
    </div>
  );
}

export default function MacOSPortfolio() {
  const [openWindows, setOpenWindows] = useState({});
  const [currentTime, setCurrentTime] = useState('');
  const [iconPositions, setIconPositions] = useState(() => {
    const positions = {};
    icons.forEach((icon, index) => {
      positions[icon.id] = {
        x: 24,
        y: 100 + (index * 100)
      };
    });
    return positions;
  });
  const [draggedIcon, setDraggedIcon] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragTimeoutRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!draggedIcon) return;
      
      // If we haven't set isDragging yet and we've moved more than 5 pixels, it's a drag
      if (!isDragging && (Math.abs(e.clientX - dragStart.x) > 5 || Math.abs(e.clientY - dragStart.y) > 5)) {
        setIsDragging(true);
        if (dragTimeoutRef.current) {
          clearTimeout(dragTimeoutRef.current);
          dragTimeoutRef.current = null;
        }
      }
      
      const newX = Math.max(0, Math.min(window.innerWidth - 48, e.clientX - dragStart.x));
      const newY = Math.max(28, Math.min(window.innerHeight - 48, e.clientY - dragStart.y));
      
      setIconPositions(prev => ({
        ...prev,
        [draggedIcon]: { x: newX, y: newY }
      }));
    };

    const handleMouseUp = () => {
      if (isDragging) {
        // If we were dragging, don't trigger the click
        setIsDragging(false);
      } else if (dragTimeoutRef.current) {
        // If we weren't dragging and the timeout is still active, it was a click
        clearTimeout(dragTimeoutRef.current);
        dragTimeoutRef.current = null;
        toggleWindow(draggedIcon);
      }
      setDraggedIcon(null);
    };

    if (draggedIcon) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
    };
  }, [draggedIcon, dragStart, isDragging]);

  const toggleWindow = (id) => {
    setOpenWindows((prev) => ({ 
      ...prev, 
      [id]: !prev[id] 
    }));
  };

  const handleIconDragStart = (e, id) => {
    e.preventDefault();
    
    if (id === 'linkedin') {
      window.open('https://www.linkedin.com/in/rishabh-sinha-b4309a180', '_blank');
      return;
    }
    
    setDraggedIcon(id);
    const currentPos = iconPositions[id];
    setDragStart({ 
      x: e.clientX - currentPos.x, 
      y: e.clientY - currentPos.y 
    });
    setIsDragging(false);
    
    // Set a timeout for the click - if we don't start dragging within this time, it's a click
    dragTimeoutRef.current = setTimeout(() => {
      if (!isDragging) {
        toggleWindow(id);
      }
    }, 200);
  };

  const openWindowsArray = Object.keys(openWindows).filter(id => openWindows[id]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/wallpaper.jpg)' }}>
      <AnimatedDonut />
      <div className="fixed top-0 left-0 right-0 h-7 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-between px-4 text-white text-sm z-50">
        <div className="flex items-center gap-4">
          <div className="w-4 h-4 bg-white rounded-sm opacity-80"></div>
          <span>Rishabh Sinha</span>
        </div>
        <div className="flex items-center gap-3">
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <span className="font-mono">{currentTime}</span>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        {icons.map((icon) => {
          const IconComponent = icon.icon;
          const position = iconPositions[icon.id];
          return (
            <button
              key={icon.id}
              className="flex flex-col items-center group absolute pointer-events-auto"
              style={{ 
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: draggedIcon === icon.id ? 'scale(1.1)' : 'scale(1)',
                transition: draggedIcon === icon.id ? 'none' : 'transform 0.2s ease'
              }}
              onMouseDown={(e) => handleIconDragStart(e, icon.id)}
            >
              <div className={`w-16 h-16 ${icon.color} rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200 group-active:scale-95 hover:shadow-xl ${draggedIcon === icon.id ? 'ring-2 ring-white ring-opacity-50' : ''}`}>
                <IconComponent className={`w-8 h-8`} />
              </div>
              <span className="text-white text-sm mt-2 font-medium group-hover:text-gray-200 text-center leading-tight drop-shadow-lg">
                {icon.name}
              </span>
            </button>
          );
        })}
      </div>

      {openWindowsArray.map((windowId, index) => (
        <DraggableWindow 
          key={windowId} 
          windowId={windowId}
          windowIndex={index}
          onClose={() => toggleWindow(windowId)}
        >
          {windowContent[windowId]?.content}
        </DraggableWindow>
      ))}

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-white bg-opacity-20 rounded-2xl p-2 flex gap-1 shadow-2xl border border-white border-opacity-30" style={{ backdropFilter: 'blur(10px)' }}>
          {icons.map((icon) => {
            const IconComponent = icon.icon;
            return (
              <button
                key={icon.id}
                className={`w-10 h-10 ${icon.color} rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-200 active:scale-95 relative ${openWindows[icon.id] ? 'shadow-lg ring-2 ring-white ring-opacity-50' : ''}`}
                onClick={() => toggleWindow(icon.id)}
              >
                <IconComponent className="w-5 h-5 text-white" />
                {openWindows[icon.id] && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DraggableWindow({ children, windowId, onClose, windowIndex }) {
  const [position, setPosition] = useState({ x: 200 + windowIndex * 50, y: 100 + windowIndex * 50 });
  const [size, setSize] = useState({ width: 384, height: 450 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragStart.x));
        const newY = Math.max(28, Math.min(window.innerHeight - size.height, e.clientY - dragStart.y));
        setPosition({ x: newX, y: newY });
      } else if (isResizing) {
        const minWidth = 300;
        const minHeight = 300;
        const maxWidth = window.innerWidth - position.x;
        const maxHeight = window.innerHeight - position.y;

        let newWidth = size.width;
        let newHeight = size.height;

        if (resizeDirection.includes('e')) {
          newWidth = Math.min(maxWidth, Math.max(minWidth, e.clientX - position.x));
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.min(maxHeight, Math.max(minHeight, e.clientY - position.y));
        }

        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, position, size, resizeDirection]);

  const handleResizeStart = (e, direction) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  return (
    <div
      ref={windowRef}
      className="fixed select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: 1000 + windowIndex,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      <Card className="w-full h-full rounded-xl overflow-hidden bg-white shadow-2xl border border-border">
        <div 
          className="bg-gray-100 px-4 py-3 cursor-grab active:cursor-grabbing flex justify-between items-center border-b border-border" 
          onMouseDown={(e) => {
            if (e.target.closest('.window-controls')) return;
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
            e.preventDefault();
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-2 window-controls">
              <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition-colors flex items-center justify-center group" onClick={(e) => { e.stopPropagation(); onClose(); }}>
                <X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-yellow-600 transition-colors"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition-colors"></div>
            </div>
            <span className="text-gray-700 font-medium text-sm ml-2">{windowContent[windowId]?.title}</span>
          </div>
        </div>
        <div className="p-6 h-[calc(100%-3rem)] overflow-y-auto bg-white relative">
          {children}
          {/* Resize handles */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-1 cursor-e-resize hover:bg-blue-500 hover:opacity-50"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          <div 
            className="absolute left-0 right-0 bottom-0 h-1 cursor-s-resize hover:bg-blue-500 hover:opacity-50"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div 
            className="absolute right-0 bottom-0 w-1 h-1 cursor-se-resize hover:bg-blue-500 hover:opacity-50"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
        </div>
      </Card>
    </div>
  );
}
