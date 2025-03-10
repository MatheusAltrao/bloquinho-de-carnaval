import {
  Calendar,
  MapPin,
  Ticket,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CarnavalItemProps } from "@/types/carnaval.types";
import Link from "next/link";

interface CarnavalPageProps {
  params: {
    search: string;
  };
}

const fetchCarnavalCard = async (search: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_CODANTE_API_URL}/agenda?search=${search}`;
    const response = await fetch(url);
    const carnaval = await response.json();
    const data = carnaval.data[0];
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function CarnavalPage({ params }: CarnavalPageProps) {
  const carnavalByTitle: CarnavalItemProps = await fetchCarnavalCard(
    params.search
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 space-x-2">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft size={16} /> Voltar para todos os eventos
            </Button>
          </Link>

          <Badge className="mb-2">{carnavalByTitle.city}</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">
            {carnavalByTitle.title}
          </h1>
          <p className="text-muted-foreground">
            {carnavalByTitle.neighborhood}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detalhes do Evento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-medium">Descrição</h3>
              <p>{carnavalByTitle.description}</p>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Data e Hora</h3>
                  <p>
                    {new Date(carnavalByTitle.date_time).toLocaleDateString(
                      "pt-BR",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                  <p>
                    {new Date(carnavalByTitle.date_time).toLocaleTimeString(
                      "pt-BR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Ticket className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Preço</h3>
                  <p>{carnavalByTitle.price}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Localização</h3>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p>{carnavalByTitle.complete_address}</p>
                  <p>
                    {carnavalByTitle.neighborhood}, {carnavalByTitle.city}
                  </p>
                </div>
              </div>

              <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    carnavalByTitle.complete_address +
                      ", " +
                      carnavalByTitle.city
                  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Mapa do local do evento"
                ></iframe>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <a
                href={carnavalByTitle.event_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Visitar Site do Evento
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
