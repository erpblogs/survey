# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Main module',
    'description': """
Allow users to sign up and reset their password
===============================================
    """,
    'version': '1.0',
    'category': 'Hidden/Tools',
    'auto_install': True,
    'depends': [
        'base_setup',
        'auth_signup',
        'mail',
        'web',
        'hr',
        'survey',
    ],
    'data': [
        'data/survey_user_info.xml',
        'data/survey_conditional_working.xml',
        'data/survey_user_heart.xml',
        'views/homepage.xml',
        'views/res_users_views.xml',
        'views/auth_signup_login_templates.xml',
        'views/portal_templates.xml',
    ],
    'qweb': [
        "static/src/xml/web_user_view_template.xml",
    ],
    'bootstrap': True,
}
