import SearchRefinement from '@/components/search-refinement';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-5xl py-24 md:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline tracking-tight lg:text-5xl">
            Search for Heritage
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the magnificent monuments and diverse states of India.
          </p>
        </div>
        <SearchRefinement />
      </main>
      <Footer />
    </>
  );
}
