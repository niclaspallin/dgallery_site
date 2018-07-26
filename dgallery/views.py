from django.shortcuts import render
from django.views.generic import ListView, DetailView

from .models import Album, Picture, Slide


class IndexView(ListView):
    model = Slide
    template_name = 'dgallery/index.html'

    # return render(request)
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        changed_list = list(self.object_list)
        context['carousel_slide_list'] = [{'image': slide.image, 'is_first': i == 0, 'previous': changed_list[i - 1].pk, 'pk': slide.pk, 'next': changed_list[(i + 1) % len(changed_list)].pk} for i, slide in enumerate(changed_list)]
        return context


class AlbumListView(ListView):
    model = Album


class AlbumDetailView(DetailView):
    model = Album

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['picture_list'] = Picture.objects.filter(
            album=kwargs['object'].pk)
        return context
