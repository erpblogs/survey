# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import random
import werkzeug.urls

from collections import defaultdict
from datetime import datetime, timedelta

from odoo import api, exceptions, fields, models, _

class SignupError(Exception):
    pass

def random_token():
    # the token has an entropy of about 120 bits (6 bits/char * 20 chars)
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    return ''.join(random.SystemRandom().choice(chars) for _ in range(20))

def now(**kwargs):
    return datetime.now() + timedelta(**kwargs)


class ResPartnerCustom(models.Model):
    _inherit = 'res.partner'

    job_id = fields.Many2one('hr.job', 'Job Position', track_visibility='onchange')