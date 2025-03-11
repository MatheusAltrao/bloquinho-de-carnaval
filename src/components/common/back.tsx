"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <Button onClick={handleBack} variant="outline" size="sm" className="mb-4">
      <ArrowLeft size={16} /> Voltar para todos os eventos
    </Button>
  );
}
