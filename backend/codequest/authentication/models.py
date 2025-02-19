from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True, null=False)
    points = models.IntegerField(default=0, null=False)
    solved_challenges = models.ManyToManyField('challenges.Challenge', blank=True)

    class Meta:
        db_table = 'auth_user'

    def __str__(self):
        return self.username
