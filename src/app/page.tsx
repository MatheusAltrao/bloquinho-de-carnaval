import Filters from "@/components/common/filters";
import PaginationComponent from "@/components/common/pagination";
import { CarnavalFiltersProps, CarnavalProps } from "@/types/carnaval.types";

async function fetchCarnaval2025(filters: CarnavalFiltersProps = {}, page = 1) {
  const queryParams = new URLSearchParams();

  if (filters.search) queryParams.append("search", filters.search);
  if (filters.date) queryParams.append("date", filters.date);
  if (filters.city) queryParams.append("city", filters.city);
  if (filters.sort) queryParams.append("sort", filters.sort);

  queryParams.append("page", String(page));

  const url = `${
    process.env.NEXT_PUBLIC_CODANTE_API_URL
  }/agenda?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    const carnaval = await response.json();

    return carnaval;
  } catch (error) {
    console.log(error);
    return [];
  }
}

interface HomeProps {
  searchParams: {
    date?: string;
    search?: string;
    city?: string;
    sort?: string;
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const filters = {
    date: searchParams.date || "",
    search: searchParams.search || "",
    city: searchParams.city || "",
    sort: searchParams.sort || "",
  };
  const page = Number(searchParams.page) || 1;

  const carnaval: CarnavalProps = await fetchCarnaval2025(filters, page);

  return (
    <div className="space-y-8 w-full max-w-[1200px] p-4 mx-auto pb-24">
      <Filters />

      <PaginationComponent
        carnaval={carnaval}
        filters={filters}
        currentPage={page}
      />
    </div>
  );
}
