import { Grid } from '@material-ui/core';
import React from 'react';
import LabeledDotGroup from '../LabeledDotGroup';


/*
    props: {
        attributes: {category: {}}
        onChange: function({})
    }
*/
class Attributes20th extends React.Component
{
    constructor(props)
    {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    attributeList(category)
    {
        if (!category) return "";

        const list = Object.keys(category).map((key) => {
            const attribute = category[key];
            return (
                <Grid key={attribute.slug} item xs={12} my={1}>
                    <LabeledDotGroup 
                        label={{slug: attribute.slug, name: attribute.name}} 
                        selected={attribute.level}
                        onChange={this.onChange}
                    />
                </Grid>
        )});
        return list;
    }

    onChange(attribute)
    {
        const clone = JSON.parse(JSON.stringify(this.props.attributes));

        for (const key of Object.keys(clone))
        {
            if (clone[key][attribute.slug])
            {
                clone[key][attribute.slug]["level"] = attribute.level;
                break;
            }
        }
        this.props.onChange({
            state: {attributes: clone}, 
            server: {
                attributeLevel: {
                    slug: attribute.slug, 
                    level: attribute.level
                }
            }});
    }

    render()
    {
        if (!this.props.attributes) return "";

        return (
            <Grid container columnSpacing={{xs: 5}} py={2.5}>
                <Grid item xs={12} sx={{textAlign: "center"}}>
                    Attributes
                </Grid>
                <Grid item xs={4}>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        Physical
                    </Grid>
                    {this.attributeList(this.props.attributes['physical'])}
                </Grid>

                <Grid item xs={4}>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        Social
                    </Grid>
                    {this.attributeList(this.props.attributes['social'])}
                </Grid>

                <Grid item xs={4}>
                    <Grid item xs={12} sx={{textAlign: "center"}}>
                        Mental
                    </Grid>
                    {this.attributeList(this.props.attributes['mental'])}
                </Grid>               
            </Grid>            
        );
    }
}

export default Attributes20th;