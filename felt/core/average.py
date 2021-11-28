"""Model for performing federated averaging of models."""
import numpy as np

ATTRIBUTE_LIST = ["coef_", "intercept_", "coefs_", "intercepts_"]


def get_models_params(models):
    """Extract trainable parameters from scikit-learn models.

    Args:
        modesl (list[object]): list of scikit-learn models.

    Returns:
        (dict[str, list[ndarray]]): dictionary mapping attributes to list of values
            numpy arrays extracted from models.
    """
    params = {}
    for param in ATTRIBUTE_LIST:
        params[param] = []
        try:
            for model in models:
                params[param].append(getattr(model, param))
        except:
            params.pop(param, None)

    return params


def set_model_params(model, params):
    """Set new values of trainable params to scikit-learn models.

    Args:
        model (object): scikit-learn model.
        params (dict[str, ndarray]): dictinary mapping attributes to numpy arrays.

    Returns:
        (object): scikit-learn model with new values.
    """
    for param, value in params.items():
        setattr(model, param, value)
    return model


def average_models(models):
    """Average trainable parameters of scikit-learn models.

    Args:
        models (list[object]): list of scikit-learn models.

    Returns:
        (object): scikit-learn model with new values.
    """
    params = get_models_params(models)
    for param, values in params.items():
        val = np.mean(values, axis=0)
        params[param] = val.astype(values[0].dtype)

    model = set_model_params(models[0], params)
    return model
