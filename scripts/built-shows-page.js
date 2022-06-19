const showsArray = [
    {
        date: 'Mon Sept 06 2021',
        venue: 'Ronald Lane',
        location: 'San Francisco, CA'
    },
    {
        date: 'Tue Sept 21 2021',
        venue: 'Pier 3 East',
        location: 'San Francisco, CA'
    },
    {
        date: 'Fri Oct 15 2021',
        venue: 'View Lounge',
        location: 'San Francisco, CA'
    },
    {
        date: 'Sat Nov 06 2021',
        venue: 'Hyatt Agency',
        location: 'San Francisco, CA'
    },
    {
        date: 'Fri Nov 26 2021',
        venue: 'Moscow Center',
        location: 'San Francisco, CA'
    },
    {
        date: 'Wed Dec 15 2021',
        venue: 'Press Club',
        location: 'San Francisco, CA'
    }
];

const displayShow = (show, container) => {
    const showsShow = document.createElement('article');
    showsShow.classList.add('shows__show');

    const showsDateLabel = document.createElement('p');
    showsDateLabel.classList.add('shows__label');
    showsDateLabel.innerText = 'Date';

    const showsTimeText = document.createElement('time');
    showsTimeText.classList.add('shows__text', 'shows__text--date');
    showsTimeText.innerText = `${show.date}`;

    const showsVenueLabel = document.createElement('p');
    showsVenueLabel.classList.add('shows__label');
    showsVenueLabel.innerText = 'Venue';

    const showsVenueText = document.createElement('p');
    showsVenueText.classList.add('shows__text', 'shows__text--venue');
    showsVenueText.innerText = `${show.venue}`;

    const showsLocationLabel = document.createElement('p');
    showsLocationLabel.classList.add('shows__label');
    showsLocationLabel.innerText = 'Location';

    const showsText = document.createElement('p');
    showsText.classList.add('shows__text', 'shows__text--location');
    showsText.innerText = `${show.location}`;

    const showsBuy = document.createElement('a');
    showsBuy.classList.add('cta-button', 'shows__buy');
    showsBuy.setAttribute('href', '#');
    showsBuy.innerText = 'Buy tickets';

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
const showsSchedule = document.querySelector('.shows__schedule');

const displayShows = (shows, container) => {
    const showsLabels = document.createElement('div');
    showsLabels.classList.add('shows__labels');
    const showsDateLabelTablet = document.createElement('p');
    showsDateLabelTablet.classList.add('shows__label', 'shows__label--tablet');
    showsDateLabelTablet.innerText = 'Date';
    const showsVenueLabelTablet = document.createElement('p');
    showsVenueLabelTablet.classList.add('shows__label', 'shows__label--tablet');
    showsVenueLabelTablet.innerText = 'Venue';
    const showsLocationLabelTablet = document.createElement('p');
    showsLocationLabelTablet.classList.add('shows__label', 'shows__label--tablet');
    showsLocationLabelTablet.innerText = 'Location';
    showsLabels.append(showsDateLabelTablet, showsVenueLabelTablet, showsLocationLabelTablet);
    container.append(showsLabels);

    for (const show of shows) {
        displayShow(show, container);
    }
};

displayShows(showsArray, showsSchedule);

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
