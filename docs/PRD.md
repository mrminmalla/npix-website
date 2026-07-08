# NPIX Website Product Requirements Document (PRD)

**Project Name:** NPIX Website
**Organization:** NPIX – Nepal Internet Exchange
**Type:** Public Corporate Website
**Version:** 1.0

---

# Project Overview

Build a modern, enterprise-grade public website for **NPIX – Nepal Internet Exchange**.

NPIX is Nepal's carrier-neutral Internet Exchange that facilitates domestic Internet traffic exchange among:

* Internet Service Providers (ISPs)
* Banks and Financial Institutions
* Government Organizations
* Educational Institutions
* Technology Companies
* Content and Cloud Providers

The website should establish NPIX as a trusted, neutral, and critical component of Nepal's digital infrastructure.

The website is primarily informational and marketing-focused.

The first version does NOT require:

* Looking Glass
* Peering Portal
* Authentication
* Member Login
* Billing System
* Real-time monitoring integrations

The architecture should remain modular so these features can be added in future releases.

---

# Business Objectives

1. Introduce NPIX and explain its role in Nepal's Internet ecosystem.
2. Showcase members and ecosystem growth.
3. Explain benefits of domestic traffic exchange.
4. Present services and documentation.
5. Encourage organizations to become members.
6. Provide transparent statistics and updates.

---

# Target Audience

## Primary

* Internet Service Providers
* Banks
* Government Organizations
* Universities
* Technology Companies
* Content Providers

## Secondary

* Regulators
* Media
* Students
* Researchers
* General Public

---

# Technology Stack

## Framework

* Next.js 15 (App Router)
* TypeScript

## Styling

* Tailwind CSS
* ShadCN UI

## Libraries

* Framer Motion
* Lucide React
* React Leaflet
* Apache ECharts
* next-themes

## Development Principles

* Mobile First
* Responsive
* Accessible (WCAG AA)
* SEO Friendly
* Component Driven
* Reusable Architecture
* Strict TypeScript
* Server Components by default

---

# Theme System

The website must support:

* Light Theme
* Dark Theme

Default Theme:
Light

Theme Switch:
Available in Navbar.

Persist user selection.

---

# Brand Identity

## Company Name

NPIX – Nepal Internet Exchange

## Tagline

Connecting Nepal's Digital Ecosystem

## Brand Personality

* Professional
* Reliable
* Neutral
* Modern
* Technical
* Trustworthy
* Infrastructure Focused

---

# Color Palette

## Light Theme

Primary: #0B1F3A
Secondary: #0EA5E9
Accent: #DC143C

Background: #FFFFFF
Surface: #F8FAFC

Text Primary: #0F172A
Text Secondary: #64748B

Border: #E2E8F0
Success: #10B981

---

## Dark Theme

Primary: #071A2E
Secondary: #38BDF8
Accent: #DC143C

Background: #020617
Surface: #0F172A

Text Primary: #F8FAFC
Text Secondary: #94A3B8

Border: #334155
Success: #10B981

---

# Design Direction

Inspired by:

* Equinix
* DE-CIX

Design Requirements:

* Premium enterprise appearance
* Clean layouts
* Generous whitespace
* Large typography
* Subtle gradients
* Soft shadows
* Minimal glassmorphism
* Smooth animations
* SVG network illustrations
* Interactive Nepal map
* Professional imagery
* Fast loading
* High accessibility

Animations must be subtle and enterprise-grade.

---

# Website Navigation

* Home
* About Us
* Services
* Members
* Statistics
* Locations
* Documentation
* News & Events
* Contact
* Become a Member (CTA Button)

---

# Page Requirements

# 1. HOME

Purpose:
Introduce NPIX and communicate its importance.

Sections:

## Hero

Headline:
Connecting Nepal's Digital Ecosystem

Description:
NPIX is Nepal's carrier-neutral Internet Exchange enabling local traffic exchange among Internet Service Providers, banks, government organizations, educational institutions, and technology companies.

Buttons:

* Become a Member
* View Statistics

Background:

* Animated network lines
* Nepal outline map
* Floating particles
* Subtle gradients

---

## Live Statistics

Cards:

* Current Traffic
* Peak Traffic
* Connected Members
* Connected ASNs
* Exchange Locations
* Years of Operation

Use mock data.

---

## Why NPIX Matters

Cards:

* Lower Latency
* Reduced Transit Cost
* Improved Reliability
* Stronger Digital Nepal

---

## Services Overview

Cards:

* Public Peering
* Route Server Services
* IPv6 Services
* Domestic Interconnection

---

## Member Showcase

Display logos grouped by:

* ISPs
* Banks
* Government Organizations
* Universities
* Technology Companies

---

## Nepal Connectivity Section

Illustrate:

NPIX
→ ISPs
→ Banks
→ Government
→ Universities
→ Technology Companies

---

## Latest News

Cards:

* Title
* Date
* Summary

---

## Become a Member CTA

---

# 2. ABOUT

Sections:

* Who We Are
* What is an Internet Exchange
* Why NPIX Exists
* Mission
* Vision
* Core Values
* Company Timeline
* Leadership Team

