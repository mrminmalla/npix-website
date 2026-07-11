import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/shared/SocialIcons";
import { FOOTER_QUICK_LINKS, FOOTER_DOC_LINKS } from "@/constants/nav";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  OFFICE_ADDRESS,
  FOOTER_DESCRIPTION,
  SOCIAL_LINKS,
} from "@/constants/site";

const SOCIALS = [
  { label: "Facebook", href: SOCIAL_LINKS.facebook, icon: FacebookIcon },
  { label: "Twitter", href: SOCIAL_LINKS.twitter, icon: TwitterIcon },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon },
  { label: "YouTube", href: SOCIAL_LINKS.youtube, icon: YoutubeIcon },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-foreground-secondary transition-colors hover:text-secondary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:py-16 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground-secondary">
            {FOOTER_DESCRIPTION}
          </p>
          <ul className="mt-6 space-y-3 text-sm text-foreground-secondary">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
              <span>{OFFICE_ADDRESS}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
              <a href={`tel:${CONTACT_PHONE}`} className="hover:text-secondary">
                {CONTACT_PHONE}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-secondary">
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-secondary transition-colors hover:border-secondary hover:text-secondary"
              >
                <social.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Quick Links" links={FOOTER_QUICK_LINKS} />
        <FooterColumn title="Documentation" links={FOOTER_DOC_LINKS} />
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-foreground-secondary sm:flex-row">
          <p>&copy; {year} NPIX &ndash; Nepal Internet Exchange. All rights reserved.</p>
          <p>Connecting Nepal&apos;s Digital Ecosystem</p>
        </div>
      </div>
    </footer>
  );
}
