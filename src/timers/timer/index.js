import React, {PureComponent} from 'react';
import classNames from 'classnames';
import numeral from 'numeral';
import './index.css';

class Timer extends PureComponent {

    static format (time) {

        return numeral(time).format('00:00:00');
    }

    constructor (props) {

        super(props);
        this.state = {...props, running: true, ended: false};
    }

    componentDidMount () {

        this.next();
    }

    componentWillUnmount () {

        this.clear();
    }

    clear () {

        clearTimeout(this.timer);
    }

    pause () {

        this.clear();
        this.setState({running: false});
    }

    next () {

        this.timer = setTimeout(() => this.tick(), 1000);
    }

    tick () {

        const time  = this.state.time - 1,
              ended = time === 0;

        if (!ended) {

            this.next();
        }

        this.setState({time, ended, running: !ended});
    }

    render () {

        const {name, time, running, ended} = this.state;

        return (
            <div className={ classNames('timer', {ended})}>
                <h2>{ name }</h2>
                <p>{ Timer.format(time) }</p>
                <div>
                    { !ended && running && <a onClick={ () => this.pause() }>pause</a> }
                    { !ended && !running && <a onClick={ () => this.tick() }>resume</a> }
                    <a onClick={ this.props.remove }>remove</a>
                </div>
            </div>
        );
    }
}

export default Timer;
