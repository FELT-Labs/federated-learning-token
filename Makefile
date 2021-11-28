.PHONY: help install install-node lint clean client

# You can specify exact version of python3 or venv name as environment variable
PYTHON_VERSION?=python3.9
VENV_NAME?=venv

VENV_BIN=$(shell pwd)/${VENV_NAME}/bin
VENV_ACTIVATE=. $(VENV_NAME)/bin/activate

PYTHON=${VENV_NAME}/bin/python3


.DEFAULT: help
help:
	@echo "Make file commands:"
	@echo "    make install"
	@echo "        Prepare complete development environment"
	@echo "    make install-node"
	@echo "        Prepare environment for running data provider node"
	@echo "    make lint"
	@echo "        Run pylint and flake8"
	@echo "    make clean"
	@echo "        Clean repository"

install:
#	sudo apt -y install build-essential $(PYTHON_VERSION) $(PYTHON_VERSION)-dev $(PYTHON_VERSION)-distutils
	${PYTHON_VERSION} -m pip install -U pip
	${PYTHON_VERSION} -m pip install virtualenv
	make venv
	${VENV_ACTIVATE}; pre-commit install


install-node:
#	sudo apt -y install build-essential $(PYTHON_VERSION) $(PYTHON_VERSION)-dev $(PYTHON_VERSION)-distutils
	${PYTHON_VERSION} -m pip install -U pip
	${PYTHON_VERSION} -m pip install virtualenv
	make venv
	${VENV_ACTIVATE}; pre-commit install
	${PYTHON} -m pip install -e .
# Process manager for running the node:
	npm install pm2 -g


# Runs when the file changes
venv: $(VENV_NAME)/bin/activate
$(VENV_NAME)/bin/activate: requirements.txt requirements-lib.txt
	test -d $(VENV_NAME) || $(PYTHON_VERSION) -m virtualenv -p $(PYTHON_VERSION) $(VENV_NAME)
	${PYTHON} -m pip install -U pip
	${PYTHON} -m pip install -r requirements.txt -r requirements-lib.txt
	touch $(VENV_NAME)/bin/activate

clean:
	find . -name '*.pyc' -exec rm --force {} +
	rm -rf $(VENV_NAME) *.eggs *.egg-info dist build docs/_build .cache

lint: venv
	${PYTHON} -m pylint src scripts tests
	${PYTHON} -m flake8 src scripts tests

# For running node
# Logs can be viewed as: pm2 logs
node-start:
	${VENV_ACTIVATE}; pm2 start node_ecosystem.config.js

node-stop:
	${VENV_ACTIVATE}; pm2 stop node_ecosystem.config.js