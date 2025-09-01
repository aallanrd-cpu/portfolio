'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { MediaGallery, ProjectImage, ProjectVideo } from '@/lib/types/project'

interface MediaGalleryProps {
  gallery: MediaGallery
  projectTitle: string
}

interface ImageModalProps {
  image: ProjectImage
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
  currentIndex?: number
  totalImages?: number
}

function ImageModal({ 
  image, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious, 
  currentIndex = 0, 
  totalImages = 1 
}: ImageModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="relative max-h-[90vh] max-w-[90vw] w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 text-white hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation arrows */}
        {totalImages > 1 && onPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {totalImages > 1 && onNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Image */}
        <div className="relative h-full w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>

        {/* Image info */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{image.alt}</h4>
              {image.caption && (
                <p className="text-sm text-gray-300 mt-1">{image.caption}</p>
              )}
            </div>
            {totalImages > 1 && (
              <div className="text-sm text-gray-300">
                {currentIndex + 1} / {totalImages}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function VideoPlayer({ video }: { video: ProjectVideo }) {
  if (video.type === 'youtube') {
    // Extract YouTube video ID from URL
    const videoId = video.src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
    
    return (
      <div className="aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.title}
          className="h-full w-full rounded-lg"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    )
  }

  return (
    <div className="aspect-video w-full">
      <video
        src={video.src}
        poster={video.thumbnail}
        controls
        className="h-full w-full rounded-lg object-cover"
        aria-label={video.title}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default function MediaGalleryComponent({ gallery, projectTitle }: MediaGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'screenshots' | 'diagrams' | 'videos'>('screenshots')

  const allImages = [...gallery.screenshots, ...gallery.diagrams]
  const hasContent = gallery.screenshots.length > 0 || gallery.diagrams.length > 0 || gallery.videos.length > 0

  if (!hasContent) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm text-center">
        <div className="text-4xl opacity-50 mb-4">🖼️</div>
        <h3 className="text-lg font-medium text-white mb-2">Media Gallery</h3>
        <p className="text-gray-400">Media content coming soon for this project.</p>
      </div>
    )
  }

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeImageModal = () => {
    setSelectedImageIndex(null)
  }

  const goToNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < allImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  const goToPreviousImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Media Gallery</h3>
        
        {/* Tabs */}
        <div className="flex gap-2">
          {gallery.screenshots.length > 0 && (
            <button
              onClick={() => setActiveTab('screenshots')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'screenshots'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Screenshots ({gallery.screenshots.length})
            </button>
          )}
          {gallery.diagrams.length > 0 && (
            <button
              onClick={() => setActiveTab('diagrams')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'diagrams'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Diagrams ({gallery.diagrams.length})
            </button>
          )}
          {gallery.videos.length > 0 && (
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'videos'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Videos ({gallery.videos.length})
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Screenshots */}
        {activeTab === 'screenshots' && gallery.screenshots.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.screenshots.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-gray-800"
                onClick={() => openImageModal(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-white text-xs backdrop-blur-sm">
                    {image.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Diagrams */}
        {activeTab === 'diagrams' && gallery.diagrams.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.diagrams.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-gray-800"
                onClick={() => openImageModal(gallery.screenshots.length + index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-white text-xs backdrop-blur-sm">
                    {image.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Videos */}
        {activeTab === 'videos' && gallery.videos.length > 0 && (
          <div className="space-y-6">
            {gallery.videos.map((video, index) => (
              <div key={index} className="space-y-3">
                <h4 className="text-lg font-medium text-white">{video.title}</h4>
                {video.description && (
                  <p className="text-gray-300 text-sm">{video.description}</p>
                )}
                <VideoPlayer video={video} />
              </div>
            ))}
          </div>
        )}

        {/* No content message */}
        {((activeTab === 'screenshots' && gallery.screenshots.length === 0) ||
          (activeTab === 'diagrams' && gallery.diagrams.length === 0) ||
          (activeTab === 'videos' && gallery.videos.length === 0)) && (
          <div className="text-center py-8">
            <div className="text-4xl opacity-50 mb-2">
              {activeTab === 'screenshots' ? '📷' : activeTab === 'diagrams' ? '📊' : '🎥'}
            </div>
            <p className="text-gray-400">No {activeTab} available for this project.</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImageIndex !== null && allImages[selectedImageIndex] && (
        <ImageModal
          image={allImages[selectedImageIndex]}
          isOpen={selectedImageIndex !== null}
          onClose={closeImageModal}
          onNext={goToNextImage}
          onPrevious={goToPreviousImage}
          currentIndex={selectedImageIndex}
          totalImages={allImages.length}
        />
      )}
    </div>
  )
}