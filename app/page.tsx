"use client";

import { useState, useEffect } from "react";
import { TestimonialForm } from "@/components/testimonial-form";
import { TestimonialCard } from "@/components/testimonial-card";
import { ThemeToggle } from "@/components/theme-toggle";

interface Testimonial {
  id: number;
  fullName: string;
  company: string;
  projectType: string;
  rating: number;
  opinion: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_BASE_URL + "testimonials";

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: { client_name: string; company: string; project_type: string; rating: number; comment: string }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.client_name,
          company: data.company,
          projectType: data.project_type,
          rating: data.rating,
          opinion: data.comment,
        }),
      });

      if (response.ok) {
        await fetchTestimonials();
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 left-4 z-50">
        <h2 className="text-2xl font-bold">Javier Esparza</h2>
      </div>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <section className="border-b">
        <div className="container mx-auto px-4 py-20 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5">
              <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              <span className="text-sm font-medium">Desarrollo de Software</span>
            </div>
            
            <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Portal de Opiniones de Clientes Sobre mi Servicio en Desarrollo de Software
            </h1>
            
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed md:text-xl">
              Testimonios reales de transformación de sus ideas en productos digitales exitosos
            </p>

            {/* <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <div className="mb-2 text-4xl font-bold">{testimonials.length}</div>
                <div className="text-sm text-muted-foreground">Proyectos Completados</div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <div className="mb-2 flex items-center justify-center gap-2 text-4xl font-bold">
                  {averageRating}
                  <Star className="h-8 w-8 fill-accent text-accent" />
                </div>
                <div className="text-sm text-muted-foreground">Calificación Promedio</div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <div className="mb-2 text-4xl font-bold">100%</div>
                <div className="text-sm text-muted-foreground">Satisfacción</div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold tracking-tight">Comparte tu experiencia</h2>
              <p className="text-muted-foreground">
                Tu opinión nos ayuda a mejorar y ayuda a otros a tomar decisiones informadas
              </p>
            </div>
            <TestimonialForm onSubmit={handleSubmit} />
          </div>

          <div>
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold tracking-tight">Testimonios</h2>
              <p className="text-muted-foreground">
                Lee las experiencias de nuestros clientes
              </p>
            </div>
            
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center text-muted-foreground py-8">Cargando testimonios...</div>
              ) : testimonials.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">No hay testimonios aún</div>
              ) : (
                testimonials.map((testimonial) => (
                  <TestimonialCard 
                    key={testimonial.id} 
                    testimonial={{
                      id: testimonial.id.toString(),
                      client_name: testimonial.fullName,
                      company: testimonial.company,
                      project_type: testimonial.projectType,
                      rating: testimonial.rating,
                      comment: testimonial.opinion,
                      created_at: testimonial.createdAt
                    }} 
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
