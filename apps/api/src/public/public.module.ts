import { Module } from '@nestjs/common';
import { CoreValuesModule } from '../core-values/core-values.module';
import { DocumentCategoriesModule } from '../document-categories/document-categories.module';
import { DocumentsModule } from '../documents/documents.module';
import { FaqsModule } from '../faqs/faqs.module';
import { MembersModule } from '../members/members.module';
import { NewsModule } from '../news/news.module';
import { PageSectionsModule } from '../page-sections/page-sections.module';
import { PointsOfPresenceModule } from '../points-of-presence/points-of-presence.module';
import { ProtocolAdoptionModule } from '../protocol-adoption/protocol-adoption.module';
import { SiteSettingsModule } from '../site-settings/site-settings.module';
import { StatCardsModule } from '../stat-cards/stat-cards.module';
import { TeamMembersModule } from '../team-members/team-members.module';
import { TimelineModule } from '../timeline/timeline.module';
import { TrafficPanelsModule } from '../traffic-panels/traffic-panels.module';
import { WhyNpixModule } from '../why-npix/why-npix.module';
import { AboutController } from './about.controller';
import { DocumentsPublicController } from './documents.controller';
import { HomeController } from './home.controller';
import { MembersPublicController } from './members.controller';
import { NewsPublicController } from './news.controller';
import { SiteSettingsPublicController } from './site-settings.controller';
import { StatisticsController } from './statistics.controller';

@Module({
  imports: [
    StatCardsModule,
    WhyNpixModule,
    TrafficPanelsModule,
    MembersModule,
    NewsModule,
    CoreValuesModule,
    TimelineModule,
    TeamMembersModule,
    PageSectionsModule,
    ProtocolAdoptionModule,
    PointsOfPresenceModule,
    DocumentsModule,
    DocumentCategoriesModule,
    FaqsModule,
    SiteSettingsModule,
  ],
  controllers: [
    HomeController,
    AboutController,
    StatisticsController,
    MembersPublicController,
    DocumentsPublicController,
    NewsPublicController,
    SiteSettingsPublicController,
  ],
})
export class PublicModule {}
