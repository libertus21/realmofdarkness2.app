import React from 'react';
import Dot from './Dot'
import Stack from '@material-ui/core/Stack'

/*
    props: {
        dots: int // Number of dots to appear
        onDotClicked: function(clicked) // function handerler
        selected: int // Dot to be selected. Defaults to 0
    }
*/
class DotGroup extends React.Component
{
    constructor(props)
    {
        super(props);

        this.changeSelected = this.changeSelected.bind(this);
    }

    changeSelected(clicked)
    {
        let selected = this.props.selected;
        
        if (clicked === selected)
        {
           selected = (clicked - 1);
        }
        else
        {
            selected = clicked;
        } 

        this.props.onDotClicked(selected);    
    }

    render()
    {
        let stacks = [];
        let dots = [];
        let stackCount = 1;
        let dotsCount = (this.props.dots + 1);

        for (let i = 1; i <= dotsCount; i++)
        {
            if (i === dotsCount)
            {
                if (stackCount === 1)
                {
                    return (
                        <Stack direction="row">
                            {dots}
                        </Stack>
                    );
                }
                   
                let stack = (
                    <Stack key={"stack" + stackCount} direction="row">
                        {dots}
                    </Stack>
                );
                stacks.push(stack);             
            }
            else if (i && (i % 10 === 0))
            {
                dots.push(
                    <Dot margin="0px" key={"Dot" + (i + 1)}
                    value={i} selected={this.props.selected}
                    changeSelected={this.changeSelected}
                    />
                )
                
                let stack = (
                    <Stack key={"stack" + stackCount} direction="row">
                        {dots}
                    </Stack>
                ); 
                stacks.push(stack);
                dots = [];
                stackCount++;
            }
            else if (i && (i % 5 === 0))
            {
                dots.push(
                    <Dot margin={(i+1) === dotsCount ? '0px' : "10px"} 
                    key={"Dot" + (i + 1)} value={i} 
                    selected={this.props.selected}
                    changeSelected={this.changeSelected}
                    />
                );
            }
            else
            {
                dots.push(
                    <Dot margin="0px" key={"Dot" + (i + 1)}
                    value={i} selected={this.props.selected}
                    changeSelected={this.changeSelected}
                    />
                )
            }
        }

        return (
            <Stack >
                {stacks}
            </Stack>           
        );
    }
}

export default DotGroup;