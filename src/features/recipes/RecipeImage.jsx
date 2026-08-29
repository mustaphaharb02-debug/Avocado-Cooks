import React, { useState } from 'react'

// A recipe photo that quietly steps aside when the file is missing.
//
// Every place that shows a recipe photo needs the same behaviour: try the
// image, and if it 404s or the recipe has no photo at all, show something
// friendly instead of a broken-image icon. That was written out four times;
// this is it written once.
//
// The look stays with the caller — it passes the class names and whatever
// should appear in place of the photo — so each page keeps its own design.

export default function RecipeImage({
  src,
  alt = '',
  className,
  fallbackClassName,
  fallback,
  loading = 'lazy',
}) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return <div className={fallbackClassName}>{fallback}</div>
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
