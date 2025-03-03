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
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: "https://apis.codante.io/api/bloquinhos2025/agenda";
    per_page: number;
    to: number;
    total: number;
  };
}

export interface CarnavalFiltersProps {
  date?: string;
  search?: string;
  city?: string;
  sort?: string;
}
