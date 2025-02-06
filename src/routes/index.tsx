import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})
function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      Your Home page.
    </div>
  );
};

