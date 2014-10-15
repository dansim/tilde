from django.core import serializers
from ww1.models import Bilirubin, Weight
from django.shortcuts import render
from django.http import HttpResponse, Http404
import json
from ww1.services import BilirubinService, WeightService


def index(request):
    return render(request, 'ww1/bilirubin.html', BilirubinService().start_page())


def detail(request, bilirubin_id):
    try:
        bilirubin = Bilirubin.objects.get(pk=bilirubin_id)
    except Bilirubin.DoesNotExist:
        raise Http404
    return render(request, 'ww1/detail.html', {'bilirubin': bilirubin})


def load_chart_data(request):
    data = serializers.serialize('json', Bilirubin.objects.all())
    return HttpResponse(data, content_type="application/json")


def alert_polling(request):
    return HttpResponse(json.dumps(BilirubinService().calculate_next()), content_type="application/json")


def bilirubin_trends(request):
    data = json.dumps(BilirubinService().trends())
    return HttpResponse(data, content_type="application/json")


def weight(request):
    return render(request, 'ww1/weight.html', {'weights': Weight.objects.all()})


def weight_detail(request, weight_id):
    try:
        weight = Weight.objects.get(pk=weight_id)
    except Bilirubin.DoesNotExist:
        raise Http404
    return render(request, 'ww1/weight_detail.html', {'weight': weight})


def weight_serialized(request):
    return HttpResponse(serializers.serialize('json', Weight.objects.all()), content_type="application/json")


def weight_status_serialized(request):
    data = json.dumps(WeightService().status())
    return HttpResponse(data, content_type="application/json")