# Cover Letter Generator

## A Google Docs script to automate cover letter generation.

###Introducion

If you are sending a lot of cover letters lately, than this script if for you.
You are probably using the same cover letter template and adjusting it to the job position and company you're applying to.
You change the Recruiter's name, Company's name and address, job title, and so on.
What happens if you forget to change the company name in some paragraph? Or if you don't change the recruiter's name? You will send the cover letter to a company with the name of another company or recruiter! What a gaffe!

While googling a solution I found this script, wich I adapted to my needs and decided to share it with instructions on how to use it. The script credits are from Mikko Ohtamaa - http://opensourcehacker.com

###How it works

You will need to create a spreadsheet to keep record for all the companies and job applications you want to generate a cover letter for. In this spreadsheet you will fill the company name and address, the recruiter name and job title, salutation, and whatever you want to create.

You will also need a cover letter template with special tokens in it. The script will replace the tokens by their corresponding values from the spreadsheet.

#### Job Applications Spreadsheet example

https://docs.google.com/spreadsheets/d/1acOPe105zS4mJxS8E1fYlbzp0SwF0RbUfkR5H5CWN1U/pubhtml

#### Cover Letter Template example

https://docs.google.com/document/d/14X68W6rIHHnwC2GjTqU33QX-_y5IB40hk7xHsavRcs8/pub


###Usage

Create a spreadsheet like the one above in your Google Drive.
The first row contains the column names and are also the tokens' names. Avoid using spaces in it.
From the second row forward, add the information you want to appear in the cover letter.
Example:

{|
|-
! Date
! CompanyName
! CompanyAddress
|-
| August 8, 2016
| Axiom Zen
| 788 Beatty St b1, Vancouver, BC V6B 2M1, Canada
|}

Now create a document to be your cover letter template.
Inside it place tokens where you want to insert the values from the spreadsheet, like this:
{{Date}}
{{CompanyName}}
{{CompanyAddress}}

Now go to the Tools menu => Script editor.
On the window that opens, paste the content from the file script.gs and save it.



On the select dropdown list, choose fillData and click on the run button (the one to left to the bug button).
It will ask for some permissions the manage the files on your Google Drive. You need to allow it because it creates a new file for you, that is the cover letter with the tokens replaced.
