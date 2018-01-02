"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var enum_1 = require("../../Shared/enum");
var global_1 = require("../../Shared/global");
var user_service_1 = require("../../Service/user.service");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(fb, _userService) {
        this.fb = fb;
        this._userService = _userService;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this.fb.group({
            Firstname: [null, [forms_1.Validators.required]],
            MiddleName: [null, [forms_1.Validators.required]],
            Lastname: [null, [forms_1.Validators.required]],
            Gender: [null, [forms_1.Validators.required]],
            Birthdate: [null, [forms_1.Validators.required]],
            City: [null, [forms_1.Validators.required]],
            Address: [null, [forms_1.Validators.required]],
            EmailId: [null, [forms_1.Validators.required, forms_1.Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], this.isEmailUnique.bind(this)],
            Password: [null, [forms_1.Validators.required]],
            confirmpassword: [null, [forms_1.Validators.required]]
        });
    };
    RegisterComponent.prototype.isEmailUnique = function (control) {
        var _this = this;
        this.dbops = enum_1.DBOperation.create;
        this._userService.post(global_1.Global.BASE_EMAIL_CHECK, this._email).subscribe(function (data) {
            if (data == 1) {
                _this.msg = "false";
            }
            else {
                _this.msg = "true";
            }
        }, function (error) {
            _this.msg = error;
        });
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
    };
    RegisterComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        console.log(formData._value);
        this._userService.post(global_1.Global.BASE_USER_ENDPOINT, formData._value).subscribe(function (data) {
            if (data == 1) {
                _this.msg = "Data successfully added.";
            }
            else {
                _this.msg = "There is some issue in saving records, please contact to system administrator!";
            }
        }, function (error) {
            _this.msg = error;
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register-app',
            templateUrl: 'app/Components/register/register.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map