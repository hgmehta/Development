import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from "@angular/router";

import { IUser } from '../../Model/user';

import { DBOperation } from '../../Shared/enum';
import { Global } from '../../Shared/global';

import { UserService } from '../../Service/user.service';

@Component({
    selector: 'register-app',
    templateUrl: 'app/Components/register/register.component.html'
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(private fb: FormBuilder, private _userService: UserService) { }
    _email: string;
    ngOnInit(): void {

        this.registerForm = this.fb.group({
            Firstname: [ null, [Validators.required] ],
            MiddleName: [ null, [Validators.required] ],
            Lastname: [ null, [Validators.required] ],
            Gender: [ null, [Validators.required] ],
            Birthdate: [ null, [Validators.required] ],
            City: [ null, [Validators.required] ],
            Address: [ null, [Validators.required]],
            EmailId: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], this.isEmailUnique.bind(this)],
            Password: [ null, [Validators.required] ],
            confirmpassword: [ null, [Validators.required] ]
        });
    }
    msg: string;
    router: Router;
    dbops: DBOperation;
    isEmailUnique(control: FormControl) {
        this.dbops = DBOperation.create;
        this._userService.post(Global.BASE_EMAIL_CHECK, this._email).subscribe(
            data => {
                if (data == 1) //Success
                {
                    this.msg = "false";
                }
                else {
                    this.msg = "true";
                }

            },
            error => {
                this.msg = error;
            }
        );
        return this.msg;

        //const q = new Promise((resolve, reject) => {
        //    setTimeout(() => {
        //        this._userService.isEmailRegisterd(this._email).subscribe(() => {
        //            resolve(null);
        //        }, () => { resolve({ 'isEmailUnique': true }); });
        //    }, 1000);
        //});
        //console.log(q);
        //return q;
    }

    onSubmit(formData: any) {

        console.log(formData._value);

        this._userService.post(Global.BASE_USER_ENDPOINT, formData._value).subscribe(
            data => {
                if (data == 1) //Success
                {
                    this.msg = "Data successfully added.";

                }
                else {
                    this.msg = "There is some issue in saving records, please contact to system administrator!"
                }
            },
            error => {
                this.msg = error;
            }
        );
    }
}