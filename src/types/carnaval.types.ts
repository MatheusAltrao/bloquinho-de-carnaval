export interface CarnavalItemProps {
  id: number;
  title: string;
  description: string;
  date_time: string;
  address: string;
  complete_address: string;
  city: string;
  neighborhood: string;
  price: string;
  event_url: string;
}

export interface CarnavalProps {
  data: CarnavalItemProps[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}
