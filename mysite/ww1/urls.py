from django.conf.urls import patterns, url

from ww1 import views

urlpatterns = patterns('',
                       url(r'^$', views.index, name='index'),
                       url(r'^load-chart-data/$', views.load_chart_data, name='load-chart-data'),
                       url(r'^alert-polling/$', views.alert_polling, name='alert-polling'),
                       url(r'^(?P<bilirubin_id>\d+)/$', views.detail, name='detail'),
                       url(r'^weight/$', views.weight, name='weight'),
                       url(r'^weight-serialized/$', views.weight_serialized, name='weight_serialized'),
                       url(r'^weight-detail/(?P<weight_id>\d+)/$', views.weight_detail, name='weight_detail'),
                       url(r'^weight-status-serialized/$', views.weight_status_serialized, name='weight_status'),
                       url(r'^bilirubin-trends', views.bilirubin_trends, name='bilirubin_trends'))