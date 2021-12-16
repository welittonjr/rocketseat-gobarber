import { Router } from 'express'
import { parseISO } from 'date-fns'

import SchedulesRepository from '../repositories/SchedulesRepository'
import SchedulesService from '../services/SchedulesService'
import { getCustomRepository } from 'typeorm'

const schedulesRouter = Router()

schedulesRouter.get('/', async (request, response) => {
  const schedulesRepository = getCustomRepository(SchedulesRepository)
  const schedules = await schedulesRepository.find()

  return response.json(schedules)
})

schedulesRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const scheduleService = new SchedulesService()

    const schedule = await scheduleService.execute({
      date: parsedDate,
      provider_id
    })

    return response.json(schedule)
  } catch (err) {
    return response.status(400).json({ error: err })
  }
})

export default schedulesRouter
