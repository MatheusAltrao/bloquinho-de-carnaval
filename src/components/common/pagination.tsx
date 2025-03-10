"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CarnavalProps, CarnavalFiltersProps } from "@/types/carnaval.types";
import CarnavalCard from "@/components/common/carnaval-card";

interface PaginationComponentProps {
  carnaval: CarnavalProps;
  filters: CarnavalFiltersProps;
  currentPage: number;
}

export default function PaginationComponent({
  carnaval,
  filters,
  currentPage,
}: PaginationComponentProps) {
  const router = useRouter();
  const searchParams = new URLSearchParams();

  // Adiciona os filtros na URL
  Object.entries(filters).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });

  // Função para mudar de página
  function handlePageChange(page: number) {
    searchParams.set("page", page.toString());
    router.push(`?${searchParams.toString()}`, { scroll: false });
  }

  const lastPage = carnaval.meta.last_page;
  let startPage = Math.max(currentPage - 2, 2);
  let endPage = Math.min(currentPage + 2, lastPage - 1);

  if (currentPage <= 3) {
    startPage = 2;
    endPage = Math.min(5, lastPage - 1);
  } else if (currentPage >= lastPage - 2) {
    startPage = Math.max(lastPage - 4, 2);
    endPage = lastPage - 1;
  }

  const pages: (number | string)[] = [1];
  if (startPage > 2) pages.push("...");
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  if (endPage < lastPage - 1) pages.push("...");
  if (lastPage > 1) pages.push(lastPage);

  return (
    <div className="space-y-8 w-full max-w-[1200px]  mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {carnaval.data.map((item) => (
          <CarnavalCard key={item.id} carnaval={item} />
        ))}
      </div>

      {/* Botões de Paginação */}
      <div className=" fixed  left-0 right-0 bottom-4 flex items-center justify-center ">
        <div className="flex items-center p-4 bg-background border border-border rounded-md  justify-center gap-4">
          <Button
            size={"sm"}
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!carnaval.links.prev}
          >
            <ArrowLeft size={16} /> Anterior
          </Button>

          <div className="flex items-center gap-1">
            {pages.map((page, index) =>
              typeof page === "number" ? (
                <Button
                  size={"sm"}
                  key={index}
                  variant={currentPage === page ? "secondary" : "outline"}
                  onClick={() => handlePageChange(page)}
                >
                  {page.toString().padStart(2, "0")}{" "}
                  {/* Formata como 01, 02, 03 */}
                </Button>
              ) : (
                <span key={index} className="px-2 text-gray-500">
                  ...
                </span>
              )
            )}
          </div>

          <Button
            size={"sm"}
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!carnaval.links.next}
          >
            Próximo <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
