import { Router } from 'express'
import * as mealsCtrl from '../controllers/meals.js'

const router = Router()

router.get('/meals/new', mealsCtrl.new)

export { router }
