import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})
function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      Your about page.
    </div>
  );
};

