import { EntityRepository, Repository } from 'typeorm';

import Schedule from "../entity/Schedule";

@EntityRepository(Schedule)
class SchedulesRepository extends Repository<Schedule> {
  public async findByDate(date: Date): Promise<Schedule | null> {
    const findSchdule = await this.findOne({
      where: { date },
    });

    return findSchdule || null;
  }
}

export default SchedulesRepository;