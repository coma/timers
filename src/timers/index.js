import React, {PropTypes} from 'react';
import Timer from './timer';
import './index.css';

const mapFromPlainObjectToTimerComponent = remove => ({id, name, time}) => (
    <Timer
        key={ id }
        name={ name }
        time={ time }
        remove={ () => remove(id) }
    />
);

const Timers = ({timers, remove}) => (
    <div className="timers">
        { timers.map(mapFromPlainObjectToTimerComponent(remove)) }
    </div>
);

Timers.propTypes = {
    timers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired
    }))
};

export default Timers;
