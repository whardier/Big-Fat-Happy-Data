.. _schema:

.. include:: refs.rst

Reference Schema
================

Using the reference specification from the previous topic lets go ahead and 
define a very simple schema in MySQL using Django that doesn't rely on multiple 
accounts per collection or multiple collections per criteria.

One of the goals for what we will call 'Schema1' is to be able able to pull up all major model 
types by the primary key, of course, as well as order some of them based on an integer field 
that helps define the order.

Simple Normalized Row Schema (MySQL)
------------------------------------

Before we add the reference specification into Django we have the following base 
tables:

.. highlight:: mysql

.. code-block:: mysql
   :linenos:

   mysql> show tables;
   +----------------------------+
   | Tables_in_schema1          |
   +----------------------------+
   | auth_group                 |
   | auth_group_permissions     |
   | auth_message               |
   | auth_permission            |
   | auth_user                  |
   | auth_user_groups           |
   | auth_user_user_permissions |
   | django_content_type        |
   | django_session             |
   | django_site                |
   +----------------------------+
   10 rows in set (0.00 sec)

A lot of this information is used as references when joining tables together.  
Much of it could stay in the database clients memory if the data that depended 
on it found a way to reference it less.  It seems, however and probably 
rightfully so, that by offloading reference data to a fast SQL server and using 
it effectively through joins is a great idea that helps global changes happen 
quickly and allows for extra filtering before rows are returned.

Now to add the very simple specification into Django and create a database schema.  The first 
block is the Django model information and the second is simply a list of the table names 
followed by a block defining the schema.

**The ORM code**

.. code-block:: python
   :linenos:

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
   
**The tables**

.. code-block:: mysql
   :linenos:

   mysql> show tables where Tables_in_schema1 like 'schema1%';
   +-------------------------------+
   | Tables_in_schema1             |
   +-------------------------------+
   | schema1_account               |
   | schema1_accountuserprofile    |
   | schema1_collection            |
   | schema1_collectionuserprofile |
   | schema1_criteria              |
   | schema1_userprofile           |
   +-------------------------------+
   6 rows in set (0.00 sec)

**The schema**

