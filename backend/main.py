# -*- coding: utf-8 -*-
'''后端主入口'''

from . import app
from . import config
from . import views

def start_server():
    app.run(**config.RUN_CFG)