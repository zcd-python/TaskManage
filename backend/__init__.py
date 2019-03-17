# -*- coding: utf-8 -*-
import os

from flask import Flask


app = Flask(
    __name__,
    static_folder=os.path.join(os.environ['PROJ_ROOT'], 'frontend', 'static'),
    template_folder=os.path.join(os.environ['PROJ_ROOT'], 'frontend', 'templates'),
    instance_relative_config=True
)