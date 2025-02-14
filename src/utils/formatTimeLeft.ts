export const formatTimeLeft = (endDate: string): string => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) {
        return 'Аукцион завершен';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const timeLeft = [];

    if (days > 0) {
        timeLeft.push(`${days} д`);
    }
    if (hours > 0) {
        timeLeft.push(`${hours} ч`);
    }
    if (minutes > 0) {
        timeLeft.push(`${minutes} м`);
    }
    if (seconds > 0) {
        timeLeft.push(`${seconds} с`);
    }

    return timeLeft.join(' ');
};
