from datetime import timedelta
from django.utils import timezone, datetime_safe
import time
from ww1.models import Bilirubin, Weight


class BilirubinService():

    diff_seconds = None

    def start_page(self):
        context = {
            'bilirubin_list': Bilirubin.objects.all().order_by('pub_date').reverse(),
        }
        return context

    def calculate_next(self):
        now_ = datetime_safe.datetime.now(timezone.utc) + timedelta(hours=2)
        before_ = Bilirubin.objects.latest('pub_date').pub_date
        self.diff_seconds = (now_ - before_).seconds
        return {
            'time_left': time.strftime('%H:%M:%S', time.gmtime(self.diff_seconds)),
            'alert': self.should_alert()
        }

    def should_alert(self):
        TIME_TO_ALERT = 8 * 60 * 60
        if abs(self.diff_seconds) > TIME_TO_ALERT:
            return True
        else:
            return False

    def trends(self):
        return {'total_average_value': self.total_average_value(),
                'latest_value': self.latest_value(),
                'latest_24h_average_value': self.latest_24h_average_value()}

    def total_average_value(self):
        total_average_value = 0
        for b in Bilirubin.objects.all():
            total_average_value += b.mol
        return round(total_average_value / Bilirubin.objects.all().count(), 0)

    def latest_value(self):
        return Bilirubin.objects.order_by('hours').reverse()[0].mol

    def latest_24h_average_value(self):
        temp = 0
        count = 0
        latest_hour = Bilirubin.objects.order_by('hours').reverse()[0].hours
        for b in Bilirubin.objects.order_by('hours').reverse():
            if b.hours <= (latest_hour - 24):
                break
            else:
                count += 1
                temp += b.mol
        return round(temp / count, 0)


class WeightService():

    def start_page(self):
        context = {
            'weight_list': Weight.objects.all().order_by('pub_date').reverse(),
        }
        return context

    def status(self):
        first = Weight.objects.all().order_by('pub_date').reverse()[0]
        last = Weight.objects.all().order_by('pub_date')[0]

        start_weight = first.weight
        total_diff = first.weight - last.weight
        total_percent_diff = round((total_diff / start_weight) * 100, 0)

        return {'start_weight': start_weight, 'total_diff': total_diff, 'total_percent_diff': total_percent_diff,
                'warning': abs(total_percent_diff) >= 10}