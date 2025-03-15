"use client";

import { useFiltersStore } from "../store/useFiltersStore";
import { useCharacters } from "../queries/useCharacters";
import { useEffect } from "react";
import { useQueryState } from "nuqs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CharacterList(): React.ReactNode { 
  const { status, gender, name, page, setPage } = useFiltersStore();

  const [pageQuery, setPageQuery] = useQueryState("page", {
    defaultValue: "1",
    shallow: false,
  });

  useEffect(() => {
    setPage(parseInt(pageQuery, 10) || 1);
  }, [pageQuery, setPage]);

  useEffect(() => {
    setPageQuery(page.toString());
  }, [page, setPageQuery]);

  const { data, isLoading, isError, error } = useCharacters({
    status,
    gender,
    name,
    page,
  });

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (data?.info.next) {
      setPage(page + 1);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Karakterler yükleniyor...</div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-500">{error?.message || "Bir hata oluştu"}</div>;
  }

  if (!data || data.results.length === 0) {
    return (
      <div className="text-center py-8">
        Bu filtrelere uygun karakter bulunamadı. Lütfen farklı filtreler deneyin.
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "default";
      case "dead":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.results.map((character) => (
          <Card key={character.id} className="overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <Image 
                src={character.image} 
                alt={character.name} 
                className="w-full h-full object-cover"
                width={300}
                height={300}
              />
            </div>
            <CardHeader className="p-4 pb-0">
              <h3 className="text-xl font-bold">{character.name}</h3>
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Durum:</span>
                <Badge variant={getStatusVariant(character.status)}>
                  {character.status}
                </Badge>
              </div>
              <p><span className="font-medium">Tür:</span> {character.species}</p>
              <p><span className="font-medium">Cinsiyet:</span> {character.gender}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center items-center gap-4">
        <Button
          onClick={handlePrevPage}
          disabled={page <= 1}
          variant={page <= 1 ? "outline" : "default"}
        >
          Önceki Sayfa
        </Button>
        
        <span className="text-lg">
          Sayfa {page} / {data.info.pages}
        </span>
        
        <Button
          onClick={handleNextPage}
          disabled={!data.info.next}
          variant={!data.info.next ? "outline" : "default"}
        >
          Sonraki Sayfa
        </Button>
      </div>
    </div>
  );
} 