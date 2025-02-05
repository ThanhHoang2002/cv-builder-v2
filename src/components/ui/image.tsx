import { forwardRef, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

import  fallbackImage from '@/assets/image/fallback_image.png'
import { cn } from '@/utils/cn'

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
  onLoadError?: (error: string) => void
}

const Image = forwardRef<HTMLImageElement,ImageProps>(({
  src,
  alt = '',
  className = '',
  fallback = fallbackImage,
  onLoadError,
  ...props
},ref) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    const errorMessage = `Failed to load image: ${src}`
    setError(errorMessage)
    onLoadError?.(errorMessage)
  }

  if (error || !src) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={cn(
          'object-cover',
          className
        )}
        {...props}
      />
    )
  }
  return (
    <>
      <img
        src={src}
        alt={alt}
        ref={ref}
        className={cn(
          'object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0 ' : 'opacity-100',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      {isLoading && (
        <div className={cn(
          'absolute inset-0 top-0 flex items-center justify-center bg-background/50'
        )}>
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-primary" />
        </div>
      )}
    </>
  )
})
Image.displayName = 'Image'
export default Image
