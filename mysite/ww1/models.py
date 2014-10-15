from django.db import models


class Bilirubin(models.Model):

    mol = models.FloatField('umol/l')
    pub_date = models.DateTimeField('date published')
    hours = models.IntegerField('hours')

    def __str__(self):
        return str(self.hours)


class Weight(models.Model):
    weight = models.FloatField('kg')
    pub_date = models.DateTimeField('date published')
    hours = models.IntegerField('hours')

    def __str__(self):
        return str(self.hours)