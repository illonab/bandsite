const showsSchedule = document.querySelector('.shows__schedule');
const apiKey = '1c327bae-89e0-482d-9116-47630351a017';
const SHOWS_API = `https://project-1-api.herokuapp.com/showdates?api_key=${apiKey}`;

let showsArray = [];

axios
    .get(SHOWS_API)
    .then((data) => {
        console.log(data);
        showsArray = data.data;
        displayShowsList(showsArray, showsSchedule);
    })
    .catch((error) => {
        console.log(error);
    });

const monthDiff = (d1, d2) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
};

const displayShow = (show, container) => {
    const showsShow = document.createElement('article');
    showsShow.classList.add('shows__show');

    const showsDateLabel = document.createElement('p');
    showsDateLabel.classList.add('shows__label');
    showsDateLabel.innerText = 'Date';

    const showsTimeText = document.createElement('time');
    showsTimeText.classList.add('shows__text', 'shows__text--date');

    const timestampDate = new Date(+show.date);

    if (monthDiff(timestampDate, new Date()) < 1) {
        showsTimeText.innerText = timeago.format(timestampDate);
        showsTimeText.setAttribute('title', timestampDate);
    } else {
        showsTimeText.innerText = timestampDate.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    }

    const showsVenueLabel = document.createElement('p');
    showsVenueLabel.classList.add('shows__label');
    showsVenueLabel.innerText = 'Venue';

    const showsVenueText = document.createElement('p');
    showsVenueText.classList.add('shows__text', 'shows__text--venue');
    showsVenueText.innerText = `${show.place}`;

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

const displayShowsList = (shows, container) => {
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
