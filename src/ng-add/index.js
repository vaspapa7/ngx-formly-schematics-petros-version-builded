"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const ast_1 = require("../../utils/ast");
const lib_versions_1 = require("../../utils/lib-versions");
const package_1 = require("../../utils/package");
/**
 * Scaffolds the basics of a Angular Material application, this includes:
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds Browser Animation to app.module
 */
function default_1(options) {
    return schematics_1.chain([
        options && options.skipPackageJson ? schematics_1.noop() : addFormlyToPackageJson(),
        addFormlyModuleConfig(options),
        options && options.uiTheme ? addUITheme(options) : schematics_1.noop(),
    ]);
}
exports.default = default_1;
/** Add @angular/forms, @ngx-formly/core to package.json if not already present. */
function addFormlyToPackageJson() {
    return (host, context) => {
        package_1.addPackageToPackageJson(host, 'dependencies', '@angular/forms', lib_versions_1.angularVersion);
        package_1.addPackageToPackageJson(host, 'dependencies', '@ngx-formly/core', lib_versions_1.ngxFormlyVersion);
        context.addTask(new tasks_1.NodePackageInstallTask());
        return host;
    };
}
/** Add formly module to the relative module */
function addFormlyModuleConfig(options) {
    return (host) => {
        const modulePath = ast_1.findModuleFromOptions(host, options);
        ast_1.addModuleImportToModule(host, modulePath, 'ReactiveFormsModule', '@angular/forms');
        ast_1.addModuleImportToModule(host, modulePath, 'FormlyModule.forRoot()', '@ngx-formly/core');
        return host;
    };
}
/** Add UI module to app.module */
function addUITheme(options) {
    return (host, context) => {
        const modulePath = ast_1.findModuleFromOptions(host, options);
        const uiTheme = options.uiTheme;
        if (uiTheme) {
            package_1.addPackageToPackageJson(host, 'dependencies', `@ngx-formly/${uiTheme}`, uiTheme === 'ng-zorro-antd' ? '^0.0' : lib_versions_1.ngxFormlyVersion);
            // Is this needed if task is added by Formly package call?
            // context.addTask(new NodePackageInstallTask());
            ast_1.addModuleImportToModule(host, modulePath, `Formly${mapUIName(uiTheme)}Module`, `@ngx-formly/${uiTheme}`);
        }
        return host;
    };
}
// @TODO: available themes should probably be moved to some config file
function mapUIName(uiTheme) {
    const uiMap = {
        bootstrap: 'Bootstrap',
        material: 'Material',
        nativescript: 'Nativescript',
        ionic: 'Ionic',
        primeng: 'PrimeNG',
        kendo: 'Kendo',
        'ng-zorro-antd': 'NgZorroAntd',
    };
    return uiMap[uiTheme];
}
//# sourceMappingURL=index.js.map