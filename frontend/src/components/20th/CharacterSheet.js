import { Grid } from '@material-ui/core';
import React from 'react';
import Attributes20th from './Attributes20th';
import Abilities20th from './Abilities20th';
import DialogDotGroup from '../DialogDotGroup';
import Virtues from './Virtues';
import MeritsFlaws from './MeritsFlaws';
import Morality20th from './Morality20th';
import Willpower20th from './Willpower20th';
import BloodPool from './BloodPool';
import Health20th from './Health20th';
import Weakness from './vampire/Weakness';
import Exp20th from './Exp20th';
import GeneralCharInfo20th from '../GeneralCharInfo20th';

const options = {
    malk: {
        slug: 'malk',
        name: "Malkavian",
        cost: "3",
        bearing: "Crazy",
    },
    gangrel: {
        slug: 'gangrel',
        name: "Gangrel",
        cost: "5",
    },
    brujah: {
        slug: 'brujah',
        name: "Brujah",
        cost: "2",
    },
    harbingersOfSkulls: {
        slug: 'harbingersOfSkulls',
        name: "Harbingers Of Skulls",
        cost: "6",
    },
  };

class CharacterSheet extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {};

        this.ws = null;

        this.webSocketConnect = this.webSocketConnect.bind(this);
        this.webSocketReconnect = this.webSocketReconnect.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(changed)
    {
        this.setState(changed);
    }

    componentDidMount()
    {
        //this.webSocketConnect();
    }

    webSocketConnect()
    {
        console.log("Attempting to Connect");
        this.ws = new WebSocket("ws://127.0.0.1:8000/ws/character");
        
        this.ws.onopen = function(event) {
            console.log("Connection Opened!");
        }

        this.ws.onmessage = function(event) {
            console.log("We got a message", event.data);
        }

        this.ws.onclose = this.webSocketReconnect;
    }  

    webSocketReconnect()
    {
        console.log("Connection failed retry in 15secs");
        setTimeout(this.webSocketConnect, 15000)
    }

    componentWillUnmount()
    {
        if (this.ws) this.ws.close();
    }

    render()
    {
        return (
            <Grid container px={5}>
                <GeneralCharInfo20th />
                <Attributes20th />        
                <Abilities20th />
                <Grid container columnSpacing={{xs: 5}} py={2.5}>
                  <DialogDotGroup label="Disciplines" options={options} />
                  <DialogDotGroup label="Backgrounds" options={options} />
                  <Virtues />
                </Grid>
                <Grid container>
                  <MeritsFlaws options={options} />
                  <Grid item xs={4}>
                    <Morality20th 
                        morality={
                            this.state.morality ? 
                            this.state.morality : 
                            {id: "", name: "Humanity", 
                            level: 1, bearing: "Normalcy"}
                        }
                        onChange={this.onChange}                        
                        options={options}  
                    />
                    <Willpower20th />
                    <BloodPool 
                        bloodPool={this.state.bloodPool} 
                        onChange={this.onChange} 
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Health20th />
                    <Weakness />
                    <Exp20th />
                  </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default CharacterSheet;