from django.db import models


class Album(models.Model):
    name = models.CharField(max_length=30)
    created_at = models.DateTimeField('Created', auto_now=True)

    cover = models.ImageField(upload_to='album_covers', null=True, blank=True)

    def __str__(self):
        return self.name


class Picture(models.Model):
    album = models.ForeignKey(Album, on_delete=models.DO_NOTHING, null=True, blank=True)
    image = models.ImageField(upload_to='uploads/%Y/%m/%d')
    created_at = models.DateTimeField('Created', auto_now=True)

    def __str__(self):
        return self.image.name


# Slide (Part of Carousel)
class Slide(models.Model):
    image = models.ImageField(upload_to='uploads/slides/')

    def __str__(self):
        return self.image.name
