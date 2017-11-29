#!/usr/bin/env python3
#-*- coding:utf-8 -*-

from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class DjangoQuasarConfig(AppConfig):
    name = 'django_quasar'
    verbose_name = _('quasar')
