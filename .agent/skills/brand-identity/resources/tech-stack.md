# Preferred Tech Stack & Implementation Rules

When generating code or UI components for this brand, you **MUST** strictly adhere to the following technology choices.

## Core Stack
* **Framework:** React (TypeScript preferred)
* **Styling Engine:** Tailwind CSS (Mandatory. Do not use plain CSS or styled-components unless explicitly asked.)
* **Component Library:** shadcn/ui (Use these primitives as the base for all new components.)
* **Animations:** Framer Motion (Recommended for smooth micro-interactions).
* **Icons:** Lucide React

## Implementation Guidelines

### 1. Tailwind Usage
* Use utility classes directly in JSX.
* Utilize the color tokens defined in `design-tokens.json`.
    * **Primary Action:** `bg-[#CAFC00] text-black hover:bg-[#B5E600]` (Acid Green).
* **Dark Mode:** Support dark mode using Tailwind's `dark:` variant modifier.

### 2. Component Patterns
* **Interactive Cards:**
    * Cards must have subtle hover effects (scale up slightly `hover:scale-[1.02]` or border highlight).
    * Use glassmorphism or slight transparency where appropriate for a "premium" feel.
* **Grid Layouts:**
    * Use "Bento" style grids (CSS Grid) for showcasing categories or lists.
    * Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` as a standard responsive pattern.
* **Buttons:**
    * Primary: Acid Green background, Black text. Rounded corners (`rounded-lg` or `rounded-full`).
    * Secondary: Ghost or Outline variants.
* **Forms:**
    * Labels above inputs.
    * Inputs should have clean borders and focus rings matching the primary color.

### 3. Forbidden Patterns
* Do NOT use jQuery.
* Do NOT use Bootstrap classes.
* Do NOT create new CSS files; keep styles located within component files via Tailwind.
