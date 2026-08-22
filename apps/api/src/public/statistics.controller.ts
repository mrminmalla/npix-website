import { Controller, Get } from '@nestjs/common';
import { StatSection } from '@prisma/client';
import { Public } from '../common/decorators/public.decorator';
import { MembersService } from '../members/members.service';
import { PointsOfPresenceService } from '../points-of-presence/points-of-presence.service';
import { ProtocolAdoptionService } from '../protocol-adoption/protocol-adoption.service';
import { StatCardsService } from '../stat-cards/stat-cards.service';
import { TrafficPanelsService } from '../traffic-panels/traffic-panels.service';

@Controller('api/v1/statistics')
@Public()
export class StatisticsController {
  constructor(
    private readonly statCards: StatCardsService,
    private readonly protocolAdoption: ProtocolAdoptionService,
    private readonly pointsOfPresence: PointsOfPresenceService,
    private readonly trafficPanels: TrafficPanelsService,
    private readonly members: MembersService,
  ) {}

  @Get()
  async get() {
    const [trafficInsights, infrastructure, adoption, memberStats, pointsOfPresence, trafficPanels] =
      await Promise.all([
        this.statCards.listBySection(StatSection.traffic_insights),
        this.statCards.listBySection(StatSection.infrastructure),
        this.protocolAdoption.get(),
        this.members.stats(),
        this.pointsOfPresence.listActive(),
        this.trafficPanels.listActive(),
      ]);

    return {
      trafficInsights,
      infrastructure,
      protocolAdoption: {
        ipv4SharePercent: adoption.ipv4SharePercent,
        ipv6SharePercent: adoption.ipv6SharePercent,
        // Live counts — never stored, always derived from the members table.
        ipv4Sessions: memberStats.ipv4Sessions,
        ipv6Sessions: memberStats.ipv6Sessions,
      },
      pointsOfPresence,
      trafficPanels,
    };
  }
}
