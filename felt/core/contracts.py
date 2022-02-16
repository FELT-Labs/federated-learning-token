"""Module providing helpful functions for working with contracts."""

# Mapping for training Plan struct
PI = {
    "creator": 0,
    "finalNode": 1,
    "randomSeed": 2,
    "baseModelCID": 3,
    "finalModelCID": 4,
    "numRounds": 5,
    "numNodes": 6,
    "totalReward": 7,
    "nodeReward": 8,
    "keyTurn": 9,
}


# Mapping for Node struct
NI = {
    "_address": 0,
    "activated": 1,
    "entryKeyTurn": 2,
}

# Mapping for Builder struct
BI = {
    "_address": 0,
    "publicKey": 1,
}


structures = {
    "TrainingPlan": PI,
    "Node": NI,
    "Builder": BI,
}


def to_dict(values, struct_name):
    """Map list to dictionary based on the structure from contract."""
    d = {}
    mapping = structures[struct_name]
    for k, idx in mapping.items():
        d[k] = values[idx]
    return d
