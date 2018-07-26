from django.contrib import admin
from django.utils.html import mark_safe
from django.conf import settings
import os

from .models import Album, Picture, Slide


class ThumbnailHelper():
    def __init__(self, width=80, height=80):
        self.width = width
        self.height = height

    def build(self, filepath):
        return mark_safe("<img src='{}' width='{}' height='{}' />".format(os.path.join(settings.MEDIA_URL, filepath), self.width, self.height))


class PictureAdmin(admin.ModelAdmin):
    # fields = ['thumbnail', 'image', 'album', 'created_at']
    list_display = ['thumbnail', 'image', 'album', 'created_at']
    list_display_links = ['thumbnail', 'image', 'album']

    fieldsets = [
        ('Fieldset', {'fields': ['thumbnail',
                                 'image', 'album', 'created_at']}),
    ]

    readonly_fields = ['created_at', 'thumbnail']

    def thumbnail(self, filepath):
        thelper = ThumbnailHelper()
        return thelper.build(filepath)
    """
    def thumbnail(self, filpath):
        return mark_safe(
            "<img src='{}' width='{}' height='{}' />"
            .format(os.path.join(settings.MEDIA_URL, str(filpath)), 80, 80))
    """
    thumbnail.admin_order_field = 'image'
    thumbnail.short_description = 'Image'
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
admin.site.register(Album)
admin.site.register(Picture, PictureAdmin)
admin.site.register(Slide)
