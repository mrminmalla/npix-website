import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';
import { UpdateProtocolAdoptionDto } from './dto/protocol-adoption.dto';

/**
 * protocol_adoption is a singleton table: exactly one row holds the
 * IPv4/IPv6 share percentages. Session counts are NOT stored here — they
 * are always computed live from the members table (see MembersService).
 */
@Injectable()
export class ProtocolAdoptionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly revalidate: RevalidateService,
  ) {}

  async get() {
    const existing = await this.prisma.protocolAdoption.findFirst();
    if (existing) return existing;
    return this.prisma.protocolAdoption.create({
      data: { ipv4SharePercent: 100, ipv6SharePercent: 0 },
    });
  }

  async update(dto: UpdateProtocolAdoptionDto) {
    const existing = await this.get();
    const result = await this.prisma.protocolAdoption.update({
      where: { id: existing.id },
      data: dto,
    });
    void this.revalidate.trigger(['/statistics']);
    return result;
  }
}
