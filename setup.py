"""FELToken python pockage is intended for running data provider code.

This code connects to the specified smart contract and trains the specified
models on data.

Entry command:

felt-node-worker --chain <80001> --contract <address> --account main --data <data_path.csv>
"""
import re
from pathlib import Path
from shutil import copytree, rmtree

from setuptools import find_packages, setup

DOCLINES = (__doc__ or "").split("\n")

CLASSIFIERS = """\
Intended Audience :: Science/Research
Intended Audience :: Developers
Programming Language :: Python
Programming Language :: Python :: 3
Programming Language :: Python :: 3.8
Programming Language :: Python :: 3.9
Programming Language :: Python :: 3.10
Programming Language :: Python :: 3 :: Only
Topic :: Scientific/Engineering
"""

# Copy artifacts
ROOT = Path(__file__).parent.absolute()
rmtree(ROOT / "felt/artifacts", ignore_errors=True)
copytree(ROOT / "build", ROOT / "felt/artifacts")


def parse_requirements(file_name):
    """
    from:
        http://cburgmer.posterous.com/pip-requirementstxt-and-setuppy
    """
    requirements = []
    with open(file_name, "r") as f:
        for line in f:
            if re.match(r"(\s*#)|(\s*$)", line):
                continue
            if re.match(r"\s*-e\s+", line):
                requirements.append(
                    re.sub(r"\s*-e\s+.*#egg=(.*)$", r"\1", line).strip()
                )
            elif re.match(r"\s*-f\s+", line):
                pass
            else:
                requirements.append(line.strip())
    return requirements


requirements = parse_requirements("requirements-lib.txt")


setup(
    name="felt",
    version="0.1.0",
    packages=find_packages(),
    maintainer="FELToken",
    maintainer_email="info@bretahajek.com",
    description=DOCLINES[0],
    long_description="\n".join(DOCLINES[2:]),
    keywords=["Federated Learning", "Web3", "Machine Learning"],
    url="https://feltoken.ai/",
    author="FELToken",
    project_urls={
        "Bug Tracker": "https://github.com/FELToken/federated-learning-token/issues",
        "Documentation": "https://docs.feltoken.ai/",
        "Source Code": "https://github.com/FELToken/federated-learning-token",
    },
    license="GPL-3.0 License",
    classifiers=[_f for _f in CLASSIFIERS.split("\n") if _f],
    platforms=["Windows", "Linux", "Solaris", "Mac OS-X", "Unix"],
    python_requires=">=3.8",
    install_requires=requirements,
    zip_safe=False,
    entry_points={
        "console_scripts": ["felt-node-worker = felt.node.background_worker:main"],
    },
    package_data={
        "felt": ["artifacts/*.json", "artifacts/contracts/*.json"],
    },
)
