import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  'https://images.unsplash.com/photo-1658243862459-145b453dd74e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWN8ZW58MXx8fHwxNzY5ODYyMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1583939411023-14783179e581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzY5ODg3MTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1761114905078-163aa92141c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9uJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzY5ODUwMzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3N8ZW58MXx8fHwxNzY5OTQ1ODM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1692167900605-e02666cadb6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYm91cXVldCUyMGZsb3dlcnN8ZW58MXx8fHwxNzY5ODg3NzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1675048524538-9d0c531eaed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBlbGVnYW50fGVufDF8fHx8MTc2OTkyMjA5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1677691256999-45d69a11b197?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTk0NTgzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1541980162-4d2fd81f420d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9vbSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTk0NTgzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1639330693395-0944b5bef0c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGFuY2V8ZW58MXx8fHwxNzY5OTQ1ODM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1768777273847-e5d8531b7fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZ3Vlc3RzJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzY5OTI5MjE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1535254973040-607b474cb50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZXxlbnwxfHx8fDE3Njk5NDU4MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1752857015560-d5c05b3f7ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3IlMjBlbGVnYW50fGVufDF8fHx8MTc2OTk0NTgzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1545893397-bda9d9618106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHklMjByb21hbnRpY3xlbnwxfHx8fDE3Njk4ODcxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1612883809638-9314edb33efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwb3V0ZG9vciUyMG5hdHVyZXxlbnwxfHx8fDE3Njk4NjI3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1519657502999-ab785d28a1f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwaG9sZGluZyUyMGhhbmRzfGVufDF8fHx8MTc2OTk0NTgzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1665533262922-cc85f3b755df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwa2lzc3xlbnwxfHx8fDE3Njk5NDU4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1677768061409-3d4fbd0250d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjBzZXR0aW5nfGVufDF8fHx8MTc2OTk0NTgzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1629943163055-d8c9c9fd8a88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwc3Vuc2V0JTIwcm9tYW50aWN8ZW58MXx8fHwxNzY5ODYyMjA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1604531826442-c7b02558f6d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVpbCUyMGJyaWRlfGVufDF8fHx8MTc2OTk0NTgzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1677768061310-9df8bf85ce08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwc2hvZXMlMjBkZXRhaWxzfGVufDF8fHx8MTc2OTk0NTgzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1549620936-aa6278062ba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGFydHklMjBicmlkZXNtYWlkc3xlbnwxfHx8fDE3Njk5NDU4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
];

export default function WeddingGallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <>
      {/* Gallery Grid - 3 columns x 7 rows, 0px gap */}
      <div 
        className="absolute left-0 top-[5968px] w-[393px] h-[1239px] grid grid-cols-3 gap-0"
        data-name="갤러리구간"
      >
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-full overflow-hidden cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image}
              alt={`Wedding photo ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Viewer */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X size={32} />
          </button>

          {/* Previous Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 z-10 text-white hover:text-gray-300 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={48} />
          </button>

          {/* Current Image */}
          <div className="max-w-full max-h-full p-12">
            <img
              src={galleryImages[selectedImageIndex]}
              alt={`Wedding photo ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-4 z-10 text-white hover:text-gray-300 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </>
  );
}
