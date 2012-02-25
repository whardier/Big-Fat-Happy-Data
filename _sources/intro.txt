.. Big Fat Happy Data documentation intro file. Who what when where and why.

.. include:: refs.rst
   
Introduction
============

This documentation project is the result of work by `Shane R. Spencer`_ and is 
licensed under the `Creative Commons Attribution-ShareAlike 3.0 Unported 
License`_.

Many of the techniques used in this documentation are not solely associated with 
`Shane R. Spencer`_ and for the most part are the intellectual property of the 
nameless horde known as humanity.  If you feel as though you might like some 
attribution please make yourself known.

Licensing
---------

As previously mentioned.. this work is licensed under the `Creative Commons 
Attribution-ShareAlike 3.0 Unported License`_.

This license lets others remix, tweak, and build upon this project even for 
commercial purposes, as long as they credit the author and license their new 
creations under the identical terms. This license is often compared to 
“copyleft” free and open source software licenses. All new works based on yours 
will carry the same license, so any derivatives will also allow commercial use. 
This is the license used by Wikipedia, and is recommended for materials that 
would benefit from incorporating content from Wikipedia and similarly licensed 
projects.

Background
----------

Key-Value stores (KV) have existed for a good long time and have subsequently 
served humanity and its more technically inclined people very well.

The history and of KV based storage methods is well beyond the scope of this 
document.  Briefly however, the idea of quick and fast access to stored values 
relating to a named key is fundamental to how modern databases work.  More 
recently we've all seen an increase in fun new storage techniques associated 
with the NoSQL genre which, simply put, breaks away from the relational database 
structure typically associated with database management systems that directly 
support the SQL standards for describing a query and processing results.

Relational database solutions typically do not concentrate on large amounts of 
data per "row", hence the name of this document.  Hopefully some benchmarks, 
storage comparisons, and network analysis will help developers understand the 
crazy method I've been calling *"Big Fat Happy Data"*!

The initial use of these methods is being utilized in the project `Informadiko`_ 
which is currently based around `TornadoWeb`_, `MongoDB`_ and `Xapian`_.  
`Mongrel2`_ and `Brubeck`_ are also being evaluated for the project.

Reference Technology
--------------------

This document focuses on using `MongoDB`_ and `Redis`_ as KV stores.  MongoDB 
has a very rich query parser that helps the developer keep things simple while 
still using a KV based solution and Redis does a great job at keeping data at 
the ready, handling atomic operations, and allowing blazing fast access to key 
data.  This is of course very general since both projects have a huge list of 
pros and cons that the Internet is more than happy to point out.  However the 
developers of both solutions are techodweebs with a good nose for what to avoid 
when developing reliable database solutions.

.. glossary::

   `MongoDB`_
      Created by `10gen`_ as a feature rich KV store that can be seen as a 
      document store.  Documents are stored in collections that can be mapped to
      database servers in a myriad of ways.  The most common and simple setup 
      involves a single database server hosting one or more collections 
      simultaneously.

   `Redis`_
      Created by `Salvatore Sanfilippo`_ and is currently sponsored by 
      `VMWare`_.  Redis is an known as an in-memory KV store however data is 
      backed onto the disk for extra persistence.

Other technologies used in this document to help comparatively describe the data 
layout as well as offer some fun benchmarks include the popular relational 
database management system (RDBMS) `MySQL`_ as well as the object relationship 
manager (ORM) used by `Django`_.  These two products may appear to get the shaft 
a bit.. however the should be considered very valuable projects.  Both have 
inspired projects as well as been part of the foundation for a very high 
percentage of websites, custom applications, and large enterprise scale 
solutions.  Maybe not Django so much on the last two since it's a web framework, 
however the ORM itself has powered many ideas completely unrelated to web 
interfaces.

.. glossary::

   `MySQL`_
      Wildly popular as an Open Source database solution.  Allows for SQL query 
      syntax and multiple procedural languages.  Very mature.

   `Django`_
      A very useful tool that lives up to its slogan 'The Web framework for 
      perfectionists with deadlines'.  The object relationship manager used by 
      Django is inspired by and in turn inspires many other projects with a 
      similar goal.  It is well written, lazy (that's a good thing), and makes 
      good use of both RDBMS and NoSQL database backends.  To use Django with 
      MongoDB it is recommended to use 'Django MongoDB Engine'_ and the 
      associated prerequisites to allow the Django ORM to operate cleanly on top 
      of many NoSQL like backends.

Reference Specification
-----------------------

The initial reference specification used for the data is for an arbitrary 
information storage and retrieval system you would use for collecting forms data 
or storing searchable information for later queries.  The project this was 
developed around originally started out as Django+MySQL then moved to 
Django+MongoDB and is currently using Tornado+MongoDB and the techniques 
described in this document.

The specification (not schema) is defined as follows and referenced in the next 
topic:

**Account Database**
   Stores information about account

**Collection Database**
   Stores information about a collection of data

   Has **account** references
      Typically only associated with one account
      If associated with +1 collection then a through table is used

**Criteria Database**
   Stores information about fields available to a specific collection

   Has a single **account** reference
      Even though this is for a specific collection it may be smart indexing to 
      reference the account as the first key to help support spreading the 
      database and keeping account information isolated to a specific area

   Has **collection** references
      Typically only associated with one collection
      If associated with +1 collection then a through table is used

**User Database**
   Stores global user information (username, password, email, hat color)

   Has **account** references
      Associated with multiple accounts

**User Account Profile**
   Since we associate with multiple accounts we need information about timezone 
preferences when rendering this users content.

   Has a single **account** reference   

   Has a single **user** reference   
   
**User Collection Profile**
   Since we associate with multiple accounts we also would like to provide per 
collection preferences for things like time zones, if this collection is 
bookmarked, and other flags a user can have against a specific collection

   Has a single **account** reference

   Has a single **collection** reference

   Has a single **user** reference      

O.K. good.  Now we have a quick and dirty starting point.
