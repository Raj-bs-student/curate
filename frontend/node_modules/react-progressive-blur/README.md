# React Progressive Blur

A lightweight React component that creates smooth, progressive blur effects with customizable intensity and positioning. Perfect for creating modern UI overlays, video controls, and aesthetic blur gradients.

### Basic Example

![Basic Example](https://github.com/rakib86/react-progressive-blur/raw/main/assets/react-progressive-blur-demo-1.jpg)
![Basic Example](https://github.com/rakib86/react-progressive-blur/raw/main/assets/react-progressive-blur-demo-2.jpg)


## Features

- 🎯 **Progressive blur layers** - Creates smooth transitions with multiple blur intensities
- 📍 **Flexible positioning** - Apply blur effects to any edge (top, bottom, left, right)
- ⚡ **Customizable intensity** - Control the blur strength with a simple prop
- 🎨 **Tailwind CSS compatible** - Seamlessly integrate with your existing styles
- 📱 **Cross-browser support** - Works with both `backdrop-filter` and `-webkit-backdrop-filter`

## Installation

```bash
npm install react-progressive-blur
```

## Usage


```tsx
import React from "react";
import BlurEffect from "react-progressive-blur";

export default function MyComponent() {
  return (
    <div className="relative">
      {/* Your content */}
      <img src="/your-image.jpg" alt="Background" />
      
      {/* Add blur effect */}
      <BlurEffect position="top" intensity={50} />
    </div>
  );
}
```

### Video Overlay Example

```tsx
"use client";
import React from "react";
import BlurEffect from "react-progressive-blur";

export default function VideoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="max-w-[80rem] mx-auto my-8">
        <div className="relative rounded-[4rem] overflow-hidden">
          {/* Video with border radius */}
          <video
            src="/demo.webm"
            className="w-full rounded-xl"
            controls
            autoPlay
            muted
            loop
          />
          
          {/* Top blur overlay */}
          <BlurEffect
            className="h-32 bg-gradient-to-b from-black/20 to-transparent"
            intensity={100}
            position="top"
          />
          
          {/* Bottom blur overlay */}
          <BlurEffect
            className="h-72 bg-gradient-to-t from-black/20 to-transparent"
            intensity={200}
            position="bottom"
          />
        </div>
      </div>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes to apply to the blur container |
| `intensity` | `number` | `50` | Blur intensity (higher values = more blur) |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Edge where the blur effect should be applied |

## How It Works

The component creates three progressive blur layers with increasing intensity:

1. **Light blur** (1x intensity factor) - Covers 0-25% of the specified edge
2. **Medium blur** (3x intensity factor) - Covers 25-75% of the specified edge  
3. **Heavy blur** (6x intensity factor) - Covers 75-100% of the specified edge

Each layer uses CSS `mask-image` with linear gradients to create smooth transitions between blur levels.

## Styling Tips

### Combining with Gradients

```tsx
<BlurEffect
  className="bg-gradient-to-b from-black/30 to-transparent"
  position="top"
  intensity={75}
/>
```

### Custom Height/Width

```tsx
{/* For horizontal positions (top/bottom) */}
<BlurEffect
  className="h-40"
  position="top"
  intensity={100}
/>

{/* For vertical positions (left/right) */}
<BlurEffect
  className="w-32"
  position="left"
  intensity={100}
/>
```

### Multiple Blur Effects

```tsx
<div className="relative">
  <img src="/background.jpg" alt="Background" />
  
  {/* Top blur */}
  <BlurEffect position="top" intensity={80} className="h-24" />
  
  {/* Bottom blur */}
  <BlurEffect position="bottom" intensity={120} className="h-32" />
  
  {/* Left side blur */}
  <BlurEffect position="left" intensity={60} className="w-16" />
</div>
```

## Browser Support

This component uses modern CSS features:
- `backdrop-filter` (with `-webkit-backdrop-filter` fallback)
- `mask-image` (with `-webkit-mask-image` fallback)

Supported in all modern browsers. For older browser compatibility, consider adding appropriate polyfills.

## License

MIT © Rakibur Rahaman

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.