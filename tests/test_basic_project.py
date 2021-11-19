def test_manager_owner(accounts, project):
    """Test transaction fail for non-owner accounts."""
    project.createPlan(1, {"from": accounts[0]})
    assert project.getPlansLength() == 1
    # This: .dict() works only if struct has more than 1 element
    assert project.latestPlan().dict()["num"] == 1

    project.abortPlan({"from": accounts[0]})

    project.createPlan(2, {"from": accounts[0]})
    project.abortPlan({"from": accounts[0]})

    project.createPlan(3, {"from": accounts[0]})
    assert project.getPlansLength() == 3
    assert project.plans(0).dict()["num"] == 1
    assert project.plans(1).dict()["num"] == 2
    assert project.plans(2).dict()["num"] == 3
    assert project.latestPlan().dict()["num"] == 3
