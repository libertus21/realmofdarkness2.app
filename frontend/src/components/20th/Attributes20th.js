import { Grid } from '@material-ui/core';
import React from 'react';
import LabeledDotGroup from '../LabeledDotGroup';

const physical = ["Strength", "Dexterity", "Stamina"];

const social = ["Charisma", "Manipulation", "Appearance"];

    const mental = ["Perception", "Intelligence", "Wits"];

function attributeList(category)
{
    const list = category.map((attribute) => {
        return (
            <Grid key={attribute} item xs={12} my={1}>
                <LabeledDotGroup label={attribute} selected="1" />
            </Grid>
    )});
    return list;
}

const physicalList = attributeList(physical);
const socialList = attributeList(social);
const mentalList = attributeList(mental);

class Attributes20th extends React.Component
{
    render()
    {
        return (
            <Grid container columnSpacing={{xs: 5}} py={2.5}>
                <Grid item xs={12} sx={{textAlign: "center"}}>
                    Attributes
                </Grid>
                <Grid item xs={4}>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        Physical
                    </Grid>
                    {physicalList}
                </Grid>

                <Grid item xs={4}>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        Social
                    </Grid>
                    {socialList}
                </Grid>

                <Grid item xs={4}>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        Mental
                    </Grid>
                    {mentalList}
                </Grid>               
            </Grid>            
        );
    }
}

export default Attributes20th;