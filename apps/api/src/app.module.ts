import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AssetsModule } from './assets/assets.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { CoreValuesModule } from './core-values/core-values.module';
import { DocumentCategoriesModule } from './document-categories/document-categories.module';
import { DocumentsModule } from './documents/documents.module';
import { FaqsModule } from './faqs/faqs.module';
import { MembersModule } from './members/members.module';
import { NewsModule } from './news/news.module';
import { PageSectionsModule } from './page-sections/page-sections.module';
import { PointsOfPresenceModule } from './points-of-presence/points-of-presence.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProtocolAdoptionModule } from './protocol-adoption/protocol-adoption.module';
import { PublicModule } from './public/public.module';
import { RevalidateModule } from './revalidate/revalidate.module';
import { SiteSettingsModule } from './site-settings/site-settings.module';
import { StatCardsModule } from './stat-cards/stat-cards.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { TimelineModule } from './timeline/timeline.module';
import { TrafficPanelsModule } from './traffic-panels/traffic-panels.module';
import { WhyNpixModule } from './why-npix/why-npix.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 120 }]),
    PrismaModule,
    RevalidateModule,
    AuthModule,
    AssetsModule,
    AdminUsersModule,
    MembersModule,
    NewsModule,
    DocumentCategoriesModule,
    DocumentsModule,
    FaqsModule,
    CoreValuesModule,
    TimelineModule,
    TeamMembersModule,
    WhyNpixModule,
    StatCardsModule,
    ProtocolAdoptionModule,
    PointsOfPresenceModule,
    TrafficPanelsModule,
    PageSectionsModule,
    SiteSettingsModule,
    PublicModule,
  ],
  providers: [
    // Order matters: every request first needs a resolved user (or a
    // @Public() route), then a role check against that user.
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
