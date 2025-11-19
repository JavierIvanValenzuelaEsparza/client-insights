"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Star } from 'lucide-react';

interface TestimonialFormProps {
  onSubmit: (data: { client_name: string; company: string; project_type: string; rating: number; comment: string }) => void;
}

export function TestimonialForm({ onSubmit }: Readonly<TestimonialFormProps>) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      client_name: formData.get("client_name") as string || "",
      company: formData.get("company") as string || "",
      project_type: formData.get("project_type") as string || "",
      rating: rating,
      comment: formData.get("comment") as string || "",
    };

    onSubmit(data);

    e.currentTarget.reset();
    setRating(0);
    setIsSubmitting(false);
  };

  return (
    <Card className="p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="client_name">Nombre completo</Label>
          <Input
            id="client_name"
            name="client_name"
            placeholder="Tu nombre"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Empresa</Label>
          <Input
            id="company"
            name="company"
            placeholder="Nombre de tu empresa"
            required
          />
        </div>

            <div className="space-y-3">
            <Label htmlFor="project_type" className="text-base font-semibold">
              Tipo de Proyecto *
            </Label>
            <Select name="project_type" required>
              <SelectTrigger id="project_type" className="h-12 border-2 w-full">
              <SelectValue placeholder="Selecciona el tipo de proyecto" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="web">Desarrollo Web</SelectItem>
              <SelectItem value="mobile">Aplicación Móvil</SelectItem>
              <SelectItem value="desktop">Software de Escritorio</SelectItem>
              <SelectItem value="api">API / Backend</SelectItem>
              <SelectItem value="full-stack">Full Stack</SelectItem>
              <SelectItem value="consulting">Consultoría</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
            </div>

        <div className="space-y-2">
          <Label>Calificación</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-accent text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm text-muted-foreground">
              Has seleccionado {rating} estrella{rating !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">Tu opinión</Label>
          <Textarea
            id="comment"
            name="comment"
            placeholder="Comparte tu experiencia trabajando con nosotros..."
            rows={5}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || rating === 0}
          size="lg"
        >
          {isSubmitting ? "Enviando..." : "Enviar opinión"}
        </Button>
      </form>
    </Card>
  );
}
