import re

email_regex = re.compile(r"^[\w!#$%&'*+/=?^_`{}~\.-]+@[\w\-]+(\.[\w\-]+)+$")
def is_valid_email(email):
    match = email_regex.match(email)
    return match is not None

zip_code_regex = re.compile(r"^\w{5}$")
def is_valid_zip_code(zip_code):
    match = zip_code_regex.match(zip_code)
    return match is not None

phone_regex = re.compile(r"^\w{10}$")
def is_valid_US_phone(phone):
    match = phone_regex.match(phone)
    return match is not None