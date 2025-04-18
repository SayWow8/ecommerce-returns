import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { CreateReturnDto, UpdateReturnDto } from './dto/return.dto';

@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.returnsService.findAll({ page, limit, status, search });
  }

  @Post()
  async create(@Body() createReturnDto: CreateReturnDto) {
    return this.returnsService.create(createReturnDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReturnDto: UpdateReturnDto) {
    return this.returnsService.update(id, updateReturnDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.returnsService.remove(id);
  }

  @Post('bulk-update')
  async bulkUpdate(@Body() body: { ids: string[]; status: string }) {
    return this.returnsService.bulkUpdate(body.ids, body.status);
  }
} 