// Animation Configuration Documentation
// 
// This file documents the animation system implemented for the homepage.
// 
// ## Animated Stats Counter
// 
// **Location**: src/components/home/StatCard.tsx
// **Hook**: src/hooks/useCountUp.tsx
// 
// ### Features:
// - Smooth count-up animation using easeOutExpo easing
// - Triggers when stat comes into viewport (30% visible)
// - Handles multiple formats:
//   - Percentages: "100%" → animates to 100
//   - Ratios: "1:10" → animates first number
//   - Plus suffix: "50+" → animates to 50
//   - Plain numbers
// - 2.5 second duration for smooth effect
// - Icon scales in (0.5s)
// - Number fades in with slight upward motion (0.7s, 200ms delay)
// - Label fades in with slight upward motion (0.7s, 400ms delay)
// 
// ### Usage:
// ```tsx
// <StatCard icon="school" value="100%" label="Pass Rate" />
// ```
// 
// ## Scroll Reveal Animations
// 
// **Location**: src/hooks/useScrollAnimation.tsx
// **Component**: ScrollReveal
// 
// ### Available Animations:
// - fadeIn
// - fadeInUp (default)
// - fadeInDown
// - fadeInLeft
// - fadeInRight
// - scaleIn
// - slideInLeft
// - slideInRight
// - bounceIn
// - rotateIn
// 
// ### Applied To:
// 1. **Academic Pathways Section**
//    - Header: fadeInUp
//    - Cards: fadeInUp with staggered delay (150ms increments)
// 
// 2. **Boarding Section**
//    - Content: fadeInLeft
//    - Image: fadeInRight with 200ms delay
// 
// 3. **News Section**
//    - Header: fadeInUp
//    - Cards: fadeInUp with staggered delay (100ms increments)
// 
// 4. **Testimonials Section**
//    - Header: fadeInUp
//    - Cards: fadeInUp with staggered delay (150ms increments)
// 
// ### Usage:
// ```tsx
// <ScrollReveal animation="fadeInUp" delay={200}>
//   <YourComponent />
// </ScrollReveal>
// ```
// 
// ## Performance Notes:
// - All animations use CSS transforms (GPU accelerated)
// - IntersectionObserver for efficient scroll detection
// - triggerOnce=true prevents re-animation on scroll back
// - Reduced motion support recommended (add to globals.css):
//   ```css
//   @media (prefers-reduced-motion: reduce) {
//     * {
//       animation-duration: 0.01ms !important;
//       transition-duration: 0.01ms !important;
//     }
//   }
//   ```
// 
// ## Browser Support:
// - IntersectionObserver: All modern browsers
// - requestAnimationFrame: All modern browsers
// - Fallback: Animations gracefully degrade to instant display
// 
// ## Accessibility:
// - Respects prefers-reduced-motion (if implemented)
// - No critical content relies on animations
// - All content accessible without JavaScript
