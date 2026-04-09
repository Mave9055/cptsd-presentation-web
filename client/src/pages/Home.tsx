import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  content: string;
  keyPoints: string[];
}

export default function Home() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load lecture data
    fetch('/lecture-data.json')
      .then(res => res.json())
      .then(data => {
        setSlides(data.slides);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load slides:', err);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-pulse text-2xl font-bold text-slate-700">Loading presentation...</div>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-700">No slides found</div>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Understanding Complex PTSD</h1>
            <p className="text-sm text-slate-600">Through Daniel's Life</p>
          </div>
          <div className="text-sm font-medium text-slate-600">
            Slide {currentSlide + 1} of {slides.length}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl">
          {/* Slide Container */}
          <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            {/* Slide Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white px-8 py-8 border-b-4 border-red-600">
              <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
              <div className="h-1 w-16 bg-red-500 rounded"></div>
            </div>

            {/* Slide Content */}
            <div className="px-8 py-8">
              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                {slide.content}
              </p>

              {/* Key Points */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Key Points</h3>
                <ul className="space-y-3">
                  {slide.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 bg-red-600 rounded-full"></div>
                      <span className="text-slate-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <Button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlide
                    ? 'bg-red-600 w-8'
                    : 'bg-slate-300 w-2 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={currentSlide === slides.length - 1}
            variant="default"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
