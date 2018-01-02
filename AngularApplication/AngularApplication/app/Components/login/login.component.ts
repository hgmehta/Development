import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { IUser } from '../../Model/user';

import { DBOperation } from '../../Shared/enum';
import { Global } from '../../Shared/global';

import { UserService } from '../../Service/user.service';

@Component({
    selector: 'login-app',
    templateUrl: 'app/Components/login/login.component.html'
})
export class LoginComponent {

    loginForm: FormGroup;
    constructor(private fb: FormBuilder, private _userService: UserService) { }
    dbops: DBOperation;
    msg: string;
    ngOnInit(): void {

        this.loginForm = this.fb.group({
            EmailId: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            Password: [null, [Validators.required]]
        });
    }

    loginUser(formData: any): void {
        this.dbops = DBOperation.create;
        this.SetControlsState(true);

        this._userService.post(Global.BASE_LOGIN_ENDPOINT, formData._value).subscribe(
            data => {
                if (data == 1) //Success
                {
                    this.msg = "You have successfully loged in!";
                }
                else {
                    this.msg = "Email id or password is wrong";
                }

            },
            error => {
                this.msg = error;
            }
        );
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.loginForm.enable() : this.loginForm.disable();
    }
}