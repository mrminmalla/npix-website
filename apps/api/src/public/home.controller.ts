import { Controller, Get } from '@nestjs/common';
import { NewsCategory, StatSection } from '@prisma/client';
import { Public } from '../common/decorators/public.decorator';
import { MembersService } from '../members/members.service';
import { NewsService } from '../news/news.service';
import { StatCardsService } from '../stat-cards/stat-cards.service';
import { TrafficPanelsService } from '../traffic-panels/traffic-panels.service';
import { WhyNpixService } from '../why-npix/why-npix.service';

const EVENTS_ANNOUNCEMENTS_CATEGORIES: NewsCategory[] = [
  NewsCategory.Announcements,
  NewsCategory.Workshops,
  NewsCategory.Conferences,
];
const NEWS_CATEGORIES: NewsCategory[] = [
  NewsCategory.Maintenance,
  NewsCategory.NewMembers,
  NewsCategory.Upgrades,
];

@Controller('api/v1/home')
@Public()
export class HomeController {
  constructor(
    private readonly statCards: StatCardsService,
    private readonly whyNpix: WhyNpixService,
    private readonly trafficPanels: TrafficPanelsService,
    private readonly members: MembersService,
    private readonly news: NewsService,
  ) {}

  @Get()
  async get() {
    const [stats, whyNpixItems, panels, memberShowcase, eventsAnnouncements, latestNews, memberStats] =
      await Promise.all([
        this.statCards.listBySection(StatSection.home),
        this.whyNpix.listOrdered(),
        this.trafficPanels.listActive(),
        this.members.showcase(),
        this.news.latestByCategories(EVENTS_ANNOUNCEMENTS_CATEGORIES, 4),
        this.news.latestByCategories(NEWS_CATEGORIES, 4),
        this.members.stats(),
      ]);

    // "Connected ASNs" is computed live from the members table (never a
    // stored/editable stat card, per the migration plan) — reinsert it in
    // its original position: after the 2 admin-editable traffic cards and
    // before the infrastructure card that follows it.
    const connectedAsns = {
      id: 'connected-asns',
      section: StatSection.home,
      label: 'Connected ASNs',
      value: memberStats.uniqueAsns,
      prefix: null,
      suffix: null,
      decimals: 0,
      iconName: 'Network',
      description: 'Autonomous Systems actively peering through NPIX.',
      sortOrder: -1,
    };
    const statsWithComputed = [...stats];
    statsWithComputed.splice(Math.min(2, statsWithComputed.length), 0, connectedAsns);

    return {
      stats: statsWithComputed,
      whyNpix: whyNpixItems,
      trafficPanel: panels[0] ?? null,
      memberShowcase,
      eventsAnnouncements,
      news: latestNews,
    };
  }
}
