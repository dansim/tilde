# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bilirubin',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('mol', models.FloatField(verbose_name=b'umol/l')),
                ('pub_date', models.DateTimeField(verbose_name=b'date published')),
                ('hours', models.IntegerField(verbose_name=b'hours')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
