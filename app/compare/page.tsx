import { ComparisonView } from "@/components/comparison-view";

export default function ComparePage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8">
        Compare GitHub Profiles
      </h1>
      <ComparisonView />
    </div>
  );
}
