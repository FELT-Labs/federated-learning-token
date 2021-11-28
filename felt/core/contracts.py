"""Module providing helpful functions for working with contracts."""

# Mapping for training Plan struct
PI = {
    "creator": 0,
    "finalNode": 1,
    "randomSeed": 2,
    "baseModelCID": 3,
    "finalModelCID": 4,
    "parity": 5,
    "secret0": 6,
    "secret1": 7,
    "secret2": 8,
    "numRounds": 9,
    "numNodes": 10,
    "totalReward": 11,
    "nodeReward": 12,
    "keyTurn": 13,
}


# Mapping for Node struct
NI = {
    "_address": 0,
    "activated": 1,
    "parity": 2,
    "secret0": 3,
    "secret1": 4,
    "secret2": 5,
    "entryKeyTurn": 6,
}

# Mapping for Builder struct
BI = {
    "_address": 0,
    "parity": 1,
    "publicKey": 2,
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
