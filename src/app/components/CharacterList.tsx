"use client";

import { useFiltersStore } from "../store/useFiltersStore";
import { useCharacters } from "../queries/useCharacters";
import { useEffect } from "react";
import { useQueryState } from "nuqs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

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
    return (
      <Card className="mb-8 overflow-hidden border border-border/40 bg-card">
        <CardContent className="py-12">
          <div className="text-center text-muted-foreground">Karakterler yükleniyor...</div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="mb-8 overflow-hidden border border-border/40 bg-card">
        <CardContent className="py-12">
          <div className="text-center flex flex-col items-center gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <p className="text-destructive font-medium">{error?.message || "Bir hata oluştu"}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.results.length === 0) {
    return (
      <Card className="mb-8 overflow-hidden border border-border/40 bg-card">
        <CardContent className="py-12">
          <div className="text-center text-muted-foreground">
            Bu filtrelere uygun karakter bulunamadı. Lütfen farklı filtreler deneyin.
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "border-green-200 bg-green-50/70 text-green-700";
      case "dead":
        return "border-red-200 bg-red-50/70 text-red-700";
      default:
        return "border-gray-200 bg-gray-50/70 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return <span className="h-2 w-2 rounded-full bg-green-500"></span>;
      case "dead":
        return <span className="h-2 w-2 rounded-full bg-red-500"></span>;
      default:
        return <span className="h-2 w-2 rounded-full bg-gray-400"></span>;
    }
  };

  const getGenderColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return "border-blue-200 bg-blue-50/70 text-blue-700";
      case "female":
        return "border-pink-200 bg-pink-50/70 text-pink-700";
      case "genderless":
        return "border-purple-200 bg-purple-50/70 text-purple-700";
      default:
        return "border-gray-200 bg-gray-50/70 text-gray-700";
    }
  };

  const getGenderIcon = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return <span className="text-blue-500">♂</span>;
      case "female":
        return <span className="text-pink-500">♀</span>;
      case "genderless":
        return <span className="text-purple-500 text-xs">⊘</span>;
      default:
        return <span className="text-gray-500">?</span>;
    }
  };

  return (
    <Card className="mb-8 overflow-hidden border border-border/40 bg-card">
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data.results.map((character) => (
            <Card key={character.id} className="overflow-hidden py-0 border hover:border-primary/30 transition-colors duration-200">
              <div className="flex flex-row h-full">
                <div className="w-1/3 overflow-hidden">
                  <Image 
                    src={character.image} 
                    alt={character.name} 
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-2/3">
                  <CardHeader className="p-3 pb-0">
                    <h3 className="text-base font-bold line-clamp-1">{character.name}</h3>
                    <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Tür:</span> {character.species}</p>
                  </CardHeader>
                  <CardContent className="p-3 pt-1 space-y-1.5">
                    <div className="flex flex-row gap-2">
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(character.status)}
                      >
                        <div className="flex items-center gap-1">
                          {getStatusIcon(character.status)}
                          <span>{character.status}</span>
                        </div>
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={getGenderColor(character.gender)}
                      >
                        <div className="flex items-center gap-1">
                          {getGenderIcon(character.gender)}
                          <span>{character.gender}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground order-2 sm:order-1 w-full sm:w-auto text-center sm:text-left">
            Toplam: <span className="font-medium">{data.info.count}</span> karakter
          </div>
          
          <div className="flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto justify-center sm:justify-end">
            <Button
              onClick={handlePrevPage}
              disabled={page <= 1}
              variant="outline"
              size="sm"
              className="h-8 px-2 border-border/60 hover:bg-background/80 hover:text-primary cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Önceki
            </Button>
            
            <span className="text-sm font-medium px-2">
              {page} / {data.info.pages}
            </span>
            
            <Button
              onClick={handleNextPage}
              disabled={!data.info.next}
              variant="outline"
              size="sm"
              className="h-8 px-2 border-border/60 hover:bg-background/80 hover:text-primary cursor-pointer"
            >
              Sonraki
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 