const router = require('express').Router()
const { models: { User, Prompt }} = require('../db')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const prompt = await Prompt.findByPk(req.params.id)
    res.send(prompt)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const prompts = await Prompt.findAll({
      attributes: ['id', 'title', 'topic', 'difficulty']
    })
    res.json(prompts)
  } catch (err) {
    next(err)
  }
})