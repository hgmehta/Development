import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Observable } from 'rxjs/Rx';
import { IUser } from '../../Model/user';
import { DBOperation } from '../../Shared/enum';
import { Global } from '../../Shared/global';
import { UserService } from '../../Service/user.service';

@Component({
    selector: 'home-app',
    templateUrl: 'app/Components/home/home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(private fb: FormBuilder, private _userService: UserService) { }

    @ViewChild('modal') modal: ModalComponent;
    editForm: FormGroup;
    users: IUser[];
    user: IUser;
    indLoading: boolean = false;
    msg: string;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    ngOnInit(): void {
        this.editForm = this.fb.group({
            Id: [null, [Validators.required]],
            Firstname: [null, [Validators.required]],
            MiddleName: [null, [Validators.required]],
            Lastname: [null, [Validators.required]],
            Gender: [null, [Validators.required]],
            Birthdate: [null, [Validators.required]],
            City: [null, [Validators.required]],
            Address: [null, [Validators.required]],
            EmailId: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            Password: [null, [Validators.required]]/*,
            confirmpassword: [ null, [Validators.required] ]*/
        });
        this.LoadUsers();
    }

    LoadUsers(): void {
        this.indLoading = true;
        this._userService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(users => { this.users = users; this.indLoading = false; },
            error => this.msg = <any>error);
    }

    editUser(id: number): void {
        this.dbops = DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.editForm.setValue(this.user);
        this.modal.open();
    }

    deleteUser(id: number):void{
        this.dbops = DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.user = this.users.filter(x => x.Id == id)[0];
        this.editForm.setValue(this.user);
        this.modal.open();
    }

    onSubmit(formData: any) {
        switch (this.dbops) {

            case DBOperation.update:
                this._userService.put(Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully updated.";
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;
            case DBOperation.delete:
                this._userService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.msg = "Data successfully deleted.";
                            this.LoadUsers();
                        }
                        else {
                            this.msg = "There is some issue in saving records, please contact to system administrator!"
                        }

                        this.modal.dismiss();
                    },
                    error => {
                        this.msg = error;
                    }
                );
                break;

        }
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.editForm.enable() : this.editForm.disable();
    }

}