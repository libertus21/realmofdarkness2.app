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

class CharacterSheet extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
        this.hash = Math.floor(Math.random() * 100);

        this.webSocketInit = this.webSocketInit.bind(this);
        this.webSocketOpen = this.webSocketOpen.bind(this);
        this.webSocketReconnect = this.webSocketReconnect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.wsRequestCharacter = this.wsRequestCharacter.bind(this);
        this.wsUpdateCharacter = this.wsUpdateCharacter.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }

    onChange(changed)
    {
        this.setState(changed.state);
        this.wsUpdateCharacter(changed.server);
    }   

    componentDidMount()
    {        
        this.webSocketInit();        
    }

    componentWillUnmount()
    {
        if (this.ws && (this.ws.OPEN || this.ws.CONNECTING))
        {
            this.unmounted = true;
            this.ws.close();
            this.ws = null;           
        }
        
        if (this.wsTimeout) clearTimeout(this.wsTimeout);
        this.wsTimeout = null;        
    }

    wsRequestCharacter()
    {
        const request = {
            request: "loadCharacter",
            pk: "8",
        };

        if (this.ws && this.ws.OPEN) 
            this.ws.send(JSON.stringify(request));
    }

    wsUpdateCharacter(update)
    {
        const request = {
            request: "updateCharacter",
            pk: this.state.pk,
            update: update
        };

        if (this.ws && this.ws.OPEN) 
            this.ws.send(JSON.stringify(request));
    }

    handleRequest(event)
    {
        let request;
        if (event.data)
        {
            request = JSON.parse(event.data);
        }

        if (request.request === "loadCharacter")
        {
            this.setState(request.character);
        }
    }

    webSocketInit()
    {
        this.ws = new WebSocket("ws://127.0.0.1:8000/ws/character");
        
        this.ws.onopen = this.webSocketOpen;

        this.ws.onmessage = this.handleRequest;

        this.ws.onclose = this.webSocketReconnect;
    }    

    webSocketOpen(event)
    {
        this.wsRequestCharacter();
    }

    webSocketReconnect()
    {
        if (this.unmounted) return;
        this.wsTimeout = setTimeout(this.webSocketInit, 15000);
        this.ws = null;
    }

    render()
    {
        return (
            <Grid container px={5}>
                <GeneralCharInfo20th />
                <Attributes20th 
                    attributes={this.state.attributes}
                    onChange={this.onChange}
                />        
                <Abilities20th 
                    abilities={this.state.abilities}
                    onChange={this.onChange}
                />
                <Grid container columnSpacing={{xs: 5}} py={2.5}>
                    <DialogDotGroup 
                        label={{slug: 'disciplines_v20', name: "Disciplines"}}
                        active={this.state.disciplines}
                        options={this.state.disciplineOptions} 
                    />
                    <DialogDotGroup 
                        label="Backgrounds" 
                        options={""} 
                    />
                    <Virtues 
                        virtues={this.state.virtues}
                        onChange={this.onChange}
                    />
                </Grid>
                <Grid container>
                  <MeritsFlaws options={""} />
                  <Grid item xs={4}>
                    <Morality20th 
                        morality={
                            this.state.morality ? 
                            this.state.morality : 
                            {id: "", name: "Humanity", 
                            level: 1, bearing: "Normalcy"}
                        }
                        onChange={this.onChange}                        
                        options={""}  
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