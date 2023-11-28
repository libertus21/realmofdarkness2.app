import Grid from '@mui/material/Unstable_Grid2';
import {
  Divider,
  Typography,
  Button,
  IconButton,
  Tooltip
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ApiTextField from '../Sheet/ApiTextField';
import { useState } from 'react';
import TableChartIcon from '@mui/icons-material/TableChart';

import { useSheetContext } from '../../routes/Character/Vampire5thSheet';
import ExpChart from './Vampire/ExpChart';

export default function ExpTab() {
  const { lock, sheet, handleUpdate } = useSheetContext();

  const [exp_spends, setSpends] = useState(sheet.exp_spends);
  const [chartOpen, setChartOpen] = useState(false);

  async function update(change) {
    const key = Object.keys(change)[0];
    const index = key.match(/\d+/)[0] === '0' ? 0 : parseInt(key.match(/\d+/)[0]);
    const type = key.match(/_\w+/)[0].replace(/_/, '');

    let description;
    let cost;

    if (type === 'description') {
      description = change[key];
      cost = exp_spends[index].cost;
    }
    else {
      const c = change[key] === '0' ? 0 : parseInt(change[key]);
      if (c === Number.isNaN()) cost = NaN;
      else {
        cost = c
        let current;
        let diff;
        if (c < sheet.exp_spends[index].cost) {
          diff = sheet.exp_spends[index].cost - c;
          current = sheet.exp.current + diff;
          if (current > sheet.exp.total) current = sheet.exp.total;
        }
        else {
          diff = sheet.exp_spends[index].cost - c;
          current = sheet.exp.current + diff;
          if (current < 0) current = 0;
        }
        await handleUpdate({ exp_current: current });
      };
      description = exp_spends[index].description;
    }

    const spends = [];
    for (let i = 0; i < exp_spends.length; i++) {
      if (i === index) {
        spends.push({ description, cost });
      }
      else spends.push({
        description: exp_spends[i].description,
        cost: parseInt(exp_spends[i].cost)
      });
    }

    setSpends(spends);
    const res = await handleUpdate({ exp_spends: spends });
    if (res === 'error') setSpends(sheet.exp_spends);
  }

  const renderSpends = () => {
    if (lock) return exp_spends.map((item, index) => (
      <Grid container xs={12} xl={6} key={index} paddingX={1}>
        <Grid xs={9} lg={10}>
          <ApiTextField
            slug={`${index}_description`}
            maxLength={80}
            save={update}
            value={item.description}
          />
        </Grid>
        <Grid xs={3} lg={2}>
          <ApiTextField
            label="Cost"
            slug={`${index}_cost`}
            save={update}
            value={item.cost}
            maxLength={3}
          />
        </Grid>
      </Grid>
    ))
    else return exp_spends.map((item, index) => (
      <Grid container xs={12} xl={6} key={index} paddingX={0}>
        <Grid xs={8} lg={9}>
          <ApiTextField
            slug={`${index}_description`}
            save={update}
            value={item.description}
            maxLength={200}
          />
        </Grid>
        <Grid xs={3} lg={2}>
          <ApiTextField
            label="Cost"
            slug={`${index}_cost`}
            save={update}
            value={item.cost}
            maxLength={10}
          />
        </Grid>
        <Grid xs={1}>
          <IconButton color='error' onClick={() => handleDeleteRow(index)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    ))
  }

  function handleAddRow() {
    const newSpends = [];
    for (const item of exp_spends) {
      newSpends.push(item);
    }

    newSpends.push({
      description: '',
      cost: 0,
    });
    setSpends(newSpends);
  }

  async function handleDeleteRow(index) {
    const newSpends = [];
    for (let i = 0; i < exp_spends.length; i++) {
      if (index !== i) newSpends.push(exp_spends[i]);
    }
    const res = await handleUpdate({ exp_spends: newSpends });
    if (res !== 'error') {
      setSpends(newSpends);
    }
  }

  const renderAddSpendButton = () => {
    if (lock) return null;
    else return (
      <Grid sx={12} paddingTop={2}>
        <Button variant='outlined' onClick={handleAddRow}>
          Add Spend
        </Button>
      </Grid>
    )
  }

  const renderExpChat = () => {
    if (!chartOpen) return null;
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        xs={12}>
        <Grid xs={12} padding={2}>
          <Divider variant="middle">
            <Typography variant="h4" component="h2" color='#80172f'>
              Exp Cost Chart
            </Typography>
          </Divider>
        </Grid>
        <ExpChart />
      </Grid>
    )
  }

  return (
    <Grid
      spacing={0}
      container
      xs={12}
    >
      <Grid
        container
        xs={12}
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Grid
          container
          justifyContent='center'
          xs={12}
          paddingTop={2}
        >
          <ApiTextField
            label="Exp Current"
            slug='exp_current'
            value={sheet.exp.current}
            xs={6}
          />
          <ApiTextField
            label="Exp Total"
            slug='exp_total'
            value={sheet.exp.total}
            xs={6}
          />
          <Grid>
            <Tooltip title="Experiance Cost Chart">
              <IconButton onClick={() => setChartOpen(!chartOpen)}>
                <TableChartIcon color={chartOpen ? 'info' : "secondary"} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid xs={12} padding={2}>
          <Divider variant="middle">
            <Typography variant="h4" component="h2" color='#80172f'>
              Spends
            </Typography>
          </Divider>
        </Grid>
        <Grid xs={12} container justifyContent='flex-start' rowSpacing={2}>
          {renderSpends()}
        </Grid>
        {renderAddSpendButton()}
        {renderExpChat()}
      </Grid>
    </Grid>
  )
}