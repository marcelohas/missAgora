export const getNextMass = (church, referenceDate = new Date()) => {
    const currentDay = referenceDate.getDay();
    const currentHour = referenceDate.getHours();
    const currentMinute = referenceDate.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    let nextMass = null;
    let minDiff = Infinity;

    // Check for mass today
    if (church.massTimes[currentDay]) {
        for (const time of church.massTimes[currentDay]) {
            const [h, m] = time.split(":").map(Number);
            const massTimeInMinutes = h * 60 + m;

            if (massTimeInMinutes >= currentTimeInMinutes) {
                const diff = massTimeInMinutes - currentTimeInMinutes;
                if (diff < minDiff) {
                    minDiff = diff;
                    nextMass = { day: currentDay, time, diff, date: setTime(referenceDate, h, m) };
                }
            }
        }
    }

    // If no mass today, check upcoming days
    if (!nextMass) {
        for (let i = 1; i <= 7; i++) {
            const nextDay = (currentDay + i) % 7;
            if (church.massTimes[nextDay] && church.massTimes[nextDay].length > 0) {
                // Get the first mass of that day
                const firstMassTime = church.massTimes[nextDay][0]; // Assumes sorted
                const [h, m] = firstMassTime.split(":").map(Number);

                // Calculate diff roughly (days * 24 * 60 + time)
                // For simplicity, just finding the *first* available one is enough for "next"
                // But to sort correctly we need a comparable value.

                const nextDate = new Date(referenceDate);
                nextDate.setDate(referenceDate.getDate() + i);
                nextDate.setHours(h, m, 0, 0);

                const diff = (nextDate - referenceDate) / (1000 * 60); // diff in minutes

                nextMass = { day: nextDay, time: firstMassTime, diff, date: nextDate };
                break; // Found the next soonest day
            }
        }
    }

    return nextMass;
};

const setTime = (date, h, m) => {
    const newDate = new Date(date);
    newDate.setHours(h, m, 0, 0);
    return newDate;
}

export const sortChurchesByNextMass = (churches, referenceDate = new Date()) => {
    return churches
        .map((church) => {
            const nextMass = getNextMass(church, referenceDate);
            return { ...church, nextMass };
        })
        .sort((a, b) => {
            if (!a.nextMass && !b.nextMass) return 0;
            if (!a.nextMass) return 1;
            if (!b.nextMass) return -1;
            return a.nextMass.diff - b.nextMass.diff;
        });
};
