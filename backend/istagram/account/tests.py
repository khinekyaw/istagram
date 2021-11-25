from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Profile


class ProfileModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        User = get_user_model()
        user1 = User.objects.create_user("john", password="userpassword")
        user2 = User.objects.create_user("jane", password="userpassword")
        Profile.objects.create(user=user1, name="John Doe")
        Profile.objects.create(user=user2, name="Jane Doe")

    def test_user_content(self):
        user = get_user_model().objects.get(id=1)
        expected_object_name = f'{user.username}'
        self.assertEquals(expected_object_name, 'john')

    def test_name_content(self):
        profile = Profile.objects.get(id=1)
        expected_object_name = f'{profile.name}'
        self.assertEquals(expected_object_name, 'John Doe')

    def test_following_content(self):
        profile1 = Profile.objects.get(id=1)
        profile2 = Profile.objects.get(id=2)
        profile1.following.add(profile2)
        expected_object_name = profile1.following.filter(
            id=2).first().user.username
        self.assertEquals(expected_object_name, 'jane')
