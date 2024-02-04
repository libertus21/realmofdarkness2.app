import Grid from "@mui/material/Unstable_Grid2";
import Attribute from "./Attribute";
import { useSheetContext } from "../../routes/Character/Vampire5thSheet";
import Header from "../Sheet/Header";

export default function AttributesTab(props) {
  const { sheet } = useSheetContext();
  const attr = sheet.attributes;

  return (
    <Grid container spacing={2} xs={12}>
      <Header>Attributes</Header>
      <Grid xs={12} sm={4}>
        <Attribute name="Strength" dots={attr.strength} />
        <Attribute name="Dexterity" dots={attr.dexterity} />
        <Attribute name="Stamina" dots={attr.stamina} />
      </Grid>
      <Grid xs={12} sm={4}>
        <Attribute name="Charisma" dots={attr.charisma} />
        <Attribute name="Manipulation" dots={attr.manipulation} />
        <Attribute name="Composure" dots={attr.composure} />
      </Grid>
      <Grid xs={12} sm={4}>
        <Attribute name="Intelligence" dots={attr.intelligence} />
        <Attribute name="Wits" dots={attr.wits} />
        <Attribute name="Resolve" dots={attr.resolve} />
      </Grid>
    </Grid>
  );
}
