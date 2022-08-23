from enum import Enum

class Splats(Enum):
    vampire20th = 'vampire20th'
    ghoul20th = 'ghoul20th'
    human20th = 'human20th'
    werewolf20th = 'werewolf20th'
    changeling20th = 'changeling20th'  
    mage20th = 'mage20th'
    wraith20th = 'wraith20th' 
    demonTF = 'demon20th'
    vampire5th = 'vampire5th'
    mortal5th = 'mortal5th'
    hunter5th = 'hunter5th'

class Versions(Enum):
    v5 = '5th'
    v20 = '20th'

def splat_versions(splat):
    splats_versions = {
        Splats.changeling20th: Versions.v20.value,
        Splats.vampire20th: Versions.v20.value,
        Splats.ghoul20th: Versions.v20.value,
        Splats.human20th: Versions.v20.value,
        Splats.werewolf20th: Versions.v20.value,
        Splats.mage20th: Versions.v20.value,
        Splats.wraith20th: Versions.v20.value,
        Splats.demonTF: Versions.v20.value,
        Splats.vampire5th: Versions.v5.value,
        Splats.mortal5th: Versions.v5.value,
        Splats.hunter5th: Versions.v5.value
    }
    return splats_versions[splat]