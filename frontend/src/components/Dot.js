import React from 'react';
import Box from '@material-ui/core/Box'


/*
    props: {
        value: int // value of this dot
        changeSelected: function(int) // function handerler for clicked
        margin: string // Margin to be added to the right
    }
*/
class Dot extends React.Component
{
    constructor(props)
    {
        super(props);
        this.value = props.value;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event)
    {
        this.props.changeSelected(this.value);
    }

    render()
    {
        return (<Box component="button" onClick={this.handleClick} sx={
            {
                width: 30,
                height: 30,
                marginRight: this.props.margin,
                backgroundColor: "Transparent",
                border: "none",
                backgroundImage: (this.value <= this.props.selected 
                    ? 'url(https://cdn.discordapp.com/emojis/817642148794335253.png?v=1)'
                    : 'url(https://cdn.discordapp.com/emojis/817641377826471936.png?v=1)'),
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",

                '&:hover': 
                {
                    backgroundImage: (this.value <= this.props.selected 
                    ? 'url(https://cdn.discordapp.com/attachments/817275006311989268/873506491343196211/FilledDotGlow.png)'
                    : 'url(https://cdn.discordapp.com/emojis/817641377826471936.png?v=1)'),
                    opacity: [0.9, 0.8, 0.7],
                },
            }}/>
        );
    }
}

export default Dot;