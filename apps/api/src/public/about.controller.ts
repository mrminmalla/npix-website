import { Controller, Get } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { CoreValuesService } from '../core-values/core-values.service';
import { PageSectionsService } from '../page-sections/page-sections.service';
import { TeamMembersService } from '../team-members/team-members.service';
import { TimelineService } from '../timeline/timeline.service';

@Controller('api/v1/about')
@Public()
export class AboutController {
  constructor(
    private readonly coreValues: CoreValuesService,
    private readonly timeline: TimelineService,
    private readonly team: TeamMembersService,
    private readonly pageSections: PageSectionsService,
  ) {}

  @Get()
  async get() {
    const [coreValues, timeline, team, sections] = await Promise.all([
      this.coreValues.listOrdered(),
      this.timeline.listOrdered(),
      this.team.listActive(),
      this.pageSections.listByPage('about'),
    ]);
    return { coreValues, timeline, team, sections };
  }
}
