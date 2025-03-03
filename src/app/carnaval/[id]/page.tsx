import { Calendar, MapPin, Ticket, ExternalLink } from "lucide-react";
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

const eventoExemplo: CarnavalItemProps = {
  id: 1,
  title: "Bloco do Samba",
  description:
    "Venha curtir o melhor do samba com o Bloco do Samba, uma experiência única com os melhores sambistas da cidade. Traga sua família e amigos para celebrar o carnaval com muita alegria e diversão!",
  date_time: "2025-02-15T14:00:00",
  address: "Avenida Principal",
  complete_address: "Avenida Principal, 123",
  city: "Rio de Janeiro",
  neighborhood: "Copacabana",
  price: "Gratuito",
  event_url: "https://exemplo.com/bloco-do-samba",
};

interface CarnavalPageProps {
  params: {
    id: string;
  };
}

export default function CarnavalPage({ params }: CarnavalPageProps) {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 space-x-2">
          <Button variant="outline" size="sm" className="mb-4" asChild>
            <Link href="/">
              <span>← Voltar para todos os eventos</span>
            </Link>
          </Button>

          <Badge className="mb-2">{eventoExemplo.city}</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">
            {eventoExemplo.title}
          </h1>
          <p className="text-muted-foreground">{eventoExemplo.neighborhood}</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detalhes do Evento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-medium">Descrição</h3>
              <p>{eventoExemplo.description}</p>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Data e Hora</h3>
                  <p>
                    {new Date(eventoExemplo.date_time).toLocaleDateString(
                      "pt-BR",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                  <p>
                    {new Date(eventoExemplo.date_time).toLocaleTimeString(
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
                  <p>{eventoExemplo.price}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Localização</h3>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p>{eventoExemplo.complete_address}</p>
                  <p>
                    {eventoExemplo.neighborhood}, {eventoExemplo.city}
                  </p>
                </div>
              </div>

              <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    eventoExemplo.complete_address + ", " + eventoExemplo.city
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
                href={eventoExemplo.event_url}
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
