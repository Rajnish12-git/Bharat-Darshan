import SearchRefinement from "@/components/search-refinement";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function SearchPage() {
  return (
    <>
    <Header />
    <div className="container mx-auto max-w-3xl py-24 md:py-32">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight lg:text-5xl">Search for Heritage</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Start with a monument or state. Then, refine your search conversationally with our AI assistant.
        </p>
      </div>
      <SearchRefinement />
    </div>
    <Footer />
    </>
  );
}
