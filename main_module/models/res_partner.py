# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, exceptions, fields, models, _


class ResPartnerCustom(models.Model):
    _inherit = 'res.partner'

    job_id = fields.Many2one('hr.job', 'Job Position', track_visibility='onchange')
    department_id = fields.Many2one('hr.department', 'Department', track_visibility='onchange')
