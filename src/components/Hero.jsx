import React, { useEffect, useState } from "react";
import "./css/Hero.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch banners
  const fetchBanners = async () => {
    try {
      setIsLoading(true);
      const category = "Banner";
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/gallery/${category}`);
      setBanners(res.data);
      setCurrentSlide(0);
    } catch (error) {
      console.error("Error fetching banners:", error);
      toast.error("Failed to load banners");
    } finally {
      setIsLoading(false);
      // toast.error("No banners available");
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchBanners();
  }, []);

  // Auto slide effect
  useEffect(() => {
    if (banners.length === 0) return;

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [banners]);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="sv-hero">
      <div className="sv-hero__container">
        {/* Image Slider */}
        <div className="sv-hero__slider-container">
          {isLoading ? (
            <div className="sv-hero__loader">
              <div className="sv-hero__loader-spinner"></div>
              <p>Loading banners...</p>
            </div>
          ) : (
            <>
              <div className="sv-hero__slider">
                {banners.map((slide, index) => (
                  <div
                    key={slide._id || index}
                    className={`sv-hero__slide ${
                      index === currentSlide ? "sv-hero__slide--active" : ""
                    } ${index < currentSlide ? "sv-hero__slide--prev" : "sv-hero__slide--next"}`}
                  >
                    <div className="sv-hero__slide-content">
                      <img 
                        className="sv-hero__image" 
                        src={slide.imageUrl} 
                        alt={slide.title || "Swanand Vibes Banner"} 
                        loading="lazy"
                      />
                      {slide.title && (
                        <div className="sv-hero__slide-caption">
                          <h3 className="sv-hero__slide-title">{slide.title}</h3>
                          {slide.description && (
                            <p className="sv-hero__slide-desc">{slide.description}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Controls */}
              {banners.length > 1 && (
                <>
                  <button 
                    className="sv-hero__slider-btn sv-hero__slider-btn--prev"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                  >
                    ‹
                  </button>
                  <button 
                    className="sv-hero__slider-btn sv-hero__slider-btn--next"
                    onClick={nextSlide}
                    aria-label="Next slide"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {banners.length > 1 && (
                <div className="sv-hero__dots">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      className={`sv-hero__dot ${
                        index === currentSlide ? "sv-hero__dot--active" : ""
                      }`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Background Effects */}
      <div className="sv-hero__background">
        <div className="sv-hero__orbs">
          <div className="sv-hero__orb sv-hero__orb--1"></div>
          <div className="sv-hero__orb sv-hero__orb--2"></div>
          <div className="sv-hero__orb sv-hero__orb--3"></div>
        </div>
        <div className="sv-hero__gradient"></div>
      </div>
    </section>
  );
};

export default Hero;

