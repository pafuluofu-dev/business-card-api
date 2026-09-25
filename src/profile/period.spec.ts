import { formatPeriod } from './period.js'

describe('formatPeriod', () => {
  it('склеивает месяцы начала и конца', () => {
    const period = formatPeriod(new Date('2024-09-01T00:00:00Z'), new Date('2026-09-01T00:00:00Z'))

    expect(period).toBe('сентябрь 2024 — сентябрь 2026')
  })

  it('для незакрытого периода пишет «настоящее время»', () => {
    const period = formatPeriod(new Date('2023-01-01T00:00:00Z'), null)

    expect(period).toBe('январь 2023 — настоящее время')
  })
})
