import React from 'react';
import faker from 'faker';
import { shallow } from 'enzyme';
import App from './app';
import Adder from './adder';
import Timers from './timers';

it('should have adder and timers as children', () => {

    const app = shallow(<App />);

    expect(app.find(Adder)).toHaveLength(1);
    expect(app.find(Timers)).toHaveLength(1);
});

it('should add and remove timers', () => {

    const app  = shallow(<App />),
          name = faker.name.firstName(),
          time = faker.random.number({min: 1, max: 100}),
          id   = 1;

    expect(app.state().timers).toHaveLength(0);
    expect(app.state().id).toEqual(0);
    expect(app.find(Timers).props().timers).toHaveLength(0);

    //app.instance().add(name, time);
    app.find(Adder).props().add(name, time);

    expect(app.state().timers).toHaveLength(id);
    expect(app.state().timers[0]).toEqual({id, name, time});
    expect(app.state().id).toEqual(1);
    expect(app.find(Timers).props().timers).toHaveLength(1);

    //app.instance().remove(id);
    app.find(Timers).props().remove(id);

    expect(app.state().timers).toHaveLength(0);
    expect(app.state().id).toEqual(id);
    expect(app.find(Timers).props().timers).toHaveLength(0);
});