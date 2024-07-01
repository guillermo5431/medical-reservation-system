# Medical-Clinic-Database

## About the project
This website was created as a group project for COSC3380, and is meant to be used by a small medical clinic further help them execute necessary business operations. There are three different user types that can use this website: Patients, Doctors, and Administrators. Each user type has the ability to login in, but only Patients are allowed to use the sign up. Once logged in, each user is automatically redirected to the main page for their user type. Each user type is presented with different relevent information and features to help them execute their intended tasks. Also, all users have access to the navbar at the top of the page, which easily allows them to navigate to the main page, authentication pages, and main user type page. The main user type page is accessible through the "Manage Appointments" button.

## File structure

### Patient Pages
The key information displayed is: personal information, appointments, then prescriptions. Patients are given the option to cancel existing appointments, and can also request new appointments with the "Make an Appointment" button. This button redirects users to the requestAppointment pages. This is a series of pages that prompts the logged in user with questions needed to schedule their appointment. The information from some pages determines the display of others. For example, depending on the doctor type chosen, different doctors will be available on the next page. Once a patient reaches the last page and presses the "Submit" button, their appointment request will either pass or fail. If passed, they will see a message stating that their appointment was requested. If failed, they will a message specifying why the appointment request page. In either case, the logged in user will be presented with a link to take them back to their main user page.

The appointment request can fail for one of two reasons:

1. The Doctor is unavailable on that day at that time because they have a conflicting appointment.
2. A Patient which has not been authorized to schedule an appointment with a specialist attempted to schedule an appointment with a specialist.

Each of these are implemented with the use of ***triggers*** in our SQL database running in google cloud.

### Doctor Pages
The key information displayed is: personal information, assigned patients, appointments, and their schedule. The only feature given to the doctors is the ability to cancel appointments.

### Admin Pages
The key information displayed is: personal information, appointments, then the other administrators and doctors in the clinic. Admins have a second navbar on the left side which can be used to navigate between the admin pages. First there are four data entry pages, which allows the admin to add, edit, and delete informtion for Doctors, Admins, Patients, and Offices respectively.

Next there is the Report Form page. This page contains all of the data reports for the project. The admin can look at reports for prescriptions, specialists, appointments, and employees.

- **Prescription Report**: Displays all of the prescriptions given out by the clinic. Uses a left join on patients with the weak entity prescription. When looking at the prescription report, admins can narrow down the serach using a before and after date.
- **Specialist Report**: Displays the number of each type of specialist in each office. First does a left join on doctors with offices, then groups by specialist.
- **Appointments Report**: Displays all of the scheduled appointments in the clinic. Uses a left join on Appointments with Patients, Doctors, and Offices to display patient information, doctor information, and office information for each appointment. When looking at the appointments report, admins can narrow down the search using a before and after date.
- **Employees Report**: Displays the contact information for each employee in the clinic. Uses a union of both Doctor and Admin, each which were joined with office to get further information for each employee.


## Installing/running the project
To view the hosted project: go here: www.medical-service.infinityfreeapp.com

To run the project locally (with XAMPP): first download all the files into the C:\xampp\htdocs folder. Then open the XAMPP controll panel, start the Apache server, and open 'http://localhost/cosc3380/' in a web browser.
