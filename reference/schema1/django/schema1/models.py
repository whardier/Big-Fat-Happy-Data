from django.db import models
from django.contrib.auth.models import User

class Account(models.Model):
    name = models.CharField(max_length=30)

class Collection(models.Model):
    name = models.CharField(max_length=30)
    account = models.ForeignKey(Account, related_name='collection_to_account')
    order = models.IntegerField(default=0)

class Criteria(models.Model):
    name = models.CharField(max_length=30)
    account = models.ForeignKey(Account, related_name='criteria_to_account')
    collection = models.ForeignKey(Collection, related_name='criteria_to_collection')
    order = models.IntegerField(default=0)
    stuff = models.CharField(max_length=30)    

class UserProfile(models.Model):
    user = models.ForeignKey(User)
    stuff = models.CharField(max_length=30)

class AccountUserProfile(models.Model):
    user = models.ForeignKey(Account)
    account = models.ForeignKey(Account, related_name='user_profile_to_account')
    morestuff = models.CharField(max_length=30)

class CollectionUserProfile(models.Model):
    user = models.ForeignKey(Account)
    account = models.ForeignKey(Account, related_name='collection_user_profile_to_account')
    collection = models.ForeignKey(Collection, related_name='collection_user_profile_to_collection')
    morestuff = models.CharField(max_length=30)    
