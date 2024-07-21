
# Screenshots
## /signup Route success
hitting the api /signup and giving all the details as follows results in the success and the following is the respose we get at the frontend

![user signup success](https://github.com/user-attachments/assets/884c75b4-5669-4cfd-9e88-781a37779fe2)

## /signup route fails
- If we put age<20 then: 

![age validation](https://github.com/user-attachments/assets/051e8ed5-fc3d-47b9-9a21-afc456bb1f5e)

- if we put salary less than 25000 then: 

![salary criteria](https://github.com/user-attachments/assets/7f510581-f851-4bc8-bdf3-8654f91e415c)

- if we try to signup with the mail id that is already used 

![email already exists](https://github.com/user-attachments/assets/4f7f69e0-4915-4f76-91d9-14dda0ed4f6b)

## /login route
We make post request to the backend giving details like email and password 
- if the email and password is correct api returns with json object containing message that says login successful and a token is generated using jwt that is then stored in the local storage of the web for further validation

![login success](https://github.com/user-attachments/assets/bed62c70-02d3-4003-b355-3bddbf5d11ab)

- If we try to login with user that is not present in the database we get error message saying user not found

![Screenshot 2024-07-21 101807](https://github.com/user-attachments/assets/abf09367-259a-4820-b2b5-f6c775a235be)

- if user enters wrong password 

![Screenshot 2024-07-21 102736](https://github.com/user-attachments/assets/dc667bf0-cd22-4948-a09d-397d51f400a2)

## /user 
/user route is used to fetch the user Details we use jwt token from the localstorage to verify whether the user is valid or not

![fetching user details using jwt token](https://github.com/user-attachments/assets/06537e3f-b923-406e-b570-d3d00de57292)

## /borrow 
This route is defined to take in borrow Amount from the user and in response it gives the monthly repayment amount , new purchasing power amount

![borrowAmount](https://github.com/user-attachments/assets/b9149c52-b284-49af-b34a-824eed980a36)

- if the borrowed amount is more than user's purchasing power then the request is denied

![Screenshot 2024-07-21 102425](https://github.com/user-attachments/assets/17e2f262-cc31-41a1-afd7-c1918379ecd0)
