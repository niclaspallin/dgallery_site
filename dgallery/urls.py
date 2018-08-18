from django.urls import path

from . import views, api

app_name = 'dgallery'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('albums/', views.AlbumListView.as_view(), name='albums'),
    path('albums/<int:pk>/', views.AlbumDetailView.as_view(), name='album-detail'),
    path('api/pictures/<int:album_id>/', api.pictures)
]
