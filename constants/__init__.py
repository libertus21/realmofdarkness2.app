class Supporter():  
  NONE = 0
  FLEDGLING = 1
  NEONATE = 2
  ANCILLA = 3
  ELDER = 4
  METHUSELAH = 5

class CharacterSheetLimit():
  BASE = 2
  MORTAL = 4
  FLEDGLING = 8
  NEONATE = 30
  ANCILLA = 200

  @staticmethod
  def get_amount(supporterLevel):
    if supporterLevel == Supporter.NONE: return CharacterSheetLimit.BASE
    elif supporterLevel == Supporter.FLEDGLING: return CharacterSheetLimit.FLEDGLING
    elif supporterLevel == Supporter.NEONATE: return CharacterSheetLimit.NEONATE
    elif supporterLevel >= Supporter.ANCILLA: return CharacterSheetLimit.ANCILLA