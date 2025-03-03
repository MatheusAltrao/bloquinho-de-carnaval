import CarnavalCard from "@/components/common/carnaval-card";
import Filters from "@/components/common/filters";
import { CarnavalFiltersProps, CarnavalProps } from "@/types/carnaval.types";

async function fetchCarnaval2025(filters: CarnavalFiltersProps = {}) {
  const hasSearch = filters.search ? `search=${filters.search}` : "";
  const hasDate = filters.date ? `&date=${filters.date}` : "";
  const hasCity = filters.city ? `&city=${filters.city}` : "";
  const hasSort = filters.sort ? `&sort=${filters.sort}` : "";

  const url = `${process.env.NEXT_PUBLIC_CODANTE_API_URL}/agenda?${hasSearch}${hasDate}${hasCity}${hasSort}`;

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
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const filters = {
    date: searchParams.date || "",
    search: searchParams.search || "",
    city: searchParams.city || "",
    sort: searchParams.sort || "",
  };

  const carnaval: CarnavalProps = await fetchCarnaval2025(filters);

  console.log(carnaval);

  return (
    <div className="space-y-8">
      <Filters />
      <div className="w-full max-w-[1200px] p-4 mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {carnaval.data.map((item) => (
            <CarnavalCard key={item.id} carnaval={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