.. code-block:: mysql
   :linenos:

   CREATE TABLE `schema1_account` (
       `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
       `name` varchar(30) NOT NULL
   )
   ;
   CREATE TABLE `schema1_collection` (
       `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
       `name` varchar(30) NOT NULL,
       `account_id` integer NOT NULL,
       `order` integer NOT NULL
   )
   ;
   ALTER TABLE `schema1_collection` ADD CONSTRAINT `account_id_refs_id_ab621b21` FOREIGN KEY (`account_id`) REFERENCES `schema1_account` (`id`);
   CREATE TABLE `schema1_criteria` (
       `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
       `name` varchar(30) NOT NULL,
       `account_id` integer NOT NULL,
       `collection_id` integer NOT NULL,
       `order` integer NOT NULL,
       `stuff` varchar(30) NOT NULL
   )
   ;
   ALTER TABLE `schema1_criteria` ADD CONSTRAINT `account_id_refs_id_e50b6b8e` FOREIGN KEY (`account_id`) REFERENCES `schema1_account` (`id`);
   ALTER TABLE `schema1_criteria` ADD CONSTRAINT `collection_id_refs_id_7ca4af94` FOREIGN KEY (`collection_id`) REFERENCES `schema1_collection` (`id`);
   CREATE TABLE `schema1_userprofile` (
       `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
       `user_id` integer NOT NULL,
       `stuff` varchar(30) NOT NULL
   )
   ;
   ALTER TABLE `schema1_userprofile` ADD CONSTRAINT `user_id_refs_id_65460c04` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
   CREATE TABLE `schema1_accountuserprofile` (
       `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
       `user_id` integer NOT NULL,
       `account_id` integer NOT NULL,
       `morestuff` varchar(30) NOT NULL
   )
   ;
   ALTER TABLE `schema1_accountuserprofile` ADD CONSTRAINT `user_id_refs_id_914095d0` FOREIGN KEY (`user_id`) REFERENCES `schema1_account` (`id`);
   ALTER TABLE `schema1_accountuserprofile` ADD CONSTRAINT `account_id_refs_id_914095d0` FOREIGN KEY (`account_id`) REFERENCES `schema1_account` (`id`);
   CREATE TABLE `schema1_collectionuserprofile` (
       `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
       `user_id` integer NOT NULL,
       `account_id` integer NOT NULL,
       `collection_id` integer NOT NULL,
       `morestuff` varchar(30) NOT NULL
   )
   ;
   ALTER TABLE `schema1_collectionuserprofile` ADD CONSTRAINT `user_id_refs_id_8f7b0662` FOREIGN KEY (`user_id`) REFERENCES `schema1_account` (`id`);
   ALTER TABLE `schema1_collectionuserprofile` ADD CONSTRAINT `account_id_refs_id_8f7b0662` FOREIGN KEY (`account_id`) REFERENCES `schema1_account` (`id`);
   ALTER TABLE `schema1_collectionuserprofile` ADD CONSTRAINT `collection_id_refs_id_ea4e2924` FOREIGN KEY (`collection_id`) REFERENCES `schema1_collection` (`id`);
   CREATE INDEX `schema1_collection_6f2fe10e` ON `schema1_collection` (`account_id`);
   CREATE INDEX `schema1_criteria_6f2fe10e` ON `schema1_criteria` (`account_id`);
   CREATE INDEX `schema1_criteria_26d6361e` ON `schema1_criteria` (`collection_id`);
   CREATE INDEX `schema1_userprofile_fbfc09f1` ON `schema1_userprofile` (`user_id`);
   CREATE INDEX `schema1_accountuserprofile_fbfc09f1` ON `schema1_accountuserprofile` (`user_id`);
   CREATE INDEX `schema1_accountuserprofile_6f2fe10e` ON `schema1_accountuserprofile` (`account_id`);
   CREATE INDEX `schema1_collectionuserprofile_fbfc09f1` ON `schema1_collectionuserprofile` (`user_id`);
   CREATE INDEX `schema1_collectionuserprofile_6f2fe10e` ON `schema1_collectionuserprofile` (`account_id`);
   CREATE INDEX `schema1_collectionuserprofile_26d6361e` ON `schema1_collectionuserprofile` (`collection_id`);

That's pretty clean and simple.  It's usable for smaller databases that don't offer the 
flexability.  We have indexes in place that will help us out quite a bit as well.  Lets take a 
look at some queries however.  Say lets find all of the collection user profiles that exist for 
account 1 and relate to user 1.  The first block of code will be done through the python shell 
and the second is as seen from the MySQL general log.

.. code-block:: python
   :linenos:

   >>> models.CollectionUserProfile.objects.filter(account=1, user=1)

.. code-block:: mysql
   :linenos:

   SELECT `schema1_collectionuserprofile`.`id`,
         `schema1_collectionuserprofile`.`user_id`, 
         `schema1_collectionuserprofile`.`account_id`,
         `schema1_collectionuserprofile`.`collection_id`, 
         `schema1_collectionuserprofile`.`morestuff`
      FROM
         `schema1_collectionuserprofile`
      WHERE 
         (
            `schema1_collectionuserprofile`.`account_id` = 1
         AND
            `schema1_collectionuserprofile`.`user_id` = 1
         )

Everything appears in order.

.. code-block:: python
   :linenos:

   >>> models.CollectionUserProfile.objects.select_related().filter(account=1, user=1).order_by('collection_order')

.. code-block:: mysql
   :linenos:

   SELECT `schema1_collectionuserprofile`.`id`,
         `schema1_collectionuserprofile`.`user_id`,
         `schema1_collectionuserprofile`.`account_id`, 
         `schema1_collectionuserprofile`.`collection_id`, 
         `schema1_collectionuserprofile`.`morestuff`,
         T3.`id`,
         T3.`name`, 
         `schema1_account`.`id`,
         `schema1_account`.`name`,
         `schema1_collection`.`id`,
         `schema1_collection`.`name`,
         `schema1_collection`.`account_id`,
         `schema1_collection`.`order`, 
         T5.`id`,
         T5.`name`
      FROM
         `schema1_collectionuserprofile`
      INNER JOIN `schema1_account` ON (
         `schema1_collectionuserprofile`.`account_id` = `schema1_account`.`id`
      )
      INNER JOIN `schema1_account` T3 ON (
         `schema1_collectionuserprofile`.`user_id` = T3.`id`
      )
      INNER JOIN `schema1_collection` ON (
         `schema1_collectionuserprofile`.`collection_id` = `schema1_collection`.`id`
      )
      INNER JOIN `schema1_account` T5 ON (
         `schema1_collection`.`account_id` = T5.`id`
      )
      WHERE (
         `schema1_collectionuserprofile`.`account_id` = 1
      AND 
         `schema1_collectionuserprofile`.`user_id` = 1
      )
      ORDER BY `schema1_collection`.`order` ASC

