import { format } from "date-fns";
import { Building, Clock, Eye, MapPinHouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarnavalItemProps } from "@/types/carnaval.types";

interface CarnavalCardProps {
  carnaval: CarnavalItemProps;
}

export default function CarnavalCard({ carnaval }: CarnavalCardProps) {
  return (
    <Card className="hover:border-primary transition-colors ">
      <CardHeader>
        <CardTitle className="line-clamp-1">{carnaval.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {carnaval.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-muted-foreground text-sm">
          <p className=" flex items-center gap-1 ">
            <Clock size={16} />
            {format(new Date(carnaval.date_time), "dd/MM/yyyy")}
          </p>
          <p className=" flex items-center gap-1  ">
            <MapPinHouse size={16} /> {carnaval.address}
          </p>
          <p className=" flex items-center gap-1   ">
            <Building size={20} /> {carnaval.city}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Eye /> Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
}
