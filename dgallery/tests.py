from django.test import TestCase
from .models import Album, Picture, Slide
from .admin import ThumbnailHelper


# Create your tests here.
class AlbumModelTests(TestCase):
    def test_can_create_album(self):
        album = Album(name="Test Album")
        album.save()
        self.assertIsNotNone(album.pk)

    def test_get_related_pictures(self):
        album = Album(name="Test Album")
        album.save()

        Picture.objects.create(image="/media/test.png", album=album)
        pictures = Picture.objects.filter(album=album)

        self.assertEqual(pictures.count(), 1)


class PictureModelTests(TestCase):
    def test_can_create_picture(self):
        album = Album(name="Test Album")
        album.save()
        picture = Picture(image="/media/test.png", album=album)
        picture.save()
        # We got a Primary Key, generated through django
        self.assertIsNotNone(picture.pk)

    def test_can_associate_album_with_picture(self):
        # Create the album the picture should be associated with
        album = Album(name="Test Album")
        album.save()

        # Create new picture associated with previous album.
        picture = Picture(image="/media/test", album=album)
        picture.save()
        # If all is correct, picture has an album object with the proper name
        self.assertIs(picture.album.name, "Test Album")


class SlideModelTests(TestCase):
    def test_can_create_slide(self):
        slide = Slide()
        slide.save()
        self.assertIsNotNone(slide.pk)


class ThumbnailHelperTests(TestCase):
    def test_build_thumbnail(self):
        # Initialize the ThumbnailHelper and pass in desired width and height.
        helper = ThumbnailHelper(80, 80)
        # Build takes the argument of filepath and will return a html (img) string with width and height passed in through constructor.
        self.assertEqual(helper.build("/media/test.png"), "<img src='/media/test.png' width='80' height='80' />")
