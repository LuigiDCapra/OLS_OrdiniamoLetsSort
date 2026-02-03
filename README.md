# Ordiniamo/Let's Sort (OLS) - Presentation

__Ordiniamo/Let's Sort (OLS)__ is an open-source application, written in JavaScript, for exploring and manipulating data collections in JSON format.
The __Ordiniamo/Let's Sort (OLS)__ source code is distributed under the GPL v. 3.0 license.
The files that make up the DDJ library, on which the OLS program is based, are distributed under the LGPL v. 3.0 license.

### The OLS program is not a finished, functional program ready for end users; it is a work in progress, constantly evolving, and may contain errors and occasionally exhibit malfunctions.

The __Ordiniamo/Let's Sort (OLS)__ program is a technical tool for exploring and manipulating data collections in JSON or alternative formats.
OLS supports a wide range of sources, allowing you to load data collections from traditional files saved on disk, download tables hosted on a web server, and copy and paste. It can also be integrated with other JavaScript programs for debugging purposes, allowing you to view the values ??contained in complex data structures that might be difficult to study with standard debuggers.

The __Ordiniamo/Let's Sort (OLS)__ program was created as part of an educational program designed to allow some students, excluded from the PCTO program, to gain simulated work experience by performing work activities similar to those they might perform in a company.
The __Ordiniamo/Let's Sort (OLS)__ program is essentially a technology demonstrator that emphasizes the creative possibilities of the HTML5 + CSS3 + JS trio, aiming to capture students' attention and inspire them to develop a passion for JavaScript programming. Given these premises, educational objectives take precedence over all other requirements, including those concerning security.

### It is therefore not recommended for use in any context where the use of OLS could compromise the security of users' computer systems.
In this regard, it should be noted that the __Ordiniamo/Let's Sort (OLS)__ program is the prototype of a developer tool and is intended for use by competent and responsible users who know what they are doing and take responsibility for it. It is not a tool for end users.
The __Ordiniamo/Let's Sort (OLS)__ program is not a transactional database and does not claim to be one, but rather a data warehouse defined as "a collection or aggregation of structured data, from internal operational sources (DBMS) and external to the company information system, useful for analysis and reporting."

The OLS software can be used in various ways:

- to explore and/or manipulate data structures already present in the browser's memory or loaded from an external file,
- to monitor the evolution of the processing results of a program under test over time,
- to view the properties of a collection, verifying its compliance with specifications and then, if necessary, "cleaning" it through data cleaning,
- to change the data representation of a collection by converting its record layout and field format,
- or, more simply, the DDJ library can be integrated into another program to use its data exploration and visualization functions.

It goes without saying that operations involving the modification and reorganization of data in a collection may compromise the integrity of the collection.

### Safeguarding the integrity of data contained in collections is the responsibility of the operator.

However, as a precaution, data collections are opened by default in Read-Only mode, so that they can be explored and viewed, but not modified. If the operator decides to switch the operating mode to Read/Write mode, they assume responsibility for any damage that may be caused to the data structures.

## Features

- Support for various data representation schemes in JSON format (arrays, objects, record arrays, object arrays, record-associative arrays, and object-associative arrays).
- Support for arbitrary record layouts.
- Ability to explore data collections by representing them as tables or cards.
- Ability to transpose rows with columns.
- Ability to automatically convert data collections from one JSON schema to another and save them.
- Ability to extract and reorganize data subsets and save them.
- Support for multimedia data collections (images, audio, video, mathematical formulas, GPS coordinates).
- Support for hypertext data. In the record fields you can insert links that refer to records in other OLS tables or to documents accessible via the Web.
- Support for HTML-5 date types (date, datetime, datetime-local).
- Support for the JavaScript "bigdata" type.
- Support for JSON, CSV, FLR, DBF, TOON formats.
- Multiple search filters corresponding to multiple data selection methods (data queries).
- Ability to navigate data collections by exploring them interactively.
- Support for tables with sparse data, i.e., predominantly empty columns.
- Data-driven. Ability to associate a user view with a collection's record layout, customizing its representation and user interface.
- Support for active data collections. Management of data collections that change during execution (at run time) by receiving updates from different sources via HTTP.
- Automatic recognition of the data representation scheme.
- Automatic data validation and coloring functions with inconsistencies flagged.
- Contextual help.
- Open-source code released under the GNU GPL v. 3.0 and GNU LGPL v. 3.0 licenses.

## Features of the Experimental Version (NOT yet released)

- Natural language interface.
- FileManager (requires XAMPP and PHP code installation).
- Calendar view.
- GPS coordinate support for OpenStreetMap connection.
- Interaction with Internet of Things (IoT) devices.
- Theremino.
- ESP8266.
- Personal Virtual Assistant
- Use as a knowledge management system (KBS).