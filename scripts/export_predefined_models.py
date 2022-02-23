from sklearn.linear_model import (
    LinearRegression,
    LogisticRegression,
    SGDClassifier,
    SGDRegressor,
)

from felt.builder import upload_model


def export_models():
    # Export models
    model = LinearRegression()
    cid = upload_model(model)
    print("Linear Regression, cid:", cid)

    model = LogisticRegression()
    cid = upload_model(model)
    print("Logistic Regression, cid:", cid)

    model = SGDRegressor()
    cid = upload_model(model)
    print("SGD Regressor, cid:", cid)

    model = SGDClassifier()
    cid = upload_model(model)
    print("SGD Classifier, cid:", cid)


def main():
    export_models()
