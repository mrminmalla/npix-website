import { UserPlus, LifeBuoy, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/FadeIn";
import { CONTACT_EMAIL, NOC_EMAIL } from "@/constants/site";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  icon: LucideIcon;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "become-a-member",
    title: "Become a Member",
    description: "Start the process of connecting your organization to NPIX.",
    buttonLabel: "Apply Now",
    href: `mailto:${CONTACT_EMAIL}?subject=Membership%20Inquiry`,
    icon: UserPlus,
  },
  {
    id: "technical-assistance",
    title: "Request Technical Assistance",
    description: "Need help with connectivity, peering, or configuration?",
    buttonLabel: "Contact Support",
    href: `mailto:${NOC_EMAIL}`,
    icon: LifeBuoy,
  },
  {
    id: "contact-npix",
    title: "Contact NPIX Team",
    description: "Get in touch with our operations and administrative team.",
    buttonLabel: "Contact Us",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
  },
];

export function QuickActions() {
  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="container-page">
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Get Started
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Quick Actions
          </h2>
        </FadeIn>

        <StaggerContainer className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <StaggerItem key={action.id}>
                <div className="flex h-full flex-col items-start rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {action.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-secondary">
                    {action.description}
                  </p>
                  <Button asChild size="sm" variant="outline" className="mt-5">
                    <a href={action.href}>{action.buttonLabel}</a>
                  </Button>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
