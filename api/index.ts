import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import express from 'express'
import { AppModule } from '../src/app.module'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const expressApp = express()
let nestApp: any = null
let isInitialized = false

async function bootstrap() {
  if (!isInitialized) {
    nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    )
    nestApp.enableCors()
    await nestApp.init()
    isInitialized = true
  }
  return expressApp
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const app = await bootstrap()
    app(req, res)
  } catch (error) {
    console.error('Error handling request:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

