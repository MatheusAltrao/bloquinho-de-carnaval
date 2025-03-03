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
import { useState } from "react";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";

export default function Filters() {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [search, setSearch] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  function handleAddFilterInParams() {
    const params = new URLSearchParams();

    if (date) {
      params.append("date", format(date, "yyyy-MM-dd"));
    }

    if (search) {
      params.append("search", search);
    }

    if (city) {
      params.append("city", city);
    }

    if (sort) {
      params.append("sort", sort);
    }

    //router.push(`/?date=${date}&search=${search}&city=${city}&sort=${sort}`);
    router.push(`/?search=${search}`);
  }

  return (
    <header>
      <div className="w-full max-w-[1200px] mx-auto p-4 flex items-center gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar por bloquinho"
        />

        <Select>
          <SelectTrigger className="w-full max-w-[180px]">
            <SelectValue placeholder="Cidades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sao-paulo">São Paulo</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full max-w-[180px]">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sao-paulo">Recenter Primeiro</SelectItem>
            <SelectItem value="sao-paulo">Antigas Primeiro</SelectItem>
          </SelectContent>
        </Select>

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
      </div>
    </header>
  );
}
