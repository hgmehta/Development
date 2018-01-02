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
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, _userService) {
        this.fb = fb;
        this._userService = _userService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.fb.group({
            EmailId: [null, [forms_1.Validators.required, forms_1.Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            Password: [null, [forms_1.Validators.required]]
        });
    };
    LoginComponent.prototype.loginUser = function (formData) {
        var _this = this;
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this._userService.post(global_1.Global.BASE_LOGIN_ENDPOINT, formData._value).subscribe(function (data) {
            if (data == 1) {
                _this.msg = "You have successfully loged in!";
            }
            else {
                _this.msg = "Email id or password is wrong";
            }
        }, function (error) {
            _this.msg = error;
        });
    };
    LoginComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.loginForm.enable() : this.loginForm.disable();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-app',
            templateUrl: 'app/Components/login/login.component.html'
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map