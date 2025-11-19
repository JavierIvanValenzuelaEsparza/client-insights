import { Card } from "@/components/ui/card";
import { Star, Building2, Briefcase } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  project_type: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: Readonly<TestimonialCardProps>) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card className="group p-6 transition-all hover:shadow-lg md:p-8">
      <div className="mb-4 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < testimonial.rating
                ? "fill-accent text-accent"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      <p className="mb-6 text-pretty leading-relaxed text-card-foreground">
        {testimonial.comment}
      </p>

      <div className="space-y-2 border-t pt-4">
        <div className="font-semibold">{testimonial.client_name}</div>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4" />
            {testimonial.company}
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="h-4 w-4" />
            {testimonial.project_type}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {formatDate(testimonial.created_at)}
        </div>
      </div>
    </Card>
  );
}