Core Values:

* Neutrality
* Reliability
* Transparency
* Collaboration
* Innovation

---

# 3. SERVICES

Services:

* Public Peering
* Route Server Services
* IPv6 Services
* Domestic Interconnection
* Technical Consultation

Each service card contains:

* Icon
* Description
* Benefits
* Learn More button

---

# 4. MEMBERS

Sections:

Statistics:

* Total Members
* Total ASNs
* Categories

Search:

* Search by company name
* Search by ASN

Filters:

* ISPs
* Banks
* Government Organizations
* Educational Institutions
* Technology Companies

Views:

* Grid View
* Table View

Member Card:

* Logo
* Company Name
* Category
* ASN
* Website
* IPv6 Support
* Member Since

Include pagination.

Use mock member data.

---

# 5. STATISTICS

Cards:

* Current Traffic
* Peak Traffic
* Members
* Connected ASNs
* Port Capacity

Charts:

* Traffic Growth
* Member Growth
* IPv4 vs IPv6 Traffic
* Traffic Trends

Use ECharts.

Use mock data.

---

# 6. LOCATIONS

Sections:

* Interactive Nepal Map
* Exchange Facilities
* Future Expansion

Location Card:

* Facility Name
* Address
* Capacity
* Contact Information

Initial Location:
Kathmandu

Future Expansion:

* Pokhara
* Biratnagar
* Butwal
* Nepalgunj

Use mock data.

---

# 7. DOCUMENTATION

Categories:

* Getting Started
* Membership Requirements
* Technical Requirements
* Connectivity Guide
* Policies
* FAQs
* Download Center

Downloads:

* Membership Application Form
* Technical Requirements
* Network Diagram
* Policy Documents

Use downloadable placeholder files.

---

# 8. NEWS & EVENTS

Categories:

* Announcements
* Maintenance
* New Members
* Workshops
* Conferences
* Upgrades

Features:

* Featured Article
* Search
* Category Filters
* Pagination

Use mock data.

---

# 9. CONTACT

Sections:

* Contact Form
* NOC Information
* Office Information
* Map
* Directions

Form Fields:

* Name
* Organization
* Email
* Phone
* Message

---

# Global Layout

## Navbar

* NPIX Logo
* Navigation Links
* Theme Switcher
* Become a Member Button
* Mobile Navigation Drawer

## Footer

* Company Description
* Quick Links
* Services Links
* Documentation Links
* Contact Information
* Social Media Links
* Copyright

---

# Components

## Layout

* Navbar
* Footer
* PageHeader
* MobileMenu

## Sections

* HeroSection
* StatisticsSection
* WhyNPIXSection
* ServicesSection
* MemberShowcaseSection
* ConnectivitySection
* NewsSection
* CTASection

## Cards

* StatCard
* ServiceCard
* MemberCard
* NewsCard
* LocationCard

## Tables

* MemberTable

## Forms

* ContactForm

## Charts

* TrafficChart
* MemberGrowthChart
* IPv4IPv6Chart

## Maps

* NepalMap

## Shared

* ThemeProvider
* ThemeSwitcher
* SearchBar
* Pagination
* LoadingSkeleton
* EmptyState

---

# Animations

Use Framer Motion:

* Fade in on scroll
* Staggered card animations
* Hover effects
* Smooth page transitions
* Animated counters
* Animated network lines
* Floating particles
* Interactive map transitions

Animations should remain subtle and professional.

---

# SEO

Every page must include:

* Title
* Description
* Keywords
* Open Graph metadata
* Twitter metadata
* Structured Data

---

# Performance Requirements

Target Lighthouse Score:
90+

Requirements:

* Lazy loading
* Code splitting
* Optimized images
* Mobile-first design
* Accessibility compliance
* Minimize layout shift
* Reusable components
* Production-ready code

---

# Project Structure

src/
├── app/
│ ├── page.tsx
│ ├── about/
│ ├── services/
│ ├── members/
│ ├── statistics/
│ ├── locations/
│ ├── documentation/
│ ├── news/
│ ├── contact/
│ └── layout.tsx
│
├── components/
│ ├── layout/
│ ├── sections/
│ ├── cards/
│ ├── charts/
│ ├── forms/
│ ├── maps/
│ ├── tables/
│ ├── shared/
│ └── ui/
│
├── hooks/
├── lib/
├── data/
├── types/
├── constants/
└── public/

---

# Development Instructions For Claude

1. Create the project structure.
2. Install all required dependencies.
3. Configure Tailwind and theme system.
4. Implement global layout.
5. Build reusable components first.
6. Build pages in navigation order.
7. Create mock datasets.
8. Implement responsive design.
9. Add animations.
10. Add SEO metadata.
11. Run production build.
12. Fix all TypeScript and ESLint errors.
13. Remove warnings.
14. Ensure responsive behavior on mobile, tablet, and desktop.
15. Ensure application compiles successfully.
16. Deliver a complete, production-ready frontend.

Do not stop after generating a single page. Continue implementing until the entire NPIX website frontend is complete and builds successfully.

