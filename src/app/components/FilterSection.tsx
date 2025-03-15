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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Filtreler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col space-y-2 min-w-[200px]">
            <label htmlFor="name" className="text-sm font-medium">İsim:</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Karakter adı ara..."
              className="w-full"
            />
          </div>

          <div className="flex flex-col space-y-2 min-w-[200px]">
            <label htmlFor="status" className="text-sm font-medium">Durum:</label>
            <Select 
              value={status || "all"} 
              onValueChange={(value) => setStatus(value === "all" ? "" : value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Tümü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="alive">Alive</SelectItem>
                <SelectItem value="dead">Dead</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col space-y-2 min-w-[200px]">
            <label htmlFor="gender" className="text-sm font-medium">Cinsiyet:</label>
            <Select 
              value={gender || "all"} 
              onValueChange={(value) => setGender(value === "all" ? "" : value)}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Tümü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="genderless">Genderless</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button 
              onClick={handleReset}
              variant="destructive"
            >
              Filtreleri Sıfırla
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 