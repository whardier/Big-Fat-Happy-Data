.. _faq:

.. include:: refs.rst

Frequently Asked Questions
==========================

Here's a list of frequently asked questions on top of a list of frequently 
thought but not actually asked questions.

Why did you use...
------------------

... `MySQL`_ for comparison?
   Due to it's popularity and my with the storage formats.  I use both MySQL and 
   PostreSQL quite often.  Both perform similarly for most of my cases.  I 
   wanted to use the database with higher administrative familiarity for this 
   documentation.

... `Django`_ for comparison?
   The object relation manager (ORM), similar to others out there, makes very 
   interesting use of joins for "ManyToMany" relationships.  SQLAlchemy is 
   another outstanding ORM.

... binary differences for testing storage?
   It seemed like the only method to accurately provide information about how 
   data is stored, what changed, and how consecutive the changes from block to 
   block.
