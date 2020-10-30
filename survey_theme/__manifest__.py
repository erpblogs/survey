# -*- coding: utf-8 -*-
{
    'name': 'Custom Theme',
    'version': '1',
    'summary': 'This module add employee form info',
    'description': 'Custom Theme.',
    'category': 'Website',
    'author': 'Quang (Quang.trinhvan)',
    'company': 'Quang',
    'website': 'thongtintuyendung.xyz',
    'depends': ['base_setup', 'website'],
    'demo': [
        'data/demo.xml',
    ],
    'data': [
        'views/assets.xml',
        'views/common/header.xml',
        'views/common/footer.xml',
        'views/homepage.xml',
        # 'views/about_us.xml',
        # 'views/content.xml',
        'views/res_config.xml',
    ],
    'qweb': [
        "static/src/xml/web_user_view_template.xml",
    ],
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
    'application': False,
}
