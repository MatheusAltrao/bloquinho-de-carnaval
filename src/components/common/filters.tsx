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

export default function Filters() {
  const [date, setDate] = useState<Date>();
  return (
    <header>
      <div className="w-full max-w-[1200px] mx-auto p-4 flex items-center gap-2">
        <div className="flex items-center gap-2 w-full">
          <Input placeholder="Pesquisar por bloquinho" />
          <Button>
            <Search size={20} /> Buscar
          </Button>
        </div>
        <Separator orientation="vertical" />
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
      </div>
    </header>
  );
}
