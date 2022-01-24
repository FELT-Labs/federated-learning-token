from numpy import genfromtxt


def load_data(path):
    data = genfromtxt(path, delimiter=",")
    return data[:-1], data[-1]
