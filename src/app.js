import React, {Component} from 'react';
import Adder from './adder';
import Timers from './timers';

class App extends Component {

    constructor (props) {

        super(props);

        this.state = {
            id    : 0,
            timers: []
        };
    }

    add (name, time) {

        const id = this.state.id + 1;

        this.setState({
            id,
            timers: [{id, name, time}, ...this.state.timers]
        });
    }

    remove (id) {

        const {timers} = this.state,
              index    = timers.findIndex(timer => timer.id === id);

        this.setState({
            timers: [
                ...timers.slice(0, index),
                ...timers.slice(index + 1)
            ]
        });
    }

    render () {

        const {timers} = this.state;

        return (
            <div>
                <Adder add={ (name, time) => this.add(name, time) } />
                <Timers timers={ timers } remove={ id => this.remove(id) }/>
            </div>
        );
    }
}

export default App;
