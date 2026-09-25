const MONTHS = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
]

export function formatPeriod(startedAt: Date, finishedAt: Date | null) {
  const from = formatMonth(startedAt)
  const to = finishedAt ? formatMonth(finishedAt) : 'настоящее время'

  return `${from} — ${to}`
}

// в базе это DATE без времени, поэтому читаем в UTC — иначе в плюсовых зонах месяц уезжает назад
function formatMonth(date: Date) {
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}
