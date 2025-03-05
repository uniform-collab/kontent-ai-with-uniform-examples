# Kontent.ai with Uniform Examples

This project is based on the Uniform Component Starter Kit (CSK) v6, built for Next.js 15 App Router with React 19, TailwindCSS, and TypeScript. It demonstrates integration patterns between Kontent.ai and Uniform.

## Featured Examples

### 1. Rich Text Rendering from Kontent.ai

This example demonstrates how to render Rich Text content from Kontent.ai within Uniform components:

- Custom `KaiRichText` component that handles Kontent.ai's rich text format
- Resolvers for various content types including:
  - Links (both internal and external)
  - Images
  - Tables
  - Embedded components/items
- Proper HTML structure and styling for complex content

### 2. Parameter Transformation with Enhancers

This example shows how to transform string parameters from Kontent.ai into structured data using Uniform enhancers:

- `BynderImage` component that works with Kontent.ai's Bynder integration
- Custom enhancer that:
  - Parses JSON string data from Kontent.ai
  - Extracts structured properties (id, webUrl, title)
  - Makes them available as component parameters
- Integration with Uniform's enhancer system for seamless data transformation

## Getting Started

### Prerequisites

- A Uniform account with the ability to create a new project
- A Kontent.ai account with content models set up
- Node.js LTS and `git` installed on your machine

### Setup

1. Clone this repository
2. Create a `.env` file with your Uniform project connection details:
   ```
   UNIFORM_PROJECT_ID=
   UNIFORM_API_KEY=
   UNIFORM_PREVIEW_SECRET=hello-world
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Initialize your project:
   ```bash
   npm run init
   ```

### Development

Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see your site and open the Uniform canvas to edit content.

## How the Examples Work

### Rich Text Component

The `KaiRichText` component (`src/components/custom-canvas/kai/RichText/KaiRichText.tsx`) processes rich text data from Kontent.ai and renders it as HTML. It includes custom resolvers for:

- Links to content items
- External links
- Images
- Tables
- Lists
- Headings

### Bynder Image Enhancer

The Bynder integration example (`src/components/custom-canvas/kai/BynderImage/BynderImage.tsx` and `src/utils/enhancers.ts`) demonstrates:

1. How to register an enhancer with Uniform
2. How to parse JSON string data from Kontent.ai
3. How to extract and provide structured data to components

The enhancer transforms the raw JSON string into usable properties that the component can directly access.

## Additional Resources

- [Uniform Documentation](https://docs.uniform.app/)
- [Kontent.ai Documentation](https://kontent.ai/learn/)
- [Next.js Documentation](https://nextjs.org/docs)
