"use client";

import { useQueryState } from "nuqs";
import { useFiltersStore } from "../store/useFiltersStore";
import { useEffect } from "react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { X, RefreshCw } from "lucide-react";
import { translateStatus, translateGender } from "../utils/translations";

export default function FilterSection(): React.ReactNode {
  const { 
    status, 
    gender, 
    name,
    setStatus, 
    setGender, 
    setName, 
    resetFilters 
  } = useFiltersStore();

  const [statusQuery, setStatusQuery] = useQueryState("status", {
    defaultValue: "",
    shallow: false,
  });

  const [genderQuery, setGenderQuery] = useQueryState("gender", {
    defaultValue: "",
    shallow: false,
  });

  const [nameQuery, setNameQuery] = useQueryState("name", {
    defaultValue: "",
    shallow: false,
  });

  useEffect(() => {
    setStatus(statusQuery);
    setGender(genderQuery);
    setName(nameQuery);
  }, [statusQuery, genderQuery, nameQuery, setStatus, setGender, setName]);

  useEffect(() => {
    setStatusQuery(status);
    setGenderQuery(gender);
    setNameQuery(name);
  }, [status, gender, name, setStatusQuery, setGenderQuery, setNameQuery]);

  const handleReset = () => {
    resetFilters();
  };

  const handleClearName = () => {
    setName("");
  };

  const hasActiveFilters = status || gender || name;

  return (
    <Card className="mb-8 overflow-hidden border border-border/40 bg-card">
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium flex items-center gap-1.5">
              İsim Ara
            </label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Karakter adı ara..."
                className="pr-8 transition-all focus-visible:ring-primary/30 border-border/60"
              />
              {name && (
                <button 
                  onClick={handleClearName}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">Durum</label>
            <Select 
              value={status || "all"} 
              onValueChange={(value) => setStatus(value === "all" ? "" : value)}
            >
              <SelectTrigger id="status" className="w-full transition-all focus-visible:ring-primary/30 cursor-pointer border-border/60">
                <SelectValue placeholder="Tümü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">Tümü</SelectItem>
                <SelectItem value="alive" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>{translateStatus("alive")}</span>
                  </div>
                </SelectItem>
                <SelectItem value="dead" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span>{translateStatus("dead")}</span>
                  </div>
                </SelectItem>
                <SelectItem value="unknown" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                    <span>{translateStatus("unknown")}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="gender" className="text-sm font-medium">Cinsiyet</label>
            <Select 
              value={gender || "all"} 
              onValueChange={(value) => setGender(value === "all" ? "" : value)}
            >
              <SelectTrigger id="gender" className="w-full transition-all focus-visible:ring-primary/30 cursor-pointer border-border/60">
                <SelectValue placeholder="Tümü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">Tümü</SelectItem>
                <SelectItem value="male" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">♂</span>
                    <span>{translateGender("male")}</span>
                  </div>
                </SelectItem>
                <SelectItem value="female" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="text-pink-500">♀</span>
                    <span>{translateGender("female")}</span>
                  </div>
                </SelectItem>
                <SelectItem value="genderless" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-500 text-xs">⊘</span>
                    <span>{translateGender("genderless")}</span>
                  </div>
                </SelectItem>
                <SelectItem value="unknown" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">?</span>
                    <span>{translateGender("unknown")}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-6 pt-4 border-t flex flex-wrap gap-2 justify-between items-center">
            <div className="flex flex-wrap gap-2 items-center">
              <div className="text-sm text-muted-foreground mr-2">Aktif Filtreler:</div>
              {name && (
                <Badge variant="outline" className="group border-border/60">
                  İsim: {name}
                  <button onClick={handleClearName} className="ml-1 opacity-70 group-hover:opacity-100 cursor-pointer">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {status && (
                <Badge 
                  variant="outline" 
                  className={`group ${
                    status === "alive" ? "border-green-200 bg-green-50/70 text-green-700" : 
                    status === "dead" ? "border-red-200 bg-red-50/70 text-red-700" : 
                    "border-gray-200 bg-gray-50/70 text-gray-700"
                  }`}
                >
                  Durum: {translateStatus(status)}
                  <button onClick={() => setStatus("")} className="ml-1 opacity-70 group-hover:opacity-100 cursor-pointer">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {gender && (
                <Badge 
                  variant="outline" 
                  className={`group ${
                    gender === "male" ? "border-blue-200 bg-blue-50/70 text-blue-700" : 
                    gender === "female" ? "border-pink-200 bg-pink-50/70 text-pink-700" : 
                    "border-gray-200 bg-gray-50/70 text-gray-700"
                  }`}
                >
                  Cinsiyet: {translateGender(gender)}
                  <button onClick={() => setGender("")} className="ml-1 opacity-70 group-hover:opacity-100 cursor-pointer">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
            <Button 
              onClick={handleReset}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive hover:bg-background/80 flex items-center gap-1"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Sıfırla</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 