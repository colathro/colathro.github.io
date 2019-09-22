---
layout: post
title:  "FinOps TempDB Helper"
date:   2019-09-22 12:28:42 -0500
categories: FinOps
---

{% highlight sql %}
    -- Use the below to fetch the columns for your desired table.
    DECLARE @TableName nvarchar(100)
    -- Update here with target TempDB TableName
    SET @TableName = 't6033_D1C24D54AF2746E98284E93A9C8F1A7F'
                
    SELECT c.name FROM sys.all_columns AS c 
    left join sys.tables AS t ON c.object_id = t.object_id
    WHERE t.name = @TableName  
{% endhighlight %}

{% raw %}
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<h2>Input:</h2>
<div id="input">
<textarea id="input_box" rows="10" cols="60"></textarea>
<br>
<input id="submit" type="button" value="Submit">
</div>
<h2>Output:</h2>
<div id="output">
<textarea id="output_box" rows="10" cols="60" readonly></textarea>
</div>
<script src="/assets/metadata_parser.js"></script>
{% endraw %}