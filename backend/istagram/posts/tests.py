from django.test import TestCase
from django.contrib.auth import get_user_model
from account.models import Profile
from .models import Post, Comment

DUMMY_TEXT = "Hello World"


class PostsModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        user = get_user_model().objects.create_user("john", password="userpassword")
        profile = Profile.objects.create(user=user, name="John Doe")
        Post.objects.create(profile=profile, caption=DUMMY_TEXT)

    def test_caption_content(self):
        post = Post.objects.get(id=1)
        expected_object_name = f'{post.caption}'
        self.assertEquals(expected_object_name, DUMMY_TEXT)


class CommentModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        user1 = get_user_model().objects.create_user("john", password="userpassword")
        profile1 = Profile.objects.create(user=user1, name="John Doe")
        post1 = Post.objects.create(profile=profile1, caption="Hello")

        user2 = get_user_model().objects.create_user("jane", password="userpassword")
        profile2 = Profile.objects.create(user=user2, name="Jane Doe")

        Comment.objects.create(post=post1, profile=profile2, body=DUMMY_TEXT)

    def test_body_content(self):
        comment = Comment.objects.get(id=1)
        expected_object_name = f'{comment.body}'
        self.assertEquals(expected_object_name, DUMMY_TEXT)
