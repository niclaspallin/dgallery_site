from django.contrib import admin
from django.utils.html import mark_safe
from django.conf import settings
import os

from .models import Album, Picture, Slide


class ThumbnailHelper():
    def __init__(self, width=80, height=80):
        self.width = width
        self.height = height

    def build(self, thumbnail):
        return mark_safe("<img src='{}' width='{}' height='{}' style='object-fit: cover;' />".format(os.path.join(settings.MEDIA_URL, thumbnail), self.width, self.height))


class PictureAdmin(admin.ModelAdmin):
    # fields = ['thumbnail', 'image', 'album', 'created_at']
    list_display = ['thumbnail', 'image', 'album', 'created_at']
    list_display_links = ['thumbnail', 'image']

    fieldsets = [
        ('Fieldset', {'fields': ['thumbnail',
                                 'image', 'album', 'created_at']}),
    ]

    readonly_fields = ['created_at', 'thumbnail']

    def thumbnail(self, picture):
        thelper = ThumbnailHelper()
        return thelper.build(picture.image.name)

    thumbnail.admin_order_field = 'image'
    thumbnail.short_description = 'Image'
    thumbnail.allow_tags = True


class AlbumAdmin(admin.ModelAdmin):
    list_display = ['name', 'thumbnail', 'cover', 'created_at']
    list_display_links = ['name', 'thumbnail', 'cover']

    fieldsets = [
        ('Fieldset', {'fields': ['thumbnail',
                                 'cover', 'name', 'created_at']}),
    ]

    readonly_fields = ['created_at', 'thumbnail']

    def thumbnail(self, album):
        thelper = ThumbnailHelper()
        url = album.cover.name if album.cover.name is not None else ''
        return thelper.build(url)

    thumbnail.admin_order_field = 'cover'
    thumbnail.short_description = 'Cover'
    thumbnail.allow_tags = True


class SlideAdmin(admin.ModelAdmin):
    list_display = ['thumbnail', 'image']
    list_display_links = ['thumbnail', 'image']
    readonly_fields = ['thumbnail']

    def thumbnail(self, filepath):
        thelper = ThumbnailHelper(height=160)
        return thelper.build(filepath)

    thumbnail.admin_order_field = 'image'
    thumbnail.short_description = 'Image'
    thumbnail.allow_tags = True

# Register your models here.
admin.site.register(Album, AlbumAdmin)
admin.site.register(Picture, PictureAdmin)
admin.site.register(Slide, SlideAdmin)
