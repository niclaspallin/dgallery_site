from django.http import HttpResponseBadRequest, JsonResponse, Http404
from .models import Slide, Picture


def pictures(request, album_id):
    try:
        pics = Picture.objects.filter(album=album_id)
    except:
        HttpResponseBadRequest("Invalid request with album {}".format(album_id))

    return json_response__(pics)


def json_response__(query_set):
    return JsonResponse(list(query_set.values()), safe=False)
