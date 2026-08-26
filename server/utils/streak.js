function toDateKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function calculateStreak(attemptDates) {
  if (!attemptDates || attemptDates.length === 0) return 0;

  const uniqueDays = [...new Set(attemptDates.map(toDateKey))];
  const dayTimestamps = uniqueDays
    .map((key) => {
      const [y, m, d] = key.split('-').map(Number);
      return new Date(y, m, d).getTime();
    })
    .sort((a, b) => b - a);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTime = today.getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  let streak = 0;
  let expectedTime = todayTime;

  const mostRecent = dayTimestamps[0];
  if (mostRecent !== todayTime && mostRecent !== todayTime - oneDay) {
    return 0;
  }

  if (mostRecent === todayTime - oneDay) {
    expectedTime = todayTime - oneDay;
  }

  for (const ts of dayTimestamps) {
    if (ts === expectedTime) {
      streak++;
      expectedTime -= oneDay;
    } else if (ts < expectedTime) {
      break;
    }
  }

  return streak;
}

function calculateWeekProgress(attemptDates, weeklyGoal) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const mondayStart = new Date(now);
  mondayStart.setDate(now.getDate() - daysSinceMonday);
  mondayStart.setHours(0, 0, 0, 0);

  const uniqueDaysThisWeek = new Set(
    attemptDates
      .filter((d) => new Date(d) >= mondayStart)
      .map(toDateKey)
  );

  const weekProgress = uniqueDaysThisWeek.size;

  const expectedByNow = Math.ceil(((daysSinceMonday + 1) / 7) * weeklyGoal);
  const behindPace = weekProgress < expectedByNow;

  return { weekProgress, behindPace };
}

module.exports = { calculateStreak, calculateWeekProgress };