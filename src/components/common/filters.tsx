"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cities } from "@/helpers/cities.helpers";
import { ptBR } from "date-fns/locale";
import ActivedFilters from "./actived-filters";

export default function Filters() {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [search, setSearch] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    /*  const date = searchParams.get("date"); */
    const search = searchParams.get("search");
    const city = searchParams.get("city");
    const sort = searchParams.get("sort");

    /*  if (date) {
      setDate(new Date(format(date, "yyyy-MM-dd")));
    } */

    if (search) {
      setSearch(search);
    }

    if (city) {
      setCity(city);
    }

    if (sort) {
      setSort(sort);
    }
  }, []);

  function handleAddFilterInParams() {
    const filters = {
      date: date || "",
      search: search || "",
      city: city || "",
      sort: sort || "",
    };

    const hasSearch = filters.search ? `search=${filters.search}` : "";
    const hasDate = filters.date
      ? `&date=${format(new Date(filters.date), "yyyy-MM-dd")}`
      : "";
    const hasCity = filters.city ? `&city=${filters.city}` : "";
    const hasSort = filters.sort ? `&sort=${filters.sort}` : "";

    router.push(`/?${hasSearch}${hasDate}${hasCity}${hasSort}`);
  }

  function handleRemoveFilter(filterKey: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete(filterKey);
    clearStateWithFilter(filterKey);
    router.push(`?${newParams.toString()}`, { scroll: false });
  }

  function clearStateWithFilter(filterKey: string) {
    switch (filterKey) {
      case "search":
        setSearch("");
        break;
      case "city":
        setCity("");
        break;
      case "sort":
        setSort("");
        break;
      case "date":
        setDate(undefined);
        break;
    }
  }

  return (
    <div className="space-y-4">
      <header className="  flex items-center gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar por bloquinho"
        />
        {/* cidades */}
        <Select value={city} onValueChange={(value) => setCity(value)}>
          <SelectTrigger className="w-full max-w-[180px]">
            <SelectValue placeholder="Cidades" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* ordenar */}
        <Select value={sort} onValueChange={(value) => setSort(value)}>
          <SelectTrigger className="w-full max-w-[180px]">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Recentes Primeiro</SelectItem>
            <SelectItem value="asc">Antigas Primeiro</SelectItem>
          </SelectContent>
        </Select>
        {/* calendario */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full max-w-[180px] justify-start text-left  font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date ? (
                format(date, "dd 'de' MMMM", { locale: ptBR })
              ) : (
                <span>Escolher data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ptBR}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button onClick={handleAddFilterInParams}>
          <Search size={20} /> Buscar
        </Button>
      </header>
      <ActivedFilters handleRemoveFilter={handleRemoveFilter} />
    </div>
  );
}
