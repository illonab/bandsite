const monthDiff = (d1, d2) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
};

const formatDateString = (timestamp) => {
    const timestampDate = new Date(timestamp);

    if (monthDiff(timestampDate, new Date()) < 1) {
        return timeago.format(timestampDate);
    }
    return timestampDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
};

const createElement = (object) => {
    const element = document.createElement(object.tagName);
    element.classList.add(...object.classes);
    if (object.innerText !== undefined) {
        element.innerText = object.innerText;
    }
    return element;
};
