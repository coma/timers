import React, {PureComponent} from 'react';
import './index.css';

class Adder extends PureComponent {

    constructor (props) {

        super(props);
        this.state = Adder.defaultState();
    }

    onSubmit (event) {

        const {name, time} = this.state;

        event.preventDefault();
        this.props.add(name, Number.parseInt(time, 10) * 60);
        this.setState(Adder.defaultState());
    }

    onChange ({target: {name, value}}) {

        this.setState({
            [name]: value
        });
    }

    render () {

        const {name, time} = this.state;

        return (
            <form autoComplete="off" className="adder" onSubmit={ event => this.onSubmit(event) }>
                <input
                    type="text"
                    name="name"
                    placeholder="timer name"
                    onChange={ event => this.onChange(event) }
                    value={ name }/>

                <input
                    type="numeric"
                    name="time"
                    placeholder="time in minutes"
                    onChange={ event => this.onChange(event) }
                    value={ time }/>

                <button type="submit" disabled={ !name || !time }>add</button>
            </form>
        );
    }
}

Adder.defaultState = () => ({
    name: '',
    time: ''
});

export default Adder;
