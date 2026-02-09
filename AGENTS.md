# SignSecure Website - Agent Guidelines

## UI & Design Rules

### Buttons
- **Never add shimmer, shine, or looping animations to buttons.** Buttons should feel stable and trustworthy. No `btn-shine`, `shimmer`, `pulse`, or similar CSS animation classes on `<Button>` or `<a>` elements styled as buttons.
- Hover and active state transitions (scale, opacity, color shift) are fine.
- Focus ring animations for accessibility are fine.

### Animations General
- Use animations for **scroll-reveal, page transitions, and decorative/background elements** only.
- Interactive elements (buttons, links, form controls) should use **transitions** (hover, focus, active states), not looping keyframe animations.
- Avoid animation on elements that the user needs to click -- it creates a sense of instability.