Django is currently doing it's best to make sure MySQL is using indexes wherever possible per 
join.  MySQL is now collecting the information like a champ, sifting it, and then streaming it 
back to the client application where Django can process the output.

Easy peasy lemon squeezy.

The Proposition: Simple Document Based Schema (MongoDB)
-------------------------------------------------------

Since MongoDB is schemaless the following includes some sample data from a well known company we 
all know and love.

.. literalinclude:: ../reference/schema1/mongodb/create.js
   :language: javascript
   :linenos:

So we can see that the account has several collections, one appears to be a holder collection 
for two others.  Their 'order' as displayed is pregenerated as a list of lists called 'paths' in 
the base of the account document and won't require any crazy iteration or recursion to generate 
later on.  If you want to move the archived propulsors above the active propulsors you know who 
the parent is immediately and you can quickly reorganize the list.

Each collection also has a 'path' field which is used for display purposes.  When reviewing just 
one collection it may be important to show the full path to that collection in the summary 
information and traversing the main 'paths' list could end up taking up more CPU however 
unlikely.

We also have a multi-key (and multi-multi-key) index where the account id is first and the 
collection id is second.  This is an important difference from how most RDBMS solutions work.  A 
new index will be created for each collection per index since document based database solutions 
support arrays and hashes.  MongoDB specifically allows secondary indexes of array information 
which is useful for storing search terms, finding sub-documents like our collections, and all 
sorts of crazy things.

The users also have a secondary index that stores their username, then their password, then 
their id in the database.  Initially this helps when trying to find a user by username.  If we 
simply defined a single key index on the 'username' field we would have two options on how data 
is returned to us.

First we could return the entire document which has to be parsed into a dictionary style element 
by the interpreter running the app.  If your users have half meg profiles (say there was an icon 
or 20 stored in it) then you would be parsing that every time that username was looked up.  
Since users are also seen as the keys to the city those username requests could happen very 
often if a password attack is being done against your app.  That database and parsing time can add up quickly.

The second option is we could return just the index information by telling MongoDB that instead 
of returning the document, just return the 'username' and we will test to see if it exists based 
on if anything returns.  This is useful for a first-phase of identifying a valid username before 
attempting to use any CPU intensive cryptography or pull the entire user document.

However, the index that is specified for the users above includes a password and the object ID 
at the very end.  Our index is a bit larger now but it contains some very useful information.  
First off you can still specify just a username in the query and still use this multi-key index 
to speed up lookups without needing an index just for one field.  Now if we tell MongoDB to pull 
just the index information we also get the password hash and the ID of the document which we can 
use directly in future pulls of the user information from a much smaller index.

Just because you are pulling the password information doesn't mean you need to use it, same with 
the ID information.  Any fields after the key you actually used to search with is ephemeral and 
can be ignored if you don't need to use it.  The cost of pulling that information is typically 
much smaller than the cost of pulling the full document later after you test for it.  In a web 
application where password attacks happen quite a bit it is a good idea to filter out those 
usernames that don't exist using a very fast index then if they do exist check the password 
using another very fast database and finally pull the entire user profile into your users 
session by throwing it into a memory cache like Redis or Memcached.  You may also find that 
pulling the document into a memory cache and storign keys for the username and password as well 
as possibly the document itself is a very fast solution that doesn't require a multi-key index.

The password above was stored using BCrypt.  BCrypt is a one way hash that is *HIGHLY* 
recommended as very safe alternative to other hashes and of course storing passwords in plain 
text.

