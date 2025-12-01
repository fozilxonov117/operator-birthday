import { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface ImageCarouselProps {
  images: string[];
  altText: string;
  autoPlayInterval?: number;
}

export const ImageCarousel = ({ 
  images, 
  altText, 
  autoPlayInterval = 5000 
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Remove auto-play functionality - manual control only
  // useEffect(() => {
  //   if (images.length <= 1) return;

  //   const timer = setInterval(() => {
  //     handleNext();
  //   }, autoPlayInterval);

  //   return () => clearInterval(timer);
  // }, [currentIndex, images.length, autoPlayInterval]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // If only one image, show it without carousel controls
  if (images.length <= 1) {
    return (
      <Box
        component="img"
        src={images[0]}
        alt={altText}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: '0 auto',
          maxWidth: '80%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          zIndex: 1,
        }}
      />
    );
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Image Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            src={images[currentIndex]}
            alt={`${altText} ${currentIndex + 1}`}
            style={{
              width: '100%',
              maxWidth: '80%',
              display: 'flex',
              justifyContent: 'center',
              margin: '0 auto',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              zIndex: 1,
            }}
          />
        </AnimatePresence>
      </Box>

      {/* Navigation Buttons */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        sx={{
          position: 'absolute',
          left: 4,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          padding: 0.5,
          minWidth: 'auto',
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: 28 }} />
      </IconButton>

      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        sx={{
          position: 'absolute',
          right: 4,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          padding: 0.5,
          minWidth: 'auto',
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <ChevronRightIcon sx={{ fontSize: 28 }} />
      </IconButton>

      {/* Pagination Dots */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 2,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'scale(1.2)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
