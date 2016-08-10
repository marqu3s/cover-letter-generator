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


###One time configuration

Create a spreadsheet like the one above in your Google Drive.
The first row contains the column names. They are used as the tokens' names. Avoid using spaces in it.

A token is in the format **{{ + TheColumnName + }}**

From the second row forward, add the information you want to appear in the cover letters.
Example:

| Date             | CompanyName        | CompanyAddress                                    |
| ---------------- | ------------------ | ------------------------------------------------- |
| August 8, 2016   | Axiom Zen          | 788 Beatty St b1, Vancouver, BC V6B 2M1, Canada   |

Now create a document to be your cover letter template.
Inside it place tokens where you want to insert the values from the spreadsheet.
The available tokens from the example spreadsheet are:
* {{Date}}
* {{RecruiterName}}
* {{RecruiterJobTitle}}
* {{CompanyName}}
* {{CompanyAddress}}
* {{Salutation}}

Now you need to get the IDs of your spreadsheet, template and for the folder where you want the script to save the cover letter. We can get those from the browser URL.

For the spreadsheet example, its URL is:
https://docs.google.com/spreadsheets/d/1acOPe105zS4mJxS8E1fYlbzp0SwF0RbUfkR5H5CWN1U/pubhtml

So its ID is **1acOPe105zS4mJxS8E1fYlbzp0SwF0RbUfkR5H5CWN1U**

For the template example, its URL is:
https://docs.google.com/document/d/14X68W6rIHHnwC2GjTqU33QX-_y5IB40hk7xHsavRcs8/pub

So its ID is **14X68W6rIHHnwC2GjTqU33QX-_y5IB40hk7xHsavRcs8**

Now open the docs you created and take note of that IDs.

Go to your Google Drive and enter or create a folder where you want the cover letter to be created.
Look at the URL while inside that folder, identify and take note of its ID.

Now go to the Tools menu => Script editor.
On the window that opens, paste the content from the file script.gs.
Pay attention to the lines 10, 13, 16 and 19. We need to adjust them with the IDs you got on the steps above.

Line 10:
```
var COMPANY_ROW = 2;
```
You will have to adjust this line every time you want to generate a cover letter. It indicates with line of the spreadsheet should be read to get the information needed. Remeber, 2 is the first row of data, 3 is the second row of data, and so on.

Line 13:
```
var SOURCE_TEMPLATE = "";
```
You will have to adjust this line only once. Insert the ID of the cover letter template.
Example: var SOURCE_TEMPLATE = "14X68W6rIHHnwC2GjTqU33QX-_y5IB40hk7xHsavRcs8";

Line 16:
```
var SPREADSHEET = "";
```
You will have to adjust this line only once. Insert the ID of the spreadsheet file.
Example: var SPREADSHEET = "1acOPe105zS4mJxS8E1fYlbzp0SwF0RbUfkR5H5CWN1U";

Line 19:
```
var TARGET_FOLDER = "";
```
You will have to adjust this line only once. Insert the ID of the folder to save the cover letter to.
Example: var TARGET_FOLDER = "0B4xDN2g6Yk_9NzJRVmZsOExzTXc";

Save the script.

### Usage

Once you finish the configuration above, you're ready to rock!

To generate a new cover letter:
1. Enter the information about the company the job position, recruiter, etc in the spreadsheet on a new line.
2. Open the Cover Letter template document.
3. Go to Tools menu => Script Editor.
4. Adjust line 10 of the script, inserting the correct row number to get data from.
5. Save the script.
6. Hit the run button and wait a few seconds.
7. Open the folder you expect the cover letter and look for your new cover letter. The file name will be "Company Name Cover Letter".


That's it!
Enjoy!
