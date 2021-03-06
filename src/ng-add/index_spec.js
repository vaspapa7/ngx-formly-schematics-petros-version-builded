"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular-devkit/schematics/testing");
const path_1 = require("path");
const test_1 = require("@schematics/angular/utility/test");
const testing_2 = require("../../utils/testing");
describe('ng-add-schematic', () => {
    const collectionPath = path_1.join(__dirname, '../collection.json');
    const schematicRunner = new testing_1.SchematicTestRunner('schematics', collectionPath);
    const projectPath = testing_2.getTestProjectPath();
    let appTree;
    beforeEach(() => {
        appTree = testing_2.createWorkspace(schematicRunner, appTree);
    });
    it('should update package.json', () => {
        const tree = schematicRunner.runSchematic('ng-add', {}, appTree);
        const packageJson = JSON.parse(test_1.getFileContent(tree, '/package.json'));
        expect(packageJson.dependencies['@angular/forms']).toBeDefined();
        expect(packageJson.dependencies['@ngx-formly/core']).toBeDefined();
    });
    it('should not add a theme by default to package.json', () => {
        const tree = schematicRunner.runSchematic('ng-add', {}, appTree);
        const packageJson = JSON.parse(test_1.getFileContent(tree, '/package.json'));
        // @TODO: list of themes should probably be retrieved from some config file
        ['material', 'bootstrap', 'ionic', 'primeng', 'kendo', 'ng-zorro-antd'].forEach(theme => {
            expect(packageJson.dependencies[`@ngx-formly/${theme}`]).toBeUndefined();
        });
    });
    it('should skip package.json update', () => {
        const options = { skipPackageJson: true };
        const tree = schematicRunner.runSchematic('ng-add', options, appTree);
        const packageJson = JSON.parse(test_1.getFileContent(tree, '/package.json'));
        expect(packageJson.dependencies['@ngx-formly/core']).toBeUndefined();
    });
    it('should add to root app module', () => {
        const tree = schematicRunner.runSchematic('ng-add', {}, appTree);
        const content = tree.readContent(`${projectPath}/src/app/app.module.ts`);
        expect(content).toMatch(
        // tslint:disable-next-line:trailing-comma
        /import { FormlyModule } from '@ngx-formly\/core';/);
        expect(content).toMatch(
        // tslint:disable-next-line:trailing-comma
        /FormlyModule.forRoot\(\)/);
        expect(content).toMatch(
        // tslint:disable-next-line:trailing-comma
        /import { ReactiveFormsModule } from '@angular\/forms';/);
        expect(content).toMatch(
        // tslint:disable-next-line:trailing-comma
        /ReactiveFormsModule,/);
    });
    it('should add UI theme to package.json', () => {
        const tree = schematicRunner.runSchematic('ng-add', {
            uiTheme: 'bootstrap',
        }, appTree);
        const packageJson = JSON.parse(test_1.getFileContent(tree, '/package.json'));
        expect(packageJson.dependencies['@ngx-formly/bootstrap']).toBeDefined();
    });
    it('should add UI theme to root app module', () => {
        const tree = schematicRunner.runSchematic('ng-add', {
            uiTheme: 'bootstrap',
        }, appTree);
        const content = tree.readContent(`${projectPath}/src/app/app.module.ts`);
        expect(content).toMatch(
        // tslint:disable-next-line:trailing-comma
        /import { FormlyBootstrapModule } from '@ngx-formly\/bootstrap';/);
        expect(content).toMatch(
        // tslint:disable-next-line:trailing-comma
        /FormlyBootstrapModule/);
    });
    it('should add to any module', () => {
        const fooModule = `${projectPath}/src/app/foo.module.ts`;
        appTree.create(fooModule, `
      import { NgModule } from '@angular/core';
      import { CommonModule } from '@angular/common';

      @NgModule({
        imports: [],
        declarations: []
      })
      export class FooModule { }
    `);
        const tree = schematicRunner.runSchematic('ng-add', {
            module: 'app/foo.module.ts',
        }, appTree);
        const content = tree.readContent(fooModule);
        expect(content).toMatch(
        // tslint:disable-next-line:trailing-comma
        /import { FormlyModule } from '@ngx-formly\/core';/);
        expect(content).toMatch(
        // tslint:disable-next-line:trailing-comma
        /FormlyModule.forRoot\(\)/);
        expect(content).toMatch(
        // tslint:disable-next-line:trailing-comma
        /import { ReactiveFormsModule } from '@angular\/forms';/);
        expect(content).toMatch(
        // tslint:disable-next-line:trailing-comma
        /ReactiveFormsModule,/);
    });
});
//# sourceMappingURL=index_spec.js.map