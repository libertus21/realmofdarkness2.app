class Supporter():  
  NONE = 0
  FLEDGLING = 1
  NEONATE = 2
  ANCILLA = 3
  ELDER = 4
  METHUSELAH = 5

class CharacterSheetLimit():
  BASE = 1
  MORTAL = 3
  FLEDGLING = 6
  NEONATE = 15
  ANCILLA = 100

  @staticmethod
  def get_amount(supporterLevel):
    if supporterLevel == Supporter.NONE: return CharacterSheetLimit.BASE
    elif supporterLevel == Supporter.FLEDGLING: return CharacterSheetLimit.FLEDGLING
    elif supporterLevel == Supporter.NEONATE: return CharacterSheetLimit.NEONATE
    elif supporterLevel >= Supporter.ANCILLA: return CharacterSheetLimit.ANCILLA