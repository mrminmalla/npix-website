import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <div
      id={service.slug}
      className={cn(
        "group flex h-full scroll-mt-24 flex-col rounded-xl border border-border bg-background p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
        {service.description}
      </p>
      <ul className="mt-4 space-y-2">
        {service.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-foreground-secondary">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
            {benefit}
          </li>
        ))}
      </ul>
      <Link
        href={`/services#${service.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-primary group-hover:gap-2.5"
      >
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform" aria-hidden="true" />
      </Link>
    </div>
  );
}
