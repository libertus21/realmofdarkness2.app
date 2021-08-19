import { Grid } from '@material-ui/core';
import React from 'react';
import LabeledDotGroup from '../LabeledDotGroup';

const talents = ["Alertness", "Athletics", "Awareness", "Brawl", "Empathy", 
    "Expression", "Intimidation", "Leadership", "Streetwise", "Subterfuge"];

const skills = ["Animal Ken", "Crafts", "Drive", "Etiquette", "Firearms", 
    "Larceny", "Melee", "Performance", "Stealth", "Survival"];

const knowledges = ["Academics", "Computer", "Finance", "Investigation",
    "Law", "Medicine", "Occult", "Politics", "Science", "Technology"];

function abilityList(category)
{
    const list = category.map((ability) => {
        return (
            <Grid key={ability} item xs={12} my={1}>
                <LabeledDotGroup 
                    label={{name: ability}}

                />
            </Grid>
    )});
    return list;
}

const talentList = abilityList(talents);
const skillList = abilityList(skills);
const knowledgeList = abilityList(knowledges);

class Abilities20th extends React.Component
{
    constructor(props)
    {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(ability)
    {
        this.props.onChange();
    }

    render()
    {
        return (
            <Grid container columnSpacing={{xs: 5}} py={2.5}>
                <Grid item xs={12} sx={{textAlign: "center"}}>
                    Abilities
                </Grid>
                <Grid item xs>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        Talents
                    </Grid>
                    {talentList}
                </Grid>

                <Grid item xs>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        Skills
                    </Grid>
                    {skillList}
                </Grid>

                <Grid item xs>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        Knowledges
                    </Grid>
                    {knowledgeList}
                </Grid>
               
            </Grid>            
        );
    }
}

export default Abilities20th;