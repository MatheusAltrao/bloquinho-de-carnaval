interface CarnavalPageProps {
  params: {
    id: string;
  };
}

export default function CarnavalPage({ params }: CarnavalPageProps) {
  return (
    <div>
      <h1>Boquinhos de carnaval 2025</h1>
      {params.id}
    </div>
  );
}
