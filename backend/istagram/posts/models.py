from time import time as get_time_millis
from django.db import models

from account.models import Profile


def user_grouped_file_path(instance, filename):
    return f"posts/{instance.profile.user.username}/\
        {round(get_time_millis())}.{filename.split('.')[-1]}"


class Post(models.Model):
    profile = models.ForeignKey(
        Profile, related_name="posts", on_delete=models.CASCADE)
    caption = models.CharField(blank=True, max_length=256)
    image = models.ImageField(upload_to=user_grouped_file_path)
    created = models.DateTimeField(auto_now_add=True,
                                   db_index=True)
    users_like = models.ManyToManyField(Profile, related_name='images_liked',
                                        blank=True)
    users_save = models.ManyToManyField(Profile, related_name='images_saved',
                                        blank=True)

    @property
    def last_comment(self):
        return self.comments.first()

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return self.caption


class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments',
                             on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, related_name='comments_posted',
                                on_delete=models.CASCADE)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return f'Comment by {self.profile} on {self.post}'
