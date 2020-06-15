import React, {Component} from 'react';

const SECOND = 1000,
    MINUTE = SECOND * 60,
    HOUR = MINUTE * 60,
    DAY = HOUR * 24,
    MONTH = DAY * 30,
    YEAR = DAY * 365;

export const getTimeAgoString = (timestamp) => {
    const elapsed = Date.now() - timestamp,
        getElapsedString = (value, unit) => {
            const round = Math.round(elapsed / value);
            return `${round} ${unit}${round > 1
                ? 's'
                : ''} ago`;
        };
    if (elapsed < MINUTE) {
        return getElapsedString(SECOND, 'second');
    }
    if (elapsed < HOUR) {
        return getElapsedString(MINUTE, 'minute');
    }
    if (elapsed < DAY) {
        return getElapsedString(HOUR, 'hour');
    }
    if (elapsed < MONTH) {
        return getElapsedString(DAY, 'day');
    }
    if (elapsed < YEAR) {
        return getElapsedString(MONTH, 'month');
    }
    return getElapsedString(YEAR, 'year');
};

export default class TimeAgo extends Component {

    state = {
        datetime: null,
        string: ""
    };

    setDateTime = ({timestamp}) => {
        const date = new Date(timestamp);
        this.setState({datetime: date.toISOString(), string: getTimeAgoString(timestamp)});
    };

    componentDidMount() {
        this.setDateTime(this.props);
    }

    componentWillReceiveProps(props) {
        this.setDateTime(props);
    }

    shouldComponentUpdate(props, {datetime}) {
        return datetime !== this.state.datetime;
    }

    render() {
        const {datetime, string} = this.state;
        return <time dateTime={datetime}>{string}</time>;
    }
}