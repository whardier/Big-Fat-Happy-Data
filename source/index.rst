.. Big Fat Happy Data documentation master file, created by
   sphinx-quickstart on Thu Feb 23 17:17:03 2012.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Big Fat Happy Data
==================

.. glossary::

   Big
      *adjective*

      - large, as in size, height, width, or amount: a big house; a big 
        quantity.

      - of major concern, importance, gravity, or the like: a big problem.

   Fat
      *adjective*
     
      - plump; well-fed: a good, fat chicken.

      - profitable, as an office: a fat job on the city commission.

      - affording good opportunities, especially for gain: a fat business 
        contract.

   Happy
      *adjective*

      - obsessed by or quick to use the item indicated (usually used in 
        combination): a trigger-happy gangster. Everybody is gadget-happy these 
        days.

      - characterized by or indicative of pleasure, contentment, or joy: a happy 
        mood; a happy frame of mind.

      - apt or felicitous, as actions, utterances, or ideas.

   Data
      *noun*

      - a plural of datum.

      - ( used with a plural verb ) individual facts, statistics, or items of 
        information: These data represent the results of our analyses. Data are 
        entered by terminal for immediate processing by the computer.

      - ( used with a singular verb ) a body of facts; information: Additional 
        data is available from the president of the firm.

Overview
--------

This is a testing and documentation project oriented around using large 
documents, typically with document oriented databases, rather than many tables 
with many rows.  This document focuses on the following concepts of storing data 
assets:

- Focusing on decreasing row counts for relative data.

- Reducing new connections to database servers.

- Reducing the overall query count for a
  specific context (a page of content, a users profile).

- Removing the need for a lot of table relationships.

- Increasing caching performance.

- Focusing on new techniques related to caching.

    - Storing cache information in the app instance (optional but fun!).

    - Using multi-key indexes to store timestamp data.

    - Pulling the index element directly from memory!

**This document will not be for everybody.  I'm totally okie dokie with that.**

Project Repository
------------------

This project has source files 
located at `http://github.com/whardier/Big-Fat-Happy-Data 
<http://github.com/whardier/Big-Fat-Happy-Data>`_ and this content is accessable 
as a web page at `http://whardier.github.com/Big-Fat-Happy-Data 
<http://whardier.github.com/Big-Fat-Happy-Data>`_ if you are reading this 
content in another published format.

Issues
------

Some of you are bound to have issues with this.. however for actual technical 
issues related to this document please open up a ticket at 
`http://github.com/whardier/Big-Fat-Happy-Data/issues 
<http://github.com/whardier/Big-Fat-Happy-Data/issues>`_.

Contributing
------------

I'm more than happy to accept github pull requests!

Contents
========

.. toctree::
   :maxdepth: 3

   intro

Indices and tables
==================

* :ref:`genindex`
* :ref:`search`
