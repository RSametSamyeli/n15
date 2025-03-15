import { Suspense } from "react";
import CharacterList from "./components/CharacterList";
import FilterSection from "./components/FilterSection";
import { QueryClient } from "@tanstack/react-query";
import { HydrateQueries } from "./utils/hydrateQueries";
import { prefetchQueries } from "./utils/serverQueries";
import { getCharacters } from "./api/rickAndMorty";

async function getInitialData() {
  const queryClient = new QueryClient();
  
  const state = await prefetchQueries(queryClient, [
    () => getCharacters({ page: 1 }),
  ]);
  
  return state;
}

export default async function Home(): Promise<React.ReactNode> {
  const state = await getInitialData();
  
  return (
    <div className="container mx-auto py-8 px-4">      
      <Suspense fallback={<div className="text-center py-4">Filtreler yükleniyor...</div>}>
        <FilterSection />
      </Suspense>
      
      <HydrateQueries state={state}>
        <Suspense fallback={<div className="text-center py-8">Karakterler yükleniyor...</div>}>
          <CharacterList />
        </Suspense>
      </HydrateQueries>
    </div>
  );
} 