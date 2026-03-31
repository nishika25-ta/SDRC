import React, { useState, useEffect, useRef } from 'react';

export function BlurText({ text, delay = 0, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
  }, []);

  const words = text ? text.split(" ") : [];
  return (
    <div ref={textRef} className={`flex flex-wrap justify-center gap-[0.25em] ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: isVisible ? 1 : 0,
            filter: isVisible ? 'blur(0px)' : 'blur(12px)',
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${delay + (index * 100)}ms`
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
