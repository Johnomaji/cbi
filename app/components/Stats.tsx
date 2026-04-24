"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Globe, Heart, BarChart3, BookOpen, Droplets, ShieldCheck, Wheat } from "lucide-react";
import type { StatItem } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Users, Globe, Heart, BarChart3, BookOpen, Droplets, ShieldCheck, Wheat,
};

function CountUp({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Stats({ items }: { items: StatItem[] }) {
  return (
    <section className="bg-cbi-blue-dark py-20 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cbi-yellow/10 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-cbi-yellow font-semibold text-sm italic flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-cbi-yellow inline-block rounded-full" />
            Our Impact in Numbers
            <span className="w-6 h-0.5 bg-cbi-yellow inline-block rounded-full" />
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Measuring What <span className="text-cbi-yellow italic">Matters</span></h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((stat) => {
            const Icon = iconMap[stat.icon] ?? Users;
            return (
              <div key={stat.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl py-10 px-6 text-center group hover:bg-white/15 transition-colors border border-white/10">
                {/* Icon circle */}
                <div className="w-14 h-14 rounded-full bg-cbi-yellow/20 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-6 h-6 text-cbi-yellow" />
                </div>

                {/* Big number */}
                <div className="text-4xl sm:text-5xl font-black text-white leading-none mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>

                <p className="text-blue-200 text-sm font-medium">{stat.label}</p>

                {/* Yellow underline */}
                <div className="mt-4 w-10 h-1 bg-cbi-yellow rounded-full mx-auto" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
