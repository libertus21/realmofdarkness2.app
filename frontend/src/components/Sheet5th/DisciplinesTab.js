import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Discipline from "./Discipline";
import NewDisciplineDialog from "./Vampire/CustomDisciplineDialog";
import Header from "../Sheet/Header";
import { useSheetContext } from "../../routes/Character/Vampire5thSheet";
import { useAlertContext } from "../../components/AlertProvider";
import { useState } from "react";

export default function DisciplinesTab(props) {
  const { lock, sheet, handleUpdate } = useSheetContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateDiscipline, setUpdate] = useState(null);
  const { pushAlert } = useAlertContext();

  function openDialog() {
    setDialogOpen(true);
  }

  function closeDialog() {
    setUpdate(null);
    setDialogOpen(false);
  }

  function updateCustomDiscipline(discipline) {
    setUpdate(discipline);
    openDialog();
  }

  async function handleDisciplineUpdate(discipline, update, oldName) {
    if (!update && discipline.name in sheet.disciplines) {
      pushAlert({
        title: "Discipline Exists!",
        message: "You already have a discipline with this name.",
      });
      return;
    }

    if (!discipline.value) discipline.value = 0;
    if (!discipline.description) discipline.description = [];
    if (!discipline.characteristics) discipline.characteristics = [];
    discipline.custom = 0;
    discipline.source = "";
    discipline.powers = [];

    const newDisciplines = JSON.parse(JSON.stringify(sheet.disciplines));
    if (oldName) delete newDisciplines[oldName];
    newDisciplines[discipline.name] = discipline;
    await handleUpdate({ disciplines: newDisciplines });
  }

  async function deleteDiscipline(name) {
    const newDisciplines = JSON.parse(JSON.stringify(sheet.disciplines));
    delete newDisciplines[name];
    await handleUpdate({ disciplines: newDisciplines });
  }

  const addNewButton = (
    <Grid minWidth="300px">
      <Button fullWidth variant="outlined" onClick={openDialog}>
        <AddIcon fontSize="small" />
        New Discipline
      </Button>
    </Grid>
  );

  return (
    <Grid container spacing={2} xs={12}>
      <Header>Disciplines</Header>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        xs={12}
        paddingTop={1}
        minHeight={80}
      >
        {sheet.disciplines &&
          Object.entries(sheet.disciplines).map(
            ([disciplineName, discipline]) => (
              <Discipline
                key={disciplineName}
                discipline={discipline}
                updateCustomDiscipline={updateCustomDiscipline}
                updateDiscipline={handleDisciplineUpdate}
                deleteDiscipline={deleteDiscipline}
              />
            )
          )}
        {!lock ? addNewButton : null}
      </Grid>
      <NewDisciplineDialog
        open={dialogOpen}
        onClose={closeDialog}
        onSave={handleDisciplineUpdate}
        update={updateDiscipline}
      />
    </Grid>
  );
}
