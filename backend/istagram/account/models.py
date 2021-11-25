from django.db import models
from django.conf import settings


def user_grouped_file_path(instance, filename):
    return f"users/{instance.user.username}/{filename}"


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    avatar = models.ImageField(upload_to=user_grouped_file_path,
                               blank=True)
    followers = models.ManyToManyField('self', blank=True,
                                       related_name='user_followers', symmetrical=False)
    following = models.ManyToManyField('self', blank=True,
                                       related_name='user_following', symmetrical=False)
    created = models.DateTimeField(auto_now_add=True,
                                   db_index=True)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return f'{self.user.username}({self.name})'
