#!/usr/bin/env python
# -*- coding: utf-8 -*-
import io
from os.path import join, dirname, abspath
import sys

PY2 = sys.version_info[0] == 2

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup


def read_relative_file(filename):
    """Returns contents of the given file, whose path is supposed relative
    to this module."""
    path = join(dirname(abspath(__file__)), filename)
    with io.open(path, encoding='utf-8') as f:
        return f.read()

NAME = 'ferry'
DESCRIPTION = 'Data Dictionary, Data Mapping and Data Compare tool'
REQUIREMENTS = [
    'python-dateutil',
    'flask',
    'simplejson'
]
__VERSION__ = '0.0.1'

params = dict(
    name=NAME,
    description=DESCRIPTION,
    packages=['ferry'],
    version=__VERSION__,
    long_description=read_relative_file('README.md'),
    author='Ambal',
    author_email='ambalavanar.thiru@gmail.com',
    url='https://github.com/Ambalavanar/ferry',
    license='MIT License',
    include_package_data=True,
    install_requires=REQUIREMENTS,
    zip_safe=False,
    classifiers=[
        'Development Status :: PoC',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
    ],
)

if __name__ == '__main__':
    setup(**params)