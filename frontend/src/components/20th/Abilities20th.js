import { Grid } from '@material-ui/core';
import React from 'react';
import LabeledDotGroup from '../LabeledDotGroup';

/*
    props: {
        abilities: {category: {}}
        onChange: function({})
    }
*/
class Abilities20th extends React.Component
{
    constructor(props)
    {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    abilityList(category)
    {
        if (!category) return "";

        const list = Object.keys(category).map((key) => {
            const ability = category[key];
            return (
                <Grid key={ability.slug} item xs={12} my={1}>
                    <LabeledDotGroup 
                        label={{slug: ability.slug, name: ability.name}}
                        selected={ability.level}
                        onChange={this.onChange}            
                    />
                </Grid>
        )});
        return list;
    }

    onChange(ability)
    {
        const clone = JSON.parse(JSON.stringify(this.props.abilities));

        for (const key of Object.keys(clone))
        {
            if (clone[key][ability.slug])
            {
                clone[key][ability.slug]["level"] = ability.level;
                break;
            }
        }
        this.props.onChange({
            state: {abilities: clone}, 
            server: {
                abilityLevel: {
                    slug: ability.slug, 
                    level: ability.level
                }
            }});
    }

    render()
    {
        if (!this.props.abilities) return "";

        return (
            <Grid container columnSpacing={{xs: 5}} py={2.5}>
                <Grid item xs={12} sx={{textAlign: "center"}}>
                    Abilities
                </Grid>
                <Grid item xs>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        Talents
                    </Grid>
                    {this.abilityList(this.props.abilities['talents'])}
                </Grid>

                <Grid item xs>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        Skills
                    </Grid>
                    {this.abilityList(this.props.abilities['skills'])}
                </Grid>

                <Grid item xs>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        Knowledges
                    </Grid>
                    {this.abilityList(this.props.abilities['knowledges'])}
                </Grid>
               
            </Grid>            
        );
    }
}

export default Abilities20th;