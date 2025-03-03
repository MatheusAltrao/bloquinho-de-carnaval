import CarnavalCard from "@/components/common/carnaval-card";
import { CarnavalProps } from "@/types/carnaval.types";

async function fetchCarnaval2025() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CODANTE_API_URL}/agenda?page=1`
    );
    const carnaval = await response.json();

    return carnaval;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Home() {
  const carnaval: CarnavalProps = await fetchCarnaval2025();

  console.log(carnaval);
  return (
    <div>
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
