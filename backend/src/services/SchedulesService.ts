import { startOfHour } from "date-fns";
import Schedule from "../entity/Schedule";
import SchedulesRepository from "../repositories/SchedulesRepository";
import { getCustomRepository } from "typeorm";

interface Request {
  provider_id: number;
  date: Date;
}

class SchedulesService {
  public async execute({ date, provider_id }: Request): Promise<Schedule> {
    const schedulesRepository = getCustomRepository(SchedulesRepository);

    const scheduleDate = startOfHour(date);

    const findScheduleInSameDate = await schedulesRepository.findByDate(
      scheduleDate,
    );

    if (findScheduleInSameDate) {
      throw Error('This schedule is already booked');
    }

    const schedule = schedulesRepository.create({
      provider_id,
      date: scheduleDate
    });

    await schedulesRepository.save(schedule);

    return schedule;
  }
}

export default SchedulesService;