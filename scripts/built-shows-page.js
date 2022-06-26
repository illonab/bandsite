const showsSchedule = document.querySelector('.shows__schedule');

const displayShow = (show, container) => {
    const showsShow = createElement({ tagName: 'article', classes: ['shows__show'] });

    const showsDateLabel = createElement({ tagName: 'p', classes: ['shows__label'], innerText: 'Date' });

    const showsTimeText = createElement({
        tagName: 'time',
        classes: ['shows__text', 'shows__text--date'],
        innerText: formatDateString(+show.date)
    });
    showsTimeText.setAttribute('title', new Date(+show.date));

    const showsVenueLabel = createElement({ tagName: 'p', classes: ['shows__label'], innerText: 'Venue' });

    const showsVenueText = createElement({
        tagName: 'p',
        classes: ['shows__text', 'shows__text--venue'],
        innerText: show.place
    });

    const showsLocationLabel = createElement({ tagName: 'p', classes: ['shows__label'], innerText: 'Location' });

    const showsText = createElement({
        tagName: 'p',
        classes: ['shows__text', 'shows__text--location'],
        innerText: show.location
    });

    const showsBuy = createElement({ tagName: 'a', classes: ['cta-button', 'shows__buy'], innerText: 'Buy tickets' });
    showsBuy.setAttribute('href', '#');

    showsShow.append(
        showsDateLabel,
        showsTimeText,
        showsVenueLabel,
        showsVenueText,
        showsLocationLabel,
        showsText,
        showsBuy
    );

    container.append(showsShow);
};

const displayShowsList = (shows, container) => {
    const showsLabels = createElement({ tagName: 'div', classes: ['shows__labels'] });
    const showsDateLabelTablet = createElement({
        tagName: 'p',
        classes: ['shows__label', 'shows__label--tablet'],
        innerText: 'Date'
    });

    const showsVenueLabelTablet = createElement({
        tagName: 'p',
        classes: ['shows__label', 'shows__label--tablet'],
        innerText: 'Venue'
    });

    const showsLocationLabelTablet = createElement({
        tagName: 'p',
        classes: ['shows__label', 'shows__label--tablet'],
        innerText: 'Location'
    });

    // this button is needed to align headers of the table with the content

    const showsBuy = createElement({
        tagName: 'a',
        classes: ['cta-button', 'shows__label--buy'],
        innerText: 'Buy tickets'
    });

    showsLabels.append(showsDateLabelTablet, showsVenueLabelTablet, showsLocationLabelTablet, showsBuy);
    container.append(showsLabels);

    for (const show of shows) {
        displayShow(show, container);
    }
};

// I've used event delegation here - https://javascript.info/event-delegation
showsSchedule.addEventListener('click', (e) => {
    const showsShow = e.target.closest('.shows__show');
    if (showsShow === null) {
        return;
    }
    const selectedRow = document.querySelector('.shows__show--selected');
    if (selectedRow) {
        selectedRow.classList.remove('shows__show--selected');
    }

    showsShow.classList.add('shows__show--selected');
});

axios
    .get(SHOWS_API)
    .then((data) => {
        displayShowsList(data.data, showsSchedule);
    })
    .catch((error) => {
        console.log(error);
    });
